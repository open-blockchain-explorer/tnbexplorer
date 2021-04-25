import React from 'react';
import {Typography} from 'antd';
import {ColumnsType, TableProps} from 'antd/es/table';
import {formatDistance, subMinutes} from 'date-fns';
import {finance, internet, time} from 'faker';

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
      <Typography.Link href="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
        {text}
      </Typography.Link>
    ),
    title: 'Balance Lock',
  },
  {
    dataIndex: 'bank',
    key: 'bank',
    render: (text) => <Typography.Link href=".">{text}</Typography.Link>,
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

export const blocksData = (total: number) => {
  const data: BlocksColumnType[] = [];
  for (let i = 0; i < total; i += 1) {
    data.push({
      amount: parseFloat(finance.amount()),
      balanceLock: finance.bitcoinAddress(),
      bank: internet.ip(),
      time: time.recent(),
    });
  }

  return data;
};
