import type { SimStockBreakdown } from "../../types/regional-manager.types";

interface ScSimStockCardProps {
  stock: number;
  breakdown: SimStockBreakdown;
  onDistributeMore: () => void;
}

export function ScSimStockCard({ stock, breakdown, onDistributeMore }: ScSimStockCardProps) {
  const posPct = stock > 0 ? Math.round((breakdown.pos / stock) * 100) : 0;
  const cctvPct = stock > 0 ? Math.round((breakdown.cctv / stock) * 100) : 0;
  const gpsPct = stock > 0 ? Math.round((breakdown.gps / stock) * 100) : 0;
  const routerPct = stock > 0 ? Math.round((breakdown.router / stock) * 100) : 0;

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4 text-xs">
      <h3 className="text-sm font-black text-[#0F152A]">SIM Stock</h3>

      <div className="space-y-2.5">
        {/* POS */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-semibold text-[#0F152A]">POS SIM</span>
            <span className="font-bold text-[#0F152A]">{breakdown.pos} <span className="text-[10px] text-[#8C909B] font-normal">{posPct}%</span></span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#1E3A8A]" style={{ width: `${posPct}%` }} />
          </div>
        </div>

        {/* CCTV */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-semibold text-[#0F152A]">CCTV SIM</span>
            <span className="font-bold text-[#0F152A]">{breakdown.cctv} <span className="text-[10px] text-[#8C909B] font-normal">{cctvPct}%</span></span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#10B981]" style={{ width: `${cctvPct}%` }} />
          </div>
        </div>

        {/* GPS */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-semibold text-[#0F152A]">GPS SIM</span>
            <span className="font-bold text-[#0F152A]">{breakdown.gps} <span className="text-[10px] text-[#8C909B] font-normal">{gpsPct}%</span></span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#F59E0B]" style={{ width: `${gpsPct}%` }} />
          </div>
        </div>

        {/* Router */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-semibold text-[#0F152A]">Router SIM</span>
            <span className="font-bold text-[#0F152A]">{breakdown.router} <span className="text-[10px] text-[#8C909B] font-normal">{routerPct}%</span></span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
            <div className="h-full rounded-full bg-[#EF4444]" style={{ width: `${routerPct}%` }} />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E2ECF6] flex justify-between items-center">
        <span className="font-bold text-[#0F152A]">Total</span>
        <span className="font-black text-sm text-[#0F152A]">{stock} SIMs</span>
      </div>

      <div className="rounded-2xl bg-[#F8FAFC] p-3 text-[11px] text-[#64748B] space-y-1 border border-[#E2ECF6]">
        <p>Received from you: <span className="font-bold text-[#0F152A]">300 SIMs</span> (all time)</p>
        <p>Last distribution: <span className="font-medium text-[#0F152A]">50 SIMs · 3 days ago</span></p>
      </div>

      <button
        type="button"
        onClick={onDistributeMore}
        className="w-full rounded-xl border border-[#10B981] bg-white py-2 text-xs font-bold text-[#10B981] hover:bg-[#EBFFF8] transition"
      >
        Distribute More SIMs
      </button>
    </div>
  );
}

export default ScSimStockCard;
