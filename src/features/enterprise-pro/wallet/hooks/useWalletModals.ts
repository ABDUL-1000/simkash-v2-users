import { useEnterpriseWalletData } from './useEnterpriseWalletData';
import { useRequestEnterprisePayout } from '../api/useRequestEnterprisePayout';
import { useEnterpriseReinvestWallet } from '../api/useEnterpriseReinvestWallet';
import { useEnterprisePayBalanceWallet } from '../api/useEnterprisePayBalanceWallet';
import { useSaveEnterprisePayoutAccount } from '../api/useSaveEnterprisePayoutAccount';
import { useDownloadEnterpriseStatement } from '../api/useDownloadEnterpriseStatement';
import { openNotification } from '@/utils/notifications';
import type { WalletActionResult, EnterprisePayoutAccount } from '../types/api';
import { useState } from "react";
import type { TransactionItem, PayoutRecord } from "../types";
import type { ReinvestType } from "../modals/ReinvestFlow/ReinvestSelectTypeModal";

export function useWalletModals() {
  const { walletBalance, bankAccount, overview, account } = useEnterpriseWalletData();
  const [payoutResult, setPayoutResult] = useState<WalletActionResult | null>(null);
  const [reinvestResult, setReinvestResult] = useState<WalletActionResult | null>(null);
  const [paymentResult, setPaymentResult] = useState<WalletActionResult | null>(null);
  const [bankResult, setBankResult] = useState<EnterprisePayoutAccount | null>(null);
  const [actionError, setActionError] = useState("");
  const payout = useRequestEnterprisePayout();
  const reinvest = useEnterpriseReinvestWallet();
  const payment = useEnterprisePayBalanceWallet();
  const saveBank = useSaveEnterprisePayoutAccount();
  const statement = useDownloadEnterpriseStatement();
  const validateAmount = (amount: number, maximum = walletBalance.totalBalance) => {
    if (!overview.data || overview.isError || !Number.isFinite(amount) || amount <= 0 || amount > maximum) {
      openNotification({ state: "error", title: "Invalid amount", description: "Enter an amount within your available enterprise wallet balance." }); return false;
    }
    return true;
  };
  // Payout Flow
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [processingPayoutOpen, setProcessingPayoutOpen] = useState(false);
  const [payoutPendingOpen, setPayoutPendingOpen] = useState(false);
  const [payoutApprovedOpen, setPayoutApprovedOpen] = useState(false);
  const [payoutFailedOpen, setPayoutFailedOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(500_000);

  // Reinvestment Flow
  const [reinvestSelectOpen, setReinvestSelectOpen] = useState(false);
  const [confirmReinvestOpen, setConfirmReinvestOpen] = useState(false);
  const [processingReinvestOpen, setProcessingReinvestOpen] = useState(false);
  const [reinvestSuccessOpen, setReinvestSuccessOpen] = useState(false);
  const [insufficientEarningsOpen, setInsufficientEarningsOpen] = useState(false);
  const [reinvestType, setReinvestType] = useState<ReinvestType>("sim-stock");
  const [reinvestAmount, setReinvestAmount] = useState(1_000_000);

  // Pay Down Balance Flow
  const [payBalanceOpen, setPayBalanceOpen] = useState(false);
  const [processingPayBalanceOpen, setProcessingPayBalanceOpen] = useState(false);
  const [payBalanceSuccessOpen, setPayBalanceSuccessOpen] = useState(false);
  const [payBalanceAmount, setPayBalanceAmount] = useState(1_000_000);

  // Bank Management Flow
  const [changeBankOpen, setChangeBankOpen] = useState(false);
  const [verifyingBankOpen, setVerifyingBankOpen] = useState(false);
  const [bankPendingOpen, setBankPendingOpen] = useState(false);
  const [bankFailedOpen, setBankFailedOpen] = useState(false);
  const [newBank, setNewBank] = useState("");
  const [newAcctNo, setNewAcctNo] = useState("");
  const [newAcctName, setNewAcctName] = useState("");

  // Transaction Detail Modals
  const [selectedTxn, setSelectedTxn] = useState<TransactionItem | null>(null);
  const [marginDetailOpen, setMarginDetailOpen] = useState(false);
  const [commissionDetailOpen, setCommissionDetailOpen] = useState(false);
  const [payoutDetailOpen, setPayoutDetailOpen] = useState(false);
  const [simOrderDetailOpen, setSimOrderDetailOpen] = useState(false);
  const [balancePayDetailOpen, setBalancePayDetailOpen] = useState(false);
  const [failedPayoutDetailOpen, setFailedPayoutDetailOpen] = useState(false);

  // Statement & All Payouts
  const [statementModalOpen, setStatementModalOpen] = useState(false);
  const [generatingStatementOpen, setGeneratingStatementOpen] = useState(false);
  const [statementReadyOpen, setStatementReadyOpen] = useState(false);
  const [allPayoutsOpen, setAllPayoutsOpen] = useState(false);

  // Flow Handlers
  const handleStartPayout = (amount: number, notes?: string) => {
    if (payout.isPending || !validateAmount(amount)) return;
    if (!bankAccount.verified || account.isError) { openNotification({ state: "error", title: "Payout account required", description: "Save a verified bank account before requesting a payout." }); return; }
    setPayoutAmount(amount); setPayoutModalOpen(false); setProcessingPayoutOpen(true); setActionError("");
    payout.mutate({ amount, ...(notes?.trim() ? { notes: notes.trim() } : {}) }, {
      onSuccess: (...args) => {
        setPayoutResult(args[0]);
        if (["paid", "approved", "completed"].includes(args[0].status?.toLowerCase() ?? "")) setPayoutApprovedOpen(true);
        else setPayoutPendingOpen(true);
      },
      onError: (...args) => { setActionError(args[0].message); setPayoutModalOpen(true); },
      onSettled: (...args) => { void args; setProcessingPayoutOpen(false); },
    });
  };
  const handleStartReinvest = (type: ReinvestType, amount: number) => {
    if (type === "network-topup") { openNotification({ state: "info", title: "Network top-up", description: "Contact your account manager to arrange network top-ups." }); return; }
    if (!validateAmount(amount, type === "debt-payoff" ? Math.min(walletBalance.totalBalance, walletBalance.balanceRemaining) : walletBalance.totalBalance)) return;
    setReinvestType(type); setReinvestAmount(amount); setReinvestSelectOpen(false); setConfirmReinvestOpen(true);
  };
  const handleConfirmReinvest = () => {
    if (reinvest.isPending || payment.isPending || !validateAmount(reinvestAmount, reinvestType === "debt-payoff" ? Math.min(walletBalance.totalBalance, walletBalance.balanceRemaining) : walletBalance.totalBalance)) return;
    setConfirmReinvestOpen(false); setProcessingReinvestOpen(true); setActionError("");
    const callbacks = {
      onSuccess: (...args: [WalletActionResult, ...unknown[]]) => { setReinvestResult(args[0]); setReinvestSuccessOpen(true); },
      onError: (...args: [Error, ...unknown[]]) => { setActionError(args[0].message); setConfirmReinvestOpen(true); },
      onSettled: (...args: unknown[]) => { void args; setProcessingReinvestOpen(false); },
    };
    if (reinvestType === "debt-payoff") payment.mutate({ amount: reinvestAmount }, callbacks);
    else reinvest.mutate({ amount: reinvestAmount, destination: "stock" }, callbacks);
  };
  const handleStartPayBalance = (amount: number) => {
    if (payment.isPending || !validateAmount(amount, Math.min(walletBalance.balanceRemaining, walletBalance.totalBalance))) return;
    setPayBalanceAmount(amount); setPayBalanceOpen(false); setProcessingPayBalanceOpen(true); setActionError("");
    payment.mutate({ amount }, {
      onSuccess: (...args) => { setPaymentResult(args[0]); setPayBalanceSuccessOpen(true); },
      onError: (...args) => { setActionError(args[0].message); setPayBalanceOpen(true); },
      onSettled: (...args) => { void args; setProcessingPayBalanceOpen(false); },
    });
  };
  const handleStartBankVerification = (bank: string, acctNo: string, acctName: string, bankCode: string) => {
    if (saveBank.isPending) return;
    if (!bank.trim() || !bankCode.trim() || !/^\d{10}$/.test(acctNo) || !acctName.trim()) { openNotification({ state: "error", title: "Invalid bank account", description: "Enter a bank name, bank code, ten-digit account number and account name." }); return; }
    setNewBank(bank); setNewAcctNo(acctNo); setNewAcctName(acctName); setChangeBankOpen(false); setVerifyingBankOpen(true); setActionError("");
    saveBank.mutate({ bank_name: bank, bank_code: bankCode, account_number: acctNo, account_name: acctName }, {
      onSuccess: (...args) => { setBankResult(args[0]); setBankPendingOpen(true); },
      onError: (...args) => { setActionError(args[0].message); setChangeBankOpen(true); },
      onSettled: (...args) => { void args; setVerifyingBankOpen(false); },
    });
  };
  const handleSelectTransaction = (txn: TransactionItem) => {
    setSelectedTxn(txn);
    if (txn.type === "margin") setMarginDetailOpen(true);
    else if (txn.type === "commission") setCommissionDetailOpen(true);
    else if (txn.type === "payout") setPayoutDetailOpen(true);
    else if (txn.type === "sim-order") setSimOrderDetailOpen(true);
    else if (txn.type === "balance-pay") setBalancePayDetailOpen(true);
    else if (txn.type === "failed-payout") setFailedPayoutDetailOpen(true);
    else setMarginDetailOpen(true);
  };

  const handleSelectPayoutFromLedger = (item: PayoutRecord) => {
    setAllPayoutsOpen(false);
    handleSelectTransaction({ id: item.id, ref: "—", type: item.status.toLowerCase() === "failed" ? "failed-payout" : "payout", title: "Payout", subtitle: item.status, timeAgo: item.timeAgo, date: item.date, amount: item.amount, amountFormatted: item.amountFormatted, isOutflow: true, status: item.status });
  };
  const handleGenerateStatement = () => {
    if (statement.isPending) return;
    setGeneratingStatementOpen(true);
    statement.mutate(undefined, { onSettled: (...args) => { void args; setGeneratingStatementOpen(false); } });
  };

  return {
    payoutResult, reinvestResult, paymentResult, bankResult, actionError,
    isBusy: payout.isPending || reinvest.isPending || payment.isPending || saveBank.isPending || statement.isPending,
    payoutModalOpen, setPayoutModalOpen,
    processingPayoutOpen, setProcessingPayoutOpen,
    payoutPendingOpen, setPayoutPendingOpen,
    payoutApprovedOpen, setPayoutApprovedOpen,
    payoutFailedOpen, setPayoutFailedOpen,
    payoutAmount, handleStartPayout,

    reinvestSelectOpen, setReinvestSelectOpen,
    confirmReinvestOpen, setConfirmReinvestOpen,
    processingReinvestOpen, setProcessingReinvestOpen,
    reinvestSuccessOpen, setReinvestSuccessOpen,
    insufficientEarningsOpen, setInsufficientEarningsOpen,
    reinvestType, reinvestAmount, handleStartReinvest, handleConfirmReinvest,

    payBalanceOpen, setPayBalanceOpen,
    processingPayBalanceOpen, setProcessingPayBalanceOpen,
    payBalanceSuccessOpen, setPayBalanceSuccessOpen,
    payBalanceAmount, handleStartPayBalance,

    changeBankOpen, setChangeBankOpen,
    verifyingBankOpen, setVerifyingBankOpen,
    bankPendingOpen, setBankPendingOpen,
    bankFailedOpen, setBankFailedOpen,
    newBank, newAcctNo, newAcctName, handleStartBankVerification,

    selectedTxn, marginDetailOpen, setMarginDetailOpen,
    commissionDetailOpen, setCommissionDetailOpen,
    payoutDetailOpen, setPayoutDetailOpen,
    simOrderDetailOpen, setSimOrderDetailOpen,
    balancePayDetailOpen, setBalancePayDetailOpen,
    failedPayoutDetailOpen, setFailedPayoutDetailOpen,
    handleSelectTransaction, handleSelectPayoutFromLedger,

    statementModalOpen, setStatementModalOpen,
    generatingStatementOpen, setGeneratingStatementOpen,
    statementReadyOpen, setStatementReadyOpen,
    allPayoutsOpen, setAllPayoutsOpen,
    handleGenerateStatement,
  };
}
