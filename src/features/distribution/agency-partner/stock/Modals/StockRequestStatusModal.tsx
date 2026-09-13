import { Check, Hourglass } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { PendingStockRequestInfo } from "../types/stock.types";
import { APP_COLORS } from "@/constants/colors";

interface StockRequestStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: PendingStockRequestInfo;
  onOpenCancelModal: () => void;
}

export function StockRequestStatusModal({
  open,
  onOpenChange,
  request,
  onOpenCancelModal,
}: StockRequestStatusModalProps) {
  const handleCancelClick = () => {
    onOpenChange(false);
    onOpenCancelModal();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Stock Request Status"
      description={request.requestRef}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Status Card */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 text-[#854D0E]">
          <div className="flex size-9 items-center justify-center rounded-xl bg-white shadow-xs">
            <Hourglass className="size-4.5 text-[#F59E0B]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0F152A]">{request.status}</h4>
            <p className="text-[11px] font-medium text-[#66738C]">{request.submittedTime}</p>
          </div>
        </div>

        {/* Details List */}
        <div className="divide-y divide-[#F1F5F9] text-xs">
          <div className="flex items-center justify-between py-2 first:pt-0">
            <span className="text-[#8C909B]">Ref</span>
            <span className="font-mono font-bold text-[#0F152A]">{request.requestRef}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Submitted</span>
            <span className="font-bold text-[#0F152A]">24 Jun 2026 · 10:30 AM</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">SC</span>
            <span className="font-bold text-[#0F152A]">{request.scName}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">POS SIM</span>
            <span className="font-bold text-[#0F152A]">{request.posQty} units</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">CCTV SIM</span>
            <span className="font-bold text-[#0F152A]">{request.cctvQty} units</span>
          </div>

          {request.gpsQty !== undefined && request.gpsQty > 0 && (
            <div className="flex items-center justify-between py-2">
              <span className="text-[#8C909B]">GPS SIM</span>
              <span className="font-bold text-[#0F152A]">{request.gpsQty} units</span>
            </div>
          )}

          {request.routerQty !== undefined && request.routerQty > 0 && (
            <div className="flex items-center justify-between py-2">
              <span className="text-[#8C909B]">Router SIM</span>
              <span className="font-bold text-[#0F152A]">{request.routerQty} units</span>
            </div>
          )}

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B] font-medium">Total</span>
            <span className="font-black text-[#0F152A] text-sm">{request.totalRequested} SIMs</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Urgency</span>
            <span className="rounded-md bg-[#EFF6FF] px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
              {request.urgency}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Status</span>
            <span className="rounded-md bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-bold text-[#D97706]">
              Pending SC Approval
            </span>
          </div>
        </div>

        {/* REQUEST TIMELINE */}
        <div className="pt-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B] block mb-3">
            Request Timeline
          </span>

          <div className="space-y-4 relative pl-6 text-xs before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2ECF6]">
            {/* Step 1: Request submitted (Completed) */}
            <div className="relative">
              <div className="absolute -left-6 top-0 flex size-5 items-center justify-center rounded-full bg-[#10B981] text-white">
                <Check className="size-3 stroke-[3]" />
              </div>
              <h5 className="font-bold text-[#10B981]">Request submitted</h5>
              <p className="text-[11px] text-[#66738C]">24 Jun · 10:30 AM</p>
            </div>

            {/* Step 2: SC reviewing (Current) */}
            <div className="relative">
              <div className="absolute -left-6 top-0 flex size-5 items-center justify-center rounded-full border-2 border-[#F59E0B] bg-white text-[#F59E0B]">
                <div className="size-2 rounded-full bg-[#F59E0B]" />
              </div>
              <h5 className="font-bold text-[#D97706]">SC reviewing</h5>
              <p className="text-[11px] text-[#66738C]">Aminat Okafor notified</p>
            </div>

            {/* Step 3: SC dispatches stock (Upcoming) */}
            <div className="relative">
              <div className="absolute -left-6 top-0 flex size-5 items-center justify-center rounded-full border-2 border-[#CBD5E1] bg-white" />
              <h5 className="font-medium text-[#64748B]">SC dispatches stock</h5>
              <p className="text-[11px] text-[#94A3B8]">Stock sent to you</p>
            </div>

            {/* Step 4: Stock received (Upcoming) */}
            <div className="relative">
              <div className="absolute -left-6 top-0 flex size-5 items-center justify-center rounded-full border-2 border-[#CBD5E1] bg-white" />
              <h5 className="font-medium text-[#64748B]">Stock received</h5>
              <p className="text-[11px] text-[#94A3B8]">Your inventory updates</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={handleCancelClick}
            className="text-xs font-bold text-[#EF4444] hover:underline"
          >
            Cancel Request
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#059669]"
            style={{ backgroundColor: APP_COLORS.greens.green }}
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
