import React, {FC, useCallback, useEffect, useState} from 'react';
import {Button, Card, Col, Divider, Grid, List, PageHeader, Row, Space, Table, Typography, TypographyProps} from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';

import qrCode from 'assets/qr.png';

import {KeyValuePair, PageContentsLayout} from 'components';
import {transactionsColumn, transactionsData} from 'mocks/tableData/transactions';

const Account = ({location}: any) => {
  const screens = Grid.useBreakpoint();

  const account = window.location.pathname.split('/')[3];

  const [accountBalance, setAccountBalance] = useState(0);

  const [transactions, setTransactions] = useState<any[]>([]);

  const [transactionPagination, setTransactionPagination] = useState({
    current: 1,
    pageSize: 10,
    total: transactions.length,
  });

  const getTransactions = useCallback(async (accountNumber: string, {limit, offset}) => {
    const bankUrl = 'http://13.57.215.62';
    let data: any[] = [];
    await axios
      .get(`${bankUrl}/bank_transactions?account_number=${accountNumber}&limit=${limit}&offset=${offset}`)
      .then((res: any) => {
        console.log(res.data.results);
        const result = res.data.results.map((transaction: any) => {
          return {
            coins: transaction.amount,
            recipient: transaction.recipient,
            sender: transaction.block.sender,
            time: transaction.block.modified_date,
          };
        });

        const pageSize = limit;
        const currentPage = offset / limit + 1;

        const pagination = {
          current: currentPage,
          pageSize,
          total: res.data.count,
        };

        data = result;
        setTransactionPagination(pagination);
      });

    return data;
  }, []);

  const getAccountDetails = useCallback(async (accountNumber: string) => {
    const PV = 'http://54.241.124.162';
    let data = 0;

    await axios.get(`${PV}/accounts/${accountNumber}/balance`).then((res) => {
      data = res.data.balance;
    });

    return data;
  }, []);

  useEffect(() => {
    // console.log({account});
    // const accountNumber = 'c7498d45482098a4c4e2b2fa405fdb00e5bc74bf4739c43417e7c50ff08c4109';

    const fetchAccountBalance = async () => {
      const balance = await getAccountDetails(account);
      console.log({balance});
      setAccountBalance(balance);
    };

    fetchAccountBalance();

    const fetchTransactions = async () => {
      const txs = await getTransactions(account, {limit: 10, offset: 0});

      setTransactions(txs);
    };
    fetchTransactions();
  }, [account, getAccountDetails, getTransactions]);

  const handleTableChange = async (pageDetails: any, filters: any, sorter: any) => {
    const limit = pageDetails.pageSize ?? 10;
    const offset = pageDetails.current ? (pageDetails.current - 1) * limit : 0;

    setTransactionPagination(pageDetails);
    const tsx = await getTransactions(account, {limit, offset});

    setTransactions(tsx);
    console.log('transaction table', {filters, pageDetails, sorter});
  };

  const data = [
    {
      copyable: {
        text: account,
      },
      title: 'Account Number',
      value: account.substring(0, 24).concat('...'),
    },
    {
      title: 'Transactions',
      value: transactionPagination.total,
    },
    {
      title: 'Total Coins Received',
      value: '-',
    },
    {
      title: 'Total Coins Sent',
      value: '-',
    },
    {
      title: 'Final Balance',
      value: accountBalance,
    },
    {
      title: 'Balance Outliers',
      value: '-',
    },
  ];

  return (
    <PageContentsLayout>
      <Col span={24}>
        <PageHeader
          title={
            <Typography.Title level={3} style={{margin: '0px'}}>
              Account
            </Typography.Title>
          }
          subTitle="This is an anonymous digital identity on thenewboston network where coins can be sent to and from."
        />
        <Card>
          <Row justify="space-between">
            {screens.md ? (
              <Col flex="100px" md={8}>
                <Row justify="start" align="middle">
                  <Col>
                    <img src={qrCode} width="250px" alt="" />
                  </Col>

                  <Col>
                    <Button>
                      <Link to="./trace-transaction">Trace Transaction</Link>
                    </Button>
                  </Col>
                </Row>
              </Col>
            ) : (
              <></>
            )}
            <Col md={16}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={({title, value, ...properties}) => (
                  <List.Item>
                    {title === 'Account Number' && screens.md === false ? (
                      <Row>
                        <Col span={24}>
                          <KeyValuePair title={title} value={value} {...properties} />
                        </Col>
                        <Col>
                          <Row justify="end" align="middle">
                            <Col>
                              <img src={qrCode} width="250px" alt="" />
                            </Col>

                            <Col>
                              <Button>
                                <Link to="./trace-transaction">Trace Transaction</Link>
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ) : (
                      <KeyValuePair title={title} value={value} {...properties} />
                    )}
                  </List.Item>
                )}
              >
                <Divider type="horizontal" style={{margin: '0px'}} />
              </List>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col>
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
      </Col>
    </PageContentsLayout>
  );
};

export default Account;
