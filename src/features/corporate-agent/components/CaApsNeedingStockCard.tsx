import { AlertTriangle, Send, ChevronRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_AGENCY_PARTNERS_DATA } from "../data/corporate-agent.data";
import type { CaAgencyPartnerItem } from "../types/corporate-agent.types";

interface CaApsNeedingStockCardProps {
  onDistributeToAll?: () => void;
  onDistributeToAp?: (ap: CaAgencyPartnerItem) => void;
}

export function CaApsNeedingStockCard({
  onDistributeToAll,
  onDistributeToAp,
}: CaApsNeedingStockCardProps) {
  // Filter APs with stock <= 3
  const lowStockAps = CA_AGENCY_PARTNERS_DATA.filter(
    (ap) => ap.stockStatus === "Low" || ap.stockStatus === "Out" || ap.stock <= 3
  ).slice(0, 3);

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3 bg-white"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-50">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              APs Needing Stock ({lowStockAps.length})
            </h3>
            <p className="text-[11px] text-slate-500">At risk of halting activations</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          Action Needed
        </span>
      </div>

      {/* APs LIST */}
      <div className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
        {lowStockAps.map((ap) => {
          const isOut = ap.stock === 0;

          return (
            <div
              key={ap.id}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-700 shrink-0">
                  {ap.avatarInitials}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">{ap.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {ap.state} • {ap.actsThisMonth} acts this mo.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    isOut
                      ? "bg-rose-100 text-rose-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {isOut ? "Out of Stock" : `${ap.stock} SIMs left`}
                </span>

                <button
                  type="button"
                  onClick={() => onDistributeToAp?.(ap)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1 transition-colors"
                  title={`Send stock to ${ap.name}`}
                >
                  <Send className="w-3 h-3 text-slate-600" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER BATCH ACTION */}
      <button
        type="button"
        onClick={onDistributeToAll}
        className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
      >
        <span>Distribute to All Low APs</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
