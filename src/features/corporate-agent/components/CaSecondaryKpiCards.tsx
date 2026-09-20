import { Smartphone, Users, UserCheck, Award, Package } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CaSecondaryKpiCardsProps {
  onViewOwnActs?: () => void;
  onViewNetworkActs?: () => void;
  onViewAps?: () => void;
  onViewBonus?: () => void;
  onViewStock?: () => void;
}

export function CaSecondaryKpiCards({
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
          <div className="text-2xl font-black text-slate-900">312</div>
          <div className="text-xs font-bold text-slate-700 mt-0.5">My Own Acts</div>
          <div className="text-[11px] text-slate-400 font-medium">₦187,200 my commission</div>
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
          <div className="text-2xl font-black text-emerald-600">2,535</div>
          <div className="text-xs font-bold text-slate-700 mt-0.5">AP Network Acts</div>
          <div className="text-[11px] text-slate-400 font-medium">₦97,500 network commission</div>
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
          <div className="text-2xl font-black text-purple-600">12</div>
          <div className="text-xs font-bold text-slate-700 mt-0.5">Agency Partners</div>
          <div className="text-[11px] text-slate-400 font-medium">10 active • 2 need stock</div>
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
          <div className="text-2xl font-black text-amber-600">74%</div>
          <div className="text-xs font-bold text-slate-700 mt-0.5">Bonus Progress</div>
          <div className="text-[11px] text-slate-400 font-medium">₦12,000 pending target</div>
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
          <div className="text-2xl font-black text-slate-900">847</div>
          <div className="text-xs font-bold text-slate-700 mt-0.5">SIMs in Stock</div>
          <div className="text-[11px] text-slate-400 font-medium">4 sim types available</div>
        </div>
      </div>
    </div>
  );
}
