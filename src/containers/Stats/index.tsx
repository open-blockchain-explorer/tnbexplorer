import React, {FC} from 'react';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';

import {Area, Bar, Line, Pie} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard, NetworkStats, PageContentsLayout} from 'components';
import stats from 'data/stats.json';
import {formatNumber} from 'utils/format';

const dailyChange: {coins: number; date: string}[] = [];
const data = stats.reduce((acc, record) => {
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
  label: {
    style: {
      fill: '#aaa',
    },
  },
  smooth: true,

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
const distributedCoinsConfig = {
  ...config,
  meta: {
    date: {
      formatter: function formatter(date: string) {
        return formatDate(new Date(date), 'MM/dd/yy');
      },
      nice: true,
      tickCount: 10,
    },
    total: {
      formatter: function formatter(coins: any) {
        return formatNumber(Number(coins));
      },
      nice: true,
      tickCount: 11,
    },
  },
  point: {
    shape: 'diamond',
    size: 3,
  },
  xField: 'date',
  yAxis: {
    title: {
      offset: 90,
      text: 'Coins',
      visible: true,
    },
    type: 'linear',
  },
  yField: 'total',
};

const totalAccountsConfig = {
  ...config,
  meta: {
    accounts: {
      formatter: function formatter(coins: any) {
        return formatNumber(Number(coins));
      },
      nice: true,
      tickCount: 11,
    },
    date: {
      formatter: function formatter(date: string) {
        return formatDate(new Date(date), 'MM/dd/yy');
      },
      nice: true,
      tickCount: 10,
    },
  },

  yAxis: {
    title: {
      offset: 50,
      text: 'Accounts',
      visible: true,
    },
    type: 'linear',
  },
  yField: 'accounts',
};

const dailyChangeInCoinsConfig = {
  ...config,
  data: dailyChange,
  meta: {
    coins: {
      formatter: function formatter(coins: any) {
        return formatNumber(Number(coins));
      },
      nice: true,
      tickCount: 11,
    },
    date: {
      formatter: function formatter(date: string) {
        return formatDate(new Date(date), 'MM/dd/yy');
      },
      nice: true,
      tickCount: 10,
    },
  },
  point: {
    shape: 'diamond',
    size: 3,
    visible: false,
  },

  yAxis: {
    title: {
      offset: 80,
      text: 'Coins',
      visible: true,
    },
    type: 'linear',
  },
  yField: 'coins',
};

const ownershipPercentage: any[] = [];

stats.forEach((record) => {
  const {top5, top10, top25, top50} = record.ownership_percent;

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
    },
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
      offset: 70,
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
      <Col span={24}>
        <ChartsCard
          title="Total coins distributed over time"
          description="The total amount of coins released into the network"
        >
          <Line {...distributedCoinsConfig} />
        </ChartsCard>
      </Col>
      <Col md={12} sm={24}>
        <ChartsCard title="Daily change in coins" description="The amount of coins released on a particular day">
          <Line {...dailyChangeInCoinsConfig} />
        </ChartsCard>
      </Col>

      <Col md={12} sm={24}>
        <ChartsCard title="Total accounts over time" description="The number of accounts with a balance ">
          <Line {...totalAccountsConfig} />
        </ChartsCard>
      </Col>

      <Col md={12} sm={24}>
        <ChartsCard
          title="Wealth distribution"
          description="The concentration of wealth among various groups in a network."
        >
          <Bar {...wealthBarChartConfig} />
        </ChartsCard>
      </Col>

      <Col md={12} sm={24}>
        <ChartsCard
          title="Percentage of wealth held"
          description="Percentage of wealth held shows comparison of the wealth of various groups in a network"
        >
          <Pie {...wealthPieChartConfig} />
        </ChartsCard>
      </Col>
      <Col span={24}>
        <ChartsCard
          title="Ownership of different groups"
          description="The wealth distribution trend across various groups over time"
        >
          <Area {...ownershipConfig} />
        </ChartsCard>
      </Col>
    </PageContentsLayout>
  );
};

export default Stats;
