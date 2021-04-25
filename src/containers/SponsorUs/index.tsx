import React from 'react';
import {Card, Col, Row, Typography} from 'antd';

import {Qr} from 'components';

const SponsorUs = () => {
  return (
    <>
      <Row justify="center" gutter={[30, 5]}>
        <Col span={24} style={{textAlign: 'center'}}>
          <Typography.Title>Donate to TNB Explorer</Typography.Title>
        </Col>

        <Col span={24} style={{textAlign: 'center'}}>
          <p>
            <Typography.Text>
              All the Donations will help TNB Explorer to continue to provide all our amazing services for free
            </Typography.Text>
          </p>
        </Col>

        <Col span={8} sm={8} xs={18}>
          <Card bordered>
            <Row>
              <Col>
                <Typography.Text strong>Donate with TNB</Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text copyable ellipsis>
                  1dfb0e7dd672032da0d8c29385ba6d22ec9d1134a115cc5596c5e4b69e6fc9a5
                </Typography.Text>
              </Col>
              <Col>
                <Qr text={'1dfb0e7dd672032da0d8c29385ba6d22ec9d1134a115cc5596c5e4b69e6fc9a5'} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={8} sm={8} xs={18}>
          <Card bordered>
            <Row>
              <Col span={24}>
                <Typography.Text strong>Donate with BTC</Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text copyable ellipsis>
                  1AefJGT4JmJ4bYi91WpHn1aSmiQJyg3m9k
                </Typography.Text>
              </Col>
              <Col>
                <Qr text="1AefJGT4JmJ4bYi91WpHn1aSmiQJyg3m9k" />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8} sm={8} xs={18}>
          <Card bordered>
            <Row>
              <Col span={24}>
                <Typography.Text strong>Donate with ETH</Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text copyable ellipsis>
                  0x5Df197b20de86389A53577e21b5F22d492be6618
                </Typography.Text>
              </Col>
              <Col>
                <Qr text="0x5Df197b20de86389A53577e21b5F22d492be6618" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SponsorUs;
