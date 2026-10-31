import React, { useState } from "react";
import { Select } from "antd";
import { ShieldCheck, UserCheck, Minus, Plus } from "lucide-react";
import { colors } from "@/constants/colors";
import { useGetEnterpriseUndistributedByType } from "../api";
import { EP_SIM_LABELS, EP_SIM_TYPES, emptyEpSims } from "../types/adapters";
import type { EpSimSelection, EpSimType, StockQuantities } from "../types/simInventory";
import type { EpCoordinatorOption } from "../types";

interface SingleScDistributionFormProps {
    coordinators: EpCoordinatorOption[];
    coordinatorsLoading?: boolean;
    onSearchCoordinators: (search: string) => void;
    stock: StockQuantities;
    selectedScId?: number;
    onSubmit: (payload: { sc: EpCoordinatorOption; sims: EpSimSelection; notes: string }) => void;
}

/** Recipient from GET /my-state-coordinator/overview; SIM numbers per type from GET /undistributed/{type}. */
export const SingleScDistributionForm: React.FC<SingleScDistributionFormProps> = ({ coordinators, coordinatorsLoading, onSearchCoordinators, stock, selectedScId, onSubmit }) => {
    const [scId, setScId] = useState(selectedScId);
    const [picked, setPicked] = useState<EpCoordinatorOption>();
    const [sims, setSims] = useState(emptyEpSims);
    const [notes, setNotes] = useState("");
    const currentSc = coordinators.find((c) => c.id === scId) ?? (picked?.id === scId ? picked : undefined);
    const totalSims = EP_SIM_TYPES.reduce((sum, type) => sum + sims[type].length, 0);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentSc && totalSims > 0)
            onSubmit({ sc: currentSc, sims, notes });
    };
    return (<form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5 min-w-0">
        <div className="p-5 bg-white rounded-xl border space-y-4" style={{ borderColor: colors.border }}>
          <label className="block text-sm font-bold text-slate-900">
            Select Recipient State Coordinator
          </label>
          <Select size="large" showSearch allowClear filterOption={false} className="w-full" placeholder="Search SC by name, phone or state" value={currentSc ? scId : undefined} onSearch={onSearchCoordinators}
            onChange={(value?: number) => { setScId(value); setPicked(coordinators.find((c) => c.id === value)); onSearchCoordinators(""); }} loading={coordinatorsLoading}
            notFoundContent={coordinatorsLoading ? "Loading coordinators…" : "No State Coordinators found"}
            options={[...coordinators, ...(picked && !coordinators.some((c) => c.id === picked.id) ? [picked] : [])].map((sc) => ({ value: sc.id, label: `${sc.name} — ${sc.state} · On-Hand: ${sc.stock} SIMs` }))}/>

          {currentSc && (<div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-600"/>
                <span className="font-bold text-slate-800">{currentSc.name}</span>
                <span className="text-slate-500">({currentSc.phone})</span>
              </div>
              <span className="text-slate-600 font-medium">
                Current On-Hand: <strong className="text-blue-700">{currentSc.stock} SIMs</strong>
              </span>
            </div>)}
        </div>

        <div className="p-5 bg-white rounded-xl border space-y-4" style={{ borderColor: colors.border }}>
          <h4 className="text-sm font-bold text-slate-900">Pick the SIMs to Allocate</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EP_SIM_TYPES.map((type) => <SimPickerRow key={type} type={type} available={stock[type]} value={sims[type]} onChange={(value) => setSims((previous) => ({ ...previous, [type]: value }))}/>)}
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-semibold text-slate-700">Dispatch Notes / Purpose</label>
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Stock distribution for Q4 rollout" className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500"/>
          </div>
        </div>
      </div>

      <div className="p-5 bg-white rounded-xl border space-y-4 h-fit" style={{ borderColor: colors.border }}>
        <h4 className="text-sm font-bold text-slate-900 border-b pb-3" style={{ borderColor: colors.border }}>
          Distribution Summary
        </h4>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Recipient:</span>
            <strong className="text-slate-900">{currentSc?.name ?? "—"}</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Destination:</span>
            <span className="font-semibold text-slate-800">{currentSc ? `${currentSc.state} State` : "—"}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Total Units:</span>
            <strong className="text-blue-600 font-bold">{totalSims.toLocaleString()} SIMs</strong>
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] space-y-1 text-slate-600">
          <div className="font-semibold text-slate-800">Remaining Enterprise Reserves:</div>
          <div>POS: {(stock.pos - sims.pos.length).toLocaleString()} · CCTV: {(stock.cctv - sims.cctv.length).toLocaleString()}</div>
          <div>GPS: {(stock.gps - sims.gps.length).toLocaleString()} · Router: {(stock.router - sims.router.length).toLocaleString()}</div>
        </div>

        <button type="submit" disabled={totalSims <= 0 || !currentSc} className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors">
          <ShieldCheck className="w-4 h-4"/>
          <span>Review & Distribute {totalSims > 0 ? `(${totalSims} SIMs)` : ""}</span>
        </button>
      </div>
    </form>);
};

function SimPickerRow({ type, available, value, onChange }: { type: EpSimType; available: number; value: string[]; onChange: (sims: string[]) => void }) {
    const [search, setSearch] = useState("");
    const query = useGetEnterpriseUndistributedByType(type, { search: search || undefined, page: 1, limit: 100 }, available > 0 || value.length > 0);
    const options = (query.data?.sims ?? []).map((sim) => ({ value: sim.sim_number, label: `${sim.sim_number} · ${sim.network}` }));
    const nextFree = options.find((option) => !value.includes(option.value))?.value;
    return (<div className="p-3 rounded-xl border border-slate-200 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-xs font-bold text-slate-900">{EP_SIM_LABELS[type]}s</div>
          <div className="text-[11px] text-slate-500">{available.toLocaleString()} available</div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Remove one" disabled={!value.length} onClick={() => onChange(value.slice(0, -1))} className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40"><Minus className="w-3.5 h-3.5"/></button>
          <span className="w-8 text-center font-black text-slate-900 text-sm">{value.length}</span>
          <button type="button" aria-label="Add one" disabled={!nextFree} onClick={() => nextFree && onChange([...value, nextFree])} className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40"><Plus className="w-3.5 h-3.5"/></button>
        </div>
      </div>
      {(available > 0 || value.length > 0) && <Select mode="multiple" className="w-full" placeholder={`Pick ${EP_SIM_LABELS[type]} numbers`} value={value} onChange={onChange} filterOption={false} onSearch={setSearch} onBlur={() => setSearch("")} loading={query.isFetching} options={options} maxTagCount="responsive" notFoundContent={query.isFetching ? "Loading SIMs…" : "No matching SIMs"}/>}
    </div>);
}
