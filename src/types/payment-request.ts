export interface Payment {
  key?: string;
  recipient: string;
  amount: number;
  memo: string;
}
