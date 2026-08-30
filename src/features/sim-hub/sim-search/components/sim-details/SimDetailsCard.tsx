import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { SIM_DETAILS_COLORS, EVENT_HISTORY_COLORS, NETWORK_COLORS } from "@/constants/colors";
import type { SimDetails, OnSimAction } from "@/types/sim-details.types";
import { SectionCard } from "./SectionCard";
import { Tag } from "./Tag";
import { ActionButton } from "./ActionButton";


function DetailsTab({ sim }: { sim: SimDetails }) {
  const networkColor = NETWORK_COLORS[sim.network.toLowerCase() as keyof typeof NETWORK_COLORS];

  return (
    <div>
      <p className="text-sm" style={{ color: SIM_DETAILS_COLORS.labelMuted }}>
        SIM Number
      </p>
      <p className="mb-3 text-2xl font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
        {sim.simNumber}
      </p>

      <div className="mb-4 flex gap-2">
        {networkColor && (
          <Tag bg={networkColor.bg} text={networkColor.text}>
            {sim.network.toUpperCase()}
          </Tag>
        )}
        <Tag bg="#EFF6FF" text="#1E40AF">
          {sim.simType}
        </Tag>
      </div>

      <p className="text-xs" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
        ICCID
      </p>
      <p className="mb-4 text-sm font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
        {sim.iccid}
      </p>

      <div className="flex flex-wrap gap-8 border-t pt-4" style={{ borderColor: SIM_DETAILS_COLORS.innerCardBorder }}>
        <div>
          <p className="text-xs" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
            Activated
          </p>
          <p className="text-sm font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
            {sim.activatedDate}
          </p>
        </div>
        <div>
          <p className="text-xs" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
            Expiry
          </p>
          <p className="text-sm font-bold" style={{ color: SIM_DETAILS_COLORS.danger }}>
            {sim.expiryDate}
          </p>
        </div>
        <div>
          <p className="text-xs" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
            Days Remaining
          </p>
          <p className="text-sm font-bold" style={{ color: SIM_DETAILS_COLORS.danger }}>
            {sim.daysRemaining} days
          </p>
        </div>
      </div>
    </div>
  );
}

function UsageDonut({ pct }: { pct: number }) {
  return (
    <div className="grid size-36 place-items-center rounded-full" style={{ background: `conic-gradient(#2563EB ${pct * 3.6}deg, #E2E8F0 0deg)` }}>
      <div className="grid size-28 place-items-center rounded-full bg-white">
        <span className="text-2xl font-bold" style={{ color: "#2563EB" }}>
          {pct}%
        </span>
      </div>
    </div>
  );
}

function DataUsageTab({ sim }: { sim: SimDetails }) {
  const { dataUsage } = sim;
  const maxPct = Math.max(...dataUsage.week.map((d) => d.pct), 1);

  return (
    <div>
      <div className="mb-2 flex justify-center">
        <UsageDonut pct={dataUsage.usedPct} />
      </div>
      <p className="mt-2 text-center text-base font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
        {dataUsage.usedLabel}
      </p>
      <p className="mb-6 text-center text-sm" style={{ color: SIM_DETAILS_COLORS.labelMuted }}>
        {dataUsage.remainingLabel}
      </p>

      <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
        Usage Breakdown
      </p>
      <div className="mb-6 divide-y" style={{ borderColor: SIM_DETAILS_COLORS.innerCardBorder }}>
        {dataUsage.breakdown.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-3">
            <span className="text-sm" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
              {row.label}
            </span>
            <span className="text-sm font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <p className="mb-2 text-xs font-bold uppercase tracking-wide" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
        Plan Details
      </p>
      <div className="mb-6 divide-y" style={{ borderColor: SIM_DETAILS_COLORS.innerCardBorder }}>
        {dataUsage.plan.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-3">
            <span className="text-sm" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
              {row.label}
            </span>
            <span className="text-sm font-bold" style={{ color: row.danger ? SIM_DETAILS_COLORS.danger : SIM_DETAILS_COLORS.valueDark }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <p className="mb-3 text-xs font-bold uppercase tracking-wide" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
        Usage History
      </p>
      <div className="mb-4 flex items-end gap-2">
        {dataUsage.week.map((d) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-md"
              style={{ height: `${Math.max(16, (d.pct / maxPct) * 64)}px`, backgroundColor: d.active ? "#2563EB" : "#CBD5E1" }}
            />
            <span className="text-xs" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
              {d.day}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: SIM_DETAILS_COLORS.innerCardBorder }}>
        <div>
          <p className="flex items-center gap-1.5 text-sm font-medium" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
            <AlertTriangle className="size-4" style={{ color: EVENT_HISTORY_COLORS.goldenText }} />
            Alert at 80% usage
          </p>
          <p className="mt-0.5 text-xs" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
            {dataUsage.alertNote}
          </p>
        </div>
        <span
          className="inline-flex h-6 w-11 items-center rounded-full p-0.5 transition-colors"
          style={{ backgroundColor: dataUsage.alertEnabled ? "#16A34A" : "#CBD5E1" }}
        >
          <span
            className="size-5 rounded-full bg-white shadow transition-transform"
            style={{ transform: dataUsage.alertEnabled ? "translateX(20px)" : "translateX(0)" }}
          />
        </span>
      </div>
    </div>
  );
}

export function SimDetailsCard({ sim, onAction }: { sim: SimDetails; onAction: OnSimAction }) {
  const [tab, setTab] = useState<"details" | "usage">("details");

  return (
    <SectionCard
      title="SIM Details"
      right={
        <Tag bg={SIM_DETAILS_COLORS.activatedBg} text={SIM_DETAILS_COLORS.activatedText}>
          ACTIVATED
        </Tag>
      }
    >
      <div className="mb-5 flex gap-6 border-b" style={{ borderColor: SIM_DETAILS_COLORS.innerCardBorder }}>
        {(["details", "usage"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="-mb-px border-b-2 pb-2 text-sm font-semibold"
            style={{
              color: tab === t ? SIM_DETAILS_COLORS.tabActive : SIM_DETAILS_COLORS.tabInactive,
              borderColor: tab === t ? SIM_DETAILS_COLORS.tabActive : "transparent",
            }}
          >
            {t === "details" ? "Details" : "Data Usage"}
          </button>
        ))}
      </div>

      {tab === "details" ? (
        <>
          <DetailsTab sim={sim} />
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="flex-1">
              <ActionButton icon={null} label="Renew on Behalf" tone="primary" onClick={() => onAction("renew")} />
            </div>
            <div className="flex-1">
              <ActionButton icon={null} label="Place PND" tone="warning" onClick={() => onAction("pnd")} />
            </div>
            <div className="flex-1">
              <ActionButton icon={null} label="Deactivate SIM" tone="danger" onClick={() => onAction("deactivate")} />
            </div>
          </div>
        </>
      ) : (
        <DataUsageTab sim={sim} />
      )}
    </SectionCard>
  );
}