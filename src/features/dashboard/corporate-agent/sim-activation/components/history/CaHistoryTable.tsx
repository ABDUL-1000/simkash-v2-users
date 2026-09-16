import { useState } from "react";
import { APP_COLORS } from "@/constants/colors";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { CaActivationHistoryRecord } from "../../types/ca-sim-activation.types";

interface CaHistoryTableProps {
  records: CaActivationHistoryRecord[];
  onViewRecord: (record: CaActivationHistoryRecord) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
  totalCount?: number;
}

export function CaHistoryTable({
  records,
  onViewRecord,
  currentPage,
  onPageChange,
  totalPages = 21,
  totalCount = 312,
}: CaHistoryTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, simNumber: string) => {
    navigator.clipboard.writeText(simNumber);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getNetworkBadge = (network: string) => {
    switch (network) {
      case "MTN":
        return { text: "MT", bg: "#FEF3C7", color: "#92400E" };
      case "Airtel":
        return { text: "AI", bg: "#FEE2E2", color: "#B91C1C" };
      case "Glo":
        return { text: "GI", bg: "#D1FAE5", color: "#065F46" };
      case "2 (9mobile)":
      default:
        return { text: "T2", bg: "#DBEAFE", color: "#1E40AF" };
    }
  };

  // Group records by dateGroup
  const groups: Array<"TODAY" | "YESTERDAY" | "THIS WEEK" | "EARLIER THIS MONTH"> = [
    "TODAY",
    "YESTERDAY",
    "THIS WEEK",
    "EARLIER THIS MONTH",
  ];

  return (
    <div
      className="rounded-2xl border bg-white shadow-2xs overflow-hidden"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr
              className="border-b text-[11px] font-black uppercase tracking-wider text-slate-400 bg-slate-50/75"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">SIM Number</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Network</th>
              <th className="py-3 px-4">Plan</th>
              <th className="py-3 px-4">Commission</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
            {groups.map((groupName) => {
              const groupRecords = records.filter((r) => r.dateGroup === groupName);
              if (groupRecords.length === 0) return null;

              return (
                <div key={groupName} className="contents">
                  {/* Group Header Row */}
                  <tr className="bg-slate-50/50">
                    <td
                      colSpan={8}
                      className="py-2 px-4 text-[10px] font-black tracking-wider text-slate-400 uppercase"
                    >
                      {groupName}
                    </td>
                  </tr>

                  {/* Records in this group */}
                  {groupRecords.map((rec) => {
                    const net = getNetworkBadge(rec.network);
                    const isCompleted = rec.status === "Completed";
                    const isCopied = copiedId === rec.id;

                    return (
                      <tr
                        key={rec.id}
                        className="hover:bg-slate-50/80 transition-colors group"
                      >
                        {/* Date */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-bold text-slate-900">{rec.date}</div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            {rec.time}
                          </div>
                        </td>

                        {/* SIM Number */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 font-mono font-black text-slate-900">
                            <span>{rec.simNumber}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(rec.id, rec.simNumber)}
                              className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                              title="Copy SIM number"
                            >
                              {isCopied ? (
                                <Check className="size-3 text-emerald-600" />
                              ) : (
                                <Copy className="size-3" />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200 bg-slate-50 text-slate-700">
                            {rec.simType.replace(" SIM", "")}
                          </span>
                        </td>

                        {/* Network */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className="size-6 rounded-full inline-flex items-center justify-center text-[10px] font-black"
                            style={{ backgroundColor: net.bg, color: net.color }}
                          >
                            {net.text}
                          </span>
                        </td>

                        {/* Plan */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="font-bold text-slate-900">{rec.planName}</div>
                          <div className="text-[10px] text-slate-400 font-medium">
                            {rec.planPrice}
                          </div>
                        </td>

                        {/* Commission */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className="font-black"
                            style={{
                              color:
                                rec.commission.startsWith("+")
                                  ? APP_COLORS.greens.green
                                  : APP_COLORS.texts.slate,
                            }}
                          >
                            {rec.commission}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-bold"
                            style={{
                              color: isCompleted
                                ? APP_COLORS.greens.green
                                : APP_COLORS.reds.red,
                            }}
                          >
                            <span
                              className="size-1.5 rounded-full"
                              style={{
                                backgroundColor: isCompleted
                                  ? APP_COLORS.greens.green
                                  : APP_COLORS.reds.red,
                              }}
                            />
                            <span>{rec.status}</span>
                          </span>
                        </td>

                        {/* Action View */}
                        <td className="py-3 px-4 whitespace-nowrap text-right">
                          <button
                            type="button"
                            onClick={() => onViewRecord(rec)}
                            className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </div>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar matching Image 5 */}
      <div
        className="p-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <span className="font-medium text-slate-500">
          Showing 1–{records.length} of {totalCount} activations
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 rounded-lg border text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <ChevronLeft className="size-3" />
            <span>Prev</span>
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className="size-7 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              style={{
                backgroundColor:
                  currentPage === page
                    ? APP_COLORS.blues.surfaceLight
                    : "transparent",
                color:
                  currentPage === page
                    ? APP_COLORS.blues.interactiveCta
                    : APP_COLORS.texts.slate,
              }}
            >
              {page}
            </button>
          ))}

          <span className="text-slate-400 font-bold px-1">...</span>

          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="size-7 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            {totalPages}
          </button>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-2.5 py-1 rounded-lg border text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <span>Next</span>
            <ChevronRight className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
