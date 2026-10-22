import { useState } from "react";
import { usePayLaterPurchase } from "../api/usePayLater";
import type { PayLaterMode, PayLaterPurchaseKind, PayLaterPurchaseResult } from "../types/api";

/**
 * Lets a bill-payment modal charge PayLater credit instead of the wallet.
 * Inactive (wallet mode) when `mode` is undefined, so the modal behaves exactly as before.
 */
export function usePayLaterBillMode(kind: PayLaterPurchaseKind, mode?: PayLaterMode) {
  const purchase = usePayLaterPurchase(kind);
  const [result, setResult] = useState<PayLaterPurchaseResult | null>(null);
  const active = Boolean(mode);
  return {
    active,
    availableCredit: mode?.availableCredit ?? 0,
    isPending: purchase.isPending,
    result,
    /** "Wallet" or "PayLater credit" for "Pay from" rows. */
    source: active ? "PayLater credit" : "Wallet",
    balanceLabel: active ? "Available PayLater Credit" : "Wallet Balance",
    notDebitedText: active ? "No PayLater credit was used." : "Your wallet was not debited.",
    /** Footer under the success receipt. */
    successFooter: (walletText: string) => active && result ? `Due ${result.due_date_formatted} · Credit left ${result.available_credit_remaining_formatted}` : walletText,
    /** Extra receipt rows for a credit purchase. */
    successRows: active && result ? [{ label: "Repay by", value: result.due_date_formatted }, { label: "Credit remaining", value: result.available_credit_remaining_formatted }] : [],
    submit: (payload: Record<string, unknown>, handlers: { onSuccess: (result: PayLaterPurchaseResult) => void; onError: (message: string) => void }) =>
      purchase.mutate({ ...payload, tenure_days: mode?.tenureDays }, {
        onSuccess: data => { setResult(data); handlers.onSuccess(data); },
        onError: error => handlers.onError(error.message || "Purchase failed."),
      }),
  };
}
