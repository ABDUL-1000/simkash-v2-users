import { Clock3, MoreVertical } from "lucide-react";
import type { DeviceSimItem } from "../types/api";
import { NetworkBadge } from "./NetworkBadge";

type Props = { sim: DeviceSimItem; onRenew: () => void; onSwap: () => void; onDetails: () => void };

export function ActiveSimCardTile({ sim, onRenew, onSwap, onDetails }: Props) {
  const expiring = sim.status === "expiring" || sim.isExpiringSoon;
  const expired = sim.status === "expired";
  const number = sim.sim_number.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  return <article className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between"><div className="flex gap-2"><NetworkBadge network={sim.network} /><span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">{sim.typeLabel || sim.sim_type}</span></div><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${expiring || expired ? "bg-red-50 text-[#EF4444]" : "bg-emerald-50 text-[#10B981]"}`}>{expired ? "Expired" : expiring ? "Expiring" : "Active"}</span><MoreVertical className="size-4 text-[#8C909B]" /></div>
    <button type="button" onClick={onDetails} className="mt-3 text-left text-xl font-bold tracking-wide text-[#0F152A]">{number}</button>
    <dl className="mt-3 grid grid-cols-[72px_1fr] gap-y-1 text-[11px]"><dt className="text-[#8C909B]">Activated</dt><dd>{sim.activated_at || "—"}</dd><dt className="text-[#8C909B]">Type</dt><dd>{sim.typeLabel || sim.sim_type}</dd><dt className="text-[#8C909B]">Expires</dt><dd>{sim.expiredDate || "—"}</dd><dt className="text-[#8C909B]">Network</dt><dd>{sim.network}</dd></dl>
    <p className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#8C909B]"><Clock3 size={12} />{sim.renewsInText || (sim.daysLeft != null ? `Renews in ${sim.daysLeft} days` : "Renewal date unavailable")}</p>
    <div className="mt-3 grid grid-cols-[1fr_auto_auto] gap-2"><button type="button" onClick={onRenew} className="rounded-lg bg-[#2563EB] px-3 py-2 text-xs font-semibold text-white">Renew</button><button type="button" onClick={onSwap} className="rounded-lg border border-[#E2ECF6] px-3 py-2 text-xs font-semibold">SIM Swap</button><button type="button" onClick={onDetails} className="rounded-lg border border-[#E2ECF6] px-3 py-2 text-xs font-semibold">Details</button></div>
  </article>;
}
