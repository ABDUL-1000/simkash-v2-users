import { useState } from "react";
import { CreditCard, Camera, Info, CheckSquare, Square } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { JobDetailItem } from "../types";

interface SubmitEasyBuyJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: JobDetailItem | null;
  onSubmitSuccess?: () => void;
}

const DEFAULT_CHECKS = [
  "All CCTV cameras installed",
  "Solar panel connected",
  "DVR system configured",
  "All cameras tested and recording",
  "Remote access set up (if applicable)",
  "Client shown how to use system",
  "Completion photos taken",
  "Site cleaned up after installation",
];

const EASYBUY_VERIFICATION_CHECKS = [
  "Customer shown how to use system",
  "System tested and confirmed working",
  "Customer aware of payment plan schedule",
  "No outstanding installation issues",
];

export function SubmitEasyBuyJobModal({
  open,
  onOpenChange,
  job,
  onSubmitSuccess,
}: SubmitEasyBuyJobModalProps) {
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    0: true, 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true,
  });
  const [ebChecks, setEbChecks] = useState<Record<number, boolean>>({
    0: true, 1: true, 2: true, 3: true,
  });
  const [photos] = useState<string[]>([
    "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=300",
    "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=300",
    "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=300",
  ]);

  const jobRef = job?.reference ?? "JOB-2026-00847";
  const jobTitle = job?.title ?? "Solar CCTV Installation";
  const jobFee = job?.fee ?? 65000;
  const commission = job?.easyBuyPlan?.commissionAmount ?? 22500;

  const handleSubmit = () => {
    onOpenChange(false);
    onSubmitSuccess?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Submit EasyBuy Job for Verification"
      description={`${jobRef} · ${jobTitle}`}
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="cursor-pointer rounded-xl bg-[#10B981] px-5 py-2 text-xs font-bold text-white hover:bg-[#059669]"
          >
            Submit EasyBuy Job
          </button>
        </div>
      }
    >
      <div className="space-y-3.5 py-1 text-xs">
        {/* EasyBuy Callout */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
            <CreditCard className="size-3.5" />
            <span>EasyBuy Job</span>
          </div>
          <p className="text-[11px] text-[#1E40AF]">
            After submission:<br />
            · Job fee (<strong>₦{jobFee.toLocaleString()}</strong>) releases when Admin confirms your work ✓<br />
            · EasyBuy commission (<strong>₦{commission.toLocaleString()}</strong>) releases when customer completes payment plan (may take weeks)
          </p>
        </div>

        {/* Completion Checklist */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Completion Checklist
          </span>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 text-[#0F152A]">
            {DEFAULT_CHECKS.map((item, idx) => (
              <label
                key={item}
                onClick={() => setChecklist((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                className="flex cursor-pointer items-center gap-1.5 text-[11px]"
              >
                {checklist[idx] ? (
                  <CheckSquare className="size-3.5 text-[#10B981] shrink-0" />
                ) : (
                  <Square className="size-3.5 text-[#8C909B] shrink-0" />
                )}
                <span className="truncate">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* EasyBuy Verification Checks */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#F0F7FF] p-3 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
            EasyBuy Verification
          </span>
          <div className="space-y-1 text-[#0F152A]">
            {EASYBUY_VERIFICATION_CHECKS.map((item, idx) => (
              <label
                key={item}
                onClick={() => setEbChecks((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                className="flex cursor-pointer items-center gap-2 text-xs"
              >
                {ebChecks[idx] ? (
                  <CheckSquare className="size-4 text-[#2563EB] shrink-0" />
                ) : (
                  <Square className="size-4 text-[#8C909B] shrink-0" />
                )}
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Photos Dropzone */}
        <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-3 text-center">
          <div className="flex flex-col items-center justify-center">
            <Camera className="size-5 text-[#64748B] mb-1" />
            <span className="font-bold text-xs text-[#0F152A]">Upload photos of completed work</span>
            <span className="text-[10px] text-[#8C909B]">Min 3 photos required ({photos.length} uploaded)</span>
          </div>
          <p className="mt-2 text-[10px] text-[#2563EB] bg-[#EFF6FF] rounded-lg p-1.5 text-left">
            Tip: Take clear photos showing system working — EasyBuy customers may raise disputes if they believe installation is incomplete.
          </p>
        </div>

        {/* Timeline after submit */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-[11px] text-[#66738C] space-y-1">
          <div className="flex items-center gap-1 font-bold text-[#0F152A]">
            <Info className="size-3.5 text-[#2563EB]" />
            <span>After you submit:</span>
          </div>
          <ol className="list-decimal pl-4 space-y-0.5 text-[10px]">
            <li>Client verifies installation</li>
            <li>Admin confirms → ₦{jobFee.toLocaleString()} job fee paid</li>
            <li>Customer continues their payment plan</li>
            <li>When customer finishes → ₦{commission.toLocaleString()} EasyBuy commission credited to you</li>
          </ol>
        </div>
      </div>
    </AppModal>
  );
}
