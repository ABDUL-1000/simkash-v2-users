import type { CaDashboardOverviewData } from "../types/api";
import { ArrowUpRight, Wallet } from "lucide-react";
import { APP_COLORS, CA_DASHBOARD_COLORS } from "@/constants/colors";

interface CaCommissionThisMonthCardProps {
  data: CaDashboardOverviewData;
  onRequestPayout?: () => void;
}

export function CaCommissionThisMonthCard({
  data,
  onRequestPayout,
}: CaCommissionThisMonthCardProps) {
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-4 bg-white"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: APP_COLORS.greens.light }}
          >
            <Wallet className="w-4 h-4" style={{ color: APP_COLORS.greens.secondary }} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Commission This Month</h3>
            <p className="text-[11px] text-slate-500">{data.top_cards.my_commission.period_text}</p>
          </div>
        </div>

        {/* Monthly percentage change is commented out: not supplied by the overview. */}
      </div>

      {/* TOTAL AMOUNT DISPLAY */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold text-slate-500">Total Earned</span>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            {data.top_cards.my_commission.amount_formatted}
          </span>
        </div>

        {/* Commission percentage bar is commented out: monthly numeric splits are not supplied. */}
      </div>

      {/* DETAILED STATS */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-lg border border-slate-100 bg-white">
          <div className="text-[11px] text-slate-500 font-medium">Direct Acts</div>
          <div className="text-sm font-black text-slate-900 mt-0.5">
            {data.secondary_cards.my_own_acts.subtext}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{data.top_cards.this_month.own_activations.toLocaleString()} activations</div>
        </div>

        <div className="p-2.5 rounded-lg border border-slate-100 bg-white">
          <div className="text-[11px] text-slate-500 font-medium">AP Network</div>
          <div className="text-sm font-black text-slate-900 mt-0.5">
            {data.secondary_cards.ap_network_acts.subtext}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">{data.top_cards.this_month.ap_network_activations.toLocaleString()} activations</div>
        </div>
      </div>

      {/* PAYOUT STATUS & CTA BUTTON */}
      <div className="pt-1 space-y-2">
        <button
          type="button"
          onClick={onRequestPayout}
          disabled={!data.top_cards.my_commission.can_request_payout || data.top_cards.my_commission.amount <= 0}
          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] hover:opacity-95"
          style={{
            background: CA_DASHBOARD_COLORS.commissionGradient,
          }}
        >
          <span>Request Payout</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        {/* Automated payout schedule is commented out: not returned by this API. */}
      </div>
    </div>
  );
}
