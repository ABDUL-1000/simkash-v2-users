import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface CancelStockRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestRef: string;
  totalRequested: number;
  onConfirmCancel: (reason: string) => void;
}

export function CancelStockRequestModal({
  open,
  onOpenChange,
  requestRef,
  totalRequested,
  onConfirmCancel,
}: CancelStockRequestModalProps) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState(false);

  const handleCancel = () => {
    if (!reason) {
      setError(true);
      return;
    }
    setError(false);
    onOpenChange(false);
    onConfirmCancel(reason);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Cancel Stock Request"
      description={requestRef}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Warning Notice Box with Left Orange Accent */}
        <div className="relative rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-[#854D0E] pl-5 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D97706]" />
          <p className="font-medium text-xs leading-relaxed">
            Cancelling this request will notify your State Coordinator. You can submit a new request at any time.
          </p>
        </div>

        {/* Request Info Card */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 space-y-1">
          <h4 className="font-bold text-xs text-[#1E40AF]">
            {requestRef} · {totalRequested} SIMs total
          </h4>
          <p className="text-[11px] font-medium text-[#60A5FA]">Pending SC approval</p>
        </div>

        {/* Reason for Cancellation Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F152A]">
            Reason for cancellation <span className="text-[#EF4444]">*</span>
          </label>
          <div className="relative">
            <select
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (e.target.value) setError(false);
              }}
              className="w-full appearance-none rounded-xl border border-[#CBD5E1] bg-white p-3 pr-10 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
            >
              <option value="">Select a reason...</option>
              <option value="Needs have changed">Needs have changed</option>
              <option value="Ordered wrong quantities">Ordered wrong quantities</option>
              <option value="Duplicate request submitted">Duplicate request submitted</option>
              <option value="Stock received from another AP">Stock received from another AP</option>
              <option value="SC advised to cancel">SC advised to cancel</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8C909B]" />
          </div>
          {error && (
            <p className="text-[11px] font-medium text-[#EF4444]">
              Please select a cancellation reason.
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-bold text-[#475569] hover:text-[#0F152A]"
          >
            Keep Request
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="rounded-xl bg-[#EF4444] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#DC2626]"
            style={{ backgroundColor: APP_COLORS.reds.red }}
          >
            Cancel Request
          </button>
        </div>
      </div>
    </AppModal>
  );
}
