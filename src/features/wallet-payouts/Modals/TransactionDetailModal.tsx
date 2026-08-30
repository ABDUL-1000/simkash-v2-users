"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type TransactionDetailModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  txnId?: string;
  amount?: string;
  title?: string;
  onFlagSuccess?: () => void;
};

export function TransactionDetailModal({
  open,
  onOpenChange,
  txnId = "TXN-2025-061204",
  amount = "+₦1,000",
  
  onFlagSuccess,
}: TransactionDetailModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Transaction Detail"
      description={txnId}
      size="md"
      actions={[
        { key: "close", label: "Close", variant: "secondary", closeOnClick: true },
        {
          key: "flag",
          label: "Flag Transaction",
          variant: "danger",
          onClick: () => {
            onFlagSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Top Header Card */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-5 text-center space-y-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-[#2563EB] text-white font-bold mx-auto shadow-xs">
            <ArrowUpRight className="size-5" />
          </div>

          <strong className="text-2xl sm:text-3xl font-extrabold text-[#059669] block">
            {amount}
          </strong>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-3 py-0.5 text-xs font-bold text-[#059669]">
              Commission — SIM Activation
            </span>
          </div>

          <p className="text-xs text-[#64748B]">04 Jun 2025 · 14:32</p>

          <div>
            <span className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 text-[10px] font-bold text-[#059669]">
              ● Completed
            </span>
          </div>
        </div>

        {/* Transaction Details List */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 text-xs space-y-2.5 divide-y divide-[#F1F5F9]">
          <div className="flex justify-between pt-0.5 text-[#64748B]">
            <span>Transaction ID</span>
            <strong className="font-bold text-[#0F172A]">{txnId}</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Date & Time</span>
            <strong className="font-bold text-[#0F172A]">04 Jun 2025 · 14:32:07</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Type</span>
            <strong className="font-bold text-[#0F172A]">Commission</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Category</span>
            <strong className="font-bold text-[#0F172A]">SIM Activation</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Amount</span>
            <strong className="font-extrabold text-[#059669]">{amount}</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Wallet Balance After</span>
            <strong className="font-bold text-[#0F172A]">₦124,500</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Related SIM</span>
            <strong className="font-bold text-[#0F172A]">MTN-POS-2209874</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Customer</span>
            <strong className="font-bold text-[#0F172A]">Adewale Bello · 08031234567</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Reference</span>
            <strong className="font-mono font-bold text-[#0F172A]">SIMKASH-ACT-2209874</strong>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#0F172A] hover:bg-[#E2E8F0]"
          >
            <Download className="size-4" />
            <span>PDF Receipt</span>
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] py-2.5 text-xs font-bold text-[#0F172A] hover:bg-[#E2E8F0]"
          >
            <Download className="size-4" />
            <span>CSV Export</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
}
