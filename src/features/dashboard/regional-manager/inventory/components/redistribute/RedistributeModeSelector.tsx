import { ArrowLeftRight, ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { RedistributeMode } from "../../../types/rm-redistribute.types";

interface RedistributeModeSelectorProps {
  mode: RedistributeMode;
  onSelectMode: (mode: RedistributeMode) => void;
}

export function RedistributeModeSelector({
  mode,
  onSelectMode,
}: RedistributeModeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* 1. SC to SC Transfer */}
      <button
        type="button"
        onClick={() => onSelectMode("sc-to-sc")}
        className={`relative flex flex-col justify-between rounded-3xl p-5 text-left transition-all ${
          mode === "sc-to-sc"
            ? "border-2 border-[#1E293B] bg-white shadow-md"
            : "border border-slate-200 bg-white hover:border-slate-300 shadow-2xs"
        }`}
      >
        {mode === "sc-to-sc" && (
          <div className="absolute top-4 right-4 flex size-5 items-center justify-center rounded-full bg-[#1E293B] text-white">
            <Check className="size-3 stroke-[3]" />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
            <ArrowLeftRight className="size-5" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0F152A]">
              SC to SC Transfer
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Move SIMs from one of your State Coordinators to another
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1.5 rounded-xl bg-[#FFFBEB] px-2.5 py-1.5 text-[11px] text-[#92400E]">
          <span className="text-xs">💡</span>
          <span className="leading-snug">
            <strong>Best for:</strong> SC running low while another SC has excess stock
          </span>
        </div>
      </button>

      {/* 2. Recall from SC */}
      <button
        type="button"
        onClick={() => onSelectMode("recall")}
        className={`relative flex flex-col justify-between rounded-3xl p-5 text-left transition-all ${
          mode === "recall"
            ? "border-2 border-[#10B981] bg-white shadow-md"
            : "border border-slate-200 bg-white hover:border-slate-300 shadow-2xs"
        }`}
      >
        {mode === "recall" && (
          <div className="absolute top-4 right-4 flex size-5 items-center justify-center rounded-full bg-[#10B981] text-white">
            <Check className="size-3 stroke-[3]" />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[#EBFFF8] text-[#10B981]">
            <ArrowLeft className="size-5" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0F152A]">
              Recall from SC
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Bring stock back from an SC into your own inventory
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1.5 rounded-xl bg-[#FFFBEB] px-2.5 py-1.5 text-[11px] text-[#92400E]">
          <span className="text-xs">💡</span>
          <span className="leading-snug">
            <strong>Best for:</strong> SC with excess stock, inactive SC, or closing an SC account
          </span>
        </div>
      </button>

      {/* 3. RM to SC (Quick) */}
      <button
        type="button"
        onClick={() => onSelectMode("quick-dist")}
        className={`relative flex flex-col justify-between rounded-3xl p-5 text-left transition-all ${
          mode === "quick-dist"
            ? "border-2 border-[#2563EB] bg-white shadow-md"
            : "border border-slate-200 bg-white hover:border-slate-300 shadow-2xs"
        }`}
      >
        {mode === "quick-dist" && (
          <div className="absolute top-4 right-4 flex size-5 items-center justify-center rounded-full bg-[#2563EB] text-white">
            <Check className="size-3 stroke-[3]" />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-indigo-50 text-[#4F46E5]">
            <ArrowRight className="size-5" />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0F152A]">
              RM to SC (Quick)
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Quickly send stock from your inventory to a specific SC
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1.5 rounded-xl bg-[#FFFBEB] px-2.5 py-1.5 text-[11px] text-[#92400E]">
          <span className="text-xs">💡</span>
          <span className="leading-snug">
            <strong>Best for:</strong> Topping up a specific SC without the full distribute flow
          </span>
        </div>
      </button>
    </div>
  );
}
