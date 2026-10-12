import { useGetEnterpriseSimInventoryOverview } from '../api';
import { EpQueryState } from '../../components/EpQueryState';
import React from "react";
import { Package, CreditCard, Video, Navigation, Wifi } from "lucide-react";
import { colors } from "@/constants/colors";
interface SimStockMetricCardsProps {
    onSelectSimType?: (type: string) => void;
}
export const SimStockMetricCards: React.FC<SimStockMetricCardsProps> = ({ onSelectSimType, }) => {
    const query = useGetEnterpriseSimInventoryOverview();
    const summary = query.data?.summary_cards;
    if (!summary)
        return <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch}/>;
    const cards = [
        {
            type: "ALL",
            title: "Total SIM Stock",
            value: summary.total_in_stock_formatted,
            subtext: "Across all SIM types",
            badge: "Total Stock",
            badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
            icon: Package,
            iconBg: "bg-blue-100 text-blue-600",
        },
        {
            type: "POS",
            title: "POS SIMs",
            value: summary.pos_sims.count_formatted,
            subtext: summary.pos_sims.wholesale_formatted,
            badge: query.data?.stock_health_cards.pos.status ?? 'Stock',
            badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
            icon: CreditCard,
            iconBg: "bg-emerald-100 text-emerald-600",
        },
        {
            type: "CCTV",
            title: "CCTV SIMs",
            value: summary.cctv_sims.count_formatted,
            subtext: summary.cctv_sims.wholesale_formatted,
            badge: query.data?.stock_health_cards.cctv.status ?? 'Stock',
            badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
            icon: Video,
            iconBg: "bg-amber-100 text-amber-600",
        },
        {
            type: "GPS",
            title: "GPS SIMs",
            value: summary.gps_sims.count_formatted,
            subtext: summary.gps_sims.wholesale_formatted,
            badge: query.data?.stock_health_cards.gps.status ?? 'Stock',
            badgeColor: "bg-red-50 text-red-700 border-red-200",
            icon: Navigation,
            iconBg: "bg-red-100 text-red-600",
        },
        {
            type: "ROUTER",
            title: "Router SIMs",
            value: summary.router_sims.count_formatted,
            subtext: summary.router_sims.wholesale_formatted,
            badge: query.data?.stock_health_cards.router.status ?? 'Stock',
            badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
            icon: Wifi,
            iconBg: "bg-blue-100 text-blue-600",
        },
    ];
    return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
            const Icon = card.icon;
            return (<div key={card.title} onClick={() => onSelectSimType?.(card.type)} className="p-4 bg-white rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between" style={{ borderColor: colors.border }}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-medium text-slate-500 truncate">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                <Icon className="w-4 h-4"/>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold tracking-tight text-slate-900">
                {card.value}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {card.subtext}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t flex items-center justify-between" style={{ borderColor: colors.border }}>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
                {card.badge}
              </span>
              <span className="text-[11px] text-blue-600 font-medium hover:underline">
                View &rarr;
              </span>
            </div>
          </div>);
        })}
    </div>);
};
