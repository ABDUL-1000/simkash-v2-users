import React from "react";
import { AlertCircle, ArrowRight, Clock, Coins, CheckCircle2 } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import type { EnterpriseSimInventoryOverviewData } from "../types/simInventory";

type Overview = EnterpriseSimInventoryOverviewData;

/** scs_need_distribution from the inventory overview. */
export const ScsNeedingStockCard: React.FC<{ data: Overview["scs_need_distribution"]; onDistribute: (coordinatorId: number) => void }> = ({ data, onDistribute }) => (
  <div className="p-5 bg-white rounded-xl border space-y-3.5" style={{ borderColor: colors.border }}>
    <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.border }}>
      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
        <AlertCircle className="w-4 h-4 text-red-500" />
        <span>{data.title}</span>
      </h4>
      <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">{data.items.length} Required</span>
    </div>
    <div className="space-y-3">
      {data.items.length === 0 ? <AppEmptyState title="No SCs need stock" /> : data.items.map((item) => {
        const critical = /critical/i.test(item.level);
        return (
          <div key={item.coordinator_id} className={critical ? "p-3.5 rounded-xl border border-red-200 bg-red-50/50 space-y-2" : "p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2"}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${critical ? "text-red-700 bg-red-100" : "text-amber-700 bg-amber-100"}`}>{item.status}</span>
                <h5 className="font-bold text-xs text-slate-900 mt-1">{item.name}</h5>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">{item.state}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] text-slate-600">{item.subtitle}</p>
              <button type="button" onClick={() => onDistribute(item.coordinator_id)} className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white rounded-lg shadow-xs transition-colors ${critical ? "bg-red-600 hover:bg-red-700" : "bg-amber-500 hover:bg-amber-600"}`}>
                <span>{item.action}</span><ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

/** estimated_days_remaining from the inventory overview. */
export const EstimatedDaysCard: React.FC<{ data: Overview["estimated_days_remaining"] }> = ({ data }) => (
  <div className="p-5 bg-white rounded-xl border space-y-3.5" style={{ borderColor: colors.border }}>
    <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.border }}>
      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-blue-600" />
        <span>Estimated Days Remaining</span>
      </h4>
    </div>
    <p className="text-[11px] text-slate-500 font-medium">{data.subtitle}</p>
    <div className="divide-y divide-slate-100">
      {(data.estimates ?? []).length === 0 && <AppEmptyState title="No stock estimates" />}
      {(data.estimates ?? []).map((item) => (
        <div key={item.type} className="flex items-center justify-between py-2 text-xs">
          <span className="font-medium text-slate-700">{item.type}</span>
          <span className={`px-2 py-0.5 rounded font-bold ${item.is_alert ? "bg-red-100 text-red-700" : "text-slate-900"}`}>{item.days_text}</span>
        </div>
      ))}
    </div>
  </div>
);

/** inventory_health from the inventory overview. */
export const InventoryHealthCard: React.FC<{ data: Overview["inventory_health"] }> = ({ data }) => (
  <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl border shadow-sm space-y-4" style={{ borderColor: colors.border }}>
    <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
          <Coins className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-slate-300">Inventory Health</h4>
          <span className="text-sm font-bold text-white">{data.total_sims_text}</span>
        </div>
      </div>
      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" />
        {data.overall_health}
      </span>
    </div>
    <div className="space-y-1.5 text-[11px] text-slate-300">
      {(data.breakdown ?? []).length === 0 ? <AppEmptyState title="No health breakdown" /> : data.breakdown.map((item) => (
        <div key={item.type} className="flex items-center justify-between">
          <span>{item.type} ({item.count?.toLocaleString() ?? "—"})</span>
          <span className="font-semibold text-white">{item.status}</span>
        </div>
      ))}
    </div>
  </div>
);
