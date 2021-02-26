import React, {useState} from 'react';
import {Col, Row, Radio, Table, Typography} from 'antd';
import {ColumnsType, TableProps} from 'antd/es/table';
import {formatDistance, subMinutes} from 'date-fns';
import {finance, internet, time} from 'faker';

import {NetworkStats, PageContentsLayout} from 'components';

const Transactions = () => {
  const [section, setSection] = useState('transactions');

  const transactionsColumn: ColumnsType<any> = [
    {
      dataIndex: 'sender',
      ellipsis: true,
      render: (text) => (
        <Typography.Link href="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
          {text}
        </Typography.Link>
      ),
      title: 'Sender',
    },
    {
      dataIndex: 'recipient',
      ellipsis: true,
      render: (text) => (
        <Typography.Link href="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
          {text}
        </Typography.Link>
      ),
      title: 'Recipient',
    },
    {
      dataIndex: 'time',
      key: 'time',
      render: (timestamp) => (
        <Typography.Text>
          {formatDistance(subMinutes(new Date(timestamp), Math.floor(Math.random() * 100)), new Date())}
        </Typography.Text>
      ),
      title: 'Time',
    },
    {
      align: 'right',
      dataIndex: 'coins',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
      title: 'Coins',
    },
  ];

  const transactionsData = [];

  for (let i = 0; i < 500; i += 1) {
    transactionsData.push({
      coins: finance.amount(),
      recipient: finance.litecoinAddress(),
      sender: finance.ethereumAddress(),
      time: time.recent(),
    });
  }

  const blocksColumn: ColumnsType<any> = [
    {
      dataIndex: 'balanceLock',
      ellipsis: true,
      key: 'balanceLock',
      render: (text) => (
        <Typography.Link href="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
          {text}
        </Typography.Link>
      ),
      title: 'Balance Lock',
    },
    {
      dataIndex: 'bank',
      key: 'bank',
      render: (text) => <Typography.Link href=".">{text}</Typography.Link>,
      title: 'Bank',
    },
    {
      dataIndex: 'time',
      key: 'time',
      render: (timestamp) => (
        <Typography.Text>
          {formatDistance(subMinutes(new Date(timestamp), Math.floor(Math.random() * 100)), new Date())}
        </Typography.Text>
      ),
      title: 'Time',
    },
    {
      align: 'right',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <Typography.Text>{`${text} coins`}</Typography.Text>,
      title: 'Amount',
    },
  ];

  const blocksData = [];

  for (let i = 0; i < 10; i += 1) {
    blocksData.push({
      amount: finance.amount(),
      balanceLock: finance.bitcoinAddress(),
      bank: internet.ip(),
      time: time.recent(),
    });
  }

  const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 500});

  const handleTableChange = (pageDetails: any, filters: any, sorter: any) => {
    setPagination(pageDetails);
    console.log({filters, pageDetails, sorter});
  };

  const onSectionChange = (event: any) => {
    setSection(event.target.value);
  };

  return (
    <PageContentsLayout>
      <Col span={24}>
        <NetworkStats />
      </Col>

      <Col span={24}>
        <Radio.Group buttonStyle="solid" defaultValue="transactions" onChange={onSectionChange}>
          <Radio.Button value="transactions"> Transactions </Radio.Button>
          <Radio.Button value="blocks"> Blocks </Radio.Button>
        </Radio.Group>
      </Col>

      <Col span={16}>
        {section === 'transactions' ? (
          <Table
            bordered
            columns={transactionsColumn}
            dataSource={transactionsData}
            onChange={handleTableChange}
            pagination={pagination}
            title={() => (
              <Row justify="space-between" align="middle">
                <Typography.Text> Latest Transactions</Typography.Text>
                <Typography.Text type="secondary"> (Showing the last 500k records)</Typography.Text>
              </Row>
            )}
          />
        ) : (
          <Table
            bordered
            columns={blocksColumn}
            dataSource={blocksData}
            onChange={handleTableChange}
            pagination={pagination}
            title={() => (
              <Row justify="space-between" align="middle">
                <Typography.Text> Latest Blocks</Typography.Text>
                <Typography.Text type="secondary"> (Showing the last 500k records)</Typography.Text>
              </Row>
            )}
          />
        )}
      </Col>
    </PageContentsLayout>
  );
};

export default Transactions;
