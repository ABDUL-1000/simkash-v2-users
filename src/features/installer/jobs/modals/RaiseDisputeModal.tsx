import { useState } from "react";
import { Shield, CreditCard, MoreHorizontal, UploadCloud, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface RaiseDisputeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobRef?: string;
  jobTitle?: string;
  onSubmitDispute?: (data: { type: string; account: string }) => void;
}

export function RaiseDisputeModal({
  open,
  onOpenChange,
  jobRef = "JOB-2026-00841",
  jobTitle = "Office CCTV Repair",
  onSubmitDispute,
}: RaiseDisputeModalProps) {
  const [disputeType, setDisputeType] = useState<"false_claim" | "payment" | "other">("false_claim");
  const [account, setAccount] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = () => {
    onOpenChange(false);
    onSubmitDispute?.({ type: disputeType, account });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Raise Dispute"
      description={`${jobRef} · ${jobTitle}`}
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!account.trim() || !confirmed}
            className="cursor-pointer rounded-xl bg-[#EF4444] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#DC2626] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Dispute
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-xs">
        {/* Info banner */}
        <div className="flex items-start gap-2 rounded-2xl bg-[#EFF6FF] p-3 text-[#1E40AF]">
          <Info className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
          <span>
            Disputes are reviewed by Super Admin within 24–48 hours. Both you and the client will be contacted. Provide as much detail as possible.
          </span>
        </div>

        {/* Dispute type selection */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Dispute Type
          </span>
          <div className="mt-2 space-y-2">
            {/* Type 1: Client Making False Claim */}
            <div
              onClick={() => setDisputeType("false_claim")}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition ${
                disputeType === "false_claim"
                  ? "border-[#EF4444] bg-[#FFF5F7]"
                  : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#FEE2E2] text-[#EF4444]">
                <Shield className="size-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F152A]">Client Making False Claim</h4>
                <p className="mt-0.5 text-[11px] text-[#66738C]">
                  Client says work is incomplete but I completed all requirements
                </p>
              </div>
            </div>

            {/* Type 2: Payment Issue */}
            <div
              onClick={() => setDisputeType("payment")}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition ${
                disputeType === "payment"
                  ? "border-[#F59E0B] bg-[#FFFBEB]"
                  : "border-[#E2ECF6] bg-[#FEF3C7]/40 hover:bg-[#FEF3C7]/60"
              }`}
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#FEF3C7] text-[#D97706]">
                <CreditCard className="size-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F152A]">Payment Issue</h4>
                <p className="mt-0.5 text-[11px] text-[#66738C]">
                  Incorrect amount, delayed or payment not released
                </p>
              </div>
            </div>

            {/* Type 3: Other Issue */}
            <div
              onClick={() => setDisputeType("other")}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3.5 transition ${
                disputeType === "other"
                  ? "border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2ECF6] bg-[#F8FAFC] hover:bg-slate-100"
              }`}
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#66738C] shadow-xs">
                <MoreHorizontal className="size-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F152A]">Other Issue</h4>
                <p className="mt-0.5 text-[11px] text-[#66738C]">Specify below</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Account */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Your Account
          </span>
          <textarea
            rows={4}
            maxLength={1000}
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Describe what actually happened during the job, what was completed, and why..."
            className="mt-1.5 w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs leading-relaxed text-[#0F152A] outline-none transition focus:border-[#EF4444]"
          />
          <div className="mt-1 text-[10px] text-[#8C909B]">{account.length}/1000</div>
        </div>

        {/* Attach Evidence */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Attach Evidence (Optional)
          </span>
          <div className="mt-1.5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-center transition hover:bg-[#F1F5F9]">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#E2ECF6] text-[#66738C]">
              <UploadCloud className="size-5" />
            </div>
            <span className="mt-2 font-bold text-[#0F152A]">Photos, videos, documents</span>
            <span className="text-[10px] text-[#8C909B]">
              Max 5 files · 10MB each · JPG PNG MP4 PDF
            </span>
          </div>
        </div>

        {/* Confirmation checkbox */}
        <label className="flex cursor-pointer items-center gap-2.5 pt-1">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="size-4 rounded border-[#CBD5E1] text-[#EF4444] focus:ring-[#EF4444]"
          />
          <span className="text-[11px] font-medium text-[#0F152A]">
            I confirm my account is accurate and I am willing to cooperate with Super Admin's investigation.
          </span>
        </label>
      </div>
    </AppModal>
  );
}
