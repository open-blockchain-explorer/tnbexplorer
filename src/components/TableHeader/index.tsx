import React, {FC} from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';

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
