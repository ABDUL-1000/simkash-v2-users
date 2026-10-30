import { useState } from "react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CaSuccessModal } from "../../Modals/CaSuccessModal";
import { useGetCaUndistributedSims } from "../api/useCaInventory";
import { useDebouncedValue } from "../api/useDebouncedValue";
import { useGetCaPartnerDetail, useGetCaPartnerStockHistory, useGetCaPartnersOverview } from "../../my-partner/api/useCaPartners";
import { CA_SIM_TYPES, emptyCaSims, partnerRows, stockText } from "../types/adapters";
import type { CaDistributionResult, CaSimType, CaStockSummary } from "../types/inventory";
import type { CaApPreview, CaApStockDistributionRow, CaDistributionPreview } from "../types/ca-inventory.types";
import { CaInventoryQueryState } from "./CaInventoryQueryState";
import { CaDistributeTabForm } from "./CaDistributeTabForm";
import { CaDistributeTabPreview } from "./CaDistributeTabPreview";
import { CaConfirmDistributionModal } from "../Modals/CaConfirmDistributionModal";

const LOW_STOCK = 10;

/**
 * Distribute exact SIM numbers to an AP: stock + SIM pickers from GET /undistributed, recipients from GET /my-partner/overview,
 * recipient card from GET /my-partner/{id} (+ /stock-history), and POST /distribute on confirm.
 */
export function CaDistributionTab({ initialPartnerId, initialType, onRequestStock }: { initialPartnerId?: number; initialType?: CaSimType; onRequestStock: () => void }) {
 // limit 1: only the per-type summary is needed here; each SIM row loads its own numbers.
 const stockQuery = useGetCaUndistributedSims({ type: "all", page: 1, limit: 1 });
 const [partnerSearch, setPartnerSearch] = useState("");
 const debouncedSearch = useDebouncedValue(partnerSearch);
 const partnersQuery = useGetCaPartnersOverview({ search: debouncedSearch || undefined, page: 1, limit: 50 });
 const [partnerId, setPartnerId] = useState(initialPartnerId);
 const profile = useGetCaPartnerDetail(partnerId);
 const lastSent = useGetCaPartnerStockHistory(partnerId);
 const [sims, setSims] = useState(emptyCaSims);
 const [note, setNote] = useState("");
 const [confirmOpen, setConfirmOpen] = useState(false);
 const [receipt, setReceipt] = useState<CaDistributionResult>();

 const summary = stockQuery.data?.summary;
 const stock: CaStockSummary | undefined = summary && { pos: summary.pos, cctv: summary.cctv, gps: summary.gps, router: summary.router, total: summary.total_undistributed, summary_text: stockText(summary) };
 const partners = partnerRows(partnersQuery.data);
 const detail = profile.data;
 const selectedAp: CaApPreview | undefined = detail && partnerId ? {
  id: partnerId, name: detail.hero.name, phone: detail.hero.phone, initials: detail.hero.initials,
  location: [detail.profile_details.lga, detail.profile_details.state].filter(Boolean).join(", "),
  customers: detail.summary_bar.customers.count, current_stock: detail.summary_bar.stock.count,
  activations_text: `${detail.summary_bar.activations.count.toLocaleString()} this month`,
  last_received: detail.stock_details.last_distribution_text,
  last_sent_details: lastSent.data?.items[0] && { time_ago: lastSent.data.items[0].time_ago, total_sims: lastSent.data.items[0].total_sims, breakdown_text: lastSent.data.items[0].breakdown_text },
 } : undefined;
 const selectedRow: CaApStockDistributionRow | undefined = selectedAp
  ? { id: String(selectedAp.id), name: selectedAp.name, phone: selectedAp.phone, state: selectedAp.location, total: selectedAp.current_stock, status: detail?.hero.status ?? "", customers: selectedAp.customers, avatarInitials: selectedAp.initials }
  : partners.find(ap => Number(ap.id) === partnerId);

 const total = CA_SIM_TYPES.reduce((sum, type) => sum + sims[type].length, 0);
 const preview: CaDistributionPreview | undefined = stock && selectedAp && total > 0 ? (() => {
  const csaAfter = stock.total - total;
  const healthy = csaAfter >= LOW_STOCK;
  return { total, csaBefore: stock.total, csaAfter, apBefore: selectedAp.current_stock, apAfter: selectedAp.current_stock + total, healthy,
   safetyMessage: healthy ? `You keep ${csaAfter} SIMs after this distribution.` : `Only ${csaAfter} SIMs left after this — consider requesting more stock.` };
 })() : undefined;
 const clear = () => { setSims(emptyCaSims()); setNote(""); };

 return <CaInventoryQueryState query={stockQuery}>{stock && <>
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
   <div className="lg:col-span-7">
    {initialType && <p className="text-xs text-slate-500 mb-2">Selected SIM type: {initialType.toUpperCase()}. Pick the SIMs below.</p>}
    <CaDistributeTabForm selectedType={initialType} selectedAp={selectedRow} partners={partners} stock={stock} previewReady={Boolean(preview)}
     safetyMessage={preview?.safetyMessage} partnerSearch={partnerSearch} onPartnerSearch={setPartnerSearch} partnersLoading={partnersQuery.isFetching}
     onSelectAp={ap => { setPartnerId(Number(ap.id)); setConfirmOpen(false); }}
     sims={sims} onSimsChange={(type, value) => setSims(previous => ({ ...previous, [type]: value }))}
     note={note} setNote={setNote} onClear={clear} onPreview={() => { if (preview) setConfirmOpen(true); }} />
   </div>
   <div className="lg:col-span-5">{partnerId ? <CaInventoryQueryState query={profile}>{selectedAp && <CaDistributeTabPreview selectedAp={selectedAp} preview={preview} posQty={sims.pos.length} cctvQty={sims.cctv.length} gpsQty={sims.gps.length} routerQty={sims.router.length} onRequestStock={onRequestStock} />}</CaInventoryQueryState> : <AppEmptyState title="Select an agency partner" description="Their stock and distribution preview will appear here." />}</div>
  </div>
  {confirmOpen && preview && selectedAp && selectedRow && <CaConfirmDistributionModal open onOpenChange={setConfirmOpen} preview={preview} stock={stock} recipient={selectedAp} selectedAp={selectedRow} sims={sims} note={note}
   onEditQuantities={() => setConfirmOpen(false)} onSuccess={result => { setReceipt(result); clear(); }} />}
  {receipt && <CaSuccessModal open onOpenChange={open => { if (!open) setReceipt(undefined); }} title="Distribution Completed!" subtitle={receipt.message} details={[
   { label: "Recipient", value: receipt.recipient.name }, { label: "Dispatched", value: receipt.total_distributed + " SIMs" }, { label: "Reference", value: receipt.reference },
   ...CA_SIM_TYPES.filter(type => receipt.summary[type]).map(type => ({ label: type.toUpperCase(), value: String(receipt.summary[type]) })),
  ]} />}
 </>}</CaInventoryQueryState>;
}
