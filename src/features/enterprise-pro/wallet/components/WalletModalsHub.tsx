import React from "react";
import { RequestPayoutModal } from "../modals/RequestPayoutFlow/RequestPayoutModal";
import { ProcessingPayoutModal } from "../modals/RequestPayoutFlow/ProcessingPayoutModal";
import { PayoutPendingApprovalModal } from "../modals/RequestPayoutFlow/PayoutPendingApprovalModal";
import { PayoutApprovedModal } from "../modals/RequestPayoutFlow/PayoutApprovedModal";
import { PayoutFailedModal } from "../modals/RequestPayoutFlow/PayoutFailedModal";
import { ReinvestSelectTypeModal } from "../modals/ReinvestFlow/ReinvestSelectTypeModal";
import { ConfirmReinvestmentModal } from "../modals/ReinvestFlow/ConfirmReinvestmentModal";
import { ProcessingReinvestmentModal } from "../modals/ReinvestFlow/ProcessingReinvestmentModal";
import { ReinvestmentSuccessModal } from "../modals/ReinvestFlow/ReinvestmentSuccessModal";
import { InsufficientEarningsModal } from "../modals/ReinvestFlow/InsufficientEarningsModal";
import { QuickPayBalanceModal } from "../modals/PayBalanceFlow/QuickPayBalanceModal";
import { ProcessingBalancePaymentModal } from "../modals/PayBalanceFlow/ProcessingBalancePaymentModal";
import { BalancePaymentSuccessModal } from "../modals/PayBalanceFlow/BalancePaymentSuccessModal";
import type { useWalletModals } from "../hooks/useWalletModals";

interface WalletModalsHubProps {
  modals: ReturnType<typeof useWalletModals>;
}

export const WalletModalsHub: React.FC<WalletModalsHubProps> = ({ modals }) => {
  return (
    <>
      {/* Payout Flow */}
      <RequestPayoutModal
        open={modals.payoutModalOpen}
        onClose={() => modals.setPayoutModalOpen(false)}
        onSubmit={modals.handleStartPayout}
      />
      <ProcessingPayoutModal open={modals.processingPayoutOpen} />
      <PayoutPendingApprovalModal
        open={modals.payoutPendingOpen}
        amount={modals.payoutAmount}
        onClose={() => modals.setPayoutPendingOpen(false)}
      />
      <PayoutApprovedModal
        open={modals.payoutApprovedOpen}
        amount={modals.payoutAmount}
        onClose={() => modals.setPayoutApprovedOpen(false)}
      />
      <PayoutFailedModal
        open={modals.payoutFailedOpen}
        amount={modals.payoutAmount}
        onClose={() => modals.setPayoutFailedOpen(false)}
        onRetry={() => {
          modals.setPayoutFailedOpen(false);
          modals.setPayoutModalOpen(true);
        }}
      />

      {/* Reinvest Flow */}
      <ReinvestSelectTypeModal
        open={modals.reinvestSelectOpen}
        onClose={() => modals.setReinvestSelectOpen(false)}
        onProceed={modals.handleStartReinvest}
      />
      <ConfirmReinvestmentModal
        open={modals.confirmReinvestOpen}
        type={modals.reinvestType}
        amount={modals.reinvestAmount}
        onBack={() => {
          modals.setConfirmReinvestOpen(false);
          modals.setReinvestSelectOpen(true);
        }}
        onConfirm={modals.handleConfirmReinvest}
      />
      <ProcessingReinvestmentModal open={modals.processingReinvestOpen} />
      <ReinvestmentSuccessModal
        open={modals.reinvestSuccessOpen}
        type={modals.reinvestType}
        amount={modals.reinvestAmount}
        onClose={() => modals.setReinvestSuccessOpen(false)}
      />
      <InsufficientEarningsModal
        open={modals.insufficientEarningsOpen}
        onClose={() => modals.setInsufficientEarningsOpen(false)}
      />

      {/* Pay Balance Flow */}
      <QuickPayBalanceModal
        open={modals.payBalanceOpen}
        onClose={() => modals.setPayBalanceOpen(false)}
        onSubmit={modals.handleStartPayBalance}
      />
      <ProcessingBalancePaymentModal open={modals.processingPayBalanceOpen} />
      <BalancePaymentSuccessModal
        open={modals.payBalanceSuccessOpen}
        amount={modals.payBalanceAmount}
        onClose={() => modals.setPayBalanceSuccessOpen(false)}
      />
    </>
  );
};
