import { useEffect, useState } from "react";
import { ArrowRight, Minus, Plus, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { TransactionSuccessModal } from "@/components/common/TransactionSuccessModal";
import { useGetWallet } from "@/features/wallet/api/useGetWallet";
import { usePlaceOrder } from "../api/usePlaceOrder";
import type { PlaceOrderResponseData, ProductItem } from "../types/api";

export function CheckoutModal({ open, product, onClose }: { open: boolean; product: ProductItem | null; onClose: () => void }) {
  const { wallet } = useGetWallet();
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [pin, setPin] = useState("");
  const [placedOrder, setPlacedOrder] = useState<PlaceOrderResponseData | null>(null);
  const order = usePlaceOrder({ onSuccess: (response) => { setPlacedOrder(response.data); setPin(""); } });
  const total = (product?.price ?? 0) * quantity;
  const balance = wallet?.balance ?? 0;

  useEffect(() => { setQuantity(1); setShippingAddress(""); setPin(""); setPlacedOrder(null); }, [product?.id]);

  const submitOrder = () => {
    if (!product || !product.inStock || !shippingAddress.trim() || pin.length !== 4 || balance < total) return;
    order.mutate({ items: [{ productId: product.id, quantity }], shippingAddress: shippingAddress.trim(), paymentMethod: "wallet", pin });
  };
  const close = () => { setPlacedOrder(null); setPin(""); onClose(); };
  const orderNumber = placedOrder?.order?.orderNumber || placedOrder?.orderNumber || "Order placed";

  return <>
    <AppModal open={open && !placedOrder} onOpenChange={(value) => !value && close()} title="Checkout" description="Pay securely from your Simkash wallet" size="md">
      {product && <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-xl border border-[#E2ECF6] p-3"><img src={product.primaryImage || product.images?.[0]} alt={product.name} className="size-16 rounded-lg bg-slate-50 object-cover" /><div className="min-w-0 flex-1"><p className="line-clamp-2 text-xs font-bold text-[#0F152A]">{product.name}</p><p className="mt-1 text-xs text-[#66738C]">₦{product.price.toLocaleString("en-NG")} each</p></div><div className="flex items-center gap-2"><button type="button" disabled={quantity <= 1} onClick={() => setQuantity((count) => count - 1)} className="rounded-md border p-1 disabled:opacity-40" aria-label="Decrease quantity"><Minus className="size-3" /></button><span className="text-xs font-bold">{quantity}</span><button type="button" disabled={quantity >= product.stock} onClick={() => setQuantity((count) => count + 1)} className="rounded-md border p-1 disabled:opacity-40" aria-label="Increase quantity"><Plus className="size-3" /></button></div></div>
        <label className="block space-y-1.5"><span className="text-[11px] font-bold uppercase text-[#8C909B]">Delivery Address</span><textarea rows={3} value={shippingAddress} onChange={(event) => setShippingAddress(event.target.value)} placeholder="Enter your full delivery address" className="w-full rounded-xl border border-[#E2ECF6] p-3 text-xs outline-none focus:border-[#2563EB]" /></label>
        <div className="space-y-2 rounded-xl bg-[#F8FAFC] p-3 text-xs"><div className="flex justify-between"><span className="text-[#66738C]">Order total</span><b>₦{total.toLocaleString("en-NG")}</b></div><div className="flex justify-between"><span className="flex items-center gap-1 text-[#66738C]"><Wallet className="size-3.5" /> Wallet balance</span><b>₦{balance.toLocaleString("en-NG")}</b></div>{balance < total ? <div className="flex items-center justify-between rounded-lg bg-amber-50 p-2 text-[11px] font-semibold text-amber-800"><span>Insufficient wallet balance. Top up to continue.</span><a href="/dashboard" className="shrink-0 text-[#2563EB] underline">Top Up</a></div> : <p className="text-[11px] font-semibold text-[#10B981]">Sufficient balance</p>}</div>
        <div className="space-y-2"><p className="text-center text-[10px] font-bold uppercase text-[#8C909B]">Enter Wallet PIN</p><div className="flex justify-center"><InputOTP maxLength={4} value={pin} onChange={setPin} inputMode="numeric"><InputOTPGroup className="gap-2"><InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /><InputOTPSlot index={3} /></InputOTPGroup></InputOTP></div></div>
        <div className="flex justify-between border-t border-[#E2ECF6] pt-3"><button type="button" onClick={close} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold">Cancel</button><button type="button" disabled={order.isPending || !shippingAddress.trim() || pin.length !== 4 || balance < total} onClick={submitOrder} className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white disabled:opacity-50">{order.isPending ? "Placing order…" : <>Place Order <ArrowRight className="size-3.5" /></>}</button></div>
      </div>}
    </AppModal>
    <TransactionSuccessModal open={open && Boolean(placedOrder)} onOpenChange={(value) => !value && close()} onDone={close} title="Order placed" subtitle="Your wallet payment was successful." details={[{ label: "Order Number", value: orderNumber }, { label: "Total Paid", value: `₦${total.toLocaleString("en-NG")}` }, { label: "Estimated Delivery", value: placedOrder?.estimatedDelivery || "See order details for updates" }]} walletBalanceText="Wallet balance updated" />
  </>;
}
