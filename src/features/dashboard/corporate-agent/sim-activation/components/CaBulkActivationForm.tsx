import { APP_COLORS } from "@/constants/colors";
import {
  Clipboard,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Circle,
  Info,
  ArrowRight,
  Target,
} from "lucide-react";
import type { CaBulkSimItem } from "../types/ca-sim-activation.types";

interface CaBulkActivationFormProps {
  bulkSims: CaBulkSimItem[];
  onUpdateBulkText: (text: string) => void;
  onClearBulk: () => void;
  onPasteClipboard: () => void;
  sameCustomerForAll: boolean;
  onToggleSameCustomer: (val: boolean) => void;
  onCancel: () => void;
  onReviewAndConfirm: () => void;
  combinedTargetCurrent?: number;
}

export function CaBulkActivationForm({
  bulkSims,
  onUpdateBulkText,
  onClearBulk,
  onPasteClipboard,
  sameCustomerForAll,
  onToggleSameCustomer,
  onCancel,
  onReviewAndConfirm,
  combinedTargetCurrent = 2218,
}: CaBulkActivationFormProps) {
  const bulkText = bulkSims.map((s) => s.simNumber).join("\n");

  const validCount = bulkSims.filter((s) => s.status === "valid").length;
  const errorCount = bulkSims.filter(
    (s) => s.status === "invalid" || s.status === "already_active"
  ).length;
  const checkingCount = bulkSims.filter((s) => s.status === "checking").length;
  const totalCount = bulkSims.length;
  const commission = validCount * 600;

  return (
    <div className="space-y-6">
      {/* 2-Column: Left textarea, Right validation list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: SIM NUMBERS (ONE PER LINE) */}
        <div className="lg:col-span-7 space-y-2">
          <label
            className="text-[11px] font-black uppercase tracking-wider block"
            style={{ color: APP_COLORS.texts.slate }}
          >
            SIM NUMBERS (ONE PER LINE)
          </label>

          <div
            className="rounded-2xl border p-3 bg-white shadow-2xs"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <textarea
              rows={7}
              value={bulkText}
              onChange={(e) => onUpdateBulkText(e.target.value)}
              placeholder={`07022222222\n07033333333\n07044444444\n07055555555\n07066666666`}
              className="w-full font-mono text-xs sm:text-sm font-semibold outline-hidden resize-none leading-relaxed"
              style={{ color: APP_COLORS.texts.primary }}
            />

            {/* Actions & Status bar */}
            <div
              className="pt-2 mt-2 border-t flex flex-wrap items-center justify-between gap-2"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onPasteClipboard}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Clipboard className="size-3.5" />
                  <span>Paste from clipboard</span>
                </button>
                <button
                  type="button"
                  onClick={onClearBulk}
                  className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <Trash2 className="size-3.5" />
                  <span>Clear all</span>
                </button>
              </div>

              {/* Status summary */}
              <div className="text-[11px] font-bold text-slate-500">
                {totalCount} SIMs entered ·{" "}
                <span className="text-emerald-600">{validCount} valid</span> ·{" "}
                <span className="text-red-600">{errorCount} error</span> ·{" "}
                <span className="text-amber-600">{checkingCount} checking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: VALIDATION PREVIEW */}
        <div className="lg:col-span-5 space-y-2">
          <label
            className="text-[11px] font-black uppercase tracking-wider block"
            style={{ color: APP_COLORS.texts.slate }}
          >
            VALIDATION
          </label>

          <div
            className="rounded-2xl border p-4 bg-white shadow-2xs space-y-2.5 min-h-[220px] flex flex-col justify-between"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="space-y-2 text-xs font-mono">
              {bulkSims.map((sim, i) => (
                <div
                  key={sim.id || i}
                  className="flex items-center justify-between py-1 border-b last:border-b-0"
                  style={{ borderColor: APP_COLORS.backgrounds.surface }}
                >
                  <span className="font-bold text-slate-800">
                    {sim.simNumber}
                  </span>

                  <div className="flex items-center gap-1.5 font-sans text-xs">
                    {sim.status === "valid" && (
                      <span className="flex items-center gap-1 font-bold text-emerald-600">
                        <CheckCircle2 className="size-3.5" />
                        <span>Valid</span>
                      </span>
                    )}
                    {sim.status === "already_active" && (
                      <span className="flex items-center gap-1 font-bold text-red-600">
                        <XCircle className="size-3.5" />
                        <span>Already active</span>
                      </span>
                    )}
                    {sim.status === "checking" && (
                      <span className="flex items-center gap-1 font-bold text-amber-600">
                        <Clock className="size-3.5 animate-spin" />
                        <span>Checking...</span>
                      </span>
                    )}
                    {sim.status === "pending" && (
                      <span className="flex items-center gap-1 font-bold text-slate-400">
                        <Circle className="size-3.5" />
                        <span>Pending</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SAME CUSTOMER FOR ALL SIMS TOGGLE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3.5 rounded-2xl border bg-white shadow-2xs" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              Same customer for all SIMs
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sameCustomerForAll}
              onChange={(e) => onToggleSameCustomer(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {sameCustomerForAll && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
            <Info className="size-4 text-amber-600 shrink-0" />
            <span>All SIMs will be registered to a single customer</span>
          </div>
        )}
      </div>

      {/* BULK SUMMARY CARD */}
      <div
        className="p-5 rounded-2xl border bg-white shadow-2xs space-y-3"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <span
          className="text-[11px] font-black uppercase tracking-wider block"
          style={{ color: APP_COLORS.texts.slate }}
        >
          BULK SUMMARY
        </span>

        <div className="space-y-2 text-xs font-bold divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <div className="flex items-center justify-between pb-2">
            <span className="text-slate-600">Valid SIMs</span>
            <span className="text-emerald-600 font-black">
              {validCount} (will be activated)
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-600">Errors (skip)</span>
            <span className="text-red-600 font-black">{errorCount}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-slate-600">Commission</span>
            <span className="text-emerald-600 font-black text-sm">
              +₦{commission.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Combined target updated */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-2">
          <Target className="size-4 text-slate-500 shrink-0" />
          <span>
            Current: {combinedTargetCurrent.toLocaleString()} →{" "}
            {(combinedTargetCurrent + validCount).toLocaleString()} after
          </span>
        </div>
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl border text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          Cancel
        </button>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="size-3.5" />
            <span>{validCount} of {totalCount} SIMs ready</span>
          </div>

          <button
            type="button"
            onClick={onReviewAndConfirm}
            disabled={validCount === 0}
            className="px-6 py-2.5 rounded-xl text-xs font-black text-white shadow-xs transition-all flex items-center gap-2 hover:opacity-95 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            <span>Review & Confirm</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
