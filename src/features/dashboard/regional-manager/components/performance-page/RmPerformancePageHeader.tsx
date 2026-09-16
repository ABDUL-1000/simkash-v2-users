import { useState } from "react";
import { Download, Calendar, RefreshCw, ChevronDown, Check } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmPerformancePageHeaderProps {
  selectedPeriod: string;
  customPeriodLabel?: string;
  onPeriodChange: (period: string) => void;
  onOpenExport: () => void;
  onOpenCustomPeriod?: () => void;
  onRefresh?: () => void;
}

const PERIOD_OPTIONS = [
  { id: "this-month", label: "This Month (Jun 2026)" },
  { id: "last-month", label: "Last Month (May 2026)" },
  { id: "last-quarter", label: "Last Quarter (Q1 2026)" },
  { id: "ytd", label: "Year-to-Date (2026)" },
];

export function RmPerformancePageHeader({
  selectedPeriod,
  customPeriodLabel,
  onPeriodChange,
  onOpenExport,
  onOpenCustomPeriod,
  onRefresh,
}: RmPerformancePageHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const displayLabel =
    selectedPeriod === "custom" && customPeriodLabel
      ? customPeriodLabel
      : PERIOD_OPTIONS.find((p) => p.id === selectedPeriod)?.label || PERIOD_OPTIONS[0].label;

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-2">
      {/* Title & Region Info */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: APP_COLORS.texts.primary }}>
            Network Performance
          </h1>
          <span
            className="px-2 py-0.5 rounded-full text-[11px] font-bold"
            style={{
              backgroundColor: APP_COLORS.greens.light,
              color: APP_COLORS.greens.secondary,
            }}
          >
            Live Monitor
          </span>
        </div>
        <p className="text-xs font-medium mt-0.5" style={{ color: APP_COLORS.texts.slate }}>
          South-West Zone • 12 States • 247 Active APs • Updated Jun 15, 2026, 14:30
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Refresh Button */}
        <button
          type="button"
          onClick={handleRefresh}
          className="p-2 rounded-xl border transition-all hover:bg-slate-100 flex items-center justify-center"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
            color: APP_COLORS.texts.slate,
          }}
          title="Refresh metrics"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
        </button>

        {/* Period Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold shadow-xs transition-colors hover:bg-slate-50"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
              color: APP_COLORS.texts.primary,
            }}
          >
            <Calendar className="w-3.5 h-3.5" style={{ color: APP_COLORS.blues.secondary }} />
            <span>{displayLabel}</span>
            <ChevronDown className="w-3.5 h-3.5 ml-1" style={{ color: APP_COLORS.texts.slate }} />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setDropdownOpen(false)} />
              <div
                className="absolute right-0 mt-1 w-60 rounded-xl border shadow-lg py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
                style={{
                  backgroundColor: APP_COLORS.backgrounds.background,
                  borderColor: APP_COLORS.greys.stroke,
                }}
              >
                {PERIOD_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onPeriodChange(opt.id);
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors hover:bg-slate-50"
                    style={{
                      color: opt.id === selectedPeriod ? APP_COLORS.blues.interactiveCta : APP_COLORS.texts.primary,
                      fontWeight: opt.id === selectedPeriod ? 700 : 500,
                    }}
                  >
                    <span>{opt.label}</span>
                    {opt.id === selectedPeriod && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}

                <div className="border-t my-1" style={{ borderColor: APP_COLORS.greys.stroke }} />

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenCustomPeriod?.();
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors hover:bg-slate-50 font-bold"
                  style={{
                    color: selectedPeriod === "custom" ? APP_COLORS.blues.interactiveCta : APP_COLORS.texts.primary,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Custom Period...</span>
                  </div>
                  {selectedPeriod === "custom" && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Export Report CTA */}
        <button
          type="button"
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-all hover:opacity-95 active:scale-98"
          style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
}
