import type { EnterpriseOverviewData } from "../types/dashboard";
import { formatNaira } from "../utils/formatters";
import { colors } from "@/constants/colors";

interface EpBalancePayoffCardProps {
  balance: EnterpriseOverviewData["balance_card"];
  onPayDown: () => void;
}

export function EpBalancePayoffCard({ onPayDown, balance }: EpBalancePayoffCardProps) {
  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <p className="font-bold text-slate-900 text-sm">{balance.percentage_remaining}% Balance Remaining</p>

      {/* Gold Card */}
      <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-3.5 space-y-2">
        <div>
          <p className="text-2xl font-black text-amber-700">{formatNaira(balance.remaining_balance)}</p>
          <p className="text-[11px] text-amber-800/80 font-medium">of {formatNaira(balance.initial_principal)} initial investment</p>
        </div>

        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
          <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, Math.max(0, balance.percentage_paid))}%` }} />
          <div className="h-full bg-amber-500" style={{ width: `${Math.min(100, Math.max(0, balance.percentage_remaining))}%` }} />
        </div>

        <div className="flex justify-between text-[10px] font-semibold">
          <span className="text-emerald-700">Paid: {formatNaira(balance.paid_amount)}</span>
          <span className="text-amber-800">Remaining: {formatNaira(balance.remaining_balance)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-semibold px-1">
        <button
          type="button"
          onClick={onPayDown}
          className="text-blue-600 hover:text-blue-700"
        >
          Pay with wallet earnings
        </button>
        <button
          type="button"
          onClick={onPayDown}
          className="text-slate-400 hover:text-slate-600"
        >
          Set up auto-pay
        </button>
      </div>

      <button
        type="button"
        onClick={onPayDown}
        className="w-full rounded-xl py-2.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 transition shadow-xs"
      >
        Pay Down Balance
      </button>
    </div>
  );
}
