import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertTriangle, Check } from "lucide-react";

interface PriceChangeSimulatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyPrice?: (simType: string, price: number) => void;
}

const simConfig = {
  pos: { label: "POS SIM", wholesale: 2500, currentRetail: 4500, acts: 14847 },
  cctv: { label: "CCTV SIM", wholesale: 6000, currentRetail: 9500, acts: 900 },
  gps: { label: "GPS SIM", wholesale: 8000, currentRetail: 12000, acts: 700 },
  router: { label: "Router SIM", wholesale: 5000, currentRetail: 8000, acts: 700 },
};

type SimKey = keyof typeof simConfig;

export const PriceChangeSimulatorModal: React.FC<PriceChangeSimulatorModalProps> = ({
  open,
  onOpenChange,
  onApplyPrice,
}) => {
  const [selectedSim, setSelectedSim] = useState<SimKey>("pos");
  const [testPrice, setTestPrice] = useState<number>(5000);

  const current = simConfig[selectedSim];
  const newMargin = testPrice - current.wholesale;
  const currentMargin = current.currentRetail - current.wholesale;
  const marginDiff = newMargin - currentMargin;

  const extraMarginMonthly = marginDiff * current.acts;
  const scCommExtra = Math.round(extraMarginMonthly * 0.08);
  const netEpExtraMonthly = extraMarginMonthly - scCommExtra;
  const annualExtra = netEpExtraMonthly * 12;

  const handleApply = () => {
    onOpenChange(false);
    onApplyPrice?.(current.label, testPrice);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-3.5 pt-1 text-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Price Change Simulator</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">See how price changes affect your earnings</p>
        </div>

        {/* SIM TYPE selector pills */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SIM Type</span>
          <div className="grid grid-cols-4 gap-1.5">
            {(["pos", "cctv", "gps", "router"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedSim(key);
                  setTestPrice(simConfig[key].currentRetail + 500);
                }}
                className={`py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedSim === key ? "bg-[#1E3A5F] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {simConfig[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* CURRENT PRICE */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Price</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-base font-extrabold text-slate-900">₦{current.currentRetail.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-medium">read-only</span>
          </div>
        </div>

        {/* TEST NEW PRICE */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Test New Price</span>
          <div className="w-full flex items-center border-2 border-blue-600 rounded-xl px-3 py-1.5 bg-white text-base font-black text-slate-900">
            <span className="text-slate-400 mr-2">₦</span>
            <input
              type="number"
              value={testPrice}
              onChange={(e) => setTestPrice(Number(e.target.value))}
              className="w-full font-black text-slate-900 outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            {[100, 500, 1000].map((inc) => (
              <button key={`+${inc}`} type="button" onClick={() => setTestPrice((p) => p + inc)} className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] font-bold text-emerald-700 hover:bg-emerald-100">
                +₦{inc.toLocaleString()}
              </button>
            ))}
            {[-100, -500].map((dec) => (
              <button key={`${dec}`} type="button" onClick={() => setTestPrice((p) => Math.max(current.wholesale, p + dec))} className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-[11px] font-bold text-amber-700 hover:bg-amber-100">
                -₦{Math.abs(dec).toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Navy IMPACT card */}
        <div className="p-3.5 bg-[#1E3A5F] text-white rounded-2xl space-y-1.5 shadow-sm">
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
            Impact at ₦{testPrice.toLocaleString()} Retail
          </span>
          <div className="space-y-1 text-xs text-slate-200">
            <div className="flex justify-between">
              <span>New margin/SIM:</span>
              <span className="font-bold text-white">₦{newMargin.toLocaleString()} ({marginDiff >= 0 ? `+₦${marginDiff.toLocaleString()}` : `-₦${Math.abs(marginDiff).toLocaleString()}`})</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly activations:</span>
              <span className="font-bold text-white">{current.acts.toLocaleString()} avg</span>
            </div>
            <div className="flex justify-between">
              <span>Extra margin:</span>
              <span className="font-bold text-emerald-400">+ ₦{extraMarginMonthly.toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between">
              <span>SC commission:</span>
              <span className="font-bold text-amber-300">+ ₦{scCommExtra.toLocaleString()} (8%)</span>
            </div>
            <div className="flex justify-between text-sm pt-1 border-t border-white/10 font-extrabold text-white">
              <span>Net EP extra:</span>
              <span className="text-emerald-400">+ ₦{netEpExtraMonthly.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300 font-semibold">
              <span>Annual extra:</span>
              <span className="text-emerald-300">+ ₦{annualExtra.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 pt-0.5 text-center">
            Compared to current ₦{current.currentRetail.toLocaleString()} price
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 p-2 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] font-medium">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>Higher retail price may reduce customer demand. Test pricing carefully with your SC network.</span>
        </div>

        {/* Primary Action */}
        <button
          type="button"
          onClick={handleApply}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-xs"
        >
          <Check className="w-4 h-4" />
          <span>Apply ₦{testPrice.toLocaleString()} to {current.label}</span>
        </button>

        {/* Footer row */}
        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 text-slate-600 font-medium">
          <button
            type="button"
            onClick={() => setTestPrice(current.currentRetail)}
            className="px-2 py-1 text-slate-600 hover:text-slate-900 transition font-medium"
          >
            Try Another Price
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleApply}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-xs"
            >
              Apply This Price
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
};
