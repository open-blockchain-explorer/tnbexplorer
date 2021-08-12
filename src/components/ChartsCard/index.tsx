import React, {FC} from 'react';
import Card from 'antd/es/card';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Typography from 'antd/es/typography';

import {A} from 'components';

interface SourceProp {
  link: string;
  text: string;
}

interface ComponentProps {
  title?: string;
  description?: string;
  source?: SourceProp;
}

const ChartsCard: FC<ComponentProps> = ({children, title, description, source}) => {
  return (
    <Card>
      <>
        <Row justify="space-between">
          <Col>
            <Typography.Title level={5}>{title}</Typography.Title>
          </Col>
          {source && (
            <Col>
              Source: <A href={source.link}>{source.text}</A>
            </Col>
          )}

          <Col span={24}>
            <Typography.Text>{description}</Typography.Text>
          </Col>
        </Row>
      </>
      <br />
      {children}
    </Card>
  );
};

export default ChartsCard;
