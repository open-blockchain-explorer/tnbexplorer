import React, {FC, useState} from 'react';
import {Button, Card, Col, Divider, PageHeader, Row, Space, Table, Typography, TypographyProps} from 'antd';
import {Link} from 'react-router-dom';

import qrCode from 'assets/qr.png';

import {PageContentsLayout} from 'components';
import {transactionsColumn, transactionsData} from 'mocks/tableData/transactions';

const Account = ({location}: any) => {
  const transactions = transactionsData(500);

  const [transactionPagination, setTransactionPagination] = useState({
    current: 1,
    pageSize: 10,
    total: transactions.length,
  });

  const handleTableChange = (pageDetails: any, filters: any, sorter: any) => {
    setTransactionPagination(pageDetails);
    console.log('transaction table', {filters, pageDetails, sorter});
  };

  const KeyValuePair: FC<{title: string; text: string; copyable?: boolean}> = ({
    title,
    text,
    copyable = false,
    ...others
  }) => (
    <Row>
      <Col span={8}>
        <Typography.Text strong type="secondary">
          {title}
        </Typography.Text>
      </Col>
      <Col span={16}>
        <Typography.Text strong copyable={copyable}>
          {text}
        </Typography.Text>
      </Col>
    </Row>
  );
  return (
    <PageContentsLayout>
      <PageHeader
        title="Account"
        subTitle="This is an anonymous digital identity on thenewboston network where coins can be sent to and from."
      />

      <Card>
        <Row>
          <Col span={8}>
            <img src={qrCode} alt="" />
            <Button>
              <Link to="./trace-transaction">Trace Transaction</Link>
            </Button>
          </Col>

          <Col span={16}>
            <Row>
              <Col span={24}>
                <KeyValuePair title="Account Number" text="FTEDTRFYUH^TR%DiutyfiytfyRFTVYUFRTVI" copyable />
              </Col>
              <Col span={24}>
                <Divider type="horizontal" />
              </Col>
              <Col span={24}>
                <KeyValuePair title="Transactions" text="234" />
              </Col>
              <Col span={24}>
                <Divider type="horizontal" />
              </Col>
              <Col span={24}>
                <KeyValuePair title="Total Coins Received" text="223,345" />
              </Col>
              <Col span={24}>
                <Divider type="horizontal" />
              </Col>
              <Col span={24}>
                <KeyValuePair title="Total Coins Sent" text="345,234" />
              </Col>
              <Col span={24}>
                <Divider type="horizontal" />
              </Col>
              <Col span={24}>
                <KeyValuePair title="Final Balance" text="34,000" />
              </Col>
              <Col span={24}>
                <Divider type="horizontal" />
              </Col>
              <Col span={24}>
                <KeyValuePair title="Balance Outliers" text="-98,000" />
              </Col>
              <Col span={24}>
                <Divider type="horizontal" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Table
        bordered
        columns={transactionsColumn}
        dataSource={transactions}
        onChange={handleTableChange}
        pagination={transactionPagination}
        title={() => (
          <Row justify="space-between" align="middle">
            <Typography.Text> Transactions</Typography.Text>
          </Row>
        )}
      />
    </PageContentsLayout>
  );
};

export default Account;
