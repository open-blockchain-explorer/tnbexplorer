import React, {FC, useEffect, useState, useCallback} from 'react';
import {Col, Row, Radio, Table, Typography, TablePaginationConfig} from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {FeeSummary, NetworkStats, PageContentsLayout, TestnetAlertMessage} from 'components';
import {BANK_URL, CORS_BRIDGE} from 'constants/url';
import {blocksColumn, blocksData} from 'data/tableData/blocks';
import {useTransactionColumn} from 'hooks/useTransactionColumn';

interface ComponentProps {
  type?: 'mainnet' | 'testnet';
}

const Transactions: FC<{section: 'transactions' | 'blocks'} & ComponentProps> = ({section, type = 'mainnet'}) => {
  const isMainnet = type === 'mainnet';
  const path = isMainnet ? 'tnb' : 'testnet';

  const blocks = blocksData(500);
  const transactionColumn = useTransactionColumn();
  const [transactionData, setTransactionData] = useState<any[]>([]);

  const [blockPagination, setBlockPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: blocks.length,
  });

  const [transactionPagination, setTransactionPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handleTableChange = (pageDetails: TablePaginationConfig, filters: any, sorter: any) => {
    const limit = pageDetails.pageSize ? pageDetails.pageSize : 10;
    // console.log(pageDetails);
    const offset = pageDetails.current ? (pageDetails.current - 1) * limit : 0;

    if (section === 'transactions') {
      // setTransactionPagination(pageDetails);
      getTransactions(limit, offset);
      // console.log('transaction table', {filters, pageDetails, sorter});
    } else {
      setBlockPagination(pageDetails);
      // console.log('block table', {filters, pageDetails, sorter});
    }
  };

  const getTransactions = useCallback((limit = 10, offset = 0) => {
    axios.get(`${CORS_BRIDGE}/${BANK_URL}/bank_transactions?limit=${limit}&offset=${offset}`).then((res: any) => {
      console.log(res.data.results);
      const data = res.data.results.map((transaction: any) => {
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
      // console.log({pagination});
      setTransactionData(data);
      setTransactionPagination(pagination);
    });
  }, []);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return (
    <PageContentsLayout>
      <Col span={24}>{isMainnet ? <NetworkStats /> : <TestnetAlertMessage />}</Col>

      <Col span={24}>
        <Radio.Group buttonStyle="solid" value={section}>
          <Radio.Button value="transactions" style={{margin: '0px', padding: '0px'}}>
            <Link
              to={`/${path}/transactions`}
              style={{color: section === 'transactions' ? 'white' : 'black', padding: '10px'}}
            >
              Transactions
            </Link>
          </Radio.Button>
          <Radio.Button value="blocks" style={{margin: '0px', padding: '0px'}}>
            <Link to={`/${path}/blocks`} style={{color: section === 'blocks' ? 'white' : 'black', padding: '10px'}}>
              Blocks
            </Link>
          </Radio.Button>
        </Radio.Group>
      </Col>

      <Col span={16}>
        {section === 'transactions' ? (
          <Table
            bordered
            columns={transactionColumn}
            dataSource={transactionData}
            onChange={handleTableChange}
            pagination={transactionPagination}
            title={() => (
              <Row justify="space-between" align="middle">
                <Typography.Text> Latest Transactions</Typography.Text>
                <Typography.Text type="secondary">
                  {' '}
                  (Showing the last {new Intl.NumberFormat().format(transactionPagination.total ?? 0)} records)
                </Typography.Text>
              </Row>
            )}
          />
        ) : (
          <Table
            bordered
            columns={blocksColumn}
            dataSource={blocks}
            onChange={handleTableChange}
            pagination={blockPagination}
            title={() => (
              <Row justify="space-between" align="middle">
                <Typography.Text> Latest Blocks</Typography.Text>
                <Typography.Text type="secondary"> (Showing the last {blocks.length} records)</Typography.Text>
              </Row>
            )}
          />
        )}
      </Col>

      <Col span={8}>
        <FeeSummary bankFee={{current: 130, previous: 107}} primaryValidatorFee={{current: 172, previous: 170}} />
      </Col>
    </PageContentsLayout>
  );
};

export default Transactions;
