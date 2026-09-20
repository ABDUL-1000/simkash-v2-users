import { useState } from "react";
import { CheckCircle2, Camera, Plus, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { JobDetailItem } from "../types";

interface SubmitJobVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: JobDetailItem | null;
  onSubmitSuccess?: () => void;
}

export function SubmitJobVerificationModal({
  open,
  onOpenChange,
  job,
  onSubmitSuccess,
}: SubmitJobVerificationModalProps) {
  const [notes, setNotes] = useState<string>("");

  const checklist = [
    "All CCTV cameras installed",
    "Solar panel connected",
    "DVR system configured",
    "All cameras tested and recording",
    "Remote access set up",
    "Client shown how to use system",
    "Completion photos taken",
    "Site cleaned up",
  ];

  const handleSubmit = () => {
    onOpenChange(false);
    onSubmitSuccess?.();
  };

  const jobRef = job?.reference ?? "JOB-2026-00846";
  const fee = job?.fee ?? 45000;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Submit Job for Verification"
      description={`${jobRef} · ${job?.title ?? "CCTV Installation"}`}
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-[#10B981] px-5 py-2 text-xs font-bold text-white hover:bg-[#059669]"
          >
            Submit for Verification
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* Progress 100% banner */}
        <div className="flex items-center gap-2 rounded-2xl bg-[#EBFFF8] p-3 text-xs text-[#065F46]">
          <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
          <div>
            <span className="font-bold text-[#10B981]">Job progress: 100% complete</span>
            <p className="text-[11px] text-[#66738C]">All steps marked done</p>
          </div>
        </div>

        {/* Completion Checklist */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Completion Checklist
          </span>
          <div className="space-y-1.5 text-xs">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-2 text-[#0F152A]">
                <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Photos */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Completion Photos
          </span>
          <div className="mt-2 flex flex-wrap items-center gap-2.5">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="flex size-14 items-center justify-center rounded-2xl bg-[#EBFFF8] text-[#10B981] border border-[#A7F3D0]"
              >
                <Camera className="size-5" />
              </div>
            ))}
            {[4, 5].map((num) => (
              <div
                key={num}
                className="flex size-14 items-center justify-center rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-[#8C909B]"
              >
                <Plus className="size-4" />
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs font-semibold text-[#10B981]">
            ✔ 3 photos attached ✔
          </div>
        </div>

        {/* Completion Notes */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Completion Notes (Optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any notes for client or admin about the completed work..."
            className="mt-1.5 w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs text-[#0F152A] outline-none transition focus:border-[#10B981] focus:bg-white"
          />
        </div>

        {/* After you submit box */}
        <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF6FF] p-3.5 text-xs text-[#1E40AF]">
          <Info className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
          <div>
            <span className="font-bold text-[#0F152A]">After you submit:</span>
            <ol className="mt-1 list-decimal space-y-0.5 pl-4 text-[11px] text-[#66738C]">
              <li>Client receives verification request</li>
              <li>Client confirms completion</li>
              <li>Admin reviews and confirms</li>
              <li>
                <strong className="text-[#10B981]">₦{fee.toLocaleString()}</strong> credited to your wallet
              </li>
            </ol>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
