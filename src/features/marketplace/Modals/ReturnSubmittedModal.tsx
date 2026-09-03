import { RotateCcw } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ReturnSubmittedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  returnRef?: string;
  onViewReturnsClick?: () => void;
}

export function ReturnSubmittedModal({
  open,
  onOpenChange,
  returnRef = "RET-2026-00312",
  onViewReturnsClick,
}: ReturnSubmittedModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
    >
      <div className="flex flex-col items-center text-center space-y-4 pt-1">
        {/* Soft Blue Return Circle Icon */}
        <div className="flex size-16 items-center justify-center rounded-full bg-[#EFF4F8] text-[#2563EB]">
          <RotateCcw className="size-8 stroke-[2.5]" />
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-[#0F152A]">Return Submitted</h3>
          <p className="text-xs font-bold text-[#8C909B] mt-0.5">{returnRef}</p>
        </div>

        <p className="text-xs text-[#66738C] px-2 leading-relaxed">
          We will review your request within 24 hours and notify you of the outcome.
        </p>

        {/* Next Steps Box */}
        <div className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs text-left space-y-2">
          <h4 className="font-extrabold uppercase tracking-wider text-[#8C909B] text-[10px]">
            NEXT STEPS
          </h4>
          <ol className="space-y-1.5 text-[#0F152A] font-medium">
            <li>1. Keep items in original packaging</li>
            <li>2. Wait for pickup notification</li>
            <li>3. Hand items to courier</li>
          </ol>
        </div>

        {/* Footer Actions */}
        <div className="w-full flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onViewReturnsClick?.();
            }}
            className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            View Returns
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </AppModal>
  );
}
