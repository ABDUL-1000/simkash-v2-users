import { AlertTriangle, MessageSquare, PhoneCall, UploadCloud } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { DisputedJobItem } from "../types";

interface DisputeDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: DisputedJobItem;
  onUpdateResponse?: () => void;
  onContactAdmin?: () => void;
  onUploadEvidence?: () => void;
}

export function DisputeDetailModal({
  open,
  onOpenChange,
  job,
  onUpdateResponse,
  onContactAdmin,
  onUploadEvidence,
}: DisputeDetailModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Dispute Case File"
      description={`${job.reference} · ${job.title}`}
      footer={
        <div className="flex w-full flex-wrap items-center justify-between gap-2 pt-2">
          <button
            type="button"
            onClick={onContactAdmin}
            className="flex items-center gap-1.5 rounded-xl border border-[#FECACA] bg-[#FFF7F8] px-3.5 py-2 text-xs font-bold text-[#DC2626] hover:bg-[#FEE2E2]"
          >
            <PhoneCall className="size-3.5" />
            <span>Contact Admin Hotline</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onUpdateResponse?.();
              }}
              className="rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
            >
              Update Response
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-xs">
        {/* Held Payment Notice */}
        <div className="flex items-center justify-between rounded-2xl border border-[#FECACA] bg-[#FFF7F8] p-3.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-[#EF4444]" />
            <span className="font-black text-[#EF4444]">Payment Held: ₦{job.fee.toLocaleString()}</span>
          </div>
          <span className="rounded-full bg-[#EF4444] px-2.5 py-0.5 text-[10px] font-bold text-white">
            Status: Under Review
          </span>
        </div>

        {/* Client's Claim */}
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF7F8] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF4444]">
              Client Claim · {job.client}
            </span>
            <span className="text-[10px] text-[#8C909B]">{job.clientClaimDate}</span>
          </div>
          <p className="mt-1.5 text-xs font-semibold leading-relaxed text-[#0F152A]">
            "{job.clientClaim}"
          </p>
        </div>

        {/* Installer's Rebuttal */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
              Your Response (Submitted 21 Jun 2026)
            </span>
            <span className="text-[10px] font-bold text-[#10B981]">Filed ✓</span>
          </div>
          <p className="mt-1.5 text-xs font-medium italic leading-relaxed text-[#0F152A]">
            "{job.installerResponse}"
          </p>
        </div>

        {/* Evidence Upload Slot */}
        <div
          onClick={onUploadEvidence}
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-center transition hover:border-[#2563EB] hover:bg-[#EFF6FF]"
        >
          <UploadCloud className="size-6 text-[#2563EB]" />
          <span className="mt-1.5 font-bold text-[#0F152A]">Upload Additional Evidence</span>
          <span className="text-[10px] text-[#8C909B]">
            Attach CCTV test monitor screenshots, handover receipt, or router test logs (PNG, JPG, PDF up to 10MB)
          </span>
        </div>

        {/* Admin Review Policy */}
        <div className="flex items-start gap-2 rounded-xl bg-[#F1F5F9] p-3 text-[11px] text-[#64748B]">
          <MessageSquare className="mt-0.5 size-3.5 shrink-0 text-[#2563EB]" />
          <span>
            Super Admin conducts dispute mediation within 48 business hours. If the client fails to provide contradictory proof, the held payment will automatically be disbursed to your wallet.
          </span>
        </div>
      </div>
    </AppModal>
  );
}
