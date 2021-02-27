import React, {FC, useEffect, useState} from 'react';
import {Col, Row, Radio, Table, Typography} from 'antd';
import {Link} from 'react-router-dom';

import {NetworkStats, PageContentsLayout} from 'components';
import {transactionsColumn, transactionsData} from 'mocks/tableData/transactions';
import {blocksColumn, blocksData} from 'mocks/tableData/blocks';

const Transactions: FC<{section: 'transactions' | 'blocks'}> = ({section}) => {
  const transactions = transactionsData(500);
  const blocks = blocksData(500);

  const [blockPagination, setBlockPagination] = useState({current: 1, pageSize: 10, total: blocks.length});

  const [transactionPagination, setTransactionPagination] = useState({
    current: 1,
    pageSize: 10,
    total: transactions.length,
  });

  const handleTableChange = (pageDetails: any, filters: any, sorter: any) => {
    if (section === 'transactions') {
      setTransactionPagination(pageDetails);
      console.log('transaction table', {filters, pageDetails, sorter});
    } else {
      setBlockPagination(pageDetails);
      console.log('block table', {filters, pageDetails, sorter});
    }
  };

  return (
    <PageContentsLayout>
      <Col span={24}>
        <NetworkStats />
      </Col>

      <Col span={24}>
        <Radio.Group buttonStyle="solid" value={section}>
          <Radio.Button value="transactions">
            <Link to="/transactions">Transactions</Link>
          </Radio.Button>
          <Radio.Button value="blocks">
            <Link to="/blocks"> Blocks </Link>
          </Radio.Button>
        </Radio.Group>
      </Col>

      <Col span={16}>
        {section === 'transactions' ? (
          <Table
            bordered
            columns={transactionsColumn}
            dataSource={transactions}
            onChange={handleTableChange}
            pagination={transactionPagination}
            title={() => (
              <Row justify="space-between" align="middle">
                <Typography.Text> Latest Transactions</Typography.Text>
                <Typography.Text type="secondary"> (Showing the last {transactions.length} records)</Typography.Text>
              </Row>
            )}
          />
        ) : (
          <Table
            bordered
            columns={blocksColumn}
            dataSource={blocks}
            onChange={handleTableChange}
            pagination={blockPagination}
            title={() => (
              <Row justify="space-between" align="middle">
                <Typography.Text> Latest Blocks</Typography.Text>
                <Typography.Text type="secondary"> (Showing the last {blocks.length} records)</Typography.Text>
              </Row>
            )}
          />
        )}
      </Col>
    </PageContentsLayout>
  );
};

export default Transactions;
