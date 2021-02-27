import React from 'react';
import {Typography} from 'antd';
import {ColumnsType, TableProps} from 'antd/es/table';
import {formatDistance, subMinutes} from 'date-fns';
import {finance, internet, random, time} from 'faker';

export interface ValidatorsColumnType {
  account: string;
  networkId: string;
  ipAddress: string;
  txnFee: number;
}

export const validatorsColumn: ColumnsType<any> = [
  {
    dataIndex: 'account',
    ellipsis: true,
    render: (text) => (
      <Typography.Link href="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
        {text}
      </Typography.Link>
    ),
    title: 'Account',
  },
  {
    dataIndex: 'networkId',
    ellipsis: true,
    key: 'networkId',
    render: (text) => (
      <Typography.Link href="." style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
        {text}
      </Typography.Link>
    ),
    title: 'Network ID',
  },
  {
    dataIndex: 'ipAddress',
    key: 'ipAddress',
    render: (text) => <Typography.Link href=".">{text}</Typography.Link>,
    title: 'Ip Address / URL',
  },
  {
    align: 'right',
    dataIndex: 'txnFee',
    key: 'txnFee',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
    title: 'Txn Fee',
    width: '90px',
  },
];

export const validatorsData = (total: number) => {
  const data: ValidatorsColumnType[] = [];
  for (let i = 0; i < total; i += 1) {
    data.push({
      account: finance.bitcoinAddress(),
      ipAddress: internet.ip(),
      networkId: finance.bitcoinAddress(),
      txnFee: random.number(3),
    });
  }

  return data;
};
