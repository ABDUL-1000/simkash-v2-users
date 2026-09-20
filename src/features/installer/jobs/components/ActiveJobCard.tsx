import { Building2 } from "lucide-react";
import type { JobDetailItem } from "../types";
import { ActiveJobMetaGrid } from "./ActiveJobMetaGrid";
import { ActiveJobEasyBuySection } from "./ActiveJobEasyBuySection";

interface ActiveJobCardProps {
  job: JobDetailItem;
  onNavigate?: (job: JobDetailItem) => void;
  onContactClient?: (job: JobDetailItem) => void;
  onUpdateProgress?: (job: JobDetailItem) => void;
  onStartJob?: (job: JobDetailItem) => void;
  onMarkComplete?: (job: JobDetailItem) => void;
  onViewDetails?: (job: JobDetailItem) => void;
  onViewPlan?: (job: JobDetailItem) => void;
}

export function ActiveJobCard({
  job,
  onNavigate,
  onContactClient,
  onUpdateProgress,
  onStartJob,
  onMarkComplete,
  onViewDetails,
  onViewPlan,
}: ActiveJobCardProps) {
  const isAssigned = job.status === "Assigned";
  const isEasyBuy = job.isEasyBuy;

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#8C909B]">{job.reference}</span>
            {isEasyBuy && (
              <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[9px] font-extrabold uppercase text-[#2563EB]">
                EASYBUY
              </span>
            )}
          </div>
          <h3
            onClick={() => onViewDetails?.(job)}
            className="cursor-pointer text-sm font-bold text-[#0F152A] hover:text-[#2563EB] sm:text-base"
          >
            {job.title}
          </h3>
          <p className="text-[11px] text-[#8C909B]">{job.assignedDaysAgo}</p>
        </div>

        <div className="text-right">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
              isAssigned
                ? "bg-[#EFF4F8] text-[#2563EB] border border-[#BFDBFE]"
                : "bg-[#F1EAFE] text-[#7C3AED]"
            }`}
          >
            {job.status}
          </span>
          <div className="mt-1 text-base font-black text-[#10B981] sm:text-lg">
            ₦{job.fee.toLocaleString()}
          </div>
          <span className="text-[10px] text-[#8C909B]">Job payment</span>
        </div>
      </div>

      {/* Client card */}
      <div className="mt-3 flex items-center gap-2.5 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#F1EAFE] text-[#7C3AED]">
          <Building2 className="size-4" />
        </div>
        <div className="flex-1 text-xs">
          <span className="font-bold text-[#0F152A]">{job.client.company}</span>
          <div className="text-[11px] text-[#66738C]">
            {job.client.category} · Contact: {job.client.contactName} · {job.client.phone}
          </div>
        </div>
      </div>

      {/* EasyBuy details banner if active */}
      {isEasyBuy && <ActiveJobEasyBuySection plan={job.easyBuyPlan} />}

      {/* Meta 6-grid */}
      <ActiveJobMetaGrid job={job} />

      {/* Equipment tags */}
      <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
          Equipment:
        </span>
        {job.equipment.slice(0, 4).map((eq) => (
          <span
            key={eq.id}
            className="rounded-md bg-[#F1EAFE] px-2 py-0.5 text-[10px] font-semibold text-[#7C3AED]"
          >
            {eq.name}
          </span>
        ))}
      </div>

      {/* Job Description */}
      <div className="mt-3 text-xs text-[#66738C] leading-relaxed">
        <span className="font-bold text-[#0F152A]">Job Description: </span>
        {job.description}
      </div>

      {/* Progress section */}
      <div className="mt-4 border-t border-[#E2ECF6] pt-3">
        {isAssigned ? (
          <div className="text-center text-[11px] text-[#8C909B]">
            <span className="font-semibold">Not started yet</span>
            <div className="mt-2 flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[#CBD5E1]" /> Start Job</span>
              <span className="h-0.5 flex-1 bg-[#E2ECF6] mx-2" />
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[#CBD5E1]" /> Installation</span>
              <span className="h-0.5 flex-1 bg-[#E2ECF6] mx-2" />
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[#CBD5E1]" /> Testing</span>
              <span className="h-0.5 flex-1 bg-[#E2ECF6] mx-2" />
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-[#CBD5E1]" /> Complete</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#7C3AED]">Progress: {job.progressPercent}% complete</span>
              <button
                type="button"
                onClick={() => onUpdateProgress?.(job)}
                className="text-[11px] font-bold text-[#2563EB] hover:underline"
              >
                Update Progress
              </button>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
              <div
                className="h-full rounded-full bg-[#7C3AED]"
                style={{ width: `${job.progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#E2ECF6] pt-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate?.(job)}
            className="cursor-pointer rounded-xl border border-[#E2ECF6] bg-white px-3 py-1.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Navigate to Site
          </button>
          <button
            type="button"
            onClick={() => onContactClient?.(job)}
            className="cursor-pointer rounded-xl border border-[#E2ECF6] bg-white px-3 py-1.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Contact Client
          </button>
          {isEasyBuy && (
            <button
              type="button"
              onClick={() => onViewPlan?.(job)}
              className="cursor-pointer rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1.5 text-xs font-bold text-[#2563EB] hover:bg-[#DBEAFE]"
            >
              View EasyBuy Plan
            </button>
          )}
        </div>

        {isAssigned ? (
          <button
            type="button"
            onClick={() => onStartJob?.(job)}
            className={`cursor-pointer rounded-xl px-4 py-1.5 text-xs font-bold text-white shadow-xs ${
              isEasyBuy ? "bg-[#10B981] hover:bg-[#059669]" : "bg-[#7C3AED] hover:bg-[#6D28D9]"
            }`}
          >
            Start Job
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onMarkComplete?.(job)}
            className="cursor-pointer rounded-xl bg-[#10B981] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#059669]"
          >
            Mark Complete
          </button>
        )}
      </div>
    </div>
  );
}
