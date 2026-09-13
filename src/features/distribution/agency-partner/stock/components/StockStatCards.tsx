import { Smartphone, Check, AlertTriangle, Clock } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface StockStatCardsProps {
  totalAvailable: number;
  activatedThisMonth: number;
  simTypesLow: number;
  pendingRequestsCount: number;
  onPendingCardClick?: () => void;
}

export function StockStatCards({
  totalAvailable,
  activatedThisMonth,
  simTypesLow,
  pendingRequestsCount,
  onPendingCardClick,
}: StockStatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Total SIMs Available */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
          <Smartphone className="size-4.5" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#0F152A] tracking-tight">{totalAvailable}</h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Total SIMs Available</p>
          <p className="text-[11px] font-medium text-[#8C909B]">Ready to activate</p>
        </div>
      </div>

      {/* 2. Activated This Month */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
          <Check className="size-5 stroke-[2.5]" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#10B981] tracking-tight" style={{ color: APP_COLORS.greens.green }}>
            {activatedThisMonth}
          </h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Activated This Month</p>
          <p className="text-[11px] font-medium text-[#8C909B]">Stock consumed</p>
        </div>
      </div>

      {/* 3. SIM Types Low */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
          <AlertTriangle className="size-4.5" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#F59E0B] tracking-tight" style={{ color: APP_COLORS.ambers.amber }}>
            {simTypesLow}
          </h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">SIM Types Low</p>
          <p className="text-[11px] font-medium text-[#8C909B]">POS · Router below 5</p>
        </div>
      </div>

      {/* 4. Pending Stock Request */}
      <div
        onClick={onPendingCardClick}
        className={`rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs transition ${
          onPendingCardClick ? "cursor-pointer hover:border-[#7C3AED]/40 hover:shadow-sm" : ""
        }`}
      >
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#F1EAFE] text-[#7C3AED]">
          <Clock className="size-4.5" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#7C3AED] tracking-tight">{pendingRequestsCount}</h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Pending Stock Request</p>
          <p className="text-[11px] font-medium text-[#8C909B]">Awaiting SC approval</p>
        </div>
      </div>
    </div>
  );
}
