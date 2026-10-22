import { Dropdown } from "antd";
import { Bell, CardSim, Ellipsis, Eye, Send, Trophy, Users } from "lucide-react";
import type { ScAgentItem } from "../../types/operations";

// Status pill + card border per my-agent status.
const STATUS_STYLE: Record<string, { pill: string; dot: string; border: string }> = {
  active: { pill: "bg-[#EBFFF8] text-[#10B981]", dot: "bg-[#10B981]", border: "border-[#E2ECF6]" },
  low_stock: { pill: "bg-[#FFFBEB] text-[#D9990D]", dot: "bg-[#F59E0B]", border: "border-[#F59E0B]" },
  suspended: { pill: "bg-[#FFF7F8] text-[#EF4444]", dot: "bg-[#EF4444]", border: "border-[#F87171]" },
  new: { pill: "bg-[#EFF4F8] text-[#0F152A]", dot: "bg-[#0F152A]", border: "border-[#E2ECF6]" },
};
const BONUS_TONE: Record<string, string> = { achieved: "text-[#7C3AED]", on_track: "text-[#10B981]", at_risk: "text-[#D9990D]", missed: "text-[#EF4444]" };
const bonusKey = (value: string) => value.toLowerCase().replaceAll(" ", "_");

interface ScPartnerCardProps {
  partner: ScAgentItem;
  onView: () => void;
  onDistribute: () => void;
  onRemind: () => void;
  onSuspend: () => void;
}

export function ScPartnerCard({ partner, onView, onDistribute, onRemind, onSuspend }: ScPartnerCardProps) {
  const suspended = partner.status === "suspended";
  const out = partner.stock === 0;
  const style = STATUS_STYLE[partner.status] ?? STATUS_STYLE.active;
  const border = out && !suspended ? "border-[#F87171]" : style.border;
  const stockTone = out ? "text-[#EF4444]" : partner.status === "low_stock" ? "text-[#F59E0B]" : "text-[#10B981]";
  const bonusTone = BONUS_TONE[bonusKey(partner.bonus_milestone)] ?? "text-[#8C909B]";

  return (
    <div className={`rounded-2xl border bg-white p-4 shadow-xs space-y-3 ${border} ${out || partner.status === "low_stock" || suspended ? "border-2" : ""}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F8FAFC] border border-[#E2ECF6] text-xs font-black text-[#0F152A]">
            {partner.initials}
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-sm font-extrabold text-[#0F152A]">{partner.name}</h4>
            <p className="text-[11px] text-[#66738C]">{partner.phone}</p>
            {partner.location && <p className="text-[10px] text-[#8C909B]">{partner.location}</p>}
          </div>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${style.pill}`}>
          <span className={`size-1.5 rounded-full ${style.dot}`} />
          {partner.status_label}
        </span>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-xl bg-[#F8FAFC] p-2.5 text-center">
          <CardSim className={`mx-auto size-3.5 ${stockTone}`} />
          <p className="text-lg font-black text-[#0F152A]">{out ? "OUT" : partner.stock}</p>
          <p className="text-[9px] text-[#8C909B]">SIMs</p>
        </div>
        <div className="rounded-xl bg-[#F8FAFC] p-2.5 text-center">
          <Users className="mx-auto size-3.5 text-[#0F152A]" />
          <p className="text-lg font-black text-[#0F152A]">{partner.customers_count.toLocaleString()}</p>
          <p className="text-[9px] text-[#8C909B]">Customers</p>
        </div>
        <div className="rounded-xl bg-[#F8FAFC] p-2.5 text-center">
          <CardSim className="mx-auto size-3.5 text-[#10B981]" />
          <p className="text-lg font-black text-[#0F152A]">{suspended ? "Suspended" : `${partner.acts_per_month.toLocaleString()}/mo`}</p>
          <p className="text-[9px] text-[#8C909B]">This month</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-[#F8FAFC] p-2.5 text-center">
          <Trophy className={`size-3.5 ${bonusTone}`} />
          <p className={`pt-0.5 text-[11px] font-bold ${bonusTone}`}>{partner.bonus_milestone || "N/A"}</p>
        </div>
      </div>
      {/* The design's per-AP bonus progress bar is omitted: the API returns the milestone, not a percentage. */}

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-3 text-xs font-bold">
        <div className="flex items-center gap-4">
          <button type="button" onClick={onView} className="flex items-center gap-1 text-[#0F152A] hover:text-[#2563EB]"><Eye className="size-3.5" />View</button>
          <button type="button" onClick={onDistribute} className="flex items-center gap-1 text-[#10B981] hover:underline"><Send className="size-3.5" />Distribute</button>
          <button type="button" onClick={onRemind} className="flex items-center gap-1 text-[#F59E0B] hover:underline"><Bell className="size-3.5" />Remind</button>
        </div>
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              { key: "view", label: "View profile", onClick: onView },
              { key: "suspend", label: suspended ? "Re-activate AP" : "Suspend AP", danger: !suspended, onClick: onSuspend },
            ],
          }}
        >
          <button type="button" aria-label="More actions" className="rounded-lg p-1 text-[#8C909B] hover:bg-[#F8FAFC] hover:text-[#0F152A]"><Ellipsis className="size-4" /></button>
        </Dropdown>
      </div>
    </div>
  );
}
