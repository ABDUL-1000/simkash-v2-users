import type { CaDashboardOverviewData } from "../types/api";
import { Smartphone, Users, UserCheck, Coins, Package } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CaSecondaryKpiCardsProps {
  data: Partial<CaDashboardOverviewData["secondary_cards"]>;
  onViewOwnActs?: () => void;
  onViewNetworkActs?: () => void;
  onViewAps?: () => void;
  onViewProfit?: () => void;
  onViewStock?: () => void;
}

const display = (value: number | string) => (typeof value === "number" ? value.toLocaleString() : value);

export function CaSecondaryKpiCards({
  data,
  onViewOwnActs,
  onViewNetworkActs,
  onViewAps,
  onViewProfit,
  onViewStock,
}: CaSecondaryKpiCardsProps) {
  // Cards render only when the API returns them.
  const cards = [
    { key: "own", card: data.my_own_acts, icon: Smartphone, iconTone: "bg-blue-50 text-blue-600", valueTone: "text-slate-900", hover: "hover:border-blue-300", onClick: onViewOwnActs },
    { key: "network", card: data.ap_network_acts, icon: Users, iconTone: "bg-emerald-50 text-emerald-600", valueTone: "text-emerald-600", hover: "hover:border-emerald-300", onClick: onViewNetworkActs },
    { key: "aps", card: data.agency_partners, icon: UserCheck, iconTone: "bg-purple-50 text-purple-600", valueTone: "text-purple-600", hover: "hover:border-purple-300", onClick: onViewAps },
    { key: "profit", card: data.total_profit, icon: Coins, iconTone: "bg-amber-50 text-amber-600", valueTone: "text-amber-600", hover: "hover:border-amber-300", onClick: onViewProfit },
    { key: "stock", card: data.sims_in_stock, icon: Package, iconTone: "bg-slate-100 text-slate-700", valueTone: "text-slate-900", hover: "hover:border-slate-400", onClick: onViewStock },
  ].filter((item) => item.card);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {cards.map(({ key, card, icon: Icon, iconTone, valueTone, hover, onClick }) => card && (
        <div
          key={key}
          onClick={onClick}
          className={`rounded-2xl border p-4 shadow-2xs flex flex-col justify-between bg-white cursor-pointer transition-colors ${hover}`}
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconTone}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-black ${valueTone}`}>{display(card.value ?? 0)}</div>
            <div className="text-xs font-bold text-slate-700 mt-0.5">{card.label}</div>
            <div className="text-[11px] text-slate-400 font-medium">{card.subtext}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
