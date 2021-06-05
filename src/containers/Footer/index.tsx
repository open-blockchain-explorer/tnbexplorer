import React, {FC} from 'react';
import AntDLayout from 'antd/es/layout';
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import List from 'antd/es/list';
import Space from 'antd/es/space';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';

import {Link} from 'react-router-dom';

import {ReactComponent as HologramLogo} from 'assets/hologram.svg';
import {ReactComponent as TwitterLogo} from 'assets/twitter.svg';
import {ReactComponent as InstagramLogo} from 'assets/instagram.svg';

const Footer: FC<{padding: string}> = ({padding}) => {
  const explorer = [
    {title: 'Mainnet Explorer', link: '/tnb'},
    {title: 'Testnet Explorer', link: '/testnet'},
  ];
  const services = [
    {title: 'Payment Request', link: '/tnb/payment-request'},
    {title: 'Testnet Faucet', link: '/testnet/faucet'},
    {title: 'Trace Transactions'},
  ];
  const resources = [
    {title: 'API'},
    {title: 'Open Source', link: 'https://github.com/open-blockchain-explorer'},
    {title: 'thenewboston docs', link: 'https://thenewboston.com/guide/introduction'},
  ];

  return (
    <AntDLayout.Footer style={{padding: `40px ${padding}`, backgroundColor: 'white'}}>
      <Row justify="space-between" gutter={[30, 30]}>
        <Col span={24} md={6} lg={5} style={{marginTop: '-10px'}}>
          <Space direction="horizontal">
            <HologramLogo width="40px" height="40px" />

            <Typography.Title type="secondary" style={{color: '#D6DFEA', fontWeight: 'bold', width: '200px'}} level={3}>
              TNB Explorer
            </Typography.Title>
          </Space>
          <Col push={3} span={24}>
            <Row gutter={[20, 20]} align="middle">
              <Col>
                <Button
                  type="text"
                  target="_blank"
                  href="https://twitter.com/ExplorerTnb"
                  shape="circle"
                  icon={<TwitterLogo width="25px" height="25px" />}
                />
              </Col>
              <Col>
                <Button
                  type="text"
                  target="_blank"
                  shape="circle"
                  href="https://www.instagram.com/tnbexplorer/"
                  icon={<InstagramLogo width="25px" height="25px" />}
                />
              </Col>
            </Row>
          </Col>
        </Col>
        <Col>
          <Typography.Text strong>EXPLORER</Typography.Text>
          <br />
          <br />
          <List
            itemLayout="horizontal"
            dataSource={explorer}
            renderItem={(item) =>
              item.link ? (
                <a href={item.link}>
                  <Button type="ghost" style={{padding: '0px', border: '0px'}}>
                    {item.title}
                  </Button>
                  <br />
                </a>
              ) : (
                <>
                  <Button type="ghost" style={{padding: '0px', border: '0px'}}>
                    {item.title}
                  </Button>
                  <br />
                </>
              )
            }
          />
        </Col>
        <Col>
          <Typography.Text strong>SERVICES</Typography.Text>
          <br />
          <br />
          <List
            itemLayout="horizontal"
            dataSource={services}
            renderItem={(item) =>
              item.link ? (
                <a href={item.link}>
                  <Button type="ghost" style={{padding: '0px', border: '0px'}}>
                    {item.title}
                  </Button>
                  <br />
                </a>
              ) : (
                <>
                  <Button type="ghost" style={{padding: '0px', border: '0px'}}>
                    {item.title}
                  </Button>
                  <br />
                </>
              )
            }
          />
        </Col>
        <Col>
          <Typography.Text strong>RESOURCES</Typography.Text>
          <br />
          <br />

          <List
            itemLayout="horizontal"
            dataSource={resources}
            renderItem={(item) =>
              item.link ? (
                <a href={item.link}>
                  <Button type="ghost" style={{padding: '0px', border: '0px'}}>
                    {item.title}
                  </Button>
                  <br />
                </a>
              ) : (
                <>
                  <Button type="ghost" style={{padding: '0px', border: '0px'}}>
                    {item.title}
                  </Button>
                  <br />
                </>
              )
            }
          />
        </Col>
      </Row>
    </AntDLayout.Footer>
  );
};

export default Footer;
