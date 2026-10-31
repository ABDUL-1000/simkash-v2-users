export interface WalletResponse<T> { success: boolean; message: string; data: T }

// GET /enterprise/wallet/overview
export interface EnterpriseBalanceCard {
  commission_balance: number; commission_balance_formatted: string;
  profit_balance: number; profit_balance_formatted: string;
  wallet_balance: number; wallet_balance_formatted: string;
  currency: string; currency_symbol: string;
  chips: {
    ap_network_this_month: { amount: number; formatted: string; label: string };
    pending_payout: { amount: number; formatted: string; label: string };
  };
  actions: { can_request_payout: boolean; can_withdraw_profit: boolean; can_download_statement: boolean; can_view_history: boolean; can_manage_bank: boolean };
}
export interface EnterpriseStatCard { amount: number; formatted: string; label: string; subtext: string }
export interface EnterpriseStatsCards { total_earned: EnterpriseStatCard; total_paid_out: EnterpriseStatCard; best_month: EnterpriseStatCard }
export interface EnterpriseWalletOverviewData { balance_card: EnterpriseBalanceCard; stats_cards: EnterpriseStatsCards }

// GET /enterprise/wallet/transactions
export type WalletCategory = "all" | "commission" | "payout" | "transfer" | "bill_payment";
export interface EnterpriseTransactionItem {
  id: string; reference: string; title: string; subtitle: string; category: string; category_label: string; flow: "credit" | "debit";
  amount: number; amount_formatted: string; status: string; time: string; created_at: string; date_group: string;
}
export interface EnterpriseTransactionsResponseData { items: EnterpriseTransactionItem[]; total: number; page: number; limit: number; total_pages: number }

// GET/POST /enterprise/wallet/payout-account
export interface EnterprisePayoutAccount { is_set?: boolean; bank_name: string; bank_code?: string; account_number: string; account_name: string; verified?: boolean }
export interface SaveEnterprisePayoutAccountPayload { bank_name: string; bank_code: string; account_number: string; account_name: string }

// POST /enterprise/wallet/request-payout, GET /enterprise/wallet/payouts
export interface RequestEnterprisePayoutPayload { amount: number; notes?: string }
export interface EnterprisePayoutResult { request_id: number; reference: string; amount: number; status: string; account_name: string; bank_name: string; account_number: string }
export interface EnterprisePayoutItem { id: number; reference: string; amount: number; amount_formatted: string; status: string; date: string; account: string }

// POST /enterprise/wallet/withdraw-profit
export interface EnterpriseWithdrawProfitResult { withdrawn_amount: number; profit_balance: number; wallet_balance: number; reference: string }

/** Receipt shape used by the payout result modals. */
export interface WalletActionResult { reference: string; amount?: number; amount_formatted?: string; amount_paid_formatted?: string; bank_name?: string; account_number_masked?: string; account_name?: string; status?: string }
/** Saved-account shape used by the bank result modal. */
export interface SavedPayoutAccount { id?: number; bank_name: string; account_number: string; account_number_masked: string; account_name: string; status: string }
