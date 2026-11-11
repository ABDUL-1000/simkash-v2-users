import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import type { ProductCard as ProductCardData } from "../types/api";
import { ProductCard } from "./ProductCard";

export function ProductCatalogGrid({ products, isLoading }: { products: ProductCardData[]; isLoading: boolean }) {
  if (isLoading) return <CardGridSkeleton count={8} />;
  if (!products.length) return <AppEmptyState title="No products found" description="Try another category, filter or search term." />;
  return <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
