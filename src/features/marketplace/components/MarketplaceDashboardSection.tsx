import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { appPaths } from "@/app/router/paths";
import { useGetMarketplaceOverview } from "../api/useGetMarketplaceOverview";
import { MarketplaceStatsCards } from "./MarketplaceStatsCards";
import { FeaturedProductsSection } from "./FeaturedProductsSection";
import { CheckoutModal } from "../Modals/CheckoutModal";
import type { ProductItem } from "../types/api";
import { useState } from "react";

export function MarketplaceDashboardSection() {
  const overview = useGetMarketplaceOverview();
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  return <section className="space-y-4"><div className="flex items-center justify-between"><div><h2 className="text-base font-bold text-[#0F152A]">Marketplace</h2><p className="text-xs text-[#8C909B]">Shop products and track your orders</p></div><Link to={appPaths.marketplace} className="flex items-center gap-1 text-xs font-semibold text-[#2563EB]">Browse <ArrowRight className="size-3.5" /></Link></div>
    {overview.isLoading ? <CardGridSkeleton count={3} /> : <><MarketplaceStatsCards stats={overview.overview?.userOrderStats} compact /><FeaturedProductsSection products={overview.overview?.featuredProducts ?? []} isLoading={false} onOrder={setSelectedProduct} /></>}
    <CheckoutModal open={Boolean(selectedProduct)} product={selectedProduct} onClose={() => setSelectedProduct(null)} />
  </section>;
}
