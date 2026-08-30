import { Search } from "lucide-react";

export type ZeroLimitTab = "all" | "active" | "low_data" | "exhausted" | "inactive";

type ZeroLimitTableFilterProps = {
  activeTab: ZeroLimitTab;
  onTabChange: (tab: ZeroLimitTab) => void;
  search: string;
  onSearchChange: (val: string) => void;
  network: string;
  onNetworkChange: (val: string) => void;
  pkg: string;
  onPackageChange: (val: string) => void;
  agent: string;
  onAgentChange: (val: string) => void;
};

const TABS: { id: ZeroLimitTab; label: string; count: string }[] = [
  { id: "all", label: "All", count: "2,847" },
  { id: "active", label: "Active", count: "2,401" },
  { id: "low_data", label: "Low Data (≤20%)", count: "82" },
  { id: "exhausted", label: "Data Exhausted", count: "124" },
  { id: "inactive", label: "Inactive", count: "47" },
];

export function ZeroLimitTableFilter({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
  network,
  onNetworkChange,
  pkg,
  onPackageChange,
  agent,
  onAgentChange,
}: ZeroLimitTableFilterProps) {
  return (
    <div className="space-y-4">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[11px] ${
                  isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                }`}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Select Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-3 min-w-[280px]">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-3 size-4 text-[#94A3B8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search SIMs..."
              className="w-full rounded-xl border border-[#E2ECF8] bg-white pl-10 pr-3.5 py-2 text-xs sm:text-sm font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <select
            value={network}
            onChange={(e) => onNetworkChange(e.target.value)}
            className="rounded-xl border border-[#E2ECF8] bg-white px-3 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="all">Network ▾</option>
            <option value="mtn">MTN</option>
            <option value="airtel">Airtel</option>
            <option value="glo">Glo</option>
            <option value="9mobile">9mobile</option>
          </select>

          <select
            value={pkg}
            onChange={(e) => onPackageChange(e.target.value)}
            className="rounded-xl border border-[#E2ECF8] bg-white px-3 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="all">Package ▾</option>
            <option value="10gb">10GB Standard</option>
            <option value="20gb">20GB Premium</option>
            <option value="5gb">5GB Basic</option>
          </select>

          <select
            value={agent}
            onChange={(e) => onAgentChange(e.target.value)}
            className="rounded-xl border border-[#E2ECF8] bg-white px-3 py-2 text-xs font-semibold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="all">Agent ▾</option>
            <option value="rabiu">Rabiu Sani</option>
            <option value="fatima">Fatima Yusuf</option>
            <option value="ibrahim">Ibrahim Musa</option>
          </select>
        </div>

        <span className="text-xs font-semibold text-[#64748B]">2,847 SIMs</span>
      </div>
    </div>
  );
}
