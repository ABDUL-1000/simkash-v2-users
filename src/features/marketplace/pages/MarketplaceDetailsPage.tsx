import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { appPaths } from "@/app/router/paths";

import { MarketplaceDetailsHeader } from "../components/details/MarketplaceDetailsHeader";
import { ProductInformationCard } from "../components/details/ProductInformationCard";
import { PricingCard } from "../components/details/PricingCard";
import { SalesHistoryCard } from "../components/details/SalesHistoryCard";
import { InventoryCard } from "../components/details/InventoryCard";
import { ReviewsRatingsCard } from "../components/details/ReviewsRatingsCard";
import { VendorProfileCard } from "../components/details/VendorProfileCard";
import { RelatedProductsCard } from "../components/details/RelatedProductsCard";
import { MarketplaceQuickActionsCard } from "../components/details/MarketplaceQuickActionsCard";

import { EditProductModal } from "../Modals/EditProductModal";

export default function MarketplaceDetailsPage() {
  const { id } = useParams();
    console.log(id)

  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.marketplace)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Marketplace</span>
        </button>
      </div>

      {/* Main Details Header */}
      <MarketplaceDetailsHeader
        title="Hikvision DS-2CD2143G2 — 4MP Outdoor CCTV Camera"
        sku="HK-DS2143G2"
        category="CCTV Cameras"
        onEdit={() => setActiveModal("edit_product")}
      />

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1: Left */}
        <div className="space-y-6 min-w-0">
          <ProductInformationCard />
          <PricingCard />
          <SalesHistoryCard />
        </div>

        {/* Column 2: Center */}
        <div className="space-y-6 min-w-0">
          <InventoryCard />
          <ReviewsRatingsCard />
        </div>

        {/* Column 3: Right */}
        <div className="space-y-6 min-w-0">
          <VendorProfileCard />
          <RelatedProductsCard />
          <MarketplaceQuickActionsCard
            onEdit={() => setActiveModal("edit_product")}
          />
        </div>
      </div>

      {/* Action Modals */}
      <EditProductModal
        open={activeModal === "edit_product"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        productName="Hikvision DS-2CD2143G2"
      />
    </div>
  );
}
