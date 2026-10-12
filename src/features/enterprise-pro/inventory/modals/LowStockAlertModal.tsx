import { useGetEnterpriseStockAlerts } from '../api';
import { AppEmptyState } from '@/components/common/AppEmptyState';
import { EpQueryState } from '../../components/EpQueryState';
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppModal } from "@/components/common/AppModal";
import { appPaths } from "@/app/router/paths";
interface LowStockAlertModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export const LowStockAlertModal: React.FC<LowStockAlertModalProps> = ({ open, onOpenChange, }) => {
    const navigate = useNavigate();
    const query = useGetEnterpriseStockAlerts();
    const alert = query.data?.items[0];
    const handleOrder = () => {
        onOpenChange(false);
        navigate(`${appPaths.enterpriseProOrderMoreSims}?type=${alert?.sim_type ?? ""}`);
    };
    return (<AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Alert Header Banner */}
        <div className="p-4 bg-[#FFF5F5] rounded-2xl flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-rose-500 shrink-0"/>
          <div>
            <h3 className="text-base font-extrabold text-rose-600">Low Stock Alert</h3>
            <p className="text-xs text-slate-400">Automatic alert — below minimum threshold</p>
          </div>
        </div>

        {/* {alert?.title??"Stock Alerts"} Card */}
        <div className="p-4 bg-white rounded-2xl border-2 border-rose-500 space-y-2">
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
            {alert?.title ?? "Stock Alerts"}
          </span>
          <h4 className="text-sm font-extrabold text-slate-900">
            {alert?.detail ?? "No stock alerts"}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            {query.data?.subtext}
          </p>
          <div className="pt-1">
            <span className="text-xs font-extrabold text-[#1E3A5F] tracking-wide block">
              {alert?.action_label}
            </span>
          </div>
        </div>

        {/* Stock Alert Details Card */}
        <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            SC GPS Stock Status
          </span>
          <div className="space-y-2 divide-y divide-slate-100">
            {!query.isSuccess ? <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch}/> : query.data.items.length === 0 ? <AppEmptyState title="No stock alerts"/> : query.data.items.map(item => <div key={item.id} className="flex items-center justify-between text-xs"><span className="font-bold text-slate-800">{item.title}</span><span>{item.detail}</span></div>)}
          </div>
        </div>

        {/* Full-width Red CTA Button */}
        <button type="button" onClick={handleOrder} className="w-full py-3 px-4 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors text-center">
          {alert?.action_label ?? "Order SIMs"}
        </button>

        {/* Bottom Dual Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button type="button" onClick={() => onOpenChange(false)} className="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors">
            Remind Me Later
          </button>
          <button type="button" onClick={handleOrder} className="w-full py-2.5 px-4 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-xl shadow-xs transition-colors">
            Order Now
          </button>
        </div>
      </div>
    </AppModal>);
};
