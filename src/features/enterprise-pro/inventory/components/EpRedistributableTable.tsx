import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetEnterpriseRedistributableSims as useGetScRedistributableSims } from "../api";
import type { EpRedistributableCoordinator as RedistributablePartner, EpRedistributableSim as RedistributableSim } from "../types/simInventory";
import { EP_SIM_TYPES as REDIST_TYPES, EP_SIM_LABELS as REDIST_TYPE_LABELS } from "../types/adapters";

const PAGE_SIZE = 20;

interface EpRedistributableTableProps {
  partners: RedistributablePartner[];
  /** Adds the SIM to the redistribution form (and makes its AP the source). */
  onPick: (sim: RedistributableSim) => void;
  pickedSims: string[];
}

/** All unactivated SIMs sitting with your State Coordinators — GET /sim-inventory/redistributable. */
export function EpRedistributableTable({ partners, onPick, pickedSims }: EpRedistributableTableProps) {
  const [type, setType] = useState("all");
  const [partnerId, setPartnerId] = useState<number | undefined>();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    const timer = window.setTimeout(() => { setSearch(searchInput.trim()); setPage(1); }, 400);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isFetching, error, refetch } = useGetScRedistributableSims({ type, coordinatorId: partnerId, search: search || undefined, page, limit: PAGE_SIZE });
  const sims = data?.sims ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;
  const total = data?.pagination.total ?? 0;

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-black text-[#0F152A]">Redistributable SIMs</h3>
          <p className="text-xs text-[#66738C]">Unactivated SIMs currently with your State Coordinators</p>
        </div>
        <span className="text-[11px] font-medium text-[#8C909B]">{total.toLocaleString()} SIMs</span>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 size-4 text-[#8C909B]" />
          <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search SIM number or device serial" className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 pl-9 pr-3 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]" />
        </div>
        <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none">
          <option value="all">All types</option>
          {REDIST_TYPES.map((value) => <option key={value} value={value}>{REDIST_TYPE_LABELS[value]}</option>)}
        </select>
        <select value={partnerId ?? ""} onChange={(e) => { setPartnerId(Number(e.target.value) || undefined); setPage(1); }} className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2 text-xs font-bold text-[#0F152A] outline-none">
          <option value="">All SCs</option>
          {partners.map((partner) => <option key={partner.coordinator_id} value={partner.coordinator_id}>{partner.name} ({partner.unactivated_count})</option>)}
        </select>
      </div>

      {/* Table */}
      {error ? <AppEmptyState title="Couldn't load redistributable SIMs" description={error.message} actionText="Retry" onAction={() => void refetch()} />
        : <div className={`overflow-x-auto rounded-2xl border border-[#E2ECF6] ${isFetching && !isLoading ? "opacity-60" : ""}`}>
          <table className="w-full min-w-[720px] text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B] border-b border-[#E2ECF6]">
              <tr>
                <th className="py-2.5 px-4">SIM NUMBER</th>
                <th className="py-2.5 px-4">TYPE</th>
                <th className="py-2.5 px-4">NETWORK</th>
                <th className="py-2.5 px-4">WITH SC</th>
                <th className="py-2.5 px-4">STATUS</th>
                <th className="py-2.5 px-4">DISTRIBUTED</th>
                <th className="py-2.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
              {isLoading && <tr><td colSpan={7} className="py-6 text-center text-[#8C909B]">Loading SIMs…</td></tr>}
              {!isLoading && sims.length === 0 && <tr><td colSpan={7} className="py-6 text-center text-[#8C909B]">No unactivated SIMs with your SCs match these filters.</td></tr>}
              {sims.map((sim) => {
                const picked = pickedSims.includes(sim.sim_number);
                return (
                  <tr key={sim.id} className="hover:bg-[#F8FAFC] transition">
                    <td className="py-2.5 px-4 font-mono font-bold">{sim.sim_number}</td>
                    <td className="py-2.5 px-4"><span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[9px] font-bold text-[#2563EB]">{sim.type_label}</span></td>
                    <td className="py-2.5 px-4 text-[#66738C]">{sim.network}</td>
                    <td className="py-2.5 px-4">
                      <p className="font-extrabold">{sim.current_coordinator.name}</p>
                      <p className="text-[10px] text-[#8C909B]">{sim.current_coordinator.phone}</p>
                    </td>
                    <td className="py-2.5 px-4"><span className="rounded-full bg-[#FFFBEB] px-2.5 py-0.5 text-[9px] font-extrabold text-[#D9990D]">{sim.status_label}</span></td>
                    <td className="py-2.5 px-4 text-[#66738C]">{new Date(sim.distributed_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</td>
                    <td className="py-2.5 px-4 text-right">
                      <button type="button" disabled={picked} onClick={() => onPick(sim)} className="text-xs font-bold text-[#7C3AED] hover:underline disabled:text-[#10B981] disabled:no-underline">
                        {picked ? "Selected ✓" : "Redistribute"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>}

      {/* Pagination */}
      {total > 0 && <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1 text-xs">
        <div className="flex items-center gap-1">
          <button type="button" disabled={page <= 1 || isFetching} onClick={() => setPage(page - 1)} className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 font-bold text-[#66738C] hover:bg-[#F8FAFC] disabled:opacity-40">Prev</button>
          <span className="rounded-lg bg-[#0F152A] px-3 py-1 font-bold text-white">{page}</span>
          <span className="px-1 text-[#8C909B]">of {totalPages}</span>
          <button type="button" disabled={page >= totalPages || isFetching} onClick={() => setPage(page + 1)} className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 font-bold text-[#66738C] hover:bg-[#F8FAFC] disabled:opacity-40">Next</button>
        </div>
        <span className="text-[11px] text-[#8C909B]">Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, total)} of {total}</span>
      </div>}
    </div>
  );
}
