import { TriangleAlert } from "lucide-react";
import { ECOLOR, NETWORK_COLORS } from "@/constants/colors";

export type SimStatusBadgeProps = {
  status: string;
  value?: string;
};

export function SimStatusBadge({ status, value }: SimStatusBadgeProps) {
  const key = value ?? status.toLowerCase().replace(/\s+/g, "_");
  const color = ECOLOR[key] ?? ECOLOR.neutral;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-bold"
      style={{ backgroundColor: `${color}1A`, color }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
      {status.toUpperCase()}
    </span>
  );
}

export function NetworkBadge({ network }: { network: string }) {
  const key = network.toLowerCase() as keyof typeof NETWORK_COLORS;
  const color = NETWORK_COLORS[key]?.text ?? "#334155";
  return (
    <span className="text-sm font-bold" style={{ color }}>
      {network}
    </span>
  );
}

export function DataUsageBar({
  usedGb,
  totalGb,
  warningThresholdPct = 90,
}: {
  usedGb: number;
  totalGb: number;
  warningThresholdPct?: number;
}) {
  const pct = totalGb > 0 ? (usedGb / totalGb) * 100 : 0;
  const isCritical = pct >= 100;
  const isWarning = pct >= warningThresholdPct;
  const barColor = isCritical ? ECOLOR.failed : isWarning ? ECOLOR.pending : "#3B82F6";
  const textColor = isCritical ? ECOLOR.failed : isWarning ? ECOLOR.pending : "#475569";

  return (
    <div className="min-w-[140px]">
      <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(100, pct)}%`, backgroundColor: barColor }}
        />
      </div>
      <div className="flex items-center gap-1 text-xs font-medium" style={{ color: textColor }}>
        {isWarning && <TriangleAlert className="size-3.5 shrink-0" />}
        <span className="truncate">{usedGb}GB of {totalGb}GB</span>
      </div>
    </div>
  );
}