import type { EpDistributionResult, StockQuantities } from '../types/simInventory';
import { EP_SIM_LABELS, EP_SIM_TYPES } from '../types/adapters';
import { AppEmptyState } from '@/components/common/AppEmptyState';
import React from "react";
import { CheckCircle2, Check, CreditCard, Video, Navigation, Wifi } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
const ICONS = { pos: { icon: CreditCard, tone: "bg-blue-50 text-blue-600" }, cctv: { icon: Video, tone: "bg-emerald-50 text-emerald-600" }, gps: { icon: Navigation, tone: "bg-purple-50 text-purple-600" }, router: { icon: Wifi, tone: "bg-amber-50 text-orange-500" } };
export const DistributionCompletePage: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const receipt = state as { result: EpDistributionResult; before?: StockQuantities; initials?: string } | null;
    if (!receipt?.result)
        return <AppEmptyState title="No distribution receipt" description="Distribute stock to view its confirmation." actionText="Back to Inventory" onAction={() => navigate(appPaths.enterpriseProSimInventory)}/>;
    const { result, before, initials } = receipt;
    const total = result.total_distributed;
    const breakdown = EP_SIM_TYPES.filter((type) => result.summary?.[type]).map((type) => `${type.toUpperCase()}:${result.summary[type]}`).join(" · ");
    return (<div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Green Banner */}
      <div className="p-4 bg-emerald-50/90 border border-emerald-300 rounded-2xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <Check className="w-5 h-5 stroke-[2.5]"/>
        </div>
        <div>
          <div className="text-sm font-bold text-emerald-950">
            {result.message}
          </div>
          <div className="text-xs text-emerald-700">
            Distribution ID: {result.reference}
          </div>
        </div>
      </div>

      {/* Page Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Distribution Complete</h2>
          <p className="text-xs text-slate-500">{total.toLocaleString()} SIMs sent to {result.recipient.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navigate(appPaths.enterpriseProSimDistribute)} className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors">
            Distribute More SIMs
          </button>
          <button type="button" onClick={() => navigate(appPaths.enterpriseProInventoryHistory)} className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors">
            View History
          </button>
        </div>
      </div>

      {/* Card 1: DISTRIBUTION SUMMARY */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Distribution Summary
          </span>
        </div>

        <div className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-100 shrink-0">
              {initials ?? result.recipient.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900">{result.recipient.name}</div>
              <div className="text-[11px] text-slate-400">{[result.recipient.state, result.recipient.phone].filter(Boolean).join(" · ")}</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
              {breakdown}
            </span>
            <span className="font-bold text-xs text-slate-900 min-w-[70px] text-right">
              {total} SIMs
            </span>
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4"/>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: INVENTORY UPDATE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Inventory Update
          </span>
          <span className="text-[11px] text-slate-400">After distribution</span>
        </div>

        <div className="divide-y divide-slate-100">
          {EP_SIM_TYPES.map((type) => {
            const { icon: Icon, tone } = ICONS[type];
            const sent = result.summary?.[type] ?? 0;
            return (<div key={type} className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tone}`}>
                  <Icon className="w-4 h-4"/>
                </div>
                <span className="font-bold text-slate-900">{EP_SIM_LABELS[type]}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-400 font-mono">{before?.[type]?.toLocaleString() ?? "—"}</span>
                <span className="text-slate-300">&rarr;</span>
                <span className="font-bold text-slate-900 font-mono">{before ? (before[type] - sent).toLocaleString() : "—"}</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full min-w-[55px] text-center">
                  -{sent.toLocaleString()}
                </span>
              </div>
            </div>);
          })}
        </div>
      </div>
    </div>);
};
