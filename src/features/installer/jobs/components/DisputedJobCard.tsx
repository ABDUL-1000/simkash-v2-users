import {
  AlertTriangle,
  CheckCircle2,
  Hourglass,
  Circle,
  ExternalLink,
  Phone,
  Edit3,
  Headset,
} from "lucide-react";
import type { DisputedJobItem } from "../types";

interface DisputedJobCardProps {
  job: DisputedJobItem;
  onViewDetails?: (job: DisputedJobItem) => void;
  onContactClient?: (job: DisputedJobItem) => void;
  onUpdateResponse?: (job: DisputedJobItem) => void;
  onContactAdmin?: (job: DisputedJobItem) => void;
  onViewResolution?: (job: DisputedJobItem) => void;
}

export function DisputedJobCard({
  job,
  onViewDetails,
  onContactClient,
  onUpdateResponse,
  onContactAdmin,
  onViewResolution,
}: DisputedJobCardProps) {
  return (
    <div className="rounded-3xl border border-[#FF8080] bg-white p-5 shadow-xs sm:p-6">
      {/* Top Reference & Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs font-bold text-[#8C909B]">{job.reference}</span>
        <span className="rounded-full bg-[#EF4444] px-3 py-0.5 text-xs font-bold text-white">
          Disputed
        </span>
      </div>

      {/* Title, Fee & Client */}
      <div className="mt-1 space-y-1">
        <h3 className="text-base font-black text-[#0F152A] sm:text-lg">{job.title}</h3>
        <div className="text-sm font-black text-[#EF4444]">
          ₦{job.fee.toLocaleString()} · <span className="font-semibold">Payment Held</span>
        </div>
        <p className="text-xs text-[#66738C]">{job.client}</p>
      </div>

      <div className="my-4 border-t border-[#E2ECF6]" />

      {/* Dispute Reason Box */}
      <div className="rounded-2xl bg-[#FFF1F2] p-4 text-xs">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#EF4444]">
          DISPUTE REASON
        </span>
        <div className="mt-1 flex items-center gap-1.5 font-bold text-[#EF4444]">
          <AlertTriangle className="size-3.5" />
          <span>Client Dispute</span>
        </div>
        <p className="mt-1 leading-relaxed text-[#0F152A] font-medium">
          {job.clientClaim}
        </p>
        <span className="mt-2 block text-[10px] text-[#8C909B]">{job.clientClaimDate}</span>
      </div>

      {/* Your Response Box */}
      <div className="mt-3 rounded-2xl bg-[#F8FAFC] p-4 text-xs">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#66738C]">
          YOUR RESPONSE
        </span>
        <p className="mt-1 italic leading-relaxed text-[#0F152A]">
          "{job.installerResponse}"
        </p>
      </div>

      <div className="my-4 border-t border-[#E2ECF6]" />

      {/* Timeline Stepper */}
      <div className="space-y-3 text-xs">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#EF4444]" />
          <div>
            <div className="font-bold text-[#0F152A]">Dispute raised</div>
            <div className="text-[11px] text-[#66738C]">20 Jun 2026</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#1E293B]" />
          <div>
            <div className="font-bold text-[#0F152A]">Your response submitted</div>
            <div className="text-[11px] text-[#66738C]">21 Jun 2026</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Hourglass className="mt-0.5 size-4 shrink-0 text-[#D97706]" />
          <div>
            <div className="font-bold text-[#D97706]">Admin reviewing</div>
            <div className="text-[11px] text-[#66738C]">In progress...</div>
          </div>
        </div>

        <div
          onClick={() => onViewResolution?.(job)}
          className="flex cursor-pointer items-start gap-2.5 group"
        >
          <Circle className="mt-0.5 size-4 shrink-0 text-[#94A3B8]" />
          <div>
            <div className="font-bold text-[#66738C] group-hover:text-[#2563EB]">
              Resolution
            </div>
            <div className="text-[11px] text-[#8C909B]">Pending (Click to preview ruling)</div>
          </div>
        </div>
      </div>

      <div className="my-4 border-t border-[#E2ECF6]" />

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onViewDetails?.(job)}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] transition hover:bg-[#F8FAFC]"
        >
          <ExternalLink className="size-3.5 text-[#66738C]" />
          <span>View Full Details</span>
        </button>

        <button
          type="button"
          onClick={() => onContactClient?.(job)}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] transition hover:bg-[#F8FAFC]"
        >
          <Phone className="size-3.5 text-[#66738C]" />
          <span>Contact Client</span>
        </button>

        <button
          type="button"
          onClick={() => onUpdateResponse?.(job)}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] transition hover:bg-[#F8FAFC]"
        >
          <Edit3 className="size-3.5 text-[#66738C]" />
          <span>Update Response</span>
        </button>

        <button
          type="button"
          onClick={() => onContactAdmin?.(job)}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#EF4444] px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#DC2626]"
        >
          <Headset className="size-3.5" />
          <span>Contact Admin</span>
        </button>
      </div>
    </div>
  );
}
