import {PayloadAction} from '@reduxjs/toolkit';

export const setObjectsReducer = <Type extends {[key: string]: any}>() => (
  state: Type,
  {payload}: PayloadAction<Type>,
) => {
  Object.keys(state).forEach((key: string) => {
    state[key] = payload[key];
  });
};
