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
import stats from 'data/stats.json';

const previousStats = stats[stats.length - 2];
const latestStats = stats[stats.length - 1];

const {useBreakpoint} = Grid;
const NetworkStats = () => {
  const screens = useBreakpoint();
  const networkStats = useSelector(getNetworkStats);
  console.log({networkStats});

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
                      data={{current: Number(latestStats.total), previous: Number(previousStats.total)}}
                    />
                    <InfoPane
                      title="Accounts"
                      data={{current: Number(latestStats.accounts), previous: Number(previousStats.accounts)}}
                    />
                    <InfoPane
                      title="Transactions"
                      data={{
                        current: networkStats.transactions as number,
                        previous: networkStats.transactions as number,
                      }}
                      showChangeAsPercent
                    />
                    <InfoPane
                      title="Active banks"
                      data={{current: networkStats.activeBanks as number, previous: networkStats.activeBanks as number}}
                    />
                    <InfoPane
                      title="Active Validators"
                      data={{
                        current: networkStats.activeValidators as number,
                        previous: networkStats.activeValidators as number,
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
              Last Updated: {new Date(latestStats.date).toString().slice(0, 16)}
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
                data={{current: Number(latestStats.accounts), previous: Number(previousStats.accounts)}}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" bordered>
              <InfoPane
                align="left"
                title="Active banks"
                data={{current: networkStats.activeBanks as number, previous: networkStats.activeBanks as number}}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" bordered>
              <InfoPane
                align="left"
                title="Transactions"
                data={{current: networkStats.transactions as number, previous: networkStats.transactions as number}}
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
                  current: networkStats.activeValidators as number,
                  previous: networkStats.activeValidators as number,
                }}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card size="small" bordered>
              <InfoPane
                align="left"
                title="distributed coins"
                data={{current: Number(latestStats.total), previous: Number(previousStats.total)}}
              />
            </Card>
          </Col>
          <Col>
            <Typography.Text type="secondary">
              {' '}
              Last Updated: {new Date(latestStats.date).toString().slice(0, 16)}
            </Typography.Text>
          </Col>
        </Row>
      )}
    </>
  );
};

export default NetworkStats;
