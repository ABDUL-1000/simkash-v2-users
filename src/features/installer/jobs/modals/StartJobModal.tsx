import { useState } from "react";
import { Briefcase, MapPin, AlertCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { JobDetailItem } from "../types";

interface StartJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: JobDetailItem | null;
  onStartSuccess?: () => void;
}

export function StartJobModal({
  open,
  onOpenChange,
  job,
  onStartSuccess,
}: StartJobModalProps) {
  const [isOnSite, setIsOnSite] = useState<boolean>(true);
  const [checks, setChecks] = useState({
    equipment: false,
    requirements: false,
    contacted: false,
  });

  const handleStart = () => {
    onOpenChange(false);
    onStartSuccess?.();
  };

  const jobRef = job?.reference ?? "JOB-2026-00847";
  const jobTitle = job?.title ?? "Solar CCTV Installation";
  const clientName = job?.client.company ?? "Zenith Bank HQ · Lagos Island";
  const fee = job?.fee ?? 65000;
  const dueDate = job?.dueDate ?? "28 Jun 2026";
  const address = job?.client.address ?? "23 Marina Street, Lagos Island";
  const contactName = job?.client.contactName ?? "Amara Obi";
  const phone = job?.client.phone ?? "08012345678";

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="Start Job"
      description={`${jobRef} · ${job?.type ?? "Solar CCTV"}`}
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
            onClick={handleStart}
            className="rounded-xl bg-[#7C3AED] px-5 py-2 text-xs font-bold text-white hover:bg-[#6D28D9]"
          >
            Start Job Now
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* Job summary preview */}
        <div className="flex items-center gap-3 rounded-2xl bg-[#F1EAFE] p-3.5 text-xs">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED] text-white">
            <Briefcase className="size-4" />
          </div>
          <div>
            <div className="font-bold text-[#0F152A]">{jobTitle}</div>
            <div className="text-[11px] text-[#66738C]">{clientName}</div>
            <div className="text-[11px] font-bold text-[#7C3AED]">
              ₦{fee.toLocaleString()} · Due {dueDate}
            </div>
          </div>
        </div>

        {/* Location check */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#66738C]">
            <MapPin className="size-3.5 text-[#2563EB]" /> Confirm Your Location
          </div>
          <p className="mt-1 text-xs text-[#66738C]">
            Are you currently on-site at: <strong className="text-[#0F152A]">{address}</strong>
          </p>

          <div className="mt-2.5 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="onsite"
                checked={isOnSite}
                onChange={() => setIsOnSite(true)}
                className="text-[#7C3AED]"
              />
              <span className="font-semibold text-[#0F152A]">Yes, I am on-site</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="onsite"
                checked={!isOnSite}
                onChange={() => setIsOnSite(false)}
                className="text-[#7C3AED]"
              />
              <span className="text-[#66738C]">I am not on-site yet</span>
            </label>
          </div>
        </div>

        {/* Pre-start checks */}
        <div className="space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Pre-Start Check
          </span>
          <label className="flex items-center gap-2.5 cursor-pointer rounded-xl border border-[#E2ECF6] p-2 hover:bg-[#F8FAFC]">
            <input
              type="checkbox"
              checked={checks.equipment}
              onChange={(e) => setChecks({ ...checks, equipment: e.target.checked })}
              className="size-3.5 rounded border-[#CBD5E1] text-[#7C3AED]"
            />
            <span className="text-[#0F152A]">I have all required equipment</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer rounded-xl border border-[#E2ECF6] p-2 hover:bg-[#F8FAFC]">
            <input
              type="checkbox"
              checked={checks.requirements}
              onChange={(e) => setChecks({ ...checks, requirements: e.target.checked })}
              className="size-3.5 rounded border-[#CBD5E1] text-[#7C3AED]"
            />
            <span className="text-[#0F152A]">I have reviewed the job requirements</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer rounded-xl border border-[#E2ECF6] p-2 hover:bg-[#F8FAFC]">
            <input
              type="checkbox"
              checked={checks.contacted}
              onChange={(e) => setChecks({ ...checks, contacted: e.target.checked })}
              className="size-3.5 rounded border-[#CBD5E1] text-[#7C3AED]"
            />
            <span className="text-[#0F152A]">
              I have contacted {contactName} · {phone}
            </span>
          </label>
        </div>

        {/* Warning Callout */}
        <div className="flex items-start gap-2 rounded-xl bg-[#FEF9C3] p-3 text-xs text-[#92400E]">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-[#EA580C]" />
          <span>
            Starting this job notifies Super Admin and the client that installation has begun. Your location is logged.
          </span>
        </div>
      </div>
    </AppModal>
  );
}
