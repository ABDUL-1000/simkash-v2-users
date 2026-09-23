import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, PackagePlus } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import {
  mockEbStockItems,
  mockEbCustomerSales,
  mockCustomerProductSummaries,
} from "../data/mockEbInventoryData";
import { EbInventoryStockCards } from "../components/EbInventoryStockCards";
import { EbCustomerSalesTable } from "../components/EbCustomerSalesTable";
import { EbCustomerProductStatusSidebar } from "../components/EbCustomerProductStatusSidebar";
import { EbQuickSellShortcuts } from "../components/EbQuickSellShortcuts";
import { OrderStockModal } from "../modals/OrderStockModal";
import { AssignSimModal } from "../../modals/AssignSimModal";

export const EnterpriseBasicInventoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenAssignModal, setIsOpenAssignModal] = useState(false);
  const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      {/* Top PageHeader */}
      <PageHeader
        title="Inventory"
        description="Monitor multi-product stock levels, wholesale orders, and direct customer sales."
        actions={[
          {
            key: "order_stock",
            label: "Order Stock",
            icon: <PackagePlus className="w-4 h-4" />,
            variant: "outline",
            onClick: () => setIsOpenOrderModal(true),
          },
          {
            key: "sell_customer",
            label: "Sell to Customers",
            icon: <ShoppingCart className="w-4 h-4" />,
            variant: "default",
            onClick: () => setIsOpenAssignModal(true),
          },
        ]}
      />

      {/* Multi-Product Stock Cards */}
      <EbInventoryStockCards
        items={mockEbStockItems}
        onSellProduct={() => setIsOpenAssignModal(true)}
      />

      {/* 2-Column Responsive Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <EbCustomerSalesTable
            sales={mockEbCustomerSales}
            onViewAllCustomers={() => navigate(appPaths.enterpriseBasicCustomers)}
          />
        </div>

        {/* Right Column (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          <EbQuickSellShortcuts onQuickSell={() => setIsOpenAssignModal(true)} />
          <EbCustomerProductStatusSidebar customers={mockCustomerProductSummaries} />
        </div>
      </div>

      {/* Modals */}
      <AssignSimModal
        open={isOpenAssignModal}
        onOpenChange={setIsOpenAssignModal}
        onAssignSubmitted={() => setIsOpenAssignModal(false)}
      />

      <OrderStockModal
        open={isOpenOrderModal}
        onOpenChange={setIsOpenOrderModal}
        onOrderSuccess={() => setIsOpenOrderModal(false)}
      />
    </div>
  );
};

export default EnterpriseBasicInventoryPage;
