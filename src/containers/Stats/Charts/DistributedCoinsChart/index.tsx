import React, {FC} from 'react';

import {Line} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard} from 'components';
import stats from 'data/stats.json';
import {config} from '../defaultConfig';
import {formatNumber} from 'utils/format';

const distributedCoinsConfig = {
  ...config,
  data: stats,
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
  xField: 'date',
  yAxis: {
    title: {
      text: 'Coins',
      visible: true,
    },
    type: 'linear',
  },
  yField: 'total',
};

export const DistributedCoinsChart = () => (
  <ChartsCard
    title="Total coins distributed over time"
    description="The total amount of coins released into the network"
  >
    <Line {...distributedCoinsConfig} />
  </ChartsCard>
);
