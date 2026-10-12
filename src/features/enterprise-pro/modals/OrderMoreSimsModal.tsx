import { useGetEnterpriseOverview } from "../api/useGetEnterpriseOverview";
import { useGetEnterprisePricing } from "../api/useGetEnterprisePricing";
import { enterpriseSimPrices } from "../types/pricing";
import { toast } from "sonner";
import { EpQueryState } from "../components/EpQueryState";
import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import type { SimType, SimOrderDraft } from "../types";
import { formatNaira } from "../utils/formatters";
import { SimCostBreakdown } from "../components/SimCostBreakdown";
import { Info, Package, Minus, Plus, Wallet, Building2, Check } from "lucide-react";

interface OrderMoreSimsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPreviewOrder: (order: SimOrderDraft) => void;
}

export function OrderMoreSimsModal({ open, onOpenChange, onPreviewOrder }: OrderMoreSimsModalProps) {
  const overview = useGetEnterpriseOverview();
  const pricing = useGetEnterprisePricing(open);
  const SIM_TYPES = enterpriseSimPrices(pricing.data);
  const wallet = overview.data?.top_cards.wallet_balance.amount ?? 0;
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedType, setSelectedType] = useState<SimType>("POS SIM");
  const [paymentSource, setPaymentSource] = useState<"wallet" | "fresh">("wallet");
  const [quantity, setQuantity] = useState(400);

  const currentSim = SIM_TYPES.find((s) => s.type === selectedType)!;
  const wholesaleCost = quantity * currentSim.wholesale;
  const walletAfter = Math.max(0, wallet - (paymentSource === "wallet" ? wholesaleCost : 0));
  const extraMargin = quantity * currentSim.margin;

  const handlePreview = () => {
    if (paymentSource === "fresh") { toast.info("Contact your account manager to arrange fresh capital orders."); return; }
    if (!deliveryAddress.trim()) { toast.error("Enter a delivery address."); return; }
    if (!pricing.data || pricing.isError || !Number.isInteger(quantity) || quantity <= 0 || wholesaleCost <= 0 || wholesaleCost > wallet) { toast.error("Check pricing, quantity, and available wallet balance."); return; }
    onPreviewOrder({
      simType: selectedType,
      actionType: "order",
      deliveryAddress: deliveryAddress.trim(),
      quantity,
      unitCost: currentSim.wholesale,
      retailPrice: currentSim.retail,
      totalCost: wholesaleCost,
      paymentSource,
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Order More SIMs"
      description="Add to your inventory beyond initial investment"
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        <EpQueryState pending={pricing.isPending} error={pricing.error} retry={pricing.refetch} />
        <div className="flex items-start gap-2 rounded-xl bg-blue-50/70 p-2.5 text-blue-900 border border-blue-100">
          <Info className="size-4 shrink-0 text-blue-600 mt-0.5" />
          <p className="text-[11px]">Order more SIMs at any time. Pay from wallet earnings or fresh capital. Minimum: 100 SIMs.</p>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-100 p-2.5 text-slate-700">
          <span className="flex items-center gap-1.5 font-bold text-slate-900">
            <Package className="size-4 text-blue-600" /> Current stock: {overview.data?.top_cards.sim_stock.total_available_formatted ?? "—"} SIMs total
          </span>
          <span className="text-[11px] text-slate-500 font-medium">{Object.entries(overview.data?.top_cards.sim_stock.breakdown ?? {}).map(([type, count]) => `${type.toUpperCase()} ${count.toLocaleString()}`).join(" · ")}</span>
        </div>

        <div>
          <p className="font-bold text-slate-700 mb-1.5">Select SIM Type</p>
          <div className="grid grid-cols-2 gap-2">
            {SIM_TYPES.map((sim) => {
              const isSelected = selectedType === sim.type;
              return (
                <button
                  key={sim.type}
                  type="button"
                  onClick={() => setSelectedType(sim.type)}
                  className={`relative rounded-xl border p-2.5 text-left transition ${
                    isSelected ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600" : "border-slate-200 bg-white"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check className="size-2.5" />
                    </span>
                  )}
                  <p className="font-bold text-slate-900">{sim.type}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{formatNaira(sim.wholesale)} wholesale · {formatNaira(sim.retail)} retail</p>
                  <p className="text-[11px] font-bold text-blue-600 mt-0.5">+{formatNaira(sim.margin)} margin/SIM</p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="font-bold text-slate-700 mb-1.5">How to pay?</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentSource("wallet")}
              className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${
                paymentSource === "wallet" ? "border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500" : "border-slate-200 bg-white"
              }`}
            >
              <Wallet className="size-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Wallet Earnings</p>
                <p className="text-[10px] text-emerald-700 font-semibold">{formatNaira(wallet)} available</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPaymentSource("fresh")}
              className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${
                paymentSource === "fresh" ? "border-blue-500 bg-blue-50/40 ring-1 ring-blue-500" : "border-slate-200 bg-white"
              }`}
            >
              <Building2 className="size-5 text-blue-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">Fresh Capital</p>
                <p className="text-[10px] text-slate-500">Contact manager</p>
              </div>
            </button>
          </div>
        </div>

        <div>
          <p className="font-bold text-slate-700 mb-1">How many SIMs?</p>
          <div className="flex items-center justify-center gap-4 py-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(100, q - 100))}
              className="flex size-9 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            >
              <Minus className="size-4" />
            </button>
            <span className="text-2xl font-black text-slate-900 w-20 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 100)}
              className="flex size-9 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-800"
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

        <label className="block text-xs font-semibold" style={{ color: colors.textPrimary }}>Delivery address
          <textarea value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} rows={2} className="mt-1 w-full rounded-xl border p-3 text-xs" style={{ borderColor: colors.border }} />
        </label>
        <SimCostBreakdown
          quantity={quantity}
          wholesaleCost={wholesaleCost}
          paymentSource={paymentSource}
          walletAfter={walletAfter}
          extraMargin={extraMargin}
        />

        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: colors.border }}>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePreview}
            className="rounded-xl px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800"
          >
            Preview Order →
          </button>
        </div>
      </div>
    </AppModal>
  );
}
