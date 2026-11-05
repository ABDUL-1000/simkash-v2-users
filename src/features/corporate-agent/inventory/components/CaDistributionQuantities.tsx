import type { ReactNode } from "react";
import { Select } from "antd";
import { Minus, Plus, CreditCard, Video, MapPin, Wifi } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { useGetCaUndistributedSims } from "../api/useCaInventory";
import type { CaSimSelection, CaSimType, CaStockSummary } from "../types/inventory";
import { CA_SIM_LABELS, CA_SIM_TYPES } from "../types/adapters";
import { simTagProps, useSimQuantity, useSimSearchState } from "@/hooks/useSimPicker";
import { simFilterOption, simOptions } from "@/utils/simSearch";

const TYPE_STYLE: Record<CaSimType, { icon: ReactNode; bg: string }> = {
  pos: { icon: <CreditCard className="w-4 h-4" />, bg: "bg-blue-50 text-blue-600" },
  cctv: { icon: <Video className="w-4 h-4" />, bg: "bg-emerald-50 text-emerald-600" },
  gps: { icon: <MapPin className="w-4 h-4" />, bg: "bg-purple-50 text-purple-600" },
  router: { icon: <Wifi className="w-4 h-4" />, bg: "bg-amber-50 text-amber-600" },
};

/** One row per SIM type: the stepper adds/removes the next SIM, the select picks exact numbers from GET /undistributed. */
export function CaDistributionQuantities({ selectedType, sims, onChange, stock }: { selectedType?: string; sims: CaSimSelection; onChange: (type: CaSimType, sims: string[]) => void; stock: CaStockSummary }) {
  return (
    <div className="space-y-2 pt-1">
      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        SIMs to Distribute
      </span>
      <div className="space-y-2">
        {CA_SIM_TYPES.map(type => <SimTypeRow key={type} type={type} available={stock[type]} autoFocus={selectedType === type} value={sims[type]} onChange={value => onChange(type, value)} />)}
      </div>
    </div>
  );
}

function SimTypeRow({ type, available, autoFocus, value, onChange }: { type: CaSimType; available: number; autoFocus: boolean; value: string[]; onChange: (sims: string[]) => void }) {
  const pool = useSimSearchState();
  const base = useGetCaUndistributedSims({ type, search: undefined, page: 1, limit: pool.limit }, available > 0 || value.length > 0);
  const found = useGetCaUndistributedSims({ type, search: pool.debouncedSearch || undefined, page: 1, limit: 100 }, available > 0 || value.length > 0);
  const isFetching = base.isFetching || found.isFetching;
  const options = simOptions(base.data?.sims, found.data?.sims);
  const quantity = useSimQuantity({ options, value, onChange, available, grow: pool.grow });
  const hasMore = (base.data?.sims?.length ?? 0) < available;
  return (
    <div className="p-3 rounded-2xl border bg-white space-y-2" style={{ borderColor: APP_COLORS.greys.stroke }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${TYPE_STYLE[type].bg}`}>{TYPE_STYLE[type].icon}</div>
          <div>
            <div className="font-bold text-slate-900 text-xs">{CA_SIM_LABELS[type]}</div>
            <div className={`text-[10px] ${type === "router" ? "text-amber-600 font-semibold" : "text-slate-400"}`}>{available} available</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" disabled={!value.length} onClick={quantity.remove} className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <input autoFocus={autoFocus} aria-label={`${CA_SIM_LABELS[type]} quantity`} inputMode="numeric" value={value.length} onFocus={e => e.target.select()} onChange={e => quantity.setCount(Number(e.target.value.replace(/\D/g, "")))} className="w-10 text-center font-black text-slate-900 text-sm" />
          <button type="button" disabled={!quantity.canAdd} onClick={quantity.add} className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {(available > 0 || value.length > 0) && <Select
        mode="multiple"
        className="w-full"
        placeholder={`Pick ${CA_SIM_LABELS[type]} numbers`}
        value={value}
        onChange={onChange}
        filterOption={simFilterOption}
        {...pool.selectProps(hasMore)}
        loading={isFetching}
        options={options}
        {...simTagProps}
        notFoundContent={isFetching ? "Loading SIMs…" : "No matching SIMs"}
      />}
    </div>
  );
}
