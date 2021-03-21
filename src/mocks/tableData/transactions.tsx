import React from 'react';
import {Typography} from 'antd';
import {ColumnsType, TableProps} from 'antd/es/table';
import {formatDistance, subMinutes} from 'date-fns';
import {finance, internet, time} from 'faker';

interface TransactionsColumnType {
  coins: number;
  recipient: string;
  sender: string;
  time: number;
}

export const transactionsColumn: ColumnsType<any> = [
  {
    dataIndex: 'sender',
    ellipsis: true,
    render: (text) => (
      <Typography.Link href={`./account/${text}`} style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
        {text}
      </Typography.Link>
    ),
    title: 'Sender',
  },
  {
    dataIndex: 'recipient',
    ellipsis: true,
    render: (text) => (
      <Typography.Link href={`./account/${text}`} style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
        {text}
      </Typography.Link>
    ),
    title: 'Recipient',
  },
  {
    dataIndex: 'time',
    key: 'time',
    render: (timestamp) => <Typography.Text>{formatDistance(new Date(timestamp), new Date())}</Typography.Text>,
    title: 'Time',
  },
  {
    align: 'right',
    dataIndex: 'coins',
    render: (coins) => <Typography.Text>{new Intl.NumberFormat().format(coins)}</Typography.Text>,
    title: 'Coins',
  },
];

export const transactionsData = (total: number) => {
  const data: TransactionsColumnType[] = [];

  for (let i = 0; i < total; i += 1) {
    data.push({
      coins: parseFloat(finance.amount()),
      recipient: finance.litecoinAddress(),
      sender: finance.ethereumAddress(),
      time: time.recent(),
    });
  }

  return data;
};
