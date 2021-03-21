import React, {FC} from 'react';
import {Col, Row, Typography} from 'antd';

import {ButtonLink} from 'components';

interface ComponentProps {
  title: string;
  buttonLink: string;
}

const TableHeader: FC<ComponentProps> = ({title, buttonLink}) => {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Typography.Text> {title}</Typography.Text>
      </Col>
      <Col>
        <ButtonLink link={buttonLink} />
      </Col>
    </Row>
  );
};

export default TableHeader;
