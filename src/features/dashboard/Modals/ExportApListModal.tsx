import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { BarChart3, FileText, List, Package } from "lucide-react";

interface ExportApListModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ExportApListModal({
  open,
  onOpenChange,
  onSuccess,
}: ExportApListModalProps) {
  const [reportType, setReportType] = useState<
    "directory" | "performance" | "stock" | "complete"
  >("directory");
  const [format, setFormat] = useState<"CSV" | "Excel" | "PDF">("CSV");
  const [period, setPeriod] = useState<"This Month" | "Last 3 Months" | "All Time">("This Month");

  const handleExport = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export AP List"
      description="Download your AP network data"
      size="md"
    >
      <form onSubmit={handleExport} className="space-y-4 pt-1 text-xs">
        {/* Report Type Options List */}
        <div className="space-y-2">
          {/* Card 1: AP Directory */}
          <button
            type="button"
            onClick={() => setReportType("directory")}
            className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
              reportType === "directory"
                ? "border-2 border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB] shrink-0">
              <List className="size-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">AP Directory</h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                All AP details, contacts, states
              </p>
            </div>
          </button>

          {/* Card 2: Performance Report */}
          <button
            type="button"
            onClick={() => setReportType("performance")}
            className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
              reportType === "performance"
                ? "border-2 border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981] shrink-0">
              <BarChart3 className="size-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">
                Performance Report
              </h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                Activations, bonus per AP
              </p>
            </div>
          </button>

          {/* Card 3: Stock Report */}
          <button
            type="button"
            onClick={() => setReportType("stock")}
            className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
              reportType === "stock"
                ? "border-2 border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B] shrink-0">
              <Package className="size-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">Stock Report</h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                Current stock per AP
              </p>
            </div>
          </button>

          {/* Card 4: Complete AP Report */}
          <button
            type="button"
            onClick={() => setReportType("complete")}
            className={`w-full text-left rounded-2xl p-3.5 border flex items-center gap-3 transition ${
              reportType === "complete"
                ? "border-2 border-[#2563EB] bg-[#EFF4F8]/60 shadow-xs"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] shrink-0">
              <FileText className="size-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">
                Complete AP Report
              </h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                All data combined
              </p>
            </div>
          </button>
        </div>

        {/* Export Format Section */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            EXPORT FORMAT
          </label>
          <div className="flex flex-wrap gap-2">
            {(["CSV", "Excel", "PDF"] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={`rounded-xl px-5 py-2 text-xs font-bold transition ${
                  format === fmt
                    ? "bg-[#0F152A] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Report Period Section */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            REPORT PERIOD
          </label>
          <div className="flex flex-wrap gap-2">
            {(["This Month", "Last 3 Months", "All Time"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  period === p
                    ? "bg-[#0F152A] text-white shadow-xs"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Estimation Pill Card */}
        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] p-3 text-xs text-[#66738C] font-medium">
          23 APs · Jun 2026 ({format})
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
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Generate Export
          </button>
        </div>
      </form>
    </AppModal>
  );
}
