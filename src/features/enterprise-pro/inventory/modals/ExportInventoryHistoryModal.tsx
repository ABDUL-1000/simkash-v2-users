import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface ExportInventoryHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExportInventoryHistoryModal: React.FC<ExportInventoryHistoryModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [scope, setScope] = useState<"full" | "orders" | "distributions" | "sc">("full");
  const [format, setFormat] = useState<"excel" | "csv" | "pdf">("excel");
  const [period, setPeriod] = useState<"month" | "all" | "custom">("month");

  const [includes, setIncludes] = useState({
    dateTime: true,
    movementType: true,
    quantities: true,
    scName: true,
    runningBalance: true,
    wholesaleValue: true,
    orderReferences: true,
  });

  const toggleInclude = (key: keyof typeof includes) => {
    setIncludes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleGenerate = () => {
    alert("Export generated successfully!");
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title={<h3 className="text-xl font-bold text-slate-900">Export Inventory History</h3>}
      footer={null}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Export Scope */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            Export Scope
          </span>
          <div className="space-y-2">
            {[
              { id: "full", title: "Full History", desc: "All orders + all distributions" },
              { id: "orders", title: "Orders Only", desc: "Orders received from Simkash" },
              { id: "distributions", title: "Distributions Only", desc: "All SC distributions" },
              { id: "sc", title: "By SC", desc: "Per-SC distribution history" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScope(item.id as any)}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  scope === item.id
                    ? "bg-slate-50 border-2 border-[#1E3A5F]"
                    : "bg-slate-50/60 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                <div className="font-bold text-xs text-slate-900">{item.title}</div>
                <div className="text-[11px] text-slate-400">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Include Section */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            Include
          </span>
          <div className="space-y-2">
            {[
              { key: "dateTime", label: "Date and time of movement" },
              { key: "movementType", label: "Movement type (order / distribution)" },
              { key: "quantities", label: "Quantities per SIM type" },
              { key: "scName", label: "SC name (for distributions)" },
              { key: "runningBalance", label: "Running balance after each movement" },
              { key: "wholesaleValue", label: "Wholesale value per movement" },
              { key: "orderReferences", label: "Order references" },
            ].map((item) => {
              const isChecked = includes[item.key as keyof typeof includes];
              return (
                <div
                  key={item.key}
                  onClick={() => toggleInclude(item.key as keyof typeof includes)}
                  className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-slate-800 select-none"
                >
                  <div className="w-4 h-4 rounded bg-[#1E3A5F] text-white flex items-center justify-center shrink-0">
                    {isChecked ? <div className="w-2 h-2 bg-white rounded-xs" /> : <div className="w-2 h-2 bg-[#1E3A5F]" />}
                  </div>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Format */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            Format
          </span>
          <div className="flex items-center gap-2">
            {(["excel", "csv", "pdf"] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                  format === fmt
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {fmt === "excel" ? "Excel" : fmt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Period */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            Period
          </span>
          <div className="flex items-center gap-2">
            {[
              { id: "month", label: "This Month" },
              { id: "all", label: "All Time" },
              { id: "custom", label: "Custom Range" },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  period === p.id
                    ? "bg-[#1E3A5F] text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Emerald Summary Banner */}
        <div className="p-3 bg-[#ECFDF5] rounded-xl text-emerald-600 font-semibold text-xs text-center">
          12 movements · Jan–Jun 2026
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full inline-flex items-center justify-center py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            className="w-full inline-flex items-center justify-center py-2.5 px-4 text-xs font-bold text-white bg-[#1E3A5F] hover:bg-[#152943] rounded-xl shadow-sm transition-colors"
          >
            Generate Export
          </button>
        </div>
      </div>
    </AppModal>
  );
};
