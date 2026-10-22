import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Calendar, CheckCircle2, FileText } from "lucide-react";
import { useScExportStatement } from "../api/mutations";
import type { ScTransactionFilters } from "../types/requests";

interface ScDownloadStatementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownloadSuccess?: () => void;
}

// Periods supported by GET /state-coordinator/wallet/transactions/export.
const RANGES = [
  { key: "today", label: "Today" },
  { key: "this_week", label: "This Week" },
  { key: "this_month", label: "This Month" },
  { key: "custom", label: "Custom Range" },
] as const;

export function ScDownloadStatementModal({
  open,
  onOpenChange,
  onDownloadSuccess,
}: ScDownloadStatementModalProps) {
  const exporter = useScExportStatement();
  const [range, setRange] = useState<ScTransactionFilters["period"]>("this_month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const customIncomplete = range === "custom" && (!startDate || !endDate || startDate > endDate);

  const close = (value: boolean) => {
    if (exporter.isPending) return;
    if (!value) { setIsGenerated(false); exporter.reset(); }
    onOpenChange(value);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (customIncomplete) return;
    exporter.mutate({ category: "all", period: range, ...(range === "custom" ? { start_date: startDate, end_date: endDate } : {}) }, {
      onSuccess: () => { setIsGenerated(true); onDownloadSuccess?.(); },
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={close}
      title="Download Statement"
      description="Export your earnings history"
      size="md"
      showCloseButton={!exporter.isPending}
    >
      <form onSubmit={handleGenerate} className="space-y-4 pt-1 text-xs">
        {/* Format Section — the export endpoint returns CSV only (PDF / Excel disabled). */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Format
          </label>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full px-5 py-1.5 text-xs font-bold bg-[#2563EB] text-white shadow-xs">CSV</span>
          </div>
        </div>

        {/* Date Range Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Date Range
          </label>
          <div className="flex flex-wrap gap-1.5">
            {RANGES.map((rng) => (
              <button
                key={rng.key}
                type="button"
                onClick={() => setRange(rng.key)}
                className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                  range === rng.key
                    ? "bg-[#0F152A] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                }`}
              >
                {rng.label}
              </button>
            ))}
          </div>

          {range === "custom" && <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
              <input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>}
        </div>

        {/* "Include" and "PDF only" toggles are omitted: the export endpoint has no options for them. */}

        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] p-3 text-xs text-[#66738C] flex items-center gap-2 font-medium">
          <FileText className="size-4 text-[#8C909B] shrink-0" />
          <span>All transaction categories · CSV file</span>
        </div>

        {exporter.error && <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-[#EF4444] font-medium">{exporter.error.message}</div>}

        {/* Download Ready Banner */}
        {isGenerated && (
          <div className="rounded-xl border border-[#10B981]/30 bg-[#EBFFF8] p-3 flex items-center gap-2">
            <CheckCircle2 className="size-4 text-[#10B981]" />
            <span className="font-mono text-xs font-bold text-[#0F152A]">
              state-coordinator-statement.csv downloaded
            </span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            disabled={exporter.isPending}
            onClick={() => close(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={exporter.isPending || customIncomplete}
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 transition disabled:opacity-50"
          >
            {exporter.isPending ? "Generating…" : "Generate & Download"}
          </button>
        </div>
      </form>
    </AppModal>
  );
}
