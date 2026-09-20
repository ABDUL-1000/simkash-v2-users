import { Star, Sparkles } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface InstallerBonusTrackerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewFullTracker?: () => void;
}

export function InstallerBonusTrackerModal({
  open,
  onOpenChange,
  onViewFullTracker,
}: InstallerBonusTrackerModalProps) {
  const jobs = [
    { ref: "JOB-00843", fee: 45000, rating: 5, time: "5d" },
    { ref: "JOB-00842", fee: 80000, rating: 4, time: "1wk" },
    { ref: "JOB-00840", fee: 55000, rating: 5, time: "2wk" },
    { ref: "JOB-00839", fee: 65000, rating: 5, time: "3wk" },
    { ref: "JOB-00838", fee: 30000, rating: 3, time: "1mo" },
    { ref: "JOB-00835", fee: 75000, rating: 5, time: "5wk" },
    { ref: "JOB-00831", fee: 40000, rating: 4, time: "6wk" },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Bonus Tracker"
      description="Jun 2026 · 15 days left"
      footer={
        <div className="flex w-full flex-wrap items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onViewFullTracker}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            View Full Bonus Tracker
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-5 py-2 text-xs font-bold text-white hover:bg-[#1D4ED8]"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-center">
        {/* Circular Progress Display */}
        <div className="flex justify-center">
          <div className="relative flex size-28 items-center justify-center">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#E2ECF6]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#EA580C]"
                strokeDasharray="58, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-[#0F152A]">7</span>
              <span className="text-[10px] font-semibold text-[#8C909B]">of 12 jobs</span>
            </div>
          </div>
        </div>

        {/* Subheader Banner */}
        <div className="text-xs font-bold text-[#EA580C] sm:text-sm">
          ₦50,000 bonus on 12 completed jobs
        </div>

        {/* Linear Progress Bar */}
        <div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
            <div className="h-full rounded-full bg-[#EA580C]" style={{ width: "58%" }} />
          </div>
          <div className="mt-1 flex justify-between text-[11px] text-[#8C909B]">
            <span>0 jobs</span>
            <span>12 target</span>
          </div>
          <div className="mt-1 text-xs font-semibold text-[#66738C]">
            5 more jobs needed · 15 days left
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <span className="text-[10px] font-semibold text-[#8C909B]">Completed</span>
            <div className="mt-1 text-lg font-black text-[#10B981]">7</div>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <span className="text-[10px] font-semibold text-[#8C909B]">Active</span>
            <div className="mt-1 text-lg font-black text-[#7C3AED]">3</div>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <span className="text-[10px] font-semibold text-[#8C909B]">Remaining</span>
            <div className="mt-1 text-lg font-black text-[#EA580C]">5</div>
          </div>
        </div>

        {/* On Track Yellow Banner */}
        <div className="flex items-center gap-2 rounded-xl bg-[#FEF3C7] p-3 text-left text-xs text-[#92400E]">
          <Sparkles className="size-4 shrink-0 text-[#EA580C]" />
          <span>
            With 3 active jobs and 15 days left you're on track! Complete current jobs quickly to hit the target!
          </span>
        </div>

        {/* Table of Completed Jobs */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6] text-left text-xs">
          {jobs.map((j) => (
            <div key={j.ref} className="flex items-center justify-between px-3.5 py-2">
              <span className="font-bold text-[#0F152A]">{j.ref}</span>
              <span className="font-semibold text-[#10B981]">₦{j.fee.toLocaleString()}</span>
              <div className="flex items-center text-[#F59E0B]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3 ${
                      i < j.rating ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-[#8C909B]">{j.time}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-[#8C909B]">7 of 12 jobs completed</div>
      </div>
    </AppModal>
  );
}
