import { ArrowDownLeft, Check, ArrowUpRight, Package } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface HistoryStatCardsProps {
  totalReceived?: number;
  totalUsed?: number;
  transferredOut?: number;
  remaining?: number;
}

export function HistoryStatCards({
  totalReceived = 310,
  totalUsed = 268,
  transferredOut = 0,
  remaining = 42,
}: HistoryStatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Total Received */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
          <ArrowDownLeft className="size-4.5" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#2563EB] tracking-tight">{totalReceived}</h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Total Received</p>
          <p className="text-[11px] font-medium text-[#8C909B]">SIMs received all time</p>
        </div>
      </div>

      {/* 2. Total Used */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
          <Check className="size-5 stroke-[2.5]" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#10B981] tracking-tight" style={{ color: APP_COLORS.greens.green }}>
            {totalUsed}
          </h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Total Used</p>
          <p className="text-[11px] font-medium text-[#8C909B]">Activated by you</p>
        </div>
      </div>

      {/* 3. Transferred Out */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
          <ArrowUpRight className="size-4.5" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#0F152A] tracking-tight">{transferredOut}</h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Transferred Out</p>
          <p className="text-[11px] font-medium text-[#8C909B]">Sent to other APs</p>
        </div>
      </div>

      {/* 4. Remaining */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
          <Package className="size-4.5" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#2563EB] tracking-tight">{remaining}</h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Remaining</p>
          <p className="text-[11px] font-medium text-[#8C909B]">Currently in stock</p>
        </div>
      </div>
    </div>
  );
}
