import React from 'react';
import {ColumnsType} from 'antd/es/table';
import Typography from 'antd/es/typography';
import {finance, internet, random} from 'faker';
import {Link} from 'react-router-dom';

export interface ValidatorsColumnType {
  account: string;
  networkId: string;
  ipAddress: string;
  txnFee: number;
}

export const validatorsColumn: ColumnsType<any> = [
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
    key: 'networkId',
    render: (text) => <Link to=".">{text}</Link>,
    title: 'IP Address',
  },
  {
    align: 'right',
    dataIndex: 'txnFee',
    key: 'networkId',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
    title: 'Txn Fee',
    width: '90px',
  },
  {
    align: 'right',
    dataIndex: 'confirmationRate',
    key: 'networkId',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
    title: 'Confirmation Rate',
    width: '120px',
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
