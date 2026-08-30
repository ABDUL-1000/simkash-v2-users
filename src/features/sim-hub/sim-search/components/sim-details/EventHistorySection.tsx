import type { ReactNode } from "react";
import { ArrowUp, ArrowRight, Check, MailOpen } from "lucide-react";
import { SIM_DETAILS_COLORS, CHAIN_NODE_COLORS, EVENT_HISTORY_COLORS } from "@/constants/colors";
import type { EventLogItem, SimDetails } from "@/types/sim-details.types";
import { SectionCard } from "./SectionCard";
import { Tag } from "./Tag";

const EVENT_ICONS: Record<EventLogItem["icon"], ReactNode> = {
  upload: <ArrowUp className="size-4" />,
  arrow: <ArrowRight className="size-4" />,
  check: <Check className="size-4" />,
  mail: <MailOpen className="size-4" />,
};

const EVENT_ICON_COLORS: Record<EventLogItem["icon"], { bg: string; text: string }> = {
  upload: { bg: "#DCFCE7", text: "#15803D" },
  arrow: { bg: CHAIN_NODE_COLORS.purpleBg, text: CHAIN_NODE_COLORS.purpleText },
  check: { bg: "#DCFCE7", text: "#15803D" },
  mail: { bg: EVENT_HISTORY_COLORS.yellowBg, text: EVENT_HISTORY_COLORS.goldenText },
};

export function EventHistorySection({ sim }: { sim: SimDetails }) {
  return (
    <SectionCard title="SIM Event History" subtitle="All events chronological">
      <div className="space-y-4">
        {sim.events.map((event) => {
          const colors = EVENT_ICON_COLORS[event.icon];
          return (
            <div key={event.id} className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: colors.bg, color: colors.text }}>
                {EVENT_ICONS[event.icon]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold" style={{ color: SIM_DETAILS_COLORS.valueDark }}>
                    {event.title}
                  </p>
                  {event.tag && (
                    <Tag bg={event.tag.bg} text={event.tag.text}>
                      {event.tag.label}
                    </Tag>
                  )}
                </div>
                <p className="text-xs" style={{ color: SIM_DETAILS_COLORS.labelFaint }}>
                  {event.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}