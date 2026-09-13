import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ConfirmDistributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName: string;
  state: string;
  allocations: {
    pos: number;
    cctv: number;
    gps: number;
    router: number;
  };
  totalQty: number;
  onEditQuantities?: () => void;
  onConfirm: () => void;
}

export function ConfirmDistributionModal({
  open,
  onOpenChange,
  scName,
  state,
  allocations,
  totalQty,
  onEditQuantities,
  onConfirm,
}: ConfirmDistributionModalProps) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    // Auto focus next
    if (val && index < 3) {
      const nextInput = document.getElementById(`dist-pin-${index + 1}`);
      nextInput?.focus();
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

  const initials = scName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Distribution"
      description="Review before sending to SC"
      size="md"
      showCloseButton={true}
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onEditQuantities?.();
            }}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 transition"
          >
            Edit Quantities
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-[#10B981] py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : `Distribute ${totalQty} SIMs`}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Recipient Header Card */}
        <div className="flex items-center justify-between rounded-2xl bg-[#EBFFF8] p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#D1FAE5] font-bold text-[#065F46] text-xs">
              {initials}
            </div>
            <div>
              <h4 className="font-bold text-[#0F152A] text-sm">{scName}</h4>
              <p className="text-[11px] text-[#64748B]">
                {state} • 23 Agency Partners • 42 SIMs now
              </p>
            </div>
          </div>
          <div className="size-5 rounded-md bg-blue-600 flex items-center justify-center text-white text-[10px]">
            ■
          </div>
        </div>

        {/* SENDING Section with Blue Accent Line */}
        <div className="border-l-4 border-blue-600 pl-3 py-1 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            SENDING
          </span>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[#0F152A] font-medium">POS SIM</span>
              <span className="font-bold text-[#2563EB]">
                {allocations.pos} units
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#0F152A] font-medium">CCTV SIM</span>
              <span className="font-bold text-[#10B981]">
                {allocations.cctv} units
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">GPS SIM</span>
              <span className="font-medium text-[#64748B]">
                {allocations.gps} units
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Router SIM</span>
              <span className="font-medium text-[#64748B]">
                {allocations.router} units
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-1.5 flex justify-between items-center text-sm font-black text-[#0F152A]">
            <span>Total</span>
            <span className="text-base">{totalQty} SIMs</span>
          </div>
        </div>

        {/* Stock Comparison Grid */}
        <div className="grid grid-cols-1 gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2 text-xs">
          {/* Your Inventory After */}
          <div className="space-y-1.5 border-b sm:border-b-0 sm:border-r border-slate-200 pb-3 sm:pb-0 sm:pr-3">
            <h5 className="text-[10px] font-black uppercase text-[#8C909B]">
              YOUR INVENTORY AFTER
            </h5>
            <div className="space-y-1 text-[11px] text-[#64748B]">
              <div className="flex justify-between">
                <span>POS:</span>
                <span>180 → {180 - allocations.pos}</span>
              </div>
              <div className="flex justify-between">
                <span>CCTV:</span>
                <span>72 → {72 - allocations.cctv}</span>
              </div>
              <div className="flex justify-between">
                <span>GPS:</span>
                <span>36 (unchanged)</span>
              </div>
              <div className="flex justify-between">
                <span>Router:</span>
                <span>12 (unchanged)</span>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-1 font-black text-[#0F152A] flex justify-between">
              <span>Total:</span>
              <span>300 → {300 - totalQty} SIMs</span>
            </div>
          </div>

          {/* SC Stock After */}
          <div className="space-y-1.5 sm:pl-1">
            <h5 className="text-[10px] font-black uppercase text-[#10B981]">
              {scName.split(" ")[0].toUpperCase()}'S STOCK AFTER
            </h5>
            <div className="space-y-1 text-[11px] text-[#10B981]">
              <div className="flex justify-between">
                <span>POS:</span>
                <span>42 → {42 + allocations.pos}</span>
              </div>
              <div className="flex justify-between">
                <span>CCTV:</span>
                <span>10 → {10 + allocations.cctv}</span>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>GPS:</span>
                <span>5 (unchanged)</span>
              </div>
              <div className="flex justify-between text-[#64748B]">
                <span>Router:</span>
                <span>2 (unchanged)</span>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-1 font-black text-[#10B981] flex justify-between">
              <span>Total:</span>
              <span>42 → {42 + totalQty} SIMs</span>
            </div>
          </div>
        </div>

        {/* Health Confirmation Banner */}
        <div className="flex items-center gap-2 rounded-2xl bg-[#EBFFF8] p-3 text-xs text-[#065F46]">
          <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
          <span className="font-semibold">
            Your inventory remains healthy after this distribution
          </span>
        </div>

        {/* Enter PIN to Confirm */}
        <div className="text-center space-y-2 pt-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            ENTER PIN TO CONFIRM
          </span>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                id={`dist-pin-${idx}`}
                type="password"
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
