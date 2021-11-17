import React, {FC} from 'react';

import Col from 'antd/es/col';
import Dropdown from 'antd/es/dropdown';
import AntDLayout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import Input from 'antd/es/input';
import Row from 'antd/es/row';
import Typography from 'antd/es/typography';
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

import tnbLogo from 'assets/tnb-logo.png';
import tnbTestnetLogo from 'assets/tnb-testnet-logo.png';
import {A} from 'components';
import {getCurrentChain} from 'selectors';
import {identifyQuery, QueryType} from 'utils/search';
import Banner from './Banner';
import HeaderNav from './HeaderNav';

const {Header: AntDHeader} = AntDLayout;
const {Search} = Input;

// interface ComponentProps {}

const Header: FC<{padding: string}> = ({padding}) => {
  const {isMainnet, path: chainPath, pvUrl, bankUrl} = useSelector(getCurrentChain);

  const logo = isMainnet ? tnbLogo : tnbTestnetLogo;

  const logoText = isMainnet ? 'thenewboston' : 'thenewboston Testnet';

  const menu = (
    <Menu>
      <Menu.Item>
        <A network="tnb" href="">
          <Row align="bottom" gutter={[15, 0]}>
            <Col offset={1} style={{lineHeight: '20px'}}>
              <img src={tnbLogo} width={15} alt="thenewboston logo" />
            </Col>

            <Col>
              <Typography.Text strong>thenewboston</Typography.Text>
            </Col>
          </Row>
        </A>
      </Menu.Item>

      <Menu.Item>
        <A network="testnet" href="">
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
        </A>
      </Menu.Item>
    </Menu>
  );

  const history = useHistory();

  const search = async (query: string) => {
    console.log(`searching... for ${query}`);
    const queryType = await identifyQuery(query, {pvUrl, bankUrl});
    console.log({queryType});
    switch (queryType) {
      case QueryType.account:
        history.push(`${chainPath}/account/${query}`);
        break;
      default:
        console.log('Unidentified Search Query');
    }
  };

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
              <Col>
                <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
                  <Row align="bottom" gutter={[10, 0]} style={{cursor: 'pointer', lineHeight: '20px'}}>
                    <Col>
                      <img src={logo} alt="thenewboston logo" />
                    </Col>
                    <Col>
                      {isMainnet ? (
                        <Typography.Title style={{margin: '0px'}} level={3}>
                          {logoText}
                        </Typography.Title>
                      ) : (
                        <Typography.Title style={{cursor: 'pointer', margin: '0px'}} level={3} type="secondary">
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
              <Col span={24}>
                <HeaderNav />
              </Col>
            </Row>
          </Col>
          <Col flex="auto" lg={11} xxl={10}>
            {' '}
            <Search
              placeholder="Account / Block Height / IP Address / Node ID / Transaction ID"
              allowClear
              enterButton="Search"
              size="middle"
              onSearch={search}
            />
          </Col>
        </Row>
      </AntDHeader>
    </>
  );
};

export default Header;
