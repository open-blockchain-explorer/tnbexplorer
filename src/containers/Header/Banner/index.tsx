import React, {FC} from 'react';
import Col from 'antd/es/col';
import AntDLayout from 'antd/es/layout';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';

import {ReactComponent as HologramLogo} from 'assets/hologram.svg';
import {BannerLink} from 'components';

const Banner: FC<{padding: string}> = ({padding}) => {
  return (
    <AntDLayout.Header
      style={{
        color: 'white',
        height: 'auto',
        padding: `5px ${padding}`,
      }}
    >
      <Row align="middle" justify="space-between">
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
            <Typography.Title style={{color: 'white', fontWeight: 'bold', margin: '0px'}} level={3}>
              TNB Explorer
            </Typography.Title>
          </Col>
        </Row>
        <Col style={{lineHeight: '15px'}}>
          <Space size="large">
            <BannerLink iconColor="#1890ff" link="http://bank.tnbexplorer.com/faucet/" text="Faucet" />
            <BannerLink iconColor="red" link="/tnb/sponsor-us" text="Sponsor us" />
          </Space>
        </Col>
      </Row>
    </AntDLayout.Header>
  );
};

export default Banner;
