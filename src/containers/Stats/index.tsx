import React, {FC} from 'react';
import Col from 'antd/es/col';

import {Area, Bar, Pie} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard, NetworkStats, PageContentsLayout} from 'components';
import stats from 'data/stats.json';
import {formatPercent} from 'utils/format';
import {DistributionChart, MarketCapChart, PriceChart, TotalAccountsChart, TotalSupplyChart} from './Charts';

const dailyChange: {coins: number; date: string}[] = [];
stats.reduce((acc, record) => {
  dailyChange.push({
    coins: record.total - acc,
    date: record.date,
  });

  return record.total;
}, 0);

const config = {
  appendPadding: [20, 0, 0, 0],
  data: stats,
  height: 400,
  slider: {
    start: 0,
    end: 1,
  },
  smooth: false,

  xAxis: {
    title: {
      offset: 40,
      text: 'Date',
      visible: true,
    },
    type: 'time',
  },
  xField: 'date',
};

const ownershipPercentage: any[] = [];

stats.forEach((record) => {
  const {top_5: top5, top_10: top10, top_25: top25, top_50: top50} = record.ownership_percent;

  ownershipPercentage.push({
    date: record.date,
    ownership: '0% - 5%',
    percent: top5,
  });

  ownershipPercentage.push({
    date: record.date,
    ownership: '5% - 10%',
    percent: top10 - top5,
  });

  ownershipPercentage.push({
    date: record.date,
    ownership: '10% - 25%',
    percent: top25 - top10,
  });

  ownershipPercentage.push({
    date: record.date,
    ownership: '25% - 50%',
    percent: top50 - top25,
  });

  ownershipPercentage.push({
    date: record.date,
    ownership: '50% - 100%',
    percent: 1 - top50,
  });
});

const ownershipConfig = {
  ...config,
  appendPadding: [10, 0, 0, 0],
  areaStyle: {fillOpacity: 0.7},
  color: ['#00dbff', '#009dff', '#007dcc', '#e1ae19', '#7363f6'],
  data: ownershipPercentage,
  isPercent: true,
  meta: {
    date: {
      formatter: function formatter(date: string) {
        return formatDate(new Date(date), 'MM/dd/yy');
      },
      nice: true,
      tickCount: 10,
    },
    percent: {
      formatter: function formatter(percent: number) {
        return formatPercent(Number(percent * 100), 0);
      },
      nice: true,
    },
  },

  seriesField: 'ownership',
  xAxis: {
    title: {
      offset: 40,
      text: 'Date',
      visible: true,
    },
    type: 'time',
  },
  xField: 'date',
  yAxis: {
    title: {
      text: 'Ownership Percent',
      visible: true,
    },
    type: 'linear',
  },
  yField: 'percent',
};
const wealthDistribution: any[] = [];

for (let index = ownershipPercentage.length - 5; index < ownershipPercentage.length; index += 1) {
  wealthDistribution.push(ownershipPercentage[index]);
}
const wealthBarChartConfig = {
  appendPadding: [10, 0, 0, 0],
  data: wealthDistribution,
  legend: {position: 'top-left' as any, visible: true},
  meta: {
    percent: {
      formatter: function formatter(percent: number) {
        return Number(percent * 100)
          .toFixed(2)
          .concat('%');
      },
      nice: true,
    },
  },

  seriesField: 'ownership',
  xField: 'percent',
  yField: 'ownership',
};

const wealthPieChartConfig = {
  angleField: 'percent',
  appendPadding: [10, 0, 0, 0],
  colorField: 'ownership',
  data: wealthDistribution,
  innerRadius: 0.4,
  isPercent: true,
  label: {
    content: '{percentage}',
    offset: '-50%',

    style: {
      fontSize: 14,
      textAlign: 'center',
    },
    type: 'inner',
  },
  meta: {
    percent: {
      formatter: function formatter(percent: number) {
        return Number(percent * 100)
          .toFixed(2)
          .concat('%');
      },
      nice: true,
    },
  },
  pieStyle: {
    shadowBlur: 8,
    shadowColor: 'rgba(0,0,0,0.3)',
  },
  radius: 0.9,
  statistic: {
    content: {
      formatter: function formatter() {
        return '';
      },
      title: false,
    },
  },
};

const Stats: FC = () => {
  return (
    <PageContentsLayout>
      <Col span={24}>
        <NetworkStats />
      </Col>

      <Col md={12} span={24}>
        <PriceChart />
      </Col>
      <Col md={12} span={24}>
        <MarketCapChart />
      </Col>

      <Col span={24}>
        <TotalSupplyChart />
      </Col>
      <Col md={12} span={24}>
        <DistributionChart />
      </Col>

      <Col md={12} span={24}>
        <TotalAccountsChart />
      </Col>

      <Col md={12} span={24}>
        <ChartsCard
          title="Wealth Distribution"
          description="The concentration of wealth among various groups in a network."
        >
          <Bar {...wealthBarChartConfig} />
        </ChartsCard>
      </Col>

      <Col md={12} span={24}>
        <ChartsCard
          title="Percentage of wealth held"
          description="Percentage of wealth held shows comparison of the wealth of various groups in a network"
        >
          <Pie {...wealthPieChartConfig} />
        </ChartsCard>
      </Col>
      <Col span={24}>
        <ChartsCard title="Ownership Chart" description="The wealth distribution trend across various groups over time">
          <Area {...ownershipConfig} />
        </ChartsCard>
      </Col>
    </PageContentsLayout>
  );
};

export default Stats;
