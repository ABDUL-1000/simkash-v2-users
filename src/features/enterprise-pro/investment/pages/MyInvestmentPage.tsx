import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { colors } from "@/constants/colors";
import { Repeat, CreditCard, FileSpreadsheet } from "lucide-react";
import { InvestmentHeaderCards } from "../components/InvestmentHeaderCards";
import { BalanceStatusBanner } from "../components/BalanceStatusBanner";
import { InvestmentTabsNav } from "../components/InvestmentTabsNav";
import { OverviewTab } from "../components/overview/OverviewTab";
import { CommissionTableTab } from "../components/commission/CommissionTableTab";
import { ReinvestTab } from "../components/reinvest/ReinvestTab";
import { PayDownBalanceTab } from "../components/paydown/PayDownBalanceTab";
import { InvestmentModalsHub } from "../components/InvestmentModalsHub";
import { InvestmentAlertModalsHub } from "../components/InvestmentAlertModalsHub";
import { useInvestmentModals } from "../hooks/useInvestmentModals";
import type { InvestmentTabKey, ScCommissionItem } from "../types";

export default function MyInvestmentPage() {
  const [activeTab, setActiveTab] = useState<InvestmentTabKey>("overview");
  const m = useInvestmentModals();

  const handleSelectSc = (sc: ScCommissionItem) => {
    m.setSelectedSc(sc);
    m.setScDetailOpen(true);
  };

  const handleEditRate = (sc: ScCommissionItem) => {
    m.setSelectedSc(sc);
    m.setRateEditOpen(true);
  };

  const handleReviewRateChange = (data: any) => {
    m.setRateReviewData(data);
    m.setRateEditOpen(false);
    m.setConfirmRateOpen(true);
  };

  const handleConfirmReinvestOrder = () => {
    m.setReinvestConfirmOpen(false);
    m.setReinvestProcessingOpen(true);
    setTimeout(() => {
      m.setReinvestProcessingOpen(false);
      m.setReinvestSuccessOpen(true);
    }, 1000);
  };

  const handleConfirmPaydown = () => {
    m.setPaydownConfirmOpen(false);
    m.setPaydownProcessingOpen(true);
    setTimeout(() => {
      m.setPaydownProcessingOpen(false);
      m.setPaydownSuccessOpen(true);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="My Investment"
        description="Track principal capital, cumulative earnings, coordinator commissions, stock reinvestments, and debt amortization."
        extra={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => m.setExportInvestmentOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition shadow-xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-gray-500" />
              <span>Full Report</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("pay-down")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition shadow-xs"
            >
              <CreditCard className="w-3.5 h-3.5 text-gray-500" />
              <span>Pay Down Balance</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("reinvest")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: colors.primary }}
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Reinvest Stock</span>
            </button>
          </div>
        }
      />

      <InvestmentHeaderCards onReinvestClick={() => setActiveTab("reinvest")} />
      <BalanceStatusBanner onPayDownClick={() => setActiveTab("pay-down")} />
      <InvestmentTabsNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "overview" && (
        <OverviewTab onOrderMoreSims={() => setActiveTab("reinvest")} />
      )}
      {activeTab === "commission" && (
        <CommissionTableTab
          onSelectSc={handleSelectSc}
          onEditRate={handleEditRate}
          onExportReport={() => m.setExportOpen(true)}
        />
      )}
      {activeTab === "reinvest" && (
        <ReinvestTab
          onInitiateOrder={(data) => {
            m.setReinvestOrderData(data);
            m.setReinvestConfirmOpen(true);
          }}
        />
      )}
      {activeTab === "pay-down" && (
        <PayDownBalanceTab
          onInitiatePayment={(data) => {
            m.setPaydownPaymentData(data);
            m.setPaydownConfirmOpen(true);
          }}
        />
      )}

      <InvestmentModalsHub
        exportOpen={m.exportOpen}
        setExportOpen={m.setExportOpen}
        exportSuccessOpen={m.exportSuccessOpen}
        setExportSuccessOpen={m.setExportSuccessOpen}
        exportFileName={m.exportFileName}
        scDetailOpen={m.scDetailOpen}
        setScDetailOpen={m.setScDetailOpen}
        selectedSc={m.selectedSc}
        rateEditOpen={m.rateEditOpen}
        setRateEditOpen={m.setRateEditOpen}
        rateReviewData={m.rateReviewData}
        confirmRateOpen={m.confirmRateOpen}
        setConfirmRateOpen={m.setConfirmRateOpen}
        rateSuccessOpen={m.rateSuccessOpen}
        setRateSuccessOpen={m.setRateSuccessOpen}
        reinvestConfirmOpen={m.reinvestConfirmOpen}
        setReinvestConfirmOpen={m.setReinvestConfirmOpen}
        reinvestOrderData={m.reinvestOrderData}
        reinvestProcessingOpen={m.reinvestProcessingOpen}
        reinvestSuccessOpen={m.reinvestSuccessOpen}
        setReinvestSuccessOpen={m.setReinvestSuccessOpen}
        reinvestFailedOpen={m.reinvestFailedOpen}
        setReinvestFailedOpen={m.setReinvestFailedOpen}
        insufficientOpen={m.insufficientOpen}
        setInsufficientOpen={m.setInsufficientOpen}
        paydownConfirmOpen={m.paydownConfirmOpen}
        setPaydownConfirmOpen={m.setPaydownConfirmOpen}
        paydownPaymentData={m.paydownPaymentData}
        paydownProcessingOpen={m.paydownProcessingOpen}
        paydownSuccessOpen={m.paydownSuccessOpen}
        setPaydownSuccessOpen={m.setPaydownSuccessOpen}
        paydownFailedOpen={m.paydownFailedOpen}
        setPaydownFailedOpen={m.setPaydownFailedOpen}
        onEditRate={handleEditRate}
        onReviewRateChange={handleReviewRateChange}
        onConfirmRateChange={() => {
          m.setConfirmRateOpen(false);
          m.setRateSuccessOpen(true);
        }}
        onConfirmReinvestOrder={handleConfirmReinvestOrder}
        onConfirmPaydown={handleConfirmPaydown}
        onExportSuccess={(name) => {
          m.setExportFileName(name);
          m.setExportSuccessOpen(true);
        }}
      />

      <InvestmentAlertModalsHub
        periodDetailOpen={m.periodDetailOpen}
        setPeriodDetailOpen={m.setPeriodDetailOpen}
        orderDetailOpen={m.orderDetailOpen}
        setOrderDetailOpen={m.setOrderDetailOpen}
        exportInvestmentOpen={m.exportInvestmentOpen}
        setExportInvestmentOpen={m.setExportInvestmentOpen}
        overdueOpen={m.overdueOpen}
        setOverdueOpen={m.setOverdueOpen}
        priceUpdateOpen={m.priceUpdateOpen}
        setPriceUpdateOpen={m.setPriceUpdateOpen}
        onPayWhatICan={() => setActiveTab("pay-down")}
      />
    </div>
  );
}
