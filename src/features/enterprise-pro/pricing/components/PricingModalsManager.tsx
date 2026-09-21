import React from "react";
import type { CommissionRecord, RetailPriceConfig } from "../types";
import { ScRowDetailModal } from "../modals/ScRowDetailModal";
import { PriceChangeSimulatorModal } from "../modals/PriceChangeSimulatorModal";
import { SaveRetailPricesModal } from "../modals/SaveRetailPricesModal";
import { SavingPricesLoaderModal } from "../modals/SavingPricesLoaderModal";
import { PricesUpdatedSuccessModal } from "../modals/PricesUpdatedSuccessModal";
import { SaveScRatesModal } from "../modals/SaveScRatesModal";
import { ScRatesUpdatedSuccessModal } from "../modals/ScRatesUpdatedSuccessModal";
import { SaveApRatesModal } from "../modals/SaveApRatesModal";
import { ApRatesUpdatedSuccessModal } from "../modals/ApRatesUpdatedSuccessModal";
import { ExportPricingReportModal } from "../modals/ExportPricingReportModal";
import { GeneratingPricingReportModal } from "../modals/GeneratingPricingReportModal";

export interface PricingModalsState {
  selectedRecord: CommissionRecord | null;
  isOpenRowDetail: boolean;
  isOpenSimulator: boolean;
  isOpenSavePrices: boolean;
  isOpenSavingPrices: boolean;
  isOpenPricesUpdated: boolean;
  isOpenSaveScRates: boolean;
  isOpenScRatesUpdated: boolean;
  isOpenSaveApRates: boolean;
  isOpenApRatesUpdated: boolean;
  isOpenExport: boolean;
  isOpenGeneratingExport: boolean;
  exportConfig: { scope: string; format: string; period: string } | null;
}

interface PricingModalsManagerProps {
  state: PricingModalsState;
  onUpdateState: (patch: Partial<PricingModalsState>) => void;
  retailPrices: RetailPriceConfig[];
  onApplySimulatorPrice?: (simType: string, price: number) => void;
  onDistributeStock?: (sc: CommissionRecord) => void;
  onSetScRate?: (sc: CommissionRecord) => void;
}

export const PricingModalsManager: React.FC<PricingModalsManagerProps> = ({
  state,
  onUpdateState,
  retailPrices,
  onApplySimulatorPrice,
  onDistributeStock,
  onSetScRate,
}) => {
  return (
    <>
      <ScRowDetailModal
        open={state.isOpenRowDetail}
        onOpenChange={(open) => onUpdateState({ isOpenRowDetail: open })}
        record={state.selectedRecord}
        onDistributeStock={onDistributeStock}
        onSetScRate={onSetScRate}
      />

      <PriceChangeSimulatorModal
        open={state.isOpenSimulator}
        onOpenChange={(open) => onUpdateState({ isOpenSimulator: open })}
        onApplyPrice={onApplySimulatorPrice}
      />

      <SaveRetailPricesModal
        open={state.isOpenSavePrices}
        onOpenChange={(open) => onUpdateState({ isOpenSavePrices: open })}
        prices={retailPrices}
        onConfirmSave={() => onUpdateState({ isOpenSavingPrices: true })}
      />

      <SavingPricesLoaderModal
        open={state.isOpenSavingPrices}
        onOpenChange={(open) => onUpdateState({ isOpenSavingPrices: open })}
        onComplete={() => onUpdateState({ isOpenPricesUpdated: true })}
      />

      <PricesUpdatedSuccessModal
        open={state.isOpenPricesUpdated}
        onOpenChange={(open) => onUpdateState({ isOpenPricesUpdated: open })}
        prices={retailPrices}
      />

      <SaveScRatesModal
        open={state.isOpenSaveScRates}
        onOpenChange={(open) => onUpdateState({ isOpenSaveScRates: open })}
        onConfirmSave={() => onUpdateState({ isOpenScRatesUpdated: true })}
      />

      <ScRatesUpdatedSuccessModal
        open={state.isOpenScRatesUpdated}
        onOpenChange={(open) => onUpdateState({ isOpenScRatesUpdated: open })}
      />

      <SaveApRatesModal
        open={state.isOpenSaveApRates}
        onOpenChange={(open) => onUpdateState({ isOpenSaveApRates: open })}
        onConfirmSave={() => onUpdateState({ isOpenApRatesUpdated: true })}
      />

      <ApRatesUpdatedSuccessModal
        open={state.isOpenApRatesUpdated}
        onOpenChange={(open) => onUpdateState({ isOpenApRatesUpdated: open })}
      />

      <ExportPricingReportModal
        open={state.isOpenExport}
        onOpenChange={(open) => onUpdateState({ isOpenExport: open })}
        onStartExport={(cfg) => onUpdateState({ exportConfig: cfg, isOpenGeneratingExport: true })}
      />

      <GeneratingPricingReportModal
        open={state.isOpenGeneratingExport}
        onOpenChange={(open) => onUpdateState({ isOpenGeneratingExport: open })}
        config={state.exportConfig}
      />
    </>
  );
};
