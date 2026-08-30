import { Select, Input } from "antd";
import { Search } from "lucide-react";
import type { RenewalFilters, RenewalTabCounts, UrgencyLevel } from "@/types/renewal.types";
import { RENEWAL_STAT_COLORS } from "@/constants/colors";

const SIM_TYPE_OPTIONS = [
  { label: "All SIM Types", value: "all" },
  { label: "POS SIM", value: "pos" },
  { label: "CCTV SIM", value: "cctv" },
  { label: "GPS SIM", value: "gps" },
  { label: "Router SIM", value: "router" },
];

const NETWORK_OPTIONS = [
  { label: "All Networks", value: "all" },
  { label: "MTN", value: "mtn" },
  { label: "Airtel", value: "airtel" },
  { label: "Glo", value: "glo" },
  { label: "T2", value: "t2" },
];

const ROLE_OPTIONS = [
  { label: "All Roles", value: "all" },
  { label: "Agency Partner", value: "agency" },
  { label: "Corporate Agent", value: "corporate" },
];

const USAGE_ALERT_OPTIONS = [
  { label: "Usage Alert", value: "all" },
  { label: "≥ 90% used", value: "90" },
  { label: "≥ 75% used", value: "75" },
];

type RenewalFilterBarProps = {
  filters: RenewalFilters;
  onFiltersChange: (filters: RenewalFilters) => void;
  counts: RenewalTabCounts;
};

export function RenewalFilterBar({ filters, onFiltersChange, counts }: RenewalFilterBarProps) {
  function update<K extends keyof RenewalFilters>(key: K, value: RenewalFilters[K]) {
    onFiltersChange({ ...filters, [key]: value });
  }

  const tabs: { id: RenewalFilters["tab"]; label: string; count: number }[] = [
    { id: "all", label: "All", count: counts.all },
    { id: "critical", label: "Critical", count: counts.critical },
    { id: "warning", label: "Warning", count: counts.warning },
    { id: "watch", label: "Watch", count: counts.watch },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const active = filters.tab === tab.id;
            const tone = tab.id !== "all" ? RENEWAL_STAT_COLORS[tab.id as UrgencyLevel] : undefined;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => update("tab", tab.id)}
                className="rounded-lg px-4 py-2 text-sm font-bold transition-colors"
                style={
                  active
                    ? { backgroundColor: "#0F1F36", color: "#FFFFFF" }
                    : { backgroundColor: tone ? tone.bg : "#F8FAFC", color: tone ? tone.value : "#64748B" }
                }
              >
                {tab.label} ({tab.count.toLocaleString()})
              </button>
            );
          })}
        </div>

        <Select
          className="min-w-[140px]"
          options={SIM_TYPE_OPTIONS}
          value={filters.simType ?? "all"}
          onChange={(v) => update("simType", v)}
        />
        <Select
          className="min-w-[140px]"
          options={NETWORK_OPTIONS}
          value={filters.network ?? "all"}
          onChange={(v) => update("network", v)}
        />
        <Select
          className="min-w-[120px]"
          options={ROLE_OPTIONS}
          value={filters.role ?? "all"}
          onChange={(v) => update("role", v)}
        />
        <Select
          className="min-w-[140px]"
          options={USAGE_ALERT_OPTIONS}
          value={filters.usageAlert ?? "all"}
          onChange={(v) => update("usageAlert", v)}
        />
      </div>

      <Input
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        placeholder="Search customer name, phone, SIM number, agent..."
        prefix={<Search className="size-4 text-[#94A3B8]" />}
      />
    </div>
  );
}