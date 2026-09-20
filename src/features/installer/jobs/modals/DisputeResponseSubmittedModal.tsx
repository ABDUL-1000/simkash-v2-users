import { CheckCircle2, ShieldAlert } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface DisputeResponseSubmittedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobRef?: string;
}

export function DisputeResponseSubmittedModal({
  open,
  onOpenChange,
  jobRef = "JOB-2026-00841",
}: DisputeResponseSubmittedModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="Response Successfully Filed!"
      description={`${jobRef} · Access Bank HQ`}
      footer={
        <div className="flex w-full items-center justify-end pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#0F152A] px-5 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-2 text-center text-xs">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
          <CheckCircle2 className="size-10" />
        </div>

        <div>
          <h4 className="text-base font-black text-[#0F152A]">Case File Updated</h4>
          <p className="mt-1 text-[#66738C]">
            Your updated statement and supporting details have been submitted to the Super Admin mediation queue.
          </p>
        </div>

        <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF6FF] p-3 text-left text-[11px] text-[#1E40AF]">
          <ShieldAlert className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
          <span>
            You will receive an in-app alert and SMS as soon as the administrator completes review or reaches a verdict with the client.
          </span>
        </div>
      </div>
    </AppModal>
  );
}
