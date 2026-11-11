import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Heart, Minus, Plus, ShoppingBag, ShoppingCart, ThumbsUp } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { appPaths } from "@/app/router/paths";
import { useAddToCart, useGetProductDetail, useGetProductReviews, useToggleReviewHelpful, useToggleWishlist } from "../api";
import { FeaturedProductsSection } from "../components/FeaturedProductsSection";
import { Stars } from "../components/ProductCard";
import { naira } from "../utils";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const query = useGetProductDetail(id);
  const product = query.product;
  const [quantity, setQuantity] = useState(1);
  const [withInstallation, setWithInstallation] = useState(false);
  const [image, setImage] = useState<string>();
  const [reviewSort, setReviewSort] = useState<"newest" | "most_helpful">("newest");
  const [reviewPage, setReviewPage] = useState(1);
  const reviews = useGetProductReviews(id, reviewSort, reviewPage);
  const helpful = useToggleReviewHelpful();
  const addToCart = useAddToCart();
  const wishlist = useToggleWishlist();

  if (query.isLoading) return <div className="mx-auto max-w-6xl animate-pulse space-y-5 p-4 sm:p-6"><div className="h-8 w-48 rounded bg-slate-100" /><div className="grid gap-6 md:grid-cols-2"><div className="h-80 rounded-2xl bg-slate-100" /><div className="h-80 rounded-2xl bg-slate-100" /></div></div>;
  if (!product) return <div className="p-6"><AppEmptyState title="Product not found" description={query.error?.message ?? "This product may no longer be available."} actionText="Back to Marketplace" onAction={() => navigate(appPaths.marketplace)} /></div>;

  const maxQty = Math.max(1, Math.min(product.maxPurchaseQuantity || product.stock || 1, product.stock || 1));
  const installation = product.addOns?.installation;
  const add = (thenCheckout: boolean) => addToCart.mutate(
    { productId: product.id, quantity, withInstallation: Boolean(installation?.available && withInstallation) },
    { onSuccess: () => { if (thenCheckout) navigate("/marketplace/checkout"); } },
  );
  const mainImage = image ?? product.primaryImage ?? product.images?.[0];
  const summary = product.reviewSummary;
  const list = reviews.data?.reviews ?? [];

  return <div className="mx-auto max-w-6xl space-y-5 p-4 sm:p-6">
    <button type="button" onClick={() => navigate(appPaths.marketplace)} className="flex items-center gap-2 text-xs font-semibold text-[#66738C]"><ArrowLeft className="size-4" /> Marketplace</button>
    <div className="grid gap-6 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs md:grid-cols-2 md:p-6">
      <div className="space-y-2">
        {mainImage ? <img src={mainImage} alt={product.name} className="h-72 w-full rounded-xl bg-slate-50 object-cover sm:h-96" /> : <div className="h-72 rounded-xl bg-slate-50 sm:h-96" />}
        {product.images?.length > 1 && <div className="flex gap-2 overflow-x-auto">{product.images.map((src) => <button key={src} type="button" onClick={() => setImage(src)}><img src={src} alt="" className={`size-14 rounded-lg object-cover ${src === mainImage ? "ring-2 ring-[#2563EB]" : ""}`} /></button>)}</div>}
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-semibold text-[#8C909B]">{product.category?.name}{product.brand ? ` · ${product.brand}` : ""}</p>
        <h1 className="mt-2 text-2xl font-extrabold text-[#0F152A]">{product.name}</h1>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#8C909B]"><Stars value={summary?.averageRating ?? product.rating.average} /> {summary?.totalReviews ?? product.rating.count} reviews · Sold by <b className="text-[#0F152A]">{product.seller?.name ?? "Simkash"}</b>{product.seller?.verified && <CheckCircle2 className="size-3 text-[#10B981]" />}</p>
        <div className="mt-4 flex items-end gap-2">
          <p className="text-2xl font-black text-[#0F152A]">{naira(product.price)}</p>
          {product.compareAtPrice ? <p className="pb-1 text-sm font-semibold text-[#8C909B] line-through">{naira(product.compareAtPrice)}</p> : null}
          {product.discountPercent ? <span className="mb-1 rounded-md bg-[#EF4444] px-1.5 py-0.5 text-[10px] font-bold text-white">{product.discountPercent}% OFF</span> : null}
        </div>
        <p className={`mt-2 text-xs font-bold ${product.inStock ? (product.stockStatus === "low_stock" ? "text-[#D9990D]" : "text-[#10B981]") : "text-[#EF4444]"}`}>{product.stockMessage?.label ?? (product.inStock ? "In stock" : "Out of stock")}</p>
        {product.delivery?.promises?.length > 0 && <ul className="mt-3 space-y-1 text-xs text-[#66738C]">{product.delivery.promises.map((p) => <li key={p.key} className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-[#10B981]" />{p.label}</li>)}</ul>}

        {installation?.available && <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-[#E2ECF6] p-3 text-xs">
          <input type="checkbox" checked={withInstallation} onChange={(e) => setWithInstallation(e.target.checked)} className="mt-0.5" />
          <span><b className="text-[#0F152A]">{installation.label || "Book Professional Installation"}{installation.fee ? ` · ${naira(installation.fee)}` : ""}</b><span className="block text-[#8C909B]">{installation.description}</span></span>
        </label>}

        <div className="mt-4 rounded-xl bg-[#F8FAFC] p-3 text-[11px] text-[#66738C] space-y-1">
          <p className="font-bold text-[#0F152A]">How would you like to pay?</p>
          {product.paymentOptions?.wallet?.available && <p>Simkash Wallet · balance {naira(product.paymentOptions.wallet.balance)}{product.paymentOptions.wallet.sufficient === false ? " (insufficient)" : ""}</p>}
          <p>Card · {product.paymentOptions?.card?.label ?? "Visa, Mastercard, Verve"}</p>
          {product.paymentOptions?.easyBuy?.eligible && <p>EasyBuy available{product.paymentOptions.easyBuy.note ? ` · ${product.paymentOptions.easyBuy.note}` : ""}</p>}
          <p className="text-[10px]">You choose how to pay at checkout.</p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center rounded-xl border border-[#E2ECF6]">
            <button type="button" aria-label="Decrease" disabled={quantity <= 1} onClick={() => setQuantity((q) => q - 1)} className="p-2 disabled:opacity-40"><Minus className="size-3.5" /></button>
            <span className="w-8 text-center text-sm font-bold">{quantity}</span>
            <button type="button" aria-label="Increase" disabled={quantity >= maxQty} onClick={() => setQuantity((q) => q + 1)} className="p-2 disabled:opacity-40"><Plus className="size-3.5" /></button>
          </div>
          <button type="button" aria-label="Wishlist" onClick={() => wishlist.mutate({ productId: product.id, wishlisted: product.isWishlisted })} className="rounded-xl border border-[#E2ECF6] p-2.5"><Heart className={`size-4 ${product.isWishlisted ? "fill-[#EF4444] text-[#EF4444]" : "text-[#66738C]"}`} /></button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" disabled={!product.inStock || addToCart.isPending} onClick={() => add(false)} className="flex items-center justify-center gap-2 rounded-xl border border-[#2563EB] py-3 text-sm font-bold text-[#2563EB] disabled:opacity-50"><ShoppingCart className="size-4" /> Add to Cart</button>
          <button type="button" disabled={!product.inStock || addToCart.isPending} onClick={() => add(true)} className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-sm font-bold text-white disabled:bg-slate-300"><ShoppingBag className="size-4" /> Buy Now</button>
        </div>
      </div>
    </div>

    {(product.description || product.specifications?.length > 0) && <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs md:p-6 space-y-3">
      <h2 className="text-sm font-bold text-[#0F152A]">About This Product</h2>
      {product.description && <p className="text-sm leading-relaxed text-[#66738C]">{product.description}</p>}
      {product.specifications?.length > 0 && <div className="divide-y divide-[#E2ECF6] rounded-xl border border-[#E2ECF6] text-xs">{product.specifications.map((spec) => <div key={spec.key} className="flex justify-between gap-3 px-3 py-2"><span className="text-[#8C909B]">{spec.key}</span><span className="text-right font-semibold text-[#0F152A]">{spec.value}</span></div>)}</div>}
    </div>}

    <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs md:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-[#0F152A]">Reviews ({summary?.totalReviews ?? 0})</h2>
        <select value={reviewSort} onChange={(e) => { setReviewSort(e.target.value as "newest" | "most_helpful"); setReviewPage(1); }} className="rounded-lg border border-[#E2ECF6] px-2 py-1 text-xs"><option value="newest">Newest</option><option value="most_helpful">Most helpful</option></select>
      </div>
      {summary && summary.totalReviews > 0 && <div className="flex flex-wrap items-center gap-6">
        <div><p className="text-3xl font-black text-[#0F152A]">{summary.averageRating.toFixed(1)}</p><Stars value={summary.averageRating} /></div>
        <div className="flex-1 space-y-1 text-[10px]">{(["5", "4", "3", "2", "1"] as const).map((star) => { const count = summary.distribution?.[star] ?? 0; return <div key={star} className="flex items-center gap-2"><span className="w-3">{star}</span><div className="h-1.5 flex-1 rounded bg-slate-100"><div className="h-full rounded bg-[#F59E0B]" style={{ width: `${summary.totalReviews ? (count / summary.totalReviews) * 100 : 0}%` }} /></div><span className="w-6 text-right text-[#8C909B]">{count}</span></div>; })}</div>
      </div>}
      {list.length === 0 ? <p className="text-xs text-[#8C909B]">No reviews yet. Customers with a delivered order can review this product.</p> :
        <div className="divide-y divide-[#E2ECF6]">{list.map((review) => <div key={review.id} className="space-y-1 py-3 text-xs">
          <div className="flex items-center justify-between"><span className="font-bold text-[#0F152A]">{review.reviewer}</span><span className="text-[#8C909B]">{new Date(review.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span></div>
          <Stars value={review.rating} />
          {review.comment && <p className="text-[#66738C]">{review.comment}</p>}
          {!review.isOwn && <button type="button" disabled={helpful.isPending} onClick={() => helpful.mutate(review.id)} className={`flex items-center gap-1 text-[11px] font-bold ${review.isHelpful ? "text-[#2563EB]" : "text-[#8C909B]"}`}><ThumbsUp className="size-3" /> Helpful ({review.helpfulCount})</button>}
        </div>)}</div>}
      {reviews.data?.pagination?.hasNextPage && <button type="button" onClick={() => setReviewPage((p) => p + 1)} className="text-xs font-bold text-[#2563EB]">More reviews</button>}
    </div>

    {product.relatedProducts?.length > 0 && <FeaturedProductsSection title="You May Also Like" products={product.relatedProducts} isLoading={false} />}
  </div>;
}
