import { ArrowRight } from "lucide-react";

export function PartnerSimStockCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">SIM Stock</h3>
        <button type="button" className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline">
          <span>View in SIM Hub</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">In Stock</span>
          <strong className="font-bold text-[#0F172A]">234 SIMs</strong>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Assigned</span>
          <strong className="font-bold text-[#0F172A]">0</strong>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Activated</span>
          <strong className="font-bold text-[#0F172A]">847 SIMs</strong>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#64748B]">Expiring ≤30d</span>
          <strong className="font-bold text-[#D97706]">23 SIMs</strong>
        </div>
      </div>
    </div>
  );
}
