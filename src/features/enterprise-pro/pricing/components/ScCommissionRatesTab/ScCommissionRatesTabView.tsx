import React from "react";
import { ScCommissionNoticeBanner } from "./ScCommissionNoticeBanner";
import { TotalScCommissionBanner } from "./TotalScCommissionBanner";
import { BulkRateToggleBar } from "./BulkRateToggleBar";
import { ScRateCardList } from "./ScRateCardList";
import type { ScCommissionRateItem } from "../../types";

interface ScCommissionRatesTabViewProps {
  coordinators: ScCommissionRateItem[];
  onChangeRate: (id: string, newRate: number) => void;
  bulkApply: boolean;
  onToggleBulkApply: (checked: boolean) => void;
  onResetAll: () => void;
  onSaveAll: () => void;
  hasChanges: boolean;
}

export const ScCommissionRatesTabView: React.FC<ScCommissionRatesTabViewProps> = ({
  coordinators,
  onChangeRate,
  bulkApply,
  onToggleBulkApply,
  onResetAll,
  onSaveAll,
  hasChanges,
}) => {
  const totalComm = coordinators.reduce((acc, curr) => acc + curr.monthlyEarned, 0);

  return (
    <div className="space-y-5">
      {/* Notice & Warning */}
      <ScCommissionNoticeBanner />

      {/* Total SC Commission Banner */}
      <TotalScCommissionBanner
        totalMonthlyCommission={totalComm}
        scCount={coordinators.length}
        avgRatePct={8}
      />

      {/* Bulk Rate Switcher */}
      <BulkRateToggleBar
        bulkApply={bulkApply}
        onToggleBulkApply={onToggleBulkApply}
        onResetAll={onResetAll}
        onSaveAll={onSaveAll}
        hasChanges={hasChanges}
      />

      {/* SC Rate Card List */}
      <ScRateCardList
        coordinators={coordinators}
        onChangeRate={onChangeRate}
      />
    </div>
  );
};
