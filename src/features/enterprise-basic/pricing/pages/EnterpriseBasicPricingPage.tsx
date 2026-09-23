import React, { useState } from "react";
import { Sliders, Download } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import {
  mockPricingKpis,
  mockSimPnLItems,
  mockCctvPnLItems,
  mockSolarPnLItems,
} from "../data/mockEbPricingData";
import { EbPricingKpiStrip } from "../components/EbPricingKpiStrip";
import { EbPricingCategoryTabs } from "../components/EbPricingCategoryTabs";
import { EbMultiCategoryPnLTable } from "../components/EbMultiCategoryPnLTable";
import { EbCategoryPnLChart } from "../components/EbCategoryPnLChart";
import { EbPricingOverviewSidebar } from "../components/EbPricingOverviewSidebar";
import { SetRetailPricesModal } from "../modals/SetRetailPricesModal";
import { CommissionPnLSummaryModal } from "../../modals/CommissionPnLSummaryModal";
import type { PricingCategory, CategoryPnLItem } from "../types";

export const EnterpriseBasicPricingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<PricingCategory>("all");
  const [selectedItem, setSelectedItem] = useState<CategoryPnLItem | null>(null);
  const [isOpenPriceModal, setIsOpenPriceModal] = useState(false);
  const [isOpenSummaryModal, setIsOpenSummaryModal] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      {/* Top PageHeader */}
      <PageHeader
        title="Commission & Pricing"
        description="Direct wholesale vs retail pricing and category-level P&L tracking"
        actions={[
          {
            key: "export_pricing",
            label: "Export Report",
            icon: <Download className="w-4 h-4" />,
            variant: "outline",
            onClick: () => setIsOpenSummaryModal(true),
          },
          {
            key: "update_prices",
            label: "Update Retail Prices",
            icon: <Sliders className="w-4 h-4" />,
            variant: "default",
            onClick: () => {
              setSelectedItem(mockSimPnLItems[0]);
              setIsOpenPriceModal(true);
            },
          },
        ]}
      />

      {/* KPI Strip */}
      <EbPricingKpiStrip kpis={mockPricingKpis} />

      {/* Category Tabs */}
      <EbPricingCategoryTabs
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 2-Column Responsive Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <EbMultiCategoryPnLTable
            category={activeCategory}
            simItems={mockSimPnLItems}
            cctvItems={mockCctvPnLItems}
            solarItems={mockSolarPnLItems}
            onSetPrice={(item) => {
              setSelectedItem(item);
              setIsOpenPriceModal(true);
            }}
          />
        </div>

        {/* Right Column (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          <EbCategoryPnLChart />
          <EbPricingOverviewSidebar
            onSetPrices={(cat) => {
              const target = cat === "cctv" ? mockCctvPnLItems[0] : cat === "solar" ? mockSolarPnLItems[0] : mockSimPnLItems[0];
              setSelectedItem(target);
              setIsOpenPriceModal(true);
            }}
            onExportReport={() => setIsOpenSummaryModal(true)}
          />
        </div>
      </div>

      {/* Modals */}
      <SetRetailPricesModal
        open={isOpenPriceModal}
        onOpenChange={setIsOpenPriceModal}
        item={selectedItem}
        onPriceSaved={() => setIsOpenPriceModal(false)}
      />

      <CommissionPnLSummaryModal
        open={isOpenSummaryModal}
        onOpenChange={setIsOpenSummaryModal}
      />
    </div>
  );
};

export default EnterpriseBasicPricingPage;
