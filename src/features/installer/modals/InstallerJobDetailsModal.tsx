import { AppModal } from "@/components/common/AppModal";
import type { InstallerJob } from "../types";

interface InstallerJobDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: InstallerJob | null;
  onNavigate?: (job: InstallerJob) => void;
  onStartJob?: (job: InstallerJob) => void;
}

export function InstallerJobDetailsModal({
  open,
  onOpenChange,
  job,
  onNavigate,
  onStartJob,
}: InstallerJobDetailsModalProps) {
  if (!job) return null;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title={job.reference}
      description={`${job.title} · ${job.status}`}
      footer={
        <div className="flex w-full flex-wrap items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onNavigate?.(job)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Navigate to Site
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            View Full Details
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onStartJob?.(job);
            }}
            className="rounded-xl bg-[#7C3AED] px-5 py-2 text-xs font-bold text-white hover:bg-[#6D28D9]"
          >
            Start Job
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-center">
        {/* Status Badge & Amount */}
        <div>
          <span className="inline-block rounded-full bg-[#2563EB] px-3 py-0.5 text-xs font-bold text-white">
            {job.status}
          </span>
          <div className="mt-2 text-3xl font-black text-[#10B981]">
            ₦{job.payoutAmount.toLocaleString()}
          </div>
        </div>

        {/* Details Card */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 text-xs divide-y divide-[#E2ECF6]/60">
          <div className="flex items-center justify-between pb-2.5">
            <span className="text-[#8C909B]">Client</span>
            <span className="font-bold text-[#0F152A]">{job.client}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Location</span>
            <span className="font-bold text-[#0F152A]">{job.address}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Deadline</span>
            <span className="font-bold text-[#0F152A]">{job.dueDate} · 4 days left</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Type</span>
            <span className="font-bold text-[#0F152A]">{job.title}</span>
          </div>
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Assigned</span>
            <span className="font-bold text-[#0F152A]">{job.assignedDateText}</span>
          </div>
          <div className="flex items-center justify-between pt-2.5">
            <span className="text-[#8C909B]">Distance</span>
            <span className="font-bold text-[#0F152A]">12.4 km away</span>
          </div>
        </div>

        {/* Equipment tags */}
        <div className="flex flex-wrap justify-center gap-1.5 pt-1">
          {job.equipment.map((eq) => (
            <span
              key={eq}
              className="rounded-full bg-[#F1EAFE] px-3 py-1 text-xs font-semibold text-[#7C3AED]"
            >
              {eq}
            </span>
          ))}
          <span className="rounded-full bg-[#F1EAFE] px-3 py-1 text-xs font-semibold text-[#7C3AED]">
            +3 more
          </span>
        </div>

        {/* Note Callout */}
        <div className="rounded-xl bg-[#F8FAFC] p-3 text-xs italic text-[#66738C]">
          Priority job — client expecting installation by weekend
        </div>
      </div>
    </AppModal>
  );
}
