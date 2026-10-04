import { useNavigate } from "react-router-dom";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { ProductItem } from "../types/api";

export function FeaturedProductsSection({ products, isLoading, onOrder }: { products: ProductItem[]; isLoading: boolean; onOrder: (product: ProductItem) => void }) {
  const navigate = useNavigate();
  if (isLoading) return <CardGridSkeleton count={3} />;
  if (!products.length) return <AppEmptyState title="No featured products" description="Featured products will appear here when available." />;
  return <section className="space-y-3"><h2 className="text-base font-bold text-[#0F152A]">Featured Products</h2><div className="flex gap-4 overflow-x-auto pb-2">{products.slice(0, 3).map((product) => <article key={product.id} className="w-[250px] shrink-0 overflow-hidden rounded-2xl border border-[#E2ECF6] bg-white shadow-xs"><button type="button" onClick={() => navigate(`/marketplace/${product.id}`)} className="block w-full text-left"><img src={product.primaryImage || product.images?.[0]} alt={product.name} className="h-36 w-full bg-slate-50 object-cover" /><div className="space-y-1 p-3"><p className="text-[10px] font-semibold text-[#8C909B]">{product.categoryName}</p><h3 className="line-clamp-1 text-sm font-bold text-[#0F152A]">{product.name}</h3><p className="font-extrabold text-[#0F152A]">₦{product.price.toLocaleString("en-NG")}</p></div></button><div className="px-3 pb-3"><button type="button" disabled={!product.inStock} onClick={() => onOrder(product)} className="w-full rounded-lg bg-[#2563EB] py-2 text-xs font-bold text-white disabled:bg-slate-300">{product.inStock ? "Order Now" : "Out of Stock"}</button></div></article>)}</div></section>;
}
