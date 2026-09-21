import { useState } from "react";
import { mockCommissionRecords } from "../data/mockCommissionData";
import { initialRetailPrices } from "../data/mockRetailPrices";
import { initialApRates } from "../data/mockApRates";
import type {
  PricingTabKey,
  CommissionRecord,
  RetailPriceConfig,
  ScCommissionRateItem,
  ApRateConfigItem,
} from "../types";
import type { PricingModalsState } from "../components/PricingModalsManager";

export const usePricingState = () => {
  const [activeTab, setActiveTab] = useState<PricingTabKey>("commission_table");

  // Datasets
  const [commissionRecords] = useState<CommissionRecord[]>(mockCommissionRecords);
  const [retailPrices, setRetailPrices] = useState<RetailPriceConfig[]>(initialRetailPrices);
  const [hasPriceChanges, setHasPriceChanges] = useState(false);

  // SC Commission Rates items
  const [scRates, setScRates] = useState<ScCommissionRateItem[]>(() =>
    mockCommissionRecords.map((c) => ({
      id: c.id,
      name: c.name,
      initials: c.initials,
      phone: c.phone,
      state: c.state,
      apsCount: c.apsCount,
      currentRate: c.scRate,
      monthlyEarned: c.scComm,
      youKeep: c.netEpMargin,
      activations: c.activations,
      isSuspended: c.isSuspended,
    }))
  );
  const [bulkApplySc, setBulkApplySc] = useState(false);
  const [hasScRateChanges, setHasScRateChanges] = useState(false);

  // AP Commission Rates items
  const [apRates, setApRates] = useState<ApRateConfigItem[]>(initialApRates);
  const [hasApRateChanges, setHasApRateChanges] = useState(false);

  // Modals state
  const [modalState, setModalState] = useState<PricingModalsState>({
    selectedRecord: null,
    isOpenRowDetail: false,
    isOpenSimulator: false,
    isOpenSavePrices: false,
    isOpenSavingPrices: false,
    isOpenPricesUpdated: false,
    isOpenSaveScRates: false,
    isOpenScRatesUpdated: false,
    isOpenSaveApRates: false,
    isOpenApRatesUpdated: false,
    isOpenExport: false,
    isOpenGeneratingExport: false,
    exportConfig: null,
  });

  const updateModalState = (patch: Partial<PricingModalsState>) => {
    setModalState((prev) => ({ ...prev, ...patch }));
  };

  const handlePriceChange = (id: string, delta: number) => {
    setRetailPrices((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, currentRetail: Math.max(p.wholesale, p.currentRetail + delta) } : p
      )
    );
    setHasPriceChanges(true);
  };

  const handleResetPrices = () => {
    setRetailPrices(initialRetailPrices);
    setHasPriceChanges(false);
  };

  const handleScRateChange = (id: string, newRate: number) => {
    if (bulkApplySc) {
      setScRates((prev) =>
        prev.map((sc) => {
          const earned = Math.round(sc.activations * 2000 * newRate);
          const keep = Math.round(sc.activations * 2000 * (1 - newRate));
          return { ...sc, currentRate: newRate, monthlyEarned: earned, youKeep: keep };
        })
      );
    } else {
      setScRates((prev) =>
        prev.map((sc) => {
          if (sc.id === id) {
            const earned = Math.round(sc.activations * 2000 * newRate);
            const keep = Math.round(sc.activations * 2000 * (1 - newRate));
            return { ...sc, currentRate: newRate, monthlyEarned: earned, youKeep: keep };
          }
          return sc;
        })
      );
    }
    setHasScRateChanges(true);
  };

  const handleResetScRates = () => {
    handleScRateChange("", 0.08);
    setHasScRateChanges(false);
  };

  const handleApRateChange = (id: string, delta: number) => {
    setApRates((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, rate: Math.max(100, item.rate + delta) } : item
      )
    );
    setHasApRateChanges(true);
  };

  const handleToggleApMode = (id: string, mode: "fixed" | "percentage") => {
    setApRates((prev) =>
      prev.map((item) => (item.id === id ? { ...item, mode } : item))
    );
    setHasApRateChanges(true);
  };

  return {
    activeTab,
    setActiveTab,
    commissionRecords,
    retailPrices,
    hasPriceChanges,
    scRates,
    bulkApplySc,
    setBulkApplySc,
    hasScRateChanges,
    apRates,
    hasApRateChanges,
    modalState,
    updateModalState,
    handlePriceChange,
    handleResetPrices,
    handleScRateChange,
    handleResetScRates,
    handleApRateChange,
    handleToggleApMode,
  };
};
