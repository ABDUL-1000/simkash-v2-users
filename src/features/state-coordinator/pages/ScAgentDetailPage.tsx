import { useState } from "react";
import { Tabs } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { appPaths } from "@/app/router/paths";
import { useGetScAgentDetail } from "../api/agents";
import { ScQueryState } from "../components/ScSection";
import { ScStatusTag } from "../components/ScStatusTag";
import { ScAgentDetailCards, ScAgentSummary } from "../components/agency-partners/ScAgentDetailCards";
import { ScAgentCustomersTable, ScAgentStockHistoryTable } from "../components/agency-partners/ScAgentDetailTables";
import { ScStockTable } from "../components/sim-inventory/ScStockTable";
import { DistributeStockToAgentsModal } from "../modals/DistributeStockToAgentsModal";
import { EditScAgentModal } from "../modals/OnboardAgencyPartnerModal";
import { SendAgentReminderModal } from "../modals/SendAgentReminderModal";
import { SuspendAgentModal } from "../modals/SuspendAgentModal";

export function ScAgentDetailPage() {
  const { agentId } = useParams();
  return <ScAgentDetailContent key={agentId} agentId={agentId} />;
}

function ScAgentDetailContent({ agentId }: { agentId?: string }) {
  const id = agentId && /^\d+$/.test(agentId) && Number.isSafeInteger(Number(agentId)) && Number(agentId) > 0 ? Number(agentId) : undefined;
  const query = useGetScAgentDetail(id);
  const data = query.data;
  const navigate = useNavigate();
  const [modal, setModal] = useState<"distribute" | "edit" | "remind" | "suspend" | null>(null);
  const [tab, setTab] = useState("customers");
  const suspended = data?.hero.status.toLowerCase() === "suspended";
  const close = () => setModal(null);
  const actions: PageHeaderAction[] = [
    { key: "back", label: "All partners", variant: "outline", onClick: () => navigate(appPaths.scAgencyPartners) },
    { key: "distribute", label: "Distribute stock", disabled: !data, onClick: () => setModal("distribute") },
    { key: "edit", label: "Edit AP", variant: "outline", disabled: !data, onClick: () => setModal("edit") },
    { key: "remind", label: "Send reminder", variant: "outline", disabled: !data, onClick: () => setModal("remind") },
    { key: "suspend", label: suspended ? "Re-activate AP" : "Suspend AP", variant: suspended ? "outline" : "destructive", disabled: !data, onClick: () => setModal("suspend") },
  ];
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title={data?.hero.name ?? "Agency partner"} description={data && `${data.hero.phone} · ${data.summary_bar.role}`} actions={actions}
      extra={data && <><span aria-label="Partner initials">{data.hero.initials}</span><ScStatusTag status={data.hero.status} /></>} />
    {!id ? <AppEmptyState title="Invalid agency partner" description="Select an agency partner from your network." /> :
      <ScQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!data}>
        {data && <><ScAgentSummary data={data} /><ScAgentDetailCards data={data} />
          <Tabs activeKey={tab} onChange={setTab} items={[{ key: "customers", label: "Customers" }, { key: "history", label: "Stock sent history" }, { key: "stock", label: "Undistributed SIMs" }]} />
          {tab === "customers" && <ScAgentCustomersTable key={id} agentId={id} />}
          {tab === "history" && <ScAgentStockHistoryTable key={id} agentId={id} />}
          {tab === "stock" && <ScStockTable key={id} mode="undistributed" agentId={id} />}
        </>}
      </ScQueryState>}
    {data && modal === "distribute" && <DistributeStockToAgentsModal target={data.hero} canDistributeAll={false} onClose={close} />}
    {data && modal === "edit" && <EditScAgentModal id={data.hero.id} profile={data.profile_details} onClose={close} />}
    {data && modal === "remind" && <SendAgentReminderModal target={data.hero} onClose={close} />}
    {data && modal === "suspend" && <SuspendAgentModal target={data.hero} suspended={suspended} onClose={close} />}
    {/* Commented out: Partner removal has no documented SC endpoint. */}
  </main>;
}
