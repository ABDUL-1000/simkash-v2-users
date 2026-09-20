import { Briefcase, Eye, Navigation, Calendar, Clock, MapPin, Building2, AlertTriangle } from "lucide-react";
import type { InstallerJob } from "../types";
import { ACTIVE_JOBS } from "../data/installer.data";

interface ActiveJobsListProps {
  onViewJob?: (job: InstallerJob) => void;
  onNavigate?: (job: InstallerJob) => void;
  onStartJob?: (job: InstallerJob) => void;
  onMarkComplete?: (job: InstallerJob) => void;
}

export function ActiveJobsList({
  onViewJob,
  onNavigate,
  onStartJob,
  onMarkComplete,
}: ActiveJobsListProps) {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#F1EAFE] text-[#7C3AED]">
            <Briefcase className="size-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0F152A] sm:text-base">Active Jobs</h2>
        </div>
        <button
          type="button"
          onClick={() => onViewJob?.(ACTIVE_JOBS[0])}
          className="text-xs font-bold text-[#2563EB] hover:underline"
        >
          View All →
        </button>
      </div>

      {/* Jobs list */}
      <div className="space-y-3.5">
        {ACTIVE_JOBS.map((job) => {
          const isUrgent = job.isUrgent;
          return (
            <div
              key={job.id}
              className={`rounded-3xl bg-white p-4 sm:p-5 shadow-xs transition-shadow hover:shadow-sm ${
                isUrgent ? "border-2 border-[#EF4444]" : "border border-[#E2ECF6]"
              }`}
            >
              {/* Reference & Badge & Fee */}
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-semibold text-[#8C909B]">{job.reference}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      job.status === "Assigned"
                        ? "bg-[#EFF4F8] text-[#2563EB]"
                        : "bg-[#F1EAFE] text-[#7C3AED]"
                    }`}
                  >
                    {job.status}
                  </span>
                  <span className="text-base font-black text-[#10B981] sm:text-lg">
                    ₦{job.payoutAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-1 text-sm font-bold text-[#0F152A] sm:text-base">{job.title}</h3>

              {/* Client & Area */}
              <div className="mt-1 flex items-center justify-between text-xs text-[#66738C]">
                <span className="flex items-center gap-1.5 font-medium text-[#0F152A]">
                  <Building2 className="size-3.5 text-[#8C909B]" /> {job.client}
                </span>
                <span className="text-[11px] text-[#8C909B]">{job.locationArea}</span>
              </div>

              {/* Metadata tags */}
              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#66738C]">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3 text-[#8C909B]" /> {job.address}
                </span>
                <span
                  className={`flex items-center gap-1 ${
                    isUrgent ? "font-bold text-[#EF4444]" : "text-[#66738C]"
                  }`}
                >
                  {isUrgent ? <AlertTriangle className="size-3 text-[#EF4444]" /> : <Calendar className="size-3 text-[#8C909B]" />}
                  {job.dueDaysText}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3 text-[#8C909B]" /> {job.assignedDateText}
                </span>
              </div>

              {/* Equipment list */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
                  Equipment:
                </span>
                {job.equipment.map((eq) => (
                  <span
                    key={eq}
                    className="rounded-md bg-[#F1EAFE] px-2 py-0.5 text-[10px] font-semibold text-[#7C3AED]"
                  >
                    {eq}
                  </span>
                ))}
              </div>

              {/* Progress bar if present */}
              {job.progressPercent !== undefined && (
                <div className="mt-3">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
                    <div
                      className="h-full rounded-full bg-[#7C3AED] transition-all"
                      style={{ width: `${job.progressPercent}%` }}
                    />
                  </div>
                  <div className="mt-1 text-right text-[10px] font-bold text-[#8C909B]">
                    {job.progressPercent}% complete
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#E2ECF6] pt-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onViewJob?.(job)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    <Eye className="size-3.5" /> View Job
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate?.(job)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
                  >
                    <Navigation className="size-3.5" /> Navigate
                  </button>
                </div>

                {job.status === "Assigned" ? (
                  <button
                    type="button"
                    onClick={() => onStartJob?.(job)}
                    className="inline-flex min-h-[34px] items-center justify-center rounded-xl border border-[#7C3AED] px-4 text-xs font-bold text-[#7C3AED] transition-colors hover:bg-[#7C3AED] hover:text-white"
                  >
                    Start Job
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onMarkComplete?.(job)}
                    className="inline-flex min-h-[34px] items-center justify-center rounded-xl border border-[#10B981] px-4 text-xs font-bold text-[#10B981] transition-colors hover:bg-[#10B981] hover:text-white"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
