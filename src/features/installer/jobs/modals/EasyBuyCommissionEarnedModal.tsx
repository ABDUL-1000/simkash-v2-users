import { CreditCard, Trophy } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface EasyBuyCommissionEarnedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commissionAmount?: number;
  jobFee?: number;
  customerName?: string;
  onViewWallet?: () => void;
  onViewCommission?: () => void;
}

export function EasyBuyCommissionEarnedModal({
  open,
  onOpenChange,
  commissionAmount = 22500,
  jobFee = 65000,
  customerName = "Chidi Eze",
  onViewWallet,
  onViewCommission,
}: EasyBuyCommissionEarnedModalProps) {
  const total = jobFee + commissionAmount;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      footer={
        <div className="flex w-full items-center justify-between gap-2 pt-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onViewWallet?.();
            }}
            className="cursor-pointer text-xs font-bold text-[#2563EB] hover:underline"
          >
            View Wallet
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onViewCommission?.();
              }}
              className="cursor-pointer rounded-xl border border-[#BFDBFE] bg-white px-3.5 py-2 text-xs font-bold text-[#2563EB] hover:bg-[#EFF6FF]"
            >
              View EasyBuy Commission
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer rounded-xl bg-[#1E293B] px-6 py-2 text-xs font-bold text-white hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-center text-xs">
        {/* Top 5 decorative colored dots */}
        <div className="flex items-center justify-between px-6">
          <span className="size-1.5 rounded-full bg-[#10B981]" />
          <span className="size-1.5 rounded-full bg-[#F59E0B]" />
          <span className="size-1.5 rounded-full bg-[#8B5CF6]" />
          <span className="size-1.5 rounded-full bg-[#3B82F6]" />
          <span className="size-1.5 rounded-full bg-[#EF4444]" />
        </div>

        {/* Big celebration credit card icon */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
          <CreditCard className="size-8" />
        </div>

        <div>
          <h3 className="text-2xl font-black text-[#0F172A]">EasyBuy Commission Earned!</h3>
          <p className="mt-1 text-xs text-[#66738C]">
            {customerName} completed their EasyBuy plan! Your commission is now paid.
          </p>
        </div>

        {/* Navy Highlight box */}
        <div className="rounded-3xl bg-[#152846] p-5 text-white shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
            EasyBuy Commission Paid
          </span>
          <div className="mt-1 text-3xl font-black text-[#3B82F6]">
            ₦{commissionAmount.toLocaleString()}
          </div>
          <p className="mt-0.5 text-xs text-white/80">5% of ₦450,000 plan value</p>
          <span className="mt-1 block text-[11px] text-white/70">Credited: Just now</span>
        </div>

        {/* Full earnings breakdown */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-left space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Full Earnings from this Job
          </span>
          <div className="flex justify-between text-[#66738C]">
            <span>Job fee paid earlier</span>
            <span className="font-bold text-[#10B981]">₦{jobFee.toLocaleString()} ✓</span>
          </div>
          <div className="flex justify-between text-[#66738C]">
            <span>EasyBuy commission</span>
            <span className="font-bold text-[#2563EB]">+₦{commissionAmount.toLocaleString()} ✓</span>
          </div>
          <div className="flex justify-between border-t border-[#E2ECF6] pt-2 font-bold text-[#0F172A]">
            <span>Total from this job</span>
            <span className="font-black text-sm">₦{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Wallet update box */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-white p-3 font-bold text-xs text-[#0F172A] shadow-xs">
          Wallet: ₦148,000 → ₦170,500 (+₦{commissionAmount.toLocaleString()})
        </div>

        {/* Target note callout */}
        <div className="flex items-center gap-2 rounded-xl border border-[#FDE68A] bg-[#FEF3C7] p-3 text-left text-xs text-[#92400E]">
          <Trophy className="size-4 shrink-0 text-[#D97706]" />
          <span>This EasyBuy job counted toward your 12-job bonus target.</span>
        </div>
      </div>
    </AppModal>
  );
}
