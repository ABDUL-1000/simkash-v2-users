import { Lightbulb } from "lucide-react";

export function StockTipCard() {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2">
      <div className="flex items-center gap-2 text-[#F59E0B]">
        <Lightbulb className="size-4" />
        <h4 className="text-xs font-bold text-[#0F152A]">Stock Tip</h4>
      </div>
      <p className="text-xs leading-relaxed text-[#66738C]">
        At your current activation rate of ~8 SIMs/day, we recommend maintaining at least 50 SIMs per type to avoid running out.
      </p>
    </div>
  );
}
