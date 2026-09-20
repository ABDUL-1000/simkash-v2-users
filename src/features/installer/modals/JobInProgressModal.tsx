import { AppModal } from "@/components/common/AppModal";
import type { InstallerJob } from "../types";

interface JobInProgressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: InstallerJob | null;
  onNavigate?: (job: InstallerJob) => void;
  onUpdateProgress?: (job: InstallerJob) => void;
  onViewDetails?: (job: InstallerJob) => void;
  onMarkComplete?: (job: InstallerJob) => void;
}

export function JobInProgressModal({
  open,
  onOpenChange,
  job,
  onNavigate,
  onUpdateProgress,
  onViewDetails,
  onMarkComplete,
}: JobInProgressModalProps) {
  const jobRef = job?.reference ?? "JOB-2026-00846";
  const jobTitle = job?.title ?? "CCTV Camera Installation";
  const progress = job?.progressPercent ?? 60;
  const clientName = job?.client ?? "First Bank Branch";
  const location = job?.address ?? "Ikeja, Lagos";
  const deadline = job?.dueDaysText ?? "26 Jun · 2 days";

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title={jobRef}
      description={`${jobTitle} · In Progress`}
      footer={
        <div className="flex w-full flex-wrap items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => job && onNavigate?.(job)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Navigate
          </button>
          <button
            type="button"
            onClick={() => job && onUpdateProgress?.(job)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Update Progress
          </button>
          <button
            type="button"
            onClick={() => job && onViewDetails?.(job)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              job && onMarkComplete?.(job);
            }}
            className="rounded-xl bg-[#10B981] px-4 py-2 text-xs font-bold text-white hover:bg-[#059669]"
          >
            Mark Complete
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* Status Badge & Progress % */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#7C3AED] px-3 py-1 text-xs font-bold text-white">
            In Progress
          </span>
          <span className="text-xs font-bold text-[#7C3AED] sm:text-sm">
            {progress}% complete
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
          <div
            className="h-full rounded-full bg-[#7C3AED] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Details Card */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 text-xs divide-y divide-[#E2ECF6]/60">
          <div className="flex items-center justify-between pb-2.5">
            <span className="text-[#8C909B]">Client</span>
            <span className="font-bold text-[#0F152A]">{clientName}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Location</span>
            <span className="font-bold text-[#0F152A]">{location}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Deadline</span>
            <span className="font-bold text-[#0F152A]">{deadline}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Progress</span>
            <span className="font-bold text-[#0F152A]">{progress}%</span>
          </div>
          <div className="flex items-center justify-between pt-2.5">
            <span className="text-[#8C909B]">Steps</span>
            <span className="font-bold text-[#0F152A]">Installation ✓ · Testing ⌛</span>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
