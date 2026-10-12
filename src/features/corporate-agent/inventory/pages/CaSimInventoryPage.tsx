import { Alert, Button } from "antd";
import { useState } from "react";
import { APP_COLORS } from "@/constants/colors";
import { useGetCaInventoryOverview, useGetCaDistributeContext } from "../api/useCaInventory";
import { CaInventoryQueryState } from "../components/CaInventoryQueryState";
import type { CaInventoryTab } from "../types/ca-inventory.types";
import type { CaSimType, CaRequisitionResult } from "../types/inventory";
import { inventoryItems, stockRows } from "../types/adapters";
import { CaInventoryHeader } from "../components/CaInventoryHeader";
import { CaInventoryTabsNav } from "../components/CaInventoryTabsNav";
import { CaInventoryTopKpis } from "../components/CaInventoryTopKpis";
import { CaCurrentInventoryList } from "../components/CaCurrentInventoryList";
import { CaStockDistributionTable } from "../components/CaStockDistributionTable";
import { CaInventoryHealthCard } from "../components/CaInventoryHealthCard";
import { CaDaysRemainingCard } from "../components/CaDaysRemainingCard";
import { CaApsNeedingStockSideCard } from "../components/CaApsNeedingStockSideCard";
import { CaRequestStockSideCard } from "../components/CaRequestStockSideCard";
import { CaDistributionTab } from "../components/CaDistributionTab";
import { CaInventoryHistoryTab } from "../components/CaInventoryHistoryTab";
import { CaInventoryRequestStockModal } from "../Modals/CaInventoryRequestStockModal";
import { CaStockRequestsModal } from "../Modals/CaStockRequestsModal";
import { CaSuccessModal } from "../../Modals/CaSuccessModal";
import "../components/ca-inventory.css";
export default function CaSimInventoryPage() {
 const overview = useGetCaInventoryOverview();
 const context = useGetCaDistributeContext();
 const [activeTab, setActiveTab] = useState<CaInventoryTab>("available");
 const [selectedId, setSelectedId] = useState<number>();
 const [selectedType, setSelectedType] = useState<CaSimType>();
 const [requestOpen, setRequestOpen] = useState(false);
 const [requestsOpen, setRequestsOpen] = useState(false);
 const [receipts, setReceipts] = useState<CaRequisitionResult[]>();
 const data = overview.data;
 const canRequest = Boolean(data?.request_stock_card.can_request && context.data && !context.error && !overview.error);
 const requestStock = () => { if (canRequest) setRequestOpen(true); };
 const distribute = (id?: number, type?: CaSimType) => { setSelectedId(id); setSelectedType(type); setActiveTab("distribute"); };
 return <div className="min-h-screen pb-16 pt-4 px-4 sm:px-6 lg:px-8 space-y-6" style={{ backgroundColor: APP_COLORS.backgrounds.base }}>
  <CaInventoryHeader onRequestStock={requestStock} canRequest={canRequest} onDistributeStock={() => distribute()} onRequests={() => setRequestsOpen(true)} />
  {context.error && <Alert type="error" title="Unable to load distribution stock" description={context.error.message} action={<Button onClick={() => void context.refetch()}>Retry</Button>} />}
  <CaInventoryTabsNav activeTab={activeTab} onTabChange={setActiveTab} />
  {activeTab === "available" && <CaInventoryQueryState query={overview}>{data && <div className="space-y-6">
   <CaInventoryTopKpis data={data.summary_cards} />
   <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div className="lg:col-span-7 space-y-6">
     <CaCurrentInventoryList items={inventoryItems(data)} onDistributeItem={item => distribute(undefined, item.id as CaSimType)} />
     <CaStockDistributionTable rows={stockRows(data)} totalText={data.how_stock_is_distributed.total_partners_text} onDistributeToAp={ap => distribute(Number(ap.id))} onViewAllDistribute={() => distribute()} />
    </div>
    <div className="lg:col-span-5 space-y-6">
     <CaInventoryHealthCard data={data.inventory_health} />
     <CaDaysRemainingCard data={data.days_remaining} />
     <CaApsNeedingStockSideCard items={data.aps_needing_stock} onSelectAp={ap => distribute(ap.id)} />
     <CaRequestStockSideCard data={{ ...data.request_stock_card, can_request: canRequest }} onRequestStock={requestStock} />
    </div>
   </div>
  </div>}</CaInventoryQueryState>}
  {activeTab === "distribute" && <CaDistributionTab key={String(selectedId) + selectedType} initialPartnerId={selectedId} initialType={selectedType} onRequestStock={requestStock} />}
  {activeTab === "history" && <CaInventoryHistoryTab />}
  {requestOpen && context.data && <CaInventoryRequestStockModal open onOpenChange={setRequestOpen} stock={context.data.csa_stock} onSuccess={setReceipts} />}
  {requestsOpen && <CaStockRequestsModal onClose={() => setRequestsOpen(false)} />}
  {receipts && <CaSuccessModal open onOpenChange={open => { if (!open) setReceipts(undefined); }} title="Requisition Submitted!" subtitle="Stock requests submitted to Super Admin." details={receipts.flatMap(receipt => [
   { label: receipt.sim_type, value: receipt.quantity + " SIMs · " + receipt.status }, { label: "Reference", value: receipt.reference },
  ])} />}
  {/* <ExportInventoryReportModal /> commented out: no inventory export endpoint was supplied. The original modal is retained. */}
  {/* <UrgentApOutOfStockModal /> mock submission bypass is disabled. Urgent AP cards now open the same live preview/confirmation flow. */}
 </div>;
}
