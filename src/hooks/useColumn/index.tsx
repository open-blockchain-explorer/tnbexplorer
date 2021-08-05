import React from 'react';
import {transactionColumn, TransactionColumnType} from './transactions';
import {blocksColumn, BlocksColumnType} from './blocks';
import {richListColumn, RichListColumnType} from './rich-list';

type ColumnType = TransactionColumnType | BlocksColumnType | RichListColumnType;

export const useColumn = (dataType: 'blocks' | 'rich-list' | 'transactions' | 'banks' | 'nodes', param?: any) => {
  switch (dataType) {
    case 'transactions':
      return transactionColumn(param);
    case 'blocks':
      return blocksColumn;
    case 'rich-list':
      return richListColumn;
    default:
      throw new Error('useColumn: Invalid Data Type ');
  }
};
