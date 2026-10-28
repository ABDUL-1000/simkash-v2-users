import { AlertTriangle, Clock } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { CaInventoryOverviewData } from "../types/inventory";

export function CaDaysRemainingCard({ data, onRequestStock }: { data: CaInventoryOverviewData["estimated_days_remaining"]; onRequestStock?: () => void }) {
  return (
    <div
      className="rounded-2xl border p-4 bg-white shadow-xs space-y-3"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">Days Remaining</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          {data.subtitle}
        </span>
      </div>

      {data.alert_callout?.message ? (
        <div className="p-3 rounded-xl border border-amber-200 bg-amber-50 flex items-start gap-2 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-900">{data.alert_callout.message}</p>
            {onRequestStock && <button type="button" onClick={onRequestStock} className="font-black text-amber-700 underline">Request Stock</button>}
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-500">Stock levels are healthy at the current distribution pace.</p>
      )}
    </div>
  );
}
