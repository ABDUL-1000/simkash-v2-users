import { useState } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useActivateDeviceSim } from "../api";
import type { ActivateSimResponseData } from "../types/api";
import type { ActivationFormData } from "./QuickActivateSimModal";

interface ConfirmActivationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: ActivationFormData | null;
  onBack?: () => void;
  onConfirmSuccess?: (result: ActivateSimResponseData) => void;
}

const naira = (value: number) => `₦${value.toLocaleString()}`;

export function ConfirmActivationModal({
  open,
  onOpenChange,
  data,
  onBack,
  onConfirmSuccess,
}: ConfirmActivationModalProps) {
  const [pin, setPin] = useState("");
  const activate = useActivateDeviceSim();
  const close = (value: boolean) => { if (activate.isPending) return; if (!value) { setPin(""); activate.reset(); } onOpenChange(value); };

  const handleConfirm = () => {
    if (!data || pin.length !== 4) return;
    activate.mutate({ sim_number: data.simNumber, phone: data.phone, pin, sim_type: data.simType }, {
      onSuccess: response => {
        setPin("");
        onOpenChange(false);
        onConfirmSuccess?.(response.data);
      },
      onError: () => setPin(""),
    });
  };

  return (
    <AppModal
      open={open && Boolean(data)}
      onOpenChange={close}
      title="Confirm Activation"
      size="md"
      showCloseButton={!activate.isPending}
    >
      {data && <div className="space-y-4 pt-1 text-xs">
        {/* Receipt Details Card (Matching Image 3) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2.5 divide-y divide-[#E2ECF6]">
          <div className="flex items-start justify-between gap-4 py-1 first:pt-0">
            <span className="text-[#8C909B] font-medium">SIM Number</span>
            <span className="font-bold text-[#0F152A] font-mono">
              {data.simNumber}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-[#8C909B] font-medium">Customer</span>
            <span className="font-bold text-[#0F152A]">
              {data.customerName}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-[#8C909B] font-medium">Phone Number</span>
            <span className="font-bold text-[#0F152A] font-mono">
              {data.phone}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-[#8C909B] font-medium">Network</span>
            <span className="font-bold text-[#0F152A]">
              {data.network}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 py-1">
            <span className="text-[#8C909B] font-medium">SIM Type</span>
            <span className="font-bold text-[#0F152A]">
              {data.simTypeLabel}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 pt-2 text-sm">
            <span className="text-[#66738C] font-semibold">Total Cost</span>
            <span className="font-black text-[#0F152A]">
              {naira(data.price)}
            </span>
          </div>
        </div>

        {/* Wallet Deduction Info Box (Matching Image 3) — the customer's wallet pays */}
        <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-xs text-[#66738C] font-semibold flex items-center gap-2">
          <Info className="size-4 shrink-0 text-[#2563EB]" />
          <span>
            {naira(data.price)} will be deducted from the customer's wallet (Balance: {naira(data.customerWalletBalance)}) · You earn {naira(data.commission)}
          </span>
        </div>

        {/* Customer authorises the debit with their transaction PIN */}
        {data.customerHasPin ? (
          <div className="space-y-2 text-center">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">CUSTOMER ENTERS THEIR PIN</label>
            <div className="flex justify-center">
              <InputOTP maxLength={4} value={pin} onChange={setPin} disabled={activate.isPending} inputMode="numeric" pattern="^[0-9]*$">
                <InputOTPGroup className="gap-2">{[0, 1, 2, 3].map(index => <InputOTPSlot key={index} index={index} className="size-11 rounded-xl border border-[#E2ECF6]" />)}</InputOTPGroup>
              </InputOTP>
            </div>
            {activate.error && <p className="text-[11px] font-semibold text-[#EF4444]">{activate.error.message}</p>}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#F59E0B]/30 bg-[#FEF3C7]/60 p-3 flex items-start gap-2 text-[11px] font-medium text-[#B45309]">
            <AlertTriangle className="size-4 shrink-0" /> This customer hasn't set a transaction PIN yet. Ask them to set one in their Simkash app first.
          </div>
        )}

        {/* Action Buttons (Matching Image 3) */}
        <div className="pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={activate.isPending}
              onClick={() => {
                close(false);
                onBack?.();
              }}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition disabled:opacity-50"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={activate.isPending || pin.length !== 4 || !data.customerHasPin}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
            >
              {activate.isPending ? "Activating..." : "Confirm & Activate"}
            </button>
          </div>
        </div>
      </div>}
    </AppModal>
  );
}
