import { AppModal } from "@/components/common/AppModal";

interface NotificationPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fromScName?: string;
  fromPhone?: string;
  fromState?: string;
  fromStockBefore?: number;
  fromStockAfter?: number;
  toScName?: string;
  toPhone?: string;
  toState?: string;
  toStockBefore?: number;
  toStockAfter?: number;
  quantity?: number;
  simType?: string;
  rmName?: string;
  rmPhone?: string;
  refNo?: string;
}

export function NotificationPreviewModal({
  open,
  onOpenChange,
  fromScName = "Ibrahim Musa",
  fromPhone = "08055093537",
  fromStockBefore = 7,
  fromStockAfter = 0,
  toScName = "Ngozi Adeyemi",
  toPhone = "08164147750",
  toState = "Delta",
  toStockBefore = 0,
  toStockAfter = 7,
  quantity = 7,
  simType = "POS SIM",
  rmName = "Yusuf",
  rmPhone = "08065942373",
  refNo = "REDIST-2026-00847",
}: NotificationPreviewModalProps) {
  const fromFirstName = fromScName.split(" ")[0];
  const toFirstName = toScName.split(" ")[0];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Notification Preview"
      description="Messages to be sent to both SCs"
      size="md"
      showCloseButton={true}
      footer={
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700"
        >
          Close Preview
        </button>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Box 1: Sender Message Preview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-2xs">
          <span className="text-[11px] font-black text-[#0F152A]">
            TO: {fromScName} · {fromPhone}
          </span>
          <div className="rounded-xl bg-[#F8FAFC] p-3.5 text-xs text-[#334155] leading-relaxed border border-slate-100">
            Hi {fromFirstName}, your RM {rmName} has initiated a transfer of{" "}
            {quantity} {simType}s from your stock to {toScName} ({toState}). Your
            stock will reduce from {fromStockBefore} to {fromStockAfter} SIMs.
            Ref: {refNo}. Contact {rmName}: {rmPhone}
          </div>
        </div>

        {/* Box 2: Receiver Message Preview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-2xs">
          <span className="text-[11px] font-black text-[#0F152A]">
            TO: {toScName} · {toPhone}
          </span>
          <div className="rounded-xl bg-[#F8FAFC] p-3.5 text-xs text-[#334155] leading-relaxed border border-slate-100">
            Hi {toFirstName}, your RM {rmName} is sending you {quantity}{" "}
            {simType}s from {fromScName}. Your stock will increase from{" "}
            {toStockBefore} to {toStockAfter} SIMs. Ref: {refNo}. Contact{" "}
            {rmName}: {rmPhone}
          </div>
        </div>

        {/* Note */}
        <p className="text-center text-[11px] text-[#8C909B] pt-1">
          Both SMS messages sent automatically on transfer confirmation
        </p>
      </div>
    </AppModal>
  );
}
