import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Col from 'antd/es/col';
import Table from 'antd/es/table';
import {useSelector} from 'react-redux';

import {useColumn} from 'hooks';
import {PageContentsLayout} from 'components';

import {getNetworkStats} from 'selectors';

const RichList = () => {
  const [richlistData, setRichlistData] = useState([]);
  const networkStats = useSelector(getNetworkStats);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/itsnikhil/tnb-analysis/master/web/js/richlist.json').then((res) => {
      console.log('Processing Rich List data ...');
      const data = res.data.map((obj: any, index: number) => ({
        rank: index + 1,
        ...obj,
      }));

      setRichlistData(data);
    });
  }, []);

  const richListColumn = useColumn('rich-list', {circulatingSupply: networkStats.distributedCoins});

  return (
    <PageContentsLayout showBreadCrumb>
      <Col span={24}>
        <Table columns={richListColumn} dataSource={richlistData} bordered scroll={{x: 450}} />
      </Col>
    </PageContentsLayout>
  );
};

export default RichList;
