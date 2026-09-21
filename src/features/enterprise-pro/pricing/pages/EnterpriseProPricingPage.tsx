import React from "react";
import { useNavigate } from "react-router-dom";
import { Download, SlidersHorizontal } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { PricingMetricCards } from "../components/PricingMetricCards";
import { PricingTabsNav } from "../components/PricingTabsNav";
import { CommissionTableTabView } from "../components/CommissionTableTab/CommissionTableTabView";
import { SetRetailPricesTabView } from "../components/SetRetailPricesTab/SetRetailPricesTabView";
import { ScCommissionRatesTabView } from "../components/ScCommissionRatesTab/ScCommissionRatesTabView";
import { ApCommissionRatesTabView } from "../components/ApCommissionRatesTab/ApCommissionRatesTabView";
import { PricingModalsManager } from "../components/PricingModalsManager";
import { mockPricingKPIs } from "../data/mockPricingKPIs";
import { usePricingState } from "../hooks/usePricingState";

export const EnterpriseProPricingPage: React.FC = () => {
  const navigate = useNavigate();
  const {
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
  } = usePricingState();

  return (
    <div className="space-y-6 pb-12">
      {/* Master Page Header */}
      <PageHeader
        title="Commission & Pricing"
        description="Control your retail prices, set SC and AP commission rates and view your full commission ledger"
        actions={[
          {
            key: "export",
            label: "Export Commission Report",
            icon: <Download className="w-4 h-4" />,
            variant: "default",
            onClick: () => updateModalState({ isOpenExport: true }),
          },
          {
            key: "update_prices",
            label: "Update Retail Prices",
            icon: <SlidersHorizontal className="w-4 h-4" />,
            style: { backgroundColor: "#2563EB", color: "#FFFFFF" },
            onClick: () => setActiveTab("set_retail_prices"),
          },
        ]}
      />

      {/* Top 4 KPI Metrics Strip */}
      <PricingMetricCards kpis={mockPricingKPIs} />

      {/* 4 Sub-Tabs Navigation */}
      <PricingTabsNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab 1: My Commission Table */}
      {activeTab === "commission_table" && (
        <CommissionTableTabView
          data={commissionRecords}
          onSelectRecord={(rec) => updateModalState({ selectedRecord: rec, isOpenRowDetail: true })}
          onUpdateRetailPrices={() => setActiveTab("set_retail_prices")}
          onAdjustScRates={() => setActiveTab("sc_commission_rates")}
          onExportCommissionTable={() => updateModalState({ isOpenExport: true })}
          onReinstateSc={() => navigate(appPaths.enterpriseProNetwork)}
        />
      )}

      {/* Tab 2: Set Retail Prices */}
      {activeTab === "set_retail_prices" && (
        <SetRetailPricesTabView
          prices={retailPrices}
          onChangePrice={handlePriceChange}
          onResetPrices={handleResetPrices}
          onSavePrices={() => updateModalState({ isOpenSavePrices: true })}
          hasChanges={hasPriceChanges}
        />
      )}

      {/* Tab 3: SC Commission Rates */}
      {activeTab === "sc_commission_rates" && (
        <ScCommissionRatesTabView
          coordinators={scRates}
          onChangeRate={handleScRateChange}
          bulkApply={bulkApplySc}
          onToggleBulkApply={setBulkApplySc}
          onResetAll={handleResetScRates}
          onSaveAll={() => updateModalState({ isOpenSaveScRates: true })}
          hasChanges={hasScRateChanges}
        />
      )}

      {/* Tab 4: AP Commission Rates */}
      {activeTab === "ap_commission_rates" && (
        <ApCommissionRatesTabView
          apRates={apRates}
          onChangeRate={handleApRateChange}
          onToggleMode={handleToggleApMode}
          onSaveApRates={() => updateModalState({ isOpenSaveApRates: true })}
          onCopyScRates={() => {
            handleApRateChange("", 0);
            updateModalState({ isOpenApRatesUpdated: true });
          }}
          onViewRateHistory={() => updateModalState({ isOpenExport: true })}
          onExportApReport={() => updateModalState({ isOpenExport: true })}
          hasChanges={hasApRateChanges}
        />
      )}

      {/* All 11 Modals Orchestrator */}
      <PricingModalsManager
        state={modalState}
        onUpdateState={updateModalState}
        retailPrices={retailPrices}
        onApplySimulatorPrice={(_, price) => {
          handlePriceChange("pos", price - retailPrices[0].currentRetail);
          updateModalState({ isOpenSavePrices: true });
        }}
        onDistributeStock={(rec) =>
          navigate(`${appPaths.enterpriseProSimDistribute}?scId=${rec.id}`)
        }
        onSetScRate={() => {
          setActiveTab("sc_commission_rates");
        }}
      />
    </div>
  );
};

export default EnterpriseProPricingPage;
