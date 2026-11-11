import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { ProductCard as ProductCardData } from "../types/api";
import { ProductCard } from "./ProductCard";

export function FeaturedProductsSection({ products, isLoading, title = "Featured Products", action }: { products: ProductCardData[]; isLoading: boolean; title?: string; action?: React.ReactNode }) {
  if (isLoading) return <CardGridSkeleton count={3} />;
  if (!products.length) return title === "Featured Products" ? <AppEmptyState title="No featured products" description="Featured products will appear here when available." /> : null;
  return <section className="space-y-3">
    <div className="flex items-center justify-between gap-2"><h2 className="text-base font-bold text-[#0F152A]">{title}</h2>{action}</div>
    <div className="flex gap-4 overflow-x-auto pb-2">{products.map((product) => <ProductCard key={product.id} product={product} compact className="w-[250px] shrink-0" />)}</div>
  </section>;
}
