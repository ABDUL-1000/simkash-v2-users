import { useState } from "react";
import { Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { useScDashboard } from "../api/queries";
import { ScQueryState } from "../components/ScSection";
import { ScDashboardCards, ScDashboardMetrics } from "../components/ScDashboardCards";
import { ScPartnersTable } from "../components/ScPartnersTable";
import { ScActivationsTable } from "../components/ScActivationsTable";
import { ScDistributeForm, ScOnboardPartnerForm } from "../modals/ScDashboardActionModals";
import { ScPayoutRequestForm } from "../modals/ScWalletActionModals";

export function StateCoordinatorDashboardPage() {
  const navigate = useNavigate();
  const query = useScDashboard();
  const data = query.data;
  const [modal, setModal] = useState<"distribute" | "onboard" | "payout" | null>(null);
  const [success, setSuccess] = useState<string>();
  const close = () => setModal(null);
  const actions: PageHeaderAction[] = [
    { key: "wallet", label: "SC wallet", variant: "outline", onClick: () => navigate(appPaths.scWallet) },
    { key: "onboard", label: "Onboard agency partner", variant: "outline", onClick: () => setModal("onboard") },
    { key: "distribute", label: "Distribute stock", disabled: !data || data.my_stock.total_available <= 0, onClick: () => setModal("distribute") },
    { key: "payout", label: "Request payout", disabled: !data?.my_commission.can_request_payout, onClick: () => setModal("payout") },
  ];
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="State Coordinator dashboard" description={data ? `${data.coordinator_info.name} · ${data.coordinator_info.state_role.replaceAll("_", " ")}` : "Your AP network, inventory and commission"} actions={actions} />
    {success && <Alert type="success" showIcon title={success} closable onClose={() => setSuccess(undefined)} />}
    <ScQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!data}>
      {data && <ScDashboardMetrics data={data} />}
    </ScQueryState>
    <ScPartnersTable />
    <ScActivationsTable />
    {data && !query.error && <ScDashboardCards data={data} />}
    {modal === "onboard" && <ScOnboardPartnerForm onClose={close} onSuccess={setSuccess} />}
    {modal === "distribute" && data && <ScDistributeForm canDistributeAll={data.needs_attention.can_distribute_all} onClose={close} onSuccess={setSuccess} />}
    {modal === "payout" && data && <ScPayoutRequestForm source="dashboard" balance={data.my_commission.amount} currency={data.my_commission.currency} onClose={close} onSuccess={setSuccess} />}
    {/* Request SIM stock and partner management actions are omitted until SC endpoints are supplied. */}
  </main>;
}
