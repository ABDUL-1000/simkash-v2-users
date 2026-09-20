import { useState } from "react";
import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import type { TransferSimFormData } from "./TransferSimStockModal";

interface ConfirmTransferSimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: TransferSimFormData | null;
  onBack?: () => void;
  onConfirmSuccess?: (data: TransferSimFormData) => void;
}

export function ConfirmTransferSimModal({
  open,
  onOpenChange,
  data = {
    recipientName: "Rabiu Sani",
    recipientPhone: "08120600542",
    posQty: 10,
    cctvQty: 5,
    gpsQty: 0,
    routerQty: 0,
    totalQty: 15,
    stockAfter: 27,
    scApprover: "Aminat Okafor",
    reason: "Partner running low",
  },
  onBack,
  onConfirmSuccess,
}: ConfirmTransferSimModalProps) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4 || !data) return;
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
      title="Confirm Transfer"
      description="Review before submitting"
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Blue Bordered Review Card (Matching Image 2) */}
        <div className="rounded-2xl border-2 border-[#2563EB] bg-[#F8FAFC] p-4 space-y-2.5 divide-y divide-[#E2ECF6]">
          <div className="flex items-center justify-between py-1 first:pt-0">
            <span className="text-[#8C909B] font-medium">Transfer to:</span>
            <span className="font-extrabold text-[#0F152A]">
              {data?.recipientName} (AP) {data?.recipientPhone}
            </span>
          </div>

          {data?.posQty ? (
            <div className="flex items-center justify-between py-1">
              <span className="text-[#8C909B] font-medium">POS SIM:</span>
              <span className="font-extrabold text-[#0F152A]">{data.posQty} units</span>
            </div>
          ) : null}

          {data?.cctvQty ? (
            <div className="flex items-center justify-between py-1">
              <span className="text-[#8C909B] font-medium">CCTV SIM:</span>
              <span className="font-extrabold text-[#0F152A]">{data.cctvQty} units</span>
            </div>
          ) : null}

          {data?.gpsQty ? (
            <div className="flex items-center justify-between py-1">
              <span className="text-[#8C909B] font-medium">GPS SIM:</span>
              <span className="font-extrabold text-[#0F152A]">{data.gpsQty} units</span>
            </div>
          ) : null}

          {data?.routerQty ? (
            <div className="flex items-center justify-between py-1">
              <span className="text-[#8C909B] font-medium">Router SIM:</span>
              <span className="font-extrabold text-[#0F152A]">{data.routerQty} units</span>
            </div>
          ) : null}

          <div className="flex items-center justify-between py-2 pt-2 text-sm">
            <span className="font-bold text-[#0F152A]">Total:</span>
            <span className="font-black text-[#2563EB]">{data?.totalQty} SIMs</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-[#8C909B] font-medium">Your stock after:</span>
            <span className="font-bold text-[#0F152A]">{data?.stockAfter} SIMs</span>
          </div>

          <div className="flex items-center justify-between py-1 last:pb-0">
            <span className="text-[#8C909B] font-medium">SC Approval:</span>
            <span className="font-extrabold text-[#D9990D]">
              Required ({data?.scApprover})
            </span>
          </div>
        </div>

        {/* SC Approval Info Box (Matching Image 2) */}
        <div className="rounded-2xl border border-[#2563EB]/20 bg-[#EFF4F8] p-3.5 text-xs text-[#66738C] font-semibold flex items-start gap-2.5">
          <Info className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
          <span>
            This transfer needs your State Coordinator approval before {data?.recipientName} receives the stock. {data?.scApprover} will be notified.
          </span>
        </div>

        {/* PIN Authorization Section (Matching Image 2) */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#66738C] text-center block">
            ENTER PIN TO CONFIRM
          </label>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={(v) => setPin(v)}>
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={1} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={2} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={3} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Action Buttons (Matching Image 2) */}
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
              Back
            </button>
            <button
              type="submit"
              disabled={loading || pin.length < 4}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Transfer"}
            </button>
          </div>
        </div>
      </form>
    </AppModal>
  );
}
