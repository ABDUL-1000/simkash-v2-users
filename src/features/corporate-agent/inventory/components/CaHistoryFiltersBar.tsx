import { Search, ChevronDown, X } from "lucide-react";

interface CaHistoryFiltersBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedEvent: string;
  onSelectEvent: (e: string) => void;
  selectedType: string;
  onSelectType: (t: string) => void;
  selectedAp: string;
  onSelectAp: (ap: string) => void;
  totalEvents?: number;
  onExportReport?: () => void;
}

export function CaHistoryFiltersBar({
  searchQuery,
  onSearchChange,
  selectedEvent,
  onSelectEvent,
  selectedType,
  onSelectType,
  selectedAp,
  onSelectAp,
  totalEvents = 87,
  onExportReport,
}: CaHistoryFiltersBarProps) {
  const events = ["All Events", "Received", "Distributed", "Returned", "Adjusted"];
  const types = ["All Types", "POS SIM", "CCTV SIM", "GPS SIM", "Router SIM"];
  const aps = [
    "All APs",
    "Francis Udom",
    "Rabiu Sani",
    "Abubakar Sule",
    "Chioma Eze",
    "Hassan Ibrahim",
    "Seun Ola",
    "Kola Ibrahim",
  ];

  return (
    <div className="space-y-3">
      {/* SEARCH BAR & EXPORT BUTTON */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by AP name, SIM type, ref..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white outline-none focus:border-blue-500 placeholder:text-slate-400"
          />
        </div>

        {onExportReport && (
          <button
            type="button"
            onClick={onExportReport}
            className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center gap-1.5 shrink-0 shadow-2xs transition-all"
          >
            <span>Export Report</span>
          </button>
        )}
      </div>

      {/* MULTI-DROPDOWN FILTERS */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Events Dropdown */}
          <select
            value={selectedEvent}
            onChange={(e) => onSelectEvent(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 outline-none hover:bg-slate-50 cursor-pointer"
          >
            {events.map((ev) => (
              <option key={ev} value={ev}>
                {ev}
              </option>
            ))}
          </select>

          {/* SIM Types Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => onSelectType(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 outline-none hover:bg-slate-50 cursor-pointer"
          >
            {types.map((tp) => (
              <option key={tp} value={tp}>
                {tp}
              </option>
            ))}
          </select>

          {/* APs Dropdown */}
          <select
            value={selectedAp}
            onChange={(e) => onSelectAp(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 outline-none hover:bg-slate-50 cursor-pointer"
          >
            {aps.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          {/* Sort */}
          <button
            type="button"
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 flex items-center gap-1 hover:bg-slate-50"
          >
            <span>Newest First</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* ACTIVE FILTER CHIPS & COUNT */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
            <span>This Month</span>
            <X className="w-3 h-3 cursor-pointer hover:text-blue-900" />
          </div>

          <button
            type="button"
            onClick={() => {
              onSearchChange("");
              onSelectEvent("All Events");
              onSelectType("All Types");
              onSelectAp("All APs");
            }}
            className="text-[11px] font-bold text-slate-400 hover:text-slate-600"
          >
            Clear all
          </button>

          <span className="text-[11px] text-slate-400 font-medium pl-2 hidden sm:inline">
            Showing 1–15 of {totalEvents} events
          </span>
        </div>
      </div>
    </div>
  );
}
