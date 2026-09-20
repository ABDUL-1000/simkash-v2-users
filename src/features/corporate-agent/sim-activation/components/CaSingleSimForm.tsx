import { APP_COLORS } from "@/constants/colors";
import { Check, QrCode, ArrowRight, DollarSign, Target } from "lucide-react";
import type { CaPlanOption } from "../types/ca-sim-activation.types";

interface CaSingleSimFormProps {
  simNumber: string;
  onSimNumberChange: (value: string) => void;
  onScanQr: () => void;
  isMultipleSims: boolean;
  onToggleMultipleSims: (val: boolean) => void;
  plans: CaPlanOption[];
  selectedPlanId: string;
  onSelectPlan: (planId: string) => void;
  commissionAmount?: number;
  combinedTargetCurrent?: number;
  combinedTargetTotal?: number;
  onClearForm: () => void;
  onNext: () => void;
}

export function CaSingleSimForm({
  simNumber,
  onSimNumberChange,
  onScanQr,
  isMultipleSims,
  onToggleMultipleSims,
  plans,
  selectedPlanId,
  onSelectPlan,
  commissionAmount = 600,
  combinedTargetCurrent = 2218,
  combinedTargetTotal = 3000,
  onClearForm,
  onNext,
}: CaSingleSimFormProps) {
  const isSimVerified = simNumber.trim().length === 11;
  const currentPct = ((combinedTargetCurrent / combinedTargetTotal) * 100).toFixed(1);
  const nextPct = (((combinedTargetCurrent + 1) / combinedTargetTotal) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* SIM NUMBER SECTION */}
      <div className="space-y-2">
        <label
          className="text-[11px] font-black uppercase tracking-wider block"
          style={{ color: APP_COLORS.texts.slate }}
        >
          SIM NUMBER
        </label>

        <div
          className="flex items-center rounded-2xl border px-4 py-3 bg-white transition-all shadow-2xs focus-within:ring-2 focus-within:ring-blue-500/20"
          style={{
            borderColor: isSimVerified
              ? APP_COLORS.greens.green
              : APP_COLORS.greys.stroke,
          }}
        >
          {/* Prefix # */}
          <span
            className="text-base font-bold mr-2 select-none"
            style={{ color: APP_COLORS.texts.slate }}
          >
            #
          </span>

          {/* Input field */}
          <input
            type="text"
            value={simNumber}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 11);
              onSimNumberChange(val);
            }}
            placeholder="07022222222"
            maxLength={11}
            className="flex-1 bg-transparent font-mono text-sm sm:text-base font-bold tracking-wider outline-hidden"
            style={{ color: APP_COLORS.texts.primary }}
          />

          {/* Counter and Scan Button */}
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-bold"
              style={{ color: APP_COLORS.texts.slate }}
            >
              {simNumber.length}/11
            </span>

            <button
              type="button"
              onClick={onScanQr}
              className="p-1 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
              title="Scan SIM barcode or QR code"
            >
              <QrCode className="size-5" />
            </button>
          </div>
        </div>

        {/* Verification Status */}
        {isSimVerified && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#10B981] pt-0.5">
            <Check className="size-4 stroke-[3]" />
            <span>SIM verified · Ready to activate</span>
          </div>
        )}

        {/* Toggle Multiple SIMs */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">
              Activate multiple SIMs at once
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isMultipleSims}
              onChange={(e) => onToggleMultipleSims(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* ACTIVATION PLAN SECTION */}
      <div className="space-y-2.5">
        <label
          className="text-[11px] font-black uppercase tracking-wider block"
          style={{ color: APP_COLORS.texts.slate }}
        >
          ACTIVATION PLAN
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => onSelectPlan(plan.id)}
                className="p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between group"
                style={{
                  borderColor: isSelected
                    ? APP_COLORS.blues.interactiveCta
                    : APP_COLORS.greys.stroke,
                  borderWidth: isSelected ? "2px" : "1px",
                  backgroundColor: isSelected
                    ? "#FFFFFF"
                    : APP_COLORS.backgrounds.background,
                }}
              >
                {/* Best Value Badge */}
                {plan.isBestValue && (
                  <span
                    className="absolute right-3.5 top-3.5 text-[9px] font-black tracking-wider px-2 py-0.5 rounded-full uppercase"
                    style={{
                      backgroundColor: APP_COLORS.greens.light,
                      color: APP_COLORS.greens.green,
                    }}
                  >
                    BEST VALUE
                  </span>
                )}

                <div>
                  <div
                    className="text-[10px] font-black tracking-wider uppercase"
                    style={{ color: APP_COLORS.texts.slate }}
                  >
                    {plan.label}
                  </div>

                  <div
                    className="text-xl font-black mt-1"
                    style={{ color: APP_COLORS.texts.primary }}
                  >
                    {plan.price}
                  </div>

                  <p
                    className="text-[11px] font-medium mt-1 leading-snug"
                    style={{ color: APP_COLORS.texts.slate }}
                  >
                    {plan.description}
                  </p>

                  <p
                    className="text-[10px] font-semibold mt-1"
                    style={{ color: APP_COLORS.texts.slate }}
                  >
                    Expires {plan.expiryDate}
                  </p>
                </div>

                {/* Radio selection circle */}
                <div className="pt-3">
                  <div
                    className="size-4 rounded-full border flex items-center justify-center transition-colors"
                    style={{
                      borderColor: isSelected
                        ? APP_COLORS.blues.interactiveCta
                        : APP_COLORS.greys.stroke,
                    }}
                  >
                    {isSelected && (
                      <div
                        className="size-2 rounded-full"
                        style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* COMMISSION CALLOUT STRIP */}
      <div
        className="p-3.5 rounded-xl flex items-center justify-between"
        style={{
          backgroundColor: APP_COLORS.greens.light,
        }}
      >
        <div className="flex items-center gap-2">
          <DollarSign className="size-4 text-emerald-600" />
          <span
            className="text-xs font-black"
            style={{ color: APP_COLORS.texts.primary }}
          >
            Your commission:
          </span>
        </div>
        <span
          className="text-sm font-black"
          style={{ color: APP_COLORS.greens.green }}
        >
          +₦{commissionAmount.toLocaleString()}
        </span>
      </div>

      {/* COMBINED TARGET UPDATE STRIP */}
      <div
        className="p-3 rounded-xl flex items-center gap-2 text-xs font-bold"
        style={{
          backgroundColor: "#F1F5F9",
          color: APP_COLORS.texts.slate,
        }}
      >
        <Target className="size-4 text-slate-500 shrink-0" />
        <span className="truncate">
          Combined target: {combinedTargetCurrent.toLocaleString()} →{" "}
          {(combinedTargetCurrent + 1).toLocaleString()} ({currentPct}% → {nextPct}%)
        </span>
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <button
          type="button"
          onClick={onClearForm}
          className="text-xs font-bold hover:underline transition-colors cursor-pointer"
          style={{ color: APP_COLORS.texts.slate }}
        >
          Clear Form
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!isSimVerified}
          className="px-6 py-2.5 rounded-xl text-xs font-black text-white shadow-xs transition-all flex items-center gap-2 hover:opacity-95 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
        >
          <span>Next: Customer Info</span>
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
