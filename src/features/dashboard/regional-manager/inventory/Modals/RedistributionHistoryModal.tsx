import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { REDISTRIBUTION_HISTORY_DATA } from "../../data/rm-redistribute.data";
import type { RedistributionHistoryRecord } from "../../types/rm-redistribute.types";

interface RedistributionHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExport?: () => void;
}

type FilterTab = "All" | "SC to SC" | "Recalls" | "Quick Distribute";
type DateFilter = "This Month" | "Last 3 Months" | "All Time";

export function RedistributionHistoryModal({
  open,
  onOpenChange,
  onExport,
}: RedistributionHistoryModalProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [activeDate, setActiveDate] = useState<DateFilter>("This Month");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRecords = REDISTRIBUTION_HISTORY_DATA.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "SC to SC") return item.type === "SC to SC";
    if (activeTab === "Recalls") return item.type === "Recall";
    if (activeTab === "Quick Distribute") return item.type === "Quick Dist";
    return true;
  });

  const getTypeBadgeClass = (type: RedistributionHistoryRecord["type"]) => {
    switch (type) {
      case "SC to SC":
        return "bg-[#EFF6FF] text-[#2563EB]";
      case "Recall":
        return "bg-[#EBFFF8] text-[#10B981]";
      case "Quick Dist":
        return "bg-[#EEF2FF] text-[#4F46E5]";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Redistribution History"
      description="All stock movements within your network"
      size="xl"
      showCloseButton={true}
      footer={
        <div className="flex w-full items-center justify-between gap-3">
          <button
            type="button"
            onClick={onExport}
            className="rounded-xl px-4 py-2.5 text-xs font-bold text-[#64748B] hover:bg-slate-100 transition"
          >
            Export History
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#1E293B] px-8 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top 3 KPI metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              SC TO SC
            </span>
            <div className="text-xl font-black text-[#0F152A]">24</div>
            <span className="text-[11px] text-[#64748B]">transfers</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              RECALLS
            </span>
            <div className="text-xl font-black text-[#0F152A]">8</div>
            <span className="text-[11px] text-[#64748B]">recalls</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              TOTAL SIMS
            </span>
            <div className="text-xl font-black text-[#0F152A]">487</div>
            <span className="text-[11px] text-[#64748B]">redistributed</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-1">
          {(["All", "SC to SC", "Recalls", "Quick Distribute"] as FilterTab[]).map(
            (tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-xl px-4 py-1.5 text-xs font-bold transition ${
                    active
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-slate-100 text-[#64748B] hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>
              );
            }
          )}
        </div>

        {/* Date Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {(["This Month", "Last 3 Months", "All Time"] as DateFilter[]).map(
            (df) => {
              const active = activeDate === df;
              return (
                <button
                  key={df}
                  type="button"
                  onClick={() => setActiveDate(df)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                    active
                      ? "bg-[#EFF6FF] text-[#2563EB] border border-blue-200"
                      : "bg-transparent text-[#64748B] hover:bg-slate-100"
                  }`}
                >
                  {df}
                </button>
              );
            }
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
                <th className="py-2.5 px-3">DATE</th>
                <th className="py-2.5 px-3">TYPE</th>
                <th className="py-2.5 px-3">FROM</th>
                <th className="py-2.5 px-3">TO</th>
                <th className="py-2.5 px-3">QTY</th>
                <th className="py-2.5 px-3">REASON</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3">REF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-2.5 px-3 text-[#64748B] whitespace-nowrap">
                    {row.date}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getTypeBadgeClass(
                        row.type
                      )}`}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#0F152A] whitespace-nowrap">
                    {row.from}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-[#0F152A] whitespace-nowrap">
                    {row.to}
                  </td>
                  <td className="py-2.5 px-3 font-black text-[#0F152A]">
                    {row.qty}
                  </td>
                  <td className="py-2.5 px-3 text-[#64748B] whitespace-nowrap">
                    {row.reason}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.status === "Completed"
                          ? "bg-[#EBFFF8] text-[#10B981]"
                          : "bg-[#FFF7F8] text-[#EF4444]"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[10px] text-[#94A3B8] whitespace-nowrap">
                    {row.ref}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="text-xs font-semibold text-[#64748B] hover:text-[#0F152A] disabled:opacity-30"
          >
            ← Previous
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`size-7 rounded-lg text-xs font-bold transition ${
                currentPage === page
                  ? "bg-[#EFF6FF] text-[#2563EB]"
                  : "text-[#64748B] hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === 3}
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
            className="text-xs font-semibold text-[#64748B] hover:text-[#0F152A] disabled:opacity-30"
          >
            Next →
          </button>
        </div>
      </div>
    </AppModal>
  );
}
