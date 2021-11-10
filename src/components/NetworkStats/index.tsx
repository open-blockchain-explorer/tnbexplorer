import React from 'react';

import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';
import Grid from 'antd/es/grid';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';
import {useSelector} from 'react-redux';

import {InfoPane} from 'components';
import {getNetworkStats} from 'selectors';

const {useBreakpoint} = Grid;
const NetworkStats = () => {
  const screens = useBreakpoint();
  const {recent: recentStats, previous: previousStats} = useSelector(getNetworkStats);

  return (
    <>
      {screens.md ? (
        <Row justify="end">
          <Col span={24}>
            <Card bordered={false} style={{overflow: 'auto', width: '100%'}}>
              <Row justify="center">
                <Col xl={22} xxl={20}>
                  <Space size="small" split={<Divider type="vertical" style={{height: '90px'}} />}>
                    <InfoPane
                      title="distributed coins"
                      data={{
                        current: Number(recentStats.distributedCoins),
                        previous: Number(previousStats.distributedCoins),
                      }}
                    />
                    {/* <InfoPane
                      title="Price"
                      data={{current: Number(recentStats.total), previous: Number(previousStats.total)}}
                    /> */}
                    <InfoPane
                      title="Accounts"
                      data={{current: Number(recentStats.accounts), previous: Number(previousStats.accounts)}}
                    />
                    <InfoPane
                      title="Transactions"
                      data={{
                        current: recentStats.transactions as number,
                        previous: previousStats.transactions as number,
                      }}
                      showChangeAsPercent
                    />
                    <InfoPane
                      title="Active banks"
                      data={{current: recentStats.activeBanks as number, previous: previousStats.activeBanks as number}}
                    />
                    <InfoPane
                      title="Active Validators"
                      data={{
                        current: recentStats.activeValidators as number,
                        previous: previousStats.activeValidators as number,
                      }}
                    />
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col>
            <Typography.Text type="secondary">
              {' '}
              Last Updated: {new Date(recentStats.date ?? 0).toString().slice(0, 16)}
            </Typography.Text>
          </Col>
        </Row>
      ) : (
        <Row justify="end">
          <Col span={12}>
            <Card size="small" bordered>
              <InfoPane
                align="left"
                title="Accounts"
                data={{current: Number(recentStats.accounts), previous: Number(previousStats.accounts)}}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" bordered>
              <InfoPane
                align="left"
                title="Active banks"
                data={{current: recentStats.activeBanks as number, previous: previousStats.activeBanks as number}}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" bordered>
              <InfoPane
                align="left"
                title="Transactions"
                data={{current: recentStats.transactions as number, previous: previousStats.transactions as number}}
                showChangeAsPercent
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" bordered>
              <InfoPane
                align="left"
                title="Active Validators"
                data={{
                  current: recentStats.activeValidators as number,
                  previous: previousStats.activeValidators as number,
                }}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card size="small" bordered>
              <InfoPane
                align="left"
                title="distributed coins"
                data={{current: Number(recentStats.distributedCoins), previous: Number(previousStats.distributedCoins)}}
              />
            </Card>
          </Col>
          {/* <Col span={12}>
            <Card size="small" bordered>
              <InfoPane align="left" title="price (usd)" data={{current: 0.015, previous: 0.001}} />
            </Card>
          </Col> */}
          <Col>
            <Typography.Text type="secondary">
              {' '}
              Last Updated: {new Date(recentStats.date ?? 0).toString().slice(0, 16)}
            </Typography.Text>
          </Col>
        </Row>
      )}
    </>
  );
};

export default NetworkStats;
