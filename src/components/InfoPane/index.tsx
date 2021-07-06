import React, {CSSProperties, FC} from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';

import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import CaretUpOutlined from '@ant-design/icons/CaretUpOutlined';

interface Statistics {
  previous: number;
  current: number;
}
const formatPercent = (num: number) => (num | 0).toLocaleString();

const InfoPane: FC<{
  title: string;
  data: Statistics;
  align?: 'left' | 'center' | 'right';
  showChangeAsPercent?: boolean;
  style?: CSSProperties;
}> = ({title, data, align = 'center', showChangeAsPercent, ...otherProps}) => {
  const {current, previous} = data;
  const change = current - previous;
  const isGain = change >= 0;
  let textColour: any;
  if (change === 0) {
    textColour = 'secondary';
  } else {
    textColour = change > 0 ? 'success' : 'danger';
  }

  return (
    <div {...otherProps}>
      <Row style={{textAlign: align}}>
        <Col span={24}>
          <Typography.Text type="secondary"> {title.toUpperCase()}</Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text style={{fontSize: 'x-large', fontWeight: 'bold'}}>{formatPercent(current)}</Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text type={textColour}>
            {showChangeAsPercent ? `${formatPercent((change / previous) * 100)}%` : formatPercent(change)}
            {isGain ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
};

export default InfoPane;
