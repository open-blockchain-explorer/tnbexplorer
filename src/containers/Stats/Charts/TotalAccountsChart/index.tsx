import React, {FC} from 'react';

import {Line} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard} from 'components';
import stats from 'data/stats.json';
import {formatNumber} from 'utils/format';
import {config} from '../defaultConfig';

export const TotalAccountsChart: FC<{data?: any[]}> = ({data = []}) => {
  const totalAccountsConfig = {
    ...config,
    data: data.length ? data : stats,
    meta: {
      accounts: {
        alias: 'Accounts',
        formatter: function formatter(coins: any) {
          return Number(coins).toLocaleString();
        },
        nice: true,
        tickCount: 11,
      },
      date: {
        formatter: function formatter(date: string) {
          return formatDate(new Date(date), 'MMM dd, yyyy');
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
      label: {
        formatter: (text: string) => formatNumber(Number(text.replaceAll(',', ''))),
      },
      type: 'linear',
    },
    yField: 'accounts',
  };

  return (
    <ChartsCard title="Total Accounts Chart" description="The number of accounts with a balance ">
      <Line {...totalAccountsConfig} />
    </ChartsCard>
  );
};
