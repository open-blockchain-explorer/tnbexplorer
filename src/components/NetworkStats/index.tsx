import React from 'react';

import {Card, Col, Divider, Row, Space} from 'antd';

import {InfoPane} from 'components';

const NetworkStats = () => {
  return (
    <Card bordered={false} style={{overflow: 'auto', width: '100%'}}>
      <Row justify="center">
        <Col xl={22} xxl={21}>
          <Space size="small" split={<Divider type="vertical" style={{height: '90px'}} />}>
            <InfoPane title="distributed coins" data={{current: 19780000, previous: 19755300}} />
            <InfoPane title="Accounts" data={{current: 530, previous: 520}} />
            <InfoPane title="Transactions" data={{current: 23566453, previous: 32566453}} showChangeAsPercent />
            <InfoPane title="Active banks" data={{current: 72, previous: 74}} />
            <InfoPane title="Active Validators" data={{current: 104, previous: 94}} />
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default NetworkStats;
