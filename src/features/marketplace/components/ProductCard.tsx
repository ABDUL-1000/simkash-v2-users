import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useAddToCart, useToggleWishlist } from "../api";
import type { ProductCard as ProductCardData } from "../types/api";
import { naira } from "../utils";


export function Stars({ value, size = "size-3" }: { value: number; size?: string }) {
  return <span className="inline-flex items-center gap-0.5">{[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`${size} ${value >= n - 0.25 ? "fill-[#F59E0B] text-[#F59E0B]" : value >= n - 0.75 ? "fill-[#F59E0B]/50 text-[#F59E0B]" : "text-[#CBD5E1]"}`} />)}</span>;
}

/** Product card used across the store (featured, catalogue, related, recently viewed, wishlist). */
export function ProductCard({ product, compact = false, className = "" }: { product: ProductCardData; compact?: boolean; className?: string }) {
  const navigate = useNavigate();
  const addToCart = useAddToCart();
  const wishlist = useToggleWishlist();
  const image = product.primaryImage || product.images?.[0];
  const stockTone = product.stockStatus === "out_of_stock" ? "text-[#EF4444]" : product.stockStatus === "low_stock" ? "text-[#D9990D]" : "text-[#10B981]";
  const stockText = !product.inStock ? "Out of stock" : product.stockStatus === "low_stock" ? `Only ${product.stock} left` : "In stock";
  return (
    <article className={`relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E2ECF6] bg-white shadow-xs ${className}`}>
      <button type="button" aria-label={product.isWishlisted ? "Remove from wishlist" : "Add to wishlist"} disabled={wishlist.isPending}
        onClick={() => wishlist.mutate({ productId: product.id, wishlisted: product.isWishlisted })}
        className="absolute right-2.5 top-2.5 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 shadow-xs hover:bg-white">
        <Heart className={`size-4 ${product.isWishlisted ? "fill-[#EF4444] text-[#EF4444]" : "text-[#66738C]"}`} />
      </button>
      {product.discountPercent ? <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-[#EF4444] px-1.5 py-0.5 text-[10px] font-bold text-white">{product.discountPercent}% OFF</span> : null}
      <button type="button" onClick={() => navigate(`/marketplace/${product.id}`)} className="text-left">
        {image ? <img src={image} alt={product.name} className={`${compact ? "h-36" : "h-44"} w-full bg-slate-50 object-cover`} /> : <div className={`${compact ? "h-36" : "h-44"} w-full bg-slate-50`} />}
        <div className={`space-y-1 ${compact ? "p-3" : "p-4"}`}>
          <p className="truncate text-[10px] font-semibold text-[#8C909B]">{product.category?.name ?? product.brand ?? "Simkash"}</p>
          <h3 className={`${compact ? "line-clamp-1" : "line-clamp-2"} text-sm font-bold text-[#0F152A]`}>{product.name}</h3>
          {product.rating?.count > 0 && <p className="flex items-center gap-1 text-[10px] text-[#8C909B]"><Stars value={product.rating.average} /> ({product.rating.count})</p>}
          {(product.badges?.easyBuy || product.badges?.installation) && <div className="flex flex-wrap gap-1 pt-0.5">
            {product.badges.easyBuy && <span className="rounded-md bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">EasyBuy</span>}
            {product.badges.installation && <span className="rounded-md bg-[#EBFFF8] px-1.5 py-0.5 text-[9px] font-bold text-[#10B981]">Installation available</span>}
          </div>}
          <div className="flex items-end justify-between gap-2 pt-1.5">
            <div>
              {product.compareAtPrice ? <span className="block text-[10px] font-semibold text-[#8C909B] line-through">{naira(product.compareAtPrice)}</span> : null}
              <span className="text-base font-extrabold text-[#0F152A]">{naira(product.price)}</span>
            </div>
            <span className={`text-[10px] font-bold ${stockTone}`}>{stockText}</span>
          </div>
        </div>
      </button>
      <div className={`mt-auto ${compact ? "px-3 pb-3" : "p-4 pt-0"}`}>
        <button type="button" disabled={!product.inStock || addToCart.isPending} onClick={() => addToCart.mutate({ productId: product.id, quantity: 1 })}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300">
          <ShoppingCart className="size-3.5" />{!product.inStock ? "Out of Stock" : addToCart.isPending ? "Adding…" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
