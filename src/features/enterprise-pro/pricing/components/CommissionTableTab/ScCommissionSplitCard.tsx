import React from "react";
import { colors } from "@/constants/colors";

export const ScCommissionSplitCard: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4 flex flex-col justify-between"
      style={{ borderColor: colors.border }}
    >
      <div>
        <h4 className="font-bold text-gray-900 text-sm">SC Commission This Month</h4>
        <div className="text-2xl font-black text-amber-500 mt-2">₦2,369,400</div>
        <p className="text-xs text-gray-400 mt-0.5">8% avg across 12 SCs</p>
      </div>

      <div className="pt-3 border-t border-slate-100 space-y-2.5">
        <div>
          <span className="text-xs text-gray-500 font-medium">Net EP after commission</span>
          <div className="text-xl font-bold text-gray-900 mt-0.5">₦27,324,600</div>
        </div>

        {/* Progress split bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
          <div className="h-full bg-[#1F3A5F]" style={{ width: "92%" }} title="92% EP Keeps" />
          <div className="h-full bg-amber-500" style={{ width: "8%" }} title="8% SC Commission" />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="flex items-center gap-1.5 text-gray-700 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F3A5F]" />
            92% EP keeps
          </span>
          <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            8% SC commission
          </span>
        </div>
      </div>
    </div>
  );
};
