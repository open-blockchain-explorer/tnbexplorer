import React from 'react';

import {useLocation} from 'react-router-dom';
import {nanoid} from 'nanoid';

interface QueryParams {
  accountNumber: string;
  amount: string;
  memo: string;
}

export const usePaymentParams = () => {
  const query = new URLSearchParams(useLocation().search);
  const [accountNumberString, amountString, memoString] = [
    query.get('accountNumber'),
    query.get('amount'),
    query.get('memo')?.replaceAll('%20', ' '),
  ];

  // console.log({accountNumberString, amountString, memoString});

  if (!accountNumberString || !amountString) return [];

  const [accountNumbers, amounts, memos] = [
    accountNumberString!.split(','),
    amountString!.split(','),
    memoString!.split(','),
  ];

  // console.log({accountNumbers, amounts, memos});

  const payments: any[] = [];
  for (let i = 0; i < accountNumbers.length; i += 1) {
    if (accountNumbers[i]) {
      payments.push({
        key: nanoid(),
        accountNumber: accountNumbers[i],
        amount: Number(amounts[i]),
        memo: memos[i],
      });
    }
  }

  return payments;
};
