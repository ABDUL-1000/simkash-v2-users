import { XCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface EasyBuyCommissionCancelledModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobRef?: string;
  product?: string;
  commissionAmount?: number;
  jobFee?: number;
  reason?: string;
  onContactAdmin?: () => void;
}

export function EasyBuyCommissionCancelledModal({
  open,
  onOpenChange,
  jobRef = "JOB-2026-00841",
  product = "Basic CCTV Package",
  commissionAmount = 22500,
  jobFee = 65000,
  reason = "Dispute resolved against installer — re-visit required",
  onContactAdmin,
}: EasyBuyCommissionCancelledModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      footer={
        <div className="flex w-full items-center justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
          >
            Acknowledge
          </button>
          <button
            type="button"
            onClick={onContactAdmin}
            className="cursor-pointer rounded-xl bg-[#EF4444] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#DC2626]"
          >
            Contact Admin
          </button>
        </div>
      }
    >
      <div className="space-y-3.5 py-1 text-xs">
        {/* Red Title */}
        <div className="flex items-center gap-2 font-bold text-base text-[#EF4444]">
          <XCircle className="size-5 shrink-0 text-[#EF4444]" />
          <span>EasyBuy Commission Cancelled</span>
        </div>

        {/* Top notice banner */}
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-3.5 text-xs text-[#B91C1C] leading-relaxed">
          Your EasyBuy commission for <strong>{jobRef}</strong> has been cancelled following a dispute resolution.
        </div>

        {/* Summary Details Box */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#F8FAFC] p-3.5 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[#8C909B]">Job ID</span>
            <span className="font-bold text-[#0F172A]">{jobRef}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C909B]">Product</span>
            <span className="font-bold text-[#0F172A]">{product}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8C909B]">Commission</span>
            <span className="font-bold text-[#EF4444]">₦{commissionAmount.toLocaleString()} (cancelled)</span>
          </div>
          <div className="flex justify-between items-start gap-2">
            <span className="text-[#8C909B] shrink-0">Reason</span>
            <span className="text-right font-bold text-[#EF4444] leading-tight">{reason}</span>
          </div>
        </div>

        {/* Installation Fee Status */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Your Installation Fee
          </span>
          <div className="flex items-center gap-2 font-bold text-[#10B981]">
            <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
            <span>₦{jobFee.toLocaleString()} job fee: UNAFFECTED</span>
          </div>
          <p className="text-[11px] text-[#059669] pl-6">
            Your job fee is separate and is not cancelled.
          </p>
        </div>

        {/* EasyBuy Commission Status */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            EasyBuy Commission
          </span>
          <div className="flex items-center gap-2 font-bold text-[#EF4444]">
            <XCircle className="size-4 shrink-0 text-[#EF4444]" />
            <span>₦{commissionAmount.toLocaleString()} EasyBuy commission: CANCELLED</span>
          </div>
          <p className="text-[11px] text-[#64748B] pl-6 italic">
            If you re-install and dispute resolves in your favour, commission may be reinstated.
          </p>
        </div>

        {/* Warning callout */}
        <div className="flex items-start gap-2 rounded-xl border border-[#FDE68A] bg-[#FEF3C7] p-3 text-xs text-[#92400E]">
          <AlertCircle className="size-4 shrink-0 text-[#D97706] mt-0.5" />
          <span>If you believe this cancellation is incorrect, contact Admin immediately.</span>
        </div>
      </div>
    </AppModal>
  );
}
