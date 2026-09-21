import React from "react";
import { Smartphone, Video, Navigation, Wifi, TrendingUp } from "lucide-react";
import type { ApRateConfigItem } from "../../types";

interface ApRateConfigCardsProps {
  apRates: ApRateConfigItem[];
  onChangeRate: (id: string, delta: number) => void;
  onToggleMode: (id: string, mode: "fixed" | "percentage") => void;
}

export const ApRateConfigCards: React.FC<ApRateConfigCardsProps> = ({
  apRates,
  onChangeRate,
  onToggleMode,
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
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
        AP Commission Rates by SIM Type (Simkash standard: ₦1,000 per activation)
      </span>

      {apRates.map((item) => (
        <div
          key={item.id}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Left title */}
            <div className="flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-xl ${getBg(item.id)} flex items-center justify-center shrink-0`}>
                {getIcon(item.id)}
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">{item.simType}</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simkash standard: ₦1,000/activation
                </p>
              </div>
            </div>

            {/* Mode toggle and rate box */}
            <div className="flex items-center gap-3">
              <div className="flex items-center p-0.5 rounded-xl bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => onToggleMode(item.id, "fixed")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    item.mode === "fixed"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  ₦ per activation
                </button>
                <button
                  type="button"
                  onClick={() => onToggleMode(item.id, "percentage")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    item.mode === "percentage"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  % of margin
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onChangeRate(item.id, -100)}
                  disabled={item.rate <= 100}
                  className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                >
                  -
                </button>
                <div className="min-w-[90px] py-1.5 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center font-extrabold text-xs text-slate-900">
                  {item.mode === "fixed" ? `₦ ${item.rate.toLocaleString()}` : `${item.rate}%`}
                </div>
                <button
                  type="button"
                  onClick={() => onChangeRate(item.id, 100)}
                  className="w-7 h-7 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center hover:bg-slate-800"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Under note */}
          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 text-[11px] text-blue-700 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>
              APs earn ₦{item.rate.toLocaleString()} per {item.simType} activation
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
