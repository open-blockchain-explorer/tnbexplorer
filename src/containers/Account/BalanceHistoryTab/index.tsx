import React, {useContext} from 'react';
import {Area} from '@ant-design/charts';

import {ChartsCard} from 'components';
import balanceHistoryConfig from './config';
import {AccountPageContext} from '../accountContext';

export const BalanceHistoryTab = React.memo(() => {
  const {balanceHistory} = useContext(AccountPageContext);

  return (
    <ChartsCard title={'Balances'}>
      <Area {...{...balanceHistoryConfig, data: balanceHistory}} />
    </ChartsCard>
  );
});

export default BalanceHistoryTab;
