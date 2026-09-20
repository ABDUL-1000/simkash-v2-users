import {
  ArrowLeftRight,
  CheckCircle2,
  Undo2,
  SlidersHorizontal,
} from "lucide-react";
import { RECENT_MOVEMENTS_DATA } from "../../../data/rm-redistribute.data";
import type { RecentMovementItem } from "../../../types/rm-redistribute.types";

interface RecentMovementsCardProps {
  onViewAll?: () => void;
}

export function RecentMovementsCard({ onViewAll }: RecentMovementsCardProps) {
  const getIcon = (type: RecentMovementItem["type"]) => {
    switch (type) {
      case "transfer":
        return (
          <div className="flex size-7 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
            <ArrowLeftRight className="size-3.5" />
          </div>
        );
      case "received":
        return (
          <div className="flex size-7 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-3.5" />
          </div>
        );
      case "returned":
        return (
          <div className="flex size-7 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#D97706]">
            <Undo2 className="size-3.5" />
          </div>
        );
      case "adjustment":
        return (
          <div className="flex size-7 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <SlidersHorizontal className="size-3.5" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3.5 shadow-2xs">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#0F152A]">
          Recent Movements
        </h4>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-[#2563EB] hover:text-blue-700 transition"
        >
          View all
        </button>
      </div>

      <div className="space-y-2.5">
        {RECENT_MOVEMENTS_DATA.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {getIcon(item.type)}
              <div className="min-w-0">
                <p className="font-bold text-[#0F152A] truncate leading-tight">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#64748B] truncate leading-tight">
                  {item.subtitle}
                </p>
              </div>
            </div>

            <span className="shrink-0 text-[11px] font-semibold text-[#8C909B]">
              {item.timeAgo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
