import { useState } from "react";
import { ArrowLeft, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ConfirmStockRecallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName: string;
  scState: string;
  scCurrentStock: number;
  rmCurrentStock: number;
  simType: string;
  quantity: number;
  onConfirm: () => void;
  onEdit?: () => void;
}

export function ConfirmStockRecallModal({
  open,
  onOpenChange,
  scName,
  scState,
  scCurrentStock,
  rmCurrentStock,
  simType,
  quantity,
  onConfirm,
  onEdit,
}: ConfirmStockRecallModalProps) {
  const [pin, setPin] = useState(["•", "•", "•", "•"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    if (val && index < 3) {
      document.getElementById(`stock-recall-pin-${index + 1}`)?.focus();
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

  const scAfter = Math.max(0, scCurrentStock - quantity);
  const rmAfter = rmCurrentStock + quantity;
  const firstName = scName.split(" ")[0];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Stock Recall"
      description="Bring stock back to your inventory"
      size="md"
      showCloseButton={true}
      footer={
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onEdit?.();
            }}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 transition"
          >
            ← Edit
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-[#10B981] py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Confirm Recall"}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Recall Summary Card */}
        <div className="rounded-3xl border border-slate-200 bg-[#FAFCFF] p-4 space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            RECALL SUMMARY
          </span>

          <div className="flex items-center justify-between gap-3">
            {/* FROM SC */}
            <div className="flex-1 rounded-2xl bg-white p-3 border border-slate-200">
              <span className="text-[10px] font-bold text-[#64748B] uppercase block">
                FROM SC
              </span>
              <h5 className="font-bold text-xs text-[#0F152A]">{scName}</h5>
              <p className="text-[11px] text-[#64748B]">
                {scState} · {scCurrentStock} SIMs
              </p>
            </div>

            <ArrowLeft className="size-5 shrink-0 text-[#10B981]" />

            {/* TO YOUR INVENTORY */}
            <div className="flex-1 rounded-2xl bg-[#EBFFF8] p-3 border border-emerald-200">
              <span className="text-[10px] font-bold text-[#10B981] uppercase block">
                TO YOUR INVENTORY
              </span>
              <h5 className="font-bold text-xs text-[#0F152A]">Your stock</h5>
              <p className="text-[11px] font-bold text-[#10B981]">
                {rmCurrentStock} → {rmAfter} SIMs
              </p>
            </div>
          </div>

          {/* SIM Item Breakdown */}
          <div className="border-t border-slate-100 pt-2 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="font-medium text-[#0F152A]">{simType}</span>
              <span className="font-bold text-[#0F152A]">{quantity} units</span>
            </div>
            <div className="border-t border-slate-200 pt-1.5 flex justify-between font-black text-sm text-[#0F152A]">
              <span>Total</span>
              <span>{quantity} SIMs</span>
            </div>
          </div>
        </div>

        {/* Voluntary Badge */}
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#E6FAF2] text-[#059669]">
            Voluntary
          </span>
        </div>

        {/* Before / After comparisons */}
        <div className="flex flex-col gap-1.5 text-xs sm:flex-row sm:items-center sm:justify-between px-1">
          <div className="flex items-center gap-1.5 font-bold text-[#EF4444]">
            <AlertTriangle className="size-3.5" />
            <span>
              {firstName}: {scCurrentStock} → {scAfter} SIMs
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#10B981]">
            <CheckCircle className="size-3.5" />
            <span>
              Your stock: {rmCurrentStock} → {rmAfter} SIMs
            </span>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="flex items-start gap-2 rounded-2xl bg-[#FEFCE8] p-3 text-[11px] text-[#92400E] border border-amber-200">
          <AlertTriangle className="size-4 shrink-0 text-[#D97706] mt-0.5" />
          <p className="leading-snug">
            {scName} will have {scAfter} SIMs after recall. Their 4 APs cannot
            activate until they receive new stock.
          </p>
        </div>

        {/* Info Callout */}
        <div className="flex items-start gap-2 rounded-2xl bg-[#EFF6FF] p-3 text-[11px] text-[#1E40AF] border border-blue-100">
          <Info className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
          <p className="leading-snug">
            {scName} will receive an SMS asking them to confirm this recall.
            Stock moves when they confirm.
          </p>
        </div>

        {/* PIN Input */}
        <div className="text-center space-y-2 pt-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            ENTER PIN TO CONFIRM
          </span>
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                id={`stock-recall-pin-${idx}`}
                type="text"
                maxLength={1}
                value={pin[idx]}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className="size-11 rounded-xl border border-slate-300 bg-white text-center text-lg font-black text-[#0F152A] outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition shadow-2xs"
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
