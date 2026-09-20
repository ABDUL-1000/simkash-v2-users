import { AlertCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface CaNotifyApRetryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simNumber?: string;
  simType?: string;
  network?: string;
  apName?: string;
  failedTime?: string;
  failedReason?: string;
  caName?: string;
  onSuccess?: () => void;
}

export function CaNotifyApRetryModal({
  open,
  onOpenChange,
  simNumber = "07055093537",
  simType = "GPS SIM",
  network = "MTN",
  apName = "Francis Udom",
  failedTime = "Today · 45 min ago",
  failedReason = "MTN SIM not found",
  caName = "Aminat (CA)",
  onSuccess,
}: CaNotifyApRetryModalProps) {
  const firstName = apName.split(" ")[0];
  const notificationText = `"Hi ${firstName}, please retry activation of SIM ${simNumber} (${simType.split(" ")[0]}/${network}). Previous attempt failed. — ${caName}"`;

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
        {/* Failed Attempt Banner */}
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

        {/* AP Details */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            RECIPIENT
          </span>
          <p className="font-extrabold text-[#0F152A] text-xs">{apName}</p>
          <p className="text-[11px] text-[#66738C]">Agency Partner in your network</p>
        </div>

        {/* Message preview */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            MESSAGE PREVIEW
          </span>
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3 font-medium text-xs text-[#0F152A] italic">
            {notificationText}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC] cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#2563EB] px-5 py-2 text-xs font-bold text-white hover:bg-[#1D4ED8] cursor-pointer"
          >
            Send Notification
          </button>
        </div>
      </form>
    </AppModal>
  );
}
