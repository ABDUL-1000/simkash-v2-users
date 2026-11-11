import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, ShoppingCart, Trash2, Truck, Zap } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useApplyPromo, useGetCart, useRemoveCartItem, useRemovePromo, useUpdateCart, useUpdateCartItem } from "../api";
import { AddressBookModal } from "../Modals/AddressBookModal";
import { naira } from "../utils";
import type { CartIssue } from "../types/api";

const ISSUE_TEXT: Record<CartIssue, string> = {
  unavailable: "No longer available, remove to continue",
  out_of_stock: "Out of stock, remove to continue",
  insufficient_stock: "Not enough stock for this quantity",
  installation_unavailable: "Installation is no longer available for this item",
};

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, isLoading, error, refetch } = useGetCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const updateCart = useUpdateCart();
  const applyPromo = useApplyPromo();
  const removePromo = useRemovePromo();
  const [promoCode, setPromoCode] = useState("");
  const [addressOpen, setAddressOpen] = useState(false);
  const busy = updateItem.isPending || removeItem.isPending || updateCart.isPending;

  if (isLoading) return <div className="space-y-4 animate-pulse"><div className="h-8 w-40 rounded bg-slate-100" /><div className="h-64 rounded-2xl bg-slate-100" /></div>;
  if (error) return <AppEmptyState title="Couldn't load your cart" description={error.message} actionText="Retry" onAction={() => void refetch()} />;
  if (!cart || cart.items.length === 0) return <AppEmptyState icon={<ShoppingCart className="size-5" />} title="Your cart is empty" description="Browse the store and add items to your cart." actionText="Go to Marketplace" onAction={() => navigate("/marketplace")} />;

  const { summary, payment } = cart;
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">My Cart</h1>
          <p className="mt-0.5 text-xs text-[#8C909B]">{cart.itemsCount} item{cart.itemsCount === 1 ? "" : "s"} in your shopping cart</p>
        </div>
        <button type="button" onClick={() => navigate("/marketplace")} className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline">
          <ArrowLeft className="size-4" /> Continue Shopping
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Cart Items Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-[#0F152A]">Items ({cart.lineCount})</h3>
            <div className="divide-y divide-[#E2ECF6] space-y-4">
              {cart.items.map((line) => (
                <div key={line.id} className={`flex flex-col gap-4 pt-4 first:pt-0 sm:flex-row sm:items-center sm:justify-between ${line.available ? "" : "opacity-70"}`}>
                  <div className="flex items-start gap-3.5 min-w-0">
                    {line.product.image ? <img src={line.product.image} alt={line.product.name} className="size-16 shrink-0 rounded-xl bg-[#F8FAFC] object-cover" /> : <div className="size-16 shrink-0 rounded-xl bg-[#F8FAFC]" />}
                    <div className="space-y-1 min-w-0">
                      <h4 className="text-sm font-extrabold text-[#0F152A]">{line.product.name}</h4>
                      <p className="text-[11px] text-[#8C909B]">Sold by {line.product.seller || "Simkash"}</p>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {line.installation.available && <button type="button" disabled={busy} onClick={() => updateItem.mutate({ id: line.id, withInstallation: !line.withInstallation })}
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${line.withInstallation ? "bg-[#EFF4F8] text-[#2563EB]" : "border border-dashed border-[#CBD5E1] text-[#8C909B]"}`}>
                          {line.withInstallation ? `Installation ${naira(line.lineInstallation || line.installation.unitFee)} ✕` : `+ Add installation${line.installation.unitFee ? ` ${naira(line.installation.unitFee)}` : ""}`}
                        </button>}
                      </div>
                      {line.priceChanged && <p className="text-[10px] font-bold text-[#D9990D]">Price changed from {naira(line.priceChanged.from)} to {naira(line.priceChanged.to)}</p>}
                      {line.issues.map((issue) => <p key={issue} className="text-[10px] font-bold text-[#EF4444]">{issue === "insufficient_stock" ? `Only ${line.maxQuantity} left` : ISSUE_TEXT[issue]}</p>)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 text-right">
                    <div>
                      {line.compareAtPrice ? <span className="text-xs font-semibold text-[#8C909B] line-through block">{naira(line.compareAtPrice * line.quantity)}</span> : null}
                      <span className="text-base font-extrabold text-[#0F152A]">{naira(line.lineTotal)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-xl border border-[#E2ECF6] bg-[#F8FAFC]">
                        <button type="button" disabled={busy} onClick={() => updateItem.mutate({ id: line.id, quantity: line.quantity - 1 })} className="px-2.5 py-0.5 text-xs font-bold text-[#0F152A] disabled:opacity-40">-</button>
                        <span className="px-2.5 py-0.5 text-xs font-extrabold text-[#0F152A]">{line.quantity}</span>
                        <button type="button" disabled={busy || line.quantity >= line.maxQuantity} onClick={() => updateItem.mutate({ id: line.id, quantity: line.quantity + 1 })} className="px-2.5 py-0.5 text-xs font-bold text-[#0F152A] disabled:opacity-40">+</button>
                      </div>
                      <button type="button" aria-label="Remove" disabled={busy} onClick={() => removeItem.mutate(line.id)} className="text-[#8C909B] hover:text-[#EF4444]">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Options Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Delivery</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {cart.delivery.options.map((option) => {
                const selected = option.selected ?? option.method === cart.delivery.method;
                return <div key={option.method} onClick={() => !selected && !busy && updateCart.mutate({ deliveryMethod: option.method })}
                  className={`cursor-pointer rounded-2xl border p-4 transition ${selected ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]" : "border-[#E2ECF6] bg-white hover:border-slate-300"}`}>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0F152A]">
                    {option.method === "express" ? <Zap className="size-4 text-[#F59E0B]" /> : <Truck className="size-4 text-[#2563EB]" />} {option.label}
                  </div>
                  <p className="text-[11px] text-[#8C909B] mt-1">{option.description}</p>
                  <span className={`mt-2 inline-block font-extrabold text-xs ${option.fee === 0 ? "text-[#10B981]" : "text-[#0F152A]"}`}>{option.fee === 0 ? "Free" : naira(option.fee)}</span>
                </div>;
              })}
            </div>

            {/* Delivery Address Box */}
            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-extrabold text-[#0F152A] flex items-center gap-1.5 min-w-0">
                  <MapPin className="size-4 shrink-0 text-[#2563EB]" /> <span className="truncate">{cart.address?.formatted ?? "No delivery address yet"}</span>
                </span>
                <button type="button" onClick={() => setAddressOpen(true)} className="shrink-0 font-bold text-[#2563EB] hover:underline">{cart.address ? "Change address" : "Add address"}</button>
              </div>
              {cart.address?.isDefault && <p className="text-[10px] text-[#10B981] font-semibold pl-5">Default address</p>}
            </div>
          </div>
        </div>

        {/* Right Column — Order Summary & Payment */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Order Summary</h3>
            <div className="divide-y divide-[#E2ECF6] text-xs">
              {cart.items.filter((line) => line.available).map((line) => (
                <div key={line.id} className="flex justify-between gap-3 py-2 first:pt-0">
                  <span className="text-[#8C909B] truncate">{line.product.name}{line.quantity > 1 ? ` × ${line.quantity}` : ""}</span>
                  <span className="font-bold text-[#0F152A]">{naira(line.lineSubtotal)}</span>
                </div>
              ))}
              {summary.installationTotal > 0 && <div className="flex justify-between py-2"><span className="text-[#8C909B]">Installation fee</span><span className="font-bold text-[#0F152A]">{naira(summary.installationTotal)}</span></div>}
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">{cart.delivery.method === "express" ? "Express Delivery" : "Standard Delivery"}</span>
                <span className={`font-bold ${summary.deliveryFee === 0 ? "text-[#10B981]" : "text-[#0F152A]"}`}>{summary.deliveryFee === 0 ? "Free" : naira(summary.deliveryFee)}</span>
              </div>
              {summary.discount > 0 && <div className="flex justify-between py-2"><span className="text-[#8C909B]">Promo Discount</span><span className="font-bold text-[#10B981]">-{naira(summary.discount)}</span></div>}
              <div className="flex justify-between py-3 font-extrabold text-base pt-3 border-t border-[#E2ECF6]">
                <span className="text-[#0F152A]">Total</span><span className="text-[#0F152A]">{naira(summary.total)}</span>
              </div>
            </div>
            {summary.savings?.total > 0 && <div className="rounded-xl bg-[#EBFFF8] p-2.5 text-center text-xs font-bold text-[#10B981]">You save {naira(summary.savings.total)}</div>}
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C909B]">PAY WITH</h3>
            <div className="space-y-2.5">
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs">
                <span className="font-extrabold text-[#0F152A]">💳 Wallet · {naira(payment.wallet.balance)} available</span>
                {!payment.wallet.sufficient && payment.wallet.shortfall > 0 && <p className="text-[10px] font-bold text-[#D9990D] mt-1.5 bg-[#FFFBEB] p-2 rounded-xl border border-[#FCEEC1]">
                  Short by {naira(payment.wallet.shortfall)}. Top up or pay by card at checkout.
                </p>}
              </div>
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs">
                <span className="font-bold text-[#0F152A] block">💳 Debit / Credit Card</span>
                <span className="text-[10px] text-[#8C909B]">{payment.card.label || "Visa, Mastercard, Verve"} · choose at checkout</span>
              </div>
            </div>
            {cart.checkoutIssues.length > 0 && <ul className="space-y-1 rounded-xl bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{cart.checkoutIssues.map((issue) => <li key={issue}>• {issue}</li>)}</ul>}
            <button type="button" disabled={!cart.canCheckout} onClick={() => navigate("/marketplace/checkout")} className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50">
              Proceed to Checkout
            </button>
          </div>

          {/* Promo Code Box */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            {!cart.promo && <div className="flex items-center gap-2">
              <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())} placeholder="Enter promo code" className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 px-3 text-xs font-bold text-[#0F152A] outline-none" />
              <button type="button" disabled={!promoCode.trim() || applyPromo.isPending} onClick={() => applyPromo.mutate(promoCode.trim(), { onSuccess: () => setPromoCode("") })} className="rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50">
                {applyPromo.isPending ? "…" : "Apply"}
              </button>
            </div>}
            {cart.promo && <div className={`flex items-center justify-between gap-2 rounded-xl p-2 px-3 text-xs font-bold ${cart.promo.valid ? "bg-[#EBFFF8] text-[#10B981]" : "bg-[#FFFBEB] text-[#D9990D]"}`}>
              <span>{cart.promo.valid ? `✓ ${cart.promo.code} applied · ${naira(cart.promo.discount)} off` : `${cart.promo.code}: ${cart.promo.message}`}</span>
              <button type="button" disabled={removePromo.isPending} onClick={() => removePromo.mutate()} className="text-[#EF4444] text-[10px]">Remove</button>
            </div>}
          </div>
        </div>
      </div>

      <AddressBookModal open={addressOpen} onClose={() => setAddressOpen(false)} selectedId={cart.address?.id} onSelect={(address) => updateCart.mutate({ addressId: address.id })} />
    </div>
  );
}
