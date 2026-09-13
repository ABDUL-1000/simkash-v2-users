import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

export interface CancelActivationData {
  simNumber: string;
  simType: string;
  network: string;
  customerName: string;
  submittedTime: string;
}

interface CancelActivationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CancelActivationData | null;
  onConfirmCancel?: (reason: string) => void;
}

export function CancelActivationModal({
  open,
  onOpenChange,
  data,
  onConfirmCancel,
}: CancelActivationModalProps) {
  const [selectedReason, setSelectedReason] = useState("");

  if (!data) return null;

  const reasons = [
    "Customer changed mind",
    "Wrong SIM number entered",
    "Wrong customer details",
    "Network not available",
    "Other",
  ];

  const handleCancelSubmit = () => {
    if (!selectedReason) {
      alert("Please select a reason for cancellation.");
      return;
    }

    onConfirmCancel?.(selectedReason);
    onOpenChange(false);
    setSelectedReason("");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Cancel Activation"
      description={`${data.simNumber} · ${data.simType} · ${data.network}`}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Orange Warning Callout Banner */}
        <div className="rounded-2xl border border-[#F59E0B]/30 bg-[#FEF3C7]/60 p-4 space-y-1">
          <p className="text-xs font-semibold text-[#B45309] leading-relaxed">
            Cancelling this activation will return the SIM to your pending queue and no commission will be earned for this SIM.
          </p>
        </div>

        {/* SIM SUMMARY CARD */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2.5">
          <div className="flex items-center justify-between py-1">
            <span className="text-[#66738C] font-medium">SIM</span>
            <span className="font-mono font-black text-[#0F152A]">
              {data.simNumber}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-[#E2ECF6]">
            <span className="text-[#66738C] font-medium">Customer</span>
            <span className="font-extrabold text-[#0F152A]">
              {data.customerName}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-[#E2ECF6]">
            <span className="text-[#66738C] font-medium">Submitted</span>
            <span className="font-semibold text-[#66738C]">
              {data.submittedTime || "2 min ago"}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-[#E2ECF6]">
            <span className="text-[#66738C] font-medium">Status</span>
            <span className="rounded-md bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-extrabold text-[#D9990D]">
              Pending
            </span>
          </div>
        </div>

        {/* REASON FOR CANCELLATION */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            REASON FOR CANCELLATION <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden"
          >
            <option value="">Select a reason...</option>
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          {/* Bulleted Reason List */}
          <ul className="list-disc list-inside space-y-1 pt-1 text-[11px] text-[#66738C]">
            {reasons.map((r) => (
              <li
                key={r}
                onClick={() => setSelectedReason(r)}
                className={`cursor-pointer hover:text-[#2563EB] ${
                  selectedReason === r ? "font-bold text-[#2563EB]" : ""
                }`}
              >
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* ACTION BUTTONS */}
        <div className="pt-3 border-t border-[#E2ECF6] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Keep Pending
          </button>
          <button
            type="button"
            onClick={handleCancelSubmit}
            className="rounded-xl bg-[#EF4444] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition"
          >
            Cancel Activation
          </button>
        </div>
      </div>
    </AppModal>
  );
}
