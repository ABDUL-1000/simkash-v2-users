import { useState } from "react";
import { Button, Input, Pagination, Segmented, Select } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/DataTable";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import type { AgentOverviewParams, ScAgentItem, ScPartnerTarget } from "../../types/operations";
import { ScStatusTag } from "../ScStatusTag";
import { ScQueryState } from "../ScSection";

export function ScPartnerList({ partners, filters, onFilter, pagination, onView, onDistribute, onRemind, loading, error, retry }: {
  partners: ScAgentItem[]; filters: AgentOverviewParams; onFilter: (filters: Partial<AgentOverviewParams>) => void;
  pagination: TablePaginationConfig; onView: (id: number) => void; onDistribute: (target: ScPartnerTarget) => void; onRemind: (target: ScPartnerTarget) => void;
  loading: boolean; error: Error | null; retry: () => void;
}) {
  const [view, setView] = useState<"cards" | "table">("cards");
  const columns: ColumnsType<ScAgentItem> = [
    { title: "Partner", dataIndex: "name", render: (name: string, row) => <div><strong>{name}</strong><p>{row.phone}</p><p style={{ color: colors.textSecondary }}>{row.location}</p></div> },
    { title: "Status", dataIndex: "status_label", render: (value: string) => <ScStatusTag status={value} /> },
    { title: "Stock", dataIndex: "stock", render: (value: number, row) => <span style={{ color: value === 0 ? colors.danger : row.status === "low_stock" ? colors.warning : colors.success }}>{value}</span> }, { title: "Customers", dataIndex: "customers_count" }, { title: "Activations / month", dataIndex: "acts_per_month" },
    { title: "Bonus", dataIndex: "bonus_milestone", render: (value: string) => <ScStatusTag status={value} /> },
    { title: "Actions", key: "actions", render: (_, row) => <div className="flex flex-wrap gap-2" onClick={(event) => event.stopPropagation()}>
      <Button onClick={() => onDistribute(row)}>Distribute</Button><Button onClick={() => onRemind(row)}>Remind</Button>
    </div> },
  ];
  return <div className="min-w-0 space-y-4">
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <Input.Search aria-label="Search agency partners" value={filters.search} placeholder="Name, phone or location" onChange={(event) => onFilter({ search: event.target.value })} className="w-full sm:max-w-xs" allowClear />
      <Select aria-label="Partner status" value={filters.status} onChange={(status) => onFilter({ status })} options={["all", "active", "low_stock", "suspended", "new"].map((value) => ({ value, label: value === "all" ? "All statuses" : value.replaceAll("_", " ") }))} />
      <Select aria-label="Bonus status" value={filters.bonusStatus} onChange={(bonusStatus) => onFilter({ bonusStatus })} options={["all", "achieved", "on_track", "at_risk", "missed"].map((value) => ({ value, label: value === "all" ? "All bonuses" : value.replaceAll("_", " ") }))} />
      <Segmented aria-label="Partner view" value={view} onChange={setView} options={[{ value: "cards", label: "Cards" }, { value: "table", label: "Table" }]} />
    </div>
    <ScQueryState loading={loading} error={error} retry={retry}>
    {view === "table" ? <DataTable columns={columns} dataSource={partners} rowKey="id" pagination={pagination} onRowClick={(row) => onView(row.id)} emptyTitle="No agency partners" emptyDescription="No partners match your search and filters." /> : <>
      {partners.length ? <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">{partners.map((partner) => <section key={partner.id} className="space-y-4 rounded-2xl border p-4" style={{ borderColor: partner.status === "low_stock" ? colors.warning : colors.border, background: colors.backgrounds.background }}>
        <PageHeader title={partner.name} description={`${partner.phone} · ${partner.location}`} extra={<span className="rounded-full border px-3 py-2 text-sm" style={{ color: colors.primary, borderColor: colors.border }}>{partner.initials}</span>} />
        <ScStatusTag status={partner.status_label} />
        <dl className="grid grid-cols-3 gap-3 text-sm">{[["Stock", partner.stock], ["Customers", partner.customers_count], ["Acts / month", partner.acts_per_month]].map(([label, value]) => <div key={label}><dt style={{ color: colors.textSecondary }}>{label}</dt><dd className="font-bold">{value}</dd></div>)}</dl>
        <ScStatusTag status={partner.bonus_milestone} />
        <div className="flex flex-wrap gap-2"><Button onClick={() => onView(partner.id)}>View profile</Button><Button onClick={() => onDistribute(partner)}>Distribute</Button><Button onClick={() => onRemind(partner)}>Send reminder</Button></div>
      </section>)}</div> : <AppEmptyState title="No agency partners" description="No partners match your search and filters." />}
      <Pagination {...pagination} responsive className="flex flex-wrap" />
    </>}
    </ScQueryState>
  </div>;
}
