import { Search, ChevronDown, User, X } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type {
  NetworkViewTab,
  TimeframeFilter,
  ScNetworkBreakdownItem,
} from "../../types/regional-manager-network.types";

interface RmNetworkFilterBarProps {
  activeTab: NetworkViewTab;
  onTabChange: (tab: NetworkViewTab) => void;
  // Filters
  searchQuery: string;
  onSearchChange: (q: string) => void;
  timeframe: TimeframeFilter;
  onTimeframeChange: (tf: TimeframeFilter) => void;
  // Dropdowns for feed view
  selectedScFilter: string;
  onScFilterChange: (val: string) => void;
  selectedApFilter: string;
  onApFilterChange: (val: string) => void;
  selectedTypeFilter: string;
  onTypeFilterChange: (val: string) => void;
  selectedNetworkFilter: string;
  onNetworkFilterChange: (val: string) => void;
  selectedStatusFilter: string;
  onStatusFilterChange: (val: string) => void;
  // SC drilldown in "By AP" view
  selectedScForApView?: ScNetworkBreakdownItem | null;
  onSelectScForApView?: (sc: ScNetworkBreakdownItem | null) => void;
  allScs?: ScNetworkBreakdownItem[];
}

export function RmNetworkFilterBar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  timeframe,
  onTimeframeChange,
  selectedScFilter,
  onScFilterChange,
  selectedApFilter,
  onApFilterChange,
  selectedTypeFilter,
  onTypeFilterChange,
  selectedNetworkFilter,
  onNetworkFilterChange,
  selectedStatusFilter,
  onStatusFilterChange,
  selectedScForApView,
  onSelectScForApView,
  allScs = [],
}: RmNetworkFilterBarProps) {
  const tabs: { id: NetworkViewTab; label: string }[] = [
    { id: "activation", label: "By Activation" },
    { id: "sc", label: "By SC" },
    { id: "ap", label: "By AP" },
    { id: "sim_type", label: "By SIM Type" },
  ];

  const timeframes: TimeframeFilter[] = ["Today", "This Week", "This Month", "Custom"];

  return (
    <div className="space-y-3">
      {/* 1. TOP ROW: TAB SWITCHER & DATE PILLS */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* View Tabs */}
        <div
          className="inline-flex rounded-2xl border p-1 self-start shadow-2xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className="rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? APP_COLORS.blues.interactiveCta
                    : "transparent",
                  color: isSelected
                    ? APP_COLORS.texts.whiteFixed
                    : APP_COLORS.texts.slate,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Date Timeframe Pills (Desktop) / Select (Mobile) */}
        <div className="hidden sm:flex items-center gap-1.5">
          {timeframes.map((tf) => {
            const isSelected = timeframe === tf;
            return (
              <button
                key={tf}
                type="button"
                onClick={() => onTimeframeChange(tf)}
                className="rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer"
                style={{
                  backgroundColor: isSelected
                    ? APP_COLORS.blues.surfaceLight
                    : "transparent",
                  color: isSelected
                    ? APP_COLORS.blues.interactiveCta
                    : APP_COLORS.texts.slate,
                  border: `1px solid ${
                    isSelected ? APP_COLORS.blues.interactiveCta : "transparent"
                  }`,
                }}
              >
                {tf}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SPECIFIC CONTROLS FOR EACH TAB */}
      {activeTab === "activation" && (
        <div className="space-y-2.5">
          {/* Filter Pills row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* SC Filter */}
            <div className="relative">
              <select
                value={selectedScFilter}
                onChange={(e) => onScFilterChange(e.target.value)}
                className="appearance-none rounded-xl border bg-white px-3 py-1.5 pr-7 text-xs font-semibold focus:outline-hidden transition cursor-pointer"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  color: APP_COLORS.texts.primary,
                }}
              >
                <option value="All">All SCs</option>
                {allScs.map((sc) => (
                  <option key={sc.id} value={sc.name}>
                    {sc.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3.5"
                style={{ color: APP_COLORS.texts.slate }}
              />
            </div>

            {/* AP Filter */}
            <div className="relative">
              <select
                value={selectedApFilter}
                onChange={(e) => onApFilterChange(e.target.value)}
                className="appearance-none rounded-xl border bg-white px-3 py-1.5 pr-7 text-xs font-semibold focus:outline-hidden transition cursor-pointer"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  color: APP_COLORS.texts.primary,
                }}
              >
                <option value="All">All APs</option>
                <option value="Rabiu Sani">Rabiu Sani</option>
                <option value="Chioma Eze">Chioma Eze</option>
                <option value="Hassan Ibrahim">Hassan Ibrahim</option>
                <option value="Emeka Obi">Emeka Obi</option>
                <option value="Abubakar Sule">Abubakar Sule</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3.5"
                style={{ color: APP_COLORS.texts.slate }}
              />
            </div>

            {/* Types Filter */}
            <div className="relative">
              <select
                value={selectedTypeFilter}
                onChange={(e) => onTypeFilterChange(e.target.value)}
                className="appearance-none rounded-xl border bg-white px-3 py-1.5 pr-7 text-xs font-semibold focus:outline-hidden transition cursor-pointer"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  color: APP_COLORS.texts.primary,
                }}
              >
                <option value="All">All Types</option>
                <option value="POS SIM">POS SIM</option>
                <option value="CCTV SIM">CCTV SIM</option>
                <option value="GPS SIM">GPS SIM</option>
                <option value="Router SIM">Router SIM</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3.5"
                style={{ color: APP_COLORS.texts.slate }}
              />
            </div>

            {/* Networks Filter */}
            <div className="relative">
              <select
                value={selectedNetworkFilter}
                onChange={(e) => onNetworkFilterChange(e.target.value)}
                className="appearance-none rounded-xl border bg-white px-3 py-1.5 pr-7 text-xs font-semibold focus:outline-hidden transition cursor-pointer"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  color: APP_COLORS.texts.primary,
                }}
              >
                <option value="All">All Networks</option>
                <option value="MTN">MTN</option>
                <option value="Airtel">Airtel</option>
                <option value="Glo">Glo</option>
                <option value="9mobile">9mobile</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3.5"
                style={{ color: APP_COLORS.texts.slate }}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="appearance-none rounded-xl border bg-white px-3 py-1.5 pr-7 text-xs font-semibold focus:outline-hidden transition cursor-pointer"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  color: APP_COLORS.texts.primary,
                }}
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3.5"
                style={{ color: APP_COLORS.texts.slate }}
              />
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
              style={{ color: APP_COLORS.texts.slate }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by SIM number, AP name, SC name, customer name..."
              className="w-full rounded-2xl border py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-hidden transition"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.background,
                color: APP_COLORS.texts.primary,
              }}
            />
          </div>
        </div>
      )}

      {/* If "By SC" view */}
      {activeTab === "sc" && (
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
              style={{ color: APP_COLORS.texts.slate }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search SC by name, state..."
              className="w-full rounded-2xl border py-2 pl-10 pr-4 text-xs font-medium focus:outline-hidden transition"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.background,
                color: APP_COLORS.texts.primary,
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={timeframe}
                onChange={(e) => onTimeframeChange(e.target.value as any)}
                className="appearance-none rounded-xl border bg-white px-3 py-1.5 pr-7 text-xs font-bold focus:outline-hidden transition cursor-pointer"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  color: APP_COLORS.texts.primary,
                }}
              >
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3.5"
                style={{ color: APP_COLORS.texts.slate }}
              />
            </div>
          </div>
        </div>
      )}

      {/* If "By AP" view (Image 3) */}
      {activeTab === "ap" && (
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* SC Selection Picker */}
            <div className="relative">
              <select
                value={selectedScForApView?.name || (allScs[0]?.name ?? "Aminat Okafor")}
                onChange={(e) => {
                  const sc = allScs.find((s) => s.name === e.target.value);
                  onSelectScForApView?.(sc || null);
                }}
                className="appearance-none rounded-xl border bg-white pl-8 pr-7 py-1.5 text-xs font-bold focus:outline-hidden transition cursor-pointer"
                style={{
                  borderColor: APP_COLORS.blues.interactiveCta,
                  color: APP_COLORS.blues.interactiveCta,
                  backgroundColor: APP_COLORS.blues.surfaceLight,
                }}
              >
                {allScs.map((sc) => (
                  <option key={sc.id} value={sc.name}>
                    {sc.name} ({sc.state})
                  </option>
                ))}
              </select>
              <User
                className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5"
                style={{ color: APP_COLORS.blues.interactiveCta }}
              />
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3.5"
                style={{ color: APP_COLORS.blues.interactiveCta }}
              />
            </div>

            {/* Selected SC Tag Badge with X */}
            {selectedScForApView && (
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  backgroundColor: APP_COLORS.blues.surfaceLight,
                  color: APP_COLORS.blues.interactiveCta,
                }}
              >
                <span>SC: {selectedScForApView.name}</span>
                <button
                  type="button"
                  onClick={() => onSelectScForApView?.(null)}
                  className="hover:opacity-75 cursor-pointer"
                >
                  <X className="size-3" />
                </button>
              </div>
            )}

            {/* Timeframe selector */}
            <div className="relative ml-auto">
              <select
                value={timeframe}
                onChange={(e) => onTimeframeChange(e.target.value as any)}
                className="appearance-none rounded-xl border bg-white px-3 py-1.5 pr-7 text-xs font-bold focus:outline-hidden transition cursor-pointer"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  color: APP_COLORS.texts.primary,
                }}
              >
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3.5"
                style={{ color: APP_COLORS.texts.slate }}
              />
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
              style={{ color: APP_COLORS.texts.slate }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search AP name, location..."
              className="w-full rounded-2xl border py-2.5 pl-10 pr-4 text-xs font-medium focus:outline-hidden transition"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.background,
                color: APP_COLORS.texts.primary,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RmNetworkFilterBar;
