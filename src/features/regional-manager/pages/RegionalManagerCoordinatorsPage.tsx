import { useState } from "react";
import { Input, Select, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { PageHeader } from "@/components/common/PageHeader";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useExportScReport, useGetMyStateCoordinatorsOverview } from "../api/coordinators";
import { RmMetric, RmQueryState } from "../components/dashboard/RmDashboardPrimitives";
import { RmCoordinatorCards, type CoordinatorRow } from "../components/coordinators/RmCoordinatorCards";
import { RmCoordinatorComparison } from "../components/coordinators/RmCoordinatorComparison";
import { RmPageControls } from "../components/territory/RmPageControls";
import { RmOnboardCoordinatorModal, RmCoordinatorReminderModal, RmCoordinatorSuspendModal } from "../Modals/coordinators/RmCoordinatorForms";
import { RmInventoryDistributeModal } from "../Modals/inventory/RmInventoryForms";
export function RegionalManagerCoordinatorsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ tab: "all", search: "", sortBy: "most_activations" });
  const [view, setView] = useState("coordinators");
  const pagination = useTablePagination({ initialPageSize: 12 });
  const query = useGetMyStateCoordinatorsOverview({ ...filters, page: pagination.page, limit: pagination.pageSize });
  const exportReport = useExportScReport();
  const [modal, setModal] = useState<"onboard" | "remind" | "distribute" | "suspend" | null>(null);
  const [selected, setSelected] = useState<CoordinatorRow | undefined>();
  const close = () => { setModal(null); setSelected(undefined); };
  const open = (action: typeof modal, row?: CoordinatorRow) => { setSelected(row); setModal(action); };
  const change = (values: Partial<typeof filters>) => { setFilters(current => ({ ...current, ...values })); pagination.resetPage(); };
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="My State Coordinators" description="Manage your regional network and compare performance" actions={[
      { key: "onboard", label: "Onboard coordinator", onClick: () => open("onboard") },
      { key: "remind", label: "Remind at-risk SCs", variant: "outline", onClick: () => open("remind") },
      { key: "export", label: exportReport.isPending ? "Exporting…" : "Export CSV", variant: "outline", disabled: exportReport.isPending, onClick: () => exportReport.mutate({}) },
    ]} />
    {query.data && <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">{Object.entries(query.data.summary_cards).map(([key, card]) => <RmMetric key={key} label={key.replaceAll("_", " ")} value={card.count} />)}</div>}
    <Tabs activeKey={view} onChange={setView} items={[{ key: "coordinators", label: "Coordinators" }, { key: "comparison", label: "Comparison" }]} />
    {view === "comparison" ? <RmCoordinatorComparison /> : <>
      <div className="flex flex-col flex-wrap gap-3 sm:flex-row"><Input.Search className="sm:max-w-sm" placeholder="Search name, state or phone" allowClear onSearch={search => change({ search })} />
        <Select aria-label="Coordinator status" value={filters.tab} onChange={tab => change({ tab })} options={["all", "active", "at_risk", "suspended", "pending"].map(value => ({ value, label: value.replaceAll("_", " ") }))} />
        <Select aria-label="Sort coordinators" value={filters.sortBy} onChange={sortBy => change({ sortBy })} options={["most_activations", "least_activations", "most_stock", "least_stock", "name", "newest"].map(value => ({ value, label: value.replaceAll("_", " ") }))} />
      </div>
      <RmQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>
        <RmCoordinatorCards rows={query.data?.coordinators ?? []} onView={row => navigate(appPaths.rmCoordinatorDetail(row.id).path)} onDistribute={row => open("distribute", row)} onRemind={row => open("remind", row)} onSuspend={row => open("suspend", row)} />
        {/* Overview has page/limit inputs but no total; use server previous/next controls, not summary card counts as a filtered total. */}
        <RmPageControls pagination={pagination} count={query.data?.coordinators.length ?? 0} loading={query.isFetching} />
      </RmQueryState>
    </>}
    {/* <EditCoordinatorModal /> and <RemoveCoordinatorModal /> remain disabled: no edit/delete endpoint supplied. Legacy mock components remain in RmCustomersPage.tsx. */}
    {modal === "onboard" && <RmOnboardCoordinatorModal onClose={close} />}
    {modal === "remind" && <RmCoordinatorReminderModal target={selected} onClose={close} />}
    {modal === "distribute" && selected && <RmInventoryDistributeModal target={selected} onClose={close} />}
    {modal === "suspend" && selected && <RmCoordinatorSuspendModal target={selected} suspended={selected.status.toLowerCase() === "suspended"} onClose={close} />}
  </main>;
}
