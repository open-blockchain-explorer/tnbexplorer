import React, {FC, useEffect, useState} from 'react';

import {getData} from 'api';
import {NetworkStats, PageContentsLayout} from 'components';
import Col from 'antd/es/col';

import {
  DistributionChart,
  MarketCapChart,
  OwnershipChart,
  PriceChart,
  TotalAccountsChart,
  TotalSupplyChart,
} from './Charts';

const Stats: FC = () => {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    getData(`http://bank.tnbexplorer.com/stats/api/?format=json&ordering=date`).then((data) => {
      if (data && data.length) {
        data.reduce((previousTotal: number, record: any) => {
          record.changeInCoins = record.total - previousTotal;
          return record.total;
        }, 0);
      }
      setStatsData(data);
    });
  }, []);

  return (
    <PageContentsLayout>
      <Col span={24}>
        <NetworkStats />
      </Col>

      <Col md={12} span={24}>
        <PriceChart />
      </Col>
      <Col md={12} span={24}>
        <MarketCapChart data={statsData} />
      </Col>

      <Col span={24}>
        <TotalSupplyChart data={statsData} />
      </Col>
      <Col md={12} span={24}>
        <DistributionChart data={statsData} />
      </Col>

      <Col md={12} span={24}>
        <TotalAccountsChart data={statsData} />
      </Col>

      <Col span={24}>
        <OwnershipChart data={statsData} />
      </Col>
    </PageContentsLayout>
  );
};

export default Stats;
