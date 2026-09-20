import { CheckCircle2, Wallet, ArrowRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface VerificationSubmittedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobRef?: string;
  fee?: number;
  onGoToPending?: () => void;
}

export function VerificationSubmittedSuccessModal({
  open,
  onOpenChange,
  jobRef = "JOB-2026-00846",
  fee = 45000,
  onGoToPending,
}: VerificationSubmittedSuccessModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="Submitted for Verification!"
      description={`${jobRef} · Pending Review`}
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Done
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onGoToPending?.();
            }}
            className="flex items-center gap-1.5 rounded-xl bg-[#10B981] px-5 py-2 text-xs font-bold text-white hover:bg-[#059669]"
          >
            <span>View Pending Jobs</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-2 text-center text-xs">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
          <CheckCircle2 className="size-10" />
        </div>

        <div>
          <h4 className="text-base font-black text-[#0F152A]">Client Verification Dispatched</h4>
          <p className="mt-1 text-[#66738C]">
            We notified the client to review your completion checklist and photos.
          </p>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#ECFDF5] p-3.5 text-[#065F46]">
          <div className="flex items-center gap-2">
            <Wallet className="size-5 text-[#10B981]" />
            <span className="font-bold">Pending Wallet Credit:</span>
          </div>
          <span className="text-sm font-black text-[#10B981]">₦{fee.toLocaleString()}</span>
        </div>

        <p className="text-[11px] text-[#8C909B]">
          If the client doesn't confirm within 48 hours, Super Admin automatically clears the payout to your wallet.
        </p>
      </div>
    </AppModal>
  );
}
