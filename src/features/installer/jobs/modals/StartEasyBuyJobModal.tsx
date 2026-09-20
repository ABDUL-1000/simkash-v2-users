import { useState } from "react";
import { CreditCard, AlertCircle, Car, CheckSquare, Square } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { JobDetailItem } from "../types";

interface StartEasyBuyJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: JobDetailItem | null;
  onConfirmStart?: () => void;
}

export function StartEasyBuyJobModal({
  open,
  onOpenChange,
  job,
  onConfirmStart,
}: StartEasyBuyJobModalProps) {
  const [checklist, setChecklist] = useState({
    equipment: true,
    requirements: true,
    clientContact: true,
  });
  const [isOnSite, setIsOnSite] = useState(true);

  const jobRef = job?.reference ?? "JOB-2026-00847";
  const jobTitle = job?.title ?? "Solar CCTV Installation";
  const jobFee = job?.fee ?? 65000;
  const commission = job?.easyBuyPlan?.commissionAmount ?? 22500;

  const toggleItem = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStart = () => {
    onOpenChange(false);
    onConfirmStart?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Start EasyBuy Job"
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
            onClick={handleStart}
            className="cursor-pointer rounded-xl bg-[#7C3AED] px-5 py-2 text-xs font-bold text-white hover:bg-[#6D28D9]"
          >
            Start EasyBuy Job
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-xs">
        {/* Info callout */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
            <CreditCard className="size-3.5" />
            <span>EasyBuy Installation Job</span>
          </div>
          <p className="text-[11px] text-[#1E40AF] leading-relaxed">
            This job was generated from a customer's EasyBuy application. You earn your standard job fee of <strong>₦{jobFee.toLocaleString()}</strong> on completion, PLUS <strong>₦{commission.toLocaleString()}</strong> EasyBuy commission when the customer finishes their payment plan.
          </p>
        </div>

        {/* Pre-Start Checklist */}
        <div className="space-y-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Pre-Start Checklist
          </span>
          <div className="space-y-2 text-[#0F152A]">
            <label
              onClick={() => toggleItem("equipment")}
              className="flex cursor-pointer items-center gap-2 text-xs"
            >
              {checklist.equipment ? (
                <CheckSquare className="size-4 text-[#7C3AED]" />
              ) : (
                <Square className="size-4 text-[#8C909B]" />
              )}
              <span>I have all required equipment</span>
            </label>
            <label
              onClick={() => toggleItem("requirements")}
              className="flex cursor-pointer items-center gap-2 text-xs"
            >
              {checklist.requirements ? (
                <CheckSquare className="size-4 text-[#7C3AED]" />
              ) : (
                <Square className="size-4 text-[#8C909B]" />
              )}
              <span>I have reviewed job requirements</span>
            </label>
            <label
              onClick={() => toggleItem("clientContact")}
              className="flex cursor-pointer items-center gap-2 text-xs"
            >
              {checklist.clientContact ? (
                <CheckSquare className="size-4 text-[#7C3AED]" />
              ) : (
                <Square className="size-4 text-[#8C909B]" />
              )}
              <span>I have contacted client contact</span>
            </label>
          </div>
        </div>

        {/* On-Site Radio */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Are you on-site?
          </span>
          <div
            onClick={() => setIsOnSite(!isOnSite)}
            className={`flex cursor-pointer items-center gap-2 rounded-2xl border p-3 transition ${
              isOnSite ? "border-[#7C3AED] bg-[#F5F3FF]" : "border-[#E2ECF6] bg-white"
            }`}
          >
            <Car className={`size-4 ${isOnSite ? "text-[#7C3AED]" : "text-[#8C909B]"}`} />
            <span className="font-semibold text-[#0F152A]">Yes, I am on-site and ready</span>
          </div>
        </div>

        {/* Warning notification */}
        <div className="flex items-start gap-2 rounded-2xl border border-[#FDE68A] bg-[#FEF3C7] p-3 text-[11px] text-[#92400E]">
          <AlertCircle className="size-4 shrink-0 text-[#D97706] mt-0.5" />
          <span>Starting notifies Super Admin and the client that installation has begun.</span>
        </div>
      </div>
    </AppModal>
  );
}
