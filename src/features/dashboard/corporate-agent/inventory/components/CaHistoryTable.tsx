import { ChevronLeft, ChevronRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_HISTORY_EVENTS_DATA } from "../data/ca-inventory.data";
import type { CaHistoryEventItem } from "../types/ca-inventory.types";

interface CaHistoryTableProps {
  onSelectEvent?: (event: CaHistoryEventItem) => void;
  filterQuery?: string;
  filterEventType?: string;
  filterSimType?: string;
}

export function CaHistoryTable({
  onSelectEvent,
  filterQuery = "",
  filterEventType = "All Events",
  filterSimType = "All Types",
}: CaHistoryTableProps) {
  const getEventBadge = (type: CaHistoryEventItem["eventType"]) => {
    switch (type) {
      case "Received":
        return { bg: "#ECFDF5", color: "#059669" };
      case "Distributed":
        return { bg: "#EFF6FF", color: "#2563EB" };
      case "Returned":
        return { bg: "#FEF3C7", color: "#D97706" };
      case "Adjusted":
      default:
        return { bg: "#F1F5F9", color: "#475569" };
    }
  };

  const filteredEvents = CA_HISTORY_EVENTS_DATA.filter((item) => {
    if (filterEventType !== "All Events" && item.eventType !== filterEventType) {
      return false;
    }
    if (filterSimType !== "All Types" && item.simType !== filterSimType) {
      return false;
    }
    if (filterQuery) {
      const q = filterQuery.toLowerCase();
      return (
        item.fromTo.toLowerCase().includes(q) ||
        item.simType.toLowerCase().includes(q) ||
        item.ref.toLowerCase().includes(q) ||
        item.network.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Groups
  const groups: ("TODAY" | "YESTERDAY" | "THIS WEEK" | "EARLIER")[] = [
    "TODAY",
    "YESTERDAY",
    "THIS WEEK",
    "EARLIER",
  ];

  return (
    <div
      className="rounded-2xl border bg-white shadow-xs overflow-hidden"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              className="bg-slate-50/70 border-b text-[10px] uppercase font-black tracking-wider text-slate-400"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <th className="py-2.5 px-4">Date</th>
              <th className="py-2.5 px-3">Event</th>
              <th className="py-2.5 px-3">SIM Type</th>
              <th className="py-2.5 px-3">Network</th>
              <th className="py-2.5 px-3 text-center">Qty</th>
              <th className="py-2.5 px-3">From/To</th>
              <th className="py-2.5 px-3">Running Total</th>
              <th className="py-2.5 px-4">Ref</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
            {groups.map((group) => {
              const itemsInGroup = filteredEvents.filter(
                (item) => item.periodGroup.toUpperCase() === group
              );
              if (itemsInGroup.length === 0) return null;

              return (
                <tr key={group} className="contents">
                  {/* Group Header Row */}
                  <tr className="bg-slate-100/50">
                    <td
                      colSpan={8}
                      className="py-1.5 px-4 font-black text-[10px] tracking-wider text-slate-500 uppercase"
                    >
                      {group}
                    </td>
                  </tr>

                  {/* Group Items */}
                  {itemsInGroup.map((item) => {
                    const badge = getEventBadge(item.eventType);
                    const isPositive = item.qty > 0;

                    return (
                      <tr
                        key={item.id}
                        onClick={() => onSelectEvent?.(item)}
                        className="hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <td className="py-3 px-4 text-slate-600 font-medium whitespace-nowrap">
                          {item.timeLabel}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-black"
                            style={{
                              backgroundColor: badge.bg,
                              color: badge.color,
                            }}
                          >
                            {item.eventType}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                          {item.simType}
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-medium">
                          {item.network}
                        </td>
                        <td
                          className={`py-3 px-3 text-center font-black ${
                            isPositive ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {isPositive ? `+${item.qty}` : item.qty}
                        </td>
                        <td className="py-3 px-3 text-slate-700 font-medium truncate max-w-[200px]">
                          {item.fromTo}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                          {item.runningTotal}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-400 truncate max-w-[140px]">
                          {item.ref}
                        </td>
                      </tr>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div
        className="p-3.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-slate-50/50"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <span className="text-[11px] text-slate-400 font-medium">
          Showing 1–15 of 87 events
        </span>

        <div className="flex items-center gap-1.5 self-center sm:self-auto">
          <button
            type="button"
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <button
            type="button"
            className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs"
          >
            1
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50"
          >
            2
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50"
          >
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50"
          >
            6
          </button>

          <button
            type="button"
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
