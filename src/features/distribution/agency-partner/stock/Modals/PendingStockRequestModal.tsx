import { Clock, Phone, AlertCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { PendingStockRequestInfo } from "../types/stock.types";
import { APP_COLORS } from "@/constants/colors";

interface PendingStockRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: PendingStockRequestInfo;
  onCancelRequest?: (ref: string) => void;
}

export function PendingStockRequestModal({
  open,
  onOpenChange,
  request,
  onCancelRequest,
}: PendingStockRequestModalProps) {
  const handleCancel = () => {
    onCancelRequest?.(request.requestRef);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Pending Stock Request"
      description={`Request ${request.requestRef}`}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Status Card */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#F59E0B]/30 bg-[#FFFBEB] p-4 text-[#854D0E]">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-xs">
            <Clock className="size-5 text-[#F59E0B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#0F152A]">{request.totalRequested} SIMs Requested</h4>
              <span className="rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[10px] font-bold text-[#D97706]">
                {request.status}
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#66738C]">{request.submittedTime}</p>
          </div>
        </div>

        {/* Breakdown of requested SIMs */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2.5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">Requested Breakdown</p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#0F152A]">POS SIM</span>
              <span className="font-bold text-[#0F152A]">{request.posQty} units</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#0F152A]">CCTV SIM</span>
              <span className="font-bold text-[#0F152A]">{request.cctvQty} units</span>
            </div>
            {request.gpsQty ? (
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#0F152A]">GPS SIM</span>
                <span className="font-bold text-[#0F152A]">{request.gpsQty} units</span>
              </div>
            ) : null}
            {request.routerQty ? (
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#0F152A]">Router SIM</span>
                <span className="font-bold text-[#0F152A]">{request.routerQty} units</span>
              </div>
            ) : null}
            <div className="flex items-center justify-between pt-2 border-t border-[#E2ECF6]">
              <span className="font-bold text-[#0F152A]">Total Requested</span>
              <span className="font-black text-sm text-[#10B981]">{request.totalRequested} SIMs</span>
            </div>
          </div>
        </div>

        {/* State Coordinator Info */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-[#EFF6FF] font-bold text-xs text-[#2563EB]">
              AO
            </div>
            <div>
              <p className="font-bold text-xs text-[#0F152A]">{request.scName}</p>
              <p className="text-[11px] text-[#8C909B]">State Coordinator</p>
            </div>
          </div>
          <a
            href={`tel:${request.scPhone}`}
            className="flex items-center gap-1.5 rounded-lg border border-[#E2ECF6] px-3 py-1.5 text-xs font-semibold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            <Phone className="size-3.5 text-[#2563EB]" />
            <span>{request.scPhone}</span>
          </a>
        </div>

        {/* Urgency & Routing Note */}
        <div className="flex items-start gap-2 rounded-xl bg-[#EFF6FF] p-3 text-[11px] text-[#1E40AF]">
          <AlertCircle className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
          <span>
            Urgency: <strong>{request.urgency}</strong>. SC Aminat Okafor has been notified. Once approved, she will distribute the batch to you directly.
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-xl border border-[#EF4444]/30 bg-white px-4 py-2.5 text-xs font-bold text-[#EF4444] transition hover:bg-[#FFF7F8]"
          >
            Cancel Request
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl bg-[#10B981] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#059669]"
            style={{ backgroundColor: APP_COLORS.greens.green }}
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
