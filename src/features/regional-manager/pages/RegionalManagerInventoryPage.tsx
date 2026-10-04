import { useState } from "react";
import { Tabs } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { useGetRmSimInventoryOverview } from "../api/inventory";
import { RmQueryState } from "../components/dashboard/RmDashboardPrimitives";
import { RmInventoryOverview } from "../components/inventory/RmInventoryOverview";
import { RmAvailableStock } from "../components/inventory/RmAvailableStock";
import { RmInventoryHistory } from "../components/inventory/RmInventoryHistory";
import { RmStockRequests } from "../components/inventory/RmStockRequests";
import { RmInventoryDistributeModal, RmInventoryRedistributeModal, RmInventoryRequestModal } from "../Modals/inventory/RmInventoryForms";
export function RegionalManagerInventoryPage({ initialModal = null }: { initialModal?: "redistribute" | null }) {
  const query = useGetRmSimInventoryOverview();
  const [tab, setTab] = useState("available");
  const [modal, setModal] = useState<"distribute" | "redistribute" | "request" | null>(initialModal);
  const close = () => setModal(null);
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="Regional SIM Inventory" description="Track stock and distribution across your territory" actions={[
      { key: "distribute", label: "Distribute stock", onClick: () => setModal("distribute") },
      { key: "redistribute", label: "Redistribute", variant: "outline", onClick: () => setModal("redistribute") },
      { key: "request", label: "Request stock", variant: "outline", onClick: () => setModal("request") },
    ]} />
    <Tabs activeKey={tab} onChange={setTab} items={[{ key: "available", label: "Available stock" }, { key: "undistributed", label: "Undistributed SIMs" }, { key: "history", label: "Inventory history" }, { key: "requests", label: "Stock requests" }]} />
    {tab === "available" ? <RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>{query.data && <RmInventoryOverview data={query.data} onDistribute={() => setModal("distribute")} />}</RmQueryState> : tab === "undistributed" ? <RmAvailableStock /> : tab === "history" ? <RmInventoryHistory /> : <RmStockRequests />}
    {/* <AdminContactCard /> and <ForceRecallModal /> remain disabled: the supplied inventory API provides neither contact data nor a recall operation. Legacy mock UI is retained in RmSimInventoryPage.tsx. */}
    {modal === "distribute" && <RmInventoryDistributeModal onClose={close} />}
    {modal === "redistribute" && <RmInventoryRedistributeModal onClose={close} />}
    {modal === "request" && <RmInventoryRequestModal onClose={close} />}
  </main>;
}
