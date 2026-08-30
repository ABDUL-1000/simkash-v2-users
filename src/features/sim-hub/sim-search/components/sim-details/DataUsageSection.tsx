import { AlertTriangle } from "lucide-react";

import {
  SIM_DATA_USAGE_COLORS,
  SIM_DETAILS_COLORS,
} from "@/constants/colors";
import type { SimDetails } from "@/types/sim-details.types";
import { cn } from "@/lib/utils";

function DataUsageDonut({ percentage }: { percentage: number }) {
  return (
    <div
      className="grid size-32 place-items-center rounded-full sm:size-36"
      style={{
        background: `conic-gradient(${SIM_DATA_USAGE_COLORS.primary} ${percentage * 3.6}deg, ${SIM_DATA_USAGE_COLORS.ringTrack} 0deg)`,
      }}
      aria-label={`${percentage}% data used`}
      role="img"
    >
      <div className="size-24 rounded-full bg-white sm:size-28" />
    </div>
  );
}

function DataRow({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between border-b py-3 last:border-b-0"
      style={{ borderColor: SIM_DETAILS_COLORS.innerCardBorder }}
    >
      <span className="text-sm font-medium sm:text-base" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
        {label}
      </span>
      <span
        className="text-sm font-bold sm:text-base"
        style={{
          color: danger ? SIM_DETAILS_COLORS.danger : SIM_DETAILS_COLORS.valueDark,
        }}
      >
        {value}
      </span>
    </div>
  );
}

export function DataUsageSection({ sim }: { sim: SimDetails }) {
  const { dataUsage } = sim;
  const maxPct = Math.max(...dataUsage.week.map((day) => day.pct), 1);

  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white p-5 sm:p-6"
      style={{ borderColor: SIM_DETAILS_COLORS.cardHeaderBorder }}
    >
      <div
        className="mb-8 flex gap-8 border-b"
        style={{ borderColor: SIM_DETAILS_COLORS.innerCardBorder }}
      >
        <button
          type="button"
          className="pb-3 text-base font-bold"
          style={{ color: SIM_DETAILS_COLORS.tabInactive }}
        >
          Details
        </button>
        <button
          type="button"
          className="-mb-px border-b-2 pb-3 text-base font-bold"
          style={{
            color: SIM_DETAILS_COLORS.tabActive,
            borderColor: SIM_DETAILS_COLORS.tabActive,
          }}
        >
          Data Usage
        </button>
      </div>

      <div className="mb-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div className="flex flex-col items-center">
          <DataUsageDonut percentage={dataUsage.usedPct} />
          <p
            className="mt-4 text-3xl font-bold"
            style={{ color: SIM_DATA_USAGE_COLORS.primary }}
          >
            {dataUsage.usedPct}%
          </p>
        </div>

        <div className="sm:pt-12">
          <p className="text-lg font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
            {dataUsage.usedLabel}
          </p>
          <p className="mt-1 text-base" style={{ color: SIM_DETAILS_COLORS.labelMuted }}>
            {dataUsage.remainingLabel}
          </p>
        </div>
      </div>

      <p
        className="mb-3 text-sm font-bold uppercase"
        style={{ color: SIM_DETAILS_COLORS.labelFaint }}
      >
        Usage Breakdown
      </p>
      <div className="mb-6">
        {dataUsage.breakdown.map((row) => (
          <DataRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>

      <p
        className="mb-3 text-sm font-bold uppercase"
        style={{ color: SIM_DETAILS_COLORS.labelFaint }}
      >
        Plan Details
      </p>
      <div className="mb-6">
        {dataUsage.plan.map((row) => (
          <DataRow
            key={row.label}
            label={row.label}
            value={row.value}
            danger={row.danger}
          />
        ))}
      </div>

      <p
        className="mb-3 text-sm font-bold uppercase"
        style={{ color: SIM_DETAILS_COLORS.labelFaint }}
      >
        Usage History
      </p>
      <div className="mb-6 grid grid-cols-7 items-end gap-2">
        {dataUsage.week.map((day) => (
          <div key={day.day} className="flex flex-col items-center gap-2">
            <div
              className={cn("w-full rounded-md", day.active && "shadow-sm")}
              style={{
                height: `${Math.max(28, (day.pct / maxPct) * 72)}px`,
                backgroundColor: day.active
                  ? SIM_DATA_USAGE_COLORS.primary
                  : SIM_DATA_USAGE_COLORS.mutedBar,
              }}
            />
            <span className="text-xs" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
              {day.day}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: SIM_DETAILS_COLORS.innerCardBorder }}>
        <div>
          <p
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: SIM_DATA_USAGE_COLORS.alertText }}
          >
            <AlertTriangle className="size-4" />
            Alert at 80% usage
          </p>
          <p className="mt-1 text-sm" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
            {dataUsage.alertNote}
          </p>
        </div>

        <span
          className="inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1"
          style={{
            backgroundColor: dataUsage.alertEnabled
              ? SIM_DATA_USAGE_COLORS.success
              : SIM_DATA_USAGE_COLORS.mutedBar,
          }}
          aria-label={dataUsage.alertEnabled ? "Usage alert enabled" : "Usage alert disabled"}
          role="switch"
          aria-checked={dataUsage.alertEnabled}
        >
          <span
            className="size-6 rounded-full bg-white shadow"
            style={{
              transform: dataUsage.alertEnabled
                ? "translateX(24px)"
                : "translateX(0)",
            }}
          />
        </span>
      </div>
    </div>
  );
}
