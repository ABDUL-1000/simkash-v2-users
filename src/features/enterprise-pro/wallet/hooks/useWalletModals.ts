import { useState } from "react";
import { useEnterpriseWalletData } from './useEnterpriseWalletData';
import { useRequestEnterprisePayout, useSaveEnterprisePayoutAccount } from '../api/useEnterpriseWallet';
import { openNotification } from '@/utils/notifications';
import type { SavedPayoutAccount, WalletActionResult } from '../types/api';
import type { TransactionItem, PayoutRecord } from "../types";

const mask = (accountNumber: string) => `****${accountNumber.slice(-4)}`;

export function useWalletModals(initialPayoutOpen = false) {
  const { walletBalance, bankAccount, overview, account } = useEnterpriseWalletData();
  const [payoutResult, setPayoutResult] = useState<WalletActionResult | null>(null);
  const [bankResult, setBankResult] = useState<SavedPayoutAccount | null>(null);
  const payout = useRequestEnterprisePayout();
  const saveBank = useSaveEnterprisePayoutAccount();
  const validateAmount = (amount: number) => {
    if (!overview.data || overview.isError || !Number.isFinite(amount) || amount <= 0 || amount > walletBalance.totalBalance) {
      openNotification({ state: "error", title: "Invalid amount", description: "Enter an amount within your available profit balance." }); return false;
    }
    return true;
  };
  // Payout Flow
  const [payoutModalOpen, setPayoutModalOpen] = useState(initialPayoutOpen);
  const [processingPayoutOpen, setProcessingPayoutOpen] = useState(false);
  const [payoutPendingOpen, setPayoutPendingOpen] = useState(false);
  const [payoutApprovedOpen, setPayoutApprovedOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(0);

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
  const handleStartPayout = (amount: number, notes?: string) => {
    if (payout.isPending || !validateAmount(amount)) return;
    if (!bankAccount.isSet || account.isError) { openNotification({ state: "error", title: "Payout account required", description: "Save a bank account before requesting a payout." }); return; }
    setPayoutAmount(amount); setPayoutModalOpen(false); setProcessingPayoutOpen(true);
    payout.mutate({ amount, ...(notes?.trim() ? { notes: notes.trim() } : {}) }, {
      onSuccess: (result) => {
        setPayoutResult({ reference: result.reference, amount: result.amount, amount_formatted: `₦${Number(result.amount).toLocaleString()}`, bank_name: result.bank_name, account_number_masked: mask(result.account_number ?? ""), account_name: result.account_name, status: result.status });
        if (["paid", "approved", "completed", "successful"].includes(result.status?.toLowerCase() ?? "")) setPayoutApprovedOpen(true);
        else setPayoutPendingOpen(true);
      },
      onError: () => setPayoutModalOpen(true),
      onSettled: () => setProcessingPayoutOpen(false),
    });
  };
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
    payoutResult, bankResult,
    isBusy: payout.isPending || saveBank.isPending,
    payoutModalOpen, setPayoutModalOpen,
    processingPayoutOpen,
    payoutPendingOpen, setPayoutPendingOpen,
    payoutApprovedOpen, setPayoutApprovedOpen,
    payoutAmount, handleStartPayout,

    withdrawOpen, setWithdrawOpen,

    changeBankOpen, setChangeBankOpen,
    verifyingBankOpen,
    bankPendingOpen, setBankPendingOpen,
    newBank, newAcctNo, newAcctName, handleStartBankVerification,

    selectedTxn, setSelectedTxn, handleSelectPayoutFromLedger,
    allPayoutsOpen, setAllPayoutsOpen,
  };
}
