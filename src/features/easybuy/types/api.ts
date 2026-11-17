import type { MarketplacePagination } from "@/features/marketplace/types/api";

export type EasyBuyFrequency = "weekly" | "biweekly" | "monthly" | string;
export type EasyBuySegment = "personal" | "company" | string;

export type EasyBuyStatus =
  | "pending_approval" | "approved" | "rejected" | "expired"
  | "active" | "overdue" | "completed" | "defaulted" | "cancelled";

export type InstallmentStatus = "pending" | "partially_paid" | "paid" | "overdue" | "waived";

/** A plan offered on the product page (amounts are per unit). */
export interface EasyBuyPlan {
  id: number; name: string; frequency: EasyBuyFrequency; frequencyLabel: string;
  installmentCount: number; duration: string;
  totalPrice: number; downPaymentPercent: number; downPaymentAmount: number;
  installmentAmount: number; lastInstallmentAmount: number; extraCost: number;
}

/** `GET /marketplace/products/:id` → `data.paymentOptions.easyBuy` */
export interface ProductEasyBuyOption {
  eligible: boolean; segments: EasyBuySegment[]; note: string | null;
  approvalRequired?: boolean; plans?: EasyBuyPlan[];
}

export interface EasyBuyApplyPayload {
  productId: number; planId: number; quantity?: number; segment?: EasyBuySegment;
  addressId?: number; deliveryMethod?: "standard" | "express"; note?: string;
}

export interface EasyBuyInstallment {
  id: number; sequence: number; dueDate: string; amount: number;
  amountPaid: number; remaining: number; status: InstallmentStatus; paidAt: string | null;
}

export interface EasyBuyPayment {
  id?: number; kind: "down_payment" | "installment" | string; amount: number;
  method: "wallet" | "card" | "auto_debit" | string; paidAt: string; reference?: string;
}

export interface EasyBuyActions { canPayDownPayment: boolean; canCancel: boolean; canPayInstallment: boolean; }

export interface EasyBuyAmounts {
  total: number; downPayment: number; deliveryFee: number; dueNow: number;
  installmentAmount: number; paid: number; outstanding: number; progressPercent: number;
}

export interface EasyBuyRepayment {
  dueNow: number; overdueAmount: number; overdueCount: number;
  nextInstallment: { sequence: number; dueDate: string; remaining: number } | null;
  suggestedAmount: number; payoffAmount: number; remainingInstallments: number;
}

export interface EasyBuyAgreement {
  id: number; reference: string; status: EasyBuyStatus; statusLabel: string;
  product: { id: number; name: string; image: string | null };
  plan: { name: string; frequency: EasyBuyFrequency; installmentCount: number; duration: string };
  quantity?: number;
  amounts: EasyBuyAmounts;
  nextDueDate: string | null;
  approvalExpiresAt: string | null;
  rejectionReason: string | null;
  order: { id: number; orderNumber: string; status: string } | null;
  schedule?: EasyBuyInstallment[];
  payments?: EasyBuyPayment[];
  repayment?: EasyBuyRepayment | null;
  actions: EasyBuyActions;
  createdAt?: string;
}

export interface EasyBuyListQuery { status?: EasyBuyStatus | ""; page: number; limit: number; }
export interface EasyBuyListData { agreements: EasyBuyAgreement[]; pagination: MarketplacePagination; }

export type EasyBuyPayMethod = "wallet" | "card";
export interface EasyBuyPayPayload {
  method: EasyBuyPayMethod; pin?: string; returnUrl?: string; amount?: number; payoff?: boolean;
}
/** Down payment / installment responses: the updated agreement, plus a cashier URL for card payments. */
export type EasyBuyPayResult = Partial<EasyBuyAgreement> & { agreement?: EasyBuyAgreement; payment?: { cashierUrl?: string } | null };
