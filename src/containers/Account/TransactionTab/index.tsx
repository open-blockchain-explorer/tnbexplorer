import React, {FC, ReactNode, useCallback, useState, useEffect, useContext} from 'react';
import Col from 'antd/es/col';

import Button from 'antd/es/button';

import Radio from 'antd/es/radio';
import {useHistory} from 'react-router-dom';
import Tag from 'antd/es/tag';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Typography from 'antd/es/typography';
import Space from 'antd/es/space';
import Row from 'antd/es/row';
import Table, {TablePaginationConfig} from 'antd/es/table';
import {FilterDropdownProps} from 'antd/es/table/interface';
// import {SorterResult, TableCurrentDataSource} from 'antd/es/table/interface';

// import CloseOutlined from '@ant-design/icons/CloseOutlined';
import {useSelector} from 'react-redux';

import {useAccount, useQueryParams} from 'hooks';
import {getTransactions} from 'api/bank';
import {useTransactionColumn} from 'hooks/useTransactionColumn';
import {getCurrentChain} from 'selectors';
import {AccountPageContext} from '../accountContext';

const FilterAccountNumberDropdown: FC<
  FilterDropdownProps & {onFilter: (accountNumber: string) => void; onClear: () => void}
> = ({confirm, clearFilters, onFilter, onClear}) => {
  const [form] = Form.useForm();

  const handleFilter = ({accountNumberToFilter}: any) => {
    onFilter(accountNumberToFilter);
    confirm();
  };
  return (
    <Form form={form} onFinish={handleFilter}>
      <Row gutter={[10, 10]} justify="space-between" style={{padding: '10px', width: '225px'}}>
        <Col span={24}>
          <Form.Item name="accountNumberToFilter" style={{margin: '0px'}}>
            <Input allowClear autoComplete={'false'} placeholder="Search for an account" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item style={{margin: '0px'}}>
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
          <Form.Item style={{margin: '0px'}}>
            <Button htmlType="submit" block type="primary">
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const FilterTxFlowDropdown: FC<
  FilterDropdownProps & {onFilter: (txFlowValue: 'in' | 'out') => void; onClear: () => void}
> = ({clearFilters, confirm, onClear, onFilter}) => {
  const [form] = Form.useForm();

  const handleTxFlowFilter = ({value}: any) => {
    if (value) {
      confirm();
      onFilter?.(value);
    }
  };

  return (
    <Form form={form} onFinish={handleTxFlowFilter}>
      <Row gutter={[10, 10]} justify="space-between" style={{padding: '10px', width: '190px'}}>
        <Col span={24}>
          <Form.Item name="txFlow" style={{margin: '0px'}}>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={'in'}>
                  <Tag style={{fontWeight: 'bolder'}} color={'#87d068'}>
                    IN
                  </Tag>
                  Incoming txs
                </Radio>
                <Radio value={'out'}>
                  <Tag color={'#f50'} style={{fontWeight: 'bolder'}}>
                    OUT
                  </Tag>{' '}
                  Outgoing txs
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item style={{margin: '0px'}}>
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
          <Form.Item style={{margin: '0px'}}>
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
  const searchParams = useQueryParams();

  const {isAccountValid, transactions, setTransactions} = useContext(AccountPageContext);
  const accountNumber = useAccount();

  const transactionColumn = useTransactionColumn({
    accountNumber,
    sort: {
      recipient: true,
      sender: true,
      time: 'ascend',
      coins: true,
    },
  });

  // Add filter and sort to the transaction column
  transactionColumn[0].filters = [];
  transactionColumn[0].onFilter = (value, record) => record.sender === value;
  transactionColumn[0].filterDropdown = (filterDropdownProps) => {
    return (
      <FilterAccountNumberDropdown
        {...filterDropdownProps}
        onFilter={(accountNumberToFilter: string) => {
          searchParams.set('sender', accountNumberToFilter);
          searchParams.delete('recipient');
          history.push(searchParams.toString());
        }}
        onClear={() => {
          searchParams.delete('sender');
          history.push(searchParams.toString());
        }}
      />
    );
  };

  transactionColumn[1].filters = [
    {text: 'address', value: '57c6214514343876fefaa1a94655b0d096388eb25d75af52ff4ed04ab1548e1d'},
  ];
  transactionColumn[1].onFilter = (value, record) => record.recipient === value;
  transactionColumn[1].filterDropdown = (filterDropdownProps) => {
    return (
      <FilterAccountNumberDropdown
        {...filterDropdownProps}
        onFilter={(accountNumberToFilter: string) => {
          searchParams.set('recipient', accountNumberToFilter);
          searchParams.delete('sender');

          history.push(searchParams.toString());
        }}
        onClear={() => {
          searchParams.delete('recipient');
          history.push(searchParams.toString());
        }}
      />
    );
  };

  transactionColumn[2].filters = [];
  transactionColumn[2].filterDropdown = (props) => (
    <FilterTxFlowDropdown
      {...props}
      onClear={() => {
        if (searchParams.get('recipient') === accountNumber || searchParams.get('sender') === accountNumber) {
          searchParams.delete('recipient');
          searchParams.delete('sender');
          history.push(searchParams.toString());
        }
      }}
      onFilter={(txFlowValue: 'in' | 'out') => {
        if (txFlowValue === 'in') {
          searchParams.set('recipient', accountNumber);
          searchParams.delete('sender');
          history.push(searchParams.toString());
        } else {
          searchParams.set('sender', accountNumber);
          searchParams.delete('recipient');
          history.push(searchParams.toString());
        }
      }}
    />
  );

  const [feeRadioGroup, setFeeRadioGroup] = useState(searchParams.get('fee') ?? '');
  const transactionTableHeader = () => {
    const tags: ReactNode[] = [];

    searchParams.forEach((value, key) => {
      if (key === 'fee' || key === 'sort') return;

      let tagText: ReactNode;

      if (key === 'sender' && value === accountNumber) {
        tagText = <>Filtered Tx-Flow by: Outgoing txs</>;
      } else if (key === 'recipient' && value === accountNumber) {
        tagText = <>Filtered Tx-Flow by: Incoming txs</>;
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
              searchParams.delete(key);
              history.push(searchParams.toString());
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
      searchParams.set('fee', value);
      history.push(searchParams.toString());
    };

    const deselect = (e: any) => {
      const {value} = e.target;
      if (value === feeRadioGroup) {
        setFeeRadioGroup('');
        searchParams.delete('fee');
        history.push(searchParams.toString());
      }
    };

    return (
      <Row justify={'space-between'} gutter={[0, 10]} align="middle">
        <Col span={12} xs={24} md={10} style={{}}>
          <Row gutter={[5, 5]}>{tags.length > 0 && tags}</Row>
        </Col>
        <Col span={12} xs={24} md={14}>
          <Row justify="end" align="middle">
            <Col>
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
            searchParams.set('sort', suffix.concat(field as string));
            history.push(searchParams.toString());
          } else {
            searchParams.delete('sort');
            history.push(searchParams.toString());
          }
        }
      }

      const limit = pageDetails.pageSize ? pageDetails.pageSize : 10;
      const offset = pageDetails.current ? (pageDetails.current - 1) * limit : 0;

      const fee = searchParams.get('fee');
      const sort = searchParams.get('sort');
      const sender = searchParams.get('sender');
      const recipient = searchParams.get('recipient');
      getTransactions(bankUrl, {
        limit,
        offset,
        accountNumber,
        sender,
        recipient,
        fee,
        sort,
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
    [accountNumber, bankUrl, setTransactions, setTransactionPagination, searchParams, history],
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
      rowKey={(record) => record.id}
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
