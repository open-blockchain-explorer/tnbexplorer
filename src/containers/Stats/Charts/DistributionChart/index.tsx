import React, {useCallback, useEffect, useState} from 'react';
import Radio from 'antd/es/radio';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import {Column} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {ChartsCard} from 'components';
import stats from 'data/stats.json';
import {formatNumber} from 'utils/format';
import {config} from '../defaultConfig';

interface ChangeData {
  coins: number;
  date: string;
}

enum Period {
  day = 'day',
  week = 'week',
  month = 'month',
  quarter = 'quarter',
  year = 'year',
}

const data: ChangeData[] = [];
stats.reduce((previousTotal, record) => {
  const changeObj = {
    coins: record.total - previousTotal,
    date: record.date,
  };

  data.push(changeObj);

  return record.total;
}, stats[0].total);

export const DistributionChart = () => {
  const [periodicalData, setPeriodicalData] = useState<ChangeData[]>([]);
  const [chartPeriod, setChartPeriod] = useState<keyof typeof Period>('month');

  const selectDateFormat = (period?: keyof typeof Period) => {
    switch (period) {
      case 'day':
        return 'MMM dd, yyyy';
      case 'week':
        return "ww 'Wk' yyyy";
      case 'month':
        return 'MMM yyyy';
      case 'quarter':
        return 'qqq yyyy';
      case 'year':
        return 'yyyy';
      default:
        return 'MMM dd, yyyy';
    }
  };

  const cumulateDataByPeriod = useCallback((originalData: ChangeData[], period: keyof typeof Period) => {
    const cumulated: ChangeData[] = [];
    const dateFormat = selectDateFormat(period);
    originalData.forEach((current: ChangeData) => {
      const formatedDate = formatDate(new Date(current.date), dateFormat);
      if (cumulated.length === 0) {
        cumulated.push({
          coins: current.coins,
          date: formatedDate,
        });
      } else {
        const prev = cumulated[cumulated.length - 1];
        if (prev.date !== formatedDate) {
          cumulated.push({
            coins: current.coins,
            date: formatedDate,
          });
        } else {
          prev.coins += current.coins;
        }
      }
    }, []);

    return cumulated;
  }, []);

  useEffect(() => {
    const cumulatedData = cumulateDataByPeriod(data, chartPeriod);
    setPeriodicalData(cumulatedData);
  }, [chartPeriod, cumulateDataByPeriod, setPeriodicalData]);
  const dailyChangeInCoinsConfig = {
    ...config,
    data: periodicalData,
    meta: {
      coins: {
        alias: 'Coins',
        formatter: function formatter(coins: any) {
          return coins.toLocaleString();
        },
        nice: true,
        tickCount: 11,
      },
    },
    slider: {
      start: 0,
      end: 1,
    },
    xAxis: {},
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
    yField: 'coins',
  };
  return (
    <ChartsCard title="Distribution Chart" description="The amount of coins released periodically on the network">
      <Row justify="end">
        <Col>
          <Radio.Group size="small" value={chartPeriod} onChange={(e) => setChartPeriod(e.target.value)}>
            <Radio.Button value="day">Daily</Radio.Button>
            <Radio.Button value="week">Weekly</Radio.Button>
            <Radio.Button value="month">Monthly</Radio.Button>
            <Radio.Button value="quarter">Quarterly</Radio.Button>
            <Radio.Button value="year">Yearly</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={24}>
          <Column {...dailyChangeInCoinsConfig} />
        </Col>
      </Row>
    </ChartsCard>
  );
};
