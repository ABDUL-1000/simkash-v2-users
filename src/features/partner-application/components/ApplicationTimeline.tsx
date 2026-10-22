import { Check, X } from "lucide-react";
import { applicationTimeline } from "../utils/applicationStatus";

/** Submitted → Under review → Decision, derived from the application status. */
export function ApplicationTimeline({ status, compact }: { status?: string; compact?: boolean }) {
  return <ul className={compact ? "space-y-1.5" : "space-y-3"}>
    {applicationTimeline(status).map(step => {
      const style = step.state === "done" ? "bg-[#10B981] text-white" : step.state === "current" ? "bg-[#2563EB] text-white" : step.state === "failed" ? "bg-[#EF4444] text-white" : "bg-[#EFF4F8] text-[#8C909B]";
      const text = step.state === "done" ? "text-[#10B981]" : step.state === "current" ? "text-[#2563EB]" : step.state === "failed" ? "text-[#EF4444]" : "text-[#8C909B]";
      return <li key={step.label} className={`flex items-center gap-3 ${compact ? "text-xs" : "text-sm"}`}>
        <span className={`flex items-center justify-center rounded-full ${compact ? "size-4" : "h-4 w-5"} ${style}`}>
          {step.state === "done" ? <Check className="size-2.5" strokeWidth={4} /> : step.state === "failed" ? <X className="size-2.5" strokeWidth={4} /> : step.state === "current" ? <span className="text-[9px] leading-none">~</span> : <span className="size-1.5 rounded-full border border-current" />}
        </span>
        <span className={text}>{step.label}</span>
      </li>;
    })}
  </ul>;
}
