import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus, Store, ShoppingCart, Users } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { DashboardStats } from "@/features/distribution/agency-partner/components/DashboardStat";

import { MarketplaceTable, type ProductRow } from "../components/MarketplaceTable";
import { RecentOrdersCard } from "../components/RecentOrdersCard";
import { TopProductsCard } from "../components/TopProductsCard";
import { RevenueByCategoryCard } from "../components/RevenueByCategoryCard";
import { MarketplaceRequiresAttentionCard } from "../components/MarketplaceRequiresAttentionCard";

import { AddProductModal } from "../Modals/AddProductModal";
import { EditProductModal } from "../Modals/EditProductModal";
import { ApproveVendorApplicationModal } from "../Modals/ApproveVendorApplicationModal";
import { RejectVendorApplicationModal } from "../Modals/RejectVendorApplicationModal";

const CATEGORY_PILLS = [
  { id: "all", label: "All" },
  { id: "cctv", label: "CCTV Cameras" },
  { id: "gps", label: "GPS Trackers" },
  { id: "solar", label: "Solar Solutions" },
  { id: "routers", label: "Routers" },
  { id: "accessories", label: "Accessories" },
  { id: "airtime_data", label: "Airtime & Data" },
];

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [activeCategoryPill, setActiveCategoryPill] = useState("all");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductRow | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <PageHeader
        title="Marketplace"
        description="Manage product catalogue, vendor listings, orders and fulfilment"
        actions={[
          {
            key: "add-product",
            label: "Add Product",
            icon: <Plus className="size-4" />,
            variant: "default",
            onClick: () => setActiveModal("add_product"),
          },
          {
            key: "manage-vendors",
            label: "Manage Vendors",
            icon: <Users className="size-4" />,
            variant: "outline",
            onClick: () => navigate(appPaths.vendorManagement),
          },
          {
            key: "orders",
            label: "Orders",
            icon: <ShoppingCart className="size-4" />,
            variant: "outline",
            onClick: () => navigate(appPaths.orders),
          },
          {
            key: "view-storefront",
            label: "View Storefront",
            icon: <Store className="size-4" />,
            variant: "outline",
          },
        ]}
      />

      {/* Top Metric Dashboard Stats */}
      <DashboardStats />

      {/* Category Filter Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-[#E2ECF8] bg-white p-2 shadow-xs">
        {CATEGORY_PILLS.map((pill) => {
          const isActive = activeCategoryPill === pill.id;
          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => setActiveCategoryPill(pill.id)}
              className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* Main Marketplace Product Catalogue Table */}
      <MarketplaceTable
        onSelectRow={(r) => setSelectedProduct(r)}
      />

      {/* 4 Bottom Analytics Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrdersCard onViewAll={() => navigate(appPaths.orders)} />
        <TopProductsCard />
        <RevenueByCategoryCard />
        <MarketplaceRequiresAttentionCard />
      </div>

      {/* Modals */}
      <AddProductModal
        open={activeModal === "add_product"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <EditProductModal
        open={activeModal === "edit_product"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        productName={selectedProduct?.name || "Hikvision DS-2CD2143G2"}
      />

      <ApproveVendorApplicationModal
        open={activeModal === "approve_vendor"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        onRejectClick={() => setActiveModal("reject_vendor")}
      />

      <RejectVendorApplicationModal
        open={activeModal === "reject_vendor"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </div>
  );
}
