import type { StockDistributionRecord } from "../../types/regional-manager.types";

interface ScStockDistributionsCardProps {
  distributions?: StockDistributionRecord[];
  onViewRecord?: (record: StockDistributionRecord) => void;
  onViewHistory?: () => void;
}

export function ScStockDistributionsCard({
  distributions = [],
  onViewRecord,
  onViewHistory,
}: ScStockDistributionsCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-[#0F152A]">Stock Distributions</h3>
          <p className="text-[10px] text-[#64748B]">(from you to this SC)</p>
        </div>
      </div>

      <div className="space-y-2.5 divide-y divide-[#F1F5F9]">
        {distributions.map((d) => (
          <div key={d.id} className="flex items-center justify-between pt-2 first:pt-0">
            <div>
              <p className="font-bold text-[#0F152A]">{d.date}</p>
              <p className="text-[11px] text-[#64748B]">
                POS {d.pos} · CCTV {d.cctv} {d.gps ? `· GPS ${d.gps}` : ""}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="font-bold text-[#0F152A]">Total {d.total}</span>
              <button
                type="button"
                onClick={() => onViewRecord?.(d)}
                className="font-bold text-[#2563EB] hover:underline"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-[#E2ECF6]">
        <button
          type="button"
          onClick={onViewHistory}
          className="text-xs font-bold text-[#2563EB] hover:underline"
        >
          View full history →
        </button>
      </div>
    </div>
  );
}

export default ScStockDistributionsCard;
