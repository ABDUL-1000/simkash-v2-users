import { useGetEnterpriseStockAlerts } from '../api';
import { AppEmptyState } from '@/components/common/AppEmptyState';
import { EpQueryState } from '../../components/EpQueryState';
import React from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { colors } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";
interface InventoryStockAlertsSidebarProps {
    onOpenLowStockModal: () => void;
}
export const InventoryStockAlertsSidebar: React.FC<InventoryStockAlertsSidebarProps> = ({ onOpenLowStockModal, }) => {
    const navigate = useNavigate();
    const query = useGetEnterpriseStockAlerts();
    return (<div className="p-5 bg-white rounded-xl border space-y-3.5" style={{ borderColor: colors.border }}>
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.border }}>
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-red-500"/>
          <span>Active Stock Alerts</span>
        </h4>
        <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
          {query.data?.count ?? "—"} Required Actions
        </span>
      </div>

      <div className="space-y-3">
        {!query.isSuccess ? <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch}/> : query.data.items.length === 0 ? <AppEmptyState title="No stock alerts"/> : query.data.items.map(item => (<div key={item.id} className={item.badge_color === 'red' ? "p-3.5 rounded-xl border border-red-200 bg-red-50/50 space-y-2.5" : "p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2.5"}>
          <div className="flex items-start justify-between gap-2"><div><span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-1.5 py-0.5 rounded">{item.badge}</span><h5 className="font-bold text-xs text-slate-900 mt-1">{item.title}</h5></div><span className="text-xs font-bold text-red-600">{item.percentage}%</span></div>
          <p className="text-[11px] text-slate-600 leading-snug">{item.detail}</p>
          <div className="flex items-center gap-2 pt-1"><button type="button" onClick={onOpenLowStockModal} className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 underline">Details</button><button type="button" onClick={() => navigate(appPaths.enterpriseProOrderMoreSims + '?type=' + item.sim_type)} className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs transition-colors"><span>{item.action_label}</span><ArrowRight className="w-3 h-3"/></button></div>
        </div>))}
      </div>
    </div>);
};
