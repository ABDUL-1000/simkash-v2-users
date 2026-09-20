import {
  User,
  Shield,
  CheckCircle2,
  Hourglass,
  ArrowRight,
  Bell,
} from "lucide-react";
import type { JobDetailItem } from "../types";

interface PendingVerificationJobCardProps {
  job: JobDetailItem;
  onContactClient?: (job: JobDetailItem) => void;
  onSendReminder?: (job: JobDetailItem) => void;
  onViewDetails?: (job: JobDetailItem) => void;
  onViewSubmission?: (job: JobDetailItem) => void;
}

export function PendingVerificationJobCard({
  job,
  onContactClient,
  onSendReminder,
  onViewDetails,
  onViewSubmission,
}: PendingVerificationJobCardProps) {
  return (
    <div className="rounded-3xl border border-[#FDE68A] bg-[#FEF9C3]/40 p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[#8C909B]">{job.reference}</span>
        <span className="rounded-full bg-[#EA580C] px-3 py-0.5 text-xs font-bold text-white">
          Pending Verification
        </span>
      </div>

      {/* Title & Fee */}
      <div className="mt-2">
        <h3
          onClick={() => onViewDetails?.(job)}
          className="cursor-pointer text-base font-black text-[#0F152A] hover:text-[#2563EB] sm:text-lg"
        >
          {job.title}
        </h3>
        <div className="mt-0.5 text-sm font-black text-[#D97706]">
          ₦{job.fee.toLocaleString()} · <span className="font-semibold">Payment Held</span>
        </div>
        <p className="mt-1 text-xs text-[#66738C]">Client: {job.client.company} · Surulere</p>
        <p className="text-[11px] text-[#8C909B]">Submitted: 21 Jun 2026 · 3 days ago</p>
      </div>

      {/* Verification status box */}
      <div className="mt-4 rounded-2xl border border-[#FDE68A] bg-white p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          Verification Status
        </span>

        {/* Client verification */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706]">
              <User className="size-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F152A]">Client Verification</div>
              <div className="text-[11px] font-semibold text-[#D97706]">
                ⚠️ {job.client.contactName} · Pending
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSendReminder?.(job)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D97706] bg-white px-3 py-1.5 text-xs font-bold text-[#D97706] transition hover:bg-[#FEF3C7]"
          >
            <Bell className="size-3" /> Send Reminder
          </button>
        </div>

        {/* Admin verification */}
        <div className="mt-3 flex items-center gap-3 border-t border-[#E2ECF6] pt-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-[#F8FAFC] text-[#8C909B]">
            <Shield className="size-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0F152A]">Admin Verification</div>
            <div className="text-[11px] text-[#8C909B]">Waiting for client first</div>
          </div>
        </div>

        {/* 4 Step verification list */}
        <div className="mt-4 space-y-2 border-t border-[#E2ECF6] pt-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#10B981]">
            <CheckCircle2 className="size-3.5" /> Job submitted
          </div>
          <div className="flex items-center gap-2 font-bold text-[#D97706]">
            <Hourglass className="size-3.5" /> Client verifying
          </div>
          <div className="flex items-center gap-2 text-[#8C909B]">
            <span className="size-3.5 rounded-full border-2 border-[#CBD5E1]" /> Admin confirms
          </div>
          <div className="flex items-center gap-2 text-[#8C909B]">
            <span className="size-3.5 rounded-full border-2 border-[#CBD5E1]" /> Payment released
          </div>
        </div>
      </div>

      {/* Submission stats bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-4 text-[#0F152A]">
          <span className="flex items-center gap-1 font-semibold text-[#10B981]">
            <CheckCircle2 className="size-3.5" /> Photos uploaded: {job.uploadedPhotosCount}
          </span>
          <span className="flex items-center gap-1 font-semibold text-[#10B981]">
            <CheckCircle2 className="size-3.5" /> Checklist: 8/8
          </span>
        </div>

        <button
          type="button"
          onClick={() => onViewSubmission?.(job)}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#0F152A] hover:underline"
        >
          View Submission <ArrowRight className="size-3" />
        </button>
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-[#FDE68A] pt-3.5">
        <button
          type="button"
          onClick={() => onContactClient?.(job)}
          className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
        >
          Contact Client
        </button>
        <button
          type="button"
          onClick={() => onSendReminder?.(job)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#EA580C] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#D97706]"
        >
          <Bell className="size-3" /> Send Reminder
        </button>
        <button
          type="button"
          onClick={() => onViewDetails?.(job)}
          className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
        >
          View Full Details
        </button>
      </div>
    </div>
  );
}
