import React, {useEffect, useState} from 'react';

import axios from 'axios';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';
import Grid from 'antd/es/grid';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';
import {useSelector} from 'react-redux';

import {InfoPane} from 'components';
import {CORS_BRIDGE} from 'constants/url';
import {getNetworkStats} from 'selectors';

const {useBreakpoint} = Grid;
const NetworkStats = () => {
  const screens = useBreakpoint();
  const networkStats = useSelector(getNetworkStats);
  console.log({networkStats});

  const defaultData = {
    total: 0,
    accounts: 0,
    transactions: 0,
    activeNodes: 0,
    date: '',
  };

  const [prevData, setPrevData] = useState(defaultData);
  const [currentData, setCurrentData] = useState(defaultData);

  useEffect(() => {
    const timestamp = new Date().getTime();
    const prevDate = new Date(timestamp - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const nextDate = new Date(timestamp).toISOString().slice(0, 10);

    console.log(prevDate, nextDate);

    axios
      .get(`${CORS_BRIDGE}/http://bank.tnbexplorer.com/stats/api/?start=${prevDate}&end=${nextDate}`)
      .then((response) => {
        console.log(response.data);

        setPrevData(response.data[0]);
        setCurrentData(response.data[response.data.length - 1]);
      });
  }, []);

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
                      data={{current: Number(currentData.total), previous: Number(prevData.total)}}
                    />
                    {/* <InfoPane
                      title="Price"
                      data={{current: Number(currentData.total), previous: Number(prevData.total)}}
                    /> */}
                    <InfoPane
                      title="Accounts"
                      data={{current: Number(currentData.accounts), previous: Number(prevData.accounts)}}
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
              Last Updated: {new Date(currentData.date).toString().slice(0, 16)}
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
                data={{current: Number(currentData.accounts), previous: Number(prevData.accounts)}}
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
                data={{current: Number(currentData.total), previous: Number(prevData.total)}}
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
              Last Updated: {new Date(currentData.date).toString().slice(0, 16)}
            </Typography.Text>
          </Col>
        </Row>
      )}
    </>
  );
};

export default NetworkStats;
