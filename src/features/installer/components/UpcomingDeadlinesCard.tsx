import { Clock } from "lucide-react";
import type { UpcomingDeadline } from "../types";
import { UPCOMING_DEADLINES } from "../data/installer.data";

interface UpcomingDeadlinesCardProps {
  onSelectDeadline?: (deadline: UpcomingDeadline) => void;
}

export function UpcomingDeadlinesCard({ onSelectDeadline }: UpcomingDeadlinesCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
      <h3 className="text-sm font-bold text-[#0F152A] sm:text-base">Upcoming Deadlines</h3>

      <div className="mt-4 space-y-3.5">
        {UPCOMING_DEADLINES.map((item) => {
          const isUrgent = item.urgency === "urgent";
          const isModerate = item.urgency === "moderate";

          const dotBg = isUrgent ? "#FEF3C7" : isModerate ? "#EFF4F8" : "#EBFFF8";
          const dotColor = isUrgent ? "#D9990D" : isModerate ? "#2563EB" : "#10B981";
          const textColor = isUrgent ? "#D9990D" : isModerate ? "#2563EB" : "#10B981";

          return (
            <div
              key={item.id}
              onClick={() => onSelectDeadline?.(item)}
              className="flex items-start gap-3 cursor-pointer rounded-2xl p-2 transition-colors hover:bg-[#F8FAFC]"
            >
              <div
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: dotBg, color: dotColor }}
              >
                <Clock className="size-3.5" />
              </div>

              <div className="flex-1">
                <div className="text-[11px] font-semibold text-[#8C909B]">{item.jobRef}</div>
                <div className="text-xs font-bold text-[#0F152A]">{item.title}</div>
                <div className="text-[11px] font-semibold" style={{ color: textColor }}>
                  {item.dueDateText}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
