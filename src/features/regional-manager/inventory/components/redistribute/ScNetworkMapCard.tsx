import type { ScNetworkMapItem } from "../../../types/rm-redistribute.types";
import { SC_NETWORK_MAP_DATA } from "../../../data/rm-redistribute.data";

interface ScNetworkMapCardProps {
  onSelectSc?: (sc: ScNetworkMapItem) => void;
  selectedScId?: string;
}

export function ScNetworkMapCard({
  onSelectSc,
  selectedScId,
}: ScNetworkMapCardProps) {
  const getBadgeClass = (tone: ScNetworkMapItem["tone"]) => {
    switch (tone) {
      case "green":
        return "bg-[#EBFFF8] text-[#10B981]";
      case "yellow":
        return "bg-[#FFFBEB] text-[#D97706]";
      case "red":
        return "bg-[#FFF7F8] text-[#EF4444]";
      case "blue":
        return "bg-[#EFF6FF] text-[#2563EB]";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#0F152A]">
          SC Network Map
        </h4>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-[#64748B]">
          {SC_NETWORK_MAP_DATA.length} SCs
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {SC_NETWORK_MAP_DATA.map((sc) => {
          const isSelected = selectedScId === sc.id;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => onSelectSc?.(sc)}
              className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-left transition ${
                isSelected
                  ? "border border-blue-500 bg-blue-50/50"
                  : "border border-slate-100 bg-slate-50/50 hover:bg-slate-100/60"
              }`}
            >
              <span className="text-xs font-bold text-[#0F152A] truncate">
                {sc.name}
              </span>
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${getBadgeClass(
                  sc.tone
                )}`}
              >
                {sc.stock}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
