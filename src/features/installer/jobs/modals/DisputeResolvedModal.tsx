import { Scale } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface DisputeResolvedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rulingText?: string;
  agreedAmount?: number;
  deductedAmount?: number;
  onViewWallet?: () => void;
}

export function DisputeResolvedModal({
  open,
  onOpenChange,
  rulingText = "Admin determined 2 cameras were incorrectly installed. Partial payment of ₦28,500 (75%) agreed.",
  agreedAmount = 28500,
  deductedAmount = 9500,
  onViewWallet,
}: DisputeResolvedModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onViewWallet?.();
            }}
            className="cursor-pointer rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC]"
          >
            View Wallet
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-xl bg-[#0F152A] px-6 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-2 text-center text-xs">
        {/* Scale of justice badge */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706]">
          <Scale className="size-8" />
        </div>

        <div>
          <h3 className="text-xl font-black text-[#0F152A]">Dispute Resolved</h3>
          <div className="mt-2">
            <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-bold text-[#D97706]">
              Partial payment agreed
            </span>
          </div>
        </div>

        {/* Ruling callout box */}
        <div className="rounded-2xl bg-[#FEF9C3] p-3.5 text-center text-xs font-medium leading-relaxed text-[#92400E]">
          "{rulingText}"
        </div>

        {/* Large Amount */}
        <div>
          <div className="text-3xl font-black text-[#10B981]">
            ₦{agreedAmount.toLocaleString()}
          </div>
          <div className="mt-1 text-xs font-semibold text-[#EF4444]">
            ₦{deductedAmount.toLocaleString()} deducted per ruling
          </div>
        </div>
      </div>
    </AppModal>
  );
}
