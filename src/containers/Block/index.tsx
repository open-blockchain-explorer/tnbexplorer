import React from 'react';
import Card from 'antd/es/card';
import Col from 'antd/es/col';
import Tag from 'antd/es/tag';

import {formatDistanceToNowStrict} from 'date-fns';

import {PageContentsLayout, KeyValueList, KeyValueType} from 'components';
// - balance key
// - block height
// - Hash
// - Status
// - Confirmations (need more than 50% of total validators)
// - timestamp
// - transactions
// - Node
// - Sender
// - Transaction Volume
// - Fees: bank fee and pv fee
// - Size

const Block = () => {
  const date = new Date(Date.now() - Math.random() * 1000);
  const blockDetails: KeyValueType[] = [
    {
      title: 'Block Height',
      value: '#13245',
      tooltip: "The block's index",
    },
    {
      title: 'Balance Key',
      value: '1234'.repeat(16),
      tooltip: 'balance key',
      copyable: true,
      href: 'account/'.concat('1234'.repeat(16)),
    },
    {
      title: 'Timestamp',
      value: (
        <>
          {formatDistanceToNowStrict(date)} | {date.toString()}
        </>
      ),
      tooltip: 'The data and time of the transacation',
    },
    {
      title: 'Transactions',
      value: 9,
      tooltip: 'Sum of all the transactions in the block',
    },
    {
      title: 'Node',
      value: '1234'.repeat(16),
      tooltip: 'The node that processed this block',
    },
    {
      title: 'Sender',
      value: '1234'.repeat(16),
      tooltip: 'The account that created this block',
    },

    {
      title: 'Transaction Volume',
      value: Number(12345829).toLocaleString(),
      tooltip: 'Sum of all the transactions in the block',
    },
    {
      title: 'Fees',
      value: (
        <>
          3 tnbc <Tag>Bank Fee: 1 tnbc</Tag> <Tag>PV Fee: 2 tnbc</Tag>
        </>
      ),
      tooltip: 'Fees charged by the Bank and Primary validator nodes',
    },
    {
      title: 'Size',
      value: '67 bytes',
      tooltip: 'The size of the block',
    },
  ];

  return (
    <PageContentsLayout title="Block Details">
      <Col span={24}>
        <Card>
          <KeyValueList items={blockDetails} />
        </Card>
      </Col>
    </PageContentsLayout>
  );
};

export default Block;
