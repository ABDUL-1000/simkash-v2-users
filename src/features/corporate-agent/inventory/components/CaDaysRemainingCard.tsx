import { Clock } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_DAYS_REMAINING_DATA } from "../data/ca-inventory.data";

export function CaDaysRemainingCard() {
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
          At current rate
        </span>
      </div>

      <div className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
        {CA_DAYS_REMAINING_DATA.map((item) => (
          <div
            key={item.label}
            className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs"
          >
            <span className="font-medium text-slate-700">{item.label}</span>
            <span
              className={`px-2 py-0.5 rounded font-black text-xs ${
                item.badgeTone === "warning"
                  ? "bg-amber-100 text-amber-800"
                  : item.badgeTone === "danger"
                  ? "bg-rose-100 text-rose-800"
                  : "text-slate-900"
              }`}
            >
              {item.days}d
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
