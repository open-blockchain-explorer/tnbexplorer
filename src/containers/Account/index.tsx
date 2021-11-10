import React, {FC, useCallback, useEffect, useState} from 'react';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';
import Grid from 'antd/es/grid';
import List from 'antd/es/list';
import Row from 'antd/es/row';
import Statistic from 'antd/es/statistic';
import Table, {TablePaginationConfig} from 'antd/es/table';
import Typography from 'antd/es/typography';
import {Area} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {formatNumber} from 'utils/format';
import {useSelector} from 'react-redux';

import {useAccount} from 'hooks';
import {getTransactions, getAccountDetails} from 'api/bank';
import {ChartsCard, KeyValuePair, TestnetAlertMessage, PageContentsLayout, Qr, ButtonLink} from 'components';
import {useTransactionColumn} from 'hooks/useTransactionColumn';
import {getCurrentChain} from 'selectors';
import {createPaymentsUrl} from 'utils/payment-request';

interface AccountDetails {
  balance?: number;
  balanceLock: string;
}

interface BalanceData {
  balance: number;
  date: string;
  transactions?: number;
}
const Account: FC = () => {
  const screens = Grid.useBreakpoint();

  const {isMainnet, pvUrl, bankUrl} = useSelector(getCurrentChain);

  const accountNumber = useAccount();
  const transactionColumn = useTransactionColumn(accountNumber);

  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    balance: 0,
    balanceLock: '-',
  });

  const paymentRequestUrl = createPaymentsUrl({
    recipient: accountNumber,
    amount: 1,
    memo: 'Payment Request via TNB Explorer',
  });

  const [transactions, setTransactions] = useState<any[]>([]);

  const [transactionPagination, setTransactionPagination] = useState({
    current: 1,
    pageSize: 10,
    total: transactions.length,
  });

  const handleTableChange = useCallback(
    (pageDetails: TablePaginationConfig) => {
      const limit = pageDetails.pageSize ? pageDetails.pageSize : 10;
      // console.log(pageDetails);
      const offset = pageDetails.current ? (pageDetails.current - 1) * limit : 0;

      getTransactions(bankUrl, {limit, offset, accountNumber}).then(({results, total}) => {
        setTransactions(results);
        const pageSize = limit;
        const currentPage = offset / limit + 1;

        const pagination = {
          current: currentPage,
          pageSize,
          total,
        };
        // console.log({pagination});
        setTransactionPagination(pagination);
      });
    },
    [accountNumber, bankUrl, setTransactions, setTransactionPagination],
  );

  const [balanceHistory, setBalanceHistory] = useState<BalanceData[]>([]);

  useEffect(() => {
    const load = () => {
      // Get balance and balance_lock
      getAccountDetails(pvUrl, accountNumber).then((details) => {
        setAccountDetails(details);
      });

      // Retrieve Data For Transactions Page
      handleTableChange({
        current: 1,
        pageSize: 10,
        total: 0,
      });
    };

    load();
  }, [accountNumber, pvUrl, handleTableChange]);

  useEffect(() => {
    // Retrieve data for Balance History
    getTransactions(bankUrl, {limit: 100, accountNumber, ordering: '-'}).then(({results: txs}) => {
      const {balance} = accountDetails;
      console.log({txs});
      const balanceArr: BalanceData[] = [];

      txs.reduce((currentBalance: number, tx: any) => {
        // {
        //   id: tx.id,
        //   coins: tx.amount,
        //   fee: tx.fee,
        //   memo: tx.memo,
        //   recipient: tx.recipient,
        //   sender: tx.block.sender,
        //   time: tx.block.modified_date,
        // };

        if (balanceArr.length && tx.time.startsWith(balanceArr[0].date.slice(0, 10))) {
          balanceArr[0].transactions! += 1;
        } else {
          balanceArr.unshift({
            balance: currentBalance,
            date: tx.time,
            transactions: 1,
          });
        }
        if (tx.sender === accountNumber) {
          return currentBalance + tx.coins;
        }
        return currentBalance - tx.coins;
      }, balance ?? 0);

      setBalanceHistory(balanceArr);
      console.log({balanceArr});
    });
  }, [accountDetails, accountNumber, bankUrl]);

  const accountInfo = [
    {
      copyable: {
        text: accountNumber,
      },
      title: 'Account Number',
      value: accountNumber.substring(0, screens.lg ? 36 : 24).concat('...'),
    },
    {
      copyable: accountDetails?.balanceLock
        ? {
            text: accountNumber,
          }
        : false,
      title: 'Balance Lock',
      value: accountDetails?.balanceLock
        ? accountDetails?.balanceLock.substring(0, screens.lg ? 36 : 24).concat('...')
        : '-',
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

  const [currentTab, setCurrentTab] = useState('transactions');
  const tabList = [
    {
      key: 'transactions',
      tab: 'Transactions',
    },
    {
      key: 'balanceHistory',
      tab: 'Coin Balance History',
    },
  ];

  const priceConfig = {
    data: balanceHistory,
    meta: {
      date: {
        formatter: function formatter(date: string) {
          return formatDate(new Date(date), 'MMM dd, yyyy');
        },
        nice: true,
        tickCount: 10,
      },
      balance: {
        alias: 'Balance (TNB)',
        formatter: function formatter(balance: number) {
          return formatNumber(balance);
        },
        nice: true,
        tickCount: 11,
      },
    },
    smooth: true,
    slider: {
      start: 0,
      end: 1,
    },

    tooltip: {
      formatter: (datum: any) => {
        return {
          name: 'Coin Balance',
          value: datum.balance.toLocaleString(),
          title: formatDate(new Date(datum.date), 'eeee, MMMM do, yyyy'),
        };
      },
    },
    xAxis: {
      title: {
        offset: 40,
        text: 'Date',
        visible: true,
      },
    },
    xField: 'date',
    yAxis: {
      title: {
        text: 'Coin Balance',
        visible: false,
      },
      type: 'linear',
    },
    yField: 'balance',
  };

  const contentList: {[x: string]: any} = {
    transactions: (
      <>
        <Table
          bordered
          columns={transactionColumn}
          dataSource={transactions}
          onChange={handleTableChange}
          pagination={transactionPagination}
          scroll={{x: 700}}
          sticky
        />
      </>
    ),
    balanceHistory: (
      <ChartsCard title={'Balances'}>
        <Area {...priceConfig} />
      </ChartsCard>
    ),
  };

  return (
    <PageContentsLayout showBreadCrumb>
      {!isMainnet && (
        <Col span={24}>
          <TestnetAlertMessage />
        </Col>
      )}
      <Col span={24}>
        <Card>
          <Row justify="space-around" align="bottom">
            {screens.md ? (
              <Col flex="100px" md={8}>
                <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                  <Qr text={accountNumber} width={160} />

                  <Statistic title="Balance" value={accountDetails?.balance ?? 0} />

                  <ButtonLink href={paymentRequestUrl}>Payment Request</ButtonLink>
                  <ButtonLink href="./trace-transactions">Trace Transaction</ButtonLink>
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
                    dataSource={accountInfo}
                    renderItem={({title, value, ...properties}) => (
                      <List.Item>
                        {title === 'Account Number' && screens.md === false ? (
                          <Row gutter={[0, 10]}>
                            <Col span={24}>
                              <KeyValuePair title={title} value={value} {...properties} />
                            </Col>
                            <Col span={24}>
                              <Row align="middle" gutter={[10, 10]}>
                                <Col span={12}>
                                  <Statistic title="Balance" value={accountDetails?.balance ?? 0} />
                                </Col>
                                <Col span={12}>
                                  <Qr text={accountNumber} />
                                </Col>
                                <Col span={12}>
                                  <ButtonLink href={paymentRequestUrl}>Payment Request</ButtonLink>
                                </Col>
                                <Col>
                                  <ButtonLink href="./trace-transactions">Trace Transaction</ButtonLink>
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

      <Col span={24}>
        <Card
          tabList={tabList}
          activeTabKey={currentTab}
          onTabChange={(key: string) => {
            setCurrentTab(key);
          }}
        >
          {contentList[currentTab]}
        </Card>
      </Col>
    </PageContentsLayout>
  );
};

export default Account;
