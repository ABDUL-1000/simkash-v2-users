import { Search, ChevronDown, Download } from "lucide-react";

interface HistoryFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  typeFilter: string;
  onTypeFilterChange: (t: string) => void;
  simFilter: string;
  onSimFilterChange: (s: string) => void;
  rangeFilter: string;
  onRangeFilterChange: (r: string) => void;
  totalCount: number;
  visibleCount: number;
  onExportClick?: () => void;
}

export function HistoryFilterBar({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  simFilter,
  onSimFilterChange,
  rangeFilter,
  onRangeFilterChange,
  totalCount,
  visibleCount,
  onExportClick,
}: HistoryFilterBarProps) {
  return (
    <div className="space-y-3">
      {/* Top Filter Controls */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8C909B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search stock events..."
            className="w-full rounded-2xl border border-[#CBD5E1] bg-white py-2.5 pl-10 pr-4 text-xs text-[#0F152A] placeholder:text-[#94A3B8] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Type Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-[#475569]">
            <span className="text-[#8C909B]">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilterChange(e.target.value)}
              className="bg-transparent font-bold text-[#0F152A] focus:outline-hidden cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Received">Received</option>
              <option value="Used">Used</option>
              <option value="Adjusted">Adjusted</option>
            </select>
          </div>

          {/* SIM Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-[#475569]">
            <span className="text-[#8C909B]">SIM:</span>
            <select
              value={simFilter}
              onChange={(e) => onSimFilterChange(e.target.value)}
              className="bg-transparent font-bold text-[#0F152A] focus:outline-hidden cursor-pointer"
            >
              <option value="All">All SIM Types</option>
              <option value="POS SIM">POS SIM</option>
              <option value="CCTV SIM">CCTV SIM</option>
              <option value="GPS SIM">GPS SIM</option>
              <option value="Router SIM">Router SIM</option>
            </select>
          </div>

          {/* Range Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-[#475569]">
            <span className="text-[#8C909B]">Range:</span>
            <select
              value={rangeFilter}
              onChange={(e) => onRangeFilterChange(e.target.value)}
              className="bg-transparent font-bold text-[#0F152A] focus:outline-hidden cursor-pointer"
            >
              <option value="All">All Time</option>
              <option value="TODAY">Today</option>
              <option value="YESTERDAY">Yesterday</option>
              <option value="THIS WEEK">This Week</option>
              <option value="EARLIER THIS MONTH">Earlier This Month</option>
            </select>
          </div>

          {/* Export Button */}
          {onExportClick && (
            <button
              type="button"
              onClick={onExportClick}
              className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-xs font-bold text-[#475569] transition hover:bg-[#F8FAFC] hover:text-[#0F152A]"
            >
              <Download className="size-3.5 text-[#2563EB]" />
              <span>Export</span>
            </button>
          )}
        </div>
      </div>

      {/* Meta Row: Count & Sorting */}
      <div className="flex items-center justify-between text-xs text-[#8C909B]">
        <span>
          Showing 1–{visibleCount} of {totalCount} stock events
        </span>
        <div className="flex items-center gap-1 cursor-pointer font-medium text-[#475569] hover:text-[#0F152A]">
          <span>Sort: Newest First</span>
          <ChevronDown className="size-3.5" />
        </div>
      </div>
    </div>
  );
}
