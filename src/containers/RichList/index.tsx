import React from 'react';
import Col from 'antd/es/col';
import Table from 'antd/es/table';

import {useColumn} from 'hooks';
import {PageContentsLayout} from 'components';
import richListData from 'data/richlist.json';

const RichList = () => {
  const getRichList = () => {
    console.log('Processing Rich List data ...');
    return richListData.map((obj, index: number) => ({
      rank: index + 1,
      ...obj,
    }));
  };

  const richListColumn = useColumn('richList');
  return (
    <PageContentsLayout showBreadCrumb>
      <Col span={24}>
        <Table columns={richListColumn} dataSource={getRichList()} bordered scroll={{x: 450}} />
      </Col>
    </PageContentsLayout>
  );
};

export default RichList;
