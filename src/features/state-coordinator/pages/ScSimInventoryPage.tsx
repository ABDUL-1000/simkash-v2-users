import { useState } from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { useGetScSimInventoryOverview } from "../api/inventory";
import { ScQueryState } from "../components/ScSection";
import { ScInventoryAlertsAndRmCard, ScInventoryMetricCards, ScPerTypeStockCards } from "../components/sim-inventory/ScInventoryOverview";
import { ScStockTable } from "../components/sim-inventory/ScStockTable";
import { ScDistributionTable, ScInventoryHistoryTable, ScRmRequestsTable } from "../components/sim-inventory/ScInventoryTables";
import { RequestRmStockModal } from "../modals/RequestRmStockModal";
import { DistributeStockToAgentsModal } from "../modals/DistributeStockToAgentsModal";
import type { ScPartnerTarget } from "../types/operations";

type ModalState = { type: "request" } | { type: "distribute"; target?: ScPartnerTarget; allLow?: boolean };
export function ScSimInventoryPage() {
  const query = useGetScSimInventoryOverview();
  const data = query.data;
  const navigate = useNavigate();
  const [tab, setTab] = useState("available");
  const [modal, setModal] = useState<ModalState | null>(null);
  const request = () => setModal({ type: "request" });
  const actions: PageHeaderAction[] = [
    { key: "request", label: "Request stock from RM", onClick: request },
    { key: "distribute", label: "Distribute SIMs", variant: "outline", onClick: () => setModal({ type: "distribute" }) },
    { key: "partners", label: "My agency partners", variant: "outline", onClick: () => navigate(appPaths.scAgencyPartners) },
  ];
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="SC SIM inventory" description="Stock, AP distributions and requests to your regional manager" actions={actions} />
    <ScQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!data}>
      {data && <><ScInventoryMetricCards data={data} /><ScPerTypeStockCards data={data} /><ScInventoryAlertsAndRmCard data={data} onRequest={request} onDistributeAll={() => setModal({ type: "distribute", allLow: true })} /></>}
    </ScQueryState>
    <Tabs activeKey={tab} onChange={setTab} items={[
      { key: "available", label: "Available stock" }, { key: "undistributed", label: "Undistributed SIMs" },
      { key: "distribution", label: "How stock is distributed" }, { key: "history", label: "Ledger history" }, { key: "requests", label: "RM stock requests" },
    ]} />
    {tab === "available" && <ScStockTable key="available" mode="available" />}
    {tab === "undistributed" && <ScStockTable key="undistributed" mode="undistributed" />}
    {tab === "distribution" && <ScQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!data}>
      {data && <ScDistributionTable data={data.how_stock_is_distributed} onDistribute={(target) => setModal({ type: "distribute", target })} onView={(id) => navigate(appPaths.scAgentDetail(id).path)} />}
    </ScQueryState>}
    {tab === "history" && <ScInventoryHistoryTable />}
    {tab === "requests" && <ScRmRequestsTable />}
    {modal?.type === "request" && <RequestRmStockModal onClose={() => setModal(null)} />}
    {modal?.type === "distribute" && <DistributeStockToAgentsModal source="inventory" target={modal.target} allLow={modal.allLow} canDistributeAll={Boolean(data?.aps_need_distribution.can_distribute_all)} onClose={() => setModal(null)} />}
    {/* Commented out: No inventory export or individual SIM-detail endpoint is available. */}
  </main>;
}
