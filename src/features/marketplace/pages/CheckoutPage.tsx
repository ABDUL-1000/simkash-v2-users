import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { ShieldCheck, Wrench } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useCheckout, useGetCart, useUpdateCart } from "../api";
import { AddressBookModal } from "../Modals/AddressBookModal";
import { InstallationSlotPicker, type SlotChoice } from "../components/InstallationSlotPicker";
import { naira } from "../utils";
import type { CheckoutResult } from "../types/api";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, isLoading, error, refetch } = useGetCart();
  const updateCart = useUpdateCart();
  const checkout = useCheckout();
  const [method, setMethod] = useState<"wallet" | "card">("wallet");
  const [slot, setSlot] = useState<SlotChoice>(null);
  const [addressOpen, setAddressOpen] = useState(false);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [placed, setPlaced] = useState<CheckoutResult | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

  if (isLoading) return <div className="space-y-4 animate-pulse"><div className="h-10 rounded bg-slate-100" /><div className="h-72 rounded-2xl bg-slate-100" /></div>;
  if (error) return <AppEmptyState title="Couldn't load checkout" description={error.message} actionText="Retry" onAction={() => void refetch()} />;
  if (!cart || cart.items.length === 0) return <AppEmptyState title="Your cart is empty" description="Add items to your cart before checking out." actionText="Go to Marketplace" onAction={() => navigate("/marketplace")} />;

  const { summary, payment } = cart;
  const walletShort = !payment.wallet.sufficient;
  const needsSlot = cart.hasInstallation && !slot;
  const ready = cart.canCheckout && Boolean(cart.address) && !needsSlot && !(method === "wallet" && walletShort);
  const step = placed ? 3 : pinModalOpen ? 2 : 1;

  const placeOrder = (walletPin?: string) => {
    checkout.mutate({
      paymentMethod: method,
      expectedTotal: summary.total,
      ...(walletPin ? { pin: walletPin } : {}),
      ...(cart.hasInstallation && slot ? { installation: slot } : {}),
    }, {
      onSuccess: (result) => {
        setPin("");
        if (result.payment?.cashierUrl) { window.location.assign(result.payment.cashierUrl); return; } // card → OPay (order held 30 min)
        setPinModalOpen(false);
        setPlaced(result);
      },
      onError: (err) => { setPin(""); setPinModalOpen(false); setFailure(err.message); },
    });
  };
  const handlePlaceOrderClick = () => { if (method === "wallet") setPinModalOpen(true); else placeOrder(); };

  const successDetails: SuccessDetailItem[] = placed ? [
    { label: "Order Ref", value: placed.orderNumber },
    { label: "Items", value: (placed.items ?? []).map((item) => `${item.name}${item.quantity > 1 ? ` × ${item.quantity}` : ""}`).join(", ") || `${cart.itemsCount} items` },
    { label: placed.summary?.totalLabel ?? "Total paid", value: naira(placed.summary?.total ?? summary.total) },
    ...(placed.installation ? [{ label: "Installation", value: placed.installation.label }] : []),
    ...(placed.estimatedDelivery?.label ? [{ label: "Estimated Delivery", value: placed.estimatedDelivery.label }] : []),
  ] : [];
  const stepDot = (n: number, label: string) => <div className="flex items-center gap-2">
    <span className={`flex size-7 items-center justify-center rounded-full text-xs font-extrabold ${step >= n ? "bg-[#2563EB] text-white" : "bg-[#EFF4F8] text-[#8C909B]"}`}>{n}</span>
    <span className={`text-xs font-bold ${step >= n ? "text-[#2563EB]" : "text-[#8C909B]"}`}>{label}</span>
  </div>;

  return (
    <div className="space-y-6">
      {/* 3-Step Wizard Header Stepper */}
      <div className="flex items-center justify-center gap-4 border-b border-[#E2ECF6] pb-4">
        {stepDot(1, "Review")}<span className="h-0.5 w-12 bg-[#E2ECF6]" />{stepDot(2, "Payment")}<span className="h-0.5 w-12 bg-[#E2ECF6]" />{stepDot(3, "Confirm")}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          {/* Delivery Address Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F152A]">Delivery Address</h3>
              <button type="button" onClick={() => setAddressOpen(true)} className="text-xs font-bold text-[#2563EB] hover:underline">{cart.address ? "Change" : "Add address"}</button>
            </div>
            {cart.address ? <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-1">
              <h4 className="font-extrabold text-[#0F152A]">{cart.address.fullName}</h4>
              <p className="text-[#66738C]">{cart.address.formatted}</p>
              <p className="text-[#66738C]">{cart.address.state} State · {cart.address.country}</p>
              <p className="text-[#8C909B] pt-0.5 font-mono">{cart.address.phone}</p>
            </div> : <p className="rounded-2xl border border-dashed border-[#FCEEC1] bg-[#FFFBEB] p-4 text-xs font-semibold text-[#D9990D]">Add a delivery address to place your order.</p>}
          </div>

          {/* Items in Order Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Items in Order</h3>
            <div className="divide-y divide-[#E2ECF6] text-xs">
              {cart.items.filter((line) => line.available).map((line) => (
                <div key={line.id} className="flex items-center justify-between gap-3 py-3 first:pt-0">
                  <div className="flex items-center gap-3 min-w-0">
                    {line.product.image ? <img src={line.product.image} alt="" className="size-12 shrink-0 rounded-xl bg-[#F8FAFC] object-cover" /> : <div className="size-12 shrink-0 rounded-xl bg-[#F8FAFC]" />}
                    <div className="min-w-0"><h4 className="truncate font-bold text-[#0F152A]">{line.product.name} × {line.quantity}</h4>
                      {line.withInstallation && <p className="text-[10px] font-semibold text-[#2563EB]">+ Installation {naira(line.lineInstallation)}</p>}</div>
                  </div>
                  <span className="font-extrabold text-[#0F152A]">{naira(line.lineTotal)}</span>
                </div>
              ))}
            </div>

            {/* Installation date & time */}
            {cart.hasInstallation && <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-4 text-xs space-y-2">
              <h5 className="font-bold text-[#D9990D] flex items-center gap-1.5"><Wrench className="size-4" /> Choose an installation date and time</h5>
              <InstallationSlotPicker value={slot} onChange={setSlot} />
              <p className="text-[11px] text-[#D9990D]">An installer will contact you before the visit to confirm.</p>
            </div>}
          </div>

          {/* Payment Method Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#0F152A]">Payment Method</h3>
            <div onClick={() => setMethod("wallet")} className={`cursor-pointer rounded-2xl border p-4 text-xs space-y-2 ${method === "wallet" ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]" : "border-[#E2ECF6] bg-[#F8FAFC]"}`}>
              <div className="flex items-center justify-between"><span className="font-extrabold text-[#0F152A]">💳 Simkash Wallet</span>{method === "wallet" && <span className="size-2.5 rounded-full bg-[#10B981]" />}</div>
              <p className="text-[#8C909B]">{naira(payment.wallet.balance)} available</p>
              {walletShort && <div className="rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] p-2.5 text-[11px] font-bold text-[#D9990D]">
                Shortfall: {naira(payment.wallet.shortfall)}, top up your wallet or pay by card. <button type="button" onClick={(e) => { e.stopPropagation(); navigate(appPaths.wallet); }} className="underline">Top up</button>
              </div>}
            </div>
            <div onClick={() => setMethod("card")} className={`cursor-pointer rounded-2xl border p-4 text-xs ${method === "card" ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]" : "border-[#E2ECF6] bg-[#F8FAFC]"}`}>
              <div className="flex items-center justify-between"><span className="font-extrabold text-[#0F152A]">💳 Debit / Credit Card</span>{method === "card" && <span className="size-2.5 rounded-full bg-[#10B981]" />}</div>
              <p className="text-[#8C909B]">{payment.card.label || "Visa, Mastercard, Verve"} · you'll be taken to OPay to pay</p>
            </div>
          </div>
        </div>

        {/* Right Column — Order Total & Place Order */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-[#0F152A]">Order Total</h3>
            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-2 first:pt-0"><span className="text-[#8C909B]">Subtotal ({cart.itemsCount} items)</span><span className="font-bold text-[#0F152A]">{naira(summary.subtotal)}</span></div>
              {summary.installationTotal > 0 && <div className="flex justify-between py-2"><span className="text-[#8C909B]">Installation</span><span className="font-bold text-[#0F152A]">{naira(summary.installationTotal)}</span></div>}
              <div className="flex justify-between py-2"><span className="text-[#8C909B]">Delivery</span><span className={`font-bold ${summary.deliveryFee === 0 ? "text-[#10B981]" : "text-[#0F152A]"}`}>{summary.deliveryFee === 0 ? "Free" : naira(summary.deliveryFee)}</span></div>
              {summary.discount > 0 && <div className="flex justify-between py-2"><span className="text-[#8C909B]">Promo{cart.promo ? ` (${cart.promo.code})` : ""}</span><span className="font-bold text-[#10B981]">-{naira(summary.discount)}</span></div>}
              <div className="flex justify-between py-3 font-extrabold text-lg pt-3 border-t border-[#E2ECF6]"><span className="text-[#0F152A]">TOTAL</span><span className="text-[#0F152A]">{naira(summary.total)}</span></div>
            </div>
            <div className="text-[11px] text-[#8C909B] space-y-0.5">
              <p>Charging to: <span className="font-bold text-[#0F152A]">{method === "wallet" ? "Simkash Wallet" : "Card (OPay)"}</span></p>
              {method === "wallet" && !walletShort && <p className="font-semibold">After purchase: {naira(payment.wallet.balance - summary.total)} remaining</p>}
            </div>
            {cart.checkoutIssues.length > 0 && <ul className="space-y-1 rounded-xl bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{cart.checkoutIssues.map((issue) => <li key={issue}>• {issue}</li>)}</ul>}
            {needsSlot && <p className="text-[11px] font-semibold text-[#D9990D]">Choose an installation date and time.</p>}
            <button type="button" disabled={!ready || checkout.isPending} onClick={handlePlaceOrderClick} className="w-full rounded-xl bg-[#10B981] py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-600 disabled:opacity-50">
              {checkout.isPending && method === "card" ? "Starting card payment…" : "Place Order"}
            </button>
            <p className="text-[10px] text-[#8C909B] text-center">By placing this order you agree to our Terms & Conditions</p>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs font-bold text-[#66738C]">
            <ShieldCheck className="size-4 text-[#10B981]" /><span>Secured by OPay · All payments encrypted and safe</span>
          </div>
        </div>
      </div>

      {/* PIN Verification Modal (wallet) */}
      <AppModal open={pinModalOpen} onOpenChange={(value) => { if (!value && !checkout.isPending) { setPinModalOpen(false); setPin(""); } }} title="Confirm Purchase" description={`Authorise payment of ${naira(summary.total)}`} size="sm">
        <div className="space-y-4 pt-1 text-center">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">ENTER TRANSACTION PIN</label>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={setPin} containerClassName="gap-3">
              <InputOTPGroup className="gap-3">{[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} className="size-12 text-lg font-bold" />)}</InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button type="button" disabled={checkout.isPending} onClick={() => { setPinModalOpen(false); setPin(""); }} className="rounded-xl border border-[#E2ECF6] px-5 py-2 text-xs font-bold text-[#0F152A]">Cancel</button>
            <button type="button" onClick={() => placeOrder(pin)} disabled={pin.length < 4 || checkout.isPending} className="rounded-xl bg-[#10B981] px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-600 disabled:opacity-50">
              {checkout.isPending ? "Processing..." : "Confirm & Pay"}
            </button>
          </div>
        </div>
      </AppModal>

      {/* Order Confirmed */}
      <TransactionSuccessModal open={Boolean(placed)} onOpenChange={() => placed && navigate(`/marketplace/orders/${placed.orderId}`)}
        title={`Order confirmed${placed?.customerFirstName ? `, ${placed.customerFirstName}` : ""}!`} subtitle={`Your order ${placed?.orderNumber ?? ""} has been placed. You'll receive app and email updates.`}
        details={successDetails} walletBalanceText={placed?.walletBalanceAfter != null ? `Wallet balance: ${naira(placed.walletBalanceAfter)}` : "SimKash Marketplace"}
        doneButtonText="View Order" onDone={() => placed && navigate(`/marketplace/orders/${placed.orderId}`)} />

      {/* Failure — the cart and slots were refetched; show the server's reason */}
      <TransactionFailureModal open={Boolean(failure)} onOpenChange={() => setFailure(null)} title="Order not placed" subtitle="Nothing was charged. Please review and try again."
        reason={failure ?? ""} tryAgainButtonText="Try Again" cancelButtonText="Close" onTryAgain={() => setFailure(null)} onCancel={() => setFailure(null)} />

      <AddressBookModal open={addressOpen} onClose={() => setAddressOpen(false)} selectedId={cart.address?.id} onSelect={(address) => updateCart.mutate({ addressId: address.id })} />
    </div>
  );
}
