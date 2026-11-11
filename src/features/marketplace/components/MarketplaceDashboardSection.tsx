import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { appPaths } from "@/app/router/paths";
import { useGetFeaturedProducts, useOrderStats } from "../api";
import { MarketplaceStatsCards } from "./MarketplaceStatsCards";
import { FeaturedProductsSection } from "./FeaturedProductsSection";

export function MarketplaceDashboardSection() {
  const stats = useOrderStats();
  const featured = useGetFeaturedProducts(4);
  return <section className="space-y-4"><div className="flex items-center justify-between"><div><h2 className="text-base font-bold text-[#0F152A]">Marketplace</h2><p className="text-xs text-[#8C909B]">Shop products and track your orders</p></div><Link to={appPaths.marketplace} className="flex items-center gap-1 text-xs font-semibold text-[#2563EB]">Browse <ArrowRight className="size-3.5" /></Link></div>
    {stats.isLoading || featured.isLoading ? <CardGridSkeleton count={3} /> : <><MarketplaceStatsCards stats={stats.stats} compact /><FeaturedProductsSection products={featured.products} isLoading={false} /></>}
  </section>;
}
