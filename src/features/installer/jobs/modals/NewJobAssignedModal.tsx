import { Briefcase, Building2, MapPin, Wallet, Calendar, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { JobDetailItem } from "../types";

interface NewJobAssignedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job?: JobDetailItem | null;
  onAcceptJob?: () => void;
  onContactAdmin?: () => void;
}

export function NewJobAssignedModal({
  open,
  onOpenChange,
  job,
  onAcceptJob,
  onContactAdmin,
}: NewJobAssignedModalProps) {
  const title = job?.title ?? "Solar CCTV Installation";
  const ref = job?.reference ?? "JOB-2026-00847";
  const client = job?.client.company ?? "Zenith Bank HQ";
  const location = job?.client.address ?? "23 Marina St · Lagos Island";
  const fee = job?.fee ?? 65000;
  const deadline = job?.dueDate ? `${job.dueDate} (4 days)` : "28 Jun 2026 (4 days)";

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
    >
      <div className="space-y-4 py-2 text-center text-xs">
        {/* Purple briefcase icon badge */}
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#F1EAFE] text-[#7C3AED]">
          <Briefcase className="size-6" />
        </div>

        <h3 className="text-xl font-black text-[#0F152A]">New Job Assigned!</h3>

        {/* Dark Job Card */}
        <div className="space-y-3 rounded-3xl bg-[#0F152A] p-5 text-left text-white shadow-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
            NEW JOB
          </span>
          <div>
            <h4 className="text-lg font-black text-white">{title}</h4>
            <span className="font-mono text-xs text-[#94A3B8]">{ref}</span>
          </div>

          <div className="space-y-2 pt-1 text-xs text-[#CBD5E1]">
            <div className="flex items-center gap-2">
              <Building2 className="size-4 shrink-0 text-[#94A3B8]" />
              <span>
                Client: <strong className="text-white">{client}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-[#94A3B8]" />
              <span>
                Location: <strong className="text-white">{location}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="size-4 shrink-0 text-[#94A3B8]" />
              <span>
                Payment: <strong className="text-[#F59E0B]">₦{fee.toLocaleString()}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 shrink-0 text-[#94A3B8]" />
              <span>
                Deadline: <strong className="text-white">{deadline}</strong>
              </span>
            </div>
          </div>

          <p className="border-t border-white/10 pt-2.5 text-[11px] italic text-[#94A3B8]">
            "Priority job — client expecting installation by weekend"
          </p>
        </div>

        <p className="font-medium text-[#66738C]">Are you able to take this job?</p>

        {/* Stacked Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onAcceptJob?.();
            }}
            className="w-full cursor-pointer rounded-2xl bg-[#7C3AED] py-3 text-sm font-bold text-white shadow-xs transition hover:bg-[#6D28D9]"
          >
            Accept Job
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onContactAdmin?.();
            }}
            className="w-full cursor-pointer rounded-2xl border border-[#E2ECF6] bg-white py-3 text-sm font-bold text-[#0F152A] transition hover:bg-[#F8FAFC]"
          >
            Contact Admin
          </button>
        </div>

        {/* Admin note */}
        <div className="flex items-center justify-center gap-1 text-[10px] text-[#8C909B]">
          <Info className="size-3" />
          <span>
            Jobs are assigned by Super Admin. If you cannot complete this job contact Admin immediately.
          </span>
        </div>
      </div>
    </AppModal>
  );
}
