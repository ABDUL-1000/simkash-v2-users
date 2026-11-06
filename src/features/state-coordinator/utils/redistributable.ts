import type { RedistType, RedistributablePartner } from "../types/operations";

/** An Agency Partner picked as the source or target of a redistribution. */
export interface ScPartnerRef { id: number; name: string; phone: string; stock?: number }

type RawHolder = Partial<RedistributablePartner> & { agent_id?: number; id?: number; breakdown?: Partial<Record<RedistType, number>> };

/**
 * `partners` from GET /redistributable, keyed by a real id and without duplicates.
 * The id has come back under different names, and a missing id made every dropdown option share one value
 * (which renders as repeated names), so read it defensively.
 */
export function redistributableHolders(list?: RawHolder[]): RedistributablePartner[] {
  const byId = new Map<number, RedistributablePartner>();
  for (const raw of list ?? []) {
    const id = Number(raw.partner_id ?? raw.agent_id ?? raw.id ?? raw.user_id);
    if (!id || byId.has(id)) continue;
    byId.set(id, {
      partner_id: id, user_id: Number(raw.user_id ?? 0), name: raw.name ?? "Agency Partner", phone: raw.phone ?? "",
      unactivated_count: Number(raw.unactivated_count ?? 0), breakdown: { pos: 0, cctv: 0, gps: 0, router: 0, cctv_device: 0, ...raw.breakdown },
    });
  }
  return [...byId.values()];
}
