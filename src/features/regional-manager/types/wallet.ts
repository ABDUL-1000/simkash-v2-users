export interface RmWalletOverviewData {
  balance_card: {
    commission_balance: number;
    commission_balance_formatted: string;
    currency: string;
    currency_symbol: string;
    chips: {
      network_activations: {
        amount: number;
        formatted: string;
        label: string;
      };
      pending_payout: {
        amount: number;
        formatted: string;
        label: string;
      };
    };
  };
  stats_cards: {
    total_earned: { amount: number; formatted: string; label: string; subtext: string };
    total_paid_out: { amount: number; formatted: string; label: string; subtext: string };
    best_month: { amount: number; formatted: string; label: string; subtext: string };
  };
  payout_account: {
    bank_name: string;
    account_number_masked: string;
    account_name: string;
    is_verified: boolean;
  };
  recent_payouts: {
    total_paid_out: number;
    total_paid_out_formatted: string;
    total_count: number;
  };
  monthly_earnings: {
    best_month_text: string;
  };
  how_you_earn: {
    info: string;
    sc_network_acts_text: string;
    commission_rate_text: string;
    total_earned_formatted: string;
  };
  category_tabs: {
    all: number;
    commission: number;
    payouts: number;
    bill_payments: number;
    transfers: number;
  };
}

export interface RmGroupedTransactionItem {
  id: string;
  reference: string;
  title: string;
  subtitle: string;
  category: string;
  flow: "credit" | "debit";
  amount: number;
  amount_formatted: string;
  status: string;
  time: string;
}

export interface RmGroupedTransactionsBlock {
  date_group: string;
  transactions: RmGroupedTransactionItem[];
}

export interface RmTransactionsResponseData {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  showing_text: string;
  grouped_transactions: RmGroupedTransactionsBlock[];
}

export interface RmPayoutAccountData {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_number_masked: string;
  account_name: string;
  status: string;
  is_verified: boolean;
  is_default: boolean;
}

export interface RmPayoutItem {
  id: number;
  reference: string;
  date_label: string;
  amount: number;
  amount_formatted: string;
  status: string;
  status_badge: string;
  bank_name: string;
  account_number_masked: string;
  created_at: string;
}

export interface RmStatementData {
  period: string;
  start_date: string;
  end_date: string;
  opening_balance: number;
  closing_balance: number;
  total_credits: number;
  total_debits: number;
  total_transactions: number;
  transactions: Array<{
    id: string;
    reference: string;
    title: string;
    subtitle: string;
    category: string;
    flow: "credit" | "debit";
    amount: number;
    status: string;
    time: string;
    created_at: string;
  }>;
}

// ==========================================
// RM SIM INVENTORY TYPES
// ==========================================
