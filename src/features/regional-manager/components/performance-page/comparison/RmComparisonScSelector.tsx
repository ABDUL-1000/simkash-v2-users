import { useState } from "react";
import { Plus, X, RotateCcw, Check } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { RM_SC_PERFORMANCE_DATA } from "../../../data/regional-manager-performance.data";


interface RmComparisonScSelectorProps {
  selectedScIds: string[];
  onToggleSc: (id: string) => void;
  onReset: () => void;
}

export function RmComparisonScSelector({
  selectedScIds,
  onToggleSc,
  onReset,
}: RmComparisonScSelectorProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const selectedScs = RM_SC_PERFORMANCE_DATA.filter((sc) => selectedScIds.includes(sc.id));

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Compare State Coordinators Head-to-Head
          </h3>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Select 2 to 4 coordinators to benchmark performance metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Add SC Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setPickerOpen(!pickerOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors hover:bg-slate-50"
              style={{
                borderColor: APP_COLORS.blues.interactiveCta,
                color: APP_COLORS.blues.interactiveCta,
                backgroundColor: APP_COLORS.blues.surfaceLight,
              }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Coordinator</span>
            </button>

            {pickerOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setPickerOpen(false)} />
                <div
                  className="absolute right-0 mt-1 w-64 max-h-72 overflow-y-auto rounded-xl border shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100"
                  style={{
                    backgroundColor: APP_COLORS.backgrounds.background,
                    borderColor: APP_COLORS.greys.stroke,
                  }}
                >
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Coordinators
                  </div>
                  {RM_SC_PERFORMANCE_DATA.map((sc) => {
                    const isSelected = selectedScIds.includes(sc.id);
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => {
                          onToggleSc(sc.id);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors hover:bg-slate-50"
                        style={{
                          color: isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.texts.primary,
                          fontWeight: isSelected ? 700 : 500,
                        }}
                      >
                        <div>
                          <span className="block">{sc.scName}</span>
                          <span className="text-[10px] text-slate-400">{sc.state} State</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold hover:bg-slate-100 transition-colors"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              color: APP_COLORS.texts.slate,
            }}
            title="Reset to Top 3 Coordinators"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Selected Tags */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
        {selectedScs.map((sc, idx) => (
          <div
            key={sc.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-2xs"
            style={{
              backgroundColor:
                idx === 0
                  ? "#EFF6FF"
                  : idx === 1
                  ? "#ECFDF5"
                  : idx === 2
                  ? "#FAF5FF"
                  : "#FFFBEB",
              borderColor:
                idx === 0
                  ? "#BFDBFE"
                  : idx === 1
                  ? "#A7F3D0"
                  : idx === 2
                  ? "#E9D5FF"
                  : "#FDE68A",
              color:
                idx === 0
                  ? "#1E40AF"
                  : idx === 1
                  ? "#065F46"
                  : idx === 2
                  ? "#6B21A8"
                  : "#92400E",
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor:
                  idx === 0
                    ? "#2563EB"
                    : idx === 1
                    ? "#10B981"
                    : idx === 2
                    ? "#9333EA"
                    : "#F59E0B",
              }}
            />
            <span>{sc.scName} ({sc.state})</span>
            {selectedScIds.length > 2 && (
              <button
                type="button"
                onClick={() => onToggleSc(sc.id)}
                className="hover:opacity-75 p-0.5 rounded"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}

        <span className="text-[11px] text-slate-400 font-medium ml-1">
          {selectedScIds.length} coordinators active in comparison
        </span>
      </div>
    </div>
  );
}
