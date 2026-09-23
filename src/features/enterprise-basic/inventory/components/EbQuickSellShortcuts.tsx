import React from "react";
import { ArrowUpRight } from "lucide-react";

interface EbQuickSellShortcutsProps {
  onQuickSell: (productName: string) => void;
}

export const EbQuickSellShortcuts: React.FC<EbQuickSellShortcutsProps> = ({
  onQuickSell,
}) => {
  const quickProducts = [
    { name: "POS SIM", margin: 2000, color: "text-blue-600 bg-blue-50" },
    { name: "CCTV SIM", margin: 3500, color: "text-emerald-600 bg-emerald-50" },
    { name: "GPS SIM", margin: 4000, color: "text-purple-600 bg-purple-50" },
    { name: "Router SIM", margin: 3000, color: "text-amber-600 bg-amber-50" },
  ];

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3.5 text-xs">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        Quick Sell Product
      </span>

      <div className="space-y-2">
        {quickProducts.map((p) => (
          <div
            key={p.name}
            className="p-2.5 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div>
              <div className="font-bold text-slate-900">{p.name}</div>
              <div className="text-[10px] font-semibold text-emerald-600">
                +₦{p.margin.toLocaleString()} margin
              </div>
            </div>

            <button
              type="button"
              onClick={() => onQuickSell(p.name)}
              className="py-1 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition inline-flex items-center gap-1 shadow-xs"
            >
              <span>Assign</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
