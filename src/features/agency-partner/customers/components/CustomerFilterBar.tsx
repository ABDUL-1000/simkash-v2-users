import { Search, X } from "lucide-react";

interface CustomerFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  simTypeFilter: string;
  onSimTypeFilterChange: (t: string) => void;
  networkFilter: string;
  onNetworkFilterChange: (n: string) => void;
  sortBy: string;
  onSortByChange: (s: string) => void;
  totalCount: number;
  visibleCount: number;
  onClearAllFilters: () => void;
}

export function CustomerFilterBar({
  searchQuery,
  onSearchChange,
  simTypeFilter,
  onSimTypeFilterChange,
  networkFilter,
  onNetworkFilterChange,
  sortBy,
  onSortByChange,
  totalCount,
  visibleCount,
  onClearAllFilters,
}: CustomerFilterBarProps) {
  const hasActiveFilters =
    searchQuery ||
    simTypeFilter !== "All" ||
    networkFilter !== "All";

  return (
    <div className="space-y-3">
      {/* Top Search and Dropdowns Row */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8C909B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search customers..."
            className="w-full rounded-2xl border border-[#CBD5E1] bg-white py-2.5 pl-10 pr-4 text-xs text-[#0F152A] placeholder:text-[#94A3B8] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>

        {/* Dropdowns + Meta */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* SIM Type */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-[#475569]">
            <span className="text-[#8C909B]">SIM Type:</span>
            <select
              value={simTypeFilter}
              onChange={(e) => onSimTypeFilterChange(e.target.value)}
              className="bg-transparent font-bold text-[#0F152A] focus:outline-hidden cursor-pointer"
            >
              <option value="All">All</option>
              <option value="POS">POS</option>
              <option value="CCTV">CCTV</option>
              <option value="GPS">GPS</option>
              <option value="Router">Router</option>
            </select>
          </div>

          {/* Network */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-[#475569]">
            <span className="text-[#8C909B]">Network:</span>
            <select
              value={networkFilter}
              onChange={(e) => onNetworkFilterChange(e.target.value)}
              className="bg-transparent font-bold text-[#0F152A] focus:outline-hidden cursor-pointer"
            >
              <option value="All">All</option>
              <option value="MTN">MTN</option>
              <option value="Airtel">Airtel</option>
              <option value="Glo">Glo</option>
              <option value="T2">T2</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-[#475569]">
            <span className="text-[#8C909B]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-transparent font-bold text-[#0F152A] focus:outline-hidden cursor-pointer"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Name">Name A–Z</option>
              <option value="Expiry">Expiry Date</option>
            </select>
          </div>

          <span className="text-xs text-[#8C909B] ml-1">
            Showing 1–{visibleCount} of {totalCount}
          </span>
        </div>
      </div>

      {/* Filter Chips Row */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 pt-1 text-xs">
          {simTypeFilter !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[11px] font-bold text-[#2563EB]">
              SIM: {simTypeFilter}
              <button
                type="button"
                onClick={() => onSimTypeFilterChange("All")}
                className="hover:text-blue-800"
              >
                <X className="size-3" />
              </button>
            </span>
          )}

          {networkFilter !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFFBEB] px-2.5 py-1 text-[11px] font-bold text-[#854D0E]">
              Net: {networkFilter}
              <button
                type="button"
                onClick={() => onNetworkFilterChange("All")}
                className="hover:text-amber-900"
              >
                <X className="size-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onClearAllFilters}
            className="text-xs font-bold text-[#2563EB] hover:underline ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
