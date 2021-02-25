import React, {FC, SVGProps} from 'react';
import {ReactComponent as HologramLogo} from 'assets/hologram.svg';
import tnbLogo from 'assets/tnb-logo.png';
import {Col, Grid, Layout as AntLayout, Menu, Input, Row, Space, Typography} from 'antd';

import HeaderNav from './HeaderNav';

const {Header: AntDHeader} = AntLayout;
const {Title} = Typography;
const {Search} = Input;

const Header: FC<{padding?: string}> = ({padding}) => {
  return (
    <>
      <AntDHeader
        style={{
          color: 'white',
          height: 'auto',
          padding: `5px ${padding}`,
        }}
      >
        <Row gutter={10} align="middle">
          <Col style={{lineHeight: '15px'}}>
            <HologramLogo
              style={{
                background: 'white',
                borderRadius: '2px',
                height: '40px',
                padding: '3px',
                width: '40px',
              }}
            />
          </Col>

          <Col>
            <Title style={{color: 'white', fontWeight: 'bold', margin: '0px'}} level={3}>
              TNB Explorer
            </Title>
          </Col>
        </Row>
      </AntDHeader>

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
            <Row align="bottom" gutter={[20, 0]}>
              <Col style={{lineHeight: '20px'}}>
                <img src={tnbLogo} alt="thenewboston logo" />
              </Col>

              <Col>
                <Title style={{margin: '0px'}} level={3}>
                  thenewboston
                </Title>
              </Col>
            </Row>
            <HeaderNav />
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
