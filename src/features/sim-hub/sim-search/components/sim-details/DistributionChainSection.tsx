import { ArrowRight, Package } from "lucide-react";
import { SIM_DETAILS_COLORS } from "@/constants/colors";
import type { ChainNode, SimDetails } from "@/types/sim-details.types";
import { SectionCard } from "./SectionCard";
import { Tag } from "./Tag";

function ChainNodeRow({ node, isLast }: { node: ChainNode; isLast: boolean }) {
  return (
    <div className="relative flex gap-4 pb-6">
      {!isLast && <span className="absolute left-[19px] top-10 h-full w-px" style={{ backgroundColor: SIM_DETAILS_COLORS.innerCardBorder }} />}
      <span
        className="grid size-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
        style={{ backgroundColor: node.avatarBg ?? "#334155" }}
      >
        {node.kind === "batch" ? <Package className="size-4" /> : node.avatarInitials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
            {node.label}
          </span>
          <Tag bg="#F1F5F9" text={SIM_DETAILS_COLORS.labelMuted}>
            {node.dateLabel}
          </Tag>
        </div>
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <p className="text-sm font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
            {node.title}
          </p>
          {node.roleTag && (
            <Tag bg={node.roleTag.bg} text={node.roleTag.text}>
              {node.roleTag.label}
            </Tag>
          )}
          {node.badge && (
            <Tag bg={node.badge.bg} text={node.badge.text}>
              {node.badge.label}
            </Tag>
          )}
        </div>
        {node.subtitle && (
          <p className="text-sm" style={{ color: SIM_DETAILS_COLORS.labelMuted }}>
            {node.subtitle}
          </p>
        )}
        {node.extra && (
          <p className="text-sm" style={{ color: SIM_DETAILS_COLORS.labelMuted }}>
            {node.extra}
            {node.commission && <span> · Commission {node.commission}</span>}
          </p>
        )}
        {node.linkLabel && (
          <button type="button" className="mt-1 inline-flex items-center gap-1 text-sm font-bold hover:underline" style={{ color: "#2563EB" }}>
            {node.linkLabel} <ArrowRight className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export function DistributionChainSection({ sim }: { sim: SimDetails }) {
  return (
    <SectionCard title="Full Distribution Chain" subtitle={`${sim.chain.length} nodes · ${sim.chain.map((n) => n.label.split(" ")[0]).join(" → ")}`}>
      <div>
        {sim.chain.map((node, i) => (
          <ChainNodeRow key={node.id} node={node} isLast={i === sim.chain.length - 1} />
        ))}
      </div>
    </SectionCard>
  );
}