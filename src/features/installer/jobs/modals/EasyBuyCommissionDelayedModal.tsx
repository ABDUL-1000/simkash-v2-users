import { AlertTriangle, Info, CheckCircle2, Circle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface EasyBuyCommissionDelayedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
  commissionAmount?: number;
  planProgress?: number;
  onContactAdmin?: () => void;
}

export function EasyBuyCommissionDelayedModal({
  open,
  onOpenChange,
  customerName = "Emeka Obi",
  commissionAmount = 39000,
  planProgress = 45,
  onContactAdmin,
}: EasyBuyCommissionDelayedModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      footer={
        <div className="flex w-full items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onContactAdmin}
            className="cursor-pointer text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
          >
            Contact Admin if Concerned
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-xl bg-[#F59E0B] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#D97706]"
          >
            Acknowledge
          </button>
        </div>
      }
    >
      <div className="space-y-3.5 py-1 text-xs">
        {/* Amber Alert Header */}
        <div className="flex items-center gap-2 font-bold text-base text-[#D97706]">
          <AlertTriangle className="size-5 shrink-0 text-[#D97706]" />
          <span>EasyBuy Commission Delayed</span>
        </div>

        {/* Plan details yellow card */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FEF3C7]/90 p-4 space-y-1.5 text-xs">
          <h4 className="font-bold text-[#0F172A]">PLAN-2026-00844 · First Bank Ikeja</h4>
          <p className="text-[11px] text-[#66738C]">Standard CCTV 8-cam</p>
          <p className="text-[11px] text-[#66738C]">{customerName} · 08099282811</p>
          <div className="border-t border-[#FDE68A] pt-1.5 font-bold text-[#D97706]">
            Plan progress: {planProgress}% · 1 weekly payment missed
          </div>
        </div>

        {/* Commission status blue card */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#F0F7FF] p-4 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Your Commission Status
          </span>
          <div className="text-3xl font-black text-[#2563EB]">
            ₦{commissionAmount.toLocaleString()}
          </div>
          <p className="text-xs font-bold text-[#D97706]">
            Pending · Delayed by missed payment
          </p>
        </div>

        {/* Info callout */}
        <div className="flex items-start gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs text-[#1E40AF]">
          <Info className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
          <p className="leading-relaxed">
            Your commission is <strong>NOT cancelled</strong> — it is delayed until {customerName.split(" ")[0]}'s plan resumes.
          </p>
        </div>

        {/* Simkash Recovery process */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2.5 text-xs text-[#0F172A]">
          <h5 className="font-bold">Simkash is managing recovery:</h5>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#0F172A]">
              <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
              <span>SMS reminder sent (automated)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <Circle className="size-4 shrink-0 text-[#CBD5E1]" />
              <span>Admin call if no response (pending)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <Circle className="size-4 shrink-0 text-[#CBD5E1]" />
              <span>Account suspension if continued</span>
            </div>
          </div>

          <p className="pt-1 text-[11px] text-[#8C909B] italic">
            You do not need to contact the customer — Simkash handles this.
          </p>
        </div>
      </div>
    </AppModal>
  );
}
