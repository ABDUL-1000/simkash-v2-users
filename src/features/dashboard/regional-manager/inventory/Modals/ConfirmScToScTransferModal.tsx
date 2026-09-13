import { useState } from "react";
import { ArrowRight, Bell, AlertTriangle, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ConfirmScToScTransferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fromScName: string;
  fromState: string;
  fromCurrentStock: number;
  toScName: string;
  toState: string;
  toCurrentStock: number;
  simType: string;
  quantity: number;
  reason: string;
  onConfirm: () => void;
  onEdit?: () => void;
  onPreviewNotifications?: () => void;
}

export function ConfirmScToScTransferModal({
  open,
  onOpenChange,
  fromScName,
  fromState,
  fromCurrentStock,
  toScName,
  toState,
  toCurrentStock,
  simType,
  quantity,
  reason,
  onConfirm,
  onEdit,
  onPreviewNotifications,
}: ConfirmScToScTransferModalProps) {
  const [pin, setPin] = useState(["3", "9", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    if (val && index < 3) {
      document.getElementById(`sc-transfer-pin-${index + 1}`)?.focus();
    }
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onConfirm();
    }, 600);
  };

  const fromAfter = Math.max(0, fromCurrentStock - quantity);
  const toAfter = toCurrentStock + quantity;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm SC to SC Transfer"
      description="Review all details before proceeding"
      size="md"
      showCloseButton={true}
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onEdit?.();
            }}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 transition"
          >
            ← Edit Transfer
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Confirm Transfer"}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Transfer Summary Box */}
        <div className="rounded-3xl border-2 border-blue-100 bg-[#FAFCFF] p-4 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            TRANSFER SUMMARY
          </span>

          {/* From & To Cards */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 rounded-2xl bg-[#FFF7F8] p-3 border border-red-100">
              <span className="text-[10px] font-bold text-[#EF4444] uppercase block">
                FROM
              </span>
              <h5 className="font-bold text-xs text-[#0F152A]">{fromScName}</h5>
              <p className="text-[11px] text-[#64748B]">
                {fromState} · {fromCurrentStock} SIMs
              </p>
            </div>

            <ArrowRight className="size-5 shrink-0 text-[#2563EB]" />

            <div className="flex-1 rounded-2xl bg-[#EBFFF8] p-3 border border-emerald-100">
              <span className="text-[10px] font-bold text-[#10B981] uppercase block">
                TO
              </span>
              <h5 className="font-bold text-xs text-[#0F152A]">{toScName}</h5>
              <p className="text-[11px] text-[#64748B]">
                {toState} · Was {toCurrentStock} SIMs
              </p>
            </div>
          </div>

          {/* SIM Item Breakdown */}
          <div className="border-t border-slate-100 pt-2 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="font-medium text-[#0F152A]">{simType}</span>
              <span className="font-black text-blue-600">{quantity} units</span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>CCTV SIM</span>
              <span>0 units</span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>GPS SIM</span>
              <span>0 units</span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Router SIM</span>
              <span>0 units</span>
            </div>
            <div className="border-t border-slate-200 pt-1.5 flex justify-between font-black text-sm text-[#0F152A]">
              <span>Total</span>
              <span>{quantity} SIMs</span>
            </div>
          </div>
        </div>

        {/* After Transfer Comparison Grid */}
        <div className="grid grid-cols-1 gap-3 rounded-2xl bg-slate-50 p-3.5 sm:grid-cols-2 text-xs">
          <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-slate-200 pb-2 sm:pb-0 sm:pr-3">
            <span className="text-[10px] font-black uppercase text-[#8C909B]">
              AFTER TRANSFER
            </span>
            <p className="font-bold text-[#EF4444]">
              ▲ {fromScName.split(" ")[0]}: {fromCurrentStock} → {fromAfter} SIMs
            </p>
            <p className="font-bold text-[#10B981]">
              ✔ {toScName.split(" ")[0]}: {toCurrentStock} → {toAfter} SIMs
            </p>
          </div>

          <div className="space-y-1 sm:pl-1">
            <span className="text-[10px] font-black uppercase text-[#8C909B]">
              NETWORK TOTAL
            </span>
            <p className="font-bold text-[#0F152A]">231 SIMs (unchanged)</p>
            <p className="text-[11px] text-[#64748B]">
              Redistributed within network
            </p>
          </div>
        </div>

        {/* Reason */}
        <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-[#0F152A]">
          <Info className="size-4 shrink-0 text-slate-400" />
          <span>
            <strong>Reason:</strong> {reason}
          </span>
        </div>

        {/* SMS Notification Banner */}
        <button
          type="button"
          onClick={onPreviewNotifications}
          className="flex w-full items-center justify-between gap-2 rounded-xl bg-[#EFF6FF] p-2.5 text-xs text-[#1E40AF] transition hover:bg-blue-100/70 text-left"
        >
          <div className="flex items-center gap-2">
            <Bell className="size-4 shrink-0 text-[#2563EB]" />
            <span>
              {fromScName.split(" ")[0]} and {toScName.split(" ")[0]} will each be
              notified by SMS
            </span>
          </div>
          {onPreviewNotifications && (
            <span className="text-[11px] font-bold text-blue-600 underline shrink-0">
              Preview
            </span>
          )}
        </button>

        {/* Low stock warning */}
        {fromAfter === 0 && (
          <div className="flex items-start gap-2 rounded-2xl bg-[#FEFCE8] p-3 text-[11px] text-[#92400E] border border-amber-200">
            <AlertTriangle className="size-4 shrink-0 text-[#D97706] mt-0.5" />
            <p className="leading-snug">
              {fromScName} will have 0 SIMs after this transfer. They cannot
              activate SIMs until they receive more stock.
            </p>
          </div>
        )}

        {/* ENTER PIN TO CONFIRM TRANSFER */}
        <div className="text-center space-y-2 pt-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            ENTER PIN TO CONFIRM TRANSFER
          </span>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                id={`sc-transfer-pin-${idx}`}
                type="text"
                maxLength={1}
                value={pin[idx]}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className="size-11 rounded-xl border border-slate-300 bg-white text-center text-lg font-black text-[#0F152A] outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition shadow-2xs"
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
