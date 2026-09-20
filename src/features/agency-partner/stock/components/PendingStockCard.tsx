import { ArrowRight } from "lucide-react";
import type { PendingStockRequestInfo } from "../types/stock.types";

interface PendingStockCardProps {
  request: PendingStockRequestInfo | null;
  onViewRequest: () => void;
}

export function PendingStockCard({ request, onViewRequest }: PendingStockCardProps) {
  if (!request) {
    return (
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2">
        <h3 className="text-sm font-bold text-[#0F152A]">Pending Stock Request</h3>
        <p className="text-xs text-[#8C909B]">No pending stock requests at this time.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5">
      <h3 className="text-sm font-bold text-[#0F152A]">Pending Stock Request</h3>

      {/* Yellow bordered inner card */}
      <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFDF5] p-4 space-y-2.5">
        <span className="font-mono text-[11px] text-[#8C909B] font-medium">{request.requestRef}</span>

        <h4 className="text-base font-black text-[#0F152A]">
          {request.totalRequested} SIMs requested
        </h4>

        {/* Small tags */}
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#0F152A] px-2 py-0.5 text-[10px] font-bold text-white">
            POS {request.posQty}
          </span>
          <span className="rounded-md bg-[#0F152A] px-2 py-0.5 text-[10px] font-bold text-white">
            CCTV {request.cctvQty}
          </span>
        </div>

        <p className="text-[11px] font-medium text-[#8C909B]">{request.submittedTime}</p>
      </div>

      {/* Awaiting SC Approval pill */}
      <div>
        <span className="inline-block rounded-full border border-[#F59E0B] bg-[#FFFBEB] px-3 py-1 text-[11px] font-bold text-[#D97706]">
          {request.status}
        </span>
      </div>

      {/* View Request Trigger */}
      <div>
        <button
          type="button"
          onClick={onViewRequest}
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          View Request <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
