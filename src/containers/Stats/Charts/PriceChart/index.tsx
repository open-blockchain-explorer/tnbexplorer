import React, {FC, useEffect, useState} from 'react';

import axios from 'axios';
import {Line} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard} from 'components';
import {CORS_BRIDGE} from 'constants/url';
import {config} from '../defaultConfig';
import {formatNumber} from 'utils/format';

interface Trade {
  uuid: string;
  amount: number;
  rate: number;
  created_at: string;
}

export const PriceChart = () => {
  const [priceData, setPriceData] = useState<Trade[]>([]);

  const priceConfig = {
    ...config,
    data: priceData,
    meta: {
      created_at: {
        formatter: function formatter(date: string) {
          return formatDate(new Date(date), 'MM/dd/yy');
        },
        nice: true,
        tickCount: 10,
      },
      rate: {
        formatter: function formatter(rate: number) {
          return '$'.concat(formatNumber(rate / 10000));
        },
        nice: true,
        tickCount: 11,
      },
    },
    xField: 'created_at',
    yAxis: {
      title: {
        text: 'Rate',
        visible: true,
      },
      type: 'linear',
    },
    yField: 'rate',
  };

  useEffect(() => {
    const load = async () => {
      const {data} = await axios.get(
        CORS_BRIDGE.concat('/https://tnbcrow.pythonanywhere.com/recent-trades?limit=100&ordering=created_at'),
      );
        console.log({data})
      const calculateRate = (t1: Trade, t2: Trade) => {
        return (t1.rate * t1.amount + t2.rate * t2.amount) / (t2.amount + t1.amount);
      };

      const priceData = data.results.reduce((acc: Trade[], priceObj: Trade) => {
        const lastPriceObj = acc[acc.length - 1];
        if (acc.length && lastPriceObj.created_at.startsWith(priceObj.created_at.slice(0, 10))) {
          lastPriceObj.rate = calculateRate(lastPriceObj, priceObj);
          lastPriceObj.amount += priceObj.amount;
        } else {
          acc.push(priceObj);
        }
        return acc;
      }, []);
      setPriceData(priceData);
    };

    load();
  }, []);

  return (
    <ChartsCard title="Price Chart" description="The total amount of coins released into the network">
      <Line {...priceConfig} />
    </ChartsCard>
  );
};
