export interface CaDistributionResult {
  total_distributed: number; partners_replenished: number; sim_type: string;
  distributions: Array<{ partner_id: number; partner_name: string; sims_assigned: number; sim_numbers: string[] }>;
}
export interface CaPayoutResult {
  payout_id: number; amount: number; reference: string; status: string;
  bank_account: { bank_name: string; account_number: string; account_name: string };
}
export interface CaOnboardResult { partner_id: number; fullname: string; email: string; phone: string; initial_stock_assigned: number; message: string }
export interface CaStockResult { request_id: number; quantity: number; sim_type: string; status: string; requested_at: string; message: string }

