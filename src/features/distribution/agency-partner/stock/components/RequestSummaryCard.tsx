import type { StockRequestQuantities, UrgencyLevel } from "../types/stock.types";

interface RequestSummaryCardProps {
  quantities: StockRequestQuantities;
  urgency: UrgencyLevel;
  scName?: string;
}

export function RequestSummaryCard({
  quantities,
  urgency,
  scName = "Aminat Okafor (SC)",
}: RequestSummaryCardProps) {
  const total = quantities.pos + quantities.cctv + quantities.gps + quantities.router;

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <h3 className="text-sm font-bold text-[#0F152A]">Request Summary</h3>

      <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-3 text-xs">
        <div className="text-[11px] text-[#66738C]">
          <span>TO: </span>
          <strong className="text-[#0F152A]">{scName}</strong>
        </div>

        <div className="space-y-1.5 pt-1 border-t border-[#E2ECF6]">
          <div className="flex justify-between">
            <span className="text-[#66738C]">POS SIM</span>
            <span className="font-bold text-[#0F152A]">{quantities.pos} units</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#66738C]">CCTV SIM</span>
            <span className="font-bold text-[#0F152A]">{quantities.cctv} units</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#66738C]">GPS SIM</span>
            <span className="font-bold text-[#0F152A]">{quantities.gps} units</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#66738C]">Router SIM</span>
            <span className="font-bold text-[#0F152A]">{quantities.router} units</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E2ECF6] space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-[#0F152A]">Total</span>
            <span className="text-sm font-black text-[#10B981]">{total} SIMs</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#66738C]">Urgency</span>
            <span className="font-bold text-[#2563EB]">{urgency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
