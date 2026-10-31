import React from "react";
import { TrendingUp, Send, Package, Clock } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { useGetEnterpriseSimInventoryOverview } from "../api";
import { InventoryHistoryTable } from "../components/InventoryHistoryTable";
export const InventoryHistoryPage: React.FC = () => {
    // Summary cards come from the inventory overview (the history list has no summary block).
    const summary = useGetEnterpriseSimInventoryOverview().data?.summary_cards;
    const value = (count?: number) => count?.toLocaleString() ?? "—";
    return (<div className="space-y-6 pb-16">
      {/* Header */}
      <PageHeader title="Inventory History" description="Complete record of SIM stock received and distributed"/>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4"/>
          </div>
          <span className="text-xs font-semibold text-slate-400 block">{summary?.received?.label ?? "Total Received"}</span>
          <div className="text-2xl font-extrabold text-slate-900">{value(summary?.received?.count)}</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Send className="w-4 h-4"/>
          </div>
          <span className="text-xs font-semibold text-slate-400 block">{summary?.distributed?.label ?? "Distributed"}</span>
          <div className="text-2xl font-extrabold text-slate-900">{value(summary?.distributed?.count)}</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Package className="w-4 h-4"/>
          </div>
          <span className="text-xs font-semibold text-slate-400 block">In Stock</span>
          <div className="text-2xl font-extrabold text-slate-900">{value(summary?.total_available.count)}</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Clock className="w-4 h-4"/>
          </div>
          <span className="text-xs font-semibold text-slate-400 block">{summary?.pending_requests.label ?? "Pending Request"}</span>
          <div className="text-2xl font-extrabold text-slate-900">{value(summary?.pending_requests.count)}</div>
        </div>
      </div>

      {/* SIM Transaction Log Table */}
      <InventoryHistoryTable />
    </div>);
};
