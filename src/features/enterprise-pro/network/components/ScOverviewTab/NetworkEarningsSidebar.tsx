import React from "react";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { colors } from "@/constants/colors";
import { AppEmptyState } from '@/components/common/AppEmptyState';
import type { EnterpriseScOverviewData } from "../../types/api";

interface NetworkEarningsSidebarProps {
  summary?: EnterpriseScOverviewData["network_summary"];
  alerts?: EnterpriseScOverviewData["stock_alerts"];
  onDistribute: (coordinatorId?: number) => void;
}

/** network_summary and stock_alerts from GET /my-state-coordinator/overview. */
export const NetworkEarningsSidebar: React.FC<NetworkEarningsSidebarProps> = ({ summary, alerts, onDistribute }) => {
  const items = alerts?.alerts ?? [];
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-5"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Network Summary</h4>
          <p className="text-xs text-gray-500">Coordinators, partners & stock alerts</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>

      {/* Main Stats Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-[#1F3A5F] text-white space-y-3">
        <span className="text-xs text-slate-300 font-medium">Network Activations</span>
        <div className="text-2xl font-bold">{(summary?.network_acts_this_month ?? 0).toLocaleString()}</div>
        <div className="text-xs text-emerald-400 font-medium">{summary?.network_acts_text}</div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
          <div>
            <div className="text-slate-400 text-[11px]">State Coordinators</div>
            <div className="font-semibold text-white">{summary?.total_scs ?? "—"}</div>
            <div className="text-slate-400 text-[11px]">{summary?.active ?? 0} active · {summary?.at_risk ?? 0} at risk</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Agency Partners</div>
            <div className="font-semibold text-amber-300">{summary?.total_aps ?? "—"}</div>
            <div className="text-slate-400 text-[11px]">{summary?.suspended ?? 0} SCs suspended</div>
          </div>
        </div>
      </div>

      {/* Stock Alerts */}
      <div className="space-y-3">
        <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">{alerts?.title ?? "Stock Alerts"}</h5>
        <div className="space-y-2.5">
          {items.length === 0 && <AppEmptyState title="No stock alerts" />}
          {items.map((alert) => (
            <div key={alert.coordinator_id} className={`flex items-center justify-between gap-2 p-2.5 rounded-xl border ${/critical/i.test(alert.level) ? "border-red-200 bg-red-50/40" : "border-amber-200 bg-amber-50/40"}`}>
              <div className="flex min-w-0 items-center gap-2">
                <AlertTriangle className={`w-4 h-4 shrink-0 ${/critical/i.test(alert.level) ? "text-red-600" : "text-amber-600"}`} />
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold text-gray-900">{alert.name}</div>
                  <div className="text-[10px] text-gray-500">{alert.state} · {alert.stock_text}</div>
                </div>
              </div>
              <button type="button" onClick={() => onDistribute(alert.coordinator_id)} className="shrink-0 text-[11px] font-bold text-blue-600 hover:underline">{alert.action_text}</button>
            </div>
          ))}
          {alerts?.can_distribute_all_low && items.length > 0 && (
            <button type="button" onClick={() => onDistribute()} className="w-full rounded-xl border border-amber-300 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50 transition">{alerts.distribute_all_button_text}</button>
          )}
        </div>
      </div>
    </div>
  );
};
