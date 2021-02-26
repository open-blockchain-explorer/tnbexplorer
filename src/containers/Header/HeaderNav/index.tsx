import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const HeaderNav = () => {
  const url = window.location.href;
  console.log(url);
  return (
    <Menu style={{lineHeight: '40px'}} theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item style={{marginLeft: '0px'}} key="1">
        <Link to="/">Overview</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/transactions">Transactions</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/nodes">Nodes</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/charts">Charts</Link>
      </Menu.Item>
    </Menu>
  );
};

export default HeaderNav;
