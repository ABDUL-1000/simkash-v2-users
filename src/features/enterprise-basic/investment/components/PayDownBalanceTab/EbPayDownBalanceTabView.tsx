import React from "react";
import type { InstalmentPeriod, RecentPayment } from "../../types";
import { OutstandingDebtMeter } from "./OutstandingDebtMeter";
import { BiWeeklyScheduleTable } from "./BiWeeklyScheduleTable";
import { RecentPaymentsList } from "./RecentPaymentsList";
import { PaymentSummarySidebar } from "./PaymentSummarySidebar";
import { PaymentMethodsCard } from "./PaymentMethodsCard";

interface EbPayDownBalanceTabViewProps {
  balanceRemaining: number;
  balancePaid: number;
  totalPrincipal: number;
  schedule: InstalmentPeriod[];
  recentPayments: RecentPayment[];
  onPayNextInstalment: () => void;
  onPayFullBalance: () => void;
  onDownloadStatement?: () => void;
}

export const EbPayDownBalanceTabView: React.FC<
  EbPayDownBalanceTabViewProps
> = ({
  balanceRemaining,
  balancePaid,
  totalPrincipal,
  schedule,
  recentPayments,
  onPayNextInstalment,
  onPayFullBalance,
  onDownloadStatement,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Outstanding Debt Hero Meter */}
      <OutstandingDebtMeter
        balanceRemaining={balanceRemaining}
        balancePaid={balancePaid}
        totalPrincipal={totalPrincipal}
      />

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <BiWeeklyScheduleTable
            schedule={schedule}
            onPayNext={onPayNextInstalment}
          />
          <RecentPaymentsList payments={recentPayments} />
        </div>

        {/* Right Column (1 Col) */}
        <div className="lg:col-span-1 space-y-6">
          <PaymentSummarySidebar
            totalPrincipal={totalPrincipal}
            balancePaid={balancePaid}
            balanceRemaining={balanceRemaining}
            nextDueAmount={350000}
            nextDueDate="Mar 15, 2026"
            onPayNext={onPayNextInstalment}
            onPayFull={onPayFullBalance}
            onDownloadStatement={onDownloadStatement}
          />

          <PaymentMethodsCard />
        </div>
      </div>
    </div>
  );
};
