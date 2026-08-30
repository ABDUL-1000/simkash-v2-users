"use client";

import { AppModal } from "@/components/common/AppModal";
import { Calendar } from "lucide-react";

type BonusHistoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  onAddOverrideClick?: () => void;
};

export function BonusHistoryModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  onAddOverrideClick,
}: BonusHistoryModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Bonus History"
      description={`${agentName} · Agency Partner`}
      size="md"
      actions={[
        { key: "close", label: "Close", variant: "primary", closeOnClick: true },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Agent Summary Card */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-1">
          <strong className="font-bold text-[#0F172A] block text-sm">{agentName} · 08120600542</strong>
          <span className="text-[11px] text-[#64748B]">Agency Partner · Lagos</span>
          <span className="text-[11px] text-[#94A3B8] block">On platform since Jan 2026</span>
        </div>

        {/* 4 Stat Boxes */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
            <span className="text-[9px] font-bold uppercase text-[#64748B] block">PERIODS HIT</span>
            <strong className="text-base font-extrabold text-[#0F172A]">0</strong>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
            <span className="text-[9px] font-bold uppercase text-[#64748B] block">MISSED</span>
            <strong className="text-base font-extrabold text-[#0F172A]">0</strong>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
            <span className="text-[9px] font-bold uppercase text-[#64748B] block">HIT RATE</span>
            <strong className="text-base font-extrabold text-[#0F172A]">0%</strong>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
            <span className="text-[9px] font-bold uppercase text-[#64748B] block">TOTAL EARNED</span>
            <strong className="text-base font-extrabold text-[#0F172A]">₦0</strong>
          </div>
        </div>

        {/* Table / Empty State */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center space-y-3">
          <div className="size-12 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mx-auto text-[#64748B]">
            <Calendar className="size-6 text-[#64748B]" />
          </div>
          <p className="text-xs text-[#64748B] max-w-xs mx-auto leading-relaxed">
            No bonus history yet. This agent has not completed any bonus periods.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            className="flex-1 rounded-xl border border-[#CBD5E1] bg-white py-2 text-xs font-bold text-[#64748B] opacity-50 cursor-not-allowed"
            disabled
          >
            Export History
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onAddOverrideClick?.();
            }}
            className="flex-1 rounded-xl border border-[#CBD5E1] bg-white py-2 text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Add Override
          </button>
        </div>
      </div>
    </AppModal>
  );
}
