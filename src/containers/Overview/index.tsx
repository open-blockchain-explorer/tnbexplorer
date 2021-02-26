import React from 'react';
import {Card, Col, Divider, Grid, Row, Space, Typography} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';
import {ColumnsType, TableProps} from 'antd/es/table';
import {formatDistance, subMinutes} from 'date-fns';
import {finance, internet, time} from 'faker';

import {ButtonLink, InfoPane, NetworkStats, PageContentsLayout, Table} from 'components';

import {responsiveWidth} from 'utils/responsive';

const {useBreakpoint} = Grid;

const {Link, Text} = Typography;

const Overview = () => {
  const screens = useBreakpoint();
  const blocksColumn: ColumnsType<any> = [
    {
      dataIndex: 'balanceLock',
      ellipsis: true,
      key: 'balanceLock',
      render: (text) => (
        <Link href="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
          {text}
        </Link>
      ),
      title: 'Balance Lock',
    },
    {
      dataIndex: 'bank',
      key: 'bank',
      render: (text) => <Link href=".">{text}</Link>,
      title: 'Bank',
    },
    {
      dataIndex: 'time',
      key: 'time',
      render: (timestamp) => (
        <Text> {formatDistance(subMinutes(new Date(timestamp), Math.floor(Math.random() * 100)), new Date())}</Text>
      ),
      title: 'Time',
    },
    {
      align: 'right',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <Text>{`${text} coins`}</Text>,
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

  const transactionsColumn: ColumnsType<any> = [
    {
      dataIndex: 'sender',
      ellipsis: true,
      render: (text) => (
        <Link href="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
          {text}
        </Link>
      ),
      title: 'Sender',
    },
    {
      dataIndex: 'recipient',
      ellipsis: true,
      render: (text) => (
        <Link href="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
          {text}
        </Link>
      ),
      title: 'Recipient',
    },
    {
      dataIndex: 'time',
      key: 'time',
      render: (timestamp) => (
        <Text> {formatDistance(subMinutes(new Date(timestamp), Math.floor(Math.random() * 100)), new Date())}</Text>
      ),
      title: 'Time',
    },
    {
      align: 'right',
      dataIndex: 'coins',
      render: (text) => <Text>{text}</Text>,
      title: 'Coins',
    },
  ];

  const transactionsData = [];

  for (let i = 0; i < 10; i += 1) {
    transactionsData.push({
      coins: finance.amount(),
      recipient: finance.litecoinAddress(),
      sender: finance.ethereumAddress(),
      time: time.recent(),
    });
  }

  /* eslint-disable sort-keys */
  const infoPaneWidth = responsiveWidth(screens, {
    xxl: '180px',
    xl: '140px',
    lg: '120px',
    md: '50px',
    sm: '50px',
    xs: '50px',
  });

  return (
    <>
      <PageContentsLayout>
        <Col span={24}>
          <NetworkStats />
        </Col>

        <Col sm={24} md={12}>
          <Row>
            <Table buttonLink="" pagination={false} dataSource={blocksData} columns={blocksColumn} />
          </Row>
        </Col>

        <Col sm={24} md={12}>
          <Table buttonLink="" pagination={false} dataSource={transactionsData} columns={transactionsColumn} />
        </Col>
      </PageContentsLayout>
    </>
  );
};

export default Overview;
