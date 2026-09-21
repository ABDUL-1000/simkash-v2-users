import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface InvestmentOrderDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderNumber?: string;
  month?: string;
  simType?: string;
  quantity?: number;
  wholesalePrice?: number;
  totalCost?: number;
}

export function InvestmentOrderDetailModal({
  open,
  onOpenChange,
  orderNumber = "ORD-EP-2026-00340",
  month = "March 2026",
  simType = "POS SIM",
  quantity = 500,
  wholesalePrice = 2500,
  totalCost = 1_250_000,
}: InvestmentOrderDetailModalProps) {
  const handleDownloadReceipt = () => {
    toast.success(`Receipt for ${orderNumber} downloaded as PDF`);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Order Details"
      description={`${orderNumber} · ${month}`}
      size="md"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* Status Card */}
        <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-emerald-900">
          <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold block text-xs">Order Completed — Stock Delivered</span>
            <span className="text-[11px] text-emerald-700">Placed: 15 Mar 2026 · Delivered: 15 Mar</span>
          </div>
        </div>

        {/* Details Table */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-[11px] space-y-1.5">
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">Order Ref</span>
            <span className="font-mono font-bold text-slate-800">{orderNumber}</span>
          </div>
          <div className="flex justify-between py-0.5 items-center">
            <span className="text-slate-500">SIM Type</span>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200">
              {simType}
            </span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">Quantity</span>
            <span className="font-semibold text-slate-800">{quantity.toLocaleString()} SIMs</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">Wholesale price</span>
            <span className="text-slate-800">₦{wholesalePrice.toLocaleString()}/SIM</span>
          </div>
          <div className="flex justify-between py-0.5 font-bold border-t border-slate-200 pt-1">
            <span className="text-slate-700">Total cost</span>
            <span className="text-slate-900">₦{totalCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">Payment source</span>
            <span className="font-semibold text-emerald-600">Wallet earnings</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">Ordered</span>
            <span className="text-slate-700">15 Mar 2026 10:30 AM</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">Delivered</span>
            <span className="text-slate-700">15 Mar 2026 2:00 PM</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">Duration</span>
            <span className="text-slate-700">3.5 hours</span>
          </div>
        </div>

        {/* Impact Box */}
        <div className="rounded-xl border border-slate-200 p-2.5 text-[11px] space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">POS SIM before</span>
            <span className="font-semibold text-slate-800">3,500</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">This order</span>
            <span className="font-bold text-emerald-600">+{quantity.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-200">
            <span className="text-slate-700 font-bold">POS SIM after</span>
            <span className="font-black text-slate-900">4,000</span>
          </div>
        </div>

        {/* Note */}
        <div className="flex items-start gap-2 rounded-xl bg-emerald-50/70 p-2.5 text-emerald-900 border border-emerald-200 text-[11px]">
          <TrendingUp className="size-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>
            This 500-SIM order added approximately +₦1,000,000/month to your margin earnings at the time.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleDownloadReceipt}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Download Receipt
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
export default InvestmentOrderDetailModal;
