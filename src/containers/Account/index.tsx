import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Button,
  Breadcrumb,
  Card,
  Col,
  Divider,
  Grid,
  List,
  PageHeader,
  Row,
  Statistic,
  Table,
  Typography,
  TypographyProps,
} from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {useAccount} from 'hooks';

import qrCode from 'assets/qr.png';

import {KeyValuePair, PageContentsLayout} from 'components';
import {transactionsData} from 'mocks/tableData/transactions';
import {useTransactionColumn} from 'hooks/useTransactionColumn';

const Account = ({location}: any) => {
  const screens = Grid.useBreakpoint();

  const account = useAccount();
  const transactionColumn = useTransactionColumn(account);

  const [accountDetails, setAccountDetails] = useState<{balance?: number; balanceLock: string}>();

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
    const data: any = {};

    await axios.get(`${PV}/accounts/${accountNumber}/balance`).then((res) => {
      data.balance = res.data.balance;
    });

    await axios.get(`${PV}/accounts/${accountNumber}/balance_lock`).then((res) => {
      console.log(res.data);
      data.balanceLock = res.data.balance_lock;
    });

    return data;
  }, []);

  useEffect(() => {
    // console.log({account});
    // const accountNumber = 'c7498d45482098a4c4e2b2fa405fdb00e5bc74bf4739c43417e7c50ff08c4109';

    const fetchAccountDetails = async () => {
      const details = await getAccountDetails(account);
      console.log({details});
      setAccountDetails(details);
    };

    fetchAccountDetails();

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
      copyable: {
        text: account,
      },
      title: 'Balance Lock',
      value: accountDetails?.balanceLock.substring(0, 24).concat('...') ?? 0,
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
      title: 'Balance Outliers',
      value: '-',
    },
  ];

  return (
    <PageContentsLayout>
      <Col span={24}>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>

          <Breadcrumb.Item>Account</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Row justify="space-around" align="bottom">
            {screens.md ? (
              <Col flex="100px" md={8}>
                <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                  <img src={qrCode} width="200px" alt="" />

                  <Statistic title="Balance" value={accountDetails?.balance ?? 0} />

                  <Link to="./trace-transactions">
                    <Button>Trace Transaction</Button>
                  </Link>
                </div>
              </Col>
            ) : (
              <></>
            )}
            <Col md={16}>
              <Row gutter={[0, 20]} justify="space-between">
                <Col>
                  <Typography.Text type="secondary">
                    Account is an anonymous digital identity on thenewboston network where coins can be sent to and
                    from.
                  </Typography.Text>
                </Col>

                <Col span={24}>
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
            </Col>
          </Row>
        </Card>
      </Col>

      <Col>
        <Table
          bordered
          columns={transactionColumn}
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
