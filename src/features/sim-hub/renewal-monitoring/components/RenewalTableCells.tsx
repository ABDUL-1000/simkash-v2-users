import { TriangleAlert } from "lucide-react";
import type { UrgencyLevel } from "@/types/renewal.types";

const URGENCY_STYLES: Record<
  UrgencyLevel,
  { label: string; bg: string; text: string; dot: string; countdownColor: string }
> = {
  critical: {
    label: "CRITICAL",
    bg: "#FEE2E2",
    text: "#EF4444",
    dot: "#EF4444",
    countdownColor: "#EF4444",
  },
  warning: {
    label: "WARNING",
    bg: "#FEF3C7",
    text: "#D97706",
    dot: "#D97706",
    countdownColor: "#D97706",
  },
  watch: {
    label: "WATCH",
    bg: "#DBEAFE",
    text: "#2563EB",
    dot: "#2563EB",
    countdownColor: "#2563EB",
  },
};

export function UrgencyBadge({ level }: { level: UrgencyLevel }) {
  const style = URGENCY_STYLES[level];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: style.dot }} />
      {style.label}
    </span>
  );
}

export function CountdownText({ level, label }: { level: UrgencyLevel; label: string }) {
  const style = URGENCY_STYLES[level];
  return (
    <span className="font-bold whitespace-nowrap" style={{ color: style.countdownColor }}>
      {label}
    </span>
  );
}

export function ExpiryDateText({ level, date }: { level: UrgencyLevel; date: string }) {
  const isCritical = level === "critical";
  return (
    <span
      className={`whitespace-nowrap ${
        isCritical ? "font-bold text-[#EF4444]" : "font-semibold text-[#0F172A]"
      }`}
    >
      {date}
    </span>
  );
}

export function RenewalNetworkBadge({ network }: { network: string }) {
  const lower = network.toLowerCase();
  let bg = "#EFF6FF";
  let text = "#1E40AF";

  if (lower === "mtn") {
    bg = "#FEF3C7";
    text = "#854D0E";
  } else if (lower === "airtel") {
    bg = "#FEE2E2";
    text = "#991B1B";
  } else if (lower === "glo") {
    bg = "#D1FAE5";
    text = "#065F46";
  } else if (lower === "t2") {
    bg = "#EFF6FF";
    text = "#1E40AF";
  }

  return (
    <span
      className="inline-block rounded-md px-2.5 py-1 text-xs font-bold uppercase"
      style={{ backgroundColor: bg, color: text }}
    >
      {network.toUpperCase()}
    </span>
  );
}

export function SimTypeBadge({ simType }: { simType: string }) {
  return (
    <span className="inline-block rounded-md bg-[#E0E7FF] px-2.5 py-1 text-xs font-bold text-[#2563EB] uppercase">
      {simType}
    </span>
  );
}

export function RenewalDataUsageBar({
  usedGb,
  totalGb,
}: {
  usedGb: number;
  totalGb: number;
}) {
  const pct = totalGb > 0 ? (usedGb / totalGb) * 100 : 0;
  const isHigh = pct >= 80;

  return (
    <div className="min-w-[120px]">
      <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
        <div
          className={`h-full rounded-full transition-all ${isHigh ? "bg-[#2563EB]" : "bg-[#3B82F6]"}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-[#64748B]">
        <span>
          {usedGb}GB of {totalGb}GB
        </span>
        {isHigh && <span className="font-bold text-[#64748B]">▲</span>}
      </div>
    </div>
  );
}

export function LastReminderText({ label, notSent }: { label: string; notSent?: boolean }) {
  if (notSent) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#D97706] whitespace-nowrap">
        <TriangleAlert className="size-3.5" />
        Not sent
      </span>
    );
  }
  return <span className="text-xs text-[#64748B] whitespace-nowrap">{label}</span>;
}