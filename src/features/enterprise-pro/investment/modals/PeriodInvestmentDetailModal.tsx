import { AppModal } from "@/components/common/AppModal";
import { toast } from "sonner";

interface PeriodInvestmentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  month?: string;
  totalEarned?: number;
}

export function PeriodInvestmentDetailModal({
  open,
  onOpenChange,
  month = "March 2026",
  totalEarned = 1_890_000,
}: PeriodInvestmentDetailModalProps) {
  const handleDownload = () => {
    toast.success(`Downloading ${month} report as PDF...`);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${month} — Investment Detail`}
      description="Performance breakdown for this period"
      size="md"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs max-h-[80vh] overflow-y-auto pr-1">
        {/* Hero Card */}
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {month}
            </span>
            <div className="text-xl font-extrabold text-white mt-0.5">
              ₦{totalEarned.toLocaleString()} total earned
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/30">
            Best month so far
          </span>
        </div>

        {/* Breakdown List */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-1.5 text-[11px]">
          <div className="flex justify-between text-slate-600">
            <span>Margin earnings</span>
            <span className="font-semibold text-slate-900">₦1,240,000</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Network commission</span>
            <span className="font-semibold text-emerald-600">₦650,000</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Bonus earned</span>
            <span className="text-slate-500">₦0</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900">
            <span>Total earned</span>
            <span className="text-slate-900">₦{totalEarned.toLocaleString()}</span>
          </div>
        </div>

        {/* Principal Status */}
        <div className="rounded-xl border border-slate-200 p-2.5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Principal Status in March
          </span>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Principal deployed</span>
            <span className="font-semibold text-slate-800">₦15,000,000</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Cumulative earned</span>
            <span className="font-semibold text-slate-800">₦890,000</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">ROI at end of month</span>
            <span className="font-bold text-blue-600">5.9%</span>
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-xl border border-slate-200 p-2.5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Activity
          </span>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Active SCs</span>
            <span className="font-semibold text-slate-800">10 of 12</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Active APs</span>
            <span className="font-semibold text-slate-800">198 of 247</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Total acts</span>
            <span className="font-semibold text-slate-800">12,847</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">New SIM orders</span>
            <span className="font-semibold text-slate-800">0</span>
          </div>
        </div>

        {/* Balance Payments Made */}
        <div className="rounded-xl border border-slate-200 p-2.5 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Balance Payments Made
          </span>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Balance paid this month</span>
            <span className="font-bold text-emerald-600">₦500,000</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Balance remaining</span>
            <span className="font-bold text-amber-600">₦7,000,000</span>
          </div>
        </div>

        {/* Comparison Box */}
        <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-2 text-[11px] text-emerald-900">
          <span className="font-bold block">VS FEB 2026 Comparison</span>
          <span>Earnings: ₦1,890K vs ₦680K (+177%) · Acts: 12,847 vs 8,400 (+53%)</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleDownload}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Download Month Report
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
export default PeriodInvestmentDetailModal;
