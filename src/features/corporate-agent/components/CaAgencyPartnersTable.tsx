import { Plus, AlertTriangle, Package } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { PageHeader } from "@/components/common/PageHeader";
import { colors, APP_COLORS } from "@/constants/colors";
import type { useTablePagination } from "@/hooks/useTablePagination";
import type { useGetCaManagedPartners } from "../api/useGetCaManagedPartners";
import type { CaManagedPartnerItem } from "../types/api";
import { CaQueryState } from "./CaQueryState";
export function CaAgencyPartnersTable({ query, pagination, onSearch, onOnboardNewAp, onDistributeToAp }: {
  query: ReturnType<typeof useGetCaManagedPartners>; pagination: ReturnType<typeof useTablePagination>; onSearch: (search: string) => void;
  onOnboardNewAp: () => void; onDistributeToAp: (ap: CaManagedPartnerItem) => void;
}) {
  const columns: ColumnsType<CaManagedPartnerItem> = [
    { title: "Agency Partner", dataIndex: "name", render: (_, ap) => <div className="flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-700 shrink-0">{ap.initials}</span><div><span className="font-bold text-slate-900 block">{ap.name}</span><span className="text-[10px] text-slate-400 block">{ap.phone}</span></div></div> },
    { title: "Stock", align: "center", render: (_, ap) => <span className="inline-flex items-center gap-1 font-bold px-1.5 py-0.5 rounded" style={{ color: ap.stock === 0 || ap.stock_status === "out" ? colors.danger : ap.stock_alert ? colors.warning : colors.success, background: ap.stock_alert ? colors.reds.light : "transparent" }}>{ap.stock_label}{ap.stock_alert && <AlertTriangle size={11} />}</span> },
    { title: "Acts/mo", dataIndex: "acts_per_month_formatted", align: "right", className: "font-black text-slate-900" },
    { title: "Bonus", align: "center", render: (_, ap) => <span className="px-2 py-0.5 rounded-full text-[10px] font-bold inline-block" style={{ background: ap.bonus_badge_color.toLowerCase() === "red" ? colors.reds.light : colors.blues.surfaceLight, color: ap.bonus_badge_color.toLowerCase() === "red" ? colors.danger : colors.blues.primary }}>{ap.bonus_status}</span> },
    { title: "Action", align: "right", render: (_, ap) => <button type="button" onClick={() => onDistributeToAp(ap)} className="p-1 rounded-lg border hover:bg-slate-100 text-slate-600 transition-colors" aria-label={`Distribute SIMs to ${ap.name}`} title={`Send stock to ${ap.name}`} style={{ borderColor: APP_COLORS.greys.stroke }}><Package className="w-3 h-3 text-slate-700" /></button> },
  ];
  return <div id="ca-partners" className="ca-partners rounded-2xl border p-4 shadow-xs space-y-3 bg-white" style={{ borderColor: APP_COLORS.greys.stroke }}><PageHeader title={`My Agency Partners (${query.data?.total ?? 0})`} actions={[{ key: "onboard", label: "Onboard New AP", icon: <Plus size={14} />, onClick: onOnboardNewAp }]} />
    <CaQueryState loading={false} error={query.error} retry={() => void query.refetch()}><DataTable columns={columns} dataSource={query.data?.partners ?? []} rowKey="id" loading={query.isFetching} onSearch={onSearch} searchPlaceholder="Search agency partners" pagination={{ ...pagination.paginationConfig, total: query.data?.total ?? 0 }} scroll={{ x: "max-content" }} emptyTitle="No Agency Partners" emptyDescription="Onboard an AP or adjust your search." /></CaQueryState>
  </div>;
}
