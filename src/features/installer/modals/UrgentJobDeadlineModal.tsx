import { AlertCircle, Clock, TrendingUp, Coins } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface UrgentJobDeadlineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkComplete?: () => void;
  onNavigate?: () => void;
  onContactClient?: () => void;
  onRemindLater?: () => void;
}

export function UrgentJobDeadlineModal({
  open,
  onOpenChange,
  onMarkComplete,
  onNavigate,
  onContactClient,
  onRemindLater,
}: UrgentJobDeadlineModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title={
        <div className="-mx-6 -mt-4 flex items-center gap-2 rounded-t-3xl bg-[#FEE2E2] px-6 py-3.5 text-sm font-bold text-[#EF4444]">
          <AlertCircle className="size-4 text-[#EF4444]" />
          <span>Deadline Tomorrow!</span>
        </div>
      }
    >
      <div className="space-y-4 pt-2">
        {/* Job Box */}
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF7F8] p-4">
          <span className="text-xs font-semibold text-[#EF4444]">JOB-2026-00846</span>
          <h3 className="mt-1 text-base font-black text-[#EF4444] sm:text-lg">
            CCTV Camera Installation
          </h3>
          <p className="mt-0.5 text-xs text-[#66738C]">First Bank Branch · Ikeja</p>
        </div>

        {/* Info Rows */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex size-6 items-center justify-center rounded-full bg-[#FEE2E2] text-[#EF4444]">
              <Clock className="size-3.5" />
            </div>
            <span className="font-semibold text-[#0F152A]">
              Due: 26 Jun 2026 · Tomorrow
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex size-6 items-center justify-center rounded-full bg-[#F1EAFE] text-[#7C3AED]">
              <TrendingUp className="size-3.5" />
            </div>
            <span className="font-semibold text-[#0F152A]">
              Progress: 60% complete
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex size-6 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
              <Coins className="size-3.5" />
            </div>
            <span className="font-semibold text-[#0F152A]">
              Payment: ₦45,000 on completion
            </span>
          </div>
        </div>

        {/* Stacked Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onMarkComplete?.();
            }}
            className="flex min-h-[42px] w-full items-center justify-center rounded-xl bg-[#10B981] text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#059669]"
          >
            Mark as Complete
          </button>

          <button
            type="button"
            onClick={onNavigate}
            className="flex min-h-[42px] w-full items-center justify-center rounded-xl border border-[#E2ECF6] bg-white text-xs font-bold text-[#0F152A] transition-colors hover:bg-[#F8FAFC]"
          >
            Navigate to Site
          </button>

          <button
            type="button"
            onClick={onContactClient}
            className="flex min-h-[42px] w-full items-center justify-center rounded-xl border border-[#E2ECF6] bg-white text-xs font-bold text-[#0F152A] transition-colors hover:bg-[#F8FAFC]"
          >
            Contact Client
          </button>
        </div>

        {/* Remind later link */}
        <div className="pt-1 text-center">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onRemindLater?.();
            }}
            className="text-xs font-semibold text-[#2563EB] hover:underline"
          >
            Remind me in 2 hours
          </button>
        </div>
      </div>
    </AppModal>
  );
}
