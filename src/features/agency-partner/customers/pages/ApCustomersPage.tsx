import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Button, Tag } from "antd";
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
export function ApCustomersPage() {
  const [tab, setTab] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState<number>();
  const [addOpen, setAddOpen] = useState(false);
  const pagination = useTablePagination({ initialPageSize: 10 });
  const overview = useGetPartnerCustomerOverview();
  const list = useGetPartnerCustomers({ tab, search, page: pagination.page, limit: pagination.pageSize });
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
  const counts = overview.overview?.tab_counts;
  const metrics = [{ title: "Total Customers", value: overview.overview?.total_customers ?? 0 }, { title: "Active SIMs", value: overview.overview?.active_sims ?? 0 }, { title: "Expiring ≤ 7 Days", value: overview.overview?.expiring_soon ?? 0 }, { title: "Expired SIMs", value: overview.overview?.expired_sims ?? 0 }];

  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="Customer Management" description="Manage customers and their active SIM subscriptions" actions={[{ key: "add", label: "Add Customer", variant: "outline", onClick: () => setAddOpen(true) }, { key: "remind", label: "Remind All Expiring", loading: remindAll.isPending, onClick: () => remindAll.mutate() }]} />
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric, index) => <div key={metric.title} className="rounded-xl border bg-white p-4" style={{ borderColor: colors.border }}><p className="text-xs" style={{ color: colors.textSecondary }}>{metric.title}</p><p className="mt-2 text-2xl font-bold" style={{ color: index === 2 ? colors.warning : colors.textPrimary }}>{metric.value.toLocaleString()}</p></div>)}</div>
    <div className="flex flex-wrap gap-2">{tabs.map((item) => <button key={item.key} type="button" onClick={() => { setTab(item.key); pagination.resetPage(); }} className="rounded-full border px-3 py-2 text-xs font-semibold" style={{ borderColor: tab === item.key ? colors.primary : colors.border, color: tab === item.key ? colors.primary : colors.textSecondary }}>{item.label} ({counts?.[item.countKey] ?? 0})</button>)}</div>
    <DataTable columns={columns} dataSource={list.customers} rowKey="id" loading={list.isLoading || list.isFetching} pagination={{ ...pagination.paginationConfig, total }} onSearch={(value) => { setSearch(value); pagination.resetPage(); }} searchPlaceholder="Search customers, phone, or SIM" onRowClick={(row) => setCustomerId(row.id)} emptyTitle="No customers found" emptyDescription="Try another filter or add a customer." />
    <AddPartnerCustomerModal open={addOpen} onOpenChange={setAddOpen} />
    <CustomerDetailDrawer id={customerId} open={Boolean(customerId)} onClose={() => setCustomerId(undefined)} />
  </main>;
}
