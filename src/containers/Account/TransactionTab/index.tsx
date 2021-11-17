import React, {FC, ReactNode, useCallback, useState, useEffect, useContext} from 'react';
import Col from 'antd/es/col';

import Button from 'antd/es/button';
import Dropdown from 'antd/es/dropdown';
import Space from 'antd/es/space';
import Menu from 'antd/es/menu';
import MenuItem from 'antd/es/menu/MenuItem';
import Radio from 'antd/es/radio';
import {useHistory} from 'react-router-dom';
import Tag from 'antd/es/tag';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Typography from 'antd/es/typography';

import Row from 'antd/es/row';
import Table, {TablePaginationConfig} from 'antd/es/table';
import {FilterDropdownProps, SortOrder} from 'antd/es/table/interface';
// import {SorterResult, TableCurrentDataSource} from 'antd/es/table/interface';

// import CloseOutlined from '@ant-design/icons/CloseOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import {useSelector} from 'react-redux';

import {useAccount, useQueryParams} from 'hooks';
import {getTransactions} from 'api/bank';
import {useTransactionColumn} from 'hooks/useTransactionColumn';
import {getCurrentChain} from 'selectors';
import {AccountPageContext} from '../accountContext';

const FilterDropdown: FC<FilterDropdownProps & {onFilter: (accountNumber: string) => void; onClear: () => void}> = ({
  confirm,
  clearFilters,

  onFilter,
  onClear,
}) => {
  const [form] = Form.useForm();

  const handleFilter = ({accountNumberToFilter}: any) => {
    onFilter(accountNumberToFilter);
    confirm();
  };
  return (
    <Form form={form} onFinish={handleFilter}>
      <Row gutter={[10, 10]} justify="space-between" style={{padding: '10px', width: '200px'}}>
        <Col span={24}>
          <Form.Item name="accountNumberToFilter" style={{height: '10px'}}>
            <Input allowClear autoComplete={'false'} placeholder="Search for an account" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item style={{height: '10px'}}>
            <Button
              htmlType="button"
              block
              type="ghost"
              onClick={() => {
                form.resetFields();
                onClear?.();
                clearFilters?.();
              }}
            >
              Clear
            </Button>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item style={{height: '10px'}}>
            <Button htmlType="submit" block type="primary">
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export const TransactionTab = React.memo(() => {
  const {bankUrl} = useSelector(getCurrentChain);

  const history = useHistory();
  const queryParams = useQueryParams();

  const {isAccountValid, transactions, setTransactions} = useContext(AccountPageContext);
  const accountNumber = useAccount();
  const transactionColumn = useTransactionColumn(accountNumber);

  // Add filter and sort to the transaction column
  transactionColumn[0].filters = [];
  transactionColumn[0].onFilter = (value, record) => record.sender === value;
  transactionColumn[0].sorter = () => 0;
  transactionColumn[0].defaultSortOrder = ((): SortOrder => {
    const sortValue = queryParams?.get('sort');

    if (sortValue && sortValue.slice(-6) === 'sender') {
      if (sortValue.charAt(0) === '-') {
        return 'descend';
      }
      return 'ascend';
    }

    return null;
  })();

  transactionColumn[0].filterDropdown = (filterDropdownProps) => {
    return (
      <FilterDropdown
        {...filterDropdownProps}
        onFilter={(accountNumberToFilter: string) => {
          queryParams.set('sender', accountNumberToFilter);
          queryParams.delete('recipient');
          history.push(queryParams.toString());
        }}
        onClear={() => {
          queryParams.delete('sender');
          history.push(queryParams.toString());
        }}
      />
    );
  };

  transactionColumn[1].filters = [
    {text: 'address', value: '57c6214514343876fefaa1a94655b0d096388eb25d75af52ff4ed04ab1548e1d'},
  ];
  transactionColumn[1].onFilter = (value, record) => record.recipient === value;
  transactionColumn[1].sorter = () => 0;
  transactionColumn[1].defaultSortOrder = ((): SortOrder => {
    const sortValue = queryParams?.get('sort');

    if (sortValue && sortValue.slice(-6) === 'recipient') {
      if (sortValue.charAt(0) === '-') {
        return 'descend';
      }
      return 'ascend';
    }

    return null;
  })();
  transactionColumn[1].filterDropdown = (filterDropdownProps) => {
    return (
      <FilterDropdown
        {...filterDropdownProps}
        onFilter={(accountNumberToFilter: string) => {
          queryParams.set('recipient', accountNumberToFilter);
          queryParams.delete('sender');

          history.push(queryParams.toString());
        }}
        onClear={() => {
          queryParams.delete('recipient');
          history.push(queryParams.toString());
        }}
      />
    );
  };

  transactionColumn[5].sorter = () => 0;

  const [feeRadioGroup, setFeeRadioGroup] = useState(queryParams.get('fee') ?? '');
  const transactionTableHeader = () => {
    const tags: ReactNode[] = [];

    queryParams.forEach((value, key) => {
      if (key === 'fee' || key === 'sort') return;

      let tagText: ReactNode;

      if (key === 'sender' && value === accountNumber) {
        tagText = 'Showing Outgoing transactions';
      } else if (key === 'recipient' && value === accountNumber) {
        tagText = 'Showing Incoming transactions';
      } else {
        tagText = (
          <>
            Filtered {key.charAt(0).toUpperCase().concat(key.slice(1))} by:{' '}
            {value.length > 20 ? value.slice(0, 20).concat('...') : value}
          </>
        );
      }

      tags.push(
        <Col>
          <Tag
            key={key}
            closable
            onClose={() => {
              queryParams.delete(key);
              history.push(queryParams.toString());
            }}
          >
            <Typography.Text style={{fontSize: '14px'}}> {tagText} </Typography.Text>
          </Tag>
        </Col>,
      );
    });

    const filterFees = (e: any) => {
      const {value} = e.target;
      setFeeRadioGroup(value);
      queryParams.set('fee', value);
      history.push(queryParams.toString());
    };

    const deselect = (e: any) => {
      const {value} = e.target;
      if (value === feeRadioGroup) {
        setFeeRadioGroup('');
        queryParams.delete('fee');
        history.push(queryParams.toString());
      }
    };

    const incomingTagColor = '#87d068';
    const outgoingTagColor = '#f50';
    const txOptionsMenu = (
      <Menu>
        <MenuItem
          onClick={() => {
            queryParams.set('recipient', accountNumber);
            queryParams.delete('sender');
            history.push(queryParams.toString());
          }}
        >
          <Tag color={incomingTagColor}> </Tag> View Incoming Transactions
        </MenuItem>
        <MenuItem
          onClick={() => {
            queryParams.set('sender', accountNumber);
            queryParams.delete('recipient');
            history.push(queryParams.toString());
          }}
        >
          <Tag color={outgoingTagColor}> </Tag> View Outgoing Transactions
        </MenuItem>
      </Menu>
    );
    return (
      <Row justify={'space-between'} gutter={[0, 10]} align="middle">
        <Col span={12} xs={24} md={10} style={{}}>
          <Row gutter={[5, 5]}>{tags.length > 0 && tags}</Row>
        </Col>
        <Col span={12} xs={24} md={14}>
          <Row justify="end" align="middle">
            <Col>
              <Space style={{marginLeft: 'auto'}}>
                <Radio.Group onChange={filterFees} value={feeRadioGroup}>
                  <Radio onClick={deselect} value={'none'}>
                    No Fees
                  </Radio>
                  <Radio onClick={deselect} value={'bank'}>
                    Bank Fees
                  </Radio>
                  <Radio onClick={deselect} value={'primary_validator'}>
                    PV Fees
                  </Radio>
                </Radio.Group>
                <Dropdown overlay={txOptionsMenu} trigger={['click']}>
                  <Button type="ghost" icon={<MoreOutlined />} />
                </Dropdown>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const [transactionPagination, setTransactionPagination] = useState({
    current: 1,
    pageSize: 10,
    total: transactions.length,
  });

  const handleTableChange = useCallback(
    (pageDetails: TablePaginationConfig, filter: any, sorter: any, extra: any) => {
      if ((filter || sorter) && extra) {
        const {action} = extra;

        if (action === 'sort' && sorter) {
          const {field, order} = sorter;
          if (order) {
            const suffix = order === 'ascend' ? '+' : '-';
            queryParams.set('sort', suffix.concat(field as string));
            history.push(queryParams.toString());
          } else {
            queryParams.delete('sort');
            history.push(queryParams.toString());
          }
        }
      }

      const limit = pageDetails.pageSize ? pageDetails.pageSize : 10;
      const offset = pageDetails.current ? (pageDetails.current - 1) * limit : 0;

      const fee = queryParams.get('fee');
      const sort = queryParams.get('sort');
      const sender = queryParams.get('sender');
      const recipient = queryParams.get('recipient');

      const switchSortToOrdering = (sortValue?: string) => {
        let suffix = '';
        if (sortValue) {
          if (sortValue.startsWith('+') || sortValue.startsWith('-')) {
            suffix = sortValue.slice(0, 1);
            sortValue = sortValue.slice(1);
          }
          switch (sortValue) {
            case 'coins':
              return suffix.concat('amount');
            case 'sender':
              return suffix.concat('block__sender');
            default:
              return suffix.concat(sortValue);
          }
        }
        return '';
      };
      getTransactions(bankUrl, {
        limit,
        offset,
        accountNumber,
        sender,
        recipient,
        fee,
        ordering: switchSortToOrdering(sort),
      }).then(({results, total}) => {
        setTransactions(results);
        const pageSize = limit;
        const currentPage = offset / limit + 1;

        const pagination = {
          current: currentPage,
          pageSize,
          total,
        };
        setTransactionPagination(pagination);
      });
    },
    [accountNumber, bankUrl, setTransactions, setTransactionPagination, queryParams, history],
  );

  useEffect(() => {
    const load = () => {
      // Retrieve Data For Transactions Page
      handleTableChange(
        {
          current: 1,
          pageSize: 10,
          total: 0,
        },
        {},
        {},
        {},
      );
    };

    if (isAccountValid) {
      load();
    }
  }, [handleTableChange, accountNumber, isAccountValid]);

  return (
    <Table
      bordered
      title={transactionTableHeader}
      columns={transactionColumn}
      dataSource={transactions}
      onChange={handleTableChange}
      pagination={transactionPagination}
      scroll={{x: 700}}
      sticky
    />
  );
});
