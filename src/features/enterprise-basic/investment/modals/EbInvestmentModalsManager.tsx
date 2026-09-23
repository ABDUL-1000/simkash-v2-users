import React from "react";
import type { EbInvestmentModalState } from "../types";
import { ConfirmInstalmentPaymentModal } from "./ConfirmInstalmentPaymentModal";
import { ConfirmExtraPaymentModal } from "./ConfirmExtraPaymentModal";
import { ProcessingInstalmentModal } from "./ProcessingInstalmentModal";
import { InstalmentPaymentSuccessModal } from "./InstalmentPaymentSuccessModal";
import { ExtraPaymentSuccessModal } from "./ExtraPaymentSuccessModal";
import { InstalmentPaymentFailedModal } from "./InstalmentPaymentFailedModal";
import { ExportEbInvestmentModal } from "./ExportEbInvestmentModal";
import { GeneratingEbReportModal } from "./GeneratingEbReportModal";
import { SimTypeCommissionDetailModal } from "./SimTypeCommissionDetailModal";

interface EbInvestmentModalsManagerProps {
  state: EbInvestmentModalState;
  onUpdateState: (partial: Partial<EbInvestmentModalState>) => void;
  walletBalance: number;
  balanceRemaining: number;
  onConfirmInstalment: (amount: number, pin: string) => void;
  onConfirmExtra: (amount: number, pin: string) => void;
  onViewBalanceTab: () => void;
  onAssignSim?: () => void;
}

export const EbInvestmentModalsManager: React.FC<
  EbInvestmentModalsManagerProps
> = ({
  state,
  onUpdateState,
  walletBalance,
  balanceRemaining,
  onConfirmInstalment,
  onConfirmExtra,
  onViewBalanceTab,
  onAssignSim,
}) => {
  return (
    <>
      <ConfirmInstalmentPaymentModal
        open={state.isOpenConfirmInstalment}
        onOpenChange={(open) => onUpdateState({ isOpenConfirmInstalment: open })}
        walletBalance={walletBalance}
        balanceRemaining={balanceRemaining}
        onConfirm={onConfirmInstalment}
      />

      <ConfirmExtraPaymentModal
        open={state.isOpenConfirmExtra}
        onOpenChange={(open) => onUpdateState({ isOpenConfirmExtra: open })}
        walletBalance={walletBalance}
        balanceRemaining={balanceRemaining}
        onConfirm={onConfirmExtra}
      />

      <ProcessingInstalmentModal
        open={state.isOpenProcessing}
        onOpenChange={(open) => onUpdateState({ isOpenProcessing: open })}
        amount={state.lastPaymentAmount}
        isExtra={state.lastPaymentAmount > 350000}
      />

      <InstalmentPaymentSuccessModal
        open={state.isOpenSuccessInstalment}
        onOpenChange={(open) => onUpdateState({ isOpenSuccessInstalment: open })}
        amount={state.lastPaymentAmount}
        balanceRemaining={balanceRemaining}
        receiptRef={state.receiptRef}
        onViewBalance={onViewBalanceTab}
      />

      <ExtraPaymentSuccessModal
        open={state.isOpenSuccessExtra}
        onOpenChange={(open) => onUpdateState({ isOpenSuccessExtra: open })}
        amount={state.lastPaymentAmount}
        balanceRemaining={balanceRemaining}
        receiptRef={state.receiptRef}
        onViewBalance={onViewBalanceTab}
      />

      <InstalmentPaymentFailedModal
        open={state.isOpenFailed}
        onOpenChange={(open) => onUpdateState({ isOpenFailed: open })}
        onRetry={() => {
          onUpdateState({ isOpenFailed: false, isOpenConfirmInstalment: true });
        }}
        onContactSupport={() => onUpdateState({ isOpenFailed: false })}
      />

      <ExportEbInvestmentModal
        open={state.isOpenExport}
        onOpenChange={(open) => onUpdateState({ isOpenExport: open })}
        onGenerateExport={() => {
          onUpdateState({ isOpenExport: false, isOpenGeneratingReport: true });
        }}
      />

      <GeneratingEbReportModal
        open={state.isOpenGeneratingReport}
        onOpenChange={(open) => onUpdateState({ isOpenGeneratingReport: open })}
      />

      <SimTypeCommissionDetailModal
        open={state.isOpenSimDetail}
        onOpenChange={(open) => onUpdateState({ isOpenSimDetail: open })}
        sim={state.selectedSimDetail}
        onAssignSim={onAssignSim}
      />
    </>
  );
};
