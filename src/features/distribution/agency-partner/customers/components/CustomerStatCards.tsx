import { Users, Wifi, Clock, XCircle } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CustomerStatCardsProps {
  totalCustomers?: number;
  activeSims?: number;
  expiringSims?: number;
  expiredSims?: number;
}

export function CustomerStatCards({
  totalCustomers = 247,
  activeSims = 198,
  expiringSims = 23,
  expiredSims = 26,
}: CustomerStatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* 1. Total Customers */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
          <Users className="size-4.5" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#0F152A] tracking-tight">{totalCustomers}</h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Total Customers</p>
          <p className="text-[11px] font-medium text-[#8C909B]">All time</p>
        </div>
      </div>

      {/* 2. Active SIMs */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
          <Wifi className="size-4.5" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#10B981] tracking-tight" style={{ color: APP_COLORS.greens.green }}>
            {activeSims}
          </h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Active SIMs</p>
          <p className="text-[11px] font-medium text-[#8C909B]">Currently running</p>
        </div>
      </div>

      {/* 3. Expiring <= 7 Days */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
          <Clock className="size-4.5" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#F59E0B] tracking-tight" style={{ color: APP_COLORS.ambers.amber }}>
            {expiringSims}
          </h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Expiring ≤7 Days</p>
          <p className="text-[11px] font-medium text-[#8C909B]">Need renewal reminder</p>
        </div>
      </div>

      {/* 4. Expired SIMs */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFF1F2] text-[#EF4444]">
          <XCircle className="size-4.5" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-[#EF4444] tracking-tight" style={{ color: APP_COLORS.reds.red }}>
            {expiredSims}
          </h3>
          <p className="mt-0.5 text-xs font-bold text-[#0F152A]">Expired SIMs</p>
          <p className="text-[11px] font-medium text-[#8C909B]">Awaiting renewal</p>
        </div>
      </div>
    </div>
  );
}
