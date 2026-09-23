import { useState, useMemo } from "react";
import type { EbPaymentModel, EbDashboardMetrics, EbSaleItem, AssignSimFormData } from "../types";
import { mockUpfrontMetrics, mockFinancedMetrics, mockInstalmentSchedule } from "../data/mockEbMetrics";
import { mockRecentSales } from "../data/mockEbSales";

export interface EbModalsState {
  isOpenAssignSim: boolean;
  isOpenPnLSummary: boolean;
  isOpenInstalment: boolean;
  isOpenPayout: boolean;
  isOpenPayoutPending: boolean;
  isOpenNotifications: boolean;
  payoutRef: string;
  payoutAmount: number;
}

export function useEnterpriseBasicState() {
  const [paymentModel, setPaymentModel] = useState<EbPaymentModel>("upfront");
  const [sales, setSales] = useState<EbSaleItem[]>(mockRecentSales);
  const [walletBalance, setWalletBalance] = useState<number>(1247000);
  const [balanceRemaining, setBalanceRemaining] = useState<number>(4200000);
  const [balancePaid, setBalancePaid] = useState<number>(5800000);
  const [instalmentSchedule, setInstalmentSchedule] = useState(mockInstalmentSchedule);

  const [modalState, setModalState] = useState<EbModalsState>({
    isOpenAssignSim: false,
    isOpenPnLSummary: false,
    isOpenInstalment: false,
    isOpenPayout: false,
    isOpenPayoutPending: false,
    isOpenNotifications: false,
    payoutRef: "POUT-EB-2026-00847",
    payoutAmount: 1247000,
  });

  const updateModalState = (patch: Partial<EbModalsState>) => {
    setModalState((prev) => ({ ...prev, ...patch }));
  };

  const metrics: EbDashboardMetrics = useMemo(() => {
    const base = paymentModel === "upfront" ? mockUpfrontMetrics : mockFinancedMetrics;
    return {
      ...base,
      walletBalance,
      balanceRemaining: paymentModel === "upfront" ? 0 : balanceRemaining,
      balancePaid: paymentModel === "upfront" ? 10000000 : balancePaid,
    };
  }, [paymentModel, walletBalance, balanceRemaining, balancePaid]);

  const handleAssignSim = (formData: AssignSimFormData) => {
    const newSale: EbSaleItem = {
      id: `sale-${Date.now()}`,
      customerName: formData.customerName,
      initials: formData.customerName.slice(0, 2).toUpperCase(),
      phone: formData.customerPhone,
      itemType: "SIM",
      itemDetail: `SIM: ${formData.simNumber} · ${formData.simType} · ${formData.network}`,
      margin: formData.margin,
      timestamp: "Just now",
    };
    setSales((prev) => [newSale, ...prev]);
    setWalletBalance((prev) => prev + formData.margin);
    updateModalState({ isOpenAssignSim: false });
  };

  const handlePayInstalment = (amount: number) => {
    setBalanceRemaining((prev) => Math.max(0, prev - amount));
    setBalancePaid((prev) => prev + amount);
    setWalletBalance((prev) => Math.max(0, prev - amount));
    setInstalmentSchedule((prev) =>
      prev.map((item, idx) => (idx === 1 ? { ...item, status: "paid" } : item))
    );
    updateModalState({ isOpenInstalment: false });
  };

  const handleRequestPayout = (amount: number) => {
    const ref = `POUT-EB-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setModalState((prev) => ({
      ...prev,
      isOpenPayout: false,
      isOpenPayoutPending: true,
      payoutAmount: amount,
      payoutRef: ref,
    }));
  };

  return {
    paymentModel,
    setPaymentModel,
    metrics,
    sales,
    instalmentSchedule,
    modalState,
    updateModalState,
    handleAssignSim,
    handlePayInstalment,
    handleRequestPayout,
  };
}
