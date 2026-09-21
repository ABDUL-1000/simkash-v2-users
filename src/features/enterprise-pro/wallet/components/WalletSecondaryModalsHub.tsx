import React from "react";
import { ChangeBankAccountModal } from "../modals/BankManagementFlow/ChangeBankAccountModal";
import { VerifyingBankModal } from "../modals/BankManagementFlow/VerifyingBankModal";
import { BankVerificationPendingModal } from "../modals/BankManagementFlow/BankVerificationPendingModal";
import { BankVerificationFailedModal } from "../modals/BankManagementFlow/BankVerificationFailedModal";
import { TxnDetailMarginModal } from "../modals/TransactionDetails/TxnDetailMarginModal";
import { TxnDetailCommissionModal } from "../modals/TransactionDetails/TxnDetailCommissionModal";
import { TxnDetailPayoutModal } from "../modals/TransactionDetails/TxnDetailPayoutModal";
import { TxnDetailSimOrderModal } from "../modals/TransactionDetails/TxnDetailSimOrderModal";
import { TxnDetailBalancePayModal } from "../modals/TransactionDetails/TxnDetailBalancePayModal";
import { TxnDetailFailedPayoutModal } from "../modals/TransactionDetails/TxnDetailFailedPayoutModal";
import { DownloadStatementModal } from "../modals/StatementAndHistory/DownloadStatementModal";
import { GeneratingStatementModal } from "../modals/StatementAndHistory/GeneratingStatementModal";
import { StatementReadyModal } from "../modals/StatementAndHistory/StatementReadyModal";
import { AllPayoutsHistoryModal } from "../modals/StatementAndHistory/AllPayoutsHistoryModal";
import type { useWalletModals } from "../hooks/useWalletModals";

interface WalletSecondaryModalsHubProps {
  modals: ReturnType<typeof useWalletModals>;
}

export const WalletSecondaryModalsHub: React.FC<WalletSecondaryModalsHubProps> = ({
  modals,
}) => {
  return (
    <>
      {/* Bank Account Management */}
      <ChangeBankAccountModal
        open={modals.changeBankOpen}
        onClose={() => modals.setChangeBankOpen(false)}
        onSubmit={modals.handleStartBankVerification}
      />
      <VerifyingBankModal open={modals.verifyingBankOpen} />
      <BankVerificationPendingModal
        open={modals.bankPendingOpen}
        bank={modals.newBank}
        acctNo={modals.newAcctNo}
        acctName={modals.newAcctName}
        onClose={() => modals.setBankPendingOpen(false)}
      />
      <BankVerificationFailedModal
        open={modals.bankFailedOpen}
        onClose={() => modals.setBankFailedOpen(false)}
        onRetry={() => {
          modals.setBankFailedOpen(false);
          modals.setChangeBankOpen(true);
        }}
      />

      {/* Transaction Details */}
      <TxnDetailMarginModal
        open={modals.marginDetailOpen}
        txn={modals.selectedTxn}
        onClose={() => modals.setMarginDetailOpen(false)}
      />
      <TxnDetailCommissionModal
        open={modals.commissionDetailOpen}
        txn={modals.selectedTxn}
        onClose={() => modals.setCommissionDetailOpen(false)}
      />
      <TxnDetailPayoutModal
        open={modals.payoutDetailOpen}
        txn={modals.selectedTxn}
        onClose={() => modals.setPayoutDetailOpen(false)}
      />
      <TxnDetailSimOrderModal
        open={modals.simOrderDetailOpen}
        txn={modals.selectedTxn}
        onClose={() => modals.setSimOrderDetailOpen(false)}
      />
      <TxnDetailBalancePayModal
        open={modals.balancePayDetailOpen}
        txn={modals.selectedTxn}
        onClose={() => modals.setBalancePayDetailOpen(false)}
      />
      <TxnDetailFailedPayoutModal
        open={modals.failedPayoutDetailOpen}
        txn={modals.selectedTxn}
        onClose={() => modals.setFailedPayoutDetailOpen(false)}
        onRetry={() => {
          modals.setFailedPayoutDetailOpen(false);
          modals.setPayoutModalOpen(true);
        }}
      />

      {/* Statement & Payouts History */}
      <DownloadStatementModal
        open={modals.statementModalOpen}
        onClose={() => modals.setStatementModalOpen(false)}
        onGenerate={modals.handleGenerateStatement}
      />
      <GeneratingStatementModal open={modals.generatingStatementOpen} />
      <StatementReadyModal
        open={modals.statementReadyOpen}
        onClose={() => modals.setStatementReadyOpen(false)}
        onDownload={() => modals.setStatementReadyOpen(false)}
      />
      <AllPayoutsHistoryModal
        open={modals.allPayoutsOpen}
        onClose={() => modals.setAllPayoutsOpen(false)}
        onSelectPayout={modals.handleSelectPayoutFromLedger}
      />
    </>
  );
};
