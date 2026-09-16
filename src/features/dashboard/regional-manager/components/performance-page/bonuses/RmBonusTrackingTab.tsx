import { RmBonusPeriodStatusCard } from "./RmBonusPeriodStatusCard";
import { RmBonusTrackerTable } from "./RmBonusTrackerTable";
import { RmBonusPayoutHistoryTable } from "./RmBonusPayoutHistoryTable";
import { RmBonusConfigCard } from "./RmBonusConfigCard";
import { RmBonusAtRiskCard } from "./RmBonusAtRiskCard";
import { RmBonusProjectionCard } from "./RmBonusProjectionCard";
import { RmBonusLeaderboardCard } from "./RmBonusLeaderboardCard";
import { RmEasyBuyCommissionCard } from "./RmEasyBuyCommissionCard";
import type { ScBonusTrackerRowItem } from "../../../types/regional-manager-performance.types";

interface RmBonusTrackingTabProps {
  onOpenBulkReminder: () => void;
  onRemindSc: (sc: ScBonusTrackerRowItem) => void;
  onRemindAtRisk: () => void;
  onViewEasyBuyDetails: () => void;
}

export function RmBonusTrackingTab({
  onOpenBulkReminder,
  onRemindSc,
  onRemindAtRisk,
  onViewEasyBuyDetails,
}: RmBonusTrackingTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
      {/* LEFT COLUMN: Tracker Tables & Status (2 cols) */}
      <div className="lg:col-span-2 space-y-4">
        <RmBonusPeriodStatusCard />
        <RmBonusTrackerTable
          onOpenBulkReminder={onOpenBulkReminder}
          onRemindSc={onRemindSc}
        />
        <RmBonusPayoutHistoryTable />
      </div>

      {/* RIGHT COLUMN: Bonus Rules, Alerts & EasyBuy (1 col) */}
      <div className="space-y-4">
        <RmBonusAtRiskCard onRemindAtRisk={onRemindAtRisk} />
        <RmBonusConfigCard />
        <RmBonusProjectionCard />
        <RmBonusLeaderboardCard />
        <RmEasyBuyCommissionCard onViewDetails={onViewEasyBuyDetails} />
      </div>
    </div>
  );
}
