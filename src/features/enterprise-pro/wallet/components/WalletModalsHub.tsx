import React from "react";
import { RequestPayoutModal } from "../modals/RequestPayoutFlow/RequestPayoutModal";
import { ProcessingPayoutModal } from "../modals/RequestPayoutFlow/ProcessingPayoutModal";
import { PayoutPendingApprovalModal } from "../modals/RequestPayoutFlow/PayoutPendingApprovalModal";
import { PayoutApprovedModal } from "../modals/RequestPayoutFlow/PayoutApprovedModal";
import { WithdrawProfitModal } from "../modals/WithdrawProfitModal";
import { TransactionDetailModal } from "../modals/TransactionDetailModal";
import { ChangeBankAccountModal } from "../modals/BankManagementFlow/ChangeBankAccountModal";
import { VerifyingBankModal } from "../modals/BankManagementFlow/VerifyingBankModal";
import { BankVerificationPendingModal } from "../modals/BankManagementFlow/BankVerificationPendingModal";
import { AllPayoutsHistoryModal } from "../modals/StatementAndHistory/AllPayoutsHistoryModal";
import type { useWalletModals } from "../hooks/useWalletModals";

interface WalletModalsHubProps {
  modals: ReturnType<typeof useWalletModals>;
  onPayoutClose?: () => void;
}

export const WalletModalsHub: React.FC<WalletModalsHubProps> = ({ modals, onPayoutClose }) => {
  return (
    <>
      {/* Payout Flow */}
      <RequestPayoutModal
        open={modals.payoutModalOpen}
        onClose={() => { modals.setPayoutModalOpen(false); onPayoutClose?.(); }}
        onSubmit={modals.handleStartPayout}
      />
      <ProcessingPayoutModal open={modals.processingPayoutOpen} />
      <PayoutPendingApprovalModal
        result={modals.payoutResult}
        open={modals.payoutPendingOpen}
        amount={modals.payoutAmount}
        onClose={() => modals.setPayoutPendingOpen(false)}
      />
      <PayoutApprovedModal
        result={modals.payoutResult}
        open={modals.payoutApprovedOpen}
        amount={modals.payoutAmount}
        onClose={() => modals.setPayoutApprovedOpen(false)}
      />

      {/* Withdraw profit to main wallet */}
      {modals.withdrawOpen && <WithdrawProfitModal onClose={() => modals.setWithdrawOpen(false)} />}

      {/* Bank Account Management */}
      <ChangeBankAccountModal
        open={modals.changeBankOpen}
        onClose={() => modals.setChangeBankOpen(false)}
        onSubmit={modals.handleStartBankVerification}
      />
      <VerifyingBankModal open={modals.verifyingBankOpen} />
      <BankVerificationPendingModal
        result={modals.bankResult}
        open={modals.bankPendingOpen}
        bank={modals.newBank}
        acctNo={modals.newAcctNo}
        acctName={modals.newAcctName}
        onClose={() => modals.setBankPendingOpen(false)}
      />

      {/* Transaction details & payouts history */}
      <TransactionDetailModal txn={modals.selectedTxn} onClose={() => modals.setSelectedTxn(null)} />
      <AllPayoutsHistoryModal
        open={modals.allPayoutsOpen}
        onClose={() => modals.setAllPayoutsOpen(false)}
        onSelectPayout={modals.handleSelectPayoutFromLedger}
      />
    </>
  );
};
