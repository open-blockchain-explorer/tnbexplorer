import React from 'react';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';

import {ButtonLink, PageContentsLayout, Qr} from 'components';

const SponsorUs = () => {
  const tnbAddress = '1dfb0e7dd672032da0d8c29385ba6d22ec9d1134a115cc5596c5e4b69e6fc9a5';
  const ethAddress = '0x5Df197b20de86389A53577e21b5F22d492be6618';
  const btcAddress = '1AefJGT4JmJ4bYi91WpHn1aSmiQJyg3m9k';

  return (
    <PageContentsLayout justify="center" gutter={[30, 5]}>
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
          <Row align="middle" gutter={[15, 0]}>
            <Col>
              <Typography.Text strong>TNB Address</Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Text copyable ellipsis>
                {tnbAddress}
              </Typography.Text>
            </Col>
            <Col>
              <Qr text={tnbAddress} />
            </Col>
            <Col>
              <ButtonLink
                shape="round"
                href={`/tnb/payment-request?recipient=${tnbAddress}&amount=100&memo=Donation to TNB Explorer`}
              >
                Donate
              </ButtonLink>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={8} sm={8} xs={18}>
        <Card bordered>
          <Row>
            <Col span={24}>
              <Typography.Text strong>BTC Address</Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Text copyable ellipsis>
                {btcAddress}
              </Typography.Text>
            </Col>
            <Col>
              <Qr text={btcAddress} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={8} sm={8} xs={18}>
        <Card bordered>
          <Row>
            <Col span={24}>
              <Typography.Text strong>ETH Address</Typography.Text>
            </Col>
            <Col span={24}>
              <Typography.Text copyable ellipsis>
                {ethAddress}
              </Typography.Text>
            </Col>
            <Col>
              <Qr text={ethAddress} />
            </Col>
          </Row>
        </Card>
      </Col>
    </PageContentsLayout>
  );
};

export default SponsorUs;
