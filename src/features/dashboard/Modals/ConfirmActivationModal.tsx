import { useState } from "react";
import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { ActivationFormData } from "./QuickActivateSimModal";

interface ConfirmActivationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: ActivationFormData | null;
  onBack?: () => void;
  onConfirmSuccess?: (data: ActivationFormData) => void;
}

export function ConfirmActivationModal({
  open,
  onOpenChange,
  data = {
    iccid: "8986 0000 1234 5678",
    customerName: "Chidi Eze",
    phone: "08012345678",
    network: "MTN",
    plan: "Standard 30-Day",
    cost: "₦2,000",
  },
  onBack,
  onConfirmSuccess,
}: ConfirmActivationModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    if (!data) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      onConfirmSuccess?.(data);
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Activation"
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Receipt Details Card (Matching Image 3) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2.5 divide-y divide-[#E2ECF6]">
          <div className="flex items-start justify-between gap-4 py-1 first:pt-0">
            <span className="text-[#8C909B] font-medium">SIM Number</span>
            <span className="font-bold text-[#0F152A] font-mono">
              {data?.iccid || "8986 0000 1234 5678"}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-[#8C909B] font-medium">Customer</span>
            <span className="font-bold text-[#0F152A]">
              {data?.customerName || "Chidi Eze"}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-[#8C909B] font-medium">Phone Number</span>
            <span className="font-bold text-[#0F152A] font-mono">
              {data?.phone || "08012345678"}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-[#8C909B] font-medium">Network</span>
            <span className="font-bold text-[#0F152A]">
              {data?.network || "MTN"}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-[#8C909B] font-medium">Plan</span>
            <span className="font-bold text-[#0F152A]">
              {data?.plan || "Standard 30-Day"}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 pt-2 text-sm">
            <span className="text-[#66738C] font-semibold">Total Cost</span>
            <span className="font-black text-[#0F152A]">
              {data?.cost || "₦2,000"}
            </span>
          </div>
        </div>

        {/* Wallet Deduction Info Box (Matching Image 3) */}
        <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-xs text-[#66738C] font-semibold flex items-center gap-2">
          <Info className="size-4 shrink-0 text-[#2563EB]" />
          <span>
            {data?.cost || "₦2,000"} will be deducted from your wallet (Balance: ₦12,500)
          </span>
        </div>

        {/* Action Buttons (Matching Image 3) */}
        <div className="pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onBack?.();
              }}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Activating..." : "Confirm & Activate"}
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
