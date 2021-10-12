import React, {FC} from 'react';
import axios from 'axios';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import Card from 'antd/es/card';

import Form from 'antd/es/form';
import Image from 'antd/es/image';
import Input from 'antd/es/input';
import message, {MessageApi} from 'antd/es/message';
import Radio from 'antd/es/radio';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';
import ReCAPTCHA from 'react-google-recaptcha';

import tweet_webp from 'assets/FaucetSteps/tweet.webp';
import tweet_png from 'assets/FaucetSteps/tweet.png';
import step2_webp from 'assets/FaucetSteps/step2.webp';
import step2_png from 'assets/FaucetSteps/step2.png';
import step3_webp from 'assets/FaucetSteps/step3.webp';
import step3_png from 'assets/FaucetSteps/step3.png';
import step4_webp from 'assets/FaucetSteps/step4.webp';
import step4_png from 'assets/FaucetSteps/step4.png';
import {A, PageContentsLayout} from 'components';
import {TESTNET_BANK_URL, CORS_BRIDGE} from 'constants/url';

interface StepProps {
  src: string;
  fallback: string;
  alt: string;
  title: string;
  description?: string;
}

const Step: FC<StepProps> = ({src, fallback, alt, title, children}) => (
  <Row justify="center" style={{width: '300px'}}>
    <Col span={24}>
      <Image src={src} fallback={fallback} alt={alt} />
    </Col>
    <Col>
      <Typography.Title level={4}>{title}</Typography.Title>
    </Col>
    <Col style={{textAlign: 'center'}}>{children}</Col>
  </Row>
);

interface FaucetRequest {
  amountOptionId: number;
  url: string;
}

const TestnetFaucet = () => {
  const [form] = Form.useForm();
  const requiredMark = false;
  const REACT_APP_RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY!;

  const recaptchaRef: any = React.createRef<HTMLInputElement>();

  const faucetRequest = async ({amountOptionId, url}: FaucetRequest) => {
    const token = await recaptchaRef.current.executeAsync();

    // Exit fn if token is null
    if (token === null) return message.error('Too many requests to testnet faucet');

    let alertContent;
    let alertType: keyof MessageApi;

    try {
      const faucetResponse = await axios.post(`${CORS_BRIDGE}/${TESTNET_BANK_URL}/faucet/api`, {
        faucet_option_id: amountOptionId,
        url,
        recaptcha: token,
      });

      const {type, content} = faucetResponse.data;
      alertType = type as keyof MessageApi;
      alertContent = content;
    } catch (e: any) {
      const {type, content} = e.response.data;
      alertType = type as keyof MessageApi;
      alertContent = content;
    }

    console.log({alertType, alertContent});

    // Alert message
    message[alertType](alertContent, 5);
  };

  return (
    <PageContentsLayout>
      <ReCAPTCHA badge="bottomright" ref={recaptchaRef} size="invisible" sitekey={REACT_APP_RECAPTCHA_KEY}>
        {/* Testnet Faucet Form */}
        <Col span={24}>
          <Card>
            <Row align="middle" justify="space-around" gutter={[30, 30]}>
              <Col xs={23} sm={20} md={16} lg={13} xl={12}>
                <Typography.Title level={4}> Get Coins to test on the Testnet</Typography.Title>
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={{requiredMarkValue: requiredMark}}
                  requiredMark={requiredMark}
                  onFinish={faucetRequest}
                  onFinishFailed={() => console.log('Form failed')}
                >
                  <Form.Item label="Amount" name="amountOptionId" initialValue={1}>
                    <Radio.Group>
                      <Radio.Button value={1}>100 coins / 3 hrs</Radio.Button>
                      <Radio.Button value={2}>500 coins / day</Radio.Button>
                      <Radio.Button value={3}>1500 coins / 3 days</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label="Post Url"
                    name="url"
                    required
                    // validateStatus={urlValidateStatus as FormItemProps['validateStatus']}
                    tooltip="The link to your facebook post or tweet"
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
              <Col xs={23} sm={20} md={16} lg={10}>
                <Typography.Title level={5}>
                  Testnet Bank:{' '}
                  <Typography.Link href={`${TESTNET_BANK_URL}/config`}> {TESTNET_BANK_URL.slice(7)}</Typography.Link>
                </Typography.Title>
                <Typography.Text>
                  To connect to the TNB Testnet network set the Testnet Bank as your{' '}
                  <Typography.Text strong>active bank</Typography.Text>
                </Typography.Text>
                <br />
                <br />
                <Typography.Text mark>
                  To prevent a single account from accumulating all the coins, requests are made using a public facebook
                  or twitter account.
                </Typography.Text>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* How to  */}
        <Col span={24}>
          <Card>
            <Row justify="space-around" gutter={[30, 30]}>
              <Col span={24}>
                <Typography.Title style={{textAlign: 'center'}} level={3}>
                  How to request for testnet coins?
                </Typography.Title>
              </Col>

              <Col>
                <Step src={tweet_webp} fallback={tweet_png} alt="example tweet" title="1. Post on Social Media">
                  Create a post on Facebook or a{' '}
                  <A
                    href={
                      'https://twitter.com/intent/tweet?url=&text=Requesting%20faucet%20funds%20into%20[Account%20Number]%20on%20the%20%23TNBFaucet%20test%20network.'
                    }
                  >
                    tweet
                  </A>{' '}
                  on Twitter
                  <br />
                  Mention #TNBFaucet and thenewboston address
                </Step>
              </Col>
              <Col>
                <Step src={step2_webp} fallback={step2_png} alt="Step 2 img" title="2. Copy Post URL">
                  Make sure the Post is Public
                  <br />
                  Copy the complete URL of the post
                </Step>
              </Col>

              <Col>
                <Step src={step3_webp} fallback={step3_png} alt="Step 3 img" title="3. Open TNB Faucet & Paste URL">
                  Paste the URL
                  <br />
                  Select the Number of coins you want
                  <br />
                  Click on Collect coins
                </Step>
              </Col>
              <Col>
                <Step src={step4_png} fallback={step4_webp} alt="Step 4 img" title="4. Connect to TNB Testnet">
                  Open the Account Manager / TNB Wallet
                  <br />
                  Use <A href={TESTNET_BANK_URL}>{TESTNET_BANK_URL.slice(7)} </A>
                  as your active bank
                  <br />
                  Build great apps for the mainnet without the fear of burning coins!
                </Step>
              </Col>
            </Row>
          </Card>
        </Col>
      </ReCAPTCHA>
    </PageContentsLayout>
  );
};

export default TestnetFaucet;
