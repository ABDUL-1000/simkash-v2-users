import { useState } from "react";
import { Info, Briefcase } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface MarkJobCompleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleteJob?: (jobId: string) => void;
}

export function MarkJobCompleteModal({
  open,
  onOpenChange,
  onCompleteJob,
}: MarkJobCompleteModalProps) {
  const jobs = [
    {
      id: "job-2",
      ref: "JOB-2026-00846",
      title: "CCTV Camera",
      client: "First Bank Ikeja",
      amount: 45000,
      progress: 60,
      dueText: "Due 26 Jun (2 days)",
    },
    {
      id: "job-3",
      ref: "JOB-2026-00845",
      title: "Solar Panel",
      client: "Dangote Industries VI",
      amount: 75000,
      progress: 20,
      dueText: "Due 30 Jun (6 days)",
    },
  ];

  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0].id);

  const handleSubmit = () => {
    onOpenChange(false);
    onCompleteJob?.(selectedJobId);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="Mark Job as Complete"
      description="Select the job to submit"
      actions={[
        {
          key: "cancel",
          label: "Cancel",
          variant: "secondary",
          onClick: () => onOpenChange(false),
        },
        {
          key: "continue",
          label: "Continue to Completion →",
          variant: "primary",
          style: { backgroundColor: "#10B981", borderColor: "#10B981", color: "#FFFFFF" },
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="space-y-3.5 py-1">
        {/* Info callout */}
        <div className="flex items-center gap-2 rounded-2xl bg-[#EFF6FF] p-3 text-xs text-[#2563EB]">
          <Info className="size-4 shrink-0" />
          <span>Select which active job you want to submit for verification.</span>
        </div>

        {/* Job selection list */}
        <div className="space-y-2.5">
          {jobs.map((job) => {
            const isSelected = selectedJobId === job.id;
            return (
              <div
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl p-3.5 transition-all ${
                  isSelected
                    ? "border-2 border-[#2563EB] bg-white shadow-xs"
                    : "border border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
                }`}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#F1EAFE] text-[#7C3AED]">
                  <Briefcase className="size-4" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F152A]">
                      {job.ref} · {job.title}
                    </span>
                    <span className="text-sm font-black text-[#10B981]">
                      ₦{job.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-[#66738C]">
                    <span>{job.client}</span>
                    <span className="rounded-full bg-[#F1EAFE] px-2 py-0.2 text-[10px] font-bold text-[#7C3AED]">
                      In Progress
                    </span>
                    <span>{job.progress}% complete</span>
                    <span className="text-[#8C909B]">{job.dueText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppModal>
  );
}
