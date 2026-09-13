import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RemoveCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
  customerPhone?: string;
  simCount?: number;
  addedDate?: string;
  onConfirmRemove?: () => void;
}

export function RemoveCustomerModal({
  open,
  onOpenChange,
  customerName = "Chidi Eze",
  customerPhone = "08120600542",
  simCount = 1,
  addedDate = "1 Jun 2026",
  onConfirmRemove,
}: RemoveCustomerModalProps) {
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      setIsRemoving(false);
      setIsSuccess(true);
      onConfirmRemove?.();
    }, 700);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setConfirmed(false);
    setReason("");
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSuccess ? "Customer Removed" : "Remove Customer"}
      description={
        isSuccess
          ? "Customer was removed from your tracking list"
          : "This removes them from your list"
      }
      size="md"
      showCloseButton={true}
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0F152A]">Customer Removed</h3>
            <p className="mt-1 text-xs text-[#66738C]">
              {customerName} has been removed from your customer tracking list. Their SIM remains active in the network.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white transition hover:bg-[#1D4ED8]"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-1 text-xs">
          {/* Warning Banner */}
          <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-3.5 flex items-start gap-3 text-[#991B1B]">
            <AlertTriangle className="size-5 text-[#EF4444] shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-[#7F1D1D]">
              Removing <span className="font-bold">{customerName}</span> from your customer list does not deactivate their SIM. Their SIM remains active. This only removes them from your personal customer tracking list.
            </p>
          </div>

          {/* Customer Summary Box */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F1F5F9] p-3.5 space-y-0.5">
            <h4 className="font-bold text-xs text-[#0F152A]">
              {customerName} · {customerPhone}
            </h4>
            <p className="text-[11px] text-[#64748B]">
              {simCount} active SIM · Added {addedDate}
            </p>
          </div>

          {/* Reason Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              Reason (Optional)
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
            >
              <option value="">Select a reason...</option>
              <option value="relocated">Customer relocated</option>
              <option value="transferred">Transferred to another agent</option>
              <option value="stopped">Customer no longer uses SIM</option>
              <option value="duplicate">Duplicate entry</option>
              <option value="other">Other reason</option>
            </select>
          </div>

          {/* Confirmation Checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="size-4 rounded-md border-[#CBD5E1] text-[#EF4444] focus:ring-[#EF4444]"
            />
            <span className="text-xs font-medium text-[#0F152A]">
              I understand this removes the customer from my list only
            </span>
          </label>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] transition hover:bg-[#F1F5F9]"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!confirmed || isRemoving}
              onClick={handleRemove}
              className="inline-flex items-center justify-center rounded-xl bg-[#F87171] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#EF4444] disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: confirmed ? APP_COLORS.reds.red : "#F87171" }}
            >
              {isRemoving ? "Removing..." : "Remove Customer"}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}

export default RemoveCustomerModal;
