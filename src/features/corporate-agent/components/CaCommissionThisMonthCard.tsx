import type { CaDashboardOverviewData } from "../types/api";
import { ArrowUpRight, Wallet } from "lucide-react";
import { APP_COLORS, CA_DASHBOARD_COLORS } from "@/constants/colors";

interface CaCommissionThisMonthCardProps {
  data: CaDashboardOverviewData;
  onRequestPayout?: () => void;
}

const naira = (value = 0) => `₦${value.toLocaleString()}`;

/** "Profit This Month" — top_cards.my_profit + profit_this_month. */
export function CaCommissionThisMonthCard({
  data,
  onRequestPayout,
}: CaCommissionThisMonthCardProps) {
  const profit = data.top_cards?.my_profit;
  // Every nested field is optional: the live response may omit parts of profit_this_month.
  const month = data.profit_this_month;
  const mine = month?.my_activations;
  const network = month?.ap_network;
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
            <h3 className="text-sm font-bold text-slate-900">Profit This Month</h3>
            <p className="text-[11px] text-slate-500">{profit?.period_text ?? "This month"}</p>
          </div>
        </div>
      </div>

      {/* TOTAL AMOUNT DISPLAY */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold text-slate-500">Total Profit</span>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            {month?.total_profit_this_month != null ? naira(month.total_profit_this_month) : profit?.amount_formatted ?? "—"}
          </span>
        </div>
        {month?.total_partner_commission_this_month != null && <div className="flex items-baseline justify-between text-[11px]">
          <span className="text-slate-500">Partner commission paid</span>
          <span className="font-bold text-slate-700">{naira(month.total_partner_commission_this_month)}</span>
        </div>}
      </div>

      {/* DETAILED STATS */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-lg border border-slate-100 bg-white">
          <div className="text-[11px] text-slate-500 font-medium">Direct Acts</div>
          <div className="text-sm font-black text-slate-900 mt-0.5">
            {mine ? naira(mine.total) : data.secondary_cards?.my_own_acts?.subtext ?? "—"}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {(mine?.count ?? data.top_cards?.this_month?.own_activations ?? 0).toLocaleString()} activations{mine?.rate ? ` · ${naira(mine.rate)} each` : ""}
          </div>
        </div>

        <div className="p-2.5 rounded-lg border border-slate-100 bg-white">
          <div className="text-[11px] text-slate-500 font-medium">AP Network</div>
          <div className="text-sm font-black text-slate-900 mt-0.5">
            {network ? naira(network.total) : data.secondary_cards?.ap_network_acts?.subtext ?? "—"}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {(network?.count ?? data.top_cards?.this_month?.ap_network_activations ?? 0).toLocaleString()} activations{network?.partner_commission_total != null ? ` · ${naira(network.partner_commission_total)} to APs` : ""}
          </div>
        </div>
      </div>

      {/* PAYOUT CTA BUTTON */}
      <div className="pt-1 space-y-2">
        <button
          type="button"
          onClick={onRequestPayout}
          disabled={!profit?.can_request_payout || (profit?.amount ?? 0) <= 0}
          className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.99] hover:opacity-95 disabled:opacity-50"
          style={{
            background: CA_DASHBOARD_COLORS.commissionGradient,
          }}
        >
          <span>Request Payout</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
