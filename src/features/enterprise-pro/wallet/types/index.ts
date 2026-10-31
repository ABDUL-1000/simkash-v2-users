export interface TransactionItem {
  id: string;
  ref: string;
  category: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  time: string;
  dateGroup: string;
  createdAt: string;
  amount: number;
  amountFormatted: string;
  isOutflow: boolean;
  status: string;
}

export interface PayoutRecord {
  id: string;
  reference: string;
  date: string;
  amount: number;
  amountFormatted: string;
  account: string;
  status: string;
}
