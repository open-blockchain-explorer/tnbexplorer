import {createSlice} from '@reduxjs/toolkit';

// import {MANAGED_ACCOUNTS} from '@renderer/constants/actions';
// import {Dict, ManagedAccount} from '@renderer/types';
import {setObjectsReducer} from 'utils/store';

interface NetworkStats {
  accounts?: number;
  activeBanks?: number;
  activeValidators?: number;
  date?: string;
  distributedCoins?: number;
  transactions?: number;
}

const networkStats = createSlice({
  initialState: {
    accounts: 0,
    activeBanks: 0,
    activeValidators: 0,
    date: new Date(0).toISOString(),
    distributedCoins: 0,
    transactions: 0,
  } as NetworkStats,
  name: 'NETWORK_STATS',
  reducers: {
    setNetworkStats: setObjectsReducer<NetworkStats>(),
  },
});

export const {setNetworkStats} = networkStats.actions;

export default networkStats.reducer;
