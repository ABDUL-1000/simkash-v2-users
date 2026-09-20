import { useState } from "react";
import { AlertCircle, Wrench, CreditCard, Shield } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface DisputeResponseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobRef?: string;
  clientName?: string;
  clientClaim?: string;
  claimDate?: string;
  onSubmitSuccess?: (data: { response: string; resolution?: string }) => void;
}

export function DisputeResponseModal({
  open,
  onOpenChange,
  jobRef = "JOB-2026-00841",
  clientName = "Access Bank HQ",
  clientClaim = "2 cameras not functioning after installation. DVR not configured correctly. Requesting re-visit or partial refund.",
  claimDate = "Raised: 20 Jun · 4 days ago",
  onSubmitSuccess,
}: DisputeResponseModalProps) {
  const [response, setResponse] = useState<string>("");
  const [resolution, setResolution] = useState<"revisit" | "refund" | "dispute" | null>("revisit");

  const handleSubmit = () => {
    onOpenChange(false);
    onSubmitSuccess?.({ response, resolution: resolution ?? undefined });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Client Dispute — Respond"
      description={`${jobRef} · ${clientName}`}
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
            className="cursor-pointer rounded-xl bg-[#0F152A] px-5 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Submit Response
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-xs">
        {/* Red Warning Banner */}
        <div className="flex items-center gap-2.5 rounded-2xl border border-[#FECACA] bg-[#FFF0F2] p-3.5 text-[#B91C1C]">
          <AlertCircle className="size-4 shrink-0 text-[#EF4444]" />
          <span>
            {clientName} has raised a dispute about this job. You must respond within 48 hours.
          </span>
        </div>

        {/* Client's Claim */}
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF7F8] p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444]">
            CLIENT'S CLAIM
          </span>
          <p className="mt-1 text-xs font-medium italic leading-relaxed text-[#0F152A]">
            "{clientClaim}"
          </p>
          <span className="mt-2 block text-[10px] text-[#8C909B]">{claimDate}</span>
        </div>

        {/* Your Response */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            YOUR RESPONSE
          </span>
          <textarea
            rows={4}
            maxLength={1000}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Explain your perspective..."
            className="mt-1.5 w-full rounded-2xl border border-[#CBD5E1] bg-white p-3 text-xs leading-relaxed text-[#0F152A] outline-none transition focus:border-[#2563EB]"
          />
          <div className="mt-1 text-[10px] text-[#8C909B]">{response.length}/1000</div>
        </div>

        {/* Offer Resolution (Optional) */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            OFFER RESOLUTION (OPTIONAL)
          </span>
          <div className="mt-2 space-y-2">
            {/* Option 1: Offer Re-Visit */}
            <div
              onClick={() => setResolution(resolution === "revisit" ? null : "revisit")}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-3 transition ${
                resolution === "revisit"
                  ? "border-[#10B981] bg-[#ECFDF5]"
                  : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#D1FAE5] text-[#10B981]">
                <Wrench className="size-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F152A]">Offer Re-Visit</h4>
                <p className="mt-0.5 text-[11px] text-[#065F46]">
                  I will return to fix the issue at no additional cost
                </p>
              </div>
            </div>

            {/* Option 2: Agree to Partial Refund */}
            <div
              onClick={() => setResolution(resolution === "refund" ? null : "refund")}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition ${
                resolution === "refund"
                  ? "border-[#F59E0B] bg-[#FFFBEB]"
                  : "border-[#E2ECF6] bg-[#FEF3C7]/40 hover:bg-[#FEF3C7]/60"
              }`}
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#FEF3C7] text-[#D97706]">
                <CreditCard className="size-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F152A]">Agree to Partial Refund</h4>
                <p className="mt-0.5 text-[11px] text-[#66738C]">Agree to reduce payment amount</p>
              </div>
            </div>

            {/* Option 3: Dispute the Claim */}
            <div
              onClick={() => setResolution(resolution === "dispute" ? null : "dispute")}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition ${
                resolution === "dispute"
                  ? "border-[#7C3AED] bg-[#F5F0FF]"
                  : "border-[#E2ECF6] bg-[#F8FAFC] hover:bg-slate-100"
              }`}
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#F3E8FF] text-[#7C3AED]">
                <Shield className="size-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#0F152A]">Dispute the Claim</h4>
                <p className="mt-0.5 text-[11px] text-[#66738C]">
                  I believe the work was completed correctly as specified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
