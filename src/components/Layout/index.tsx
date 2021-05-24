import React, {FC} from 'react';
import Grid from 'antd/es/grid';
import AntDLayout from 'antd/es/layout';

import {responsiveWidth} from 'utils/responsive';
import Header from 'containers/Header';
import Footer from 'containers/Footer';

const {useBreakpoint} = Grid;

const Layout: FC = ({children}) => {
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
        <Header padding={responsiveWidth(screens, width)} />
        <AntDLayout.Content style={{padding: `0px ${responsiveWidth(screens, width)}`}}>{children}</AntDLayout.Content>
        <Footer padding={responsiveWidth(screens, width)} />
      </AntDLayout>
    </>
  );
};

export default Layout;
