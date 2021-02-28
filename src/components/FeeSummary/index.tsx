import React, {FC} from 'react';
import {Card, Col, Divider, Row, Space, Typography} from 'antd';

import {InfoPane} from 'components';

interface Statistics {
  previous: number;
  current: number;
}

const FeeSummary: FC<{bankFee: Statistics; primaryValidatorFee: Statistics}> = ({bankFee, primaryValidatorFee}) => {
  const total = bankFee.current + primaryValidatorFee.current;

  return (
    <Card size="small">
      <Typography.Text>Fee charged</Typography.Text>
      <Row align="middle" justify="center" gutter={[10, 0]}>
        <Col>
          <Typography.Text style={{fontSize: 'xx-large', fontWeight: 'bold'}}>{total}</Typography.Text>
        </Col>
        <Space split={<Divider type="vertical" style={{height: '90px'}} />}>
          <InfoPane title="All Banks" data={bankFee} />
          <InfoPane title="Primary Validator" data={primaryValidatorFee} />
        </Space>
      </Row>
    </Card>
  );
};

export default FeeSummary;
