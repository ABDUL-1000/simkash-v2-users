export interface EnterpriseHeroBalanceCard {
  title: string;
  balance: number;
  balance_formatted: string;
  tag: string;
  chips: {
    margin_this_month: { amount: number; formatted: string; label: string };
    network_commission: { amount: number; formatted: string; label: string };
    balance_remaining: { amount: number; formatted: string; label: string };
    bonus_pending: { amount: number; formatted: string; label: string };
  };
}

export interface EnterpriseBalanceWarningBanner {
  balance_remaining: number;
  balance_remaining_formatted: string;
  initial_principal?: number;
  paid_amount: number;
  percent_paid: number;
  percent_owed: number;
}

export interface EnterpriseMiddleKpiCards {
  earned_this_month: { amount: number; formatted: string; subtext: string };
  total_paid_out: { amount: number; formatted: string; subtext: string };
  sim_orders_paid: { amount: number; formatted: string; subtext: string };
  balance_paid_down: { amount: number; formatted: string; subtext: string };
}

export interface EnterprisePayoutAccount {
  id?: number;
  bank_name: string;
  bank_code?: string;
  account_number?: string;
  account_number_masked: string;
  account_name: string;
  is_verified?: boolean;
  status: string;
}

export interface EnterpriseAccountManager {
  name: string;
  phone: string;
  email: string;
}

export interface EnterpriseWalletOverviewData {
  hero_balance_card: EnterpriseHeroBalanceCard;
  balance_warning_banner: EnterpriseBalanceWarningBanner;
  middle_kpi_cards: EnterpriseMiddleKpiCards;
  payout_account: EnterprisePayoutAccount;
  account_manager: EnterpriseAccountManager;
}

export interface EnterpriseTransactionItem {
  id: number;
  category: "margin_earnings" | "network_commission" | "payouts" | "sim_orders" | "balance_payments" | string;
  title: string;
  description: string;
  amount: number;
  amount_formatted: string;
  flow: "in" | "out";
  date_formatted: string;
  reference: string;
  status: string;
}

export interface EnterpriseTransactionGroup {
  header: "THIS WEEK" | "EARLIER THIS MONTH" | "LAST MONTH (MAY)" | string;
  transactions: EnterpriseTransactionItem[];
}

export interface EnterpriseTransactionsResponseData {
  active_category: string;
  active_timeframe: string;
  total_records: number;
  category_counts: {
    all: number;
    margin_earnings: number;
    network_commission: number;
    payouts: number;
    sim_orders: number;
    balance_payments: number;
  };
  groups: EnterpriseTransactionGroup[];
}

export interface EnterpriseRecentPayoutItem {
  id: number;
  amount: number;
  amount_formatted: string;
  date_formatted: string;
  status: string;
  status_color: string;
}

export interface EnterpriseRecentPayoutsData {
  title: string;
  total_paid_out: number;
  total_paid_out_formatted: string;
  items: EnterpriseRecentPayoutItem[];
}

export interface EnterpriseStatementSummaryData {
  period: string;
  opening_balance: number;
  closing_balance: number;
  total_credit: number;
  total_debit: number;
  transactions_count: number;
}

export interface EnterpriseActivityBreakdownData {
  title: string;
  total_inflows: number;
  total_inflows_formatted: string;
  total_outflows: number;
  total_outflows_formatted: string;
  net_profit: number;
  net_profit_formatted: string;
}

export interface RequestEnterprisePayoutPayload {
  amount: number;
  notes?: string;
}

export interface EnterpriseReinvestPayload {
  amount: number;
  destination: "stock" | string;
}

export interface EnterprisePayBalancePayload {
  amount: number;
}

export interface SaveEnterprisePayoutAccountPayload {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_name: string;
}

export interface WalletResponse<T> { success: boolean; message: string; data: T; }
export type WalletCategory = 'all' | 'margin_earnings' | 'network_commission' | 'payouts' | 'sim_orders' | 'balance_payments';
export type WalletTimeframe = 'today' | 'this_week' | 'this_month' | 'all_time' | 'custom';
export interface WalletActionResult { reference: string; amount?: number; amount_formatted?: string; amount_paid?: number; amount_paid_formatted?: string; remaining_balance?: number; remaining_balance_formatted?: string; destination?: string; bank_name?: string; account_number_masked?: string; account_name?: string; status?: string; }
