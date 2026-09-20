import { Trophy, MapPin, Phone, MessageSquare, ExternalLink } from "lucide-react";
import type { JobDetailItem } from "../types";

interface EasyBuyPlanSidebarColProps {
  job: JobDetailItem;
  onOpenPlanModal?: () => void;
  onNavigate?: () => void;
  onContactClient?: () => void;
  onReportIssue?: () => void;
  onContactAdmin?: () => void;
}

export function EasyBuyPlanSidebarCol({
  job,
  onOpenPlanModal,
  onNavigate,
  onContactClient,
  onReportIssue,
  onContactAdmin,
}: EasyBuyPlanSidebarColProps) {
  const plan = job.easyBuyPlan;
  const commission = plan?.commissionAmount ?? 22500;
  const customer = plan?.customerName ?? job.client.contactName;
  const phone = plan?.customerPhone ?? job.client.phone;
  const progress = plan?.planProgress ?? 61;
  const paid = plan?.amountPaid ?? 275000;
  const totalValue = plan?.productValue ?? 450000;

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Customer Plan Card */}
      <div
        onClick={onOpenPlanModal}
        className="cursor-pointer space-y-3 rounded-3xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 shadow-xs transition hover:border-[#2563EB] sm:p-5"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
            {plan?.planId ?? "PLAN-2026-00847"}
          </span>
          <span className="text-[10px] font-bold text-[#2563EB] hover:underline">
            View Details →
          </span>
        </div>

        <div>
          <h4 className="font-extrabold text-sm text-[#0F152A]">{plan?.product ?? "Basic CCTV Package"}</h4>
          <p className="text-[11px] text-[#66738C]">{customer} · {phone}</p>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-bold text-[11px]">
            <span className="text-[#0F152A]">₦{paid.toLocaleString()} of ₦{totalValue.toLocaleString()}</span>
            <span className="text-[#10B981]">({progress}%)</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#DBEAFE]">
            <div
              className="h-full rounded-full bg-[#10B981]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#66738C]">
            <span>{plan?.installmentRate ?? "Daily · ₦8,500/day"}</span>
            <span className="font-semibold text-[#2563EB]">~{plan?.daysRemaining ?? 13} days remaining</span>
          </div>
        </div>
      </div>

      {/* 2. Your EasyBuy Commission Card */}
      <div className="space-y-2 rounded-3xl bg-[#0F172A] p-4 text-white shadow-xs sm:p-5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
          Your EasyBuy Commission
        </span>
        <div className="text-3xl font-black text-[#60A5FA]">
          ₦{commission.toLocaleString()}
        </div>
        <p className="text-[11px] text-[#CBD5E1]">
          Pays when {customer.split(" ")[0]} completes plan
        </p>
        <span className="inline-block rounded-lg bg-[#1E293B] px-2.5 py-1 text-[10px] font-semibold text-[#94A3B8]">
          Est. completion: {plan?.estimatedCompletionDate ?? "~17 Jul 2026"}
        </span>
      </div>

      {/* 3. Bonus Target Pill */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-[#FDE68A] bg-[#FEF9C3] p-3 text-[11px] text-[#92400E]">
        <Trophy className="size-4 shrink-0 text-[#D97706]" />
        <span>This EasyBuy job counts as 1 job toward your 12-job bonus target</span>
      </div>

      {/* 4. Job Location map widget */}
      <div className="space-y-3 rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5">
        <h4 className="font-extrabold uppercase tracking-wider text-[#0F152A]">Job Location</h4>
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#F8FAFC] p-4 text-center border border-[#E2ECF6]">
          <MapPin className="size-6 text-[#2563EB] mb-1" />
          <span className="font-bold text-[#0F152A]">{job.client.address}</span>
          <span className="text-[10px] text-[#8C909B]">{job.distanceKm} km from current location</span>
        </div>
        <div className="flex items-center justify-around pt-1 text-xs">
          <button
            type="button"
            onClick={onNavigate}
            className="cursor-pointer font-bold text-[#2563EB] hover:underline"
          >
            Navigate
          </button>
          <span className="text-[#CBD5E1]">·</span>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(job.client.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* 5. Contact Client */}
      <div className="space-y-2 rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5">
        <h4 className="font-extrabold uppercase tracking-wider text-[#0F152A]">Contact Client</h4>
        <div className="space-y-2">
          <button
            type="button"
            onClick={onContactClient}
            className="flex w-full cursor-pointer items-center gap-2 rounded-xl bg-[#EBFFF8] p-2.5 text-[#065F46] transition hover:bg-[#D1FAE5]"
          >
            <Phone className="size-4 text-[#10B981]" />
            <div className="text-left">
              <span className="block font-bold">Call</span>
              <span className="text-[10px] text-[#059669]">{phone}</span>
            </div>
          </button>
          <a
            href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#EBFFF8] p-2.5 text-[#065F46] transition hover:bg-[#D1FAE5]"
          >
            <MessageSquare className="size-4 text-[#10B981]" />
            <div>
              <span className="block font-bold">WhatsApp</span>
              <span className="text-[10px] text-[#059669]">Send Message</span>
            </div>
          </a>
        </div>
      </div>

      {/* 6. Having a problem */}
      <div className="space-y-2 rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5">
        <h4 className="font-extrabold uppercase tracking-wider text-[#8C909B]">Having a problem?</h4>
        <div className="space-y-2">
          <button
            type="button"
            onClick={onReportIssue}
            className="w-full cursor-pointer rounded-xl border border-[#FECACA] bg-white p-2 font-bold text-[#EF4444] hover:bg-[#FFF1F2]"
          >
            Report Issue
          </button>
          <button
            type="button"
            onClick={onContactAdmin}
            className="w-full cursor-pointer rounded-xl border border-[#E2ECF6] bg-white p-2 font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Contact Admin
          </button>
        </div>
      </div>
    </div>
  );
}
