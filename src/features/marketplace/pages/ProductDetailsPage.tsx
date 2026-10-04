import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { appPaths } from "@/app/router/paths";
import { useGetProductDetail } from "../api/useGetProductDetail";
import { CheckoutModal } from "../Modals/CheckoutModal";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const query = useGetProductDetail(id);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const product = query.product;

  if (query.isLoading) return <div className="mx-auto max-w-6xl animate-pulse space-y-5 p-4 sm:p-6"><div className="h-8 w-48 rounded bg-slate-100" /><div className="grid gap-6 md:grid-cols-2"><div className="h-80 rounded-2xl bg-slate-100" /><div className="h-80 rounded-2xl bg-slate-100" /></div></div>;
  if (!product) return <div className="p-6"><AppEmptyState title="Product not found" description="This product may no longer be available." actionText="Back to Marketplace" onAction={() => navigate(appPaths.marketplace)} /></div>;

  return <div className="mx-auto max-w-6xl space-y-5 p-4 sm:p-6">
    <button type="button" onClick={() => navigate(appPaths.marketplace)} className="flex items-center gap-2 text-xs font-semibold text-[#66738C]"><ArrowLeft className="size-4" /> Marketplace</button>
    <div className="grid gap-6 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs md:grid-cols-2 md:p-6">
      <img src={product.primaryImage || product.images?.[0]} alt={product.name} className="h-72 w-full rounded-xl bg-slate-50 object-cover sm:h-96" />
      <div className="flex flex-col"><p className="text-xs font-semibold text-[#8C909B]">{product.categoryName}</p><h1 className="mt-2 text-2xl font-extrabold text-[#0F152A]">{product.name}</h1><p className="mt-4 text-sm leading-relaxed text-[#66738C]">{product.description}</p><p className="mt-6 text-2xl font-black text-[#0F152A]">₦{product.price.toLocaleString("en-NG")}</p><p className={`mt-2 text-xs font-bold ${product.inStock ? "text-[#10B981]" : "text-[#EF4444]"}`}>{product.inStock ? `${product.stock} available` : "Currently out of stock"}</p><button type="button" disabled={!product.inStock} onClick={() => setCheckoutOpen(true)} className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-sm font-bold text-white disabled:bg-slate-300"><ShoppingBag className="size-4" /> Buy with Wallet</button></div>
    </div>
    <CheckoutModal open={checkoutOpen} product={product} onClose={() => setCheckoutOpen(false)} />
  </div>;
}
