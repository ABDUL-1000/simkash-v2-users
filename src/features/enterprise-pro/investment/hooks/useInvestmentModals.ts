import { useState } from "react";
import type { ScCommissionItem, ReinvestSimProduct } from "../types";

export function useInvestmentModals() {
  const [exportOpen, setExportOpen] = useState(false);
  const [exportSuccessOpen, setExportSuccessOpen] = useState(false);
  const [exportFileName, setExportFileName] = useState("commission_report_jun2026.xlsx");

  const [scDetailOpen, setScDetailOpen] = useState(false);
  const [selectedSc, setSelectedSc] = useState<ScCommissionItem | null>(null);

  const [rateEditOpen, setRateEditOpen] = useState(false);
  const [rateReviewData, setRateReviewData] = useState<{
    coordinator: ScCommissionItem;
    newRate: number;
    effectiveDate: string;
    reason: string;
  } | null>(null);
  const [confirmRateOpen, setConfirmRateOpen] = useState(false);
  const [rateSuccessOpen, setRateSuccessOpen] = useState(false);

  // Reinvest modals
  const [reinvestConfirmOpen, setReinvestConfirmOpen] = useState(false);
  const [reinvestOrderData, setReinvestOrderData] = useState<{
    product: ReinvestSimProduct;
    quantity: number;
    sc: { id: string; scName: string; state: string };
    totalCost: number;
    note: string;
  } | null>(null);
  const [reinvestProcessingOpen, setReinvestProcessingOpen] = useState(false);
  const [reinvestSuccessOpen, setReinvestSuccessOpen] = useState(false);
  const [reinvestFailedOpen, setReinvestFailedOpen] = useState(false);
  const [insufficientOpen, setInsufficientOpen] = useState(false);

  // Paydown modals
  const [paydownConfirmOpen, setPaydownConfirmOpen] = useState(false);
  const [paydownPaymentData, setPaydownPaymentData] = useState<{
    amount: number;
    source: string;
    pin: string;
  } | null>(null);
  const [paydownProcessingOpen, setPaydownProcessingOpen] = useState(false);
  const [paydownSuccessOpen, setPaydownSuccessOpen] = useState(false);
  const [paydownFailedOpen, setPaydownFailedOpen] = useState(false);

  // Image 3 Modals state
  const [periodDetailOpen, setPeriodDetailOpen] = useState(false);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [exportInvestmentOpen, setExportInvestmentOpen] = useState(false);
  const [overdueOpen, setOverdueOpen] = useState(false);
  const [priceUpdateOpen, setPriceUpdateOpen] = useState(false);

  return {
    exportOpen, setExportOpen,
    exportSuccessOpen, setExportSuccessOpen,
    exportFileName, setExportFileName,
    scDetailOpen, setScDetailOpen,
    selectedSc, setSelectedSc,
    rateEditOpen, setRateEditOpen,
    rateReviewData, setRateReviewData,
    confirmRateOpen, setConfirmRateOpen,
    rateSuccessOpen, setRateSuccessOpen,
    reinvestConfirmOpen, setReinvestConfirmOpen,
    reinvestOrderData, setReinvestOrderData,
    reinvestProcessingOpen, setReinvestProcessingOpen,
    reinvestSuccessOpen, setReinvestSuccessOpen,
    reinvestFailedOpen, setReinvestFailedOpen,
    insufficientOpen, setInsufficientOpen,
    paydownConfirmOpen, setPaydownConfirmOpen,
    paydownPaymentData, setPaydownPaymentData,
    paydownProcessingOpen, setPaydownProcessingOpen,
    paydownSuccessOpen, setPaydownSuccessOpen,
    paydownFailedOpen, setPaydownFailedOpen,
    periodDetailOpen, setPeriodDetailOpen,
    orderDetailOpen, setOrderDetailOpen,
    exportInvestmentOpen, setExportInvestmentOpen,
    overdueOpen, setOverdueOpen,
    priceUpdateOpen, setPriceUpdateOpen,
  };
}
