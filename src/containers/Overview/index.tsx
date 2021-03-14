import React, {FC} from 'react';
import {Card, Col, Divider, Grid, Row, Space, Typography} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';

import {ButtonLink, InfoPane, NetworkStats, PageContentsLayout, Table, TestnetAlertMessage} from 'components';
import {transactionsColumn, transactionsData} from 'mocks/tableData/transactions';
import {blocksColumn, blocksData} from 'mocks/tableData/blocks';

import {responsiveWidth} from 'utils/responsive';

const {useBreakpoint} = Grid;

const {Link, Text} = Typography;

interface ComponentProps {
  type?: 'mainnet' | 'testnet';
}

const Overview: FC<ComponentProps> = ({type = 'mainnet'}) => {
  const isMainnet = type === 'mainnet';
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

  return (
    <>
      <PageContentsLayout>
        <Col span={24}>{isMainnet ? <NetworkStats /> : <TestnetAlertMessage />}</Col>

        <Col sm={24} md={12}>
          <Row>
            <Table buttonLink="" pagination={false} dataSource={blocksData(10)} columns={blocksColumn} />
          </Row>
        </Col>

        <Col sm={24} md={12}>
          <Table buttonLink="" pagination={false} dataSource={transactionsData(10)} columns={transactionsColumn} />
        </Col>
      </PageContentsLayout>
    </>
  );
};

export default Overview;
