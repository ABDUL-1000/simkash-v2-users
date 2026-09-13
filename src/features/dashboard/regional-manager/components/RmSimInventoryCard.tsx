import { Package } from "lucide-react";
import type { RmInventoryStats } from "../types/regional-manager.types";

interface RmSimInventoryCardProps {
  inventory: RmInventoryStats;
  onDistributeStock: () => void;
  onViewInventory?: () => void;
}

export function RmSimInventoryCard({
  inventory,
  onDistributeStock,
  onViewInventory,
}: RmSimInventoryCardProps) {
  const posPct = Math.round((inventory.pos / inventory.totalAvailable) * 100);
  const cctvPct = Math.round((inventory.cctv / inventory.totalAvailable) * 100);
  const gpsPct = Math.round((inventory.gps / inventory.totalAvailable) * 100);
  const routerPct = Math.round((inventory.router / inventory.totalAvailable) * 100);

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="size-4 text-[#2563EB]" />
          <h3 className="text-sm font-black text-[#0F152A]">SIM Inventory</h3>
        </div>
        {onViewInventory && (
          <button
            type="button"
            onClick={onViewInventory}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            View All →
          </button>
        )}
      </div>

      <div>
        <h4 className="text-2xl font-black text-[#0F152A]">{inventory.totalAvailable}</h4>
        <p className="text-xs text-[#66738C] font-medium">SIMs available</p>
      </div>

      {/* Breakdown Bars */}
      <div className="space-y-2.5 text-xs">
        {/* POS */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-semibold text-[#0F152A]">POS SIM</span>
            <span className="font-bold text-[#0F152A]">{inventory.pos} <span className="text-[10px] text-[#8C909B] font-normal">{posPct}%</span></span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#1E3A8A]" style={{ width: `${posPct}%` }} />
          </div>
        </div>

        {/* CCTV */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-semibold text-[#0F152A]">CCTV SIM</span>
            <span className="font-bold text-[#0F152A]">{inventory.cctv} <span className="text-[10px] text-[#8C909B] font-normal">{cctvPct}%</span></span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#10B981]" style={{ width: `${cctvPct}%` }} />
          </div>
        </div>

        {/* GPS */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-semibold text-[#0F152A]">GPS SIM</span>
            <span className="font-bold text-[#0F152A]">{inventory.gps} <span className="text-[10px] text-[#8C909B] font-normal">{gpsPct}%</span></span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: `${gpsPct}%` }} />
          </div>
        </div>

        {/* Router */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-semibold text-[#0F152A]">Router SIM</span>
            <span className="font-bold text-[#0F152A]">{inventory.router} <span className="text-[10px] text-[#8C909B] font-normal">{routerPct}%</span></span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#EF4444]" style={{ width: `${routerPct}%` }} />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#F8FAFC] p-2.5 text-[11px] text-[#64748B] border border-[#E2ECF6]">
        Estimated to last {inventory.estimatedDays} days · 60 SIMs across 5 SCs
      </div>

      <button
        type="button"
        onClick={onDistributeStock}
        className="w-full rounded-xl border border-[#10B981] bg-white py-2.5 text-xs font-bold text-[#10B981] hover:bg-[#EBFFF8] transition"
      >
        Distribute Stock
      </button>
    </div>
  );
}

export default RmSimInventoryCard;
