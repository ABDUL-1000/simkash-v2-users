import { PauseCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface JobOnHoldModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobRef?: string;
  jobTitle?: string;
  adminNote?: string;
  onContactAdmin?: () => void;
  onViewFullDetails?: () => void;
}

export function JobOnHoldModal({
  open,
  onOpenChange,
  jobRef = "JOB-2026-00848",
  jobTitle = "Network Setup",
  adminNote = "Equipment delivery delayed. We will notify you when ready to proceed.",
  onContactAdmin,
  onViewFullDetails,
}: JobOnHoldModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title={jobRef}
      description={`${jobTitle} · On Hold`}
      footer={
        <div className="flex w-full flex-wrap items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onContactAdmin}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Contact Admin
          </button>
          <button
            type="button"
            onClick={onViewFullDetails}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            View Full Details
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-5 py-2 text-xs font-bold text-white hover:bg-[#1D4ED8]"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* On Hold Badge */}
        <div>
          <span className="inline-block rounded-full bg-[#EA580C] px-3.5 py-1 text-xs font-bold text-white">
            On Hold
          </span>
        </div>

        {/* Yellow Admin Note Box */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#FDE68A] bg-[#FEF9C3]/70 p-4">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EA580C] text-white">
            <PauseCircle className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0F152A] sm:text-sm">
              Job on hold — Admin note:
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-[#66738C]">
              {adminNote}
            </p>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
