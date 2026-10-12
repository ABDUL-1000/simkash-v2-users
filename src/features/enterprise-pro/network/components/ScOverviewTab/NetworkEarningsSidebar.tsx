import React from "react";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { colors } from "@/constants/colors";
import type { StateCoordinatorNetwork } from "../../types";
import { useGetEnterpriseEarningsSummary, useGetEnterpriseTopScs } from '../../api/queries';
import { AppEmptyState } from '@/components/common/AppEmptyState';
import { EpQueryState } from '../../../components/EpQueryState';

interface NetworkEarningsSidebarProps {
  coordinators: StateCoordinatorNetwork[];
  onSelectSc: (sc: StateCoordinatorNetwork) => void;
}

export const NetworkEarningsSidebar: React.FC<NetworkEarningsSidebarProps> = ({
  coordinators,
  onSelectSc,
}) => {
  const earnings = useGetEnterpriseEarningsSummary();
  const topScs = useGetEnterpriseTopScs();
  const topEarners = topScs.data ?? [];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-5"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-gray-900 text-sm">Network Earnings</h4>
          <p className="text-xs text-gray-500">Commission breakdown & top earners</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>

      {/* Main Stats Card */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-[#1F3A5F] text-white space-y-3">
        <span className="text-xs text-slate-300 font-medium">Total Network Commission</span>
        <EpQueryState pending={earnings.isPending} error={earnings.error} retry={earnings.refetch}/>
        <div className="text-2xl font-bold">{earnings.data?.total_commission_formatted ?? '—'}</div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>{earnings.data?.growth_label}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
          <div>
            <div className="text-slate-400 text-[11px]">Pending Payout</div>
            <div className="font-semibold text-amber-300">{earnings.data?.pending_payout_formatted ?? '—'}</div>
            <div className="text-slate-400 text-[11px]">{earnings.data?.pending_payout_subtext}</div>
          </div>
          <div>
            <div className="text-slate-400 text-[11px]">Last Payout</div>
            <div className="font-semibold text-white">{earnings.data?.last_payout_formatted ?? '—'}</div>
            <div className="text-slate-400 text-[11px]">{earnings.data?.last_payout_subtext}</div>
          </div>
        </div>
      </div>

      {/* Top 5 Earners */}
      <div className="space-y-3">
        <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Top 5 State Coordinators</h5>
        <div className="space-y-2.5">
          {!topScs.isSuccess ? <EpQueryState pending={topScs.isPending} error={topScs.error} retry={topScs.refetch}/> : topEarners.length === 0 ? <AppEmptyState title="No ranked State Coordinators"/> : null}
          {topEarners.map((sc) => (
            <button
              key={sc.rank}
              type="button"
              onClick={() => { const coordinator = coordinators.find(item => item.name === sc.name); if (coordinator) onSelectSc(coordinator); }}
              disabled={!coordinators.some(item => item.name === sc.name)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-left group"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-[11px] font-bold text-gray-600 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-700">
                  {sc.rank}
                </span>
                <div>
                  <div className="text-xs font-semibold text-gray-900 group-hover:text-blue-600">
                    {sc.name}
                  </div>
                  <div className="text-[10px] text-gray-400">{coordinators.find(item => item.name === sc.name)?.state ?? '—'}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-600">
                  {sc.activations_formatted}
                </div>
                <div className="text-[10px] text-gray-400">Activations</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
