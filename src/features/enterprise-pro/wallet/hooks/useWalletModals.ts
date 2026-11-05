import { useState } from "react";
import { useSaveEnterprisePayoutAccount } from '../api/useEnterpriseWallet';
import { openNotification } from '@/utils/notifications';
import type { SavedPayoutAccount } from '../types/api';
import type { TransactionItem, PayoutRecord } from "../types";

const mask = (accountNumber: string) => `****${accountNumber.slice(-4)}`;

export function useWalletModals(initialPayoutOpen = false) {
  const [bankResult, setBankResult] = useState<SavedPayoutAccount | null>(null);
  const saveBank = useSaveEnterprisePayoutAccount();
  // Payout Flow
  const [payoutModalOpen, setPayoutModalOpen] = useState(initialPayoutOpen);

  // Withdraw profit to main wallet
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  // Bank Management Flow
  const [changeBankOpen, setChangeBankOpen] = useState(false);
  const [verifyingBankOpen, setVerifyingBankOpen] = useState(false);
  const [bankPendingOpen, setBankPendingOpen] = useState(false);
  const [newBank, setNewBank] = useState("");
  const [newAcctNo, setNewAcctNo] = useState("");
  const [newAcctName, setNewAcctName] = useState("");

  // Transaction detail & all payouts
  const [selectedTxn, setSelectedTxn] = useState<TransactionItem | null>(null);
  const [allPayoutsOpen, setAllPayoutsOpen] = useState(false);

  // Flow Handlers
  const handleStartBankVerification = (bank: string, acctNo: string, acctName: string, bankCode: string) => {
    if (saveBank.isPending) return;
    if (!bank.trim() || !bankCode.trim() || !/^\d{10}$/.test(acctNo) || !acctName.trim()) { openNotification({ state: "error", title: "Invalid bank account", description: "Enter a bank name, bank code, ten-digit account number and account name." }); return; }
    setNewBank(bank); setNewAcctNo(acctNo); setNewAcctName(acctName); setChangeBankOpen(false); setVerifyingBankOpen(true);
    saveBank.mutate({ bank_name: bank, bank_code: bankCode, account_number: acctNo, account_name: acctName }, {
      onSuccess: (result) => { setBankResult({ bank_name: result.bank_name, account_number: result.account_number, account_number_masked: mask(result.account_number ?? ""), account_name: result.account_name, status: "Saved" }); setBankPendingOpen(true); },
      onError: () => setChangeBankOpen(true),
      onSettled: () => setVerifyingBankOpen(false),
    });
  };
  const handleSelectPayoutFromLedger = (item: PayoutRecord) => {
    setAllPayoutsOpen(false);
    setSelectedTxn({ id: item.id, ref: item.reference, category: "payout", categoryLabel: "Payout", title: "Payout", subtitle: item.account, time: item.date, dateGroup: item.date, createdAt: "", amount: item.amount, amountFormatted: item.amountFormatted, isOutflow: true, status: item.status });
  };

  return {
    bankResult,
    isBusy: saveBank.isPending,
    payoutModalOpen, setPayoutModalOpen,

    withdrawOpen, setWithdrawOpen,

    changeBankOpen, setChangeBankOpen,
    verifyingBankOpen,
    bankPendingOpen, setBankPendingOpen,
    newBank, newAcctNo, newAcctName, handleStartBankVerification,

    selectedTxn, setSelectedTxn, handleSelectPayoutFromLedger,
    allPayoutsOpen, setAllPayoutsOpen,
  };
}
