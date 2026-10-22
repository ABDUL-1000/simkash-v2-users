export interface PayLaterCreditScore { score: number; rating: string; rating_color: string }

export interface PayLaterOnboarding {
  is_first_time: boolean;
  has_credit_limit: boolean;
  credit_limit: number;
  credit_limit_formatted: string;
  status_label: string;
  message: string;
  cta_button_text: string;
}

export interface PayLaterScheduleItem {
  id: number;
  service: string;
  date: string;
  date_formatted?: string;
  amount: number;
  amount_formatted: string;
  due_date: string;
  due_date_formatted?: string;
  status: string;
  status_label: string;
  status_color: string;
  penalty?: number;
  total_repaid?: number;
  total_outstanding?: number;
  total_outstanding_formatted?: string;
}

export interface PayLaterDashboard {
  is_first_time: boolean;
  has_credit_limit: boolean;
  onboarding: PayLaterOnboarding;
  outstanding_card: {
    total_outstanding: number;
    total_outstanding_formatted: string;
    next_due_date: string | null;
    next_due_date_label: string | null;
    repayment_progress: {
      total_used_cycle: number;
      total_used_cycle_formatted: string;
      total_repaid_cycle: number;
      total_repaid_cycle_formatted: string;
      progress_text: string;
      progress_percentage: number;
    };
    actions: { repay_all_amount: number; repay_all_label: string; can_repay: boolean };
  };
  repayment_schedule: { total_outstanding: number; total_outstanding_formatted: string; items: PayLaterScheduleItem[] };
  credit_history: {
    total_credit_used_all_time: number;
    total_credit_used_all_time_formatted: string;
    total_repaid_all_time: number;
    total_repaid_all_time_formatted: string;
    on_time_repayments: { on_time_count: number; total_completed_count: number; ratio_text: string };
    credit_score: PayLaterCreditScore;
  };
}

export interface PayLaterSchedule { items: PayLaterScheduleItem[]; total_outstanding: number; total_outstanding_formatted: string; total_count: number }

export interface PayLaterAccount {
  credit_account_id: number;
  credit_limit: number;
  used_credit: number;
  available_credit: number;
  credit_limit_formatted: string;
  used_credit_formatted: string;
  available_credit_formatted: string;
  status: string;
  has_overdue: boolean;
  overdue_amount?: number;
  overdue_count?: number;
  pending_bills_count?: number;
  eligible_for_paylater: boolean;
  is_first_time: boolean;
  has_credit_limit: boolean;
  createdAt?: string;
}

/** POST /apply, GET|POST /check-eligibility. */
export interface PayLaterEligibilityResult {
  eligible: boolean;
  credit_limit: number;
  credit_limit_formatted: string;
  message: string;
  account?: PayLaterAccount;
}

export type PayLaterTransactionStatus = "all" | "pending" | "paid" | "overdue" | "defaulted";

export interface PayLaterTransaction extends PayLaterScheduleItem { bill_type: string; bill_reference: string }

export interface PayLaterTransactionDetail extends PayLaterTransaction {
  due_date_raw?: string;
  days_until_due?: number;
  is_overdue?: boolean;
  repayments: Array<{ id: number; amount: number; amount_formatted: string; method: string; createdAt: string; createdAt_formatted: string }>;
  credit_account?: { credit_limit: number; used_credit: number; available_credit: number; status: string };
}

export interface PayLaterTransactionsData {
  items: PayLaterTransaction[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}

export interface PayLaterRepayPayload { creditTransactionId?: number; amount: number; method: "wallet"; pin: string; paymentReference?: string }
export interface PayLaterRepayResult {
  repaid_amount: number;
  repaid_amount_formatted: string;
  method: string;
  new_used_credit: number;
  new_used_credit_formatted: string;
  available_credit: number;
  available_credit_formatted: string;
}

/** Passed to a bill modal to charge the purchase to PayLater credit instead of the wallet. */
export interface PayLaterMode { availableCredit: number; tenureDays: number }

export type PayLaterPurchaseKind ="airtime" | "data" | "electricity" | "cable" | "waec" | "jamb";
export interface PayLaterPurchaseResult {
  message: string;
  credit_transaction_id: number;
  bill_reference: string;
  amount: number;
  amount_formatted: string;
  due_date: string;
  due_date_formatted: string;
  tenure_days: number;
  available_credit_remaining: number;
  available_credit_remaining_formatted: string;
  provider_response?: { code?: string; response_description?: string; token?: string; units?: string; pin?: string; serial?: string; smartcard?: string; transactionId?: string };
}
