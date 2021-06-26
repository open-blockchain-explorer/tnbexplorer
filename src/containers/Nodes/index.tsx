import React, {FC, useCallback, useEffect, useState, useMemo} from 'react';

import axios from 'axios';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Table from 'antd/es/table';
import Typography from 'antd/es/typography';

import {Bank, PaginatedBankEntry} from 'thenewboston';

import {NetworkStats, PageContentsLayout, TestnetAlertMessage} from 'components';
import {validatorsColumn, validatorsData} from 'data/tableData/validators';
import {banksColumn, banksData} from 'data/tableData/banks';

import {useChainPath} from 'hooks';
import {CORS_BRIDGE, BANK_URL, PV_URL} from 'constants/url';

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

  const getValidators = async (nodeUrl: string, {limit, offset} = {limit: 10, offset: 0}) => {
    const endpoint = `${CORS_BRIDGE}/${nodeUrl}/validators?limit=${limit}&offset=${offset}`;
    console.log(endpoint);
    const rawValidators = (await axios.get(endpoint)).data.results;

    console.log({rawValidators});

    const validators = rawValidators.map(
      ({account_number, ip_address, node_identifier, default_transaction_fee, daily_confirmation_rate}: any) => {
        return {
          account: account_number,
          networkId: node_identifier,
          ipAddress: ip_address,
          txnFee: default_transaction_fee,
          confirmationRate: daily_confirmation_rate,
        };
      },
    );

    console.log({validators});
    return validators;
  };

  const getBanks = async (nodeUrl: string, {limit, offset} = {limit: 10, offset: 0}): Promise<BanksColumnType[]> => {
    const rawBanks = (await axios.get(`${CORS_BRIDGE}/${nodeUrl}/banks?limit=${limit}&offset=${offset}`)).data.results;

    const formattedBanks = rawBanks.reduce(
      async (
        accPromise: Promise<BanksColumnType[]>,
        {protocol, ip_address, port, node_identifier}: any,
      ): Promise<BanksColumnType[]> => {
        const acc = await accPromise;
        const url = protocol.concat('://', ip_address, ':', port ? port.toString() : '');

        try {
          const {data: confirmation}: any = await axios.get(`${CORS_BRIDGE}/${url}/confirmation_blocks?limit=1`);

          const {data: txs}: any = await axios.get(`${CORS_BRIDGE}/${url}/bank_transactions?limit=1`);

          const {data: config}: any = await axios.get(`${CORS_BRIDGE}/${url}/config`);

          console.log({confirmation, txs, config});

          acc.push({
            confirmations: confirmation.count,
            fee: config.default_transaction_fee,
            networkId: node_identifier,
            ipAddress: ip_address,
            transactions: txs.count,
          });
        } catch {
          console.log('Bank', ip_address, 'is inactive!');
        }

        return acc;
      },
      Promise.resolve([]),
    );

    const banks = await formattedBanks; // as BanksColumnType[];
    console.log({rawBanks: banks});
    return banks;
  };

  useEffect(() => {
    const load = () => {
      getValidators(PV_URL).then((validators) => {
        setValidators(validators);
      });

      getBanks(BANK_URL).then((banks) => {
        setBanks(banks);
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
