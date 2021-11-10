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
  const {recent: recentNetworkStats} = useSelector(getNetworkStats);

  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/itsnikhil/tnb-analysis/master/web/js/richlist.json').then((res) => {
      const data = res.data.map((obj: any, index: number) => ({
        rank: index + 1,
        ...obj,
      }));

      setRichlistData(data);
    });
  }, []);

  const richListColumn = useColumn('rich-list', {circulatingSupply: recentNetworkStats.distributedCoins});

  return (
    <PageContentsLayout showBreadCrumb>
      <Col span={24}>
        <Table
          rowKey={(record) => record.addr}
          columns={richListColumn}
          dataSource={richlistData}
          bordered
          scroll={{x: 450}}
        />
      </Col>
    </PageContentsLayout>
  );
};

export default RichList;
