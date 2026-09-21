import { AppModal } from "@/components/common/AppModal";
import { AlertTriangle, Lightbulb } from "lucide-react";

interface WholesalePriceUpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdatePricesNow?: () => void;
  onContactAdvisor?: () => void;
}

export function WholesalePriceUpdateModal({
  open,
  onOpenChange,
  onUpdatePricesNow,
  onContactAdvisor,
}: WholesalePriceUpdateModalProps) {
  const priceChanges = [
    { type: "POS SIM", oldPrice: "₦2,500", newPrice: "₦2,800", change: "+₦300", changed: true },
    { type: "CCTV SIM", oldPrice: "₦6,000", newPrice: "₦6,000", change: "No change", changed: false },
    { type: "GPS SIM", oldPrice: "₦8,000", newPrice: "₦8,500", change: "+₦500", changed: true },
    { type: "Router SIM", oldPrice: "₦5,000", newPrice: "₦5,000", change: "No change", changed: false },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Wholesale Price Update"
      description="Simkash direct cost adjustment notification"
      size="md"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs max-h-[80vh] overflow-y-auto pr-1">
        {/* Amber Notice Banner */}
        <div className="rounded-xl bg-amber-500/10 border border-amber-300 p-2.5 text-amber-900 text-[11px] font-bold">
          SIMKASH HAS UPDATED WHOLESALE PRICES · Effective: 1 Jul 2026
        </div>

        {/* Pricing Table */}
        <div className="rounded-xl border border-slate-200 p-2.5">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100">
                <th className="pb-1 font-medium">SIM Type</th>
                <th className="pb-1 font-medium text-right">Old</th>
                <th className="pb-1 font-medium text-right">New</th>
                <th className="pb-1 font-medium text-right">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priceChanges.map((p) => (
                <tr key={p.type}>
                  <td className="py-1 font-semibold text-slate-800">{p.type}</td>
                  <td className="py-1 text-right text-slate-500">{p.oldPrice}</td>
                  <td className="py-1 text-right font-semibold text-slate-900">{p.newPrice}</td>
                  <td className={`py-1 text-right font-bold ${p.changed ? "text-red-500" : "text-slate-400"}`}>
                    {p.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Margin Impact Callout */}
        <div className="rounded-xl bg-red-50/70 border border-red-200 p-3 text-red-950 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-red-900 uppercase text-[10px] tracking-wider">
            <AlertTriangle className="size-3.5 text-red-600" />
            <span>Your Margin Impact</span>
          </div>
          <div className="space-y-0.5 text-[11px]">
            <p><strong>POS SIM margin:</strong> ₦2,000 → ₦1,700 (-₦300)</p>
            <p><strong>GPS SIM margin:</strong> ₦4,000 → ₦3,500 (-₦500)</p>
          </div>
          <p className="text-[10px] text-red-800 pt-0.5">
            Your current retail prices are unchanged. Consider raising retail prices to maintain your margin levels.
          </p>
        </div>

        {/* Recommended Action */}
        <div className="rounded-xl bg-blue-50/70 border border-blue-200 p-3 text-blue-950 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-blue-900 uppercase text-[10px] tracking-wider">
            <Lightbulb className="size-3.5 text-blue-600" />
            <span>Recommended Action</span>
          </div>
          <p className="text-[11px] leading-relaxed text-blue-900">
            Raise POS SIM retail from ₦4,500 to ₦4,800 to maintain ₦2,000/SIM margin. Raise GPS SIM to ₦12,500.
          </p>
          <button
            type="button"
            onClick={onUpdatePricesNow}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-[11px] hover:bg-blue-700 transition"
          >
            Update Retail Prices Now
          </button>
        </div>

        {/* Advisor link */}
        <div className="text-[11px] text-slate-500 text-center">
          Kemi Ade is available to discuss pricing strategy.{" "}
          <button type="button" onClick={onContactAdvisor} className="font-bold text-blue-600 hover:underline">
            Contact Kemi
          </button>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Acknowledge
          </button>
          <button
            type="button"
            onClick={onUpdatePricesNow}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm"
          >
            Update Prices Now
          </button>
        </div>
      </div>
    </AppModal>
  );
}
export default WholesalePriceUpdateModal;
