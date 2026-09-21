export type TransactionCategory =
  | "all"
  | "margin"
  | "commission"
  | "payout"
  | "sim-order"
  | "balance-pay";

export type TransactionType =
  | "margin"
  | "commission"
  | "payout"
  | "sim-order"
  | "balance-pay"
  | "bonus"
  | "failed-payout";

export interface TransactionItem {
  id: string;
  ref: string;
  type: TransactionType;
  title: string;
  subtitle: string;
  timeAgo: string;
  date: string;
  amount: number;
  isOutflow: boolean;
  status: "Completed" | "Pending" | "Failed" | "Refunded";
  meta?: {
    simCount?: number;
    wholesaleRate?: number;
    networkRate?: string;
    bankName?: string;
    accountMask?: string;
    balanceBefore?: number;
    balanceAfter?: number;
    failureReason?: string;
  };
}

export interface PayoutRecord {
  id: string;
  date: string;
  amount: number;
  bank: string;
  accountMask: string;
  status: "Paid" | "Pending" | "Failed";
  timeAgo: string;
}

export interface WalletBalanceData {
  totalBalance: number;
  marginThisMonth: number;
  networkCommissionThisMonth: number;
  balanceRemaining: number;
  bonusPending: number;
  bonusTargetPct: number;
  initialInvestment: number;
  earnedThisMonth: number;
  totalPaidOut: number;
  simOrdersPaid: number;
  balancePaidDown: number;
  earningsInTotal: number;
  payoutsOutTotal: number;
  simOrdersTotal: number;
  balancePayTotal: number;
  netWalletPosition: number;
}

export interface BankAccountDetails {
  bankName: string;
  accountNumberMask: string;
  accountNumberFull?: string;
  accountName: string;
  status: "Verified" | "Under Review" | "Action Required";
}

export interface AccountManagerInfo {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
}

export interface MonthlyEarningsBar {
  month: string;
  amount: number;
}
