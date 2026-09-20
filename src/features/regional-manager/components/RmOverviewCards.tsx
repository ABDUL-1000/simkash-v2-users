import { Users, UserCheck, Smartphone, Package } from "lucide-react";

export function RmOverviewCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* 1. State Coordinators */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-2">
        <div className="flex size-9 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB]">
          <Users className="size-4.5" />
        </div>
        <div>
          <h4 className="text-2xl font-black text-[#0F152A]">12</h4>
          <p className="text-xs font-bold text-[#0F152A]">State Coordinators</p>
          <p className="text-[10px] text-[#64748B]">All onboarded by you</p>
        </div>
      </div>

      {/* 2. Agency Partners */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-2">
        <div className="flex size-9 items-center justify-center rounded-2xl bg-[#EBFFF8] text-[#10B981]">
          <UserCheck className="size-4.5" />
        </div>
        <div>
          <h4 className="text-2xl font-black text-[#0F152A]">247</h4>
          <p className="text-xs font-bold text-[#0F152A]">Agency Partners</p>
          <p className="text-[10px] text-[#64748B]">Across your SC network</p>
        </div>
      </div>

      {/* 3. Network Activations */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-2">
        <div className="flex size-9 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB]">
          <Smartphone className="size-4.5" />
        </div>
        <div>
          <h4 className="text-2xl font-black text-[#0F152A]">14,847</h4>
          <p className="text-xs font-bold text-[#0F152A]">Network Activations</p>
          <p className="text-[10px] text-[#10B981] font-bold">83.1% AP active</p>
        </div>
      </div>

      {/* 4. Stock in Inventory */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-2">
        <div className="flex size-9 items-center justify-center rounded-2xl bg-[#FFFBEB] text-[#F59E0B]">
          <Package className="size-4.5" />
        </div>
        <div>
          <h4 className="text-2xl font-black text-[#0F152A]">300</h4>
          <p className="text-xs font-bold text-[#0F152A]">Stock in Inventory</p>
          <p className="text-[10px] text-[#64748B]">Ready to distribute</p>
        </div>
      </div>
    </div>
  );
}

export default RmOverviewCards;
