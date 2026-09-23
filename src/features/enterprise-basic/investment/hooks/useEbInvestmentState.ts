import { useState } from "react";
import type {
  AccountTier,
  InvestmentTabKey,
  EbInvestmentModalState,
  SimPnLDetail,
  InstalmentPeriod,
} from "../types";
import {
  tierOverviewData,
  mockInstalmentPeriods,
  mockRecentPayments,
  mockSimPnLList,
} from "../data/mockInvestmentData";

export const useEbInvestmentState = () => {
  const [accountTier, setAccountTier] = useState<AccountTier>("financed");
  const [activeTab, setActiveTab] = useState<InvestmentTabKey>("overview");
  const [walletBalance, setWalletBalance] = useState(1247000);
  const [balanceRemaining, setBalanceRemaining] = useState(4200000);
  const [balancePaid, setBalancePaid] = useState(5800000);
  const [instalmentSchedule, setInstalmentSchedule] =
    useState<InstalmentPeriod[]>(mockInstalmentPeriods);

  const [modalState, setModalState] = useState<EbInvestmentModalState>({
    isOpenConfirmInstalment: false,
    isOpenConfirmExtra: false,
    isOpenProcessing: false,
    isOpenSuccessInstalment: false,
    isOpenSuccessExtra: false,
    isOpenFailed: false,
    isOpenExport: false,
    isOpenGeneratingReport: false,
    isOpenSimDetail: false,
    selectedSimDetail: mockSimPnLList[0],
    lastPaymentAmount: 350000,
    receiptRef: "INS-EB-2026-00847",
  });

  const updateModalState = (partial: Partial<EbInvestmentModalState>) => {
    setModalState((prev) => ({ ...prev, ...partial }));
  };

  const overview = tierOverviewData[accountTier];

  const handlePayInstalment = (_amount: number) => {
    updateModalState({ isOpenConfirmInstalment: false, isOpenProcessing: true });
    setTimeout(() => {
      setWalletBalance((prev) => Math.max(0, prev - 350000));
      setBalanceRemaining((prev) => Math.max(0, prev - 350000));
      setBalancePaid((prev) => prev + 350000);
      setInstalmentSchedule((prev) =>
        prev.map((item) => (item.status === "due" ? { ...item, status: "paid" } : item))
      );
      updateModalState({
        isOpenProcessing: false,
        isOpenSuccessInstalment: true,
        lastPaymentAmount: 350000,
        receiptRef: `INS-EB-2026-00${Math.floor(100 + Math.random() * 900)}`,
      });
    }, 1200);
  };

  const handlePayExtra = (_amount: number) => {
    updateModalState({ isOpenConfirmExtra: false, isOpenProcessing: true });
    setTimeout(() => {
      setWalletBalance((prev) => Math.max(0, prev - 700000));
      setBalanceRemaining((prev) => Math.max(0, prev - 700000));
      setBalancePaid((prev) => prev + 700000);
      updateModalState({
        isOpenProcessing: false,
        isOpenSuccessExtra: true,
        lastPaymentAmount: 700000,
        receiptRef: `INS-EB-2026-00${Math.floor(100 + Math.random() * 900)}`,
      });
    }, 1200);
  };

  const handleOpenSimDetail = (sim: SimPnLDetail) => {
    updateModalState({
      selectedSimDetail: sim,
      isOpenSimDetail: true,
    });
  };

  return {
    accountTier,
    setAccountTier,
    activeTab,
    setActiveTab,
    overview,
    walletBalance,
    balanceRemaining,
    balancePaid,
    instalmentSchedule,
    recentPayments: mockRecentPayments,
    simPnLList: mockSimPnLList,
    modalState,
    updateModalState,
    handlePayInstalment,
    handlePayExtra,
    handleOpenSimDetail,
  };
};
