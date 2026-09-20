import { Hourglass, UserCheck, ShieldCheck, ArrowRight } from "lucide-react";

interface PendingVerificationCardProps {
  onSendReminder?: (jobRef: string) => void;
}

export function PendingVerificationCard({ onSendReminder }: PendingVerificationCardProps) {
  const jobRef = "JOB-2026-00844";

  return (
    <div className="rounded-3xl border border-[#FDE68A] bg-[#FFFBEB]/50 p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hourglass className="size-4 text-[#D9990D]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#D9990D] sm:text-sm">
            Pending Verification
          </h3>
        </div>
        <span className="text-xs text-[#8C909B]">1 job awaiting sign-off</span>
      </div>

      {/* Main card box */}
      <div className="mt-3.5 rounded-2xl border border-[#FDE68A] bg-white p-4">
        <div className="flex items-start justify-between">
          <span className="text-[11px] font-semibold text-[#8C909B]">{jobRef}</span>
          <span className="text-[11px] text-[#8C909B]">Submitted 3 days ago</span>
        </div>

        <h4 className="mt-1 text-sm font-bold text-[#0F152A] sm:text-base">
          Residential CCTV Installation
        </h4>
        <p className="text-xs text-[#66738C]">Hard Rock Restaurant · Surulere</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-black text-[#10B981]">₦55,000</span>
          <span className="rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-bold text-[#D9990D]">
            Awaiting payment
          </span>
        </div>

        <div className="mt-3 space-y-1.5 border-t border-[#FDE68A]/60 pt-3 text-xs text-[#66738C]">
          <div className="flex items-center gap-2">
            <UserCheck className="size-3.5 text-[#D9990D]" />
            <span>Client verification: <strong className="text-[#0F152A]">Pending</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-[#8C909B]" />
            <span>Admin confirmation: <strong className="text-[#0F152A]">Awaiting client</strong></span>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => onSendReminder?.(jobRef)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
          >
            Send reminder <ArrowRight className="size-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
