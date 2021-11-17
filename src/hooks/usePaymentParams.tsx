import {useLocation} from 'react-router-dom';
import {nanoid} from 'nanoid';

import {Payment} from 'types/payment-request';

export const usePaymentParams = () => {
  const query = new URLSearchParams(useLocation().search);
  const [recipientString, amountString, memoString] = [
    query.get('recipient'),
    query.get('amount'),
    query.get('memo')?.replaceAll('%20', ' '),
  ];

  if (!recipientString || !amountString) return [];

  const [recipients, amounts, memos] = [recipientString!.split(','), amountString!.split(','), memoString!.split(',')];

  const payments: Payment[] = [];
  for (let i = 0; i < recipients.length; i += 1) {
    if (recipients[i]) {
      payments.push({
        key: nanoid(),
        recipient: recipients[i],
        amount: Number(amounts[i]),
        memo: memos[i],
      });
    }
  }

  return payments;
};
