import {createSlice} from '@reduxjs/toolkit';
import {BANK_URL, PV_URL} from 'constants/url';
import {setObjectsReducer} from 'utils/store';

interface CurrentChainData {
  [key: string]: any;
  isMainnet: boolean;
  bankUrl: string;
  pvUrl: string;
}

const currentChain = createSlice({
  initialState: {
    isMainnet: true,
    bankUrl: BANK_URL,
    pvUrl: PV_URL,
  } as CurrentChainData,
  name: 'CURRENT_CHAIN',
  reducers: {
    setCurrentChainData: setObjectsReducer<CurrentChainData>(),
  },
});

export const {setCurrentChainData} = currentChain.actions;
export default currentChain.reducer;
