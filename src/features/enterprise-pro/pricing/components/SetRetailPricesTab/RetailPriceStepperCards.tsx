import React from "react";
import { Plus, Minus, CheckCircle2, Smartphone, Video, Navigation, Wifi } from "lucide-react";
import type { RetailPriceConfig } from "../../types";

interface RetailPriceStepperCardsProps {
  prices: RetailPriceConfig[];
  onChangePrice: (id: string, delta: number) => void;
}

export const RetailPriceStepperCards: React.FC<RetailPriceStepperCardsProps> = ({
  prices,
  onChangePrice,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case "pos":
        return <Smartphone className="w-5 h-5 text-blue-600" />;
      case "cctv":
        return <Video className="w-5 h-5 text-emerald-600" />;
      case "gps":
        return <Navigation className="w-5 h-5 text-purple-600" />;
      case "router":
        return <Wifi className="w-5 h-5 text-amber-600" />;
      default:
        return <Smartphone className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBg = (id: string) => {
    switch (id) {
      case "pos":
        return "bg-blue-50";
      case "cctv":
        return "bg-emerald-50";
      case "gps":
        return "bg-purple-50";
      case "router":
        return "bg-amber-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <div className="space-y-3.5">
      {prices.map((item) => {
        const margin = item.currentRetail - item.wholesale;
        const estMonthly = margin * item.monthlyActivations;

        return (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            {/* Left info */}
            <div className="flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-xl ${getBg(item.id)} flex items-center justify-center shrink-0`}>
                {getIcon(item.id)}
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">{item.simType}</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Wholesale: <strong className="text-slate-700">₦{item.wholesale.toLocaleString()}</strong>
                </p>
                <p className="text-[11px] text-slate-400">
                  Current retail: ₦{item.currentRetail.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Stepper controls */}
            <div className="flex flex-col sm:items-end gap-1.5">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onChangePrice(item.id, -500)}
                  disabled={item.currentRetail <= item.wholesale}
                  className="w-8 h-8 rounded-full border border-slate-300 hover:border-slate-400 hover:bg-slate-50 flex items-center justify-center text-slate-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="min-w-[110px] py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-sm font-extrabold text-slate-900">
                    ₦{item.currentRetail.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onChangePrice(item.id, 500)}
                  className="w-8 h-8 rounded-full bg-[#1E3A5F] hover:bg-slate-800 text-white flex items-center justify-center transition shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Margin feedback */}
              <div className="flex items-center gap-2 text-right">
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Margin: ₦{margin.toLocaleString()}/SIM
                </span>
                <span className="text-[11px] text-slate-400">
                  ~₦{(estMonthly / 1e6).toFixed(2)}M/mo
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
