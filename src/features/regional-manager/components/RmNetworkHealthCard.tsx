import { CheckCircle2, AlertTriangle, TrendingUp, Award, XCircle } from "lucide-react";
import type { RmNetworkHealth } from "../types/regional-manager.types";

interface RmNetworkHealthCardProps {
  health: RmNetworkHealth;
}

export function RmNetworkHealthCard({ health }: RmNetworkHealthCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5 text-xs">
      <h3 className="text-sm font-black text-[#0F152A]">Network Health</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {/* Active SCs */}
        <div className="flex items-center justify-between pt-1 first:pt-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-[#10B981]" />
            <span className="font-semibold text-[#0F152A]">Active SCs</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-[#0F152A]">
              {health.activeScs.active} of {health.activeScs.total}
            </span>
            <span className="ml-1.5 rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
              All Active
            </span>
          </div>
        </div>

        {/* Low Stock */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-[#F59E0B]" />
            <span className="font-semibold text-[#0F152A]">Low Stock SCs</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-[#0F152A]">
              {health.lowStockScs.count} of {health.lowStockScs.total}
            </span>
            <span className="ml-1.5 rounded-full bg-[#FFFBEB] px-2 py-0.5 text-[9px] font-bold text-[#D97706]">
              Needs Action
            </span>
          </div>
        </div>

        {/* Avg Act/SC */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-[#2563EB]" />
            <span className="font-semibold text-[#0F152A]">Avg. Act/SC</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-[#0F152A]">{health.avgActivationsPerSc.toLocaleString()}/mo</span>
            <span className="ml-1.5 rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[9px] font-bold text-[#2563EB]">
              Good
            </span>
          </div>
        </div>

        {/* Bonus Hit Rate */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Award className="size-4 text-[#F59E0B]" />
            <span className="font-semibold text-[#0F152A]">Bonus Hit Rate</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-[#0F152A]">{health.bonusHitRatePercent}%</span>
            <span className="ml-1 text-[10px] text-[#64748B]">
              ({health.bonusHitCount.count} of {health.bonusHitCount.total} SCs)
            </span>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <XCircle className="size-4 text-[#EF4444]" />
            <span className="font-semibold text-[#0F152A]">Out of Stock SCs</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-[#EF4444]">
              {health.outOfStockScs.count} of {health.outOfStockScs.total}
            </span>
            <span className="ml-1.5 rounded-full bg-[#FFF1F2] px-2 py-0.5 text-[9px] font-bold text-[#EF4444]">
              Critical
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RmNetworkHealthCard;
