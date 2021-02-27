import React, {useEffect, useState} from 'react';
import {Menu} from 'antd';
import {} from 'antd/es/menu/';
import {NavLink} from 'react-router-dom';

const HeaderNav = () => {
  const [selectedNavlink, setSelectedNavlink] = useState(['1']);

  useEffect(() => {
    const url = window.location.href;
    const navLink = url.split('/', 4)[3];

    switch (navLink) {
      case 'transactions':
        setSelectedNavlink(['transactions']);
        break;
      case 'nodes':
        setSelectedNavlink(['nodes']);
        break;
      case 'charts':
        setSelectedNavlink(['charts']);
        break;
      default:
        setSelectedNavlink(['overview']);
        break;
    }
  }, []);

  const onChange = ({keyPath}: any) => {
    // console.log(keyPath);
    setSelectedNavlink(keyPath);
  };
  return (
    <Menu
      onClick={onChange}
      style={{lineHeight: '40px'}}
      theme="light"
      mode="horizontal"
      selectedKeys={selectedNavlink}
    >
      <Menu.Item style={{marginLeft: '0px'}} key="overview">
        <NavLink to="/">Overview</NavLink>
      </Menu.Item>
      <Menu.Item key="transactions">
        <NavLink to="/transactions">Transactions</NavLink>
      </Menu.Item>
      <Menu.Item key="nodes">
        <NavLink to="/nodes">Nodes</NavLink>
      </Menu.Item>
      <Menu.Item key="charts">
        <NavLink to="/charts">Charts</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default HeaderNav;
