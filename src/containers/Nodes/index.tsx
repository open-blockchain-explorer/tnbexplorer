import React, {FC, useEffect, useState} from 'react';

import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Table from 'antd/es/table';
import Typography from 'antd/es/typography';

import {NetworkStats, PageContentsLayout, TestnetAlertMessage} from 'components';
import {validatorsColumn} from 'data/tableData/validators';
import {banksColumn} from 'data/tableData/banks';

import {getBanks} from 'api/bank';
import {getValidators} from 'api/validator';

import {useChainPath} from 'hooks';
import {BANK_URL, PV_URL} from 'constants/url';

interface BanksColumnType {
  confirmations: number;
  fee: number;
  networkId: string;
  ipAddress: string;
  transactions: number;
}

const Nodes: FC = () => {
  const currentPath = useChainPath();
  const isMainnet = currentPath === '/tnb';

  const [banks, setBanks] = useState<BanksColumnType[]>([]);
  const [validators, setValidators] = useState<any[]>([]);

  useEffect(() => {
    const load = () => {
      getValidators(PV_URL).then((validatorsData) => {
        setValidators(validatorsData);
      });

      getBanks(BANK_URL).then((banksData) => {
        setBanks(banksData);
      });
    };

    load();
  }, []);

  return (
    <PageContentsLayout>
      <Col span={24}>{isMainnet ? <NetworkStats /> : <TestnetAlertMessage />}</Col>

      <Col sm={24} md={12}>
        <Table
          bordered
          columns={banksColumn}
          dataSource={banks}
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
          columns={validatorsColumn}
          dataSource={validators}
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
