import {getData} from 'api';

export const getValidators = async (nodeUrl: string, {limit, offset} = {limit: 10, offset: 0}) => {
  const endpoint = `${nodeUrl}/validators?limit=${limit}&offset=${offset}`;
  const rawValidators = await getData(endpoint);

  const validators = rawValidators.results.map(
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

  return {
    results: validators,
    total: rawValidators.count,
  };
};
