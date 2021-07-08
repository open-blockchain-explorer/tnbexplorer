import {getAccountDetails, getData} from 'api/bank';

export enum QueryType {
  block_height = 'BLOCK_HEIGHT',
  account = 'ACCOUNT_NUMBER',
  node_id = 'NODE_ID',
  ip_address = 'IP_ADDRESS',
}

export const identifyQuery = async (query: string, currentChain: any): Promise<QueryType | null> => {
  const {pvUrl, bankUrl} = currentChain;

  query = query.trim();

  if (Number(query)) {
    // query is block height
    return QueryType.block_height;
  }

  if (query.includes('.')) {
    try {
      await getData(`${query}/config`);
      return QueryType.ip_address;
    } catch {
      console.log(`${query} is Not a valid url`);
    }

    return null;
  }

  if (query.length === 64) {
    const account = await getAccountDetails(pvUrl, query);

    if (account.balanceLock) {
      return QueryType.account;
    }
  }

  return null;
};
