import { useState } from "react";
import { List, BarChart3, Package, FileText } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface ExportScReportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (details: { reportType: string; format: string; period: string }) => void;
}

type ReportTypeKey = "directory" | "performance" | "stock" | "complete";
type FormatType = "CSV" | "Excel" | "PDF";
type PeriodType = "This Month" | "Last 3 Months" | "All Time";

interface ReportOption {
  key: ReportTypeKey;
  title: string;
  description: string;
  icon: typeof List;
  iconColor: string;
  iconBg: string;
}

const REPORT_OPTIONS: ReportOption[] = [
  {
    key: "directory",
    title: "SC Directory",
    description: "All SC details, contacts, states",
    icon: List,
    iconColor: APP_COLORS.blues.interactiveCta,
    iconBg: APP_COLORS.blues.surfaceLight,
  },
  {
    key: "performance",
    title: "Performance Report",
    description: "Activations, commission, bonus per SC",
    icon: BarChart3,
    iconColor: APP_COLORS.greens.green,
    iconBg: APP_COLORS.greens.light,
  },
  {
    key: "stock",
    title: "Stock Report",
    description: "Current and historical stock per SC",
    icon: Package,
    iconColor: APP_COLORS.ambers.amber,
    iconBg: APP_COLORS.ambers.light,
  },
  {
    key: "complete",
    title: "Complete SC Report",
    description: "All data — SC details + performance + stock combined",
    icon: FileText,
    iconColor: APP_COLORS.texts.slate,
    iconBg: APP_COLORS.blues.surfaceLight,
  },
];

export function ExportScReportModal({
  open,
  onOpenChange,
  onSuccess,
}: ExportScReportModalProps) {
  const [selectedReport, setSelectedReport] = useState<ReportTypeKey>("directory");
  const [format, setFormat] = useState<FormatType>("Excel");
  const [period, setPeriod] = useState<PeriodType>("This Month");
  const [isExporting, setIsExporting] = useState(false);

  const handleGenerate = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onOpenChange(false);
      const chosen = REPORT_OPTIONS.find((r) => r.key === selectedReport)?.title || "SC Directory";
      onSuccess?.({
        reportType: chosen,
        format,
        period,
      });
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export SC Report"
      description="Download your SC network data"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Report Types List */}
        <div className="space-y-2.5">
          {REPORT_OPTIONS.map((opt) => {
            const isSelected = selectedReport === opt.key;
            const Icon = opt.icon;
            return (
              <div
                key={opt.key}
                onClick={() => setSelectedReport(opt.key)}
                className="flex items-center gap-3.5 rounded-2xl border p-3.5 transition cursor-pointer"
                style={{
                  borderColor: isSelected
                    ? APP_COLORS.blues.interactiveCta
                    : APP_COLORS.greys.stroke,
                  backgroundColor: isSelected
                    ? APP_COLORS.blues.surfaceLight
                    : APP_COLORS.backgrounds.background,
                }}
              >
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: opt.iconBg,
                    color: opt.iconColor,
                  }}
                >
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-xs font-bold"
                    style={{ color: APP_COLORS.texts.primary }}
                  >
                    {opt.title}
                  </h4>
                  <p
                    className="text-[11px] mt-0.5"
                    style={{ color: APP_COLORS.texts.slate }}
                  >
                    {opt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FORMAT Selection */}
        <div className="space-y-1.5 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Format
          </label>
          <div className="flex items-center gap-2">
            {(["CSV", "Excel", "PDF"] as FormatType[]).map((fmt) => {
              const isSelected = format === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className="rounded-xl px-5 py-2 text-xs font-bold transition cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.backgrounds.background,
                    color: isSelected
                      ? APP_COLORS.texts.whiteFixed
                      : APP_COLORS.texts.slate,
                    border: `1px solid ${
                      isSelected
                        ? APP_COLORS.blues.interactiveCta
                        : APP_COLORS.greys.stroke
                    }`,
                  }}
                >
                  {fmt}
                </button>
              );
            })}
          </div>
        </div>

        {/* PERIOD Selection */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Period
          </label>
          <div className="flex items-center gap-2">
            {(["This Month", "Last 3 Months", "All Time"] as PeriodType[]).map((p) => {
              const isSelected = period === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className="rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.backgrounds.background,
                    color: isSelected
                      ? APP_COLORS.texts.whiteFixed
                      : APP_COLORS.texts.slate,
                    border: `1px solid ${
                      isSelected
                        ? APP_COLORS.blues.interactiveCta
                        : APP_COLORS.greys.stroke
                    }`,
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Estimation Note */}
        <p
          className="text-[11px] font-medium pt-1"
          style={{ color: APP_COLORS.texts.slate }}
        >
          12 SCs · Jun 2026 · Est. 3 pages
        </p>

        {/* Footer Actions */}
        <div
          className="flex items-center justify-end gap-3 pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-semibold transition hover:opacity-80 cursor-pointer"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isExporting}
            onClick={handleGenerate}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isExporting ? "Generating..." : "Generate Export"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default ExportScReportModal;
