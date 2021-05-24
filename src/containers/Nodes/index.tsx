import React, {FC, useState} from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Table from 'antd/es/table';
import Typography from 'antd/es/typography';

import {NetworkStats, PageContentsLayout, TestnetAlertMessage} from 'components';
import {validatorsColumn, validatorsData} from 'data/tableData/validators';
import {banksColumn, banksData} from 'data/tableData/banks';

import {useChainPath} from 'hooks';

const Nodes: FC = () => {
  const currentPath = useChainPath();
  const isMainnet = currentPath === '/tnb';
  const banks = banksData(10);
  const validators = validatorsData(10);

  return (
    <PageContentsLayout>
      <Col span={24}>{isMainnet ? <NetworkStats /> : <TestnetAlertMessage />}</Col>

      <Col sm={24} md={12}>
        <Table
          bordered
          columns={validatorsColumn}
          dataSource={validators}
          pagination={false}
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
          columns={banksColumn}
          dataSource={banks}
          pagination={false}
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
