import React from 'react';
import {Card, Col} from 'antd';
import {Line} from '@ant-design/charts';
import {format as formatDate} from 'date-fns';

import {NetworkStats, PageContentsLayout} from 'components';
import stats from 'data/stats.json';
import {formatNumber} from 'utils/format';

const data = stats.map((record) => {
  return {
    coins: record.total,
    date: record.date,
  };
});

const config = {
  appendPadding: 30,
  data,
  height: 400,
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
      formatter: function formatter(rawDate: string) {
        // from: 2020-11-29-00_52_42
        // to: "2021-04-17T21:42:05.240Z"
        const date = rawDate.slice(0, rawDate.lastIndexOf('-'));
        const time = rawDate.split('-')[3].split('_').join(':');

        const dateTime = `${date}T${time}Z`;
        return formatDate(new Date(dateTime), 'MM/dd/yy');
      },
      nice: true,
      tickCount: 10,
    },
  },
  point: {
    shape: 'diamond',
    size: 5,
  },
  tooltip: {
    showMarkers: false,
  },
  xField: 'date',
  yField: 'coins',
};

const Stats = () => {
  return (
    <PageContentsLayout>
      <NetworkStats />
      <Col span={24}>
        <Card>
          <Line {...config} />
        </Card>
      </Col>
    </PageContentsLayout>
  );
};

export default Stats;
