import { useState } from "react";
import { BarChart3, DollarSign, Trophy, Users, TrendingUp, Check, FileText } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RmExportPerformanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (details: { reportType: string; format: string; period: string }) => void;
}

type ReportTypeId = "full" | "commission" | "bonus" | "comparison" | "activity";

export function RmExportPerformanceModal({
  open,
  onOpenChange,
  onSuccess,
}: RmExportPerformanceModalProps) {
  const [selectedType, setSelectedType] = useState<ReportTypeId>("full");
  const [format, setFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");
  const [period, setPeriod] = useState("This Month");
  const [isExporting, setIsExporting] = useState(false);

  // 6 Checkboxes
  const [includes, setIncludes] = useState({
    executive: true,
    charts: true,
    scBreakdown: true,
    apDetail: true,
    commissionHistory: true,
    bonusPayouts: true,
  });

  const toggleInclude = (key: keyof typeof includes) => {
    setIncludes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const reportTypes = [
    {
      id: "full",
      title: "Full Performance Report",
      desc: "All metrics: activations, commission, bonus, SC comparison",
      icon: BarChart3,
    },
    {
      id: "commission",
      title: "Commission Report",
      desc: "Earnings breakdown by SC and month",
      icon: DollarSign,
    },
    {
      id: "bonus",
      title: "Bonus Tracking Report",
      desc: "Bonus status per SC, history, payout summary",
      icon: Trophy,
    },
    {
      id: "comparison",
      title: "SC Comparison Report",
      desc: "Side-by-side SC performance",
      icon: Users,
    },
    {
      id: "activity",
      title: "Network Activity Summary",
      desc: "Activation volume, types, trends",
      icon: TrendingUp,
    },
  ];

  const handleGenerate = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onOpenChange(false);
      const chosen = reportTypes.find((r) => r.id === selectedType);
      onSuccess?.({
        reportType: chosen?.title || "Full Performance Report",
        format,
        period,
      });
    }, 450);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Export Performance Report"
      description="Download your network analytics"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* 1. REPORT TYPE (5 Cards - Image 5) */}
        <div className="space-y-2">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Report Type
          </label>
          <div className="space-y-2">
            {reportTypes.map((rt) => {
              const isSelected = selectedType === rt.id;
              const Icon = rt.icon;

              return (
                <div
                  key={rt.id}
                  onClick={() => setSelectedType(rt.id as ReportTypeId)}
                  className="flex items-center justify-between rounded-2xl border p-3 transition cursor-pointer"
                  style={{
                    borderColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.greys.stroke,
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.surfaceLight
                      : APP_COLORS.backgrounds.background,
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: isSelected
                          ? "#DBEAFE"
                          : APP_COLORS.backgrounds.surface,
                        color: isSelected
                          ? APP_COLORS.blues.interactiveCta
                          : APP_COLORS.texts.slate,
                      }}
                    >
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <span
                        className="text-xs font-bold block"
                        style={{ color: APP_COLORS.texts.primary }}
                      >
                        {rt.title}
                      </span>
                      <span
                        className="text-[11px] block mt-0.5"
                        style={{ color: APP_COLORS.texts.slate }}
                      >
                        {rt.desc}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      className="flex size-5 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
                    >
                      <Check className="size-3 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. FORMAT PILLS */}
        <div className="space-y-1.5 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Format
          </label>
          <div className="flex items-center gap-2">
            {(["PDF", "Excel", "CSV"] as const).map((f) => {
              const isSelected = format === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className="rounded-xl px-5 py-2 text-xs font-bold transition cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.backgrounds.background,
                    color: isSelected
                      ? APP_COLORS.texts.whiteFixed
                      : APP_COLORS.texts.slate,
                    border: `1px solid ${
                      isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.greys.stroke
                    }`,
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. PERIOD PILLS */}
        <div className="space-y-1.5 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Period
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {["This Month", "Last 3 Months", "Last 6 Months", "This Year", "All Time"].map((p) => {
              const isSelected = period === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className="rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.backgrounds.background,
                    color: isSelected
                      ? APP_COLORS.texts.whiteFixed
                      : APP_COLORS.texts.slate,
                    border: `1px solid ${
                      isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.greys.stroke
                    }`,
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. INCLUDE CHECKBOXES (6 Checkboxes) */}
        <div className="space-y-2 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Include
          </label>
          <div className="space-y-2">
            {[
              { key: "executive", label: "Executive summary page" },
              { key: "charts", label: "Charts and visualisations (PDF only)" },
              { key: "scBreakdown", label: "SC-by-SC breakdown" },
              { key: "apDetail", label: "AP-level detail" },
              { key: "commissionHistory", label: "Commission history" },
              { key: "bonusPayouts", label: "Bonus payout records" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center gap-2.5 cursor-pointer text-xs font-medium"
                style={{ color: APP_COLORS.texts.primary }}
              >
                <input
                  type="checkbox"
                  checked={includes[item.key as keyof typeof includes]}
                  onChange={() => toggleInclude(item.key as keyof typeof includes)}
                  className="size-4 rounded-md accent-blue-600 cursor-pointer"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 5. SUMMARY STRIP (Image 5) */}
        <div
          className="flex items-center gap-2 rounded-2xl p-3 text-xs font-medium"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            color: APP_COLORS.texts.slate,
          }}
        >
          <FileText className="size-4 shrink-0 text-slate-400" />
          <span>Full report · Jun 2026 · ~12 pages ({format})</span>
        </div>

        {/* 6. FOOTER */}
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
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isExporting ? "Generating..." : "Generate Export"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default RmExportPerformanceModal;
