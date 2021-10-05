import React, {FC} from 'react';
import Button, {ButtonProps} from 'antd/es/button';
import Col from 'antd/es/col';
import Row from 'antd/es/row';

import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import {A} from 'components';

const ButtonLink: FC<ButtonProps & {href: string; viewAll?: boolean}> = ({
  href,
  type,
  children,
  viewAll,
  ...buttonProps
}) => {
  return (
    <A href={href}>
      <Button type={viewAll ? 'primary' : type} {...buttonProps}>
        {viewAll ? (
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
        ) : (
          children
        )}
      </Button>
    </A>
  );
};

export default ButtonLink;
