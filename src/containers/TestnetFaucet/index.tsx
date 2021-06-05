import React, {useState} from 'react';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Card from 'antd/es/card';
import Form from 'antd/es/form';
import Image from 'antd/es/image';
import Input from 'antd/es/input';
import Radio from 'antd/es/radio';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';

import {PageContentsLayout} from 'components';
import tweet_webp from 'assets/FaucetSteps/tweet.webp';
import tweet_png from 'assets/FaucetSteps/tweet.png';
import step2_webp from 'assets/FaucetSteps/step2.webp';
import step2_png from 'assets/FaucetSteps/step2.png';
import step3_webp from 'assets/FaucetSteps/step3.webp';
import step3_png from 'assets/FaucetSteps/step3.png';
// import step4_webp from 'assets/FaucetSteps/step4.webp';
import step4_png from 'assets/FaucetSteps/step4.png';

const Step = ({src, fallback, alt, title, description}: {[key: string]: string}) => (
  <Row style={{width: '300px'}}>
    <Col span={24}>
      <Image src={src} fallback={fallback} alt={alt} />
    </Col>
    <Col>
      <Typography.Title level={4}>{title}</Typography.Title>
    </Col>
    <Col>
      <Typography.Text>{description} </Typography.Text>
    </Col>
  </Row>
);

const TestnetFaucet = () => {
  const [form] = Form.useForm();
  const requiredMark = false;
  const [urlValidateStatus, setUrlValidateStatus] = useState('');

  return (
    <PageContentsLayout>
      <Col span={24}>
        <Card>
          <Row justify="center" gutter={[30, 30]}>
            <Col>
              <Typography.Text>
                To connect to the TNB Testnet network use{' '}
                <Typography.Link href="http://52.172.197.46"> 52.172.197.46</Typography.Link> as your{' '}
                <Typography.Text strong>active bank</Typography.Text>
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text strong> Get Coins to test on the Testnet</Typography.Text>
              <Form
                form={form}
                layout="vertical"
                initialValues={{requiredMarkValue: requiredMark}}
                requiredMark={requiredMark}
                onFinish={() => setUrlValidateStatus('success')}
                onFinishFailed={() => setUrlValidateStatus('error')}
              >
                <Form.Item label="Amount" name="amount" initialValue={100}>
                  <Radio.Group>
                    <Radio.Button value={100}>100 coins / 3 hrs</Radio.Button>
                    <Radio.Button value={500}>500 coins / day</Radio.Button>
                    <Radio.Button value={1500}>1500 coins / 3 days</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="Post Url"
                  name="url"
                  required
                  tooltip="This is a required field"
                  rules={[
                    {required: true, message: 'This field is required'},
                    {type: 'url', message: 'Pleases enter a valid Url'},
                  ]}
                >
                  <Input placeholder="URL of post containing your TNB address..." />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Collect Coins
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col>
              <Col>
                <Typography.Text mark>
                  To prevent a single account from accumulating all the coins, requests are made using a public facebook
                  or twitter account.
                </Typography.Text>
              </Col>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <Row justify="space-around" gutter={[20, 30]}>
            <Col span={24}>
              <Typography.Title level={4}>How to request for testnet coins?</Typography.Title>
            </Col>

            <Col>
              <Step
                src={tweet_webp}
                fallback={tweet_png}
                alt="example tweet"
                title="1. Post on Social Media"
                description="Create a post on Facebook or a tweet on Twitter
Mention #TNBFaucet and thenewboston address"
              />
            </Col>
            <Col>
              <Step
                src={step2_webp}
                fallback={step2_png}
                alt="Step 2 img"
                title="2. Copy Post URL"
                description="Make sure the Post is Public
                Copy the complete URL of the post"
              />
            </Col>

            <Col>
              <Step
                src={step3_webp}
                fallback={step3_png}
                alt="Step 3 img"
                title="3. Open TNB Faucet & Paste URL"
                description="Paste the URL
                Select the Number of coins you want
                Click on Collect coins"
              />
            </Col>
            <Col>
              <Step
                src={step4_png}
                fallback={step4_png}
                alt="Step 4 img"
                title="4. Connect to TNB Testnet"
                description="Open Account Manager / TNB wallet
                Use52.172.197.46 as your active bank
                Click on Collect coins"
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </PageContentsLayout>
  );
};

export default TestnetFaucet;
