import React from "react";
import { Plus, Minus } from "lucide-react";

interface SimQuantityStepperInputProps {
  label: string;
  pricePerUnit: number;
  availableStock: number;
  value: number;
  onChange: (val: number) => void;
  step?: number;
  isCritical?: boolean;
}

export const SimQuantityStepperInput: React.FC<SimQuantityStepperInputProps> = ({
  label,
  pricePerUnit,
  availableStock,
  value,
  onChange,
  step = 10,
  isCritical = false,
}) => {
  return (
    <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-slate-800">
          {label} (₦{pricePerUnit.toLocaleString()})
        </span>
        <span
          className={`text-[11px] font-medium ${
            isCritical ? "text-red-500" : "text-slate-500"
          }`}
        >
          Avail: {availableStock.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - step))}
          className="p-2 bg-white rounded border border-slate-300 hover:bg-slate-100 transition-colors"
        >
          <Minus className="w-3.5 h-3.5 text-slate-600" />
        </button>

        <input
          type="number"
          min={0}
          max={availableStock}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full text-center font-bold text-sm py-1.5 rounded border border-slate-300 bg-white"
        />

        <button
          type="button"
          onClick={() => onChange(Math.min(availableStock, value + step))}
          className="p-2 bg-white rounded border border-slate-300 hover:bg-slate-100 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-slate-600" />
        </button>
      </div>
    </div>
  );
};
