import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import type { DistributeSummaryData } from "./DistributeStockModal";

interface ConfirmDistributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summaryData?: DistributeSummaryData | null;
  apName?: string;
  apDetails?: string;
  posQty?: number;
  cctvQty?: number;
  gpsQty?: number;
  routerQty?: number;
  totalToSend?: number;
  yourStockBefore?: number;
  yourStockAfter?: number;
  apStockBefore?: number;
  apStockAfter?: number;
  note?: string;
  onEdit?: () => void;
  onSuccess?: () => void;
}

export function ConfirmDistributionModal({
  open,
  onOpenChange,
  summaryData,
  apName: apNameProp,
  apDetails: apDetailsProp,
  posQty: posQtyProp,
  cctvQty: cctvQtyProp,
  gpsQty: gpsQtyProp,
  routerQty: routerQtyProp,
  totalToSend: totalToSendProp,
  yourStockBefore: yourStockBeforeProp,
  yourStockAfter: yourStockAfterProp,
  apStockBefore: apStockBeforeProp,
  apStockAfter: apStockAfterProp,
  note: noteProp,
  onEdit,
  onSuccess,
}: ConfirmDistributionModalProps) {
  const [pin, setPin] = useState("");

  const apName = summaryData?.apName || apNameProp || "Francis Udom";
  const apDetails =
    apDetailsProp ||
    (summaryData
      ? `${summaryData.apState} · ${summaryData.apStockBefore} SIMs now`
      : "Lagos · 42 customers · 3 SIMs now");
  const posQty = summaryData ? summaryData.posQty : (posQtyProp ?? 15);
  const cctvQty = summaryData ? summaryData.cctvQty : (cctvQtyProp ?? 5);
  const gpsQty = summaryData ? summaryData.gpsQty : (gpsQtyProp ?? 0);
  const routerQty = summaryData ? summaryData.routerQty : (routerQtyProp ?? 0);
  const totalToSend = summaryData ? summaryData.totalToSend : (totalToSendProp ?? 20);
  const yourStockBefore = summaryData ? summaryData.yourStockBefore : (yourStockBeforeProp ?? 42);
  const yourStockAfter = summaryData ? summaryData.yourStockAfter : (yourStockAfterProp ?? 22);
  const apStockBefore = summaryData ? summaryData.apStockBefore : (apStockBeforeProp ?? 3);
  const apStockAfter = summaryData ? summaryData.apStockAfter : (apStockAfterProp ?? 23);
  const note = summaryData?.note || noteProp || "Emergency stock for Francis";

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length < 4) return;
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Distribution"
      description="Review before sending to AP"
      size="md"
    >
      <form onSubmit={handleConfirm} className="space-y-4 pt-1 text-xs">
        {/* Recipient AP Card */}
        <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#10B981]/20 font-black text-[#10B981]">
              FU
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A] text-sm">
                {apName}
              </h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                {apDetails}
              </p>
            </div>
          </div>
        </div>

        {/* Sending Breakdown Box */}
        <div className="rounded-2xl border-l-4 border-l-[#0F152A] border border-[#E2ECF6] bg-white p-4 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            SENDING
          </span>

          <div className="space-y-1.5 pt-1 text-xs">
            <div className="flex justify-between font-bold text-[#0F152A]">
              <span>POS SIM</span>
              <span className="font-black">{posQty} units</span>
            </div>
            <div className="flex justify-between font-bold text-[#10B981]">
              <span>CCTV SIM</span>
              <span className="font-black">{cctvQty} units</span>
            </div>
            <div className="flex justify-between text-[#8C909B] font-medium">
              <span>GPS SIM</span>
              <span>{gpsQty} units</span>
            </div>
            <div className="flex justify-between text-[#8C909B] font-medium">
              <span>Router SIM</span>
              <span>{routerQty} units</span>
            </div>
          </div>

          <div className="flex justify-between font-black text-sm pt-2 border-t border-[#E2ECF6] text-[#0F152A]">
            <span>Total</span>
            <span>{totalToSend} SIMs</span>
          </div>
        </div>

        {/* Impact Summary Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              YOUR INVENTORY AFTER
            </span>
            <p className="text-[11px] text-[#66738C]">
              POS: 25 → 10<br />
              CCTV: 10 → 5<br />
              GPS: 5 (unchanged)
            </p>
            <p className="text-xs font-black text-[#F59E0B] pt-0.5">
              Total: {yourStockBefore} → {yourStockAfter} SIMs
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              {apName.split(" ")[0].toUpperCase()} AFTER
            </span>
            <p className="text-[11px] text-[#66738C]">
              POS: 3 → 18<br />
              CCTV: 0 → 5<br />
              GPS: 0 (unchanged)
            </p>
            <p className="text-xs font-black text-[#10B981] pt-0.5">
              Total: {apStockBefore} → {apStockAfter} SIMs
            </p>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3 text-xs text-[#D9990D] font-medium flex items-center gap-2">
          <AlertTriangle className="size-4 shrink-0 text-[#D9990D]" />
          <span>Your stock will be moderate. Consider requesting from RM soon.</span>
        </div>

        {/* Note if provided */}
        {note && (
          <p className="text-xs italic text-[#66738C] px-1 font-medium">
            "{note}"
          </p>
        )}

        {/* PIN Authorization Input */}
        <div className="space-y-1.5 text-center pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            ENTER SECURITY PIN
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

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onEdit?.();
            }}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            ← Edit Quantities
          </button>
          <button
            type="submit"
            disabled={pin.length < 4}
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 disabled:opacity-50"
          >
            Distribute {totalToSend} SIMs
          </button>
        </div>
      </form>
    </AppModal>
  );
}
