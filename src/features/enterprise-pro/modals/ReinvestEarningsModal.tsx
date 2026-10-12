import { useGetEnterpriseOverview } from "../api/useGetEnterpriseOverview";
import { useGetEnterprisePricing } from "../api/useGetEnterprisePricing";
import { enterpriseSimPrices } from "../types/pricing";
import { toast } from "sonner";
import { EpQueryState } from "../components/EpQueryState";
import { useEnterpriseReinvest } from "../api/useEnterpriseReinvest";
import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import type { SimType, SimOrderDraft } from "../types";
import { formatNaira } from "../utils/formatters";
import { SimCostBreakdown } from "../components/SimCostBreakdown";
import { AlertTriangle, Minus, Plus, Wifi } from "lucide-react";

interface ReinvestEarningsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPreviewOrder: (order: SimOrderDraft) => void;
}

export function ReinvestEarningsModal({
  open,
  onOpenChange,
  onPreviewOrder,
}: ReinvestEarningsModalProps) {
  const overview = useGetEnterpriseOverview();
  const pricing = useGetEnterprisePricing(open);
  const REINVEST_TYPES = enterpriseSimPrices(pricing.data);
  const wallet = overview.data?.top_cards.wallet_balance.amount ?? 0;
  const [actionType, setActionType] = useState<"order_more" | "reduce_principal">("order_more");
  const [amount, setAmount] = useState(0);
  const mutation = useEnterpriseReinvest({ onSuccess: (...args) => { void args; onOpenChange(false); setAmount(0); } });
  const [selectedType, setSelectedType] = useState<SimType>("Router SIM");
  const [quantity, setQuantity] = useState(400);

  const currentSim = REINVEST_TYPES.find((s) => s.type === selectedType) || REINVEST_TYPES[0];
  const wholesaleCost = quantity * currentSim.wholesale;
  const walletAfter = Math.max(0, wallet - wholesaleCost);
  const extraMargin = quantity * currentSim.margin;

  const handlePreview = () => {
    if (actionType === "reduce_principal") {
      if (!Number.isFinite(amount) || amount <= 0 || amount > wallet || amount > (overview.data?.balance_card.remaining_balance ?? 0)) { toast.error("Enter an amount within your wallet and remaining balance."); return; }
      mutation.mutate({ amount, action_type: "reduce_principal" }); return;
    }
    if (!pricing.data || pricing.isError || !Number.isInteger(quantity) || quantity <= 0 || wholesaleCost <= 0 || wholesaleCost > wallet) { toast.error("Check pricing, quantity, and available wallet balance."); return; }
    onPreviewOrder({
      simType: selectedType,
      actionType: "reinvest",
      quantity,
      unitCost: currentSim.wholesale,
      retailPrice: currentSim.retail,
      totalCost: wholesaleCost,
      paymentSource: "wallet",
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reinvest Your Earnings"
      description="Use wallet balance to buy more SIMs"
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        <EpQueryState pending={pricing.isPending} error={pricing.error} retry={pricing.refetch} />
        {/* Available to Reinvest Card */}
        <div className="rounded-2xl border p-3.5 bg-emerald-50/70 border-emerald-200">
          <p className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Available to Reinvest</p>
          <p className="text-2xl font-black text-emerald-600 mt-0.5">{formatNaira(wallet)}</p>
          <p className="text-[11px] text-emerald-700/80">Current wallet earnings balance</p>
        </div>

        {/* Balance Warning Notice */}
        <div className="flex items-start gap-2.5 rounded-xl bg-amber-50 p-3 text-amber-900 border border-amber-200">
          <AlertTriangle className="size-4 shrink-0 text-amber-600 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            You still have <span className="font-bold text-amber-950">{formatNaira(overview.data?.balance_card.remaining_balance ?? 0)}</span> balance remaining. Consider paying some down before reinvesting.
          </p>
        </div>

        <div className="flex gap-2">{(["order_more", "reduce_principal"] as const).map(value => <button type="button" key={value} onClick={() => setActionType(value)} className="rounded-xl border px-3 py-2 text-xs font-semibold" style={{ borderColor: actionType === value ? colors.primary : colors.border, color: colors.primary }}>{value === "order_more" ? "Order More SIMs" : "Reduce Principal Balance"}</button>)}</div>
        {actionType === "reduce_principal" && <label className="block text-xs font-semibold">Amount<input type="number" min={1} value={amount || ""} onChange={e => setAmount(Number(e.target.value))} className="mt-1 w-full rounded-xl border p-3" style={{ borderColor: colors.border }} /></label>}
        {actionType === "order_more" && <>
        {/* Select SIM Type */}
        <div>
          <p className="font-bold text-slate-700 mb-1.5">Select SIM Type</p>
          <div className="grid grid-cols-3 gap-2">
            {REINVEST_TYPES.map((sim) => {
              const isSelected = selectedType === sim.type;
              return (
                <button
                  key={sim.type}
                  type="button"
                  onClick={() => setSelectedType(sim.type)}
                  className={`rounded-xl border p-2.5 text-left transition ${
                    isSelected
                      ? "border-amber-400 bg-amber-50/50 ring-1 ring-amber-400"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <Wifi className="size-4 text-amber-600 mb-1" />
                  <p className="font-bold text-slate-900">{sim.type}</p>
                  <p className="text-[10px] text-slate-400">{formatNaira(sim.wholesale)} wholesale</p>
                  <p className="text-[10px] text-slate-400">{formatNaira(sim.retail)} retail</p>
                  <p className="text-[10px] font-bold text-amber-700 mt-0.5">+{formatNaira(sim.margin)}/SIM</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* How many SIMs? */}
        <div>
          <p className="font-bold text-slate-700 mb-1">How many SIMs?</p>
          <div className="flex items-center justify-center gap-4 py-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(100, q - 100))}
              className="flex size-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:scale-95"
            >
              <Minus className="size-4" />
            </button>
            <span className="text-2xl font-black text-slate-900 w-20 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 100)}
              className="flex size-9 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800 active:scale-95"
            >
              <Plus className="size-4" />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 mt-1.5">
            {[100, 200, 500, 1000].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setQuantity(num)}
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                  quantity === num ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setQuantity(currentSim.wholesale > 0 ? Math.floor(wallet / currentSim.wholesale / 100) * 100 : 0)}
              className="rounded-full px-3 py-0.5 text-xs font-bold border border-emerald-500 text-emerald-700 bg-emerald-50"
            >
              Max affordable
            </button>
          </div>
          <p className="text-center text-[11px] font-semibold text-emerald-600 mt-1">✓ Minimum met (100 SIMs)</p>
        </div>

        {/* Cost Breakdown */}
        <SimCostBreakdown
          quantity={quantity}
          wholesaleCost={wholesaleCost}
          paymentSource="wallet"
          walletAfter={walletAfter}
          extraMargin={extraMargin}
          balanceAffected={0}
        />

        </>}
        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: colors.border }}>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={mutation.isPending || !pricing.data}
            onClick={handlePreview}
            className="rounded-xl px-5 py-2.5 text-xs font-bold text-white transition hover:opacity-90 bg-slate-900 hover:bg-slate-800"
          >
            {mutation.isPending ? "Processing..." : actionType === "reduce_principal" ? "Reinvest Now" : "Preview Order →"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
