import { CheckCircle2 } from "lucide-react";
import type { JobDetailItem } from "../types";

interface JobProgressStepperProps {
  job: JobDetailItem;
  onStartJob?: () => void;
  onUpdateProgress?: () => void;
  onMarkComplete?: () => void;
}

export function JobProgressStepper({
  job,
  onStartJob,
  onMarkComplete,
}: JobProgressStepperProps) {
  const isPendingVerification = job.status === "Pending Verification";
  const isInProgress = job.status === "In Progress";
  const isAssigned = job.status === "Assigned";

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F152A]">
          Job Progress
        </h4>
        <span className="text-[11px] font-semibold text-[#8C909B]">
          {isPendingVerification
            ? "All complete"
            : isInProgress
            ? "Step 3 of 4"
            : "Not started"}
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {/* Step 1: Start Job */}
        <div className="flex items-start gap-3">
          <div
            className={`flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-xs ${
              !isAssigned
                ? "bg-[#10B981] text-white"
                : "border-2 border-[#CBD5E1] bg-white text-[#66738C]"
            }`}
          >
            {!isAssigned ? <CheckCircle2 className="size-5" /> : "1"}
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-[#0F152A]">Start Job</div>
            <p className="text-[11px] text-[#66738C]">
              Confirm you're on-site and ready to begin installation
            </p>
            {isAssigned && (
              <button
                type="button"
                onClick={onStartJob}
                className="mt-2 rounded-xl bg-[#7C3AED] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#6D28D9]"
              >
                Start Job
              </button>
            )}
            {!isAssigned && (
              <span className="mt-1 block text-[10px] text-[#8C909B]">
                Started: 24 Jun · 8:30 AM
              </span>
            )}
          </div>
        </div>

        {/* Step 2: Installation */}
        <div className="flex items-start gap-3">
          <div
            className={`flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-xs ${
              !isAssigned
                ? "bg-[#10B981] text-white"
                : "border-2 border-[#CBD5E1] bg-white text-[#66738C]"
            }`}
          >
            {!isAssigned ? <CheckCircle2 className="size-5" /> : "2"}
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-[#0F152A]">Installation</div>
            <p className="text-[11px] text-[#66738C]">
              Install all equipment per the job specification
            </p>
            {!isAssigned && (
              <span className="mt-1 block text-[10px] text-[#8C909B]">
                Installed: 24 Jun · 11:45 AM
              </span>
            )}
          </div>
        </div>

        {/* Step 3: Testing & Quality Check */}
        <div className="flex items-start gap-3">
          <div
            className={`flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-xs ${
              isPendingVerification
                ? "bg-[#10B981] text-white"
                : isInProgress
                ? "bg-[#7C3AED] text-white"
                : "border-2 border-[#CBD5E1] bg-white text-[#66738C]"
            }`}
          >
            {isPendingVerification ? (
              <CheckCircle2 className="size-5" />
            ) : isInProgress ? (
              <span className="size-2 rounded-full bg-white" />
            ) : (
              "3"
            )}
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-[#0F152A]">Testing & Quality Check</div>
            <p className="text-[11px] text-[#66738C]">
              Test all cameras and systems are functioning correctly
            </p>
          </div>
        </div>

        {/* Step 4: Mark as Complete */}
        <div className="flex items-start gap-3">
          <div
            className={`flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-xs ${
              isPendingVerification
                ? "bg-[#10B981] text-white"
                : "border-2 border-[#CBD5E1] bg-white text-[#66738C]"
            }`}
          >
            {isPendingVerification ? <CheckCircle2 className="size-5" /> : "4"}
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-[#0F152A]">Mark as Complete</div>
            <p className="text-[11px] text-[#66738C]">
              Submit completion for client and admin verification
            </p>
            {isInProgress && (
              <button
                type="button"
                onClick={onMarkComplete}
                className="mt-2 rounded-xl bg-[#10B981] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#059669]"
              >
                Mark as Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
