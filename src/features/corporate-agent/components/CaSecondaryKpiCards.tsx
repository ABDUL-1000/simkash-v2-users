import type { CaDashboardOverviewData } from "../types/api";
import { Smartphone, Users, UserCheck, Award, Package } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CaSecondaryKpiCardsProps {
  data: CaDashboardOverviewData["secondary_cards"];
  onViewOwnActs?: () => void;
  onViewNetworkActs?: () => void;
  onViewAps?: () => void;
  onViewBonus?: () => void;
  onViewStock?: () => void;
}

export function CaSecondaryKpiCards({
  data,
  onViewOwnActs,
  onViewNetworkActs,
  onViewAps,
  onViewBonus,
  onViewStock,
}: CaSecondaryKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {/* 1. MY OWN ACTS */}
      <div
        onClick={onViewOwnActs}
        className="rounded-2xl border p-4 shadow-2xs flex flex-col justify-between bg-white cursor-pointer hover:border-blue-300 transition-colors"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Smartphone className="w-5 h-5" />
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-900">{data.my_own_acts.value.toLocaleString()}</div>
          <div className="text-xs font-bold text-slate-700 mt-0.5">{data.my_own_acts.label}</div>
          <div className="text-[11px] text-slate-400 font-medium">{data.my_own_acts.subtext}</div>
        </div>
      </div>

      {/* 2. AP NETWORK ACTS */}
      <div
        onClick={onViewNetworkActs}
        className="rounded-2xl border p-4 shadow-2xs flex flex-col justify-between bg-white cursor-pointer hover:border-emerald-300 transition-colors"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-emerald-600">{data.ap_network_acts.value.toLocaleString()}</div>
          <div className="text-xs font-bold text-slate-700 mt-0.5">{data.ap_network_acts.label}</div>
          <div className="text-[11px] text-slate-400 font-medium">{data.ap_network_acts.subtext}</div>
        </div>
      </div>

      {/* 3. AGENCY PARTNERS */}
      <div
        onClick={onViewAps}
        className="rounded-2xl border p-4 shadow-2xs flex flex-col justify-between bg-white cursor-pointer hover:border-purple-300 transition-colors"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
          <UserCheck className="w-5 h-5" />
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-purple-600">{data.agency_partners.value.toLocaleString()}</div>
          <div className="text-xs font-bold text-slate-700 mt-0.5">{data.agency_partners.label}</div>
          <div className="text-[11px] text-slate-400 font-medium">{data.agency_partners.subtext}</div>
        </div>
      </div>

      {/* 4. BONUS PROGRESS */}
      <div
        onClick={onViewBonus}
        className="rounded-2xl border p-4 shadow-2xs flex flex-col justify-between bg-white cursor-pointer hover:border-amber-300 transition-colors"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <Award className="w-5 h-5" />
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-amber-600">{data.bonus_progress.value}</div>
          <div className="text-xs font-bold text-slate-700 mt-0.5">{data.bonus_progress.label}</div>
          <div className="text-[11px] text-slate-400 font-medium">{data.bonus_progress.subtext}</div>
        </div>
      </div>

      {/* 5. SIMS IN STOCK */}
      <div
        onClick={onViewStock}
        className="rounded-2xl border p-4 shadow-2xs flex flex-col justify-between bg-white cursor-pointer hover:border-slate-400 transition-colors"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
          <Package className="w-5 h-5" />
        </div>
        <div className="mt-3">
          <div className="text-2xl font-black text-slate-900">{data.sims_in_stock.value.toLocaleString()}</div>
          <div className="text-xs font-bold text-slate-700 mt-0.5">{data.sims_in_stock.label}</div>
          <div className="text-[11px] text-slate-400 font-medium">{data.sims_in_stock.subtext}</div>
        </div>
      </div>
    </div>
  );
}
