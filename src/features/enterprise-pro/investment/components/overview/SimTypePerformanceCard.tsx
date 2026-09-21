import React from "react";
import { colors } from "@/constants/colors";
import { simPerformanceMetrics } from "../../data/mockInvestmentData";

export const SimTypePerformanceCard: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            SIM Type Performance Breakdown
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Portfolio contribution & recurring monthly revenue
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {simPerformanceMetrics.map((sim) => (
          <div key={sim.type} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: sim.color }}
                />
                <span className="font-semibold text-gray-900">{sim.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">
                  {sim.activeCount.toLocaleString()} active
                </span>
                <span className="font-bold text-gray-900">
                  ₦{sim.monthlyRevenue.toLocaleString()}/mo
                </span>
              </div>
            </div>

            {/* Progress track */}
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${sim.sharePercentage}%`,
                  backgroundColor: sim.color,
                }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>{sim.sharePercentage}% total share</span>
              <span>{(sim.totalVolume).toLocaleString()} total deployed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
