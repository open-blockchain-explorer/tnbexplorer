import React from 'react';
import Typography from 'antd/es/typography';
import {ColumnsType} from 'antd/es/table';
import {Link} from 'react-router-dom';

import {A} from 'components';

export interface BanksColumnType {
  confirmationBlocks: number;
  fee: number;
  networkId: string;
  ipAddress: string;
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
    key: 'networkId',
    render: (text) => <A href={`http://${text}`}>{text}</A>,
    title: 'IP Address',
  },
  {
    align: 'right',
    dataIndex: 'confirmationBlocks',
    key: 'networkId',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
    title: 'Blocks',
    width: '90px',
  },
  {
    align: 'right',
    dataIndex: 'fee',
    key: 'networkId',
    render: (text) => <Typography.Text>{text}</Typography.Text>,
    title: 'Fee',
    width: '90px',
  },
];
