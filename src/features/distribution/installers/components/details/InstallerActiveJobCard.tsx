import { ArrowRight } from "lucide-react";

export function InstallerActiveJobCard() {
  return (
    <div className="rounded-2xl border-2 border-[#FDE68A] bg-[#FFFBEB] p-4 text-xs space-y-3 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#FCD34D] pb-2 font-bold text-[#92400E]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#D97706] animate-pulse" />
          <span>Active Job — In Progress</span>
        </div>
        <span>JOB-2026-00891</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[#78350F]">
          <span>Customer</span>
          <strong className="font-bold text-[#0F172A]">Adaeze Okafor · 08094321567</strong>
        </div>

        <div className="flex justify-between text-[#78350F]">
          <span>Location</span>
          <strong className="font-bold text-[#0F172A]">Victoria Island, Lagos</strong>
        </div>

        <div className="flex justify-between text-[#78350F]">
          <span>Started</span>
          <strong className="font-bold text-[#0F172A]">8:30 AM · Jul 1, 2026</strong>
        </div>

        <div className="flex justify-between text-[#78350F]">
          <span>Expected Completion</span>
          <strong className="font-bold text-[#0F172A]">2:00 PM · Jul 1, 2026</strong>
        </div>
      </div>

      <div className="border-t border-[#FCD34D] pt-2">
        <button
          type="button"
          className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
        >
          <span>View Full Job Details</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
