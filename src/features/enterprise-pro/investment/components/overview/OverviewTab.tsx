import React from "react";
import { CumulativeEarningsChart } from "./CumulativeEarningsChart";
import { EarningsByTypeChart } from "./EarningsByTypeChart";
import { AdditionalOrdersTable } from "./AdditionalOrdersTable";
import { InvestmentSummarySidebar } from "./InvestmentSummarySidebar";
import { BreakEvenProgressCard } from "./BreakEvenProgressCard";
import { SimTypePerformanceCard } from "./SimTypePerformanceCard";
import { AssignedAccountManager } from "../AssignedAccountManager";

interface OverviewTabProps {
  onOrderMoreSims: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  onOrderMoreSims,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Charts & Orders - 2 Cols */}
      <div className="lg:col-span-2 space-y-6">
        <CumulativeEarningsChart />
        <EarningsByTypeChart />
        <AdditionalOrdersTable onOrderMoreClick={onOrderMoreSims} />
      </div>

      {/* Right Intelligence & Metrics Sidebar - 1 Col */}
      <div className="space-y-6">
        <InvestmentSummarySidebar />
        <BreakEvenProgressCard />
        <SimTypePerformanceCard />
        <AssignedAccountManager />
      </div>
    </div>
  );
};
