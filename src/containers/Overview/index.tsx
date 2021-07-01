import React, {FC, useEffect, useState} from 'react';
import Col from 'antd/es/col';
import Grid from 'antd/es/grid';
import Row from 'antd/es/row';
import Table from 'antd/es/table';

import {getTransactions} from 'api/bank';
import {NetworkStats, PageContentsLayout, TableHeader, TestnetAlertMessage} from 'components';
import {BANK_URL} from 'constants/url';
import {blocksColumn} from 'data/tableData/blocks';
import {responsiveWidth} from 'utils/responsive';
import {useChainPath, useTransactionColumn} from 'hooks';

const {useBreakpoint} = Grid;

// interface ComponentProps {}

const Overview: FC = () => {
  const transactionColumn = useTransactionColumn();
  const [blockData, setBlockData] = useState<any[]>([]);
  const [transactionData, setTransactionData] = useState<any[]>([]);

  const currentChain = useChainPath();
  const isMainnet = currentChain === '/tnb';
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
      if (isMainnet) {
        const [txs] = await getTransactions(BANK_URL);
        setTransactionData(txs);
      }
    };

    load();
  }, [isMainnet]);

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
            title={() => <TableHeader title="Latest Transactions" buttonLink={'./transactions'} />}
          />
        </Col>
      </PageContentsLayout>
    </>
  );
};

export default Overview;
