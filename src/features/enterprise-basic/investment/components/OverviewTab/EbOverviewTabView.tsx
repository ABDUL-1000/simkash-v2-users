import React from "react";
import type {
  AccountTier,
  EbInvestmentOverview,
  SimPnLDetail,
  InstalmentPeriod,
} from "../../types";
import { RevenueVsCostChart } from "./RevenueVsCostChart";
import { MonthlySalesPerformanceChart } from "./MonthlySalesPerformanceChart";
import { PnLBySimTypeCard } from "./PnLBySimTypeCard";
import { FullyPaidUpfrontCard } from "./FullyPaidUpfrontCard";
import { OverviewInstalmentPreview } from "./OverviewInstalmentPreview";
import { EbInvestmentSummarySidebar } from "./EbInvestmentSummarySidebar";
import { EbBreakEvenProgressCard } from "./EbBreakEvenProgressCard";
import { EbRelationshipManagerCard } from "./EbRelationshipManagerCard";
import { EbStrategicBenefitCard } from "./EbStrategicBenefitCard";
import { WantInstalmentsCard } from "./WantInstalmentsCard";
import { EbBalancePayoffCard } from "./EbBalancePayoffCard";

interface EbOverviewTabViewProps {
  overview: EbInvestmentOverview;
  accountTier: AccountTier;
  simList: SimPnLDetail[];
  instalmentSchedule: InstalmentPeriod[];
  balanceRemaining: number;
  onSelectSim: (sim: SimPnLDetail) => void;
  onViewPayDownTab: () => void;
  onPayNextInstalment: () => void;
  onOrderStock: () => void;
  onDownloadStatement: () => void;
}

export const EbOverviewTabView: React.FC<EbOverviewTabViewProps> = ({
  overview,
  accountTier,
  simList,
  instalmentSchedule,
  balanceRemaining,
  onSelectSim,
  onViewPayDownTab,
  onPayNextInstalment,
  onOrderStock,
  onDownloadStatement,
}) => {
  const isFinanced = accountTier === "financed";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column (2 Cols) */}
      <div className="lg:col-span-2 space-y-6">
        <RevenueVsCostChart />
        <MonthlySalesPerformanceChart />
        <PnLBySimTypeCard simList={simList} onSelectSim={onSelectSim} />

        {isFinanced ? (
          <OverviewInstalmentPreview
            schedule={instalmentSchedule}
            onViewAll={onViewPayDownTab}
            onPayNext={onPayNextInstalment}
          />
        ) : (
          <FullyPaidUpfrontCard amount={overview.principalInvested} />
        )}
      </div>

      {/* Right Column (1 Col) */}
      <div className="lg:col-span-1 space-y-6">
        <EbInvestmentSummarySidebar
          overview={overview}
          accountTier={accountTier}
          onPayNext={onPayNextInstalment}
          onOrderStock={onOrderStock}
          onDownloadStatement={onDownloadStatement}
        />

        <EbBreakEvenProgressCard overview={overview} />

        {accountTier === "starter_upfront" && <WantInstalmentsCard />}
        {accountTier === "financed" && (
          <EbBalancePayoffCard balanceRemaining={balanceRemaining} />
        )}
        {accountTier === "strategic_upfront" && (
          <>
            <EbRelationshipManagerCard />
            <EbStrategicBenefitCard />
          </>
        )}
      </div>
    </div>
  );
};
