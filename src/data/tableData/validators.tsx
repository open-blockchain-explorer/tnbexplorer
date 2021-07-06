import React from 'react';
import {ColumnsType} from 'antd/es/table';
import Typography from 'antd/es/typography';
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
  },
];
