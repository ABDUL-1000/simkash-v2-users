import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { toast } from "sonner";

interface RoiAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactManager?: () => void;
}

export function RoiAnalysisModal({ open, onOpenChange, onContactManager }: RoiAnalysisModalProps) {
  const handleExport = () => {
    toast.success("ROI Analysis exported successfully as PDF");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Return on Investment Analysis"
      description="Zenith Corp Ltd · Jan 2026 — Present"
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        {/* Dark Hero Card */}
        <div className="rounded-2xl bg-[#0F172A] p-4 text-white shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CURRENT ROI</p>
          <p className="text-4xl font-black tracking-tight text-white mt-1">19.0%</p>
          <p className="text-xs text-slate-400 font-medium mt-2">
            Monthly · <span className="text-slate-300">₦2,847,000 of ₦15M principal</span>
          </p>
        </div>

        {/* 3 Stat Pills Card */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 rounded-2xl border border-slate-200 bg-white p-3">
          <div className="px-2 text-left">
            <p className="text-[10px] uppercase font-bold text-slate-400">ALL-TIME ROI</p>
            <p className="text-base font-black text-emerald-600 mt-0.5">16.3%</p>
          </div>
          <div className="px-3 text-left">
            <p className="text-[10px] uppercase font-bold text-slate-400">MONTHLY ROI</p>
            <p className="text-base font-black text-purple-600 mt-0.5">19.0%</p>
          </div>
          <div className="px-3 text-left">
            <p className="text-[10px] uppercase font-bold text-slate-400">PROJECTED 6M</p>
            <p className="text-base font-black text-emerald-600 mt-0.5">45.0%</p>
          </div>
        </div>

        {/* Source Breakdown Table */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 tracking-wider px-1">
            <span className="w-1/2">SOURCE</span>
            <span className="w-1/4 text-right">AMOUNT</span>
            <span className="w-1/4 text-right">% PRINCIPAL</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs text-slate-700">
            <div className="flex justify-between items-center py-2 px-1">
              <span className="w-1/2 font-medium">Margin earnings</span>
              <span className="w-1/4 text-right font-semibold text-slate-900">₦1,247,000</span>
              <span className="w-1/4 text-right font-bold text-blue-600">8.3%</span>
            </div>
            <div className="flex justify-between items-center py-2 px-1">
              <span className="w-1/2 font-medium">Network commission</span>
              <span className="w-1/4 text-right font-semibold text-slate-900">₦1,600,000</span>
              <span className="w-1/4 text-right font-bold text-emerald-600">10.7%</span>
            </div>
            <div className="flex justify-between items-center py-2 px-1 text-slate-400">
              <span className="w-1/2 font-medium">Bonus earned</span>
              <span className="w-1/4 text-right">₦0</span>
              <span className="w-1/4 text-right font-bold">0%</span>
            </div>
            <div className="flex justify-between items-center py-2 px-1 text-slate-900 font-black">
              <span className="w-1/2">Total this month</span>
              <span className="w-1/4 text-right">₦2,847,000</span>
              <span className="w-1/4 text-right">19.0%</span>
            </div>
          </div>
        </div>

        {/* Break-Even Progress */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">BREAK-EVEN PROGRESS</span>
            <span className="text-emerald-600 font-bold">Break-even: 16.3%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#E2ECF6] overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: "16.3%" }} />
          </div>
          <p className="text-[11px] font-semibold text-slate-500">
            ₦2,847,000 recovered of ₦17,500,000
          </p>
          <div className="flex justify-between text-center pt-0.5">
            <div>
              <p className="text-[10px] font-bold text-slate-500">25%</p>
              <p className="text-[9px] text-slate-400">₦4.37M</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500">50%</p>
              <p className="text-[9px] text-slate-400">₦8.75M</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500">75%</p>
              <p className="text-[9px] text-slate-400">₦13.1M</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500">100%</p>
              <p className="text-[9px] text-slate-400">₦17.5M</p>
            </div>
          </div>
        </div>

        {/* Projected Pace Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 space-y-2">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            PROJECTED PACE (AT ₦2,847,000/MO)
          </p>
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between items-center">
              <span>3 months projection</span>
              <span>
                <strong className="text-slate-900 font-bold">₦8,541,000</strong> · <span className="text-blue-600 font-bold">48.8%</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>6 months projection</span>
              <span>
                <strong className="text-slate-900 font-bold">₦17,082,000</strong> · <span className="text-emerald-600 font-bold">97.6% ≈ BE</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>12 months projection</span>
              <span>
                <strong className="text-slate-900 font-bold">₦34,164,000</strong> · <span className="text-emerald-600 font-bold">195% 🎯</span>
              </span>
            </div>
          </div>

          <p className="text-xs font-bold text-emerald-600 pt-1">
            Break-even estimated in ~6 months at current earnings pace
          </p>
          <p className="text-[10px] text-slate-400 leading-tight">
            Projections are estimates based on current month performance. Network growth may improve these figures.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleExport}
            className="px-2 py-2 text-xs font-bold text-slate-700 hover:text-slate-900"
          >
            Export Analysis
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onContactManager?.();
            }}
            className="px-2 py-2 text-xs font-bold text-slate-700 hover:text-slate-900"
          >
            Contact Kemi Ade
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl px-7 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-slate-800 transition shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
