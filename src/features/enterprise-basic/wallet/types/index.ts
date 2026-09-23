export type WalletFilterKey =
  | "all"
  | "margin"
  | "payouts"
  | "orders"
  | "bonus"
  | "bills";

export interface EbWalletTransaction {
  id: string;
  type: "margin" | "payout" | "order" | "bonus" | "bill";
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
}

export interface EbWalletSummary {
  availableBalance: number;
  lastUpdated: string;
  marginThisMonth: number;
  lifetimeMargin: number;
  ordersPlacedCount: number;
  bonusPending: number;
  totalMargin: number;
  totalPaidOut: number;
  unsoldStockValue: number;
  unsoldUnitsCount: number;
}
