import React from 'react';
import Tag from 'antd/es/tag';
import Typography from 'antd/es/typography';
import {Link} from 'react-router-dom';
import {ColumnsType} from 'antd/es/table';
import {formatDistance} from 'date-fns';
import {useChainPath} from 'hooks';

export interface TransactionColumnType {
  amount: number;
  coins: number;
  recipient: string;
  sender: string;
  time: number;
}

export const useTransactionColumn = (accountNumber?: string): ColumnsType<any> => {
  const currentPath = useChainPath();
  const formatColumnAccount = (text: string) => {
    if (accountNumber && accountNumber === text) {
      return text;
    }
    return (
      <Link to={`${currentPath}/account/${text}/`} style={{wordBreak: 'break-word', wordWrap: 'break-word'}}>
        {text}
      </Link>
    );
  };

  const columns: ColumnsType<TransactionColumnType> = [
    {
      dataIndex: 'sender',
      ellipsis: true,
      key: 'recipient',
      render: (text: string) => formatColumnAccount(text),
      title: 'Sender',
    },
    {
      dataIndex: 'recipient',
      ellipsis: true,
      key: 'recipient',
      render: (text: string) => formatColumnAccount(text),
      title: 'Recipient',
    },
    {
      dataIndex: 'memo',
      ellipsis: false,
      key: 'id',
      render: (_, {memo, fee}: any) => {
        if (fee) {
          if (fee === 'PRIMARY_VALIDATOR') {
            return <Tag>PV-Fee</Tag>;
          } else {
            return <Tag>Bank-Fee</Tag>;
          }
        }

        return memo;
      },
      title: 'Memo',
    },
    {
      dataIndex: 'time',
      key: 'time',
      render: (timestamp: string) => {
        return formatDistance(new Date(timestamp), new Date()).replace('about', '~');
      },
      title: 'Time',
    },
    {
      align: 'right',
      dataIndex: 'coins',
      render: (coins: number) => <Typography.Text>{new Intl.NumberFormat().format(coins)}</Typography.Text>,
      title: 'Coins',
      width: '90px',
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
