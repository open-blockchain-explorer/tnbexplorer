import React, {FC, useCallback, useEffect, useState} from 'react';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';
import Grid from 'antd/es/grid';
import List from 'antd/es/list';
import Row from 'antd/es/row';
import Statistic from 'antd/es/statistic';
import Table from 'antd/es/table';
import Typography from 'antd/es/typography';

import axios from 'axios';
import {Link} from 'react-router-dom';

import {useAccount} from 'hooks';

import {KeyValuePair, PageContentsLayout, Qr} from 'components';
import {useTransactionColumn} from 'hooks/useTransactionColumn';
import {BANK_URL, CORS_BRIDGE, PV_URL} from 'constants/url';

interface AccountDetails {
  balance?: number;
  balanceLock: string;
}

const Account: FC = () => {
  const screens = Grid.useBreakpoint();

  const account = useAccount();
  const transactionColumn = useTransactionColumn(account);

  const [accountDetails, setAccountDetails] = useState<AccountDetails>();

  const [transactions, setTransactions] = useState<any[]>([]);

  const [transactionPagination, setTransactionPagination] = useState({
    current: 1,
    pageSize: 10,
    total: transactions.length,
  });

  const getTransactions = useCallback(async (accountNumber: string, {limit, offset}) => {
    let data: any[] = [];
    await axios
      .get(
        `${CORS_BRIDGE}/${BANK_URL}/bank_transactions?account_number=${accountNumber}&limit=${limit}&offset=${offset}`,
      )
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
    const data: AccountDetails = {balance: 0, balanceLock: ''};

    await axios.get(`${CORS_BRIDGE}/${PV_URL}/accounts/${accountNumber}/balance`).then((res) => {
      data.balance = res.data.balance ?? 0;
    });

    await axios.get(`${CORS_BRIDGE}/${PV_URL}/accounts/${accountNumber}/balance_lock`).then((res) => {
      console.log(res.data);
      data.balanceLock = res.data.balance_lock ?? '';
    });
    console.log({data});

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
      copyable: accountDetails?.balanceLock
        ? {
            text: account,
          }
        : false,
      title: 'Balance Lock',
      value: accountDetails?.balanceLock ? accountDetails?.balanceLock.substring(0, 24).concat('...') : '-',
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
  ];

  return (
    <PageContentsLayout>
      <Col span={24}>
        <Card>
          <Row justify="space-around" align="bottom">
            {screens.md ? (
              <Col flex="100px" md={8}>
                <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                  <Qr text={account} width={160} />

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
              <Row gutter={[0, 10]} justify="space-between">
                <Col>
                  <Typography.Text type="secondary">
                    Account is an anonymous digital identity on thenewboston network where coins can be sent to and
                    from.
                  </Typography.Text>
                </Col>

                {!accountDetails?.balanceLock ? (
                  <Col>
                    <Typography.Text type="danger" strong>
                      Note: This account is probably not owned by anyone as it has not sent or received any coins
                    </Typography.Text>
                  </Col>
                ) : null}
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
                            <Col span={24}>
                              <Row justify="end" align="middle" gutter={[0, 10]}>
                                <Col span={12}>
                                  <Statistic title="Balance" value={accountDetails?.balance ?? 0} />
                                </Col>
                                <Col span={12}>
                                  <Qr text={account} />
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
