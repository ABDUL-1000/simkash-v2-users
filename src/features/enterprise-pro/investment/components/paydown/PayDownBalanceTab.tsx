import React from "react";
import { PayDownHeaderCards } from "./PayDownHeaderCards";
import { BalancePayoffForm } from "./BalancePayoffForm";
import { BalanceHistoryList } from "./BalanceHistoryList";
import { AssignedAccountManager } from "../AssignedAccountManager";

interface PayDownBalanceTabProps {
  onInitiatePayment: (data: {
    amount: number;
    source: string;
    pin: string;
  }) => void;
}

export const PayDownBalanceTab: React.FC<PayDownBalanceTabProps> = ({
  onInitiatePayment,
}) => {
  return (
    <div className="space-y-6">
      {/* 3 KPI Header Cards */}
      <PayDownHeaderCards />

      {/* Main Payment Section & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Principal Balance Paydown
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Make voluntary capital amortizations to extinguish outstanding
              principal and maximize equity share.
            </p>
          </div>

          <BalancePayoffForm onSubmitPayment={onInitiatePayment} />
        </div>

        <div className="space-y-6">
          <BalanceHistoryList />
          <AssignedAccountManager />
        </div>
      </div>
    </div>
  );
};
