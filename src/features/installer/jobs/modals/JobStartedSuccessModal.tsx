import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface JobStartedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobRef?: string;
  jobTitle?: string;
  onGoToJob?: () => void;
}

export function JobStartedSuccessModal({
  open,
  onOpenChange,
  jobRef = "JOB-2026-00847",
  jobTitle = "Solar CCTV Installation",
  onGoToJob,
}: JobStartedSuccessModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="Job Successfully Started!"
      description={`${jobRef} · ${jobTitle}`}
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Stay on Page
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onGoToJob?.();
            }}
            className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED] px-5 py-2 text-xs font-bold text-white hover:bg-[#6D28D9]"
          >
            <span>View In-Progress Job</span>
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
          <h4 className="text-base font-black text-[#0F152A]">Installation Is Live</h4>
          <p className="mt-1 text-[#66738C]">
            Super Admin and the client have received notification that you have arrived on-site and started the installation.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-left">
          <ShieldCheck className="size-5 shrink-0 text-[#10B981]" />
          <span className="text-[11px] text-[#66738C]">
            GPS coordinates logged at <strong>23 Marina Street, Lagos Island</strong>. Keep track of installed equipment to update progress!
          </span>
        </div>
      </div>
    </AppModal>
  );
}
