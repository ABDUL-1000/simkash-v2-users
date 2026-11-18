import { useDeferredValue, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ChevronRight, RefreshCw, RotateCcw, Search, Undo2 } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { AppModal } from "@/components/common/AppModal";
import { openNotification } from "@/utils/notifications";
import { useRecallHolders, useRecallSims, useRecallableSims } from "../api";
import { useHierarchyConfig } from "../roles";
import type { RecallHolder, RecallPayload, SimType, TypeCounts } from "../types";
import { SIM_TYPES, fmtDateTime, fmtNumber, simTypeLabel, unitLabel } from "../utils";
import { ErrorNote, FilterChips, Pager, PrimaryButton, footerClass, inputClass, secondaryBtn } from "../components/ui";

const PAGE_SIZE = 50;
const typesWithStock = (counts?: Partial<TypeCounts>) => SIM_TYPES.filter((t) => (counts?.[t] ?? 0) > 0);

export default function RecallSimsPage() {
  const config = useHierarchyConfig();
  const recall = config?.recall;
  const [params, setParams] = useSearchParams();
  const holderId = params.get("holder") ? Number(params.get("holder")) : null;
  const [search, setSearch] = useState("");
  const holders = useRecallHolders();

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    return [...(holders.data?.holders ?? [])]
      .filter((h) => !q || h.name?.toLowerCase().includes(q) || h.phone?.includes(q) || h.state?.toLowerCase().includes(q))
      .sort((a, b) => (b.recallable?.total ?? 0) - (a.recallable?.total ?? 0));
  }, [holders.data, search]);
  const selected = holders.data?.holders.find((h) => h.id === holderId) ?? null;
  const select = (id: number | null) => setParams((prev) => { const p = new URLSearchParams(prev); if (id == null) p.delete("holder"); else p.set("holder", String(id)); return p; });

  if (!recall) return <AppEmptyState title="Recall isn't available" description="Recalling SIMs is for State Coordinators and Regional Managers." />;
  const totals = holders.data?.totals;

  return <div className="w-full min-w-0 space-y-4 pb-12 sm:space-y-6">
    <div>
      <h1 className="text-xl font-black text-[#0F152A] sm:text-2xl">Recall SIMs</h1>
      <p className="mt-0.5 text-xs text-[#8C909B]">Take back SIMs your {recall.holderPlural} haven't {config.role === "REGIONAL_MANAGER" ? "passed on or activated" : "activated"}. They return to your stock straight away.</p>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      <div className="col-span-2 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:col-span-1 lg:col-span-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Recallable</p>
        <p className="mt-1 text-xl font-black text-[#0F152A]">{holders.isLoading ? "—" : fmtNumber(totals?.total)}</p>
      </div>
      {SIM_TYPES.map((t) => <div key={t} className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
        <p className="truncate text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">{simTypeLabel(t)}</p>
        <p className="mt-1 text-lg font-extrabold text-[#0F152A]">{holders.isLoading ? "—" : fmtNumber(totals?.[t])}</p>
      </div>)}
    </div>

    <div className="grid min-w-0 items-start gap-4 lg:grid-cols-12 lg:gap-6">
      {/* On mobile the list and the SIM picker take turns; on desktop they sit side by side. */}
      <section className={`min-w-0 space-y-3 rounded-2xl border border-[#E2ECF6] bg-white p-3 shadow-xs sm:p-4 lg:col-span-5 ${selected ? "hidden lg:block" : ""}`}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-[#0F152A]">{recall.holderPlural} <span className="font-semibold text-[#8C909B]">({fmtNumber(holders.data?.count)})</span></h2>
          {holders.isFetching && !holders.isLoading && <RefreshCw className="size-3.5 animate-spin text-[#2563EB]" />}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#8C909B]" />
          <input className={`${inputClass} pl-9`} placeholder="Search by name, phone or state" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {holders.isLoading ? <div className="space-y-2">{[0, 1, 2, 3].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}</div>
          : holders.error ? <ErrorNote message={holders.error.message} />
          : !list.length ? <p className="py-8 text-center text-xs text-[#8C909B]">{search ? "No match for your search." : `None of your ${recall.holderPlural} hold SIMs you can recall.`}</p>
          : <ul className="max-h-[60vh] space-y-1.5 overflow-y-auto pr-1">
              {list.map((h) => {
                const total = h.recallable?.total ?? 0;
                return <li key={h.id}>
                  <button type="button" onClick={() => select(h.id)} disabled={total === 0}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${h.id === holderId ? "border-[#2563EB] bg-[#EFF4F8]" : "border-[#E2ECF6] hover:border-[#C7DAFC] hover:bg-slate-50"}`}>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold capitalize text-[#0F152A]">{h.name?.toLowerCase()}</p>
                      <p className="truncate text-[11px] text-[#8C909B]">{[h.phone, h.state].filter(Boolean).join(" · ") || "—"}</p>
                      {total > 0 && <div className="mt-1.5 flex flex-wrap gap-1">{typesWithStock(h.recallable).map((t) =>
                        <span key={t} className="rounded-full bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#66738C] ring-1 ring-[#E2ECF6]">{fmtNumber(h.recallable[t])} {simTypeLabel(t).replace(/ SIM$/, "")}</span>)}</div>}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-black text-[#0F152A]">{fmtNumber(total)}</p>
                      <p className="text-[10px] text-[#8C909B]">recallable</p>
                    </div>
                    <ChevronRight className="size-4 shrink-0 text-[#8C909B]" />
                  </button>
                </li>;
              })}
            </ul>}
      </section>

      <section className={`min-w-0 lg:col-span-7 ${selected ? "" : "hidden lg:block"}`}>
        {selected ? <HolderSims key={selected.id} holder={selected} onBack={() => select(null)} />
          : <div className="rounded-2xl border border-dashed border-[#E2ECF6] bg-white p-10 text-center">
              <Undo2 className="mx-auto size-6 text-[#8C909B]" />
              <p className="mt-2 text-xs font-bold text-[#0F152A]">Choose a {recall.holderLabel}</p>
              <p className="text-[11px] text-[#8C909B]">Pick someone on the left to see the SIMs you can take back.</p>
            </div>}
      </section>
    </div>
  </div>;
}

function HolderSims({ holder, onBack }: { holder: RecallHolder; onBack: () => void }) {
  const config = useHierarchyConfig();
  const [type, setType] = useState<SimType | "all">("all");
  const [searchText, setSearchText] = useState("");
  const search = useDeferredValue(searchText.trim());
  const [page, setPage] = useState(1);
  // Selected numbers, with their type so the recall body can mix types.
  const [picked, setPicked] = useState<Map<string, SimType>>(new Map());
  const [confirm, setConfirm] = useState<RecallPayload | null>(null);
  const sims = useRecallableSims(holder.id, { type: type === "all" ? undefined : type, search: search || undefined, page, limit: PAGE_SIZE });
  const rows = sims.data?.sims ?? [];
  const counts = sims.data?.counts ?? holder.recallable;
  const allOnPage = rows.length > 0 && rows.every((s) => picked.has(s.number));

  const toggle = (number: string, simType: SimType) => setPicked((prev) => { const m = new Map(prev); if (m.has(number)) m.delete(number); else m.set(number, simType); return m; });
  const togglePage = () => setPicked((prev) => { const m = new Map(prev); rows.forEach((s) => (allOnPage ? m.delete(s.number) : m.set(s.number, s.type))); return m; });
  const allCount = type === "all" ? counts?.total ?? 0 : counts?.[type] ?? 0;

  return <div className="space-y-3 rounded-2xl border border-[#E2ECF6] bg-white p-3 shadow-xs sm:p-4">
    <div className="flex items-start gap-3">
      <button type="button" onClick={onBack} aria-label="Back" className="rounded-lg border border-[#E2ECF6] p-1.5 text-[#66738C] hover:bg-slate-50 lg:hidden"><ArrowLeft className="size-4" /></button>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-sm font-bold capitalize text-[#0F152A]">{holder.name?.toLowerCase()}</h2>
        <p className="truncate text-[11px] text-[#8C909B]">{config?.recall?.holderLabel}{holder.phone ? ` · ${holder.phone}` : ""}{holder.state ? ` · ${holder.state}` : ""}</p>
      </div>
      {sims.isFetching && !sims.isLoading && <RefreshCw className="mt-1 size-3.5 animate-spin text-[#2563EB]" />}
    </div>

    <FilterChips value={type} onChange={(v) => { setType(v); setPage(1); }}
      options={[{ value: "all" as const, label: "All", count: counts?.total }, ...typesWithStock(counts).map((t) => ({ value: t, label: simTypeLabel(t), count: counts?.[t] }))]} />
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#8C909B]" />
      <input className={`${inputClass} pl-9`} placeholder="Search SIM or serial number" value={searchText} onChange={(e) => { setSearchText(e.target.value); setPage(1); }} />
    </div>

    {sims.isLoading ? <div className="space-y-2">{[0, 1, 2, 3, 4].map((i) => <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />)}</div>
      : sims.error ? <ErrorNote message={sims.error.message} />
      : !rows.length ? <p className="py-8 text-center text-xs text-[#8C909B]">{search ? "No SIM matches that number." : "Nothing to recall here."}</p>
      : <div className="overflow-hidden rounded-xl border border-[#E2ECF6]">
          <label className="flex cursor-pointer items-center gap-3 border-b border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2.5 text-[11px] font-bold text-[#66738C]">
            <input type="checkbox" className="size-4 accent-[#2563EB]" checked={allOnPage} onChange={togglePage} />
            Select all on this page ({rows.length})
          </label>
          <ul className="max-h-[50vh] divide-y divide-[#E2ECF6] overflow-y-auto">
            {rows.map((s) => <li key={s.id}>
              <label className="flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-slate-50">
                <input type="checkbox" className="size-4 shrink-0 accent-[#2563EB]" checked={picked.has(s.number)} onChange={() => toggle(s.number, s.type)} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs font-bold text-[#0F152A]">{s.number}</p>
                  <p className="truncate text-[10px] text-[#8C909B]">{s.type_label || simTypeLabel(s.type)}{s.network ? ` · ${s.network}` : ""}</p>
                </div>
                <span className="hidden shrink-0 text-[10px] text-[#8C909B] sm:block">Given {fmtDateTime(s.assigned_at)}</span>
              </label>
            </li>)}
          </ul>
        </div>}

    {sims.data && <Pager page={page} totalPages={sims.data.pagination.totalPages} onChange={setPage} />}

    <div className="flex flex-col gap-2 border-t border-[#E2ECF6] pt-3 sm:flex-row sm:items-center sm:justify-between">
      <button type="button" disabled={!allCount} onClick={() => setConfirm(type === "all" ? { all: true } : { all: true, sim_type: type })}
        className="text-left text-[11px] font-bold text-[#EF4444] hover:underline disabled:opacity-40">
        Recall all {fmtNumber(allCount)} {type === "all" ? "items" : simTypeLabel(type) + "s"}
      </button>
      <div className="flex items-center gap-2">
        {picked.size > 0 && <button type="button" onClick={() => setPicked(new Map())} className={secondaryBtn}>Clear</button>}
        <PrimaryButton type="button" disabled={!picked.size} onClick={() => setConfirm({ items: [...picked].map(([sim_number, t]) => ({ type: t, sim_number })) })} className="flex-1 sm:flex-none">
          <RotateCcw className="size-3.5" /> Recall {picked.size ? fmtNumber(picked.size) : ""} selected
        </PrimaryButton>
      </div>
    </div>

    <ConfirmRecallModal holder={holder} payload={confirm} allCount={allCount} allType={type}
      onClose={() => setConfirm(null)} onDone={() => { setConfirm(null); setPicked(new Map()); setPage(1); }} />
  </div>;
}

function ConfirmRecallModal({ holder, payload, allCount, allType, onClose, onDone }: {
  holder: RecallHolder; payload: RecallPayload | null; allCount: number; allType: SimType | "all"; onClose: () => void; onDone: () => void;
}) {
  const recall = useRecallSims();
  const close = () => { if (recall.isPending) return; recall.reset(); onClose(); };
  const count = payload && "items" in payload ? payload.items.length : allCount;
  const what = payload && "items" in payload
    ? `${fmtNumber(count)} selected ${unitLabel(payload.items[0]?.type, count)}`
    : `all ${fmtNumber(count)} ${allType === "all" ? "recallable items" : `${simTypeLabel(allType)}s`}`;

  const submit = () => {
    if (!payload) return;
    recall.mutate({ ...payload, holder }, {
      onSuccess: (result) => {
        openNotification({ state: "success", title: "SIMs recalled", description: result?.message || `${fmtNumber(result?.total_recalled ?? count)} returned to your stock.` });
        recall.reset();
        onDone();
      },
    });
  };

  return <AppModal open={Boolean(payload)} onOpenChange={(v) => { if (!v) close(); }} title="Recall SIMs?" size="sm" showCloseButton={!recall.isPending}>
    <div className="space-y-4 pt-1 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#FFF1F2] text-[#EF4444]"><RotateCcw className="size-6" /></span>
      <p className="text-xs text-[#66738C]">You're taking back <b className="text-[#0F152A]">{what}</b> from <b className="capitalize text-[#0F152A]">{holder.name?.toLowerCase()}</b>. They'll go back into your stock and {holder.name} will be notified.</p>
      <p className="flex items-start gap-2 rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] p-3 text-left text-[11px] font-semibold text-[#D9990D]">
        <AlertTriangle className="mt-0.5 size-3.5 shrink-0" /> If any of these has been activated or passed on in the meantime, nothing is recalled and you'll see which ones.
      </p>
      <ErrorNote message={recall.error?.message} />
      <div className={footerClass}>
        <button type="button" onClick={close} disabled={recall.isPending} className={secondaryBtn}>Cancel</button>
        <PrimaryButton type="button" tone="red" loading={recall.isPending} onClick={submit}>{recall.isPending ? "Recalling…" : "Recall"}</PrimaryButton>
      </div>
    </div>
  </AppModal>;
}
