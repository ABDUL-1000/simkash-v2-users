import { Navigation, Phone, Play } from "lucide-react";
import type { JobDetailItem } from "../types";

interface EasyBuyDetailsHeaderProps {
  job: JobDetailItem;
  onNavigate?: () => void;
  onContactClient?: () => void;
  onStartJob?: () => void;
}

export function EasyBuyDetailsHeader({
  job,
  onNavigate,
  onContactClient,
  onStartJob,
}: EasyBuyDetailsHeaderProps) {
  const commission = job.easyBuyPlan?.commissionAmount ?? 22500;

  return (
    <div className="space-y-4">
      {/* 1. Top Summary Meta Bar */}
      <div className="grid grid-cols-2 divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white p-2.5 text-xs shadow-xs sm:grid-cols-4 lg:grid-cols-7 sm:divide-y-0 sm:divide-x">
        {/* Status */}
        <div className="p-2 sm:p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Status</span>
          <div className="mt-0.5 flex items-center gap-1.5 font-bold text-[#2563EB]">
            <span className="size-2 rounded-full bg-[#2563EB]" />
            {job.status}
          </div>
        </div>

        {/* EasyBuy Badge */}
        <div className="p-2 sm:p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">EasyBuy</span>
          <div className="mt-0.5">
            <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
              EASYBUY
            </span>
          </div>
        </div>

        {/* Job Fee */}
        <div className="p-2 sm:p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Job Fee</span>
          <div className="mt-0.5 font-black text-[#10B981]">₦{job.fee.toLocaleString()}</div>
        </div>

        {/* EB Commission */}
        <div className="p-2 sm:p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">EB Commission</span>
          <div className="mt-0.5 font-black text-[#2563EB]">
            ₦{commission.toLocaleString()} <span className="text-[10px] font-normal text-[#8C909B]">(deferred)</span>
          </div>
        </div>

        {/* Client */}
        <div className="p-2 sm:p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Client</span>
          <div className="mt-0.5 truncate font-bold text-[#0F152A]">{job.client.company}</div>
        </div>

        {/* Due */}
        <div className="p-2 sm:p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Due</span>
          <div className="mt-0.5 font-bold text-[#D97706]">
            {job.dueDate} <span className="text-[10px] font-normal">· {job.dueDaysRemaining}</span>
          </div>
        </div>

        {/* Distance */}
        <div className="p-2 sm:p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Distance</span>
          <div className="mt-0.5 font-bold text-[#0F152A]">{job.distanceKm} km away</div>
        </div>
      </div>

      {/* 2. Header Main Title & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
            EasyBuy Installation
          </span>
          <h1 className="mt-1 text-2xl font-black text-[#0F152A]">{job.title}</h1>
          <p className="text-xs text-[#8C909B]">{job.reference} · {job.assignedDaysAgo}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onNavigate}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-[#F8FAFC]"
          >
            <Navigation className="size-3.5 text-[#2563EB]" />
            <span>Navigate to Site</span>
          </button>
          <button
            type="button"
            onClick={onContactClient}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-[#F8FAFC]"
          >
            <Phone className="size-3.5 text-[#10B981]" />
            <span>Contact Client</span>
          </button>
          <button
            type="button"
            onClick={onStartJob}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#7C3AED] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#6D28D9]"
          >
            <Play className="size-3.5 fill-current" />
            <span>Start Job</span>
          </button>
        </div>
      </div>
    </div>
  );
}
