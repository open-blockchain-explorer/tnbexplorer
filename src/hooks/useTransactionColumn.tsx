import React from 'react';
import Tag from 'antd/es/tag';
import Tooltip from 'antd/es/tooltip';
import Typography from 'antd/es/typography';
import {ColumnsType} from 'antd/es/table';
import {formatDistanceToNowStrict} from 'date-fns';
import {A} from 'components';
import {SortOrder} from 'antd/es/table/interface';
import {useQueryParams} from 'hooks';

export interface TransactionColumnType {
  amount: number;
  coins: number;
  recipient: string;
  sender: string;
  time: number;
  memo: string;
}

interface TransactionColumnOptions {
  accountNumber?: string;
  sort?: {[Key in keyof Partial<TransactionColumnType>]: boolean | SortOrder};
  filter?: {[Key in keyof TransactionColumnType | 'txFlow']: boolean};
}

const formatAccountNumberColumn = (text: string, accountNumber?: string) => {
  if (accountNumber && accountNumber === text) {
    return text;
  }
  return (
    <A href={`account/${text}`} style={{wordBreak: 'break-all', wordWrap: 'break-word'}}>
      {text}
    </A>
  );
};

export const useTransactionColumn = (options?: TransactionColumnOptions): ColumnsType<TransactionColumnType> => {
  const searchParams = useQueryParams();
  const getSorter = (field: keyof TransactionColumnType) => {
    const value = options?.sort?.[field];
    if (value) {
      return () => 0;
    }

    return undefined;
  };

  const getDefaultSortOrder = (field: keyof TransactionColumnType) => {
    const value = options?.sort?.[field];
    const sortQuery = searchParams.get('sort');

    if (sortQuery) {
      if (sortQuery.endsWith(field)) {
        if (sortQuery.charAt(0) === '-') {
          return 'descend';
        }
        return 'ascend';
      }
    } else if (typeof value === 'string') {
      return value;
    }

    return null;
  };

  const accountNumber = options?.accountNumber;
  const columns: ColumnsType<TransactionColumnType> = [
    {
      dataIndex: 'sender',
      ellipsis: true,
      render: (text: string) => formatAccountNumberColumn(text, accountNumber),
      title: 'Sender',
      defaultSortOrder: getDefaultSortOrder('sender'),
      sorter: getSorter('sender'),
    },
    {
      dataIndex: 'recipient',
      ellipsis: true,
      render: (text: string) => formatAccountNumberColumn(text, accountNumber),
      title: 'Recipient',
      defaultSortOrder: getDefaultSortOrder('recipient'),

      sorter: getSorter('recipient'),
    },
    {
      dataIndex: 'memo',
      ellipsis: false,
      render: (_, {memo, fee}: any) => {
        if (fee) {
          if (fee === 'PRIMARY_VALIDATOR') {
            return <Tag>PV-Fee</Tag>;
          }
          return <Tag>Bank-Fee</Tag>;
        }

        return memo;
      },
      title: 'Memo',
      sorter: getSorter('memo'),
      defaultSortOrder: getDefaultSortOrder('memo'),
    },
    {
      dataIndex: 'time',

      render: (timestamp: string) => {
        const date = new Date(timestamp);
        return <Tooltip title={date.toLocaleString()}>{formatDistanceToNowStrict(date)}</Tooltip>;
      },
      title: 'Time',
      width: '120px',
      sorter: getSorter('time'),
      defaultSortOrder: getDefaultSortOrder('time'),
    },
    {
      align: 'right',
      dataIndex: 'coins',
      render: (coins: number) => <Typography.Text>{new Intl.NumberFormat().format(coins)}</Typography.Text>,
      title: 'Coins',
      width: '115px',
      sorter: getSorter('coins'),
      defaultSortOrder: getDefaultSortOrder('coins'),
    },
  ];

  if (accountNumber) {
    return [
      ...columns.slice(0, 2),
      {
        align: 'center',
        title: 'Tx Flow',
        render: (x, row) => {
          let tag = '';

          if (accountNumber === row.sender) {
            tag = 'out';
          } else if (accountNumber === row.recipient) {
            tag = 'in';
          }

          const color = tag === 'out' ? '#f50' : '#87d068';

          return tag ? (
            <Tag color={color}>
              <Typography.Text strong style={{color: 'white' /* , fontStyle: 'italic' */}}>
                {tag.toUpperCase()}
              </Typography.Text>
            </Tag>
          ) : (
            <></>
          );
        },
        width: '100px',
      },
      ...columns.slice(2),
    ];
  }
  return columns;
};
