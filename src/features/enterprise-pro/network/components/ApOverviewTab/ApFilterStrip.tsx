import React from "react";
import { Search, Filter } from "lucide-react";
import { colors } from "@/constants/colors";
import type { StateCoordinatorNetwork } from "../../types";

interface ApFilterStripProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedScId: string;
  onScChange: (scId: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  coordinators: StateCoordinatorNetwork[];
  totalCount: number;
}

export const ApFilterStrip: React.FC<ApFilterStripProps> = ({
  searchQuery,
  onSearchChange,
  selectedScId,
  onScChange,
  selectedStatus,
  onStatusChange,
  coordinators,
  totalCount,
}) => {
  const statusPills = [
    { key: "all", label: `All APs (${totalCount})` },
    { key: "active", label: "Active (212)" },
    { key: "low_stock", label: "Low Stock (28)" },
    { key: "out_of_stock", label: "Out of Stock (7)" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      {/* Status pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
        {statusPills.map((pill) => {
          const isActive = selectedStatus === pill.key;
          return (
            <button
              key={pill.key}
              type="button"
              onClick={() => onStatusChange(pill.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                isActive
                  ? "bg-[#1F3A5F] text-white shadow-xs"
                  : "bg-white text-gray-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* Search & Coordinator select */}
      <div className="flex items-center gap-2">
        <div className="relative min-w-[160px] sm:min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Agency Partner..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ borderColor: colors.border }}
          />
        </div>

        <div className="relative">
          <select
            value={selectedScId}
            onChange={(e) => onScChange(e.target.value)}
            aria-label="Filter by Coordinator"
            className="appearance-none pl-7 pr-8 py-1.5 text-xs bg-white border rounded-xl font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            style={{ borderColor: colors.border }}
          >
            <option value="all">All Coordinators (12)</option>
            {coordinators.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.state})
              </option>
            ))}
          </select>
          <Filter className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
