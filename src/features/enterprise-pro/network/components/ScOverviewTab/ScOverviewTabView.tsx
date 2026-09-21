import React from "react";
import { EpNetworkMetricCards } from "../EpNetworkMetricCards";
import { ScOverviewTable } from "./ScOverviewTable";
import { ScActivationsBarChart } from "./ScActivationsBarChart";
import { ScHealthSummaryCard } from "./ScHealthSummaryCard";
import { NetworkEarningsSidebar } from "./NetworkEarningsSidebar";
import { NetworkAccountManagerCard } from "./NetworkAccountManagerCard";
import { NetworkQuickActionsCard } from "./NetworkQuickActionsCard";
import type { StateCoordinatorNetwork, NetworkSummaryKPIs } from "../../types";

interface ScOverviewTabViewProps {
  kpis: NetworkSummaryKPIs;
  coordinators: StateCoordinatorNetwork[];
  onSelectSc: (sc: StateCoordinatorNetwork) => void;
  onOnboardSc: () => void;
  onExportReport: () => void;
  onSendReminder: () => void;
  onDistributeSims: () => void;
}

export const ScOverviewTabView: React.FC<ScOverviewTabViewProps> = ({
  kpis,
  coordinators,
  onSelectSc,
  onOnboardSc,
  onExportReport,
  onSendReminder,
  onDistributeSims,
}) => {
  return (
    <div className="space-y-6">
      {/* Top 5 KPI Cards */}
      <EpNetworkMetricCards kpis={kpis} />

      {/* Main 2-column grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left main content (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <ScOverviewTable data={coordinators} onSelectSc={onSelectSc} />
          <ScActivationsBarChart coordinators={coordinators} />
          <ScHealthSummaryCard kpis={kpis} />
        </div>

        {/* Right sidebar (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          <NetworkEarningsSidebar
            coordinators={coordinators}
            onSelectSc={onSelectSc}
          />
          <NetworkAccountManagerCard />
          <NetworkQuickActionsCard
            onOnboardSc={onOnboardSc}
            onExportReport={onExportReport}
            onSendReminder={onSendReminder}
            onDistributeSims={onDistributeSims}
          />
        </div>
      </div>
    </div>
  );
};
