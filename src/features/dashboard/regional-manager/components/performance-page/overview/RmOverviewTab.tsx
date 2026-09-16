import { RmOverviewMonthlyChart } from "./RmOverviewMonthlyChart";
import { RmOverviewScTable } from "./RmOverviewScTable";
import { RmOverviewSimBreakdown } from "./RmOverviewSimBreakdown";
import { RmOverviewNetworkGrowth } from "./RmOverviewNetworkGrowth";
import { RmOverviewKeyInsights } from "./RmOverviewKeyInsights";
import { RmOverviewCommissionSummary } from "./RmOverviewCommissionSummary";
import { RmOverviewLastMonthCompare } from "./RmOverviewLastMonthCompare";
import { RmOverviewHealthScore } from "./RmOverviewHealthScore";
import type { ScPerformanceRowItem } from "../../../types/regional-manager-performance.types";

interface RmOverviewTabProps {
  onContactSc: (sc: ScPerformanceRowItem) => void;
  onViewScDetails?: (sc: ScPerformanceRowItem) => void;
  onRequestPayout: () => void;
  onNudgeAtRisk: () => void;
  onViewCommissionTab: () => void;
}

export function RmOverviewTab({
  onContactSc,
  onViewScDetails,
  onRequestPayout,
  onNudgeAtRisk,
  onViewCommissionTab,
}: RmOverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
      {/* LEFT COLUMN: Main Trends & Tables (2 cols) */}
      <div className="lg:col-span-2 space-y-4">
        <RmOverviewMonthlyChart />
        <RmOverviewScTable
          onContactSc={onContactSc}
          onViewScDetails={onViewScDetails}
        />
        <RmOverviewSimBreakdown />
      </div>

      {/* RIGHT COLUMN: Secondary Widgets & Health (1 col) */}
      <div className="space-y-4">
        <RmOverviewNetworkGrowth />
        <RmOverviewKeyInsights onNudgeAtRisk={onNudgeAtRisk} />
        <RmOverviewCommissionSummary
          onRequestPayout={onRequestPayout}
          onViewCommissionTab={onViewCommissionTab}
        />
        <RmOverviewLastMonthCompare />
        <RmOverviewHealthScore />
      </div>
    </div>
  );
}
