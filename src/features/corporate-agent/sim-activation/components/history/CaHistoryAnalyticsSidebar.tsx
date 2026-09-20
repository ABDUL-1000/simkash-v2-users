import { APP_COLORS } from "@/constants/colors";
import { Target, BarChart3 } from "lucide-react";
import type { CaHistoryAnalyticsData } from "../../types/ca-sim-activation.types";

interface CaHistoryAnalyticsSidebarProps {
  analytics: CaHistoryAnalyticsData;
}

export function CaHistoryAnalyticsSidebar({
  analytics,
}: CaHistoryAnalyticsSidebarProps) {
  // Simple sparkline heights simulation for Activations This Month
  const histogramBars = [
    25, 40, 35, 60, 45, 75, 50, 65, 80, 55, 90, 70, 60, 85, 100, 75, 50, 40, 60, 45,
  ];

  return (
    <div className="space-y-4">
      {/* 1. This Month Stats Summary */}
      <div
        className="p-5 rounded-2xl border bg-white shadow-2xs space-y-3.5"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="flex items-center justify-between">
          <h4
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: APP_COLORS.texts.primary }}
          >
            This Month
          </h4>
          <span className="text-xs font-bold text-slate-400">
            {analytics.monthName}
          </span>
        </div>

        <div className="space-y-2 text-xs divide-y" style={{ borderColor: APP_COLORS.backgrounds.surface }}>
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-slate-500 font-medium">Total activations</span>
            <span className="font-black text-slate-900">
              {analytics.totalActivations}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-slate-500 font-medium">Completed</span>
            <span className="font-black text-emerald-600">
              {analytics.completedCount}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-slate-500 font-medium">Failed</span>
            <span className="font-black text-red-600">
              {analytics.failedCount}
            </span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-slate-500 font-medium">Commission earned</span>
            <span className="font-black text-emerald-600">
              ₦{analytics.commissionEarned.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1.5">
            <span className="text-slate-500 font-medium">Success rate</span>
            <span className="font-black text-emerald-600">
              {analytics.successRate}%
            </span>
          </div>
        </div>
      </div>

      {/* 2. By SIM Type Breakdown */}
      <div
        className="p-5 rounded-2xl border bg-white shadow-2xs space-y-3"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="flex items-center justify-between">
          <h4
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: APP_COLORS.texts.primary }}
          >
            By SIM Type
          </h4>
          <span className="text-[11px] font-bold text-slate-400">
            {analytics.totalActivations} total
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          {analytics.simTypeBreakdown.map((item) => (
            <div key={item.type} className="space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-700">{item.type}</span>
                <span className="text-slate-900">
                  {item.count}{" "}
                  <span className="text-slate-400 font-normal">
                    {item.percentage}%
                  </span>
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. By Network Breakdown */}
      <div
        className="p-5 rounded-2xl border bg-white shadow-2xs space-y-3"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="flex items-center justify-between">
          <h4
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: APP_COLORS.texts.primary }}
          >
            By Network
          </h4>
          <span className="text-[11px] font-bold text-slate-400">
            {analytics.totalActivations} total
          </span>
        </div>

        <div className="space-y-2.5 text-xs">
          {analytics.networkBreakdown.map((item) => (
            <div key={item.network} className="space-y-1">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-700">{item.network}</span>
                <span className="text-slate-900">
                  {item.count}{" "}
                  <span className="text-slate-400 font-normal">
                    {item.percentage}%
                  </span>
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.barColor,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Activations This Month Mini Histogram */}
      <div
        className="p-5 rounded-2xl border bg-white shadow-2xs space-y-3"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="flex items-center justify-between">
          <h4
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: APP_COLORS.texts.primary }}
          >
            Activations This Month
          </h4>
          <BarChart3 className="size-3.5 text-slate-400" />
        </div>

        {/* Histogram graphic */}
        <div className="h-16 flex items-end gap-1 pt-2">
          {histogramBars.map((h, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-xs transition-all hover:opacity-80"
              style={{
                height: `${h}%`,
                backgroundColor:
                  idx === 14 ? APP_COLORS.blues.primary : APP_COLORS.blues.surfaceMid,
              }}
              title={`Day ${idx + 1}`}
            />
          ))}
        </div>

        <div className="text-[11px] font-bold text-slate-500 pt-1">
          {analytics.peakDayLabel}
        </div>
      </div>

      {/* 5. My Contribution to Combined Target Card */}
      <div
        className="p-5 rounded-2xl border bg-white shadow-2xs space-y-3"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <div className="flex items-center gap-2">
          <div
            className="size-7 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: APP_COLORS.blues.surfaceLight,
              color: APP_COLORS.blues.interactiveCta,
            }}
          >
            <Target className="size-4" />
          </div>
          <h4
            className="text-xs font-black tracking-tight"
            style={{ color: APP_COLORS.texts.primary }}
          >
            My Contribution to Combined Target
          </h4>
        </div>

        <div className="space-y-1.5 pt-1">
          <div
            className="text-2xl font-black"
            style={{ color: APP_COLORS.texts.primary }}
          >
            {analytics.myContributionCount}
          </div>
          <p className="text-xs font-bold text-slate-500">
            of {analytics.combinedTotalCount.toLocaleString()} combined total ·{" "}
            {analytics.contributionPercentage}%
          </p>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-2">
            <div
              className="h-full rounded-full"
              style={{
                width: `${analytics.contributionPercentage}%`,
                backgroundColor: APP_COLORS.blues.interactiveCta,
              }}
            />
          </div>

          <p className="text-[11px] font-medium text-slate-400 pt-1">
            + AP network: {analytics.apNetworkCount.toLocaleString()} more activations
          </p>
        </div>
      </div>
    </div>
  );
}
