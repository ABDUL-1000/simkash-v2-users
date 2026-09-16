import { APP_COLORS } from "@/constants/colors";
import { ChevronDown } from "lucide-react";

interface CaPendingFilterBarProps {
  activeFilter: "all" | "verifying" | "processing" | "stuck";
  onFilterChange: (filter: "all" | "verifying" | "processing" | "stuck") => void;
  counts: {
    all: number;
    verifying: number;
    processing: number;
    stuck: number;
  };
  sortOrder: "oldest" | "newest";
  onSortOrderChange: (order: "oldest" | "newest") => void;
}

export function CaPendingFilterBar({
  activeFilter,
  onFilterChange,
  counts,
  sortOrder,
  onSortOrderChange,
}: CaPendingFilterBarProps) {
  const tabs = [
    { id: "all", label: "All", count: counts.all },
    { id: "verifying", label: "Verifying", count: counts.verifying },
    { id: "processing", label: "Processing", count: counts.processing },
    { id: "stuck", label: "Stuck", count: counts.stuck },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isSelected = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onFilterChange(tab.id as any)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              style={{
                backgroundColor: isSelected
                  ? APP_COLORS.blues.interactiveCta
                  : APP_COLORS.backgrounds.background,
                color: isSelected ? "#FFFFFF" : APP_COLORS.texts.slate,
                border: `1px solid ${
                  isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.greys.stroke
                }`,
              }}
            >
              <span>{tab.label}</span>
              <span
                className="size-4 rounded-full flex items-center justify-center text-[10px] font-black"
                style={{
                  backgroundColor: isSelected ? "rgba(255,255,255,0.25)" : "#F1F5F9",
                  color: isSelected ? "#FFFFFF" : APP_COLORS.texts.slate,
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Auto-refresh indicator & Sort dropdown */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-500">
          <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Auto-refreshing every 15s</span>
        </div>

        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as any)}
            className="appearance-none bg-white border rounded-xl px-3 py-1.5 pr-7 text-xs font-bold text-slate-700 outline-hidden cursor-pointer shadow-2xs"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <option value="oldest">Oldest First</option>
            <option value="newest">Newest First</option>
          </select>
          <ChevronDown className="size-3 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
