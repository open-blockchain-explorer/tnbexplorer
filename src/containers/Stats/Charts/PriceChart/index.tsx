import React, {useEffect, useState} from 'react';

import axios from 'axios';
import {Area} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard} from 'components';
import {CORS_BRIDGE} from 'constants/url';
import {formatNumber} from 'utils/format';
import {config} from '../defaultConfig';

interface Trade {
  amount: number;
  date: string;
  price: number;
}

export const PriceChart = () => {
  const [priceData, setPriceData] = useState<Trade[]>([]);

  const priceConfig = {
    ...config,
    data: priceData,
    meta: {
      date: {
        formatter: function formatter(date: string) {
          return formatDate(new Date(date), 'MMM dd, yyyy');
        },
        nice: true,
        tickCount: 10,
      },
      price: {
        alias: 'Price (USD)',
        formatter: function formatter(price: number) {
          return '$'.concat(formatNumber(price));
        },
        nice: true,
        tickCount: 11,
      },
    },
    smooth: true,
    slider: {
      start: 0,
      end: 1,
    },

    tooltip: {
      formatter: (datum: any) => {
        return {
          name: 'Price (USD)',
          value: '$'.concat(formatNumber(datum.price)),
          title: formatDate(new Date(datum.date), 'eeee, MMMM do, yyyy'),
        };
      },
    },
    xAxis: {
      title: {
        offset: 40,
        text: 'Date',
        visible: true,
      },
    },
    xField: 'date',
    yAxis: {
      title: {
        text: 'Price',
        visible: true,
      },
      type: 'linear',
    },
    yField: 'price',
  };

  useEffect(() => {
    const load = async () => {
      const {data} = await axios.get(
        CORS_BRIDGE.concat('/https://tnbcrow.pythonanywhere.com/recent-trades?limit=100&ordering=created_at'),
      );
      console.log({data});
      const calculateRate = (t1: Trade, t2: Trade) => {
        return (t1.price * t1.amount + t2.price * t2.amount) / (t2.amount + t1.amount);
      };

      const formattedPriceData = data.results.reduce((acc: Trade[], {created_at: date, rate: price, amount}: any) => {
        price /= 10000;
        const lastPriceObj = acc[acc.length - 1];
        if (acc.length && lastPriceObj.date.startsWith(date.slice(0, 10))) {
          lastPriceObj.price = calculateRate(lastPriceObj, {date, amount, price});
          lastPriceObj.amount += amount;
        } else {
          const formattedObj = {
            date,
            amount,
            price,
          };
          acc.push(formattedObj);
        }
        return acc;
      }, []);
      setPriceData(formattedPriceData);
    };

    load();
  }, []);

  return (
    <ChartsCard
      title="Price Chart"
      description="The over-the-counter (OTC) price of each TNBC"
      source={{text: 'tnbCrow', link: 'https://tnbcrow.pythonanywhere.com/'}}
    >
      <Area {...priceConfig} />
    </ChartsCard>
  );
};
