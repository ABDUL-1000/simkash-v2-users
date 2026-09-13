import { AlertCircle, AlertTriangle } from "lucide-react";
import type { RmUrgentScItem } from "../../types/rm-inventory.types";

interface RmScsNeedDistributionCardProps {
  urgentScs: RmUrgentScItem[];
  onDistributeToSc: (sc: RmUrgentScItem) => void;
}

export function RmScsNeedDistributionCard({
  urgentScs,
  onDistributeToSc,
}: RmScsNeedDistributionCardProps) {
  return (
    <div className="rounded-3xl border border-amber-200 bg-[#FFFDF5] p-5 shadow-xs space-y-3.5 text-xs">
      <h3 className="text-sm font-black text-[#0F152A]">
        SCs Need Distribution
      </h3>

      <div className="space-y-3">
        {urgentScs.map((sc) => {
          const isZeroStock = sc.simsRemaining === 0;

          return (
            <div
              key={sc.scId}
              className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xs"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                {isZeroStock ? (
                  <AlertCircle className="size-4 shrink-0 text-[#EF4444] mt-0.5" />
                ) : (
                  <AlertTriangle className="size-4 shrink-0 text-[#F59E0B] mt-0.5" />
                )}
                <div className="min-w-0">
                  <h4
                    className={`font-bold truncate ${
                      isZeroStock ? "text-[#EF4444]" : "text-[#D97706]"
                    }`}
                  >
                    {sc.name} · {sc.state}
                  </h4>
                  <p className="text-[10px] font-medium text-[#64748B]">
                    {sc.statusNote}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDistributeToSc(sc)}
                className={`shrink-0 rounded-xl px-3 py-1.5 text-[11px] font-bold transition ${
                  isZeroStock
                    ? "bg-[#EF4444] text-white hover:bg-red-600 shadow-xs"
                    : "border border-amber-500 bg-white text-[#D97706] hover:bg-amber-50"
                }`}
              >
                {isZeroStock ? "Distribute Now" : "Distribute"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
