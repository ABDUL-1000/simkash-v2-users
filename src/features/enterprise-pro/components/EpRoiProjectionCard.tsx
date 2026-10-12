import { useGetEnterpriseRoiProjection } from "../api/useGetEnterpriseRoiProjection";
import { EpQueryState } from "./EpQueryState";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";

export function EpRoiProjectionCard() {
  const query = useGetEnterpriseRoiProjection();
  const data = query.data;
  if (query.isPending || query.isError) return <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />;
  if (!data) return <AppEmptyState title="No ROI Projection" />;
  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <p className="font-bold text-slate-900 text-sm">ROI Projection</p>

      <div className="space-y-2 text-xs divide-y divide-slate-100">
        <div className="flex items-center justify-between pb-1">
          <span className="text-slate-600">Current ROI</span>
          <span className="font-black text-purple-600">{data.current_roi_formatted}</span>
        </div>
        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-600">Monthly earnings</span>
          <span className="font-bold text-slate-900">{data.monthly_earnings_formatted}</span>
        </div>
        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-600">Projected 6-month</span>
          <span className="font-bold text-emerald-600">{data.projected_6_month_roi_formatted}</span>
        </div>
        <div className="flex items-center justify-between py-1.5">
          <span className="text-slate-600">Break-even est.</span>
          <span className="font-bold text-amber-600">{data.break_even_timeline}</span>
        </div>
        <div className="flex items-center justify-between pt-1.5">
          <span className="text-slate-600">Full ROI (100%)</span>
          <span className="font-bold text-slate-900">{data.full_roi_recovery_timeline}</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 leading-tight pt-1">
        {data.status_label}
      </p>
    </div>
  );
}
