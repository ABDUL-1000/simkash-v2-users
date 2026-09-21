import { useState } from "react";
import type { TransactionItem, PayoutRecord } from "../types";
import type { ReinvestType } from "../modals/ReinvestFlow/ReinvestSelectTypeModal";

export function useWalletModals() {
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
  const [newBank, setNewBank] = useState("Zenith Bank");
  const [newAcctNo, setNewAcctNo] = useState("2048914582");
  const [newAcctName, setNewAcctName] = useState("Zenith Corp Ltd");

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
  const handleStartPayout = (amount: number) => {
    setPayoutAmount(amount);
    setPayoutModalOpen(false);
    setProcessingPayoutOpen(true);
    setTimeout(() => {
      setProcessingPayoutOpen(false);
      if (amount > 500_000) {
        setPayoutPendingOpen(true);
      } else {
        setPayoutApprovedOpen(true);
      }
    }, 1200);
  };

  const handleStartReinvest = (type: ReinvestType, amount: number) => {
    setReinvestType(type);
    setReinvestAmount(amount);
    setReinvestSelectOpen(false);
    setConfirmReinvestOpen(true);
  };

  const handleConfirmReinvest = () => {
    setConfirmReinvestOpen(false);
    setProcessingReinvestOpen(true);
    setTimeout(() => {
      setProcessingReinvestOpen(false);
      setReinvestSuccessOpen(true);
    }, 1200);
  };

  const handleStartPayBalance = (amount: number) => {
    setPayBalanceAmount(amount);
    setPayBalanceOpen(false);
    setProcessingPayBalanceOpen(true);
    setTimeout(() => {
      setProcessingPayBalanceOpen(false);
      setPayBalanceSuccessOpen(true);
    }, 1200);
  };

  const handleStartBankVerification = (bank: string, acctNo: string, acctName: string) => {
    setNewBank(bank);
    setNewAcctNo(acctNo);
    setNewAcctName(acctName);
    setChangeBankOpen(false);
    setVerifyingBankOpen(true);
    setTimeout(() => {
      setVerifyingBankOpen(false);
      setBankPendingOpen(true);
    }, 1200);
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

  const handleSelectPayoutFromLedger = (payout: PayoutRecord) => {
    setAllPayoutsOpen(false);
    if (payout.status === "Failed") {
      setPayoutFailedOpen(true);
    } else {
      setPayoutAmount(payout.amount);
      setPayoutApprovedOpen(true);
    }
  };

  const handleGenerateStatement = () => {
    setStatementModalOpen(false);
    setGeneratingStatementOpen(true);
    setTimeout(() => {
      setGeneratingStatementOpen(false);
      setStatementReadyOpen(true);
    }, 1200);
  };

  return {
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
