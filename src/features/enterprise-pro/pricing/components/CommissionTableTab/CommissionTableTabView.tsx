import React, { useState } from "react";
import { CommissionViewLevelPills, type ViewLevel } from "./CommissionViewLevelPills";
import { EpCommissionDataTable } from "./EpCommissionDataTable";
import { CommissionInsightPills } from "./CommissionInsightPills";
import { PricingAnalysisSidebar } from "./PricingAnalysisSidebar";
import { ScCommissionSplitCard } from "./ScCommissionSplitCard";
import { CommissionQuickActionsCard } from "./CommissionQuickActionsCard";
import type { CommissionRecord } from "../../types";

interface CommissionTableTabViewProps {
  data: CommissionRecord[];
  onSelectRecord: (record: CommissionRecord) => void;
  onUpdateRetailPrices: () => void;
  onAdjustScRates: () => void;
  onExportCommissionTable: () => void;
  onReinstateSc?: () => void;
}

export const CommissionTableTabView: React.FC<CommissionTableTabViewProps> = ({
  data,
  onSelectRecord,
  onUpdateRetailPrices,
  onAdjustScRates,
  onExportCommissionTable,
  onReinstateSc,
}) => {
  const [viewLevel, setViewLevel] = useState<ViewLevel>("sc");

  return (
    <div className="space-y-5">
      {/* View level pills: SC Level, AP Level, SIM Type Level */}
      <CommissionViewLevelPills
        viewLevel={viewLevel}
        onViewLevelChange={setViewLevel}
      />

      {/* Main Commission Table with sticky totals row */}
      <EpCommissionDataTable
        data={data}
        onSelectRecord={onSelectRecord}
      />

      {/* 3 Insight cards */}
      <CommissionInsightPills
        onRaiseRetailClick={onUpdateRetailPrices}
        onReinstateClick={onReinstateSc}
      />

      {/* 3 Bottom widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <PricingAnalysisSidebar />
        <ScCommissionSplitCard />
        <CommissionQuickActionsCard
          onUpdateRetailPrices={onUpdateRetailPrices}
          onAdjustScRates={onAdjustScRates}
          onExportCommissionTable={onExportCommissionTable}
        />
      </div>
    </div>
  );
};
