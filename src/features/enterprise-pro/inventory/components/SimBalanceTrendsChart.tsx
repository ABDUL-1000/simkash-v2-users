import { useGetEnterpriseInventoryHistory } from '../api';
import { AppEmptyState } from '@/components/common/AppEmptyState';
import { EpQueryState } from '../../components/EpQueryState';
import React from "react";
export const SimBalanceTrendsChart: React.FC = () => {
    const query = useGetEnterpriseInventoryHistory();
    return (<div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-4">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">{query.data?.trends?.title ?? "SIM Balance Trends"}</h3>
          <p className="text-xs text-slate-400">Running inventory by SIM type</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1F3A5F]"/>
            <span className="text-slate-600">POS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"/>
            <span className="text-slate-600">CCTV</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"/>
            <span className="text-slate-600">GPS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"/>
            <span className="text-slate-600">Router</span>
          </div>
        </div>
      </div>

      {/* SVG Multi-Line Chart */}
      <div className="w-full h-44 relative">
        {!query.isSuccess ? <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch}/> : <AppEmptyState title="No balance trend series" description="Balance trend points are not available yet."/>}
      </div>

      {/* 4 Bottom Delta Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
        <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">POS SIM</span>
          <span className="font-extrabold text-xs text-rose-600">{query.data?.trends?.highlights.pos ?? "—"}</span>
        </div>
        <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CCTV SIM</span>
          <span className="font-extrabold text-xs text-amber-600">{query.data?.trends?.highlights.cctv ?? "—"}</span>
        </div>
        <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">GPS SIM</span>
          <span className="font-extrabold text-xs text-emerald-600">{query.data?.trends?.highlights.gps ?? "—"}</span>
        </div>
        <div className="p-3 bg-slate-50/70 rounded-xl space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Router SIM</span>
          <span className="font-extrabold text-xs text-purple-600">{query.data?.trends?.highlights.router ?? "—"}</span>
        </div>
      </div>
    </div>);
};
