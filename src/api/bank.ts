import axios from 'axios';

import {CORS_BRIDGE} from 'constants/url';

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
  const rawBanks = (await axios.get(`${CORS_BRIDGE}/${nodeUrl}/banks?limit=${limit}&offset=${offset}`)).data.results;

  const formattedBanks = rawBanks.map(
    async ({protocol, ip_address, port, node_identifier}: any): Promise<BanksColumnType> => {
      const url = protocol.concat('://', ip_address, ':', port ? port.toString() : '');

      const {data: confirmation}: any = await axios.get(`${CORS_BRIDGE}/${url}/confirmation_blocks?limit=1`);

      const {data: txs}: any = await axios.get(`${CORS_BRIDGE}/${url}/bank_transactions?limit=1`);

      const {data: config}: any = await axios.get(`${CORS_BRIDGE}/${url}/config`);

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

  const {data} = await axios.get(
    `${CORS_BRIDGE}/${nodeUrl}/bank_transactions?limit=${limit}&offset=${offset}&account_number=${accountNumber}&block__sender=${sender}&recipient=${recipient}`,
  );

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
  // console.log({transactions});

  const totalTransactions = data.count;
  return [transactions, totalTransactions];
};
