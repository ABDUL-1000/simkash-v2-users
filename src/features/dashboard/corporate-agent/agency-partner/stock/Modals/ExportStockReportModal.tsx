import { useState } from "react";
import { Calendar } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface ExportStockReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExportSuccess?: (format: string, reportType: string) => void;
}

type ReportType =
  | "Current Stock Snapshot"
  | "Stock Received"
  | "Stock Usage"
  | "Complete Stock History";

type ExportFormat = "CSV" | "Excel" | "PDF";

export function ExportStockReportModal({
  open,
  onOpenChange,
  onExportSuccess,
}: ExportStockReportModalProps) {
  const [reportType, setReportType] = useState<ReportType>("Current Stock Snapshot");
  const [format, setFormat] = useState<ExportFormat>("Excel");
  const [datePreset, setDatePreset] = useState<"This Month" | "Last 3 Months" | "All Time">(
    "This Month"
  );
  const [fromDate, setFromDate] = useState("2026-06-01");
  const [toDate, setToDate] = useState("2026-06-30");
  const [isExporting, setIsExporting] = useState(false);

  const reportTypes: { id: ReportType; title: string; subtitle: string }[] = [
    {
      id: "Current Stock Snapshot",
      title: "Current Stock Snapshot",
      subtitle: "All SIM types, networks, quantities right now",
    },
    {
      id: "Stock Received",
      title: "Stock Received",
      subtitle: "All batches received from SC",
    },
    {
      id: "Stock Usage",
      title: "Stock Usage",
      subtitle: "All SIMs used in activations",
    },
    {
      id: "Complete Stock History",
      title: "Complete Stock History",
      subtitle: "All events including adjustments",
    },
  ];

  const handlePreset = (preset: "This Month" | "Last 3 Months" | "All Time") => {
    setDatePreset(preset);
    if (preset === "This Month") {
      setFromDate("2026-06-01");
      setToDate("2026-06-30");
    } else if (preset === "Last 3 Months") {
      setFromDate("2026-04-01");
      setToDate("2026-06-30");
    } else {
      setFromDate("2026-01-01");
      setToDate("2026-06-30");
    }
  };

  const handleGenerateExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onOpenChange(false);
      onExportSuccess?.(format, reportType);
    }, 600);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Stock Report"
      description="Download your inventory history"
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* SELECT REPORT TYPE */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Select Report Type
          </label>
          <div className="space-y-2">
            {reportTypes.map((item) => {
              const isSelected = reportType === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setReportType(item.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl p-3.5 transition ${
                    isSelected
                      ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                      : "border border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div>
                    <h5 className="text-xs font-bold text-[#0F152A]">{item.title}</h5>
                    <p className="mt-0.5 text-[11px] font-medium text-[#66738C]">{item.subtitle}</p>
                  </div>

                  {/* Radio dot */}
                  <div
                    className={`flex size-4.5 items-center justify-center rounded-full border transition ${
                      isSelected
                        ? "border-[#2563EB] bg-[#2563EB]"
                        : "border-[#CBD5E1] bg-white"
                    }`}
                  >
                    {isSelected && <div className="size-2 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FORMAT */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Format
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["CSV", "Excel", "PDF"] as ExportFormat[]).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={`rounded-xl py-2.5 text-xs font-bold transition ${
                  format === fmt
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC]"
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
            Date Range
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <span className="text-[10px] text-[#8C909B] font-medium mb-1 block">From</span>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#8C909B]" />
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2 pl-9 pr-3 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#8C909B] font-medium mb-1 block">To</span>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#8C909B]" />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2 pl-9 pr-3 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>
            </div>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-2 pt-1">
            {(["This Month", "Last 3 Months", "All Time"] as const).map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handlePreset(chip)}
                className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                  datePreset === chip
                    ? "border border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                    : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          <p className="pt-1 text-[11px] italic text-[#8C909B]">~47 stock events · Jun 2026</p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border border-[#CBD5E1] bg-white py-2.5 text-xs font-bold text-[#475569] transition hover:bg-[#F1F5F9]"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isExporting}
            onClick={handleGenerateExport}
            className="flex-1 rounded-xl bg-[#10B981] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#059669] disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.greens.green }}
          >
            {isExporting ? "Exporting..." : "Generate Export"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
