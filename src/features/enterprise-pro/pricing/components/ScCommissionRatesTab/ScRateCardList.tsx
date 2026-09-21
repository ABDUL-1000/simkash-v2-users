import React, { useState } from "react";
import type { ScCommissionRateItem } from "../../types";

interface ScRateCardListProps {
  coordinators: ScCommissionRateItem[];
  onChangeRate: (id: string, newRate: number) => void;
}

export const ScRateCardList: React.FC<ScRateCardListProps> = ({
  coordinators,
  onChangeRate,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(coordinators.length / pageSize);

  const displayed = coordinators.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const rateOptions = [0.05, 0.08, 0.1, 0.12, 0.15];

  return (
    <div className="space-y-3.5">
      {displayed.map((sc) => {
        const ratePct = Math.round(sc.currentRate * 100);

        return (
          <div
            key={sc.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* SC Info */}
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  sc.isSuspended ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                }`}
              >
                {sc.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{sc.name}</h4>
                  {sc.isSuspended && (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                      Suspended
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {sc.state} · {sc.apsCount} APs · Current rate:{" "}
                  <strong className="text-slate-700">{ratePct}%</strong>
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  {sc.name.split(" ")[0]} earns{" "}
                  <strong className="text-emerald-600">₦{sc.monthlyEarned.toLocaleString()}/mo</strong> · You
                  keep <strong className="text-blue-900">₦{sc.youKeep.toLocaleString()}</strong>
                </p>
              </div>
            </div>

            {/* Rate buttons strip */}
            <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
              {rateOptions.map((rate) => {
                const isSelected = Math.abs(sc.currentRate - rate) < 0.001;
                return (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => onChangeRate(sc.id, rate)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {(rate * 100).toFixed(0)}%
                  </button>
                );
              })}

              {/* Custom rate indicator */}
              <div className="w-16 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 text-center">
                {ratePct} %
              </div>
            </div>
          </div>
        );
      })}

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
        <span>
          Showing {(currentPage - 1) * pageSize + 1}–
          {Math.min(currentPage * pageSize, coordinators.length)} of {coordinators.length}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx + 1}
              type="button"
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                currentPage === idx + 1
                  ? "bg-[#1E3A5F] text-white"
                  : "border border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};
