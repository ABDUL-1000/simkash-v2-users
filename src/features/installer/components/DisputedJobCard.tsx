import { AlertCircle, AlertTriangle, ArrowRight } from "lucide-react";

interface DisputedJobCardProps {
  onViewDispute?: (jobRef: string) => void;
}

export function DisputedJobCard({ onViewDispute }: DisputedJobCardProps) {
  const jobRef = "JOB-2026-00841";

  return (
    <div className="rounded-3xl border border-[#FECACA] bg-[#FFF7F8] p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="size-4 text-[#EF4444]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#EF4444] sm:text-sm">
            Disputed Job
          </h3>
        </div>
        <span className="text-xs text-[#8C909B]">Needs your attention</span>
      </div>

      {/* Box */}
      <div className="mt-3.5 rounded-2xl border border-[#FECACA] bg-white p-4">
        <div className="text-[11px] font-semibold text-[#8C909B]">{jobRef}</div>

        <h4 className="mt-1 text-sm font-bold text-[#0F152A] sm:text-base">
          Office CCTV Repair
        </h4>
        <p className="text-xs text-[#66738C]">Client: Access Bank HQ · Marina</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-black text-[#0F152A]">₦35,000</span>
          <span className="rounded-full bg-[#FEE2E2] px-2.5 py-0.5 text-[11px] font-bold text-[#EF4444]">
            Payment Held
          </span>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#FFF7F8] p-2.5 text-xs text-[#EF4444]">
          <AlertTriangle className="size-4 shrink-0 mt-0.5" />
          <span>Client says installation incomplete — 2 cameras not working</span>
        </div>

        <div className="mt-3 flex justify-start">
          <button
            type="button"
            onClick={() => onViewDispute?.(jobRef)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#EF4444] hover:underline"
          >
            View Dispute <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
