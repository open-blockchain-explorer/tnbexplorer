import React, {FC, useCallback, useEffect, useState} from 'react';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';
import Grid from 'antd/es/grid';
import List from 'antd/es/list';
import Row from 'antd/es/row';
import Statistic from 'antd/es/statistic';
import Table, {TablePaginationConfig} from 'antd/es/table';
import Typography from 'antd/es/typography';

import axios from 'axios';
import {Link} from 'react-router-dom';

import {useAccount} from 'hooks';
import {getTransactions, getAccountDetails} from 'api/bank';
import {KeyValuePair, PageContentsLayout, Qr} from 'components';
import {useTransactionColumn} from 'hooks/useTransactionColumn';
import {BANK_URL, CORS_BRIDGE, PV_URL} from 'constants/url';

interface AccountDetails {
  balance?: number;
  balanceLock: string;
}

const Account: FC = () => {
  const screens = Grid.useBreakpoint();

  const accountNumber = useAccount();
  const transactionColumn = useTransactionColumn(accountNumber);

  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    balance: 0,
    balanceLock: '-',
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

      getTransactions(BANK_URL, {limit, offset, accountNumber}).then(([txs, totalTxs]) => {
        console.log(txs);
        setTransactions(txs);
        const pageSize = limit;
        const currentPage = offset / limit + 1;

        const pagination = {
          current: currentPage,
          pageSize,
          total: totalTxs,
        };
        // console.log({pagination});
        setTransactionPagination(pagination);
      });
    },
    [accountNumber, setTransactions, setTransactionPagination],
  );

  useEffect(() => {
    // console.log({accountNumber});
    // const accountNumber = 'c7498d45482098a4c4e2b2fa405fdb00e5bc74bf4739c43417e7c50ff08c4109';

    const load = () => {
      getAccountDetails(PV_URL, accountNumber).then((details) => {
        setAccountDetails(details);
      });

      handleTableChange({
        current: 1,
        pageSize: 10,
        total: 0,
      });
    };

    load();
  }, [accountNumber, handleTableChange]);

  const accountInfo = [
    {
      copyable: {
        text: accountNumber,
      },
      title: 'Account Number',
      value: accountNumber.substring(0, 24).concat('...'),
    },
    {
      copyable: accountDetails?.balanceLock
        ? {
            text: accountNumber,
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
                  <Qr text={accountNumber} width={160} />

                  <Statistic title="Balance" value={accountDetails?.balance ?? 0} />

                  <Link to="/tnb/payment-request">
                    <Button>Payment Request</Button>
                  </Link>
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
                    dataSource={accountInfo}
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
                                  <Qr text={accountNumber} />
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
