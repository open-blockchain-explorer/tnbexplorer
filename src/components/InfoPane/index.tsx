import React, {CSSProperties, FC} from 'react';
import clsx from 'clsx';

import {Card, Col, Row, RowProps, Space, Typography} from 'antd';
import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons';

import {formatNumber} from 'utils/format';

interface Statistics {
  previous: number;
  current: number;
}

const InfoPane: FC<{
  title: string;
  data: Statistics;
  showChangeAsPercent?: boolean;
  style?: CSSProperties;
}> = ({title, data, showChangeAsPercent, ...otherProps}) => {
  const {current, previous} = data;
  const change = current - previous;
  const isGain = change > 0;

  const formatGain = (n: number) => {};

  return (
    <div {...otherProps}>
      <Row style={{textAlign: 'center'}}>
        <Col span={24}>
          <Typography.Text type="secondary"> {title.toUpperCase()}</Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text style={{fontSize: 'x-large', fontWeight: 'bold'}}>{formatNumber(current)}</Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text type={change >= 0 ? 'success' : 'danger'}>
            {showChangeAsPercent ? `${formatNumber((change / previous) * 100)}%` : formatNumber(change)}
            {isGain ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
};

export default InfoPane;
