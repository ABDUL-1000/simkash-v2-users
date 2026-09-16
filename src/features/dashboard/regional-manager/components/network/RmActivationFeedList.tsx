import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { RmActivationCard } from "./RmActivationCard";
import type { NetworkActivationItem } from "../../types/regional-manager-network.types";

interface RmActivationFeedListProps {
  activations: NetworkActivationItem[];
  onSelectActivation: (item: NetworkActivationItem) => void;
}

export function RmActivationFeedList({
  activations,
  onSelectActivation,
}: RmActivationFeedListProps) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Group by Today vs Earlier
  const todayItems = activations.filter((a) => a.isToday);
  const earlierItems = activations.filter((a) => !a.isToday);

  return (
    <div className="space-y-4">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <h2
          className="text-xs sm:text-sm font-bold tracking-tight"
          style={{ color: APP_COLORS.texts.primary }}
        >
          {activations.length} activations today
        </h2>

        {/* Sort Selector */}
        <div className="relative">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="appearance-none rounded-xl border bg-white px-3 py-1.5 pr-7 text-xs font-semibold focus:outline-hidden transition cursor-pointer"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              color: APP_COLORS.texts.slate,
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-3.5"
            style={{ color: APP_COLORS.texts.slate }}
          />
        </div>
      </div>

      {/* TODAY SECTION */}
      <div className="space-y-2.5">
        <div
          className="text-[11px] font-black tracking-wider uppercase px-1"
          style={{ color: APP_COLORS.texts.slate }}
        >
          Today
        </div>

        {todayItems.length === 0 ? (
          <div
            className="rounded-2xl border p-8 text-center"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
            }}
          >
            <p className="text-xs font-bold" style={{ color: APP_COLORS.texts.primary }}>
              No activations found matching your filters
            </p>
            <p className="text-[11px] mt-1" style={{ color: APP_COLORS.texts.slate }}>
              Try adjusting your filter selection or search query.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {todayItems.map((item) => (
              <RmActivationCard
                key={item.id}
                activation={item}
                onClick={onSelectActivation}
              />
            ))}
          </div>
        )}
      </div>

      {/* YESTERDAY SECTION */}
      {earlierItems.length > 0 && (
        <div className="space-y-2.5 pt-2">
          <div
            className="text-[11px] font-bold tracking-wider uppercase px-1"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Yesterday (truncated — scroll to load more)
          </div>
          <div className="space-y-2.5">
            {earlierItems.map((item) => (
              <RmActivationCard
                key={item.id}
                activation={item}
                onClick={onSelectActivation}
              />
            ))}
          </div>
        </div>
      )}

      {/* PAGINATION & LOAD MORE FOOTER */}
      <div
        className="pt-4 border-t space-y-3"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        {/* Numbered pagination */}
        <div className="flex items-center justify-center gap-1.5 text-xs">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-semibold transition hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
            style={{ color: APP_COLORS.texts.slate }}
          >
            <ChevronLeft className="size-3.5" />
            <span>Prev</span>
          </button>

          {[1, 2, 3].map((page) => {
            const isSelected = currentPage === page;
            return (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className="size-8 rounded-lg font-bold transition cursor-pointer text-center"
                style={{
                  backgroundColor: isSelected ? APP_COLORS.texts.primary : "transparent",
                  color: isSelected ? APP_COLORS.texts.whiteFixed : APP_COLORS.texts.slate,
                }}
              >
                {page}
              </button>
            );
          })}

          <span className="px-1 text-slate-400">...</span>

          <button
            type="button"
            onClick={() => setCurrentPage(6)}
            className="size-8 rounded-lg font-bold transition cursor-pointer text-center"
            style={{ color: APP_COLORS.texts.slate }}
          >
            6
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(6, p + 1))}
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-semibold transition hover:bg-slate-100 cursor-pointer"
            style={{ color: APP_COLORS.texts.slate }}
          >
            <span>Next</span>
            <ChevronRight className="size-3.5" />
          </button>
        </div>

        {/* Count and Load More Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span style={{ color: APP_COLORS.texts.slate }}>
            Showing 1–15 of {activations.length} activations today
          </span>

          <button
            type="button"
            className="rounded-xl border px-4 py-2 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              color: APP_COLORS.texts.primary,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}

export default RmActivationFeedList;
