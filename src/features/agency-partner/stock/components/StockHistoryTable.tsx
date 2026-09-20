import { Info } from "lucide-react";
import type { StockEventItem } from "../types/stock.types";

interface StockHistoryTableProps {
  events: StockEventItem[];
  onViewEvent: (event: StockEventItem) => void;
}

export function StockHistoryTable({ events, onViewEvent }: StockHistoryTableProps) {
  // Group events by dateGroup
  const groups: Array<"TODAY" | "YESTERDAY" | "THIS WEEK" | "EARLIER THIS MONTH"> = [
    "TODAY",
    "YESTERDAY",
    "THIS WEEK",
    "EARLIER THIS MONTH",
  ];

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E2ECF6] bg-[#F8FAFC] text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              <th className="py-3 px-4 sm:px-6">Date</th>
              <th className="py-3 px-4">Event</th>
              <th className="py-3 px-4">SIM Type</th>
              <th className="py-3 px-4">Network</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">From/To</th>
              <th className="py-3 px-4">Running Total</th>
              <th className="py-3 px-4">Ref</th>
              <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {groups.map((group) => {
              const groupEvents = events.filter((e) => e.dateGroup === group);
              if (groupEvents.length === 0) return null;

              return (
                <tr key={group} className="contents">
                  {/* Group Header Row */}
                  <tr className="bg-[#F8FAFC]/70 border-b border-[#E2ECF6]/60">
                    <td
                      colSpan={9}
                      className="py-2 px-4 sm:px-6 text-[10px] font-black tracking-wider text-[#8C909B]"
                    >
                      {group}
                    </td>
                  </tr>

                  {/* Group Events */}
                  {groupEvents.map((evt) => {
                    const isPositive = evt.quantity > 0;
                    const isReceived = evt.eventType === "Received";
                    const isUsed = evt.eventType === "Used";

                    return (
                      <tr
                        key={evt.id}
                        className="transition hover:bg-[#F8FAFC] text-[#0F152A]"
                      >
                        {/* Date */}
                        <td className="py-3 px-4 sm:px-6 font-medium text-[#475569] whitespace-nowrap">
                          {evt.date}
                        </td>

                        {/* Event Badge */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              isReceived
                                ? "bg-[#EBFFF8] text-[#10B981]"
                                : isUsed
                                ? "bg-[#EFF6FF] text-[#2563EB]"
                                : "bg-[#F1F5F9] text-[#64748B]"
                            }`}
                          >
                            {evt.eventType}
                          </span>
                        </td>

                        {/* SIM Type Badge */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                            {evt.simType}
                          </span>
                        </td>

                        {/* Network Badge */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-black ${
                              evt.network === "MTN"
                                ? "bg-[#FFFBEB] text-[#854D0E]"
                                : evt.network === "Airtel"
                                ? "bg-[#FFF1F2] text-[#991B1B]"
                                : evt.network === "Glo"
                                ? "bg-[#F0FDF4] text-[#065F46]"
                                : "bg-[#ECFDF5] text-[#047857]"
                            }`}
                          >
                            {evt.network}
                          </span>
                        </td>

                        {/* Quantity */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`font-black ${
                              isPositive ? "text-[#10B981]" : "text-[#EF4444]"
                            }`}
                          >
                            {isPositive ? `+${evt.quantity}` : evt.quantity}
                          </span>
                        </td>

                        {/* From/To */}
                        <td className="py-3 px-4 font-medium text-[#475569] whitespace-nowrap">
                          {evt.fromTo}
                        </td>

                        {/* Running Total */}
                        <td className="py-3 px-4 font-semibold text-[#0F152A] whitespace-nowrap">
                          {evt.runningTotal}
                        </td>

                        {/* Ref */}
                        <td className="py-3 px-4 font-mono text-[11px] text-[#8C909B] whitespace-nowrap">
                          {evt.ref}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => onViewEvent(evt)}
                            className="inline-flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
                          >
                            <span>View</span>
                            {evt.eventType === "Adjusted" && (
                              <Info className="size-3 text-[#8C909B]" />
                            )}
                          </button>
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
    </div>
  );
}
