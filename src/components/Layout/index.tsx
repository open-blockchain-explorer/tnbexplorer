import React, {FC} from 'react';
import {Grid, Layout as AntDLayout} from 'antd';
import {responsiveWidth} from 'utils/responsive';
import Header from 'containers/Header';

const {useBreakpoint} = Grid;

const {Footer, Content} = AntDLayout;

interface ComponentProps {
  type?: 'mainnet' | 'testnet';
}

const Layout: FC<ComponentProps> = ({children, type = 'mainnet'}) => {
  const screens = useBreakpoint();

  /* eslint-disable sort-keys */
  const width = {
    xxl: '150px',
    xl: '70px',
    lg: '70px',
    md: '10px',
    sm: '25px',
    xs: '12.5px',
  };

  console.log(screens, responsiveWidth(screens, width));

  return (
    <>
      <AntDLayout>
        <Header padding={responsiveWidth(screens, width)} type={type} />
        <Content style={{padding: `50px ${responsiveWidth(screens, width)}`}}>{children}</Content>
        <Footer style={{paddingLeft: responsiveWidth(screens, width)}}>Footer</Footer>
      </AntDLayout>
    </>
  );
};

export default Layout;
