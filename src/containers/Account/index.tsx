import React, {FC, useEffect, useState} from 'react';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Grid from 'antd/es/grid';
import Empty from 'antd/es/empty';
import Alert from 'antd/es/alert';
import Row from 'antd/es/row';
import Statistic from 'antd/es/statistic';
import Typography from 'antd/es/typography';

import {useSelector} from 'react-redux';
import {useAccount} from 'hooks';
import {getAccountDetails, getTransactions} from 'api/bank';
import {KeyValuePair, KeyValueList, TestnetAlertMessage, PageContentsLayout, Qr, ButtonLink} from 'components';
import {getCurrentChain} from 'selectors';
import {createPaymentsUrl} from 'utils/payment-request';
import {TransactionTab} from './TransactionTab';
import {BalanceHistoryTab} from './BalanceHistoryTab';
import {AccountPageProvider} from './accountContext';

interface BalanceData {
  balance: number;
  date: string;
  transactions?: number;
}

interface AccountDetails {
  balance?: number;
  balanceLock: string;
}

const Account: FC = () => {
  const screens = Grid.useBreakpoint();

  const {isMainnet, pvUrl, bankUrl} = useSelector(getCurrentChain);

  const accountNumber = useAccount();

  const [isAccountDetailsRetrieved, setIsAccountDetailsRetrieved] = useState(false);

  const isAccountValid = accountNumber.length === 64;

  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    balance: 0,
    balanceLock: '',
  });

  const paymentRequestUrl = createPaymentsUrl({
    recipient: accountNumber,
    amount: 1,
    memo: 'Payment Request via TNB Explorer',
  });

  const [transactions, setTransactions] = useState([]);
  const [totalTxs, setTotalTxs] = useState(0);
  useEffect(() => {
    const load = () => {
      // Get balance and balance_lock
      getAccountDetails(pvUrl, accountNumber).then((details) => {
        setAccountDetails(details);
        setIsAccountDetailsRetrieved(true);
      });

      // Retrieve Data For Transactions Page
    };

    if (isAccountValid) {
      load();
    }
  }, [isAccountValid, accountNumber, pvUrl]);

  const accountInfo = [
    {
      copyable: isAccountValid,
      title: 'Account Number',
      value: accountNumber,
      renderItem: ({title, value, ...others}: any) =>
        screens.md === false && isAccountValid ? (
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <KeyValuePair title={title} value={value} {...others} />
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
          <KeyValuePair title={title} value={value} {...others} />
        ),
    },
    {
      copyable: !!accountDetails?.balanceLock && isAccountValid,
      title: 'Balance Lock',
      value: accountDetails?.balanceLock ? accountDetails?.balanceLock : '-',
      show: isAccountValid,
    },
    {
      title: 'Transactions',
      value: totalTxs,
      show: isAccountValid,
    },
    {
      title: 'Total Coins Received',
      value: '-',
      show: isAccountValid,
    },
    {
      title: 'Total Coins Sent',
      value: '-',
      show: isAccountValid,
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

  const contentList: {[x: string]: any} = {
    transactions: <TransactionTab />,
    balanceHistory: <BalanceHistoryTab />,
  };

  const [balanceHistory, setBalanceHistory] = useState<BalanceData[]>([]);

  useEffect(() => {
    // Retrieve data for Balance History
    getTransactions(bankUrl, {limit: 100, accountNumber, ordering: '-'}).then(({results: txs, total}) => {
      setTotalTxs(total);

      const {balance} = accountDetails;
      const balanceArr: BalanceData[] = [];

      txs.reduce((currentBalance: number, tx: any) => {
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
    });
  }, [accountDetails, accountNumber, bankUrl]);

  return (
    <PageContentsLayout showBreadCrumb>
      <AccountPageProvider
        value={{
          balanceHistory,
          isAccountValid,
          transactions,
          setTransactions,
        }}
      >
        {!isMainnet && (
          <Col span={24}>
            <TestnetAlertMessage />
          </Col>
        )}
        <Col span={24}>
          <Card>
            <Row justify="space-around" align="middle">
              {screens.md && isAccountValid ? (
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
              <Col md={isAccountValid ? 16 : 24}>
                <Row gutter={[0, 10]} justify="space-between">
                  {isAccountValid ? (
                    <Col>
                      <Typography.Text type="secondary">
                        Account is an anonymous digital identity on thenewboston network where coins can be sent to and
                        from.
                      </Typography.Text>
                    </Col>
                  ) : (
                    <Col span={24}>
                      <Alert
                        type="error"
                        message={
                          <Typography.Text type="danger" strong>
                            Note: Invalid account detected.
                          </Typography.Text>
                        }
                      />
                    </Col>
                  )}

                  {isAccountDetailsRetrieved && !accountDetails?.balanceLock && isAccountValid ? (
                    <Col>
                      <Typography.Text type="danger" strong>
                        Note: This account is possibly not owned by anyone as it has not sent or received any coins
                      </Typography.Text>
                    </Col>
                  ) : null}

                  <Col span={24}>
                    {isAccountValid ? (
                      <KeyValueList items={accountInfo} />
                    ) : (
                      <Empty
                        description={
                          <>
                            <Typography.Text strong>
                              No Data for Invalid Account Number:
                              <br />
                            </Typography.Text>
                            <Typography.Text>{accountNumber}</Typography.Text>
                          </>
                        }
                      />
                    )}
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
      </AccountPageProvider>
    </PageContentsLayout>
  );
};

export default Account;
