import React, {FC, ReactNode} from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Tooltip from 'antd/es/tooltip';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';

export interface KeyValueType {
  title: string;
  value: string | number | ReactNode;
  tooltip?: string | ReactNode;

  copyable?:
    | boolean
    | {
        text?: string;
      };
  ellipsis?: boolean;
}

const KeyValuePair: FC<KeyValueType> = ({title, value, tooltip, ...others}) => {
  const renderValue = () => {
    const typeOfValue = typeof value;
    if (typeOfValue === 'string' || typeOfValue === 'number') {
      return (
        <Typography.Text {...others}>{typeOfValue === 'number' ? value!.toLocaleString() : value}</Typography.Text>
      );
    }

    return value;
  };

  return (
    <Col span={24}>
      <Row justify="space-between" align="middle">
        <Col xs={{flex: ''}}>
          <Space>
            <Typography.Text type="secondary">
              {tooltip && (
                <Tooltip placement="topRight" title={tooltip}>
                  <InfoCircleOutlined />
                </Tooltip>
              )}
            </Typography.Text>

            <Typography.Text>{title}</Typography.Text>
          </Space>
        </Col>
        <Col sm={{flex: 'auto', span: 16}} xs={{span: 24, flex: ''}}>
          {renderValue()}
        </Col>
      </Row>
    </Col>
  );
};

export default KeyValuePair;
