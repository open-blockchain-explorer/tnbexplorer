import React, {useEffect, useState} from 'react';

import axios from 'axios';
import {Area} from '@ant-design/charts';
import {format as formatDate, compareDesc} from 'date-fns';

import {ChartsCard} from 'components';
import {CORS_BRIDGE} from 'constants/url';
import stats from 'data/stats.json';
import {formatNumber} from 'utils/format';
import {config} from '../defaultConfig';

interface Trade {
  amount: number;
  date: string;
  price: number;
}

export const MarketCapChart = () => {
  const [marketCapData, setMarketCapData] = useState<any[]>([]);
  const [priceData, setPriceData] = useState<Trade[]>([]);

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

  useEffect(() => {
    if (priceData.length > 0) {
      const calculatedData: any[] = [];
      let supplyData = stats;
      let supplyIndex = supplyData.length - 1;
      priceData.reverse().forEach((trade: Trade) => {
        let supplyObj = supplyData[supplyIndex];
        while (compareDesc(new Date(trade.date), new Date(supplyObj.date)) >= 0) {
          calculatedData.push({
            date: supplyObj.date,
            marketCap: supplyObj.total * trade.price,
          });
          supplyIndex -= 1;
          supplyObj = supplyData[supplyIndex];
        }
      });

      setMarketCapData(calculatedData);
    }
  }, [priceData]);
  const distributedCoinsConfig = {
    ...config,
    data: marketCapData,
    smooth: true,
    meta: {
      date: {
        formatter: function formatter(date: string) {
          return formatDate(new Date(date), 'MMM dd, yyyy');
        },
        nice: true,
        tickCount: 10,
      },
      marketCap: {
        alias: 'Market Cap',
        formatter: function formatter(coins: number) {
          return coins.toLocaleString();
        },
        nice: true,
        tickCount: 6,
      },
    },
    tooltip: {
      formatter: (datum: any[]) => {
        return {
          name: 'Market Cap',
          value: '$'.concat(datum.marketCap.toLocaleString()),
          title: formatDate(new Date(datum.date), 'eeee, MMMM do, yyyy'),
        };
      },
    },
    xField: 'date',
    yAxis: {
      title: {
        text: 'Market Cap',
        visible: true,
      },
      label: {
        formatter: (text: string) => '$'.concat(formatNumber(Number(text.replaceAll(',', '')))),
      },
      type: 'linear',
    },
    yField: 'marketCap',
  };

  return (
    <ChartsCard
      title="Market Capitalisation Chart"
      description="The total dollar market value of all the distributed coins."
    >
      <Area {...distributedCoinsConfig} />
    </ChartsCard>
  );
};
