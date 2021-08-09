import React, {FC} from 'react';

import {Line} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard} from 'components';
import stats from 'data/stats.json';
import {config} from '../defaultConfig';
import {formatNumber} from 'utils/format';

const totalAccountsConfig = {
  ...config,
  data: stats,
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
      text: 'Accounts',
      visible: true,
    },
    type: 'linear',
  },
  yField: 'accounts',
};

export const TotalAccountsChart = () => (
  <ChartsCard title="Total accounts over time" description="The number of accounts with a balance ">
    <Line {...totalAccountsConfig} />
  </ChartsCard>
);
