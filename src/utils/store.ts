import {PayloadAction} from '@reduxjs/toolkit';

export const setObjectsReducer = <Type>() => (state: Type, {payload}: PayloadAction<Type>) => {
  Object.keys(state).forEach((key: string) => {
    state[key] = payload[key];
  });
};
