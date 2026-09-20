import { useState } from "react";
import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ExportInventoryHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExportSuccess?: (format: string) => void;
}

export function ExportInventoryHistoryModal({
  open,
  onOpenChange,
  onExportSuccess,
}: ExportInventoryHistoryModalProps) {
  const [reportType, setReportType] = useState<
    "snapshot" | "received" | "distributions" | "complete"
  >("snapshot");
  const [format, setFormat] = useState<"CSV" | "Excel" | "PDF">("CSV");
  const [startDate, setStartDate] = useState("01 Jun 2026");
  const [endDate, setEndDate] = useState("30 Jun 2026");
  const [quickRange, setQuickRange] = useState<"month" | "3months" | "all">(
    "month"
  );
  const [isExporting, setIsExporting] = useState(false);

  const reportTypes = [
    {
      id: "snapshot" as const,
      title: "Current Stock Snapshot",
      desc: "All SIM types, networks and quantities right now",
      dot: "bg-[#0F152A]",
    },
    {
      id: "received" as const,
      title: "Stock Received",
      desc: "All batches received from Admin",
      dot: "bg-[#10B981]",
    },
    {
      id: "distributions" as const,
      title: "Distributions to SCs",
      desc: "All stock sent to your SCs",
      dot: "bg-[#2563EB]",
    },
    {
      id: "complete" as const,
      title: "Complete History",
      desc: "All events including adjustments",
      dot: "bg-[#1E293B]",
    },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onOpenChange(false);
      onExportSuccess?.(format);
    }, 700);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Inventory Report"
      description="Download your stock movement records"
      size="md"
      showCloseButton={true}
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-[#64748B] hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isExporting}
            onClick={handleExport}
            className="flex-1 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isExporting ? "Generating..." : "Generate Export"}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Report Type Options */}
        <div className="space-y-2">
          {reportTypes.map((type) => {
            const isSelected = reportType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setReportType(type.id)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/40"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <span className={`size-3 shrink-0 rounded-full ${type.dot}`} />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-[#0F152A]">
                    {type.title}
                  </h4>
                  <p className="text-[11px] text-[#64748B]">{type.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* FORMAT */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            FORMAT
          </label>
          <div className="flex gap-2">
            {(["CSV", "Excel", "PDF"] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={`flex-1 rounded-xl border py-2 text-center text-xs font-bold transition ${
                  format === fmt
                    ? "border-blue-600 bg-blue-600 text-white shadow-xs"
                    : "border-slate-200 bg-white text-[#0F152A] hover:bg-slate-50"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* DATE RANGE */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            DATE RANGE
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-[#0F152A] outline-hidden focus:border-blue-500"
            />
            <span className="text-[11px] text-[#8C909B]">to</span>
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-[#0F152A] outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2 pt-1">
            {[
              { id: "month" as const, label: "This Month" },
              { id: "3months" as const, label: "Last 3 Months" },
              { id: "all" as const, label: "All Time" },
            ].map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setQuickRange(tag.id)}
                className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                  quickRange === tag.id
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-[#64748B] hover:text-[#0F152A]"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info Callout Banner */}
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 p-3 text-[11px] text-[#64748B]">
          <Info className="size-4 shrink-0 text-slate-400" />
          <span>
            ~89 stock events • Jun 2026 • Est. 4 pages ({format})
          </span>
        </div>
      </div>
    </AppModal>
  );
}
