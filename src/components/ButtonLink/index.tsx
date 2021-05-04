import React, {FC} from 'react';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Row from 'antd/es/row';

import {ArrowRightOutlined} from '@ant-design/icons';

const BannerLink: FC<{link: string; text?: string}> = ({link, text = 'View All'}) => {
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

export default BannerLink;
