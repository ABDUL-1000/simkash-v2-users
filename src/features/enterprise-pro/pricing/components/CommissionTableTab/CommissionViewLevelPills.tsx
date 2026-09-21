import React from "react";

export type ViewLevel = "sc" | "ap" | "sim_type";

interface CommissionViewLevelPillsProps {
  viewLevel: ViewLevel;
  onViewLevelChange: (level: ViewLevel) => void;
}

export const CommissionViewLevelPills: React.FC<CommissionViewLevelPillsProps> = ({
  viewLevel,
  onViewLevelChange,
}) => {
  const levels: { key: ViewLevel; label: string }[] = [
    { key: "sc", label: "SC Level" },
    { key: "ap", label: "AP Level" },
    { key: "sim_type", label: "SIM Type Level" },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {levels.map((lvl) => {
        const isActive = viewLevel === lvl.key;
        return (
          <button
            key={lvl.key}
            type="button"
            onClick={() => onViewLevelChange(lvl.key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              isActive
                ? "bg-[#1E3A5F] text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {lvl.label}
          </button>
        );
      })}
    </div>
  );
};
