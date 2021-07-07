import {createSlice} from '@reduxjs/toolkit';
import {BANK_URL, PV_URL} from 'constants/url';
import {setObjectsReducer} from 'utils/store';

interface CurrentChainData {
  isMainnet: boolean;
  bankUrl: string;
  pvUrl: string;
  path: string;
}

const currentChain = createSlice({
  initialState: {
    isMainnet: true,
    bankUrl: BANK_URL,
    pvUrl: PV_URL,
    path: '/tnb',
  } as CurrentChainData,
  name: 'CURRENT_CHAIN',
  reducers: {
    setCurrentChainData: setObjectsReducer<CurrentChainData>(),
  },
});

export const {setCurrentChainData} = currentChain.actions;
export default currentChain.reducer;
