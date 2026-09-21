import React from "react";
import { Search, Download } from "lucide-react";
import { colors } from "@/constants/colors";

interface CommissionFilterStripProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedPeriod: string;
  onPeriodChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  onExportClick: () => void;
}

export const CommissionFilterStrip: React.FC<CommissionFilterStripProps> = ({
  searchQuery,
  onSearchChange,
  selectedPeriod,
  onPeriodChange,
  selectedStatus,
  onStatusChange,
  onExportClick,
}) => {
  return (
    <div
      className="p-4 rounded-2xl border bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3"
      style={{ borderColor: colors.border }}
    >
      <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search SC by name or state..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1.5">
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-gray-200 text-gray-700 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="this-month">This Month (Sep 2026)</option>
            <option value="last-month">Last Month (Aug 2026)</option>
            <option value="qtd">Quarter to Date (Q3)</option>
            <option value="ytd">Year to Date (2026)</option>
            <option value="all-time">All Time</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-gray-200 text-gray-700 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Statuses</option>
            <option value="Top Performer">Top Performers</option>
            <option value="On Track">On Track</option>
            <option value="Needs Attention">Needs Attention</option>
          </select>
        </div>
      </div>

      {/* Export Action */}
      <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
        <button
          type="button"
          onClick={onExportClick}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
};
