import type { ApiResponse } from "@/features/auth/types/api";

export interface VirtualAccount {
  account_number: string;
  account_name: string;
  bank_name: string;
  bank_code: string;
  provider: string;
}

export interface WalletData {
  id: number;
  user_id: number;
  balance: number;
  commission_balance: number;
  profit_balance: number;
  currency: string;
  virtual_account?: VirtualAccount;
  createdAt: string;
  updatedAt: string;
}

export interface WalletBalanceData {
  balance: number;
  commission_balance: number;
  profit_balance: number;
  currency: string;
}

export interface WalletSummaryData extends WalletBalanceData {
  total_inflow: number;
  total_outflow: number;
  recent_transactions: Array<{
    id: number;
    type: string;
    amount: number;
    status: string;
    reference: string;
    createdAt: string;
  }>;
}

export interface DepositPayload {
  amount: number;
  returnUrl: string;
}

export interface DepositResponseData {
  reference: string;
  amount: number;
  cashierUrl: string;
  status: string;
}

export interface WalletTransactionItem {
  id: number;
  wallet_id: number;
  transaction_type: string;
  amount: number;
  transaction_reference: string;
  status: string;
  description: string;
  balanceBefore: number;
  balanceAfter: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedTransactionsResponse {
  transactions: WalletTransactionItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type WalletApiResponse = ApiResponse<WalletData>;
export type WalletBalanceApiResponse = ApiResponse<WalletBalanceData>;
export type WalletSummaryApiResponse = ApiResponse<WalletSummaryData>;
export type WalletTransactionsApiResponse = ApiResponse<PaginatedTransactionsResponse>;
export type TransactionDetailApiResponse = ApiResponse<WalletTransactionItem>;
