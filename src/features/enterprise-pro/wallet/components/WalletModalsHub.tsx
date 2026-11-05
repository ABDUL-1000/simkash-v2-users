import React from "react";
import { WalletPayoutModal } from "@/features/payout/WalletPayoutModal";
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
      {/* Payout — POST /user/wallet/request-payout (shared by all agents) */}
      <WalletPayoutModal open={modals.payoutModalOpen} onOpenChange={(open) => { modals.setPayoutModalOpen(open); if (!open) onPayoutClose?.(); }} onAddAccount={() => modals.setChangeBankOpen(true)} />

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
