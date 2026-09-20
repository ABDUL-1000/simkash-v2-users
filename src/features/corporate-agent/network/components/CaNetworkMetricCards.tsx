import {
  Zap,
  TrendingUp,
  CreditCard,
  Check,
} from "lucide-react";
import type { CaNetworkMetricStats } from "../types/ca-network.types";

interface CaNetworkMetricCardsProps {
  metrics: CaNetworkMetricStats;
}

export function CaNetworkMetricCards({ metrics }: CaNetworkMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Card 1: Own Today */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-1 transition hover:shadow-sm">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#FEF9C3] text-[#CA8A04]">
          <Zap className="size-4 fill-[#CA8A04]" />
        </div>
        <h3 className="text-2xl font-black text-[#0F152A] pt-1">
          {metrics.ownToday.count}
        </h3>
        <p className="text-[11px] text-[#8C909B] font-medium">Own Today</p>
        <p className="text-[10px] font-bold text-[#10B981]">
          {metrics.ownToday.trendText}
        </p>
      </div>

      {/* Card 2: Own This Month */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-1 transition hover:shadow-sm">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#16A34A]">
          <TrendingUp className="size-4" />
        </div>
        <h3 className="text-2xl font-black text-[#10B981] pt-1">
          {metrics.ownThisMonth.count.toLocaleString()}
        </h3>
        <p className="text-[11px] text-[#8C909B] font-medium">Own This Month</p>
        <p className="text-[10px] font-bold text-[#10B981]">
          {metrics.ownThisMonth.commissionText}
        </p>
      </div>

      {/* Card 3: Own Commission */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-1 transition hover:shadow-sm">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#D97706]">
          <CreditCard className="size-4" />
        </div>
        <h3 className="text-2xl font-black text-[#0F152A] pt-1">
          {metrics.ownCommission.amount}
        </h3>
        <p className="text-[11px] text-[#8C909B] font-medium">Own Commission</p>
        <p className="text-[10px] font-medium text-[#8C909B]">
          {metrics.ownCommission.trendText}
        </p>
      </div>

      {/* Card 4: Own Success Rate */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-1 transition hover:shadow-sm">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#16A34A]">
          <Check className="size-4 stroke-[3]" />
        </div>
        <h3 className="text-2xl font-black text-[#0F152A] pt-1">
          {metrics.ownSuccessRate.rate}
        </h3>
        <p className="text-[11px] text-[#8C909B] font-medium">Own Success Rate</p>
        <p className="text-[10px] font-medium text-[#8C909B]">
          {metrics.ownSuccessRate.subtext}
        </p>
      </div>
    </div>
  );
}
