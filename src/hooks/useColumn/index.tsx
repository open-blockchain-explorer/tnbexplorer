import {transactionColumn} from './transactions';
import {blocksColumn} from './blocks';
import {richListColumn} from './rich-list';

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
