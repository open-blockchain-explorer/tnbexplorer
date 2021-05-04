import React, {FC, useState} from 'react';
import tnbLogo from 'assets/tnb-logo.png';
import tnbTestnetLogo from 'assets/tnb-testnet-logo.png';

import Col from 'antd/es/col';
import Dropdown from 'antd/es/dropdown';
import AntDLayout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import Input from 'antd/es/input';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';

import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import {Link} from 'react-router-dom';

import Banner from './Banner';
import HeaderNav from './HeaderNav';

const {Header: AntDHeader} = AntDLayout;
const {Search} = Input;

interface ComponentProps {
  type?: 'mainnet' | 'testnet';
}

const Header: FC<{padding: string} & ComponentProps> = ({padding, type = 'mainnet'}) => {
  const isMainnet = type === 'mainnet';

  const logo = isMainnet ? tnbLogo : tnbTestnetLogo;

  const logoText = isMainnet ? 'thenewboston' : 'thenewboston Testnet';

  const [underlineTNB, setUnderlineTNB] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/tnb/">
          <Row align="bottom" gutter={[15, 0]}>
            <Col offset={1} style={{lineHeight: '20px'}}>
              <img src={tnbLogo} width={15} alt="thenewboston logo" />
            </Col>

            <Col>
              <Typography.Text strong>thenewboston</Typography.Text>
            </Col>
          </Row>
        </Link>
      </Menu.Item>

      <Menu.Item>
        <Link to="/testnet/">
          <Row align="bottom" gutter={[15, 0]}>
            <Col offset={1} style={{lineHeight: '20px'}}>
              <img src={tnbTestnetLogo} width={15} alt="thenewboston logo" />
            </Col>

            <Col>
              <Typography.Text strong type="secondary">
                thenewboston Testnet
              </Typography.Text>
            </Col>
          </Row>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Banner padding={padding} />
      <AntDHeader
        style={{
          background: 'white',
          height: 'auto',
          paddingLeft: padding,
          paddingRight: padding,
          paddingTop: '30px',
        }}
      >
        <Row align="bottom" justify="space-between">
          <Col flex="450px">
            <Row>
              <Col
                onMouseOver={() => {
                  setUnderlineTNB(true);
                }}
                onMouseOut={() => {
                  setUnderlineTNB(false);
                }}
              >
                <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
                  <Row align="bottom" gutter={[10, 0]} style={{lineHeight: '20px'}}>
                    <Col>
                      <img src={logo} alt="thenewboston logo" />
                    </Col>
                    <Col>
                      {isMainnet ? (
                        <Typography.Title underline={underlineTNB} style={{margin: '0px'}} level={3}>
                          {logoText}
                        </Typography.Title>
                      ) : (
                        <Typography.Title underline={underlineTNB} style={{margin: '0px'}} level={3} type="secondary">
                          {logoText}
                        </Typography.Title>
                      )}
                    </Col>
                    <Col>
                      <CaretDownOutlined style={{fontSize: 'large', paddingBottom: '5px'}} />
                    </Col>
                  </Row>
                </Dropdown>
              </Col>
              <Col>
                <HeaderNav type={type} />
              </Col>
            </Row>
          </Col>
          <Col flex="auto" lg={11} xxl={10}>
            {' '}
            <Search
              placeholder="Address / IP Address / Node ID / Transaction ID"
              allowClear
              enterButton="Search"
              size="middle"
              onSearch={() => console.log('searching...')}
            />
          </Col>
        </Row>
      </AntDHeader>
    </>
  );
};

export default Header;
