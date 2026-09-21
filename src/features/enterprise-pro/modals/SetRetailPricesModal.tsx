import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { initialSimPrices } from "../data/mockData";
import { formatNaira } from "../utils/formatters";
import { Info, AlertTriangle, Minus, Plus, Video, MapPin, Wifi, XCircle, ArrowUp } from "lucide-react";
import { toast } from "sonner";

interface SetRetailPricesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SetRetailPricesModal({ open, onOpenChange }: SetRetailPricesModalProps) {
  const [prices, setPrices] = useState(initialSimPrices);

  const handleAdjustPrice = (index: number, delta: number) => {
    setPrices((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const newRetail = Math.max(item.wholesalePrice + 500, item.retailPrice + delta);
        const newMargin = newRetail - item.wholesalePrice;
        const ratio = newMargin / (item.retailPrice - item.wholesalePrice || 1);
        return {
          ...item,
          retailPrice: newRetail,
          marginPerSim: newMargin,
          monthlyEstimate: Math.round(item.monthlyEstimate * ratio),
        };
      })
    );
  };

  const getSimIcon = (type: string) => {
    switch (type) {
      case "POS SIM":
        return <XCircle className="size-5 text-slate-700" />;
      case "CCTV SIM":
        return <Video className="size-5 text-emerald-600" />;
      case "GPS SIM":
        return <MapPin className="size-5 text-purple-600" />;
      default:
        return <Wifi className="size-5 text-amber-600" />;
    }
  };

  const getSimIconBg = (type: string) => {
    switch (type) {
      case "POS SIM":
        return "bg-slate-100";
      case "CCTV SIM":
        return "bg-emerald-50";
      case "GPS SIM":
        return "bg-purple-50";
      default:
        return "bg-amber-50";
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Set Your Retail Prices"
      description="Control your margin across all SIM types"
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* Info Callout */}
        <div className="flex items-start gap-2.5 rounded-2xl bg-blue-50/70 p-3 text-slate-600 border border-blue-100">
          <Info className="size-4 shrink-0 text-blue-600 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            You set the retail price customers pay for SIMs in your network. Simkash charges you the wholesale price. The difference is your margin.
          </p>
        </div>

        {/* 4 Product Rows */}
        <div className="space-y-2">
          {prices.map((item, idx) => (
            <div key={item.type} className="rounded-2xl border border-slate-200 p-3 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex size-10 items-center justify-center rounded-xl ${getSimIconBg(item.type)}`}>
                    {getSimIcon(item.type)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{item.label}</p>
                    <p className="text-[10px] text-slate-400">
                      Wholesale: {formatNaira(item.wholesalePrice)}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Current: {formatNaira(item.retailPrice)}
                    </p>
                  </div>
                </div>

                {/* Counter Input */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleAdjustPrice(idx, -100)}
                    className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-16 rounded-xl border border-slate-200 py-1 text-center font-bold text-slate-900 text-xs">
                    {item.retailPrice.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAdjustPrice(idx, 100)}
                    className="flex size-7 items-center justify-center rounded-full bg-[#1E293B] text-white hover:bg-slate-700 transition"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700 border border-emerald-200">
                  Margin: {formatNaira(item.marginPerSim)}/SIM
                </span>
                <span className="text-slate-400">
                  ~{formatNaira(item.monthlyEstimate)}/month at current pace
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Estimated Total Monthly Margin Box (Dark Card) */}
        <div className="rounded-2xl bg-[#1E293B] p-4 text-white space-y-1 shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimated Total Monthly Margin</p>
          <p className="text-2xl font-black text-white tracking-tight">₦32,000,000+</p>
          <p className="text-[11px] text-slate-400">At current network activation pace</p>
          <p className="text-[10px] text-slate-300 flex items-center gap-1 pt-1">
            <ArrowUp className="size-3 text-emerald-400" /> Up from ₦29,694,000 if you raise POS SIM from ₦4,500 to ₦5,000
          </p>
        </div>

        {/* Amber Warning */}
        <div className="flex items-start gap-2 rounded-2xl bg-amber-50 p-2.5 text-amber-800 border border-amber-200">
          <AlertTriangle className="size-4 shrink-0 text-amber-600 mt-0.5" />
          <p className="text-[10px] leading-tight">
            SC commission rates are separate. Raising retail prices increases your margin but APs still earn their set commission from SIM sales.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              toast.success("Retail prices saved successfully");
              onOpenChange(false);
            }}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white bg-[#1E293B] hover:bg-slate-700 transition"
          >
            Save Prices
          </button>
        </div>
      </div>
    </AppModal>
  );
}
