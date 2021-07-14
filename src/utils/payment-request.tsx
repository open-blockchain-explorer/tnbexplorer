import {Payment} from 'types/payment-request';

export const createPaymentsUrl = (payments: Payment | Payment[]) => {
  if (!Array.isArray(payments)) {
    const {recipient, amount, memo} = payments;
    return `/tnb/payment-request?recipient=${recipient}&amount=${amount}&memo=${memo}`;
  }
  const recipients: string[] = [];
  const amounts: number[] = [];
  const memos: string[] = [];
  payments.forEach(({recipient, amount, memo}) => {
    if (recipient) {
      recipients.push(recipient);
      amounts.push(amount);
      memos.push(memo);
    }
  });

  return `/tnb/payment-request?recipient=${recipients.join(',')}&amount=${amounts.join(',')}&memo=${memos.join(',')}`;
};
