import React, { useState } from "react";
import { Info } from "lucide-react";
import { CommissionFilterStrip } from "./CommissionFilterStrip";
import { ScCommissionTable } from "./ScCommissionTable";
import { CommissionHighlights } from "./CommissionHighlights";
import { mockScCommissions } from "../../data/mockCommissionData";
import type { ScCommissionItem } from "../../types";

interface CommissionTableTabProps {
  onSelectSc: (sc: ScCommissionItem) => void;
  onEditRate: (sc: ScCommissionItem) => void;
  onExportReport: () => void;
}

export const CommissionTableTab: React.FC<CommissionTableTabProps> = ({
  onSelectSc,
  onEditRate,
  onExportReport,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredData = mockScCommissions.filter((item) => {
    const matchesSearch =
      item.scName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Informational Guidance Banner */}
      <div className="rounded-2xl p-4 bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs text-blue-900">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">
            State Coordinator Wholesale Overrides & Commission Structure
          </p>
          <p className="text-blue-700 mt-0.5 leading-relaxed">
            Coordinators receive a customized gross override rate (12% – 16%) per
            activated line and recurring subscriber data pack. A fixed 5% platform
            infrastructure fee is deducted automatically, and net revenues are credited
            to your Enterprise ledger monthly.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <CommissionFilterStrip
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onExportClick={onExportReport}
      />

      {/* Data Table */}
      <ScCommissionTable
        data={filteredData}
        onSelectSc={onSelectSc}
        onEditRate={onEditRate}
      />

      {/* 3 Bottom KPI Highlights */}
      <CommissionHighlights />
    </div>
  );
};
