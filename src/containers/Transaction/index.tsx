import React from 'react';

import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Tag from 'antd/es/tag';
import Typography from 'antd/es/typography';

import {formatDistanceToNowStrict} from 'date-fns';
import {PageContentsLayout, KeyValueList} from 'components';

const Transaction = () => {
  const date = new Date(Math.random() * Date.now());
  const items = [
    {
      title: 'Balance Key',
      value: '1234'.repeat(16),
      tooltip: 'The unique id for each transaction that prevents accounts from double spending tokens',
    },
    {
      title: 'Block Height',
      value: <Typography.Link>#2356</Typography.Link>,
      tooltip: "The position of this transaction's block on the the blockchain",
    },
    {
      title: 'Status',
      value: <Tag color="green"> Success</Tag>,
      tooltip: 'The Status of the transaction',
    },
    {
      title: 'Timestamp',
      value: (
        <>
          {formatDistanceToNowStrict(date)} | {date.toUTCString()}
        </>
      ),
      tooltip: 'The data and time of the transacation',
    },
    {
      title: 'Type',
      value: 'Coin transfer',
      tooltip: 'Type of Block data ',
    },
    {
      title: 'Sender',
      value: <Typography.Text copyable>{'1'.repeat(60).concat('adde')}</Typography.Text>,
      tooltip: 'The account number of the account that initiated the transaction',
    },
    {
      title: 'Recipient',
      value: <Typography.Text copyable>{'0'.repeat(60).concat('dead')}</Typography.Text>,
      tooltip: 'The account number of the account that recieved the transaction',
    },
    {
      title: 'Amount',
      value: 10000,
      tooltip: 'The amount of tnbc that was transfered',
    },
    {
      title: 'Memo',
      value: 'User_ID_3452',
      tooltip: 'Optional message added to a transaction',
    },
    {
      title: 'Nonce',
      value: 1003,
      tooltip: 'The ith transaction made by the sender',
    },
    {
      title: 'position',
      value: 2,
      tooltip: 'The position of the transaction in the block',
    },
  ];

  return (
    <PageContentsLayout title="Transaction Details">
      <Col span={24}>
        <Card>
          <KeyValueList items={items} />
        </Card>
      </Col>
    </PageContentsLayout>
  );
};

export default Transaction;
