import { AlertCircle } from "lucide-react";

interface UrgentJobAlertBannerProps {
  onViewJob?: (jobRef: string) => void;
}

export function UrgentJobAlertBanner({ onViewJob }: UrgentJobAlertBannerProps) {
  const urgentJobRef = "JOB-2026-00846";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#FECACA] bg-[#FFF7F8] p-3.5 sm:flex-row sm:items-center sm:justify-between sm:p-4">
      <div className="flex items-center gap-2.5">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EF4444] text-white">
          <AlertCircle className="size-4" />
        </div>
        <p className="text-xs font-bold text-[#EF4444] sm:text-sm">
          <span className="underline decoration-[#EF4444]/40">{urgentJobRef}</span> is due tomorrow! CCTV Installation (Ikeja) · ₦45,000
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onViewJob?.(urgentJobRef)}
          className="inline-flex min-h-[36px] items-center justify-center rounded-xl bg-[#EF4444] px-4 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#DC2626]"
        >
          View Job
        </button>
      </div>
    </div>
  );
}
