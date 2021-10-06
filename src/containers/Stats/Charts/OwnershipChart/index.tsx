import React, {FC} from 'react';
import {Area} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard} from 'components';

export const OwnershipChart: FC<{data?: any[]}> = ({data = []}) => {
  const ownershipPercentage: any[] = [];

  data.forEach((record: any) => {
    ownershipPercentage.push({
      date: record.date,
      ownership: '0% - 5%',
      percent: record.top_5_ownership,
      accounts: record.top_5_accounts,
      wealth: record.top_5_wealth,
    });

    ownershipPercentage.push({
      date: record.date,
      ownership: '5% - 10%',
      percent: record.top_10_ownership - record.top_5_ownership,
      accounts: record.top_10_accounts - record.top_5_accounts,
      wealth: record.top_10_wealth - record.top_5_wealth,
    });

    ownershipPercentage.push({
      date: record.date,
      ownership: '10% - 25%',
      percent: record.top_25_ownership - record.top_10_ownership,
      accounts: record.top_25_accounts - record.top_10_accounts,
      wealth: record.top_25_wealth - record.top_10_wealth,
    });

    ownershipPercentage.push({
      date: record.date,
      ownership: '25% - 50%',
      percent: record.top_50_ownership - record.top_25_ownership,
      accounts: record.top_50_accounts - record.top_25_accounts,
      wealth: record.top_50_wealth - record.top_25_wealth,
    });

    ownershipPercentage.push({
      date: record.date,
      ownership: '50% - 100%',
      percent: 1 - record.top_50_ownership,
      accounts: record.accounts - record.top_50_accounts,
      wealth: record.total - record.top_50_wealth,
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
          return formatDate(new Date(date), 'MMM dd, yyyy');
        },
        nice: true,
        tickCount: 10,
      },
    },
    height: 400,

    seriesField: 'ownership',
    smooth: false,
    slider: {
      start: 0,
      end: 1,
    },

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
    yField: 'wealth',
  };

  return (
    <ChartsCard
      title="Ownership Chart"
      description="The concentration of wealth among various groups in a network over time"
    >
      <Area {...ownershipConfig} />
    </ChartsCard>
  );
};
