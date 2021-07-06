import {RootState} from 'types';

export const getCurrentChain = (state: RootState) => state.app.currentChain;
export const getNetworkStats = (state: RootState) => state.app.networkStats;
