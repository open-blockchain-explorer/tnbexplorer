import {combineReducers} from '@reduxjs/toolkit';

import networkStatsReducer, {setNetworkStats} from './networkStats';
import currentChainReducer, {setCurrentChainData} from './currentChain';

export default combineReducers({
  currentChain: currentChainReducer,
  networkStats: networkStatsReducer,
});

export {setCurrentChainData, setNetworkStats};
