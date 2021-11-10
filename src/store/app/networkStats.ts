import {createSlice, combineReducers} from '@reduxjs/toolkit';

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

const initState = {
  accounts: 0,
  activeBanks: 0,
  activeValidators: 0,
  date: new Date(0).toISOString(),
  distributedCoins: 0,
  transactions: 0,
};

const recentStats = createSlice({
  initialState: {...initState} as NetworkStats,
  name: 'RECENT_NETWORK_STATS',
  reducers: {
    setRecentNetworkStats: setObjectsReducer<NetworkStats>(),
  },
});

const previousStats = createSlice({
  initialState: {...initState} as NetworkStats,
  name: 'PREVIOUS_NETWORK_STATS',
  reducers: {
    setPreviousNetworkStats: setObjectsReducer<NetworkStats>(),
  },
});

const networkStatsReducer = combineReducers({
  recent: recentStats.reducer,
  previous: previousStats.reducer,
});

export const {setRecentNetworkStats} = recentStats.actions;
export const {setPreviousNetworkStats} = previousStats.actions;

export default networkStatsReducer;
