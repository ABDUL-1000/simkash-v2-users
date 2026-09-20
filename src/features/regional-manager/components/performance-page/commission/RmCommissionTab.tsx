import { RmCommissionBreakdownCard } from "./RmCommissionBreakdownCard";
import { RmCommissionByScList } from "./RmCommissionByScList";
import { RmCommissionHistoryTable } from "./RmCommissionHistoryTable";
import { RmCommissionStructureCard } from "./RmCommissionStructureCard";
import { RmCommissionPayoutsCard } from "./RmCommissionPayoutsCard";
import { RmCommissionTopEarnerCard } from "./RmCommissionTopEarnerCard";
import { RmCommissionProjectionCard } from "./RmCommissionProjectionCard";
import type { ScPerformanceRowItem } from "../../../types/regional-manager-performance.types";

interface RmCommissionTabProps {
  onContactSc: (sc: ScPerformanceRowItem) => void;
  onRequestPayout: () => void;
  onDownloadStatement?: (month: string) => void;
  onContactTopEarner?: () => void;
}

export function RmCommissionTab({
  onContactSc,
  onRequestPayout,
  onDownloadStatement,
  onContactTopEarner,
}: RmCommissionTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
      {/* LEFT COLUMN: Breakdown & Lists (2 cols) */}
      <div className="lg:col-span-2 space-y-4">
        <RmCommissionBreakdownCard />
        <RmCommissionByScList onContactSc={onContactSc} />
        <RmCommissionHistoryTable onDownloadStatement={onDownloadStatement} />
      </div>

      {/* RIGHT COLUMN: Structure, Payouts & Forecasts (1 col) */}
      <div className="space-y-4">
        <RmCommissionPayoutsCard onRequestPayout={onRequestPayout} />
        <RmCommissionTopEarnerCard onContactTopEarner={onContactTopEarner} />
        <RmCommissionStructureCard />
        <RmCommissionProjectionCard />
      </div>
    </div>
  );
}
