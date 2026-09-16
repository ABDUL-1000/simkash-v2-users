import { APP_COLORS } from "@/constants/colors";
import { Search, ChevronDown, X } from "lucide-react";

interface CaHistoryFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  networkFilter: string;
  onNetworkFilterChange: (network: string) => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
  totalCount?: number;
  filteredCount?: number;
  onClearFilters: () => void;
}

export function CaHistoryFilters({
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  networkFilter,
  onNetworkFilterChange,
  dateRange,
  onDateRangeChange,
  searchQuery,
  onSearchQueryChange,
  sortOrder,
  onSortOrderChange,
  totalCount = 312,
  filteredCount = 15,
  onClearFilters,
}: CaHistoryFiltersProps) {
  const statusOptions = ["All", "Completed", "Failed", "Pending"];
  const dateRanges = ["Today", "This Week", "This Month", "All Time", "Custom"];

  return (
    <div className="space-y-3.5">
      {/* Row 1: Status Pills, Dropdowns, Date Range Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Status pills & Selects */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Pills */}
          <div
            className="flex items-center p-1 rounded-xl border bg-white shadow-2xs"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            {statusOptions.map((status) => {
              const isSelected = statusFilter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => onStatusFilterChange(status)}
                  className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? APP_COLORS.texts.primary
                      : "transparent",
                    color: isSelected ? "#FFFFFF" : APP_COLORS.texts.slate,
                  }}
                >
                  {status}
                </button>
              );
            })}
          </div>

          {/* Type Dropdown */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
              className="appearance-none bg-white border rounded-xl px-3 py-1.5 pr-7 text-xs font-bold text-slate-700 outline-hidden cursor-pointer shadow-2xs"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <option value="All">All Types</option>
              <option value="POS SIM">POS SIM</option>
              <option value="CCTV SIM">CCTV SIM</option>
              <option value="GPS SIM">GPS SIM</option>
              <option value="Router SIM">Router SIM</option>
            </select>
            <ChevronDown className="size-3 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Network Dropdown */}
          <div className="relative">
            <select
              value={networkFilter}
              onChange={(e) => onNetworkFilterChange(e.target.value)}
              className="appearance-none bg-white border rounded-xl px-3 py-1.5 pr-7 text-xs font-bold text-slate-700 outline-hidden cursor-pointer shadow-2xs"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <option value="All">All Networks</option>
              <option value="MTN">MTN</option>
              <option value="Airtel">Airtel</option>
              <option value="Glo">Glo</option>
              <option value="2 (9mobile)">9mobile / T2</option>
            </select>
            <ChevronDown className="size-3 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Right: Date Range Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {dateRanges.map((range) => {
            const isSelected = dateRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => onDateRangeChange(range)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? APP_COLORS.blues.primary
                    : APP_COLORS.backgrounds.background,
                  color: isSelected ? "#FFFFFF" : APP_COLORS.texts.slate,
                  border: `1px solid ${
                    isSelected ? APP_COLORS.blues.primary : APP_COLORS.greys.stroke
                  }`,
                }}
              >
                {range}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2: Search input, Sort, Active filter chips, Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* Search & Sort */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div
            className="flex items-center flex-1 rounded-xl border px-3 py-1.5 bg-white shadow-2xs"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <Search className="size-3.5 text-slate-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Search by SIM number, customer name..."
              className="w-full bg-transparent text-xs font-semibold outline-hidden placeholder:text-slate-400"
              style={{ color: APP_COLORS.texts.primary }}
            />
          </div>

          <div className="relative shrink-0">
            <select
              value={sortOrder}
              onChange={(e) => onSortOrderChange(e.target.value)}
              className="appearance-none bg-white border rounded-xl px-3 py-1.5 pr-7 text-xs font-bold text-slate-700 outline-hidden cursor-pointer shadow-2xs"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ChevronDown className="size-3 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Active chips & count */}
        <div className="flex flex-wrap items-center gap-2">
          {dateRange !== "All Time" && (
            <span
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border"
              style={{
                backgroundColor: APP_COLORS.blues.surfaceLight,
                borderColor: APP_COLORS.blues.surfaceMid,
                color: APP_COLORS.blues.interactiveCta,
              }}
            >
              <span>{dateRange}</span>
              <button
                type="button"
                onClick={() => onDateRangeChange("All Time")}
                className="hover:opacity-75"
              >
                <X className="size-3" />
              </button>
            </span>
          )}

          {networkFilter !== "All" && (
            <span
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border bg-amber-50 border-amber-200 text-amber-800"
            >
              <span>{networkFilter}</span>
              <button
                type="button"
                onClick={() => onNetworkFilterChange("All")}
                className="hover:opacity-75"
              >
                <X className="size-3" />
              </button>
            </span>
          )}

          {(dateRange !== "All Time" || networkFilter !== "All" || statusFilter !== "All" || typeFilter !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
            >
              Clear all
            </button>
          )}

          <span className="text-xs font-semibold text-slate-500 ml-auto sm:ml-2">
            Showing 1–{filteredCount} of {totalCount} activations
          </span>
        </div>
      </div>
    </div>
  );
}
