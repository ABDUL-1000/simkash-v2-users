import { useGetEnterpriseSimInventoryOverview } from '../api';
import { EpQueryState } from '../../components/EpQueryState';
import React from "react";
import { Package, Send, Download, Clock, AlertTriangle } from "lucide-react";
import { colors } from "@/constants/colors";
interface SimStockMetricCardsProps {
    onViewStock?: () => void;
    onViewDistribute?: () => void;
    onViewHistory?: () => void;
    onViewRequests?: () => void;
}
export const SimStockMetricCards: React.FC<SimStockMetricCardsProps> = ({ onViewStock, onViewDistribute, onViewHistory, onViewRequests }) => {
    const query = useGetEnterpriseSimInventoryOverview();
    const summary = query.data?.summary_cards;
    if (!summary)
        return <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch}/>;
    const cards = [
        { card: summary.total_available, badge: "In Stock", badgeColor: "bg-blue-50 text-blue-700 border-blue-200", icon: Package, iconBg: "bg-blue-100 text-blue-600", onClick: onViewStock },
        { card: summary.distributed, badge: "With SCs", badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: Send, iconBg: "bg-emerald-100 text-emerald-600", onClick: onViewDistribute },
        { card: summary.received, badge: "All Time", badgeColor: "bg-slate-50 text-slate-700 border-slate-200", icon: Download, iconBg: "bg-slate-100 text-slate-600", onClick: onViewHistory },
        { card: summary.pending_requests, badge: "Requests", badgeColor: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock, iconBg: "bg-amber-100 text-amber-600", onClick: onViewRequests },
        { card: summary.scs_low_on_stock, badge: "Attention", badgeColor: "bg-red-50 text-red-700 border-red-200", icon: AlertTriangle, iconBg: "bg-red-100 text-red-600", onClick: onViewDistribute },
    ];
    return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.filter((item) => item.card).map(({ card, badge, badgeColor, icon: Icon, iconBg, onClick }) => (<div key={card.label} onClick={onClick} className="p-4 bg-white rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between" style={{ borderColor: colors.border }}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-medium text-slate-500 truncate">
                {card.label}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
                <Icon className="w-4 h-4"/>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold tracking-tight text-slate-900">
                {card.count?.toLocaleString() ?? "—"}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {card.subtext}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t flex items-center justify-between" style={{ borderColor: colors.border }}>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${badgeColor}`}>
                {badge}
              </span>
              <span className="text-[11px] text-blue-600 font-medium hover:underline">
                View &rarr;
              </span>
            </div>
          </div>))}
    </div>);
};
