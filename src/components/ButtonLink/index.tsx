import React, {FC} from 'react';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Row from 'antd/es/row';

import {ArrowRightOutlined} from '@ant-design/icons';

const ButtonLink: FC<{link: string; text?: string}> = ({link, text = 'View All'}) => {
  console.log({link});
  return (
    <Button type="primary" href={link}>
      <Row gutter={[10, 0]}>
        <Col>View All</Col>
        <Col>
          <ArrowRightOutlined
            style={{
              background: 'white',
              color: 'var(--primary)',
            }}
          />
        </Col>
      </Row>
    </Button>
  );
};

export default ButtonLink;
