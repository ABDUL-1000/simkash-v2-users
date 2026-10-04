import { useNavigate } from "react-router-dom";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import type { ProductItem } from "../types/api";

export function ProductCatalogGrid({ products, isLoading, onOrder }: { products: ProductItem[]; isLoading: boolean; onOrder: (product: ProductItem) => void }) {
  const navigate = useNavigate();
  if (isLoading) return <CardGridSkeleton count={8} />;
  if (!products.length) return <AppEmptyState title="No products found" description="Try another category or search term." />;
  return <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <article key={product.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E2ECF6] bg-white shadow-xs"><button type="button" onClick={() => navigate(`/marketplace/${product.id}`)} className="text-left"><img src={product.primaryImage || product.images?.[0]} alt={product.name} className="h-44 w-full bg-slate-50 object-cover" /><div className="space-y-1 p-4"><p className="text-[10px] font-semibold text-[#8C909B]">{product.categoryName}</p><h3 className="line-clamp-2 text-sm font-bold text-[#0F152A]">{product.name}</h3><p className="line-clamp-2 text-xs text-[#66738C]">{product.description}</p><div className="flex items-center justify-between pt-2"><span className="text-base font-extrabold text-[#0F152A]">₦{product.price.toLocaleString("en-NG")}</span><span className={`text-[10px] font-bold ${product.inStock ? "text-[#10B981]" : "text-[#EF4444]"}`}>{product.inStock ? `${product.stock} in stock` : "Out of stock"}</span></div></div></button><div className="mt-auto p-4 pt-0"><button type="button" disabled={!product.inStock} onClick={() => onOrder(product)} className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300">Buy with Wallet</button></div></article>)}</div>;
}
