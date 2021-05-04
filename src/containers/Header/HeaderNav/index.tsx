import React, {FC, useEffect, useState} from 'react';
import Menu from 'antd/es/menu';
import {NavLink} from 'react-router-dom';

interface ComponentProps {
  type?: 'mainnet' | 'testnet';
}

const HeaderNav: FC<ComponentProps> = ({type = 'mainnet'}) => {
  const isMainnet = type === 'mainnet';

  const path = isMainnet ? 'tnb' : 'testnet';

  const [selectedNavlink, setSelectedNavlink] = useState(['overview']);

  useEffect(() => {
    const url = window.location.href;
    const navLink = url.split('/', 5)[4];
    console.log({navLink});
    switch (navLink) {
      case 'blocks':
      case 'transactions':
        setSelectedNavlink(['transactions']);
        break;
      case 'nodes':
        setSelectedNavlink(['nodes']);
        break;
      case 'stats':
        setSelectedNavlink(['stats']);
        break;
      default:
        setSelectedNavlink(['overview']);
        break;
    }
  }, []);

  const onChange = ({keyPath}: any) => {
    console.log(keyPath);
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
        <NavLink to={`/${path}/`}>Overview</NavLink>
      </Menu.Item>
      <Menu.Item key="transactions">
        <NavLink to={`/${path}/transactions`}>Transactions</NavLink>
      </Menu.Item>
      <Menu.Item key="nodes">
        <NavLink to={`/${path}/nodes`}>Nodes</NavLink>
      </Menu.Item>
      {isMainnet ? (
        <Menu.Item key="stats">
          <NavLink to="/tnb/stats">Stats</NavLink>
        </Menu.Item>
      ) : (
        <></>
      )}
    </Menu>
  );
};

export default HeaderNav;
