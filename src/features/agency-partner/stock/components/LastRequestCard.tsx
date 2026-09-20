import { Check } from "lucide-react";

export function LastRequestCard() {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
      <h3 className="text-sm font-bold text-[#0F152A]">Last Request</h3>

      <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2 text-xs">
        <div className="flex items-center justify-between text-[11px] text-[#8C909B]">
          <span className="font-mono font-bold">REQ-2026-00840</span>
          <span>28 Jun</span>
        </div>

        <h4 className="font-bold text-[#0F152A]">
          75 SIMs <span className="font-normal text-[#66738C]">(POS 50 · CCTV 25)</span>
        </h4>

        <div className="flex items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
            <Check className="size-3 stroke-[2.5]" /> Fulfilled
          </span>
          <span className="text-[10px] text-[#8C909B]">2 days to fulfil</span>
        </div>
      </div>
    </div>
  );
}
