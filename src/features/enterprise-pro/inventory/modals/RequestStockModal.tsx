import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useEnterpriseRequestStock } from "../api";
import { EP_SIM_LABELS, EP_SIM_TYPES } from "../types/adapters";
import type { EnterpriseSimInventoryOverviewData, EpSimType } from "../types/simInventory";

const NETWORKS = ["MTN", "Airtel", "Glo", "9mobile"];
const field = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-blue-500";

/** POST /sim-inventory/request-stock — one SIM type per request. */
export function RequestStockModal({ initialType, overview, onClose }: { initialType?: string; overview?: EnterpriseSimInventoryOverviewData; onClose: () => void }) {
  const mutation = useEnterpriseRequestStock();
  const [simType, setSimType] = useState<EpSimType>(EP_SIM_TYPES.includes(initialType as EpSimType) ? initialType as EpSimType : "pos");
  const [quantity, setQuantity] = useState("");
  const [network, setNetwork] = useState("");
  const [urgency, setUrgency] = useState<"normal" | "urgent">("normal");
  const [notes, setNotes] = useState("");
  const amount = Number(quantity) || 0;
  const available = overview?.stock_types?.find((item) => item.type === simType)?.available;
  const submit = () => {
    if (amount <= 0) return;
    mutation.mutate({ sim_type: simType, quantity: amount, network: network || undefined, urgency, notes: notes.trim() || undefined }, { onSuccess: onClose });
  };
  return (
    <AppModal open onOpenChange={(open) => { if (!open && !mutation.isPending) onClose(); }} title="Request SIM Stock" description={overview?.admin_info ? `Sent to ${overview.admin_info.name} · ${overview.admin_info.role}` : "Request replenishment from Admin"} size="sm" showCloseButton={!mutation.isPending}
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", disabled: mutation.isPending, onClick: onClose },
        { key: "submit", label: mutation.isPending ? "Submitting..." : "Submit Request", variant: "primary", disabled: mutation.isPending || amount <= 0, onClick: submit },
      ]}>
      <div className="space-y-3.5 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1"><span className="font-bold text-slate-800">SIM Type</span>
            <select value={simType} onChange={(e) => setSimType(e.target.value as EpSimType)} className={field}>{EP_SIM_TYPES.map((type) => <option key={type} value={type}>{EP_SIM_LABELS[type]}</option>)}</select>
          </label>
          <label className="block space-y-1"><span className="font-bold text-slate-800">Network (optional)</span>
            <select value={network} onChange={(e) => setNetwork(e.target.value)} className={field}><option value="">Any network</option>{NETWORKS.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          </label>
        </div>
        <label className="block space-y-1"><span className="font-bold text-slate-800">Quantity</span>
          <input inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value.replace(/\D/g, ""))} placeholder="e.g. 50" className={field} />
          {available != null && <span className="text-[11px] text-slate-500">{available.toLocaleString()} in stock now</span>}
        </label>
        <div className="space-y-1">
          <span className="font-bold text-slate-800">Urgency</span>
          <div className="grid grid-cols-2 gap-2">
            {(["normal", "urgent"] as const).map((value) => (
              <button key={value} type="button" onClick={() => setUrgency(value)} className={`rounded-xl border p-2.5 font-bold capitalize transition ${urgency === value ? (value === "urgent" ? "border-amber-500 bg-amber-50 text-amber-800" : "border-blue-600 bg-blue-50 text-blue-800") : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{value}</button>
            ))}
          </div>
        </div>
        <label className="block space-y-1"><span className="font-bold text-slate-800">Notes (optional)</span>
          <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Replenishing stock for Q4 expansion" className={field} />
        </label>
      </div>
    </AppModal>
  );
}
