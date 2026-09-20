import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Calendar, Download, FileText, List, Send } from "lucide-react";

interface ExportInventoryReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ExportInventoryReportModal({
  open,
  onOpenChange,
  onSuccess,
}: ExportInventoryReportModalProps) {
  const [reportType, setReportType] = useState<
    "snapshot" | "received" | "distributions" | "history"
  >("snapshot");
  const [format, setFormat] = useState<"CSV" | "Excel" | "PDF">("CSV");
  const [dateRange, setDateRange] = useState<
    "This Week" | "This Month" | "Last 3 Months" | "Custom"
  >("This Month");
  const [startDate, setStartDate] = useState("01/06/2026");
  const [endDate, setEndDate] = useState("30/06/2026");
  const [groupBy, setGroupBy] = useState<"Date" | "AP" | "SIM Type">("Date");

  const handleExport = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Inventory Report"
      description="Download your stock records"
      size="md"
    >
      <form onSubmit={handleExport} className="space-y-4 pt-1 text-xs">
        {/* Report Type Cards */}
        <div className="space-y-2">
          {/* Card 1: Current Stock Snapshot */}
          <button
            type="button"
            onClick={() => setReportType("snapshot")}
            className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
              reportType === "snapshot"
                ? "border-2 border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB] shrink-0">
              <FileText className="size-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">
                Current Stock Snapshot
              </h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                All types, networks, quantities now
              </p>
            </div>
          </button>

          {/* Card 2: Stock Received */}
          <button
            type="button"
            onClick={() => setReportType("received")}
            className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
              reportType === "received"
                ? "border-2 border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981] shrink-0">
              <Download className="size-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">Stock Received</h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                All batches received from RM
              </p>
            </div>
          </button>

          {/* Card 3: Distributions to APs */}
          <button
            type="button"
            onClick={() => setReportType("distributions")}
            className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
              reportType === "distributions"
                ? "border-2 border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shrink-0">
              <Send className="size-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">
                Distributions to APs
              </h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                All stock sent to your APs
              </p>
            </div>
          </button>

          {/* Card 4: Complete History */}
          <button
            type="button"
            onClick={() => setReportType("history")}
            className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
              reportType === "history"
                ? "border-2 border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] shrink-0">
              <List className="size-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">
                Complete History
              </h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                All events including adjustments
              </p>
            </div>
          </button>
        </div>

        {/* Format Section */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Format
          </label>
          <div className="flex flex-wrap gap-2">
            {(["CSV", "Excel", "PDF"] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={`rounded-full px-5 py-1.5 text-xs font-bold transition ${
                  format === fmt
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Date Range
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(["This Week", "This Month", "Last 3 Months", "Custom"] as const).map(
              (rng) => (
                <button
                  key={rng}
                  type="button"
                  onClick={() => setDateRange(rng)}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                    dateRange === rng
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                  }`}
                >
                  {rng}
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs font-semibold text-[#0F152A] outline-none"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs font-semibold text-[#0F152A] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Group By Section */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Group By
          </label>
          <div className="flex flex-wrap gap-2">
            {(["Date", "AP", "SIM Type"] as const).map((gb) => (
              <button
                key={gb}
                type="button"
                onClick={() => setGroupBy(gb)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  groupBy === gb
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                }`}
              >
                {gb}
              </button>
            ))}
          </div>
        </div>

        {/* Estimation Box */}
        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] p-3 text-xs text-[#66738C] flex items-center gap-2 font-medium">
          <FileText className="size-4 text-[#8C909B] shrink-0" />
          <span>~62 events . Jun 2026 ({format})</span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 transition"
          >
            Generate Export
          </button>
        </div>
      </form>
    </AppModal>
  );
}
