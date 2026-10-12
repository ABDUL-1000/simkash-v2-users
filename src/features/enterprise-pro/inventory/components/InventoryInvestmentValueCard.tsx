import { useGetEnterpriseValuation } from '../api';
import { AppEmptyState } from '@/components/common/AppEmptyState';
import { EpQueryState } from '../../components/EpQueryState';
import React from "react";
import { TrendingUp, Coins, CheckCircle2 } from "lucide-react";
import { colors } from "@/constants/colors";
export const InventoryInvestmentValueCard: React.FC = () => {
    const query = useGetEnterpriseValuation();
    const data = query.data;
    if (!data)
        return <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch}/>;
    return (<div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl border shadow-sm space-y-4" style={{ borderColor: colors.border }}>
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Coins className="w-4 h-4"/>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-300">
              Inventory Asset Valuation
            </h4>
            <span className="text-sm font-bold text-white">{data.total_wholesale_formatted}</span>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
          <TrendingUp className="w-3 h-3"/>
          {data.total_wholesale > 0 ? (100 * data.potential_margin / data.total_wholesale).toFixed(1) : "0"}% potential margin
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
          <span className="text-slate-400 text-[11px] block">Projected Retail</span>
          <span className="font-bold text-white text-sm">{data.retail_value_formatted}</span>
        </div>
        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
          <span className="text-emerald-400 text-[11px] block">Projected Margin</span>
          <span className="font-bold text-emerald-300 text-sm">{data.potential_margin_formatted}</span>
        </div>
      </div>

      <div className="space-y-1.5 text-[11px] text-slate-300">
        {(data.items ?? []).length === 0 ? <AppEmptyState title="No valuation breakdown"/> : data.items?.map(item => <div key={item.sim_type} className="flex items-center justify-between"><span>{item.sim_type} Stock ({item.units.toLocaleString()} units)</span><span className="font-semibold text-white">{item.total_wholesale_formatted}</span></div>)}
      </div>

      <div className="pt-2 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] text-slate-400">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0"/>
        <span>Inventory valued at wholesale prices</span>
      </div>
    </div>);
};
