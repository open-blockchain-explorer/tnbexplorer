import React from 'react';
import Typography from 'antd/es/typography';
import {ColumnsType} from 'antd/es/table';
import {finance, internet, random} from 'faker';
import {Link} from 'react-router-dom';

export interface BanksColumnType {
  confirmations: number;
  fee: number;
  networkId: string;
  ipAddress: string;
  transactions: number;
}

export const banksColumn: ColumnsType<any> = [
  {
    dataIndex: 'networkId',
    ellipsis: true,
    key: 'networkId',
    render: (text) => (
      <Link to="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
        {text}
      </Link>
    ),
    title: 'Node ID',
  },
  {
    dataIndex: 'ipAddress',
    key: 'ipAddress',
    render: (text) => <Link to=".">{text}</Link>,
    title: 'IP Address',
  },
  {
    dataIndex: 'transactions',
    key: 'transactions',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
    title: 'Transactions',
  },
  {
    dataIndex: 'confirmations',
    key: 'confirmations',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
    title: 'Confirmations',
  },
  {
    align: 'right',
    dataIndex: 'fee',
    key: 'fee',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
    title: 'Fee',
    width: '70px',
  },
];

export const banksData = (total: number) => {
  const data: BanksColumnType[] = [];
  for (let i = 0; i < total; i += 1) {
    data.push({
      confirmations: random.number(50),
      fee: random.number(3),
      ipAddress: internet.ip(),
      networkId: finance.bitcoinAddress(),
      transactions: random.number(3000),
    });
  }

  return data;
};
