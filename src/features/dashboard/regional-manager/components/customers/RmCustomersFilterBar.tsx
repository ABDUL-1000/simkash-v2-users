import { Search, ChevronDown } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export type ScFilterStatus = "all" | "active" | "at_risk" | "suspended" | "pending";

interface RmCustomersFilterBarProps {
  currentFilter: ScFilterStatus;
  onFilterChange: (filter: ScFilterStatus) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  counts: {
    all: number;
    active: number;
    at_risk: number;
    suspended: number;
    pending: number;
  };
}

export function RmCustomersFilterBar({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  counts,
}: RmCustomersFilterBarProps) {
  const filterTabs: { key: ScFilterStatus; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "active", label: "Active", count: counts.active },
    { key: "at_risk", label: "At Risk", count: counts.at_risk },
    { key: "suspended", label: "Suspended", count: counts.suspended },
    { key: "pending", label: "Pending", count: counts.pending },
  ];

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
        {filterTabs.map((tab) => {
          const isSelected = currentFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onFilterChange(tab.key)}
              className="rounded-full px-3.5 py-1.5 text-xs font-bold transition cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: isSelected
                  ? APP_COLORS.blues.primary
                  : APP_COLORS.backgrounds.background,
                color: isSelected
                  ? APP_COLORS.texts.whiteFixed
                  : APP_COLORS.texts.slate,
                border: `1px solid ${
                  isSelected ? APP_COLORS.blues.primary : APP_COLORS.greys.stroke
                }`,
              }}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

      {/* Sort & Search Inputs */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        {/* Sort Dropdown */}
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full appearance-none rounded-xl border bg-white py-2 pl-3.5 pr-8 text-xs font-semibold cursor-pointer focus:outline-hidden"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              color: APP_COLORS.texts.primary,
            }}
          >
            <option value="activations">Sort by: Activations</option>
            <option value="name">Sort by: Name</option>
            <option value="state">Sort by: State</option>
            <option value="stock">Sort by: Stock</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5"
            style={{ color: APP_COLORS.texts.slate }}
          />
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5"
            style={{ color: APP_COLORS.texts.slate }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search SC by name, state, phone..."
            className="w-full rounded-xl border py-2 pl-8.5 pr-3 text-xs focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RmCustomersFilterBar;
