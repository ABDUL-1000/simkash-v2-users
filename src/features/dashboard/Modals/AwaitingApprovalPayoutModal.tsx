import { Clock, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface AwaitingApprovalPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount?: string;
  bankName?: string;
  accountNumber?: string;
  requestedDate?: string;
  onContactSupport?: () => void;
  onDone?: () => void;
}

export function AwaitingApprovalPayoutModal({
  open,
  onOpenChange,
  amount = "₦8,200",
  bankName = "Access Bank",
  accountNumber = "****0476",
  requestedDate = "22 Jan 2026, 2:45 PM",
  onContactSupport,
  onDone,
}: AwaitingApprovalPayoutModalProps) {
  const handleDone = () => {
    onOpenChange(false);
    onDone?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center pt-2 space-y-4 text-xs">
        {/* Amber Circular Stopwatch Icon Container (Matching Image 1) */}
        <div className="flex size-16 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-xs">
          <Clock className="size-8 stroke-[2.5]" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#0F152A]">Awaiting Approval</h2>
          <p className="text-xs font-semibold text-[#66738C] max-w-xs mx-auto">
            Your payout is being reviewed by admin
          </p>
        </div>

        {/* Receipt Details Summary Box (Matching Image 1) */}
        <div className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-left space-y-2.5 divide-y divide-[#E2ECF6]">
          <div className="flex items-center justify-between py-1 first:pt-0">
            <span className="text-[#8C909B] font-medium">Amount</span>
            <span className="font-black text-[#0F152A] text-sm font-mono">
              {amount}
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-[#8C909B] font-medium">Bank</span>
            <span className="font-bold text-[#0F152A]">
              {bankName} {accountNumber}
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-[#8C909B] font-medium">Requested</span>
            <span className="font-bold text-[#0F152A] font-mono">
              {requestedDate}
            </span>
          </div>
          <div className="flex items-center justify-between py-1 last:pb-0">
            <span className="text-[#8C909B] font-medium">Status</span>
            <span className="rounded-md bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-extrabold text-[#D9990D]">
              Pending
            </span>
          </div>
        </div>

        {/* Pinkish/Amber Info Callout (Matching Image 1) */}
        <div className="w-full rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-xs text-[#66738C] font-semibold flex items-center justify-center gap-2">
          <Info className="size-4 shrink-0 text-[#2563EB]" />
          <span>Payouts are typically approved within 24 hours</span>
        </div>

        {/* Action Buttons (Matching Image 1) */}
        <div className="w-full pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onContactSupport?.();
              }}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition"
            >
              Contact Support
            </button>
            <button
              type="button"
              onClick={handleDone}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
