import React, {FC} from 'react';
import Grid from 'antd/es/grid';
import AntDLayout from 'antd/es/layout';
import {useDispatch} from 'react-redux';

import Header from 'containers/Header';
import Footer from 'containers/Footer';
import {BANK_URL, PV_URL, TESTNET_BANK_URL, TESTNET_PV_URL} from 'constants/url';
import {useChainPath} from 'hooks';
import {setCurrentChainData} from 'store/app';
import {responsiveWidth} from 'utils/responsive';

const {useBreakpoint} = Grid;

const Layout: FC = ({children}) => {
  const currentChain = useChainPath();
  const isMainnet = currentChain === '/tnb';
  const dispatch = useDispatch();

  dispatch(
    setCurrentChainData({
      isMainnet,
      bankUrl: isMainnet ? BANK_URL : TESTNET_BANK_URL,
      pvUrl: isMainnet ? PV_URL : TESTNET_PV_URL,
    }),
  );

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
