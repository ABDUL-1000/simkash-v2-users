import { SIM_DETAILS_COLORS } from "@/constants/colors";
import type { SimDetails } from "@/types/sim-details.types";
import { SectionCard } from "./SectionCard";
import { Tag } from "./Tag";

export function NotificationLogSection({ sim }: { sim: SimDetails }) {
  return (
    <SectionCard title="Notification Log">
      <div className="space-y-3">
        {sim.notifications.map((n) => (
          <div key={n.id} className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="mt-1.5 size-2 shrink-0 rounded-full" style={{ backgroundColor: n.dotColor }} />
              <div>
                <p className="text-sm font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
                  {n.title}
                </p>
                <p className="text-xs" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
                  {n.timestamp}
                </p>
              </div>
            </div>
            <Tag bg={n.tag === "Auto" ? "#F1F5F9" : "#EFF6FF"} text={n.tag === "Auto" ? SIM_DETAILS_COLORS.labelMuted : "#1E40AF"}>
              {n.tag}
            </Tag>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}