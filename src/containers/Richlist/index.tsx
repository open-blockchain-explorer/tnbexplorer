import React from 'react';
import Col from 'antd/es/col';
import Table from 'antd/es/table';

import {useColumn} from 'hooks';
import {PageContentsLayout} from 'components';
import richlistData from 'data/richlist.json';

const Richlist = () => {
  const getRichList = () => {
    console.log('Processing Rich List data ...');
    return richlistData.map((obj, index: number) => ({
      rank: index + 1,
      ...obj,
    }));
  };

  const richlistColumn = useColumn('richlist');
  return (
    <PageContentsLayout showBreadCrumb>
      <Col span={24}>
        <Table columns={richlistColumn} dataSource={getRichList()} bordered scroll={{x: 450}} />
      </Col>
    </PageContentsLayout>
  );
};

export default Richlist;
