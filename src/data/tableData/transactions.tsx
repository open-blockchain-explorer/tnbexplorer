import React from 'react';
import {Tag, Typography} from 'antd';
import {ColumnGroupType, ColumnsType, TableProps} from 'antd/es/table';
import {formatDistance, subMinutes} from 'date-fns';
import {finance, internet, time} from 'faker';

interface TransactionsColumnType {
  coins: number;
  recipient: string;
  sender: string;
  time: number;
}

export const transactionColumn = (accountNumber?: string): ColumnsType<any> => {
  const formatColumnAccount = (text: string) => {
    if (accountNumber && accountNumber === text) {
      return text;
    }
    return (
      <Typography.Link href={`./account/${text}/`} style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
        {text}
      </Typography.Link>
    );
  };

  const columns: ColumnsType<any> = [
    {
      dataIndex: 'sender',
      ellipsis: true,
      key: 'sender',
      render: (text) => formatColumnAccount(text),
      title: 'Sender',
    },
    {
      dataIndex: 'recipient',
      ellipsis: true,
      key: 'recipient',

      render: (text) => formatColumnAccount(text),
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
      render: (coins, row) => <Typography.Text>{new Intl.NumberFormat().format(coins)}</Typography.Text>,
      title: 'Coins',
    },
  ];

  if (accountNumber) {
    return [
      ...columns.slice(0, 2),
      {
        align: 'center',
        key: 'type',
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
        width: '75px',
      },
      ...columns.slice(2),
    ];
  }
  return columns;
};

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
