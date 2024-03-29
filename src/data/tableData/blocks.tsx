import React from 'react';
import Typography from 'antd/es/typography';
import {ColumnsType} from 'antd/es/table';
import {formatDistance, subMinutes} from 'date-fns';
import {Link} from 'react-router-dom';

export interface BlocksColumnType {
  amount: number;
  balanceLock: string;
  bank: string;
  time: number;
}

export const blocksColumn: ColumnsType<any> = [
  {
    dataIndex: 'balanceLock',
    ellipsis: true,
    key: 'balanceLock',
    render: (text) => (
      <Link to="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
        {text}
      </Link>
    ),
    title: 'Balance Lock',
  },
  {
    dataIndex: 'bank',
    key: 'bank',
    render: (text) => <Link to=".">{text}</Link>,
    title: 'Bank',
  },
  {
    dataIndex: 'time',
    key: 'time',
    render: (timestamp) => (
      <Typography.Text>
        {' '}
        {formatDistance(subMinutes(new Date(timestamp), Math.floor(Math.random() * 100)), new Date())}
      </Typography.Text>
    ),
    title: 'Time',
  },
  {
    align: 'right',
    dataIndex: 'amount',
    key: 'amount',
    render: (text) => <Typography.Text>{`${text} coins`}</Typography.Text>,
    title: 'Amount',
  },
];
