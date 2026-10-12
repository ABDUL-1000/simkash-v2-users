import { useGetEnterpriseOverview } from "../api/useGetEnterpriseOverview";
import { useGetEnterpriseRoiProjection } from "../api/useGetEnterpriseRoiProjection";
import { formatNaira } from "../utils/formatters";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";


interface RoiAnalysisModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactManager?: () => void;
}

export function RoiAnalysisModal({ open, onOpenChange, onContactManager }: RoiAnalysisModalProps) {
  const { data: overview } = useGetEnterpriseOverview();
  const { data: projection } = useGetEnterpriseRoiProjection(open);
  const principal = overview?.top_cards.principal_invested.amount ?? 0;
  const earned = overview?.top_cards.total_earned.amount ?? 0;
  const margin = overview?.secondary_cards.margin_earnings.amount ?? 0;
  const commission = overview?.secondary_cards.network_commission.amount ?? 0;
  const percentage = (amount: number) => principal ? ((amount / principal) * 100).toFixed(1) + "%" : "0%";
  const handleExport = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify({ overview, projection }, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = "enterprise-roi-analysis.json"; link.click(); URL.revokeObjectURL(url);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Return on Investment Analysis"
      description={overview?.enterprise_profile.name ?? "Enterprise investment"}
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        {/* Dark Hero Card */}
        <div className="rounded-2xl bg-[#0F172A] p-4 text-white shadow-sm">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">CURRENT ROI</p>
          <p className="text-4xl font-black tracking-tight text-white mt-1">{projection?.current_roi_formatted ?? "—"}</p>
          <p className="text-xs text-slate-400 font-medium mt-2">
            Monthly · <span className="text-slate-300">{formatNaira(earned)} of {formatNaira(principal)} principal</span>
          </p>
        </div>

        {/* 3 Stat Pills Card */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 rounded-2xl border border-slate-200 bg-white p-3">
          <div className="px-2 text-left">
            <p className="text-[10px] uppercase font-bold text-slate-400">ALL-TIME ROI</p>
            <p className="text-base font-black text-emerald-600 mt-0.5">{percentage(earned)}</p>
          </div>
          <div className="px-3 text-left">
            <p className="text-[10px] uppercase font-bold text-slate-400">MONTHLY ROI</p>
            <p className="text-base font-black text-purple-600 mt-0.5">{projection?.current_roi_formatted ?? "—"}</p>
          </div>
          <div className="px-3 text-left">
            <p className="text-[10px] uppercase font-bold text-slate-400">PROJECTED 6M</p>
            <p className="text-base font-black text-emerald-600 mt-0.5">{projection?.projected_6_month_roi_formatted ?? "—"}</p>
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
              <span className="w-1/4 text-right font-semibold text-slate-900">{formatNaira(margin)}</span>
              <span className="w-1/4 text-right font-bold text-blue-600">{percentage(margin)}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-1">
              <span className="w-1/2 font-medium">Network commission</span>
              <span className="w-1/4 text-right font-semibold text-slate-900">{formatNaira(commission)}</span>
              <span className="w-1/4 text-right font-bold text-emerald-600">{percentage(commission)}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-1 text-slate-400">
              <span className="w-1/2 font-medium">Bonus earned</span>
              <span className="w-1/4 text-right">₦0</span>
              <span className="w-1/4 text-right font-bold">0%</span>
            </div>
            <div className="flex justify-between items-center py-2 px-1 text-slate-900 font-black">
              <span className="w-1/2">Total this month</span>
              <span className="w-1/4 text-right">{formatNaira(earned)}</span>
              <span className="w-1/4 text-right">{projection?.current_roi_formatted ?? "—"}</span>
            </div>
          </div>
        </div>

        {/* Break-Even Progress */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
            <span className="text-slate-400">BREAK-EVEN PROGRESS</span>
            <span className="text-emerald-600 font-bold">Break-even: {percentage(earned)}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#E2ECF6] overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: "{percentage(earned)}" }} />
          </div>
          <p className="text-[11px] font-semibold text-slate-500">
            {formatNaira(earned)} recovered of {formatNaira(principal)}
          </p>
          <div className="flex justify-between text-center pt-0.5">
            <div>
              <p className="text-[10px] font-bold text-slate-500">25%</p>
              <p className="text-[9px] text-slate-400">{formatNaira(principal * 0.25)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500">50%</p>
              <p className="text-[9px] text-slate-400">{formatNaira(principal * 0.5)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500">75%</p>
              <p className="text-[9px] text-slate-400">{formatNaira(principal * 0.75)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500">100%</p>
              <p className="text-[9px] text-slate-400">{formatNaira(principal)}</p>
            </div>
          </div>
        </div>

        {/* Projected Pace Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 space-y-2">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            PROJECTED PACE (AT {formatNaira(earned)}/MO)
          </p>
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between items-center">
              <span>3 months projection</span>
              <span>
                <strong className="text-slate-900 font-bold">{formatNaira((projection?.monthly_earnings ?? 0) * 3)}</strong> · <span className="text-blue-600 font-bold">{percentage((projection?.monthly_earnings ?? 0) * 3)}</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>6 months projection</span>
              <span>
                <strong className="text-slate-900 font-bold">{formatNaira((projection?.monthly_earnings ?? 0) * 6)}</strong> · <span className="text-emerald-600 font-bold">{percentage((projection?.monthly_earnings ?? 0) * 6)}</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>12 months projection</span>
              <span>
                <strong className="text-slate-900 font-bold">{formatNaira((projection?.monthly_earnings ?? 0) * 12)}</strong> · <span className="text-emerald-600 font-bold">{percentage((projection?.monthly_earnings ?? 0) * 12)}</span>
              </span>
            </div>
          </div>

          <p className="text-xs font-bold text-emerald-600 pt-1">
            Break-even estimated in {projection?.break_even_timeline ?? "—"} at current earnings pace
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
            Contact {overview?.account_manager?.name ?? "Account Manager"}
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
