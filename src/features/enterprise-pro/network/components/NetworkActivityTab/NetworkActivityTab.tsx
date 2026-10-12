import React from "react";
import { CheckCircle2 } from "lucide-react";
import { colors } from "@/constants/colors";
import { AppEmptyState } from '@/components/common/AppEmptyState';
import { EpQueryState } from '../../../components/EpQueryState';
import { useGetEnterpriseNetworkActivity } from '../../api/queries';

export const NetworkActivityTab: React.FC = () => {
  const query = useGetEnterpriseNetworkActivity();
  const activities = query.data?.activities ?? [];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div>
        <h3 className="font-bold text-gray-900 text-sm sm:text-base">Network Activations Activity</h3>
        <p className="text-xs text-gray-500">{query.data ? `${query.data.summary.total_activations_today} activations today · ${query.data.summary.commission_earned_today_formatted} commission earned today` : 'Real-time activations across your network'}</p>
      </div>

      <div className="space-y-3 pt-2">
        {!query.isSuccess ? <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch}/> : activities.length === 0 ? <AppEmptyState title="No Network Activity" description="New activations will appear here."/> : null}
        {activities.map((act) => {
          const Icon = CheckCircle2;
          return (
            <div
              key={act.id}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-slate-50 transition"
            >
              <div
                className={`w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5`}
              >
                <Icon className={`w-4 h-4 text-emerald-600`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{act.customer_name} · {act.customer_phone}</h4>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">{act.time_formatted}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed"><span className="text-xs text-blue-700 font-medium bg-blue-50/70 px-2 py-0.5 rounded">{act.sim_type}</span>{' '}{act.ap_name} · {act.sc_name} · {act.state}</p>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">Retail: ₦{act.retail_price.toLocaleString()} · Margin: ₦{act.margin_earned.toLocaleString()} · Commission: ₦{act.commission_earned.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
