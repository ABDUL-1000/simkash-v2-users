import React from "react";
import { EpNetworkMetricCards } from "../EpNetworkMetricCards";
import { ScOverviewTable } from "./ScOverviewTable";
import { ScHealthSummaryCard } from "./ScHealthSummaryCard";
import { NetworkEarningsSidebar } from "./NetworkEarningsSidebar";
import { NetworkQuickActionsCard } from "./NetworkQuickActionsCard";
import type { StateCoordinatorNetwork } from "../../types";
import type { EnterpriseScOverviewData, EpScTab } from '../../types/api';

interface ScOverviewTabViewProps {
  data: EnterpriseScOverviewData;
  coordinators: StateCoordinatorNetwork[];
  tab: EpScTab;
  onTabChange: (tab: EpScTab) => void;
  search: string;
  onSearchChange: (value: string) => void;
  state: string;
  onStateChange: (value: string) => void;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  onSelectSc: (sc: StateCoordinatorNetwork) => void;
  onOnboardSc: () => void;
  onExportReport: () => void;
  exporting?: boolean;
  onSendReminder: () => void;
  onDistributeSims: (id?: number) => void;
}

export const ScOverviewTabView: React.FC<ScOverviewTabViewProps> = ({
  data,
  coordinators,
  tab,
  onTabChange,
  search,
  onSearchChange,
  state,
  onStateChange,
  page,
  pageSize,
  onPageChange,
  loading,
  onSelectSc,
  onOnboardSc,
  onExportReport,
  exporting,
  onSendReminder,
  onDistributeSims,
}) => {
  return (
    <div className="space-y-6">
      {/* Top 5 KPI Cards */}
      {data.summary_cards && <EpNetworkMetricCards kpis={data.summary_cards} />}

      {/* Main 2-column grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left main content (2 cols) */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <ScOverviewTable
            data={coordinators}
            networkActsText={data.network_summary?.network_acts_text}
            tabCounts={data.tab_counts}
            tab={tab}
            onTabChange={onTabChange}
            search={search}
            onSearchChange={onSearchChange}
            state={state}
            onStateChange={onStateChange}
            page={page}
            pageSize={pageSize}
            total={data.total ?? coordinators.length}
            onPageChange={onPageChange}
            loading={loading}
            onSelectSc={onSelectSc}
          />
          <ScHealthSummaryCard counts={data.tab_counts} />
        </div>

        {/* Right sidebar (1 col) */}
        <div className="lg:col-span-1 space-y-6 min-w-0">
          <NetworkEarningsSidebar
            summary={data.network_summary}
            alerts={data.stock_alerts}
            onDistribute={onDistributeSims}
          />
          <NetworkQuickActionsCard
            onOnboardSc={onOnboardSc}
            onExportReport={onExportReport}
            exporting={exporting}
            onSendReminder={onSendReminder}
            onDistributeSims={() => onDistributeSims()}
          />
        </div>
      </div>
    </div>
  );
};
