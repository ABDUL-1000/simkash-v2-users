import React from "react";
import { Trophy, TrendingUp, Users } from "lucide-react";
import { colors } from "@/constants/colors";

export const CommissionHighlights: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Top Performer */}
      <div
        className="rounded-2xl p-4.5 border bg-white shadow-sm flex items-start justify-between"
        style={{ borderColor: colors.border }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Top State Coordinator
            </span>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-gray-900">
              Babatunde Adeleke
            </div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              Lagos State Hub · 92.0% Activation
            </div>
            <div className="text-sm font-bold text-emerald-600 mt-1">
              ₦13,929,375 Net Commission
            </div>
          </div>
        </div>
      </div>

      {/* Highest Growth */}
      <div
        className="rounded-2xl p-4.5 border bg-white shadow-sm flex items-start justify-between"
        style={{ borderColor: colors.border }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Fastest MoM Growth
            </span>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-gray-900">
              Abuja FCT Hub
            </div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              Aminat Okafor · 5,580 Active SIMs
            </div>
            <div className="text-sm font-bold text-blue-600 mt-1">
              +18.4% Month-Over-Month
            </div>
          </div>
        </div>
      </div>

      {/* Average SC Payout */}
      <div
        className="rounded-2xl p-4.5 border bg-white shadow-sm flex items-start justify-between"
        style={{ borderColor: colors.border }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Avg Coordinator Payout
            </span>
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-gray-900">
              ₦5,998,122
            </div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              Distributed evenly across 12 Nigerian States
            </div>
            <div className="text-sm font-bold text-purple-600 mt-1">
              87.8% Avg Network Activation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
