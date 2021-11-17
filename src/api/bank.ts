import axios from 'axios';

import {CORS_BRIDGE} from 'constants/url';
// import {QueryParams} from 'utils/search';
import {formatQueryParamsToString} from 'utils/format';

export const getData = async (url: string) => {
  const source = axios.CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
  }, 10_000);

  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) url = `${CORS_BRIDGE}/${url}`;

  const res = await axios.get(url, {cancelToken: source.token});

  clearTimeout(timeout);
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
) => {
  const url = `${nodeUrl}/banks?limit=${limit}&offset=${offset}`;
  const {results: rawBanks, count: total} = await getData(url);

  const banks = await rawBanks
    .reverse()
    .reduce(
      async (
        asyncAcc: Promise<BanksColumnType[]>,
        {protocol, ip_address, port, node_identifier, default_transaction_fee}: any,
      ): Promise<BanksColumnType[]> => {
        const acc = await asyncAcc;

        const bankIp = protocol.concat('://', ip_address, ':', port ? port.toString() : '');

        try {
          const data = await getConfirmationBlocks(bankIp);
          if (data) {
            const {total: totalConfirmations} = data;

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
          console.warn(`Bank "${bankIp}" is offline`);
        }

        return acc;
      },
      Promise.resolve([]),
    );

  return {results: banks, total};
};

export const getTransactions = async (nodeUrl: string, query = {}) => {
  const defaultOptions = {
    limit: 10,
    offset: 0,
    accountNumber: '',
    sender: '',
    recipient: '',
    fee: '',
    ordering: '',
  };
  const queryOptions = {...defaultOptions, ...query};

  const {limit, offset, accountNumber, sender, recipient, ordering} = queryOptions;

  let {fee} = queryOptions;

  if (fee) {
    if (fee.toLowerCase() === 'none' || fee.toLowerCase() === 'bank' || fee.toLowerCase() === 'primary_validator') {
      fee = fee.toUpperCase();
    }
  } else {
    fee = '';
  }

  // const queryParams = new QueryParams(query);
  const url = `${nodeUrl}/bank_transactions?limit=${limit}&offset=${offset}&account_number=${
    accountNumber ?? ''
  }&block__sender=${sender ?? ''}&recipient=${recipient ?? ''}&ordering=${ordering}&fee=${fee ?? ''}`;

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

  return {
    results: transactions,
    total: data.count,
  };
};

type Dict = {[key: string]: any};

interface ConfirmationBlocksQueryParams extends Dict {
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
  const {results, count: total} = await getData(url);

  return {
    results,
    total,
  };
};

interface AccountDetails {
  balance?: number;
  balanceLock: string;
}

export const getAccountDetails = async (nodeUrl: string, accountNumber: string) => {
  const data: AccountDetails = {balance: 0, balanceLock: ''};

  await getData(`${nodeUrl}/accounts/${accountNumber}/balance`).then((result) => {
    data.balance = result.balance ?? 0;
  });

  await getData(`${nodeUrl}/accounts/${accountNumber}/balance_lock`).then((result) => {
    data.balanceLock = result.balance_lock ?? '';
  });

  return data;
};
