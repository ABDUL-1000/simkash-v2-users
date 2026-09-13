import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface NotifyApRetryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simNumber?: string;
  simType?: string;
  network?: string;
  apName?: string;
  failedTime?: string;
  failedReason?: string;
  scName?: string;
  onSuccess?: () => void;
}

export function NotifyApRetryModal({
  open,
  onOpenChange,
  simNumber = "07055093537",
  simType = "GPS SIM",
  network = "MTN",
  apName = "Francis Udom",
  failedTime = "Today · 45 min ago",
  failedReason = "MTN SIM not found",
  scName = "Aminat (SC)",
  onSuccess,
}: NotifyApRetryModalProps) {
  const firstName = apName.split(" ")[0];
  const notificationText = `"Hi ${firstName}, please retry activation of SIM ${simNumber} (${simType.split(" ")[0]}/${network}). Previous attempt failed. — ${scName}"`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Notify AP to Retry"
      description={`${simNumber} · ${simType} · ${network}`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Failed Attempt Red Box (Matching Image 4) */}
        <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3.5 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EF4444]">
            FAILED ATTEMPT
          </span>
          <div className="flex items-center gap-2 font-black text-xs text-[#EF4444] pt-0.5">
            <AlertCircle className="size-4 shrink-0 text-[#EF4444]" />
            <span>Failed: {failedTime}</span>
          </div>
          <p className="text-[11px] text-[#EF4444]/90 font-medium pl-6">
            Reason: {failedReason}
          </p>
        </div>

        {/* Current Status Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-2.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            CURRENT STATUS
          </span>

          <div className="space-y-2 font-bold text-xs">
            <div className="flex items-center gap-2 text-[#0F152A]">
              <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
              <span>AP account ({apName}): Active</span>
            </div>

            <div className="flex items-center gap-2 text-[#0F152A]">
              <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
              <span>SC account (You): Active</span>
            </div>

            <div className="flex items-center gap-2 text-[#D9990D]">
              <AlertTriangle className="size-4 shrink-0 text-[#D9990D]" />
              <span>{network} network: Intermittent</span>
            </div>
          </div>
        </div>

        {/* Notification Preview Box */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            NOTIFICATION TO AP
          </span>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs font-medium text-[#0F152A] leading-relaxed italic">
            {notificationText}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#F59E0B] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600"
          >
            Notify AP to Retry
          </button>
        </div>
      </form>
    </AppModal>
  );
}
