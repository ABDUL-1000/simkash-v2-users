import { useMemo, useState } from "react";
import { Alert, Button } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CaSuccessModal } from "../../Modals/CaSuccessModal";
import { useGetCaDistributeContext, useGetCaApPreview, useCalculateCaDistributePreview } from "../api/useCaInventory";
import { useDebouncedValue } from "../api/useDebouncedValue";
import { contextRows } from "../types/adapters";
import type { CaQuantities, CaSimType, CaDistributionResult, CaDistributePreviewResponseData, CaDistributeContextData } from "../types/inventory";
import { CaInventoryQueryState } from "./CaInventoryQueryState";
import { CaDistributeTabForm } from "./CaDistributeTabForm";
import { CaDistributeTabPreview } from "./CaDistributeTabPreview";
import { CaConfirmDistributionModal } from "../Modals/CaConfirmDistributionModal";
export function CaDistributionTab({ initialPartnerId, initialType, onRequestStock }: { initialPartnerId?: number; initialType?: CaSimType; onRequestStock: () => void }) {
 const context = useGetCaDistributeContext();
 const [partnerId, setPartnerId] = useState(initialPartnerId);
 const profile = useGetCaApPreview(partnerId);
 const [quantities, setQuantities] = useState<CaQuantities>({ pos: 0, cctv: 0, gps: 0, router: 0 });
 const [note, setNote] = useState("");
 const [confirm, setConfirm] = useState<{ preview: CaDistributePreviewResponseData; stock: CaDistributeContextData["csa_stock"] }>();
 const [receipt, setReceipt] = useState<CaDistributionResult>();
 const payload = useMemo(() => ({ partner_id: partnerId ?? 0, quantities }), [partnerId, quantities]);
 const debounced = useDebouncedValue(payload);
 const valid = Boolean(partnerId && context.data && profile.data && !context.error && !profile.error
  && Object.values(quantities).some(q => q > 0) && Object.entries(quantities).every(([type, q]) => Number.isSafeInteger(q) && q >= 0 && q <= context.data.csa_stock[type as CaSimType]));
 const preview = useCalculateCaDistributePreview(debounced, valid && payload === debounced);
 const ready = valid && payload === debounced && Boolean(preview.data) && !preview.isFetching && !preview.error;
 const partners = context.data ? contextRows(context.data) : [];
 const selected = profile.data ? { id: String(profile.data.id), name: profile.data.name, phone: profile.data.phone, state: profile.data.location, total: profile.data.current_stock, status: profile.data.status, avatarInitials: profile.data.initials, customers: profile.data.customers, pos: 0, cctv: 0, gps: 0, router: 0 } : partners.find(ap => Number(ap.id) === partnerId);
 const setQty = (type: CaSimType) => (q: number) => setQuantities(previous => ({ ...previous, [type]: q }));
 const clear = () => { setQuantities({ pos: 0, cctv: 0, gps: 0, router: 0 }); setNote(""); };
 return <CaInventoryQueryState query={context}>{context.data && <>
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
   <div className="lg:col-span-7">
    {initialType && <p className="text-xs text-slate-500 mb-2">Selected SIM type: {initialType.toUpperCase()}. Enter the quantity below.</p>}
    <CaDistributeTabForm selectedType={initialType} selectedAp={selected} partners={partners} stock={context.data.csa_stock} previewReady={ready}
     safetyMessage={ready ? preview.data?.csa_stock.safety_message : undefined}
     onSelectAp={ap => { setPartnerId(Number(ap.id)); setConfirm(undefined); }}
     posQty={quantities.pos} setPosQty={setQty("pos")} cctvQty={quantities.cctv} setCctvQty={setQty("cctv")}
     gpsQty={quantities.gps} setGpsQty={setQty("gps")} routerQty={quantities.router} setRouterQty={setQty("router")}
     note={note} setNote={setNote} onClear={clear} onPreview={() => { if (ready && preview.data && context.data) setConfirm({ preview: preview.data, stock: context.data.csa_stock }); }} />
    {valid && (!ready && !preview.error) && <p role="status" className="text-xs text-slate-500 mt-2">Calculating distribution preview…</p>}
    {preview.error && <Alert type="error" title="Unable to calculate preview" description={preview.error.message} action={<Button onClick={() => void preview.refetch()}>Retry</Button>} />}
   </div>
   <div className="lg:col-span-5">{partnerId ? <CaInventoryQueryState query={profile}>{profile.data && <CaDistributeTabPreview selectedAp={profile.data} preview={ready ? preview.data : undefined} posQty={quantities.pos} cctvQty={quantities.cctv} gpsQty={quantities.gps} routerQty={quantities.router} onRequestStock={onRequestStock} />}</CaInventoryQueryState> : <AppEmptyState title="Select an agency partner" description="Their stock and distribution preview will appear here." />}</div>
  </div>
  {confirm && selected && <CaConfirmDistributionModal open onOpenChange={open => { if (!open) setConfirm(undefined); }} preview={confirm.preview} stock={confirm.stock} selectedAp={selected} posQty={quantities.pos} cctvQty={quantities.cctv} gpsQty={quantities.gps} routerQty={quantities.router} note={note} onEditQuantities={() => setConfirm(undefined)} onSuccess={result => { setReceipt(result); clear(); }} />}
  {receipt && <CaSuccessModal open onOpenChange={open => { if (!open) setReceipt(undefined); }} title="Distribution Completed!" subtitle={receipt.message} details={[
   { label: "Recipient", value: receipt.partner_name }, { label: "Dispatched", value: receipt.distributed_quantities.total + " SIMs" }, { label: "Reference", value: receipt.reference },
   { label: "Your remaining stock", value: String(receipt.csa_stock_after) }, { label: "AP stock after", value: String(receipt.partner_stock_after) },
  ]} />}
 </>}</CaInventoryQueryState>;
}
