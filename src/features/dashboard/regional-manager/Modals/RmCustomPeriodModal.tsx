import { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RmCustomPeriodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialStartDate?: string;
  initialEndDate?: string;
  onApply: (period: { startDate: string; endDate: string; label: string; daysCount: number }) => void;
}

export function RmCustomPeriodModal({
  open,
  onOpenChange,
  onApply,
}: RmCustomPeriodModalProps) {
  // June 2026 starts on Monday (1 = Monday, so Su is blank)
  // July 2026 starts on Wednesday (1 = Wednesday, Su and Mo are blank)
  const [startDay, setStartDay] = useState<number>(1);
  const [endDay, setEndDay] = useState<number>(24);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const daysCount = Math.max(endDay - startDay + 1, 1);

  const juneDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const julyDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSelectDay = (day: number) => {
    setActivePreset(null);
    if (day < startDay) {
      setStartDay(day);
      setEndDay(day);
    } else if (day === startDay) {
      // Toggle or reset
      setEndDay(day);
    } else {
      setEndDay(day);
    }
  };

  const handlePreset = (preset: "7" | "14" | "30" | "90") => {
    setActivePreset(preset);
    if (preset === "7") {
      setStartDay(18);
      setEndDay(24);
    } else if (preset === "14") {
      setStartDay(11);
      setEndDay(24);
    } else if (preset === "30") {
      setStartDay(1);
      setEndDay(30);
    } else if (preset === "90") {
      setStartDay(1);
      setEndDay(30);
    }
  };

  const handleApply = () => {
    const label = `${startDay} Jun 2026 — ${endDay} Jun 2026`;
    onApply({
      startDate: `2026-06-${String(startDay).padStart(2, "0")}`,
      endDate: `2026-06-${String(endDay).padStart(2, "0")}`,
      label,
      daysCount,
    });
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Select Custom Period"
      description="Define a specific date range"
      descriptionColor={APP_COLORS.texts.slate}
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* DUAL MONTH CALENDARS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3 rounded-2xl border" style={{ borderColor: APP_COLORS.greys.stroke }}>
          {/* MONTH 1: JUNE 2026 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-bold text-sm text-slate-900">
              <button type="button" className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>June 2026</span>
              <button type="button" className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-slate-400">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* June Dates Grid (starts on Monday, June 1 = col 2) */}
            <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center text-xs font-semibold">
              {/* Sunday June 1 offset */}
              <div />

              {juneDays.map((day) => {
                const isStart = day === startDay;
                const isEnd = day === endDay;
                const isInRange = day >= startDay && day <= endDay;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    className={`h-8 w-full flex items-center justify-center transition-all ${
                      isStart
                        ? "rounded-l-full bg-blue-600 text-white font-bold shadow-xs"
                        : isEnd
                        ? "rounded-r-full bg-blue-600 text-white font-bold shadow-xs"
                        : isInRange
                        ? "bg-blue-50 text-blue-700 font-bold"
                        : "text-slate-700 hover:bg-slate-100 rounded-full"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MONTH 2: JULY 2026 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-bold text-sm text-slate-900">
              <button type="button" className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>July 2026</span>
              <button type="button" className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-slate-400">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* July Dates Grid (starts on Wednesday, July 1 = col 4) */}
            <div className="grid grid-cols-7 gap-y-1 gap-x-0.5 text-center text-xs font-semibold">
              {/* Sunday, Monday, Tuesday offsets */}
              <div />
              <div />
              <div />

              {julyDays.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => {}}
                  className="h-8 w-full flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-full"
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SELECTED PERIOD SUMMARY BOX */}
        <div
          className="rounded-2xl p-4 border text-center space-y-0.5"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <div className="text-base sm:text-lg font-black" style={{ color: APP_COLORS.blues.primary }}>
            {startDay} Jun 2026 — {endDay} Jun 2026
          </div>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            {daysCount} days selected
          </p>
        </div>

        {/* QUICK PRESETS */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: APP_COLORS.texts.slate }}>
            Quick Presets
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "7", label: "Last 7 days" },
              { id: "14", label: "Last 14 days" },
              { id: "30", label: "Last 30 days" },
              { id: "90", label: "Last 90 days" },
            ].map((p) => {
              const isSelected = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePreset(p.id as any)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    isSelected ? "border-blue-500 bg-blue-50 text-blue-700 shadow-xs" : "hover:bg-slate-50 text-slate-700"
                  }`}
                  style={{ borderColor: isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.greys.stroke }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* WARNING NOTICE */}
        <div
          className="p-3 rounded-xl border flex items-start gap-2.5"
          style={{
            backgroundColor: "#FFFBEB",
            borderColor: "#FDE68A",
          }}
        >
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] font-medium text-amber-800 leading-relaxed">
            Custom periods spanning more than 90 days may take longer to generate.
          </p>
        </div>

        {/* FOOTER ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors hover:bg-slate-100 text-slate-700"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Apply Period
          </button>
        </div>
      </div>
    </AppModal>
  );
}
