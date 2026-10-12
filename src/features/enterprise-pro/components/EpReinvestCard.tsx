import type { EnterpriseOverviewData } from "../types/dashboard";
import { formatNaira } from "../utils/formatters";
import { colors } from "@/constants/colors";
import { Package, Landmark, ArrowRight } from "lucide-react";

interface EpReinvestCardProps {
  overview: EnterpriseOverviewData;
  onOrderMore: () => void;
  onPayDown: () => void;
}

export function EpReinvestCard({ onOrderMore, onPayDown, overview }: EpReinvestCardProps) {
  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <p className="font-bold text-slate-900 text-sm">Reinvest Your Earnings</p>

      <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-3">
        <p className="text-xl font-black text-emerald-600">{overview.top_cards.wallet_balance.amount_formatted}</p>
        <p className="text-[11px] text-emerald-700/80 font-medium">Available to reinvest</p>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between rounded-xl border p-2.5 border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Package className="size-4 text-slate-700" />
            <div>
              <p className="font-bold text-slate-900">Order More</p>
              <p className="text-[10px] text-slate-400">Use earnings for SIM stock</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOrderMore}
            className="flex items-center gap-0.5 font-bold text-blue-600 hover:text-blue-700 text-xs"
          >
            Order Now <ArrowRight className="size-3" />
          </button>
        </div>

        <div className="flex items-center justify-between rounded-xl border p-2.5 border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <Landmark className="size-4 text-amber-600" />
            <div>
              <p className="font-bold text-slate-900">Pay Down Balance</p>
              <p className="text-[10px] text-slate-400">Reduce {formatNaira(overview.balance_card.remaining_balance)} debt</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onPayDown}
            className="flex items-center gap-0.5 font-bold text-amber-600 hover:text-amber-700 text-xs"
          >
            Pay Now <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
