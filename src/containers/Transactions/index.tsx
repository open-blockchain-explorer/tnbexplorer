import React, {FC, useEffect, useState, useCallback, useMemo} from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Radio from 'antd/es/radio';
import Table, {TablePaginationConfig} from 'antd/es/table';
import Typography from 'antd/es/typography';
import {useSelector} from 'react-redux';

import {getTransactions} from 'api/bank';
import {A, FeeSummary, NetworkStats, PageContentsLayout, TestnetAlertMessage} from 'components';
import {blocksColumn} from 'data/tableData/blocks';
import {useTransactionColumn} from 'hooks';
import {getCurrentChain} from 'selectors';

const Transactions: FC<{section: 'transactions' | 'blocks'}> = ({section}) => {
  const {isMainnet, bankUrl} = useSelector(getCurrentChain);

  const transactionColumn = useTransactionColumn();
  const [transactionData, setTransactionData] = useState<any[]>([]);

  const initialPagination = useMemo(
    () => ({
      current: 1,
      pageSize: 10,
      total: 0,
    }),
    [],
  );

  const [blockPagination, setBlockPagination] = useState<TablePaginationConfig>(initialPagination);
  const [transactionPagination, setTransactionPagination] = useState<TablePaginationConfig>(initialPagination);

  const handleTableChange = useCallback(
    (pageDetails: TablePaginationConfig) => {
      const limit = pageDetails.pageSize ? pageDetails.pageSize : 10;
      const offset = pageDetails.current ? (pageDetails.current - 1) * limit : 0;

      if (section === 'transactions') {
        getTransactions(bankUrl, {limit, offset}).then(({results: txs, total}) => {
          setTransactionData(txs);
          const pageSize = limit;
          const currentPage = offset / limit + 1;

          const pagination = {
            current: currentPage,
            pageSize,
            total,
          };
          setTransactionPagination(pagination);
        });
      } else {
        setBlockPagination(pageDetails);
      }
    },
    [bankUrl, section, setTransactionData, setBlockPagination, setTransactionPagination],
  );

  useEffect(() => {
    const load = () => {
      handleTableChange(initialPagination);
    };

    load();
  }, [handleTableChange, initialPagination]);

  return (
    <PageContentsLayout>
      <Col span={24}>{isMainnet ? <NetworkStats /> : <TestnetAlertMessage />}</Col>

      <Col span={24}>
        <Radio.Group buttonStyle="solid" value={section}>
          <Radio.Button value="transactions" style={{margin: '0px', padding: '0px'}}>
            <A href={`transactions`} style={{color: section === 'transactions' ? 'white' : 'black', padding: '10px'}}>
              Transactions
            </A>
          </Radio.Button>
          <Radio.Button value="blocks" style={{margin: '0px', padding: '0px'}}>
            <A href={`blocks`} style={{color: section === 'blocks' ? 'white' : 'black', padding: '10px'}}>
              Blocks
            </A>
          </Radio.Button>
        </Radio.Group>
      </Col>

      <Col sm={24} md={16} xl={17}>
        {section === 'transactions' ? (
          <Table
            bordered
            columns={transactionColumn}
            dataSource={transactionData}
            onChange={handleTableChange}
            pagination={transactionPagination}
            scroll={{x: 700}}
            sticky
            title={() => (
              <Row justify="space-between" align="middle">
                <Typography.Text> Latest Transactions</Typography.Text>
                <Typography.Text type="secondary">
                  {' '}
                  (Showing the last {new Intl.NumberFormat().format(transactionPagination.total ?? 0)} records)
                </Typography.Text>
              </Row>
            )}
          />
        ) : (
          <Table
            bordered
            columns={blocksColumn}
            dataSource={[]}
            onChange={handleTableChange}
            pagination={blockPagination}
            scroll={{x: 700}}
            sticky
            title={() => (
              <Row justify="space-between" align="middle">
                <Typography.Text> Latest Blocks</Typography.Text>
                <Typography.Text type="secondary"> (Showing the last {0} records)</Typography.Text>
              </Row>
            )}
          />
        )}
      </Col>

      <Col sm={10} md={8} xl={7}>
        <FeeSummary bankFee={{current: 130, previous: 107}} primaryValidatorFee={{current: 172, previous: 170}} />
      </Col>
    </PageContentsLayout>
  );
};

export default Transactions;
