import { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Select } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { useTablePagination } from "@/hooks/useTablePagination";
import { colors } from "@/constants/colors";
import { getNetworkColor } from "@/features/bill-payment/utils/networkColors";
import { useGetPartnerAvailableSims, useGetPartnerStockOverview } from "../api";
import type { AvailableSimItem } from "../types/api";
import { ApActivateSimFlow } from "../modals/ApActivateSimFlow";
import { ApStockHistory } from "../components/ApStockHistory";

// health_color from the API → palette.
const HEALTH_TONES: Record<string, string> = { green: colors.success, yellow: colors.warning, orange: colors.warning, red: colors.danger };
const typeFilters = [{ key: "", label: "All" }, { key: "pos", label: "POS" }, { key: "cctv", label: "CCTV" }, { key: "gps", label: "GPS" }, { key: "router", label: "Router" }];

export function ApSimStockPage() {
  const [type, setType] = useState("");
  const [network, setNetwork] = useState("");
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [activateOpen, setActivateOpen] = useState(false);
  const [selectedSim, setSelectedSim] = useState<{ simNumber: string; simType: string } | null>(null);
  const pagination = useTablePagination({ initialPageSize: 10 });
  const { overview, isLoading: loadingOverview } = useGetPartnerStockOverview();
  const query = useGetPartnerAvailableSims({ type, network, search, page: pagination.page, limit: pagination.pageSize });
  const total = query.result?.total ?? 0;
  const paginationConfig = { ...pagination.paginationConfig, total };
  useEffect(() => { const timer = window.setTimeout(() => { setSearch(searchText); pagination.resetPage(); }, 300); return () => window.clearTimeout(timer); }, [searchText]);

  const columns: ColumnsType<AvailableSimItem> = [
    { title: "SIM Number", dataIndex: "sim_number", key: "sim_number", render: (value: string) => <span className="font-mono font-bold" style={{ color: colors.textPrimary }}>{value}</span> },
    { title: "SIM Type", dataIndex: "type_label", key: "type_label", render: (value: string) => <span className="rounded-full px-2 py-1 text-xs font-semibold" style={{ color: colors.primary, backgroundColor: `${colors.primary}12` }}>{value}</span> },
    { title: "Network", dataIndex: "network", key: "network", render: (value: string) => <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getNetworkColor(value)}`}>{value}</span> },
    { title: "Assigned Date", dataIndex: "assigned_date", key: "assigned_date", render: (value: string) => new Date(value).toLocaleDateString() },
    { title: "Status", dataIndex: "status", key: "status", render: (value: string) => <span className="rounded-full px-2 py-1 text-xs font-semibold" style={{ color: colors.success, backgroundColor: `${colors.success}12` }}>{value}</span> },
    { title: "Action", key: "action", render: (_, sim) => <button type="button" onClick={() => { setSelectedSim({ simNumber: sim.sim_number, simType: sim.sim_type }); setActivateOpen(true); }} className="font-semibold" style={{ color: colors.primary }}>Activate</button> },
  ];

  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="My SIM Stock" description="Manage and view your assigned available SIM cards" actions={[{ key: "activate", label: "Activate SIM", onClick: () => { setSelectedSim(null); setActivateOpen(true); } }]} />
    {loadingOverview ? <CardGridSkeleton count={3} /> : <div className="grid gap-4 sm:grid-cols-3">
      <Metric title="Total Available" value={overview?.summary.total_available ?? 0} subtitle={overview?.summary.total_available_subtext ?? ""} />
      <Metric title="Activated This Month" value={overview?.summary.activated_this_month ?? 0} subtitle={overview?.summary.activated_this_month_subtext ?? ""} />
      <Metric title="Low Stock Alert" value={overview?.summary.sim_types_low ?? 0} subtitle={overview?.summary.sim_types_low_subtext ?? "SIM types need attention"} warning />
    </div>}
    {overview?.stock_tip && <p className="rounded-xl border p-4 text-sm" style={{ color: colors.textSecondary, borderColor: colors.border, backgroundColor: `${colors.primary}08` }}>{overview.stock_tip}</p>}

    {/* Per-type inventory, network split and runway from GET /partner/stock */}
    {overview && overview.inventory.length > 0 && <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{overview.inventory.map((item) => {
      const tone = HEALTH_TONES[item.health_color] ?? colors.textSecondary;
      return <section key={item.type} className="space-y-2 rounded-2xl border bg-white p-4" style={{ borderColor: item.action_needed ? colors.warning : colors.border }}>
        <div className="flex items-start justify-between gap-2"><div><p className="text-sm font-bold" style={{ color: colors.textPrimary }}>{item.type_label}</p><p className="text-xs" style={{ color: colors.textSecondary }}>{item.subtitle}</p></div><span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ color: tone, backgroundColor: `${tone}14` }}>{item.health_status}</span></div>
        <p className="text-2xl font-bold" style={{ color: colors.textPrimary }}>{item.available_count.toLocaleString()}</p>
        <p className="text-xs" style={{ color: colors.textSecondary }}>{item.networks_text}</p>
        <div><div className="flex justify-between text-[11px]" style={{ color: colors.textSecondary }}><span>Utilisation</span><span>{item.utilization_rate}%</span></div><div className="mt-1 h-1.5 rounded-full" style={{ background: colors.border }}><div className="h-full rounded-full" style={{ width: `${Math.min(100, item.utilization_rate)}%`, background: tone }} /></div></div>
        <p className="text-[11px] font-medium" style={{ color: item.action_needed ? colors.warning : colors.textSecondary }}>{item.pace_text}</p>
      </section>;
    })}</div>}
    {overview && (overview.stock_by_network.length > 0 || (overview.estimated_days_remaining?.length ?? 0) > 0) && <div className="grid gap-4 md:grid-cols-2">
      <section className="space-y-2 rounded-2xl border bg-white p-4 text-xs" style={{ borderColor: colors.border }}>
        <div className="flex items-center justify-between"><h3 className="text-sm font-bold" style={{ color: colors.textPrimary }}>Stock by Network</h3><span style={{ color: colors.textSecondary }}>Health: <strong>{overview.stock_health.overall_status}</strong> · {overview.stock_health.total_remaining} left</span></div>
        {overview.stock_by_network.map((item) => <div key={item.network}><div className="flex justify-between"><span style={{ color: colors.textSecondary }}>{item.network}</span><strong>{item.count} · {item.percentage}%</strong></div><div className="mt-1 h-1.5 rounded-full" style={{ background: colors.border }}><div className="h-full rounded-full" style={{ width: `${item.percentage}%`, background: item.color || colors.primary }} /></div></div>)}
      </section>
      <section className="space-y-2 rounded-2xl border bg-white p-4 text-xs" style={{ borderColor: colors.border }}>
        <div className="flex items-center justify-between"><h3 className="text-sm font-bold" style={{ color: colors.textPrimary }}>Estimated Days Remaining</h3><span style={{ color: colors.textSecondary }}>Updated {overview.last_updated}</span></div>
        {(overview.estimated_days_remaining ?? []).map((item) => <div key={item.type} className="flex items-center justify-between"><span style={{ color: colors.textSecondary }}>{item.type_label}</span><span className="flex items-center gap-2"><strong style={{ color: item.is_critical ? colors.danger : colors.textPrimary }}>{item.days} days</strong><span className="rounded-full px-2 py-0.5 text-[10px]" style={{ background: colors.backgrounds.base, color: colors.textSecondary }}>{item.badge_text}</span></span></div>)}
      </section>
    </div>}
    <div className="flex flex-wrap items-center justify-between gap-3"> <div className="flex flex-wrap gap-2">{typeFilters.map((item) => <button type="button" key={item.key} onClick={() => { setType(item.key); pagination.resetPage(); }} className="rounded-full border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: type === item.key ? colors.primary : colors.border, color: type === item.key ? colors.primary : colors.textSecondary }}>{item.label}</button>)}</div>
      <Select value={network} onChange={(value) => { setNetwork(value); pagination.resetPage(); }} options={[{ value: "", label: "All networks" }, ...["MTN", "Airtel", "Glo", "T2"].map((value) => ({ value, label: value }))]} className="min-w-36" />
    </div>
    <DataTable columns={columns} dataSource={query.sims} rowKey="id" loading={query.isLoading || query.isFetching} pagination={paginationConfig} onSearch={setSearchText} searchPlaceholder="Search SIM number" emptyTitle="No Available SIMs Found" emptyDescription="You have no available SIM cards matching your filter criteria." />
    <ApStockHistory />
    <ApActivateSimFlow open={activateOpen} onOpenChange={setActivateOpen} onActivated={() => { void query.refetch(); }} initialSim={selectedSim} />
  </main>;
}

function Metric({ title, value, subtitle, warning = false }: { title: string; value: number; subtitle: string; warning?: boolean }) {
  return <section className="rounded-2xl border bg-white p-4 shadow-sm" style={{ borderColor: colors.border }}><p className="text-xs font-medium" style={{ color: colors.textSecondary }}>{title}</p><p className="mt-2 text-2xl font-bold" style={{ color: warning ? colors.warning : colors.textPrimary }}>{value.toLocaleString()}</p><p className="mt-1 text-xs" style={{ color: colors.textSecondary }}>{subtitle}</p></section>;
}
