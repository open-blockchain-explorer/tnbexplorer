import { transactionTypes } from 'redux/action-types/transactions.types';

const initialState = {
  allTransactions: {},
};

interface Actions {
  type: string;
  payload: string;
}

export default (state = initialState, action: Actions) => {
  switch (action.type) {
    case transactionTypes.GET_ALL_TRANSACTIONS:
      return {
        ...state,
        allTransactions: action.payload,
      };
    default:
      return state;
  }
};
