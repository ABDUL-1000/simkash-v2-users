import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { useTablePagination } from "@/hooks/useTablePagination";
import { appPaths } from "@/app/router/paths";
import { useExportScAgents, useGetScAgencyPartnersOverview } from "../api/agents";
import { ScQueryState } from "../components/ScSection";
import { ScPartnerList } from "../components/agency-partners/ScPartnerList";
import { ScApOverviewCards, ScPartnerWidgets } from "../components/agency-partners/ScPartnerWidgets";
import { OnboardAgencyPartnerModal } from "../modals/OnboardAgencyPartnerModal";
import { DistributeStockToAgentsModal } from "../modals/DistributeStockToAgentsModal";
import { BulkAtRiskReminderModal, SendAgentReminderModal } from "../modals/SendAgentReminderModal";
import type { AgentOverviewParams, ScPartnerTarget } from "../types/operations";

type ModalState = { type: "onboard" | "bulk-remind" } | { type: "distribute"; target?: ScPartnerTarget; allLow?: boolean } | { type: "remind"; target: ScPartnerTarget };
export function ScAgencyPartnersPage() {
  const navigate = useNavigate();
  const pagination = useTablePagination({ initialPageSize: 8 });
  const [filters, setFilters] = useState({ search: "", status: "all", bonusStatus: "all" });
  const params: AgentOverviewParams = { ...filters, page: pagination.page, limit: pagination.pageSize };
  const query = useGetScAgencyPartnersOverview(params);
  const data = query.data;
  const [modal, setModal] = useState<ModalState | null>(null);
  const exportCsv = useExportScAgents();
  const close = () => setModal(null);
  const distribute = (target: ScPartnerTarget) => setModal({ type: "distribute", target });
  const actions: PageHeaderAction[] = [
    { key: "onboard", label: "Onboard new AP", onClick: () => setModal({ type: "onboard" }) },
    { key: "distribute", label: "Distribute SIMs", variant: "outline", onClick: () => setModal({ type: "distribute" }) },
    { key: "export", label: "Export CSV", variant: "outline", loading: exportCsv.isPending, onClick: () => exportCsv.mutate() },
  ];
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="My agency partners" description={data?.pagination.showing_text} actions={actions} />
    {exportCsv.error && <Alert type="error" title="Unable to export agency partners" description={exportCsv.error.message} />}
    <ScQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()} empty={!data}>
      {data && <ScApOverviewCards data={data} />}
    </ScQueryState>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <ScPartnerList partners={data?.partners ?? []} loading={query.isLoading} error={query.error} retry={() => void query.refetch()} filters={params} onFilter={(changes) => { setFilters((current) => ({ ...current, ...changes })); pagination.resetPage(); }}
            pagination={{ ...pagination.paginationConfig, pageSizeOptions: [8, 16, 32], total: data?.pagination.total_items }}
            onView={(id) => navigate(appPaths.scAgentDetail(id).path)} onDistribute={distribute} onRemind={(target) => setModal({ type: "remind", target })} />
          {data && <ScPartnerWidgets data={data} onDistribute={distribute} onDistributeAll={() => setModal({ type: "distribute", allLow: true })} onBulkRemind={() => setModal({ type: "bulk-remind" })} />}
        </div>
    {modal?.type === "onboard" && <OnboardAgencyPartnerModal onClose={close} />}
    {modal?.type === "distribute" && <DistributeStockToAgentsModal target={modal.target} allLow={modal.allLow} canDistributeAll={Boolean(data?.aps_needing_stock.can_distribute_all)} onClose={close} />}
    {modal?.type === "remind" && <SendAgentReminderModal target={modal.target} onClose={close} />}
    {modal?.type === "bulk-remind" && <BulkAtRiskReminderModal onClose={close} />}
  </main>;
}
