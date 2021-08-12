import React, {FC, useEffect, useState} from 'react';

import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Table from 'antd/es/table';
import Typography from 'antd/es/typography';
import {useSelector} from 'react-redux';

import {NetworkStats, PageContentsLayout, TestnetAlertMessage} from 'components';
import {validatorsColumn} from 'data/tableData/validators';
import {banksColumn} from 'data/tableData/banks';

import {getBanks} from 'api/bank';
import {getValidators} from 'api/validator';

import {getCurrentChain} from 'selectors';

interface BanksColumnType {
  confirmationBlocks: number;
  fee: number;
  networkId: string;
  ipAddress: string;
}

const Nodes: FC = () => {
  const {isMainnet, pvUrl} = useSelector(getCurrentChain);

  const [banks, setBanks] = useState<BanksColumnType[]>([]);
  const [validators, setValidators] = useState<any[]>([]);

  useEffect(() => {
    const load = () => {
      getValidators(pvUrl).then(({results}) => {
        setValidators(results);
      });

      getBanks(pvUrl, {limit: 10, offset: 0}, ({results}) => {
        setBanks((prev) => [...prev, results]);
      });
    };

    load();
  }, [pvUrl, setBanks]);

  return (
    <PageContentsLayout>
      <Col span={24}>{isMainnet ? <NetworkStats /> : <TestnetAlertMessage />}</Col>

      <Col sm={24} md={12}>
        <Table
          bordered
          columns={banksColumn}
          dataSource={banks}
          pagination={false}
          scroll={{x: 500}}
          sticky
          title={() => (
            <Row justify="space-between" align="middle">
              <Typography.Text>Banks</Typography.Text>
            </Row>
          )}
        />
      </Col>

      <Col sm={24} md={12}>
        <Table
          bordered
          columns={validatorsColumn}
          dataSource={validators}
          pagination={false}
          scroll={{x: 500}}
          sticky
          title={() => (
            <Row justify="space-between" align="middle">
              <Typography.Text>Validators</Typography.Text>
            </Row>
          )}
        />
      </Col>
    </PageContentsLayout>
  );
};

export default Nodes;
