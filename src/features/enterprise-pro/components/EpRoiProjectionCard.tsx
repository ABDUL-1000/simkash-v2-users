import { colors } from "@/constants/colors";

export function EpRoiProjectionCard() {
  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <p className="font-bold text-slate-900 text-sm">ROI Projection</p>

      <div className="space-y-2 text-xs divide-y divide-slate-100">
        <div className="flex items-center justify-between pb-1">
          <span className="text-slate-600">Current ROI</span>
          <span className="font-black text-purple-600">19.0%</span>
        </div>
        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-600">Monthly earnings</span>
          <span className="font-bold text-slate-900">₦2,847,000</span>
        </div>
        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-600">Projected 6-month</span>
          <span className="font-bold text-emerald-600">45% ROI</span>
        </div>
        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-600">Break-even est.</span>
          <span className="font-bold text-amber-600">~6 months</span>
        </div>
        <div className="flex items-center justify-between pt-1.5">
          <span className="text-slate-600">Full ROI (100%)</span>
          <span className="font-bold text-slate-900">~26 months</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 leading-tight pt-1">
        At current pace you&apos;ll recover full investment in ~26 months.
      </p>
    </div>
  );
}
