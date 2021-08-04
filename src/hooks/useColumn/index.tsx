import React from 'react';
import {transactionColumn, TransactionColumnType} from './transactions';
import {blocksColumn, BlocksColumnType} from './blocks';
import {richlistColumn, RichlistColumnType} from './richlist';

type ColumnType = TransactionColumnType | BlocksColumnType | RichlistColumnType;

export const useColumn = (dataType: 'blocks' | 'richlist' | 'transactions' | 'banks' | 'nodes', param?: any) => {
  switch (dataType) {
    case 'transactions':
      return transactionColumn(param);
    case 'blocks':
      return blocksColumn;
    case 'richlist':
      return richlistColumn;
    default:
      throw new Error('useColumn: Invalid Data Type ');
  }
};
