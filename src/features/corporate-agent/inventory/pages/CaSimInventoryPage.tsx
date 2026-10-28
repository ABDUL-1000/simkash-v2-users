import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { APP_COLORS } from "@/constants/colors";
import { useGetCaInventoryOverview } from "../api/useCaInventory";
import { CaInventoryQueryState } from "../components/CaInventoryQueryState";
import type { CaInventoryTab } from "../types/ca-inventory.types";
import type { CaSimType, CaRequisitionResult, CaRedistributionResult } from "../types/inventory";
import { inventoryItems, overviewStock, stockRows } from "../types/adapters";
import { CaInventoryHeader } from "../components/CaInventoryHeader";
import { CaInventoryTabsNav } from "../components/CaInventoryTabsNav";
import { CaInventoryTopKpis } from "../components/CaInventoryTopKpis";
import { CaCurrentInventoryList } from "../components/CaCurrentInventoryList";
import { CaStockDistributionTable } from "../components/CaStockDistributionTable";
import { CaAvailableSimsTable } from "../components/CaAvailableSimsTable";
import { CaInventoryHealthCard } from "../components/CaInventoryHealthCard";
import { CaDaysRemainingCard } from "../components/CaDaysRemainingCard";
import { CaApsNeedingStockSideCard } from "../components/CaApsNeedingStockSideCard";
import { CaRequestStockSideCard } from "../components/CaRequestStockSideCard";
import { CaDistributionTab } from "../components/CaDistributionTab";
import { CaRedistributeTab } from "../components/CaRedistributeTab";
import { CaInventoryHistoryTab } from "../components/CaInventoryHistoryTab";
import { CaInventoryRequestStockModal } from "../Modals/CaInventoryRequestStockModal";
import { CaStockRequestsModal } from "../Modals/CaStockRequestsModal";
import { CaSuccessModal } from "../../Modals/CaSuccessModal";
import "../components/ca-inventory.css";

const TABS: CaInventoryTab[] = ["available", "distribute", "redistribute", "history"];
const toId = (value: string | null) => (Number(value) > 0 ? Number(value) : undefined);

export default function CaSimInventoryPage() {
 // Deep links from the dashboard / partner pages: ?tab=distribute&partner=ID, ?tab=redistribute&from=ID, ?request=1
 const [params, setParams] = useSearchParams();
 const linkedTab = params.get("tab") as CaInventoryTab | null;
 const overview = useGetCaInventoryOverview();
 const [activeTab, setActiveTab] = useState<CaInventoryTab>(linkedTab && TABS.includes(linkedTab) ? linkedTab : "available");
 const [selectedId, setSelectedId] = useState(toId(params.get("partner")));
 const [fromId] = useState(toId(params.get("from")));
 const [selectedType, setSelectedType] = useState<CaSimType>();
 const [requestOpen, setRequestOpen] = useState(params.get("request") === "1");
 const [requestsOpen, setRequestsOpen] = useState(false);
 const [receipts, setReceipts] = useState<CaRequisitionResult[]>();
 const [redistReceipt, setRedistReceipt] = useState<CaRedistributionResult>();
 const data = overview.data;
 const clearLink = () => { if (params.size) setParams({}, { replace: true }); };
 const changeTab = (tab: CaInventoryTab) => { setActiveTab(tab); clearLink(); };
 const requestStock = () => setRequestOpen(true);
 const distribute = (id?: number, type?: CaSimType) => { setSelectedId(id); setSelectedType(type); changeTab("distribute"); };
 const needingStock = (data?.how_stock_is_distributed.partners ?? []).filter(ap => !/good/i.test(ap.status))
  .map(ap => ({ id: ap.id, name: ap.name, detail: `${ap.stock} SIMs · ${ap.customers} customers`, status: ap.status }));
 return <div className="min-h-screen pb-16 pt-4 px-4 sm:px-6 lg:px-8 space-y-6" style={{ backgroundColor: APP_COLORS.backgrounds.base }}>
  <CaInventoryHeader onRequestStock={requestStock} canRequest onDistributeStock={() => distribute()} onRequests={() => setRequestsOpen(true)} />
  <CaInventoryTabsNav activeTab={activeTab} onTabChange={changeTab} />
  {activeTab === "available" && <CaInventoryQueryState query={overview}>{data && <div className="space-y-6">
   <CaInventoryTopKpis data={data.summary_cards} />
   <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div className="lg:col-span-7 space-y-6">
     <CaCurrentInventoryList items={inventoryItems(data)} onDistributeItem={item => distribute(undefined, item.id as CaSimType)} />
     <CaStockDistributionTable rows={stockRows(data)} totalText={data.how_stock_is_distributed.total_partners_text} onDistributeToAp={ap => distribute(Number(ap.id))} onViewAllDistribute={() => distribute()} />
     <CaAvailableSimsTable />
    </div>
    <div className="lg:col-span-5 space-y-6">
     <CaInventoryHealthCard data={data.inventory_health} stockTypes={data.stock_types} />
     <CaDaysRemainingCard data={data.estimated_days_remaining} onRequestStock={requestStock} />
     <CaApsNeedingStockSideCard title={data.aps_need_distribution.title} items={needingStock} onSelectAp={ap => distribute(ap.id)} />
     <CaRequestStockSideCard data={{ message: `Request SIM stock from your ${data.rm_info.role}, ${data.rm_info.name} (${data.rm_info.region}).`, last_request_text: `${data.summary_cards.pending_requests.count} pending · ${data.rm_info.phone}`, can_request: true }} onRequestStock={requestStock} />
    </div>
   </div>
  </div>}</CaInventoryQueryState>}
  {activeTab === "distribute" && <CaDistributionTab key={String(selectedId) + selectedType} initialPartnerId={selectedId} initialType={selectedType} onRequestStock={requestStock} />}
  {activeTab === "redistribute" && <CaRedistributeTab initialFromId={fromId} onRedistributed={setRedistReceipt} />}
  {activeTab === "history" && <CaInventoryHistoryTab summary={data?.summary_cards} />}
  {requestOpen && <CaInventoryRequestStockModal open onOpenChange={open => { setRequestOpen(open); if (!open) clearLink(); }} stock={overviewStock(data)} onSuccess={setReceipts} />}
  {requestsOpen && <CaStockRequestsModal onClose={() => setRequestsOpen(false)} />}
  {receipts && <CaSuccessModal open onOpenChange={open => { if (!open) setReceipts(undefined); }} title="Requisition Submitted!" subtitle="Your stock requests have been submitted." details={receipts.flatMap(receipt => [
   { label: receipt.product_type.replace("_SIM", " SIM"), value: receipt.quantity + " SIMs · " + receipt.status }, { label: "Request ID", value: "#" + receipt.id },
  ])} />}
  {redistReceipt && <CaSuccessModal open onOpenChange={open => { if (!open) setRedistReceipt(undefined); }} title="Redistribution Completed!" subtitle={redistReceipt.message} details={[
   { label: "Moved to", value: redistReceipt.redistributedTo }, { label: "SIMs moved", value: String(redistReceipt.total_redistributed) }, { label: "Reference", value: redistReceipt.reference },
   ...redistReceipt.previous_partners.map(partner => ({ label: "From " + partner.name, value: partner.count + " SIMs" })),
  ]} />}
  {/* <ExportInventoryReportModal /> commented out: no inventory export endpoint was supplied. The original modal is retained. */}
 </div>;
}
