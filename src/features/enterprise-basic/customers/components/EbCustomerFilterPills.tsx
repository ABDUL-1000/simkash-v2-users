import React from "react";

interface EbCustomerFilterPillsProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
  productFilter: string;
  onProductChange: (product: string) => void;
  durationFilter: string;
  onDurationChange: (duration: string) => void;
}

export const EbCustomerFilterPills: React.FC<EbCustomerFilterPillsProps> = ({
  statusFilter,
  onStatusChange,
  productFilter,
  onProductChange,
  durationFilter,
  onDurationChange,
}) => {
  const statusOptions = [
    { id: "all", label: "All (847)" },
    { id: "active", label: "Active (800)" },
    { id: "expiring", label: "Expiring Soon (47)" },
    { id: "expired", label: "Expired (12)" },
  ];

  const productOptions = ["All", "POS", "CCTV", "GPS", "Router"];
  const durationOptions = ["All", "6 Month", "1 Year", "2 Year", "3 Year"];

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-4 shadow-xs space-y-3 text-xs">
      {/* Status pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {statusOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onStatusChange(opt.id)}
            className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
              statusFilter === opt.id
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
        {/* Product Type Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Product:
          </span>
          <div className="flex items-center gap-1">
            {productOptions.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onProductChange(p)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  productFilter === p
                    ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Plan:
          </span>
          <div className="flex items-center gap-1">
            {durationOptions.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onDurationChange(d)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                  durationFilter === d
                    ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
