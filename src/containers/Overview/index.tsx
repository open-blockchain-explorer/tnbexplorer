import React, {FC, useEffect, useState} from 'react';
import Col from 'antd/es/col';
import Grid from 'antd/es/grid';
import Row from 'antd/es/row';
import Table from 'antd/es/table';
import {useSelector} from 'react-redux';

import {getTransactions} from 'api/bank';
import {NetworkStats, PageContentsLayout, TableHeader, TestnetAlertMessage} from 'components';
import {blocksColumn} from 'data/tableData/blocks';
import {useTransactionColumn} from 'hooks';
import {getCurrentChain} from 'selectors';
import {responsiveWidth} from 'utils/responsive';

const {useBreakpoint} = Grid;

// interface ComponentProps {}

const Overview: FC = () => {
  const transactionColumn = useTransactionColumn();
  const [blockData, setBlockData] = useState<any[]>([]);
  const [transactionData, setTransactionData] = useState<any[]>([]);

  const currentChain = useSelector(getCurrentChain);
  const {isMainnet, bankUrl} = currentChain;
  console.log({currentChain});

  const screens = useBreakpoint();
  /* eslint-disable sort-keys */
  const infoPaneWidth = responsiveWidth(screens, {
    xxl: '180px',
    xl: '140px',
    lg: '120px',
    md: '50px',
    sm: '50px',
    xs: '50px',
  });

  useEffect(() => {
    const load = async () => {
      const [txs] = await getTransactions(bankUrl);
      setTransactionData(txs);
    };

    load();
  }, [bankUrl]);

  return (
    <>
      <PageContentsLayout>
        <Col span={24}>{isMainnet ? <NetworkStats /> : <TestnetAlertMessage />}</Col>

        <Col sm={24} md={12}>
          <Row>
            <Table
              bordered
              dataSource={blockData}
              columns={blocksColumn}
              pagination={false}
              scroll={{x: 500}}
              sticky
              title={() => <TableHeader title="Latest Blocks" buttonLink={'./blocks'} />}
            />
          </Row>
        </Col>

        <Col sm={24} md={12}>
          <Table
            bordered
            dataSource={transactionData}
            columns={transactionColumn}
            pagination={false}
            scroll={{x: 500}}
            sticky
            title={() => <TableHeader title="Latest Transactions" buttonLink={'./transactions'} />}
          />
        </Col>
      </PageContentsLayout>
    </>
  );
};

export default Overview;
