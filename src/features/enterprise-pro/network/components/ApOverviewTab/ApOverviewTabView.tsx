import React, { useState, useMemo } from "react";
import { ApMetricCards } from "./ApMetricCards";
import { ApFilterStrip } from "./ApFilterStrip";
import { ApOverviewTable } from "./ApOverviewTable";
import type { AgencyPartnerNetwork, StateCoordinatorNetwork } from "../../types";

interface ApOverviewTabViewProps {
  agencyPartners: AgencyPartnerNetwork[];
  coordinators: StateCoordinatorNetwork[];
  onExportReport: () => void;
  onSelectAp?: (ap: AgencyPartnerNetwork) => void;
}

export const ApOverviewTabView: React.FC<ApOverviewTabViewProps> = ({
  agencyPartners,
  coordinators,
  onExportReport,
  onSelectAp,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScId, setSelectedScId] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredPartners = useMemo(() => {
    return agencyPartners.filter((ap) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ap.name.toLowerCase().includes(q);
        const matchesState = ap.state.toLowerCase().includes(q);
        const matchesSc = ap.scName.toLowerCase().includes(q);
        if (!matchesName && !matchesState && !matchesSc) return false;
      }
      if (selectedScId !== "all" && ap.scId !== selectedScId) {
        return false;
      }
      if (selectedStatus !== "all" && ap.status !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [agencyPartners, searchQuery, selectedScId, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* 5 KPI Metric Cards */}
      <ApMetricCards />

      {/* Filter and Search Bar */}
      <ApFilterStrip
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedScId={selectedScId}
        onScChange={setSelectedScId}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        coordinators={coordinators}
        totalCount={agencyPartners.length}
      />

      {/* Agency Partners Directory Table */}
      <ApOverviewTable
        data={filteredPartners}
        onSelectAp={onSelectAp}
        onExportApList={onExportReport}
      />
    </div>
  );
};
