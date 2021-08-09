import React, {FC} from 'react';

import {Line} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard} from 'components';
import stats from 'data/stats.json';
import {config} from '../defaultConfig';
import {formatNumber} from 'utils/format';

const dailyChange: {coins: number; date: string}[] = [];
stats.reduce((acc, record) => {
  dailyChange.push({
    coins: record.total - acc,
    date: record.date,
  });

  return record.total;
}, 0);

const dailyChangeInCoinsConfig = {
  ...config,
  data: dailyChange,
  label: {
    style: {
      fill: '#aaa',
    },
  },
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
      text: 'Coins',
      visible: true,
    },
    type: 'linear',
  },
  yField: 'coins',
};

export const DailyChangeInCoinsChart = () => (
  <ChartsCard title="Daily change in coins" description="The amount of coins released on a particular day">
    <Line {...dailyChangeInCoinsConfig} />
  </ChartsCard>
);
