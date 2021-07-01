import axios from 'axios';

import {CORS_BRIDGE} from 'constants/url';

const getData = async (url: string) => (await axios.get(`${CORS_BRIDGE}/${url}`)).data;

interface BanksColumnType {
  confirmations: number;
  fee: number;
  networkId: string;
  ipAddress: string;
  transactions: number;
}

export const getBanks = async (
  nodeUrl: string,
  {limit, offset} = {limit: 10, offset: 0},
): Promise<BanksColumnType[]> => {
  const url = `${nodeUrl}/banks?limit=${limit}&offset=${offset}`;
  const rawBanks = (await getData(url)).results;

  const formattedBanks = rawBanks.map(
    async ({protocol, ip_address, port, node_identifier}: any): Promise<BanksColumnType> => {
      const bankIp = protocol.concat('://', ip_address, ':', port ? port.toString() : '');

      const {data: confirmation}: any = await axios.get(`${CORS_BRIDGE}/${bankIp}/confirmation_blocks?limit=1`);

      const {data: txs}: any = await axios.get(`${CORS_BRIDGE}/${bankIp}/bank_transactions?limit=1`);

      const {data: config}: any = await axios.get(`${CORS_BRIDGE}/${bankIp}/config`);

      console.log({confirmation, txs, config});

      return {
        confirmations: confirmation.count as number,
        fee: config.default_transaction_fee as number,
        networkId: node_identifier,
        ipAddress: ip_address,
        transactions: txs.count as number,
      };
    },
  );

  const banks = (await Promise.all(formattedBanks)) as BanksColumnType[];
  console.log({rawBanks: banks});
  return banks;
};

export const getTransactions = async (nodeUrl: string, queryParams = {}) => {
  const defaultOptions = {
    limit: 10,
    offset: 0,
    accountNumber: '',
    sender: '',
    recipient: '',
  };
  // console.log({queryParams});
  const {limit, offset, accountNumber, sender, recipient} = {...defaultOptions, ...queryParams};

  const url = `${nodeUrl}/bank_transactions?limit=${limit}&offset=${offset}&account_number=${accountNumber}&block__sender=${sender}&recipient=${recipient}`;
  const data = await getData(url);

  const transactions = await data.results.map((tx: any) => {
    return {
      id: tx.id,
      coins: tx.amount,
      fee: tx.fee,
      memo: tx.memo,
      recipient: tx.recipient,
      sender: tx.block.sender,
      time: tx.block.modified_date,
    };
  });

  const totalTransactions = data.count;
  return [transactions, totalTransactions];
};

interface ConfirmationBlocksQueryParams {
  limit?: number;
  offset?: number;
  ordering?: `${'' | '+' | '-'}${'created_date' | 'modified_date' | 'id' | 'block' | 'validator' | 'block_identifier'}`;
}

export const getConfirmationBlocks = async (nodeUrl: string, queryParams: ConfirmationBlocksQueryParams = {}) => {
  const defaultOptions: ConfirmationBlocksQueryParams = {
    limit: 10,
    offset: 0,
    ordering: '-modified_date',
  };
  const {limit, offset, ordering} = {...defaultOptions, ...queryParams};

  const url = `${nodeUrl}/confirmation_blocks?limit=${limit}&offset=${offset}&ordering=${ordering}`;
  const {results: confirmationBlocks, count: total} = await getData(url);

  return [confirmationBlocks, total];
};

interface AccountDetails {
  balance?: number;
  balanceLock: string;
}

export const getAccountDetails = async (nodeUrl: string, accountNumber: string) => {
  const data: AccountDetails = {balance: 0, balanceLock: ''};

  await axios.get(`${CORS_BRIDGE}/${nodeUrl}/accounts/${accountNumber}/balance`).then((res) => {
    data.balance = res.data.balance ?? 0;
  });

  await axios.get(`${CORS_BRIDGE}/${nodeUrl}/accounts/${accountNumber}/balance_lock`).then((res) => {
    console.log(res.data);
    data.balanceLock = res.data.balance_lock ?? '';
  });
  console.log({data});

  return data;
};
