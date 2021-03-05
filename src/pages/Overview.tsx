import React from 'react';
import { Card, Col, Divider, Grid, Row, Space, Typography } from 'antd';
import { finance, internet, time } from 'faker';
import { format } from 'date-fns';
import { ColumnsType } from 'antd/es/table';
import { Layout, InfoPane, Table } from 'components';
import { responsiveWidth } from 'utils/responsive';

const { useBreakpoint } = Grid;

const { Link, Text } = Typography;

const Overview = () => {
  const screens = useBreakpoint();
  const blocksColumn: ColumnsType<any> = [
    {
      title: 'Balance Lock',
      dataIndex: 'balanceLock',
      key: 'balanceLock',
      ellipsis: true,
      render: text => (
        <Link style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Bank',
      dataIndex: 'bank',
      key: 'bank',

      render: text => <Link>{text}</Link>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: timestamp => (
        <Text>{format(new Date(timestamp), 'yyyy-MM-dd hh:mm:s aa')}</Text>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: text => <Text>{text + ' coins'}</Text>,
    },
  ];

  const blocksData = [];

  for (let i = 0; i < 10; i++) {
    blocksData.push({
      balanceLock: finance.bitcoinAddress(),
      bank: internet.ip(),
      time: time.recent(),
      amount: finance.amount(),
    });
  }

  const transactionsColumn: ColumnsType<any> = [
    {
      title: 'Sender',
      dataIndex: 'sender',

      ellipsis: true,

      render: text => (
        <Link style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',

      ellipsis: true,
      render: text => (
        <Link style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: timestamp => (
        <Text>{format(new Date(timestamp), 'yyyy-MM-dd hh:mm:s aa')}</Text>
      ),
    },
    {
      title: 'Coins',
      dataIndex: 'coins',
      align: 'right',
      render: text => <Text>{text}</Text>,
    },
  ];

  const transactionsData = [];

  for (let i = 0; i < 10; i++) {
    transactionsData.push({
      sender: finance.ethereumAddress(),
      recipient: finance.litecoinAddress(),
      time: time.recent(),
      coins: finance.amount(),
    });
  }

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
      <Layout>
        <Col span={24}>
          <Card bordered={false} style={{ width: '100%', padding: '0px' }}>
            <Row justify="center">
              <Col xl={22} xxl={21}>
                <Space
                  size="large"
                  split={<Divider type="vertical" style={{ height: '90px' }} />}
                >
                  <InfoPane
                    title="distributed coins"
                    previousData={19755300}
                    currentData={19780000}
                    style={{ minWidth: infoPaneWidth }}
                  />
                  <InfoPane
                    title="Accounts"
                    previousData={520}
                    currentData={530}
                    style={{ minWidth: infoPaneWidth }}
                  />
                  <InfoPane
                    title="Transactions"
                    previousData={19146168}
                    currentData={23566453}
                    showChangeAsPercent
                    style={{ minWidth: infoPaneWidth }}
                  />
                  <InfoPane
                    title="Active banks"
                    previousData={70}
                    currentData={72}
                    style={{ minWidth: infoPaneWidth }}
                  />
                  <InfoPane
                    title="Active Validators"
                    previousData={94}
                    currentData={104}
                    style={{ minWidth: infoPaneWidth }}
                  />
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col sm={24} md={12}>
          <Row>
            <Table
              buttonLink=""
              pagination={false}
              dataSource={blocksData}
              columns={blocksColumn}
            />
          </Row>
        </Col>

        <Col sm={24} md={12}>
          {' '}
          <Table
            buttonLink=""
            pagination={false}
            dataSource={transactionsData}
            columns={transactionsColumn}
          />
        </Col>
      </Layout>
    </>
  );
};

export default Overview;
