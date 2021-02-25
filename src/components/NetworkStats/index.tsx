import React from 'react';

import {Card, Col, Divider, Row, Space} from 'antd';

import {InfoPane} from 'components';

const NetworkStats = () => {
  return (
    <Card bordered={false} style={{overflow: 'auto', width: '100%'}}>
      <Row justify="center">
        <Col xl={22} xxl={21}>
          <Space size="small" split={<Divider type="vertical" style={{height: '90px'}} />}>
            <InfoPane title="distributed coins" previousData={19755300} currentData={19780000} />
            <InfoPane title="Accounts" previousData={520} currentData={530} />
            <InfoPane title="Transactions" previousData={19146168} currentData={23566453} showChangeAsPercent />
            <InfoPane title="Active banks" previousData={70} currentData={72} />
            <InfoPane title="Active Validators" previousData={94} currentData={104} />
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default NetworkStats;
