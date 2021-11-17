import {createContext} from 'react';

export const AccountPageContext = createContext(
  {} as {
    balanceHistory: any[];
    isAccountValid: boolean;
    transactions: any[];
    setTransactions: any;
  },
);

export const AccountPageProvider = AccountPageContext.Provider;
