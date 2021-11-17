import React from 'react';
import {ColumnsType} from 'antd/es/table';
import {A} from 'components';

export interface RichListColumnType {
  addr: string;
  bal: number;
  rank: number;
}

export const richListColumn = (circulatingSupply: number): ColumnsType<any> => {
  return [
    {
      dataIndex: 'rank',

      title: 'Rank',
      width: '70px',
    },
    {
      dataIndex: 'addr',
      ellipsis: true,

      render: (address: string) => (
        <A style={{wordBreak: 'break-word', wordWrap: 'break-word'}} href={`account/${address}`}>
          {address}
        </A>
      ),
      title: 'Address',
    },
    {
      align: 'right',
      dataIndex: 'bal',

      render: (balance: number) => balance.toLocaleString(),
      title: 'Balance',
      width: '120px',
    },
    {
      dataIndex: 'bal',

      render: (balance: number) => {
        if (balance && circulatingSupply) {
          return ((balance / circulatingSupply) * 100).toPrecision(3).concat('%');
        }
        return 0;
      },
      title: 'Percentage',
      width: '120px',
    },
  ];
};
