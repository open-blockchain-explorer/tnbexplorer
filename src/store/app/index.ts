import {combineReducers} from '@reduxjs/toolkit';

// import reducer, {actions}
import networkStatsReducer, {setRecentNetworkStats, setPreviousNetworkStats} from './networkStats';
import currentChainReducer, {setCurrentChainData} from './currentChain';

export default combineReducers({
  currentChain: currentChainReducer,
  networkStats: networkStatsReducer,
});

export {setCurrentChainData, setRecentNetworkStats, setPreviousNetworkStats};
