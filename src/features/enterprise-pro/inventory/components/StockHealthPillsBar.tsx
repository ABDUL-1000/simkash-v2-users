import { useGetEnterpriseSimInventoryOverview } from '../api';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '@/app/router/paths';
import { EpQueryState } from '../../components/EpQueryState';
import { AppEmptyState } from '@/components/common/AppEmptyState';
import React from "react";
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { colors } from "@/constants/colors";
import type { SimStockItem } from "../types";
interface StockHealthPillsBarProps {
    onTriggerLowStockModal: () => void;
}
export const StockHealthPillsBar: React.FC<StockHealthPillsBarProps> = ({ onTriggerLowStockModal, }) => {
    const query = useGetEnterpriseSimInventoryOverview();
    const navigate = useNavigate();
    const items = Object.values(query.data?.stock_health_cards ?? {});
    const getStatusBadge = (status: SimStockItem["status"]) => {
        switch (status) {
            case "critical":
                return {
                    label: "Critical",
                    bg: "bg-red-50 text-red-700 border-red-200",
                    icon: AlertCircle,
                    barColor: "bg-red-500",
                };
            case "low":
                return {
                    label: "Low Stock",
                    bg: "bg-amber-50 text-amber-700 border-amber-200",
                    icon: AlertTriangle,
                    barColor: "bg-amber-500",
                };
            case "healthy":
            default:
                return {
                    label: "Healthy",
                    bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    icon: CheckCircle2,
                    barColor: "bg-emerald-500",
                };
        }
    };
    return (<div className="p-4 bg-white rounded-xl border space-y-3" style={{ borderColor: colors.border }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            SIM Stock Health & Threshold Status
          </h3>
          <p className="text-xs text-slate-500">
            Automated monitoring against minimum safety buffer reserves
          </p>
        </div>
        <button onClick={onTriggerLowStockModal} type="button" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors w-fit">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600"/>
          <span>Review {items.filter(item => !/healthy/i.test(item.status)).length} Stock Alerts</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {!query.isSuccess ? <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch}/> : items.length === 0 ? <AppEmptyState title="No stock available"/> : null}
        {items.map((item) => {
            const badge = getStatusBadge(/green/i.test(item.status_color) ? "healthy" : /yellow/i.test(item.status_color) ? "low" : "critical");
            const percent = Math.max(0, Math.min(100, query.data?.current_stock_levels.find(level => level.sim_type === item.sim_type)?.progress_percentage ?? 0));
            const Icon = badge.icon;
            return (<div key={item.sim_type} className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-800 truncate">
                  {item.label}
                </span>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                  <Icon className="w-3 h-3"/>
                  {item.status}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    {item.in_stock_formatted}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {item.subtext}
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-300 ${badge.barColor}`} style={{ width: `${percent}%` }}/>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  {item.action_label ? <button type="button" onClick={() => navigate(`${appPaths.enterpriseProOrderMoreSims}?type=${item.sim_type}`)}>{item.action_label}</button> : <span>{item.status}</span>}
                  <span>{percent}%</span>
                </div>
              </div>
            </div>);
        })}
      </div>
    </div>);
};
