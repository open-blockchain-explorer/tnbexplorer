import React, {FC} from 'react';
import {Button, Col, Row} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';

const index: FC<{link: string; text?: string}> = ({link, text = 'View All'}) => {
  return (
    <Button type="primary">
      <Row gutter={[10, 0]}>
        <Col span={'auto'}>View All</Col>
        <Col span={'auto'}>
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

export default index;
