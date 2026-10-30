// GET /corporate-sales-agent/wallet/overview
export interface CaWalletOverview {
  balance_card: {
    commission_balance: number; commission_balance_formatted: string;
    profit_balance: number; profit_balance_formatted: string;
    wallet_balance: number; wallet_balance_formatted: string;
    currency: string; currency_symbol: string;
    chips: {
      ap_network_this_month: { amount: number; formatted: string; label: string };
      pending_payout: { amount: number; formatted: string; label: string };
    };
    actions: { can_request_payout: boolean; can_withdraw_profit?: boolean; can_download_statement: boolean; can_view_history: boolean; can_manage_bank: boolean };
  };
  stats_cards: {
    total_earned: { amount: number; formatted: string; label: string; subtext: string };
    total_paid_out: { amount: number; formatted: string; label: string; subtext: string; payouts_count: number };
    best_month: { amount: number; formatted: string; label: string; subtext: string; month_name: string };
  };
  payout_account: CaPayoutAccount & { account_number_masked: string; status: string; is_verified: boolean } | null;
  recent_payouts: { payouts: Array<CaPayoutItem & { date_label: string; created_at: string }>; total_paid_out: number; total_paid_out_formatted: string; total_count: number };
  monthly_earnings: {
    bars: Array<{ month: string; year: number; earnings: number; formatted: string; percentage: number; is_best_month: boolean; is_current_month: boolean }>;
    best_month_text: string; best_month_amount: number;
  };
  how_you_earn: {
    info: string; ap_network_acts: number; ap_network_acts_text: string; commission: number; commission_formatted: string;
    total_this_month: number; total_this_month_formatted: string;
  };
  category_tabs: Record<CaTransactionCategory, number>;
}

// GET /wallet/transactions
export type CaTransactionCategory = "all" | "commission" | "payouts" | "bill_payments";
export type CaTransactionPeriod = "today" | "this_week" | "this_month";
export interface CaTransaction {
  id: string; reference: string; title: string; subtitle: string; category: string; category_label: string; flow: "credit" | "debit";
  amount: number; amount_formatted: string; status: string; time: string; created_at: string; date_group: string;
  badge?: { text: string; color: string };
}
export interface CaTransactionParams { category: CaTransactionCategory; period: CaTransactionPeriod; search?: string; page: number; limit: number }
export interface CaTransactionsData {
  transactions: CaTransaction[];
  grouped_transactions: Array<{ date_group: string; transactions: CaTransaction[] }>;
  total: number; page: number; limit: number; total_pages: number; showing_text: string;
  category_counts: Record<CaTransactionCategory, number>;
}

// Payout account (GET/POST /wallet/payout-account)
export interface CaPayoutAccount { id: number; bank_name: string; bank_code: string; account_number: string; account_name: string; is_default: boolean; status?: string }
export interface CaPayoutAccountData { default_account: CaPayoutAccount | null; accounts: CaPayoutAccount[] }
export interface CaPayoutAccountPayload { bank_name: string; bank_code: string; account_number: string; account_name: string }

// Payouts (POST /wallet/request-payout, GET /wallet/payouts)
export interface CaPayoutItem {
  id: number; reference: string; amount: number; amount_formatted: string; status: string; status_badge: string;
  bank_name: string; account_number_masked: string; requested_at?: string; processed_at?: string | null;
}
export interface CaPayoutsData { payouts: CaPayoutItem[]; total: number; page: number; limit: number; total_pages: number }
export interface CaPinAmountPayload { amount: number; pin: string }
export interface CaPayoutResult {
  payout_id: number; amount: number; reference: string; status: string;
  bank_account: { bank_name: string; account_number: string; account_name: string };
}
export interface CaWithdrawProfitResult { withdrawn_amount: number; profit_balance: number; wallet_balance: number; reference: string; message: string }
