import { useState } from "react";
import { Select } from "antd";
import { ArrowRight, Package, Repeat, Smartphone, Users } from "lucide-react";
import { useScPartners } from "../../api/queries";
import { useGetScRedistributableSims } from "../../api/inventory";
import { ConfirmRedistributionModal } from "../../modals/ConfirmRedistributionModal";
import type { RedistType, RedistributableSim, RedistributionResult } from "../../types/operations";
import { REDIST_TYPES, REDIST_TYPE_LABELS, emptyRedistSelection } from "../../utils/simTypes";
import { ScRedistributableTable } from "./ScRedistributableTable";

const TYPE_ICON_BG: Record<RedistType, string> = { pos: "bg-[#EFF4F8] text-[#2563EB]", cctv: "bg-[#EBFFF8] text-[#10B981]", gps: "bg-purple-50 text-purple-600", router: "bg-amber-50 text-amber-600", cctv_device: "bg-[#F1F5F9] text-[#0F152A]" };

interface ScRedistributeTabProps {
  initialFromId?: number;
  onRedistributed: (result: RedistributionResult) => void;
}

/** Move unactivated SIMs from one AP to another — GET /redistributable + POST /redistribute. */
export function ScRedistributeTab({ initialFromId, onRedistributed }: ScRedistributeTabProps) {
  const [fromId, setFromId] = useState<number | undefined>(initialFromId);
  const [toId, setToId] = useState<number | undefined>();
  const [toSearch, setToSearch] = useState("");
  const [selected, setSelected] = useState(emptyRedistSelection);
  const [note, setNote] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Page 1 / limit 1 is enough for the overall summary and the list of APs holding unactivated SIMs.
  const overall = useGetScRedistributableSims({ page: 1, limit: 1 });
  const summary = overall.data?.summary;
  const holders = overall.data?.partners ?? [];
  const fromPartner = holders.find((partner) => partner.partner_id === fromId);
  const targets = useScPartners({ page: 1, limit: 20, search: toSearch || undefined });
  const targetList = (targets.data?.partners ?? []).filter((partner) => partner.id !== fromId);
  const toPartner = targets.data?.partners.find((partner) => partner.id === toId);
  const [toCache, setToCache] = useState<{ id: number; name: string; phone: string } | null>(null);
  const to = toPartner ? { id: toPartner.id, name: toPartner.name, phone: toPartner.phone } : toCache?.id === toId ? toCache : null;
  const from = fromPartner ? { id: fromPartner.partner_id, name: fromPartner.name, phone: fromPartner.phone } : null;

  const total = REDIST_TYPES.reduce((sum, type) => sum + selected[type].length, 0);
  const pickedSims = REDIST_TYPES.flatMap((type) => selected[type]);

  const chooseFrom = (id?: number) => {
    setFromId(id);
    setSelected(emptyRedistSelection());
    if (id && id === toId) setToId(undefined);
  };
  const chooseTo = (id?: number) => {
    setToId(id);
    const match = targets.data?.partners.find((partner) => partner.id === id);
    setToCache(match ? { id: match.id, name: match.name, phone: match.phone } : null);
    setToSearch("");
  };
  // Picking from the table switches the source AP when needed.
  const pickFromTable = (sim: RedistributableSim) => {
    if (sim.current_partner.id !== fromId) {
      setFromId(sim.current_partner.id);
      if (toId === sim.current_partner.id) setToId(undefined);
      setSelected({ ...emptyRedistSelection(), [sim.type]: [sim.sim_number] });
      return;
    }
    setSelected((prev) => ({ ...prev, [sim.type]: [...prev[sim.type], sim.sim_number] }));
  };

  return (
    <div className="space-y-6">
      {/* Summary strip */}
      {summary && <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-purple-50 text-[#7C3AED]"><Repeat className="size-4" /></div>
          <h3 className="text-2xl font-black text-[#7C3AED]">{summary.total.toLocaleString()}</h3>
          <p className="text-[11px] font-bold text-[#0F152A]">Redistributable</p>
          <p className="text-[10px] text-[#8C909B]">Unactivated with APs</p>
        </div>
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]"><Users className="size-4" /></div>
          <h3 className="text-2xl font-black text-[#0F152A]">{summary.partners_count}</h3>
          <p className="text-[11px] font-bold text-[#0F152A]">APs Holding</p>
          <p className="text-[10px] text-[#8C909B]">With unactivated SIMs</p>
        </div>
        {REDIST_TYPES.filter((type) => type !== "cctv_device" || summary.cctv_device > 0).map((type) => (
          <div key={type} className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
            <div className={`flex size-7 items-center justify-center rounded-lg ${TYPE_ICON_BG[type]}`}>{type === "pos" ? <Smartphone className="size-4" /> : <Package className="size-4" />}</div>
            <h3 className="text-2xl font-black text-[#0F152A]">{summary[type]}</h3>
            <p className="text-[11px] font-bold text-[#0F152A]">{REDIST_TYPE_LABELS[type]}</p>
          </div>
        ))}
      </div>}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2 rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-black text-[#0F152A]">Redistribute SIM Stock</h3>
            <p className="text-xs text-[#66738C] font-medium">Move unactivated SIMs from one Agency Partner to another</p>
          </div>

          <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">FROM AGENCY PARTNER</label>
              <Select
                size="large"
                showSearch
                allowClear
                optionFilterProp="label"
                className="w-full"
                placeholder="AP holding unactivated SIMs"
                value={fromId}
                onChange={(value?: number) => chooseFrom(value)}
                loading={overall.isLoading}
                options={holders.map((partner) => ({ value: partner.partner_id, label: `${partner.name} · ${partner.unactivated_count} unactivated` }))}
                notFoundContent={overall.isLoading ? "Loading…" : "No AP has unactivated SIMs"}
              />
            </div>
            <ArrowRight className="mx-auto mb-3 hidden size-4 text-[#8C909B] sm:block" />
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">TO AGENCY PARTNER</label>
              <Select
                size="large"
                showSearch
                allowClear
                filterOption={false}
                className="w-full"
                placeholder="Search AP by name or phone"
                value={toId}
                onSearch={setToSearch}
                onChange={(value?: number) => chooseTo(value)}
                loading={targets.isFetching}
                options={[
                  ...targetList.map((partner) => ({ value: partner.id, label: `${partner.name} · ${partner.phone} · ${partner.stock_label}` })),
                  ...(to && !targetList.some((partner) => partner.id === to.id) ? [{ value: to.id, label: `${to.name} · ${to.phone}` }] : []),
                ]}
                notFoundContent={targets.isFetching ? "Loading partners…" : "No agency partners found"}
              />
            </div>
          </div>

          {fromPartner && <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-[11px] text-[#66738C]">
            <strong className="text-[#0F152A]">{fromPartner.name}</strong> holds {fromPartner.unactivated_count} unactivated SIMs ·{" "}
            {REDIST_TYPES.filter((type) => fromPartner.breakdown[type]).map((type) => `${REDIST_TYPE_LABELS[type]} ${fromPartner.breakdown[type]}`).join(" · ")}
          </div>}

          {/* SIMs per type, from the source AP */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">SIMS TO MOVE</label>
            {!fromPartner ? <p className="rounded-2xl border border-dashed border-[#E2ECF6] p-4 text-center text-xs text-[#8C909B]">Choose the AP to take SIMs from, or pick SIMs in the table below.</p>
              : <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6]">
                {REDIST_TYPES.filter((type) => fromPartner.breakdown[type] > 0 || selected[type].length > 0).map((type) => (
                  <RedistTypeRow key={type} type={type} partnerId={fromPartner.partner_id} available={fromPartner.breakdown[type] ?? 0} value={selected[type]} onChange={(sims) => setSelected((prev) => ({ ...prev, [type]: sims }))} />
                ))}
              </div>}
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4">
            <h4 className="text-sm font-black text-[#0F152A]">Moving: {total} SIMs</h4>
            <p className="text-[11px] text-[#66738C] font-medium">{from && to ? `${from.name} → ${to.name}` : "Select both APs to continue"}</p>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">NOTE (OPTIONAL)</label>
            <textarea rows={2} value={note} placeholder="e.g. Reassignment due to partner low activity" onChange={(e) => setNote(e.target.value)} className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]" />
          </div>

          <button type="button" onClick={() => setConfirmOpen(true)} disabled={total === 0 || !from || !to} className="w-full rounded-2xl bg-[#7C3AED] py-3.5 text-sm font-black text-white shadow-md transition hover:bg-purple-700 disabled:opacity-50">
            Review Redistribution →
          </button>
        </div>

        {/* APs holding unactivated SIMs */}
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 self-start">
          <h3 className="text-xs font-extrabold text-[#0F152A]">APs Holding Unactivated SIMs</h3>
          {overall.isLoading && <p className="text-xs text-[#8C909B]">Loading…</p>}
          {!overall.isLoading && holders.length === 0 && <p className="text-xs text-[#8C909B]">No AP is holding unactivated SIMs.</p>}
          <div className="space-y-2">
            {holders.map((partner) => (
              <div key={partner.partner_id} className={`flex items-center justify-between gap-2 rounded-xl border p-2.5 text-xs ${partner.partner_id === fromId ? "border-[#7C3AED] bg-purple-50" : "border-[#E2ECF6] bg-[#F8FAFC]"}`}>
                <div className="min-w-0">
                  <p className="truncate font-extrabold text-[#0F152A]">{partner.name}</p>
                  <p className="text-[10px] text-[#8C909B]">{partner.unactivated_count} unactivated · {partner.phone}</p>
                </div>
                <button type="button" onClick={() => chooseFrom(partner.partner_id)} className="shrink-0 text-[11px] font-bold text-[#7C3AED] hover:underline">
                  {partner.partner_id === fromId ? "Selected" : "Move from"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ScRedistributableTable partners={holders} pickedSims={pickedSims} onPick={pickFromTable} />

      <ConfirmRedistributionModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        from={from}
        to={to}
        sims={selected}
        note={note}
        onSuccess={(result) => {
          setSelected(emptyRedistSelection());
          setNote("");
          onRedistributed(result);
        }}
      />
    </div>
  );
}

/** One SIM type held by the source AP: stepper adds/removes the next SIM; the select picks exact numbers. */
function RedistTypeRow({ type, partnerId, available, value, onChange }: {
  type: RedistType; partnerId: number; available: number; value: string[]; onChange: (sims: string[]) => void;
}) {
  const [search, setSearch] = useState("");
  const { data, isFetching } = useGetScRedistributableSims({ type, partnerId, search: search || undefined, page: 1, limit: 100 });
  const options = (data?.sims ?? []).map((sim) => ({ value: sim.sim_number, label: `${sim.sim_number} · ${sim.network}` }));
  const nextFree = options.find((option) => !value.includes(option.value))?.value;

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className={`flex size-6 items-center justify-center rounded-lg ${TYPE_ICON_BG[type]}`}>{type === "pos" ? <Smartphone className="size-3.5" /> : <Package className="size-3.5" />}</div>
            <h4 className="text-xs font-extrabold text-[#0F152A]">{REDIST_TYPE_LABELS[type]}</h4>
          </div>
          <p className="text-[11px] font-medium pt-0.5 text-[#66738C]">{available} unactivated with this AP</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" disabled={value.length === 0} onClick={() => onChange(value.slice(0, -1))} className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8] disabled:opacity-40">-</button>
          <span className="w-8 text-center text-base font-black text-[#0F152A]">{value.length}</span>
          <button type="button" disabled={!nextFree} onClick={() => nextFree && onChange([...value, nextFree])} className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8] disabled:opacity-40">+</button>
        </div>
      </div>
      <Select
        mode="multiple"
        className="w-full"
        placeholder={`Pick ${REDIST_TYPE_LABELS[type]} numbers`}
        value={value}
        onChange={onChange}
        filterOption={false}
        onSearch={setSearch}
        onBlur={() => setSearch("")}
        loading={isFetching}
        options={options}
        maxTagCount="responsive"
        notFoundContent={isFetching ? "Loading SIMs…" : "No matching SIMs"}
      />
    </div>
  );
}
