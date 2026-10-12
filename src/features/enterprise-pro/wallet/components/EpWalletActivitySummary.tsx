import React from "react";
import { Activity, ArrowDownLeft, ArrowUpRight, Package, DollarSign, Wallet } from "lucide-react";
import { colors } from "@/constants/colors";
import { useGetEnterpriseWalletActivity } from "../api/useGetEnterpriseWalletActivity";
import { useGetEnterpriseWalletOverview } from "../api/useGetEnterpriseWalletOverview";
import { EpQueryState } from "../../components/EpQueryState";
import { AppEmptyState } from "@/components/common/AppEmptyState";

export const EpWalletActivitySummary: React.FC = () => {
  const query = useGetEnterpriseWalletActivity();
  const overview = useGetEnterpriseWalletOverview();
  const earningsInTotal = query.data?.total_inflows ?? 0;
  const payoutsOutTotal = overview.data?.middle_kpi_cards.total_paid_out.amount ?? 0;
  const simOrdersTotal = overview.data?.middle_kpi_cards.sim_orders_paid.amount ?? 0;
  const balancePayTotal = overview.data?.middle_kpi_cards.balance_paid_down.amount ?? 0;
  if (query.isPending || query.isError) return <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />;
  if (!query.data) return <AppEmptyState title="No Wallet Activity" />;
  const getPercentage = (amount: number) => {
    return earningsInTotal > 0 ? Math.min(100, Math.max(0, Math.round((amount / earningsInTotal) * 100))) : 0;
  };

  const activities = [
    {
      label: "Enterprise Inflow (Earnings)",
      amount: earningsInTotal,
      pct: earningsInTotal > 0 ? 100 : 0,
      color: "bg-emerald-500",
      textColor: "text-emerald-700",
      icon: <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />,
      subtext: "Margin + Commissions",
    },
    {
      label: "Direct Bank Payouts",
      amount: payoutsOutTotal,
      pct: getPercentage(payoutsOutTotal),
      color: "bg-blue-500",
      textColor: "text-blue-700",
      icon: <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />,
      subtext: "Processed withdrawals",
    },
    {
      label: "Reinvested into SIM Stock",
      amount: simOrdersTotal,
      pct: getPercentage(simOrdersTotal),
      color: "bg-purple-500",
      textColor: "text-purple-700",
      icon: <Package className="w-3.5 h-3.5 text-purple-600" />,
      subtext: "Wholesale restock",
    },
    {
      label: "Initial Balance Paid Down",
      amount: balancePayTotal,
      pct: getPercentage(balancePayTotal),
      color: "bg-amber-500",
      textColor: "text-amber-700",
      icon: <DollarSign className="w-3.5 h-3.5 text-amber-600" />,
      subtext: "Debt offset from wallet",
    },
  ];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-sm text-slate-900">{query.data.title}</h3>
          <p className="text-[11px] text-slate-500">Cumulative capital distribution</p>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {activities.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                {item.icon} {item.label}
              </span>
              <span className="font-bold text-slate-900">
                {item.label === "Enterprise Inflow (Earnings)" ? query.data.total_inflows_formatted : `₦${item.amount.toLocaleString()}`}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-500`}
                style={{ width: `${item.pct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>{item.subtext}</span>
              <span className="font-semibold">{item.pct}% of inflow</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xs" style={{ color: colors.textSecondary }}><span>Total Outflows</span><span>{query.data.total_outflows_formatted}</span></div>
      {/* Net Position Cardlet */}
      <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-800">Net Wallet Capital</span>
        </div>
        <span className="text-xs font-black text-emerald-700">
          {query.data.net_profit_formatted}
        </span>
      </div>
    </div>
  );
};
