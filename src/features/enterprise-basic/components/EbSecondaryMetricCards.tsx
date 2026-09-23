import React from "react";
import { Smartphone, Zap, TrendingUp, Calendar, Trophy } from "lucide-react";
import { colors } from "@/constants/colors";
import type { EbPaymentModel, EbDashboardMetrics } from "../types";

interface EbSecondaryMetricCardsProps {
  metrics: EbDashboardMetrics;
  paymentModel: EbPaymentModel;
}

export const EbSecondaryMetricCards: React.FC<EbSecondaryMetricCardsProps> = ({
  metrics,
  paymentModel,
}) => {
  const isUpfront = paymentModel === "upfront";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Products Sold */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-xs flex flex-col justify-between space-y-3"
        style={{ borderColor: colors.border }}
      >
        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-extrabold text-slate-900">{metrics.productsSold}</div>
          <div className="text-xs font-bold text-slate-700 mt-1">
            {isUpfront ? "Products Sold" : "SIMs Sold"}
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            SIMs: {metrics.simsSold} · CCTV: {metrics.cctvSold} · Solar: {metrics.solarSold}
          </p>
        </div>
      </div>

      {/* Card 2: Margin This Month */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-xs flex flex-col justify-between space-y-3"
        style={{ borderColor: colors.border }}
      >
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-extrabold text-emerald-600">
            ₦{metrics.marginThisMonth.toLocaleString()}
          </div>
          <div className="text-xs font-bold text-slate-700 mt-1">Margin This Month</div>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            SIMs: ₦{(metrics.simsMarginThisMonth / 1000).toFixed(0)}K · CCTV: ₦
            {(metrics.cctvMarginThisMonth / 1000).toFixed(0)}K · Solar: ₦
            {(metrics.solarMarginThisMonth / 1000).toFixed(0)}K
          </p>
        </div>
      </div>

      {/* Card 3: Best Pricing vs Next Instalment */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-xs flex flex-col justify-between space-y-3"
        style={{ borderColor: colors.border }}
      >
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            isUpfront ? "bg-purple-50 text-purple-600" : "bg-amber-50 text-amber-600"
          }`}
        >
          {isUpfront ? <TrendingUp className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
        </div>
        <div>
          {isUpfront ? (
            <>
              <div className="text-2xl font-extrabold text-purple-700">Best Pricing</div>
              <div className="text-xs font-bold text-slate-700 mt-1">Lowest wholesale rates</div>
              <p className="text-[11px] text-purple-600 font-medium mt-0.5">Private label eligible</p>
            </>
          ) : (
            <>
              <div className="text-2xl font-extrabold text-amber-500">
                ₦{metrics.nextInstalmentAmount.toLocaleString()}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">Next Instalment</div>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Due: {metrics.nextInstalmentDate} · 4 days
              </p>
            </>
          )}
        </div>
      </div>

      {/* Card 4: Bonus Progress */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-xs flex flex-col justify-between space-y-3"
        style={{ borderColor: colors.border }}
      >
        <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
          <Trophy className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-extrabold text-amber-500">{metrics.bonusProgressPct}%</div>
          <div className="text-xs font-bold text-slate-700 mt-1">Bonus Progress</div>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            {metrics.bonusTargetCurrent} of {metrics.bonusTargetMax} SIMs sold target
          </p>
        </div>
      </div>
    </div>
  );
};
