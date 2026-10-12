import { useGetEnterpriseOverview } from "../api/useGetEnterpriseOverview";
import { useEnterpriseOrderSims } from "../api/useEnterpriseOrderSims";
import { useEnterpriseReinvest } from "../api/useEnterpriseReinvest";
import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { colors } from "@/constants/colors";
import type { SimOrderDraft } from "../types";
import { formatNaira } from "../utils/formatters";
import { Info, TrendingUp, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface ConfirmSimOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: SimOrderDraft;
  onEdit: () => void;
  onOrderPlaced?: (order: SimOrderDraft) => void;
}

export function ConfirmSimOrderModal({
  open,
  onOpenChange,
  order,
  onEdit,
  onOrderPlaced,
}: ConfirmSimOrderModalProps) {
  const [pin, setPin] = useState("");
  const overview = useGetEnterpriseOverview();
  const orderMutation = useEnterpriseOrderSims();
  const reinvestMutation = useEnterpriseReinvest();
  const isPlacing = orderMutation.isPending || reinvestMutation.isPending;

  const initialWallet = overview.data?.top_cards.wallet_balance.amount ?? 0;
  const stock = overview.data?.top_cards.sim_stock.breakdown[order.simType.replace(" SIM", "").toLowerCase() as "pos" | "cctv" | "gps" | "router"] ?? 0;
  const walletAfter = Math.max(0, initialWallet - order.totalCost);
  const extraMargin = order.quantity * (order.retailPrice - order.unitCost);

  const handlePlaceOrder = () => {
    if (isPlacing) return;
    if (pin.length !== 4) { toast.error("Enter your four-digit transaction PIN to continue."); return; }
    if (!Number.isInteger(order.quantity) || order.quantity <= 0 || order.totalCost <= 0 || order.totalCost > initialWallet) { toast.error("Check quantity and available wallet balance."); return; }
    const onSuccess = (...args: unknown[]) => { void args; onOrderPlaced?.(order); onOpenChange(false); setPin(""); };
    const sim_type = order.simType.replace(" SIM", "").toUpperCase();
    if (order.actionType === "reinvest") reinvestMutation.mutate({ amount: order.totalCost, action_type: "order_more", sim_type, quantity: order.quantity }, { onSuccess });
    else {
      if (!order.deliveryAddress?.trim()) { toast.error("Enter a delivery address before placing the order."); return; }
      orderMutation.mutate({ sim_type, quantity: order.quantity, delivery_address: order.deliveryAddress }, { onSuccess });
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm SIM Order"
      description={`Reinvesting ${formatNaira(order.totalCost)} in earnings`}
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        {/* Order Summary Box with Blue Left Accent Stripe */}
        <div className="rounded-2xl border border-slate-200 border-l-4 border-l-blue-600 bg-slate-50/80 p-3.5 space-y-2">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Order Summary</p>
          <div className="space-y-1.5 text-slate-700">
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-500">SIM type</span>
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-600">{order.simType}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-500">Quantity</span>
              <span className="font-bold text-slate-900">{order.quantity} SIMs</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-500">Cost</span>
              <span className="font-black text-amber-500 text-sm">{formatNaira(order.totalCost)}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-500">Payment</span>
              <span className="font-semibold text-slate-900">{order.paymentSource === "wallet" ? "Wallet Earnings" : "Fresh Capital"}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-500">Delivery</span>
              <span className="font-semibold text-slate-900">{order.deliveryAddress || "SIM stock reinvestment"}</span>
            </div>
          </div>
        </div>

        {/* Balance Impact Card */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-3 space-y-1">
          <div className="flex justify-between text-slate-500">
            <span>Before</span>
            <span className="font-bold text-slate-900">{formatNaira(initialWallet)}</span>
          </div>
          <div className="flex justify-between text-red-500 font-semibold">
            <span>Order</span>
            <span>-{formatNaira(order.totalCost)}</span>
          </div>
          <div className="flex justify-between text-emerald-600 font-bold border-t border-slate-100 pt-1">
            <span>After</span>
            <span>{formatNaira(walletAfter)}</span>
          </div>
        </div>

        {/* Stock Impact Box */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
          <span className="text-slate-500 font-medium">{order.simType} Stock Impact</span>
          <span className="font-bold text-emerald-600">{stock.toLocaleString()} → {(stock + order.quantity).toLocaleString()} SIMs</span>
        </div>

        {/* Extra Margin Pill */}
        <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50/90 border border-emerald-100 p-2.5 text-emerald-700 font-semibold text-[11px]">
          <TrendingUp className="size-3.5 text-emerald-600 shrink-0" />
          <span>+{formatNaira(extraMargin)}/month extra at current pace</span>
        </div>

        {/* Debt Reminder Info Callout */}
        <div className="flex items-start gap-2 rounded-xl bg-blue-50/70 p-2.5 text-slate-600 border border-blue-100">
          <Info className="size-4 shrink-0 text-blue-600 mt-0.5" />
          <p className="text-[11px] leading-tight">
            This order does not reduce your {formatNaira(overview.data?.balance_card.remaining_balance ?? 0)} remaining balance. Payment is from wallet earnings only.
          </p>
        </div>

        {/* Enter Transaction PIN */}
        <div className="space-y-2 text-center pt-1">
          <p className="font-bold uppercase text-[10px] tracking-wider text-slate-500">Enter Transaction PIN</p>
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={setPin}
              containerClassName="gap-2.5"
            >
              <InputOTPGroup className="gap-2.5">
                <InputOTPSlot
                  index={0}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
                <InputOTPSlot
                  index={1}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
                <InputOTPSlot
                  index={2}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
                <InputOTPSlot
                  index={3}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <button
            type="button"
            onClick={() => toast.info("Contact your account manager for PIN assistance.")}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 inline-block"
          >
            Forgot PIN?
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition"
          >
            <ArrowLeft className="size-3.5" /> Edit
          </button>
          <button
            type="button"
            disabled={isPlacing}
            onClick={handlePlaceOrder}
            className="rounded-xl px-7 py-2.5 text-xs font-bold text-white transition hover:opacity-90 bg-[#1E293B] shadow-sm"
          >
            {isPlacing ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
