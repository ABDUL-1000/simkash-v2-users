import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Progress, Select, Tag } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { useTablePagination } from "@/hooks/useTablePagination";
import { colors } from "@/constants/colors";
import { getNetworkColor } from "@/features/bill-payment/utils/networkColors";
import { useGetPartnerCustomerOverview, useGetPartnerCustomers, useSendAllCustomerReminders, useSendCustomerReminder } from "../../api";
import type { PartnerCustomerItem } from "../../types/api";
import { AddPartnerCustomerModal } from "../Modals/AddPartnerCustomerModal";
import { CustomerDetailDrawer } from "../components/CustomerDetailDrawer";

const tabs = [{ key: "all", label: "All", countKey: "all" }, { key: "active", label: "Active", countKey: "active" }, { key: "expiring", label: "Expiring", countKey: "expiring" }, { key: "expired", label: "Expired", countKey: "expired" }, { key: "new_this_month", label: "New This Month", countKey: "new_this_month" }] as const;
const SIM_TYPE_OPTIONS = [{ value: "all", label: "All SIM types" }, { value: "pos", label: "POS SIM" }, { value: "cctv", label: "CCTV SIM" }, { value: "gps", label: "GPS SIM" }, { value: "router", label: "Router SIM" }];
const SORT_OPTIONS = [{ value: "newest", label: "Newest first" }, { value: "oldest", label: "Oldest first" }, { value: "expiring_soonest", label: "Expiring soonest" }, { value: "name", label: "Name (A–Z)" }];
const card = "rounded-xl border bg-white p-4 space-y-3";

