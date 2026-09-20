import { ArrowLeft, Clock, Lightbulb } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { StockRequestQuantities, UrgencyLevel } from "../types/stock.types";
import { APP_COLORS } from "@/constants/colors";

interface ConfirmStockRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quantities: StockRequestQuantities;
  urgency: UrgencyLevel;
  scName?: string;
  scPhone?: string;
  scState?: string;
  onConfirm: () => void;
}

export function ConfirmStockRequestModal({
  open,
  onOpenChange,
  quantities,
  urgency,
  scName = "Aminat Okafor (SC)",
  scPhone = "08065942373",
  scState = "Lagos State",
  onConfirm,
}: ConfirmStockRequestModalProps) {
  const total = quantities.pos + quantities.cctv + quantities.gps + quantities.router;

  const handleConfirm = () => {
    onOpenChange(false);
    onConfirm();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Stock Request"
      description="Review before submitting to your SC"
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* REQUESTING FROM: */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Requesting From:
          </span>
          <h4 className="text-xs font-bold text-[#0F152A]">{scName}</h4>
          <p className="text-[11px] text-[#66738C] font-medium">
            {scPhone} · {scState}
          </p>
        </div>

        {/* REQUEST BREAKDOWN with left accent border */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0F152A]" />
          
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B] block mb-2.5 pl-1">
            Request Breakdown
          </span>

          <div className="space-y-2 divide-y divide-[#F1F5F9] pl-1">
            <div className="flex justify-between py-1 first:pt-0">
              <span className="text-[#66738C]">POS SIM</span>
              <span className="font-bold text-[#0F152A]">{quantities.pos} units</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#66738C]">CCTV SIM</span>
              <span className="font-bold text-[#0F152A]">{quantities.cctv} units</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#66738C]">GPS SIM</span>
              <span className="font-bold text-[#0F152A]">{quantities.gps} units</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#66738C]">Router SIM</span>
              <span className="font-bold text-[#0F152A]">{quantities.router} units</span>
            </div>

            <div className="flex justify-between items-center pt-2.5">
              <span className="font-bold text-[#0F152A]">Total</span>
              <span className="text-sm font-black text-[#0F152A]">{total} SIMs</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[#66738C]">Urgency</span>
              <span className="rounded-md bg-[#EFF6FF] px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
                {urgency}
              </span>
            </div>
          </div>
        </div>

        {/* Estimated fulfilment */}
        <div className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] p-2.5 text-[11px] text-[#66738C] font-medium border border-[#E2ECF6]">
          <Clock className="size-3.5 text-[#8C909B]" />
          <span>Estimated fulfilment: 4–8 hours</span>
        </div>

        {/* SMS and push notice */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-[11px] text-[#1E40AF] leading-relaxed">
          <Lightbulb className="size-4 shrink-0 text-[#F59E0B] mt-0.5" />
          <span>
            Once submitted, Aminat Okafor will receive an SMS and push notification about your request.
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] transition hover:bg-[#F1F5F9]"
          >
            <ArrowLeft className="size-3.5" />
            <span>Edit Request</span>
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#059669]"
            style={{ backgroundColor: APP_COLORS.greens.green }}
          >
            Submit to SC
          </button>
        </div>
      </div>
    </AppModal>
  );
}
