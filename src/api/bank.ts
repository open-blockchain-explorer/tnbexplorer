import axios from 'axios';

import {CORS_BRIDGE} from 'constants/url';
import {formatQueryParamsToString} from 'utils/format';

export const getData = async (url: string) => {
  const source = axios.CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
  }, 10_000);

  const res = await axios.get(`${CORS_BRIDGE}/${url}`, {cancelToken: source.token});

  clearTimeout(timeout);
  // console.log({res});
  return res.data;
};

interface BanksColumnType {
  confirmationBlocks: number;
  fee: number;
  networkId: string;
  ipAddress: string;
}

export const getBanks = async (
  nodeUrl: string,
  {limit, offset} = {limit: 10, offset: 0},
  callback?: (bank: BanksColumnType) => void,
): Promise<BanksColumnType[]> => {
  const url = `${nodeUrl}/banks?limit=${limit}&offset=${offset}`;
  const rawBanks = (await getData(url)).results;

  const banks = await rawBanks
    .reverse()
    .reduce(
      async (
        asyncAcc: Promise<BanksColumnType[]>,
        {protocol, ip_address, port, node_identifier, default_transaction_fee}: any,
      ): Promise<BanksColumnType[]> => {
        const acc = await asyncAcc;

        const bankIp = protocol.concat('://', ip_address, ':', port ? port.toString() : '');

        // console.log({bankIp});

        try {
          const data = await getConfirmationBlocks(bankIp);
          if (data) {
            const [unusedObj, totalConfirmations] = data;

            const bankData = {
              confirmationBlocks: totalConfirmations as number,
              fee: default_transaction_fee as number,
              networkId: node_identifier,
              ipAddress: ip_address,
            };

            callback?.(bankData);
            acc.push(bankData);
          }
        } catch {
          console.log(`Bank "${bankIp}" is offline`);
        }

        return acc;
      },
      Promise.resolve([]),
    );

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

type QueryParams = {[key: string]: any};

interface ConfirmationBlocksQueryParams extends QueryParams {
  limit?: number;
  offset?: number;
  block?: string;
  ordering?: `${'' | '+' | '-'}${'created_date' | 'modified_date' | 'id' | 'block' | 'validator' | 'block_identifier'}`;
}

export const getConfirmationBlocks = async (nodeUrl: string, queryParams?: ConfirmationBlocksQueryParams) => {
  const defaultOptions: ConfirmationBlocksQueryParams = {
    limit: 10,
    offset: 0,
    ordering: '-modified_date',
  };
  queryParams = {...defaultOptions, ...queryParams};
  const queryParamsUrl = formatQueryParamsToString(queryParams);
  const url = `${nodeUrl}/confirmation_blocks${queryParamsUrl}`;
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
    // console.log(res.data);
    data.balanceLock = res.data.balance_lock ?? '';
  });
  // console.log({data});

  return data;
};
