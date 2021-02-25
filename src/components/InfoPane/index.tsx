import React, {CSSProperties, FC} from 'react';
import clsx from 'clsx';

import {Card, Col, Row, Space, Typography} from 'antd';
import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons';

import {formatNumber} from 'utils/format';

const {Title, Text} = Typography;

const InfoPane: FC<{
  title: string;
  previousData: number;
  currentData: number;
  showChangeAsPercent?: boolean;
  style?: CSSProperties;
}> = ({title, previousData, currentData, showChangeAsPercent, ...otherProps}) => {
  const change = currentData - previousData;
  const isGain = change > 0;

  const changeArrow = () => {};
  return (
    <div {...otherProps}>
      <Row>
        <Col span={24}>
          <Text type="secondary"> {title.toUpperCase()}</Text>
        </Col>
        <Col span={24}>
          <Text style={{fontSize: 'x-large', fontWeight: 'bold'}}>{formatNumber(currentData)}</Text>
        </Col>
        <Col span={24}>
          <Text type={change >= 0 ? 'success' : 'danger'}>
            {showChangeAsPercent ? `${formatNumber((change / previousData) * 100)}%` : formatNumber(change)}{' '}
            {isGain ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default InfoPane;
