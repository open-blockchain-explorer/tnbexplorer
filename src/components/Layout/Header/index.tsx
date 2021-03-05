import React, { FC } from 'react';
// import { ReactComponent as HologramLogo } from "assets/hologram.svg";
import tnbLogo from '../../../assets/tnb-logo.png';
import {
  Col,
  Grid,
  Layout as AntLayout,
  Menu,
  Input,
  Row,
  Typography,
} from 'antd';

// import HologramLogo from "assets/Hologram-logo";
import { layoutPadding } from 'utils/responsive';

const { Header: AntDHeader } = AntLayout;
const { useBreakpoint } = Grid;
const { Title } = Typography;
const { Search } = Input;

const Header: FC = () => {
  const screens = useBreakpoint();

  return (
    <>
      {/* <AntDHeader
        style={{
          color: "white",
          padding: `5px ${layoutPadding(screens)}`,
          height: "auto",
        }}
      >
        <Row gutter={10} align="middle">
          <Col style={{ lineHeight: "15px" }}>
            <HologramLogo />
          </Col>

          <Col>
            <Title
              style={{ color: "white", fontWeight: "bold", margin: "0px" }}
              level={3}
            >
              TNB Explorer
            </Title>
          </Col>
        </Row>
      </AntDHeader> */}

      <AntDHeader
        style={{
          background: 'white',
          height: 'auto',
          paddingTop: '30px',
          paddingLeft: layoutPadding(screens),
          paddingRight: layoutPadding(screens),
        }}
      >
        <Row align="bottom" justify="space-between">
          <Col flex="450px">
            <Row align="bottom" gutter={[20, 0]}>
              <Col style={{ lineHeight: '20px', display: 'hidden' }}>
                <img src={tnbLogo} alt="thenewboston logo" />
              </Col>

              <Col>
                <Title style={{ margin: '0px' }} level={3}>
                  thenewboston
                </Title>
              </Col>
            </Row>
            <Menu
              style={{ lineHeight: '40px' }}
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['1']}
            >
              <Menu.Item style={{ marginLeft: '0px' }} key="1">
                Overview
              </Menu.Item>
              <Menu.Item key="2">Transactions</Menu.Item>
              <Menu.Item key="3">Nodes</Menu.Item>
              <Menu.Item key="4">Charts</Menu.Item>
            </Menu>
          </Col>
          <Col flex="auto" lg={11} xxl={10}>
            {' '}
            <Search
              placeholder="Address / IP Address / Node ID / Transaction ID"
              allowClear
              enterButton="Search"
              size="middle"
              onSearch={() => null}
            />
          </Col>
        </Row>
      </AntDHeader>
    </>
  );
};

export default Header;
