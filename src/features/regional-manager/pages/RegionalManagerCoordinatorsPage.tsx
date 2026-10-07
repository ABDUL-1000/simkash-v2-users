import { useState } from "react";
import { Input, Select, Tabs } from "antd";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { PageHeader } from "@/components/common/PageHeader";
import { colors } from "@/constants/colors";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetMyStateCoordinatorsOverview } from "../api/coordinators";
import { RmQueryState } from "../components/dashboard/RmDashboardPrimitives";
import { RmPanel } from "../components/dashboard/RmDesign";
import { rmDesignTokens } from "../components/dashboard/rmDesignTokens";
import { RmSummaryCards } from "../components/territory/RmSummaryCards";
import { RmCoordinatorCards, type CoordinatorAction, type CoordinatorRow } from "../components/coordinators/RmCoordinatorCards";
import { RmCoordinatorComparison } from "../components/coordinators/RmCoordinatorComparison";
import { RmCoordinatorSidebar } from "../components/coordinators/RmCoordinatorSidebar";
import { RmPageControls } from "../components/territory/RmPageControls";
import { RmDesignedOnboard, RmDesignedSuspend } from "../Modals/dashboard/RmDesignedPeople";
import { RmDesignedDistribute } from "../Modals/dashboard/RmDesignedDistribute";
import { RmInventoryDistributeModal, RmInventoryRedistributeModal } from "../Modals/inventory/RmInventoryForms";
import { RmScContactModal, RmScExportModal, RmScReminderModal, RmScOnboardApModal } from "../Modals/coordinators/RmCoordinatorExtras";
type Modal = Exclude<CoordinatorAction, "view"> | "onboard" | "export" | "bulkDistribute" | null;
export function RegionalManagerCoordinatorsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ tab: "all", search: "", sortBy: "most_activations" });
  const [view, setView] = useState("coordinators");
  const pagination = useTablePagination({ initialPageSize: 12 });
  const query = useGetMyStateCoordinatorsOverview({ ...filters, page: pagination.page, limit: pagination.pageSize });
  const [modal, setModal] = useState<Modal>(null);
  const [selected, setSelected] = useState<CoordinatorRow>();
  const close = () => { setModal(null); setSelected(undefined); };
  const open = (action: Modal, row?: CoordinatorRow) => { setSelected(row); setModal(action); };
  const change = (values: Partial<typeof filters>) => { setFilters(current => ({ ...current, ...values })); pagination.resetPage(); };
  const onAction = (action: CoordinatorAction, row: CoordinatorRow) => action === "view" ? navigate(appPaths.rmCoordinatorDetail(row.id).path) : open(action, row);
  const cards = query.data?.summary_cards;
  return <main className="rm-design mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6" style={{ ...rmDesignTokens, background: colors.backgrounds.base }}>
    <PageHeader title="My State Coordinators" description="All State Coordinators onboarded by you across your region" actions={[{ key: "onboard", label: "Onboard New SC", icon: <UserPlus size={15} />, style: { background: colors.blues.primary }, onClick: () => open("onboard") }]} />
    {cards && <RmSummaryCards cards={{ state_coordinators: { ...cards.state_coordinators, label: "State Coordinators", subtext: "All onboarded by you" }, active_scs: { ...cards.active_scs, label: "Active SCs", subtext: "Operating normally" }, at_risk: { ...cards.at_risk, label: "At Risk", subtext: "Low stock or bonus risk" }, suspended: { ...cards.suspended, label: "Suspended", subtext: "Account paused" }, agency_partners: { ...cards.agency_partners, label: "Agency Partners", subtext: "Across all SC networks" } }} />}
    <Tabs activeKey={view} onChange={setView} items={[{ key: "coordinators", label: "Coordinators" }, { key: "comparison", label: "Performance Comparison" }]} />
    {view === "comparison" ? <RmCoordinatorComparison onExport={() => open("export")} /> : <>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center"><div className="flex flex-wrap gap-2">{["all", "active", "at_risk", "suspended", "pending"].map(value => <button key={value} className="rounded-lg px-3 py-2 text-xs capitalize" aria-pressed={filters.tab === value} style={{ background: filters.tab === value ? colors.backgrounds.background : "transparent", color: filters.tab === value ? colors.blues.primary : colors.texts.muted }} onClick={() => change({ tab: value })}>{value.replaceAll("_", " ")}</button>)}</div><Select className="lg:ml-auto" aria-label="Sort coordinators" value={filters.sortBy} onChange={sortBy => change({ sortBy })} options={["most_activations", "least_activations", "most_stock", "least_stock", "name", "newest"].map(value => ({ value, label: value.replaceAll("_", " ") }))} /><Input.Search className="lg:max-w-xs" placeholder="Search SC by name, phone or state…" value={filters.search} allowClear onChange={event => change({ search: event.target.value })} /></div>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,2.2fr)_minmax(280px,1fr)]"><RmPanel title="State Coordinators" description={`${query.data?.coordinators.length ?? 0} shown on this page`} actions={[{ key: "export", label: "Export List", variant: "outline", onClick: () => open("export") }]}><RmQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}><RmCoordinatorCards rows={query.data?.coordinators ?? []} onAction={onAction} /><div className="mt-4"><RmPageControls pagination={pagination} count={query.data?.coordinators.length ?? 0} loading={query.isFetching} /></div></RmQueryState></RmPanel><RmCoordinatorSidebar data={query.data} onAction={action => action === "comparison" ? setView("comparison") : open(action)} /></div>
    </>}
    {modal === "onboard" && <RmDesignedOnboard onClose={close} />}
    {modal === "remind" && <RmScReminderModal target={selected} onClose={close} />}
    {modal === "distribute" && selected && <RmDesignedDistribute target={selected} onClose={close} />}
    {modal === "bulkDistribute" && <RmInventoryDistributeModal onClose={close} />}
    {modal === "redistribute" && <RmInventoryRedistributeModal target={selected} onClose={close} />}
    {modal === "suspend" && selected && <RmDesignedSuspend target={selected} suspended={selected.status.toLowerCase() === "suspended"} onClose={close} />}
    {modal === "contact" && selected && <RmScContactModal target={selected} onClose={close} />}
    {modal === "onboardAp" && selected && <RmScOnboardApModal target={selected} onClose={close} />}
    {modal === "export" && <RmScExportModal onClose={close} />}
    {/* Remove/Edit Coordinator remain commented: no edit/delete endpoints supplied. */}
  </main>;
}