export function ApCustomersPage() {
  const [tab, setTab] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [simType, setSimType] = useState("all");
  const [sort, setSort] = useState("newest");
  const [customerId, setCustomerId] = useState<number>();
  const [addOpen, setAddOpen] = useState(false);
  const pagination = useTablePagination({ initialPageSize: 10 });
  const overview = useGetPartnerCustomerOverview();
  const list = useGetPartnerCustomers({ tab, search, simType, sort, page: pagination.page, limit: pagination.pageSize });
  const remindAll = useSendAllCustomerReminders();
  const remindOne = useSendCustomerReminder();
  const total = list.result?.total ?? 0;

  const columns: ColumnsType<PartnerCustomerItem> = [
    { title: "Customer", key: "customer", render: (_, row) => <div className="flex items-center gap-2"><span className="flex size-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-600">{row.initials}</span><div><p className="font-semibold" style={{ color: colors.textPrimary }}>{row.name}</p><p className="text-xs" style={{ color: colors.textSecondary }}>{row.email}</p></div></div> },
    { title: "Phone", dataIndex: "phone", key: "phone", render: (phone: string) => <button type="button" onClick={(event) => { event.stopPropagation(); void navigator.clipboard.writeText(phone); }} className="font-mono text-xs" style={{ color: colors.primary }} title="Copy phone">{phone} ⧉</button> },
    { title: "SIM Details", key: "sim", render: (_, row) => <div><p className="font-mono text-xs font-semibold">{row.sim_number}</p><p className="mt-1 text-xs"><span>{row.type_label}</span> · <span className={`rounded-full px-2 py-0.5 ${getNetworkColor(row.network)}`}>{row.network}</span></p></div> },
    { title: "Plan & Expiry", key: "plan", render: (_, row) => <div><p>{row.plan}</p><p className="text-xs" style={{ color: colors.textSecondary }}>{row.expires_at}</p><Tag color={row.days_left <= 7 ? "orange" : row.status.toLowerCase() === "expired" ? "red" : "green"}>{row.days_left < 0 ? "Expired" : `${row.days_left} days left`}</Tag></div> },
    { title: "Actions", key: "actions", render: (_, row) => <div className="flex flex-wrap gap-2"><Button type="link" onClick={(event) => { event.stopPropagation(); setCustomerId(row.id); }}>View Profile</Button>{row.can_remind && <Button type="link" loading={remindOne.isPending && remindOne.variables === row.id} onClick={(event) => { event.stopPropagation(); remindOne.mutate(row.id); }}>Send Reminder</Button>}</div> },
  ];
  // Tab counts come with the list response; the summary metrics come from the overview.
  const counts = list.result?.tab_counts;
  const data = overview.overview;
  const summary = data?.summary;
  const metrics = [{ title: "Total Customers", value: summary?.total_customers ?? 0 }, { title: "Active SIMs", value: summary?.active_sims ?? 0 }, { title: "Expiring ≤ 7 Days", value: summary?.expiring_7_days ?? 0 }, { title: "Expired SIMs", value: summary?.expired_sims ?? 0 }];
  const resetPage = () => pagination.resetPage();

  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="Customer Management" description="Manage customers and their active SIM subscriptions" 
    actions={[
      // { key: "add", label: "Add Customer", variant: "outline", onClick: () => setAddOpen(true) },
     { key: "remind", label: "Remind All Expiring", loading: remindAll.isPending, onClick: () => remindAll.mutate() }]} />
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric, index) => <div key={metric.title} className="rounded-xl border bg-white p-4" style={{ borderColor: colors.border }}><p className="text-xs" style={{ color: colors.textSecondary }}>{metric.title}</p><p className="mt-2 text-2xl font-bold" style={{ color: index === 2 ? colors.warning : colors.textPrimary }}>{overview.isLoading ? "…" : metric.value.toLocaleString()}</p></div>)}</div>
    <div className="flex flex-wrap gap-2">{tabs.map((item) => <button key={item.key} type="button" onClick={() => { setTab(item.key); resetPage(); }} className="rounded-full border px-3 py-2 text-xs font-semibold" style={{ borderColor: tab === item.key ? colors.primary : colors.border, color: tab === item.key ? colors.primary : colors.textSecondary }}>{item.label}{counts ? ` (${counts[item.countKey]})` : ""}</button>)}</div>
    <DataTable columns={columns} dataSource={list.customers} rowKey="id" loading={list.isLoading || list.isFetching} pagination={{ ...pagination.paginationConfig, total }} onSearch={(value) => { setSearch(value); resetPage(); }} searchPlaceholder="Search customers, phone, or SIM" onRowClick={(row) => setCustomerId(row.id)} emptyTitle="No customers found" emptyDescription="Try another filter or add a customer."
      extraFilters={<div className="flex flex-wrap gap-2"><Select className="min-w-36" value={simType} onChange={(value) => { setSimType(value); resetPage(); }} options={SIM_TYPE_OPTIONS} /><Select className="min-w-36" value={sort} onChange={(value) => { setSort(value); resetPage(); }} options={SORT_OPTIONS} /></div>} />

    {/* Overview insights (GET /partner/customers/overview) */}
    {data && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <section className={card} style={{ borderColor: colors.border }}>
        <h3 className="text-sm font-bold" style={{ color: colors.textPrimary }}>Needs Attention</h3>
        {data.needs_attention.length ? data.needs_attention.map(item => <div key={`${item.customer_id}-${item.sim_number}`} className="flex items-center justify-between gap-2 text-xs">
          <button type="button" onClick={() => setCustomerId(item.customer_id)} className="min-w-0 text-left"><p className="truncate font-semibold" style={{ color: colors.textPrimary }}>{item.name}</p><p style={{ color: colors.textSecondary }}>{item.sim_type} · {item.sim_number}</p></button>
          <div className="shrink-0 text-right"><p className="font-semibold" style={{ color: item.days_left <= 0 ? colors.danger : colors.warning }}>{item.expires_in_text}</p>{item.can_remind && <Button type="link" size="small" className="px-0!" loading={remindOne.isPending && remindOne.variables === item.customer_id} onClick={() => remindOne.mutate(item.customer_id)}>Remind</Button>}</div>
        </div>) : <p className="text-xs" style={{ color: colors.textSecondary }}>No customers need attention.</p>}
      </section>
      <section className={card} style={{ borderColor: colors.border }}>
        <h3 className="text-sm font-bold" style={{ color: colors.textPrimary }}>Customers by SIM Type</h3>
        {data.customers_by_sim_type.length ? data.customers_by_sim_type.map(item => <div key={item.type} className="text-xs"><div className="flex justify-between"><span style={{ color: colors.textSecondary }}>{item.type_label}</span><strong>{item.count.toLocaleString()}</strong></div><Progress percent={item.percentage} showInfo={false} size="small" strokeColor={colors.primary} /></div>) : <p className="text-xs" style={{ color: colors.textSecondary }}>No data yet.</p>}
      </section>
      <section className={card} style={{ borderColor: colors.border }}>
        <h3 className="text-sm font-bold" style={{ color: colors.textPrimary }}>Customers by Network</h3>
        {data.customers_by_network.length ? data.customers_by_network.map(item => <div key={item.network} className="text-xs"><div className="flex justify-between"><span style={{ color: colors.textSecondary }}>{item.network}</span><strong>{item.count.toLocaleString()} · {item.percentage}%</strong></div><Progress percent={item.percentage} showInfo={false} size="small" strokeColor={item.color || colors.primary} /></div>) : <p className="text-xs" style={{ color: colors.textSecondary }}>No data yet.</p>}
      </section>
      <section className={card} style={{ borderColor: colors.border }}>
        <h3 className="text-sm font-bold" style={{ color: colors.textPrimary }}>Recent Activity</h3>
        {data.recent_activity.length ? data.recent_activity.map(item => <div key={item.id} className="text-xs"><p className="font-semibold" style={{ color: colors.textPrimary }}>{item.title}</p><p style={{ color: colors.textSecondary }} title={new Date(item.timestamp).toLocaleString()}>{item.time_ago}</p></div>) : <p className="text-xs" style={{ color: colors.textSecondary }}>No recent activity.</p>}
      </section>
    </div>}

    <AddPartnerCustomerModal open={addOpen} onOpenChange={setAddOpen} />
    <CustomerDetailDrawer id={customerId} open={Boolean(customerId)} onClose={() => setCustomerId(undefined)} />
  </main>;
}
