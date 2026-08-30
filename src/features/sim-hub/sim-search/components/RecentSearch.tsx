import { ArrowRight } from "lucide-react";
import { NETWORK_COLORS } from "@/constants/colors";

export type RecentSearchEntry = {
  id: string;
  simNumber: string;
  network: keyof typeof NETWORK_COLORS;
  simType: string;
  timeAgo: string;
};

const DUMMY_RECENT_SEARCHES: RecentSearchEntry[] = [
  { id: "1", simNumber: "08012345678", network: "mtn", simType: "POS SIM", timeAgo: "3 hours ago" },
  { id: "2", simNumber: "07087654321", network: "airtel", simType: "Data SIM", timeAgo: "Yesterday · 2:30 PM" },
  { id: "3", simNumber: "09011223344", network: "glo", simType: "Voice SIM", timeAgo: "2 days ago" },
];

type RecentSearchesProps = {
  searches?: RecentSearchEntry[];
  onViewAll?: () => void;
  onSelect?: (entry: RecentSearchEntry) => void;
};

export function RecentSearches({
  searches = DUMMY_RECENT_SEARCHES,
  onViewAll,
  onSelect,
}: RecentSearchesProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 sm:p-6" style={{ borderColor: "#E2ECF8" }}>
      <div className="mb-4 flex items-center justify-between border-b pb-4" style={{ borderColor: "#E2ECF8" }}>
        <p className="text-sm font-semibold" style={{ color: "#0F1F36" }}>
          Recent Searches
        </p>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-[13px] font-medium hover:underline"
          style={{ color: "#2563EB" }}
        >
          View all <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {searches.map((entry) => {
          const networkColor = NETWORK_COLORS[entry.network];
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSelect?.(entry)}
              className="group relative rounded-xl border p-4 text-left transition-colors hover:bg-white"
              style={{ backgroundColor: "#F8FAFC", borderColor: "#E2ECF8" }}
            >
              <p className="text-xs font-bold" style={{ color: "#0F1F36" }}>
                {entry.simNumber}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className="rounded-md px-2 py-0.5 text-[11px] font-bold"
                  style={{ backgroundColor: networkColor.bg, color: networkColor.text }}
                >
                  {entry.network.toUpperCase()}
                </span>
                <span className="text-[11px]" style={{ color: "#64748B" }}>
                  {entry.simType}
                </span>
              </div>

              <p className="mt-2 text-[10px]" style={{ color: "#94A3B8" }}>
                {entry.timeAgo}
              </p>

              <ArrowRight
                className="absolute right-4 top-1/2 size-4 -translate-y-1/2 opacity-60 transition-opacity group-hover:opacity-100"
                style={{ color: "#94A3B8" }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}