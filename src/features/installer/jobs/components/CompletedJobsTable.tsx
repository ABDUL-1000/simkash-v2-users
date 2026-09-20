import { CheckCircle2, Star, ArrowRight } from "lucide-react";
import type { CompletedJobItem } from "../types";

interface CompletedJobsTableProps {
  jobs: CompletedJobItem[];
  onViewJob?: (job: CompletedJobItem) => void;
}

export function CompletedJobsTable({ jobs, onViewJob }: CompletedJobsTableProps) {
  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs transition hover:border-[#BFDBFE]"
        >
          {/* Left info with green check */}
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F152A] sm:text-sm">
                {job.reference} · {job.title}
              </div>
              <div className="text-[11px] text-[#66738C]">
                {job.client} · {job.location}
              </div>
            </div>
          </div>

          {/* Right fee & rating & action */}
          <div className="flex items-center justify-between sm:justify-end gap-6 pl-12 sm:pl-0">
            <div className="text-left sm:text-right">
              <div className="text-sm font-black text-[#10B981]">
                ₦{job.fee.toLocaleString()}
              </div>
              <div className="text-[10px] text-[#8C909B]">{job.completedDateText}</div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-[#F59E0B]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3 ${
                      i < Math.floor(job.rating)
                        ? "fill-[#F59E0B] text-[#F59E0B]"
                        : "text-[#CBD5E1]"
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-[#0F152A] ml-0.5">
                  {job.rating.toFixed(1)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onViewJob?.(job)}
                className="mt-0.5 inline-flex items-center gap-0.5 text-xs font-bold text-[#2563EB] hover:underline"
              >
                View <ArrowRight className="size-3" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
