import { formatNaira } from "../utils/formatters";
import { TrendingUp } from "lucide-react";

interface SimCostBreakdownProps {
  quantity: number;
  wholesaleCost: number;
  walletAfter: number;
  extraMargin: number;
  paymentSource?: "wallet" | "fresh";
  balanceAffected?: number;
}

export function SimCostBreakdown({
  quantity,
  wholesaleCost,
  walletAfter,
  extraMargin,
  paymentSource = "wallet",
  balanceAffected = 0,
}: SimCostBreakdownProps) {
  return (
    <div className="rounded-2xl border p-3 bg-slate-50 border-slate-200 space-y-1.5 text-xs">
      <p className="font-bold text-slate-800">Cost Breakdown</p>
      <div className="flex justify-between text-slate-600">
        <span>Quantity</span>
        <span className="font-semibold text-slate-900">{quantity} SIMs</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Wholesale cost</span>
        <span className="font-bold text-slate-900">{formatNaira(wholesaleCost)}</span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Payment source</span>
        <span className="font-semibold text-emerald-600">
          {paymentSource === "wallet" ? "Wallet Earnings" : "Fresh Capital"}
        </span>
      </div>
      <div className="flex justify-between text-slate-600">
        <span>Wallet after</span>
        <span className="font-bold text-emerald-700">{formatNaira(walletAfter)}</span>
      </div>
      {balanceAffected !== undefined && (
        <div className="flex justify-between text-slate-600">
          <span>Balance affected</span>
          <span className="font-semibold text-emerald-700">
            {balanceAffected === 0 ? "₦0 (no impact)" : formatNaira(balanceAffected)}
          </span>
        </div>
      )}
      <div className="mt-1 flex items-center gap-1.5 rounded-xl bg-emerald-100/70 p-2 text-emerald-900 font-bold text-[11px]">
        <TrendingUp className="size-3.5 text-emerald-700" />
        <span>+{formatNaira(extraMargin)}/month estimated extra margin</span>
      </div>
    </div>
  );
}
