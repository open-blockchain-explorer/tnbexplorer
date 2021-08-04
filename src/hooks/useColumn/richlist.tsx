import React from 'react';
import Typography from 'antd/es/typography';
import {ColumnsType} from 'antd/es/table';
import {Link} from 'react-router-dom';
import stats from 'data/stats.json';
import {A} from 'components';

export const richlistColumn: ColumnsType<any> = [
  {
    dataIndex: 'rank',
    key: 'addr',
    title: 'Rank',
    width: '70px',
  },
  {
    dataIndex: 'addr',
    ellipsis: true,
    key: 'addr',
    render: (address: string) => (
      <A style={{wordBreak: 'break-word', wordWrap: 'break-word'}} href={`account/${address}/`}>
        {address}
      </A>
    ),
    title: 'Address',
  },
  {
    align: 'right',
    dataIndex: 'bal',
    key: 'addr',
    render: (balance: number) => balance.toLocaleString(),
    title: 'Balance',
    width: '100px',
  },
  {
    dataIndex: 'bal',
    key: 'addr',
    render: (balance: number) => {
      const circulatingSupply = stats[stats.length - 1].total;
      return ((balance / circulatingSupply) * 100).toPrecision(2).concat('%');
    },
    title: 'Percentage',
    width: '120px',
  },
];
