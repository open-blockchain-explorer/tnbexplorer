import React, {FC} from 'react';

import {Line} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard} from 'components';
import stats from 'data/stats.json';
import {formatNumber} from 'utils/format';
import {config} from '../defaultConfig';

export const TotalSupplyChart: FC<{data?: any[]}> = ({data = []}) => {
  const distributedCoinsConfig = {
    ...config,
    data: data.length ? data : stats,
    meta: {
      date: {
        formatter: function formatter(date: string) {
          return formatDate(new Date(date), 'MMM dd, yyyy');
        },
        nice: true,
        tickCount: 10,
      },
      total: {
        alias: 'Total',
        formatter: function formatter(coins: any) {
          return coins.toLocaleString();
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
      label: {
        formatter: (text: string) => formatNumber(Number(text.replaceAll(',', ''))),
      },
      type: 'linear',
    },
    yField: 'total',
  };

  return (
    <ChartsCard title="Total Supply Chart" description="The total amount of coins released into the network">
      <Line {...distributedCoinsConfig} />
    </ChartsCard>
  );
};
