import type { EasyBuyStatus } from "../types/api";
import { STATUS_TONE, humanise } from "../utils";

export function EasyBuyStatusBadge({ status, label, className = "" }: { status: EasyBuyStatus; label?: string; className?: string }) {
  return <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${STATUS_TONE[status] ?? STATUS_TONE.cancelled} ${className}`}>
    {label || humanise(status)}
  </span>;
}

export function EasyBuyProgress({ percent, tone = "green" }: { percent: number; tone?: "green" | "red" }) {
  const value = Math.max(0, Math.min(100, Math.round(percent || 0)));
  return <div className="h-2 w-full overflow-hidden rounded-full bg-[#EFF4F8]" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
    <div className={`h-full rounded-full transition-all ${tone === "red" ? "bg-[#EF4444]" : "bg-[#10B981]"}`} style={{ width: `${value}%` }} />
  </div>;
}
