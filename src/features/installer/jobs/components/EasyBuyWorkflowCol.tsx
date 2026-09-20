import { CheckCircle2, Clock } from "lucide-react";
import type { JobDetailItem } from "../types";
import { CompletionChecklist } from "./CompletionChecklist";
import { UploadCompletionPhotos } from "./UploadCompletionPhotos";

interface EasyBuyWorkflowColProps {
  job: JobDetailItem;
  onStartJob?: () => void;
  onSubmitVerification?: () => void;
}

export function EasyBuyWorkflowCol({
  job,
  onStartJob,
  onSubmitVerification,
}: EasyBuyWorkflowColProps) {
  const isAssigned = job.status === "Assigned";
  const isInProgress = job.status === "In Progress";
  const isPending = job.status === "Pending Verification";

  return (
    <div className="space-y-4">
      {/* 1. Job Progress Stepper */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5 text-xs">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold uppercase tracking-wider text-[#0F152A]">
            Job Progress
          </h4>
          <span className="text-[11px] font-semibold text-[#8C909B]">
            {isPending ? "Verification Pending" : isAssigned ? "Not started" : "In Progress"}
          </span>
        </div>

        <div className="mt-4 space-y-4">
          {/* Step 1: Start Job */}
          <div className="flex items-start gap-3">
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-xs ${
                !isAssigned
                  ? "bg-[#10B981] text-white"
                  : "border-2 border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED]"
              }`}
            >
              {!isAssigned ? <CheckCircle2 className="size-5" /> : "1"}
            </div>
            <div className="flex-1">
              <div className="font-bold text-[#0F152A]">Start Job</div>
              <p className="text-[11px] text-[#66738C]">
                Confirm you're on-site and ready to begin installation
              </p>
              {isAssigned && (
                <button
                  type="button"
                  onClick={onStartJob}
                  className="mt-2.5 cursor-pointer rounded-xl bg-[#7C3AED] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#6D28D9]"
                >
                  Confirm On-Site & Start
                </button>
              )}
            </div>
          </div>

          {/* Step 2: Installation */}
          <div className="flex items-start gap-3">
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-xs ${
                isPending
                  ? "bg-[#10B981] text-white"
                  : isInProgress
                  ? "border-2 border-[#7C3AED] bg-[#F5F3FF] text-[#7C3AED]"
                  : "border-2 border-[#CBD5E1] bg-white text-[#8C909B]"
              }`}
            >
              {isPending ? <CheckCircle2 className="size-5" /> : "2"}
            </div>
            <div className="flex-1">
              <div className="font-bold text-[#0F152A]">Installation</div>
              <p className="text-[11px] text-[#66738C]">
                Install all equipment per the job specification
              </p>
            </div>
          </div>

          {/* Step 3: Testing & Quality Check */}
          <div className="flex items-start gap-3">
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-full font-bold text-xs ${
                isPending
                  ? "bg-[#10B981] text-white"
                  : "border-2 border-[#CBD5E1] bg-white text-[#8C909B]"
              }`}
            >
              {isPending ? <CheckCircle2 className="size-5" /> : "3"}
            </div>
            <div className="flex-1">
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
                isPending
                  ? "bg-[#D97706] text-white"
                  : "border-2 border-[#CBD5E1] bg-white text-[#8C909B]"
              }`}
            >
              {isPending ? <Clock className="size-4" /> : "4"}
            </div>
            <div className="flex-1">
              <div className="font-bold text-[#0F152A]">Mark as Complete</div>
              <p className="text-[11px] text-[#66738C]">
                Submit completion for client and admin verification
              </p>
              {!isPending && (
                <button
                  type="button"
                  onClick={onSubmitVerification}
                  className="mt-2.5 cursor-pointer rounded-xl bg-[#10B981] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#059669]"
                >
                  Submit for Verification
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Completion Checklist */}
      <CompletionChecklist items={job.completionChecklist} />

      {/* 3. Upload Completion Photos */}
      <UploadCompletionPhotos job={job} />
    </div>
  );
}
