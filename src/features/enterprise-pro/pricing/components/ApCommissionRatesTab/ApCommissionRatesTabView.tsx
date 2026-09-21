import React from "react";
import { ApCommissionNoticeBanner } from "./ApCommissionNoticeBanner";
import { ApRateConfigCards } from "./ApRateConfigCards";
import { TotalApCommissionBanner } from "./TotalApCommissionBanner";
import { ApImpactOverviewSidebar } from "./ApImpactOverviewSidebar";
import { CommissionPoolSplitCard } from "./CommissionPoolSplitCard";
import { ApQuickActionsCard } from "./ApQuickActionsCard";
import type { ApRateConfigItem } from "../../types";

interface ApCommissionRatesTabViewProps {
  apRates: ApRateConfigItem[];
  onChangeRate: (id: string, delta: number) => void;
  onToggleMode: (id: string, mode: "fixed" | "percentage") => void;
  onSaveApRates: () => void;
  onCopyScRates: () => void;
  onViewRateHistory: () => void;
  onExportApReport: () => void;
  hasChanges?: boolean;
}

export const ApCommissionRatesTabView: React.FC<ApCommissionRatesTabViewProps> = ({
  apRates,
  onChangeRate,
  onToggleMode,
  onSaveApRates,
  onCopyScRates,
  onViewRateHistory,
  onExportApReport,
}) => {
  return (
    <div className="space-y-5">
      {/* Blue Notice & Amber Warning */}
      <ApCommissionNoticeBanner />

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          <ApRateConfigCards
            apRates={apRates}
            onChangeRate={onChangeRate}
            onToggleMode={onToggleMode}
          />

          <TotalApCommissionBanner apRates={apRates} />

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={onSaveApRates}
              className="px-6 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
            >
              Save AP Rates
            </button>
          </div>
        </div>

        {/* Right Column (1 col) */}
        <div className="lg:col-span-1 space-y-5">
          <ApImpactOverviewSidebar />
          <CommissionPoolSplitCard />
          <ApQuickActionsCard
            onCopyScRates={onCopyScRates}
            onViewRateHistory={onViewRateHistory}
            onExportApReport={onExportApReport}
          />
        </div>
      </div>
    </div>
  );
};
