import React from 'react';

import {Card, Col, Divider, Row, Space, Typography} from 'antd';

import {InfoPane} from 'components';
import stats from 'data/stats.json';

const previousStats = stats[stats.length - 2];
const latestStats = stats[stats.length - 1];

const NetworkStats = () => {
  return (
    <Row justify="end">
      <Col span={24}>
        <Card bordered={false} style={{overflow: 'auto', width: '100%'}}>
          <Row justify="center">
            <Col xl={22} xxl={21}>
              <Space size="small" split={<Divider type="vertical" style={{height: '90px'}} />}>
                <InfoPane
                  title="distributed coins"
                  data={{current: Number(latestStats.total), previous: Number(previousStats.total)}}
                />
                <InfoPane
                  title="Accounts"
                  data={{current: Number(latestStats.accounts), previous: Number(previousStats.accounts)}}
                />
                <InfoPane title="Transactions" data={{current: 23566453, previous: 32566453}} showChangeAsPercent />
                <InfoPane title="Active banks" data={{current: 72, previous: 74}} />
                <InfoPane title="Active Validators" data={{current: 104, previous: 94}} />
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
  );
};

export default NetworkStats;
