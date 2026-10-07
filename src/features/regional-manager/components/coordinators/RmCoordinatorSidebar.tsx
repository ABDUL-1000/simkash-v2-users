import { Button } from "antd";
import { Users, Send, Bell, Download, BarChart3 } from "lucide-react";
import { colors } from "@/constants/colors";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { RmMyScOverviewData } from "../../types/coordinators";
import { useGetScComparison } from "../../api/coordinators";
import { RmInfoRows, RmPanel } from "../dashboard/RmDesign";
import { RmQueryState } from "../dashboard/RmDashboardPrimitives";
export function RmCoordinatorSidebar({ data, onAction }: { data?: RmMyScOverviewData; onAction: (action: "onboard" | "bulkDistribute" | "remind" | "export" | "comparison") => void }) {
  const comparison = useGetScComparison();
  const cards = data?.summary_cards;
  const rows = comparison.data?.table_rows ?? [];
  const low = rows.filter(row => /low|critical|out/i.test(row.stock_status));
  const bonuses = rows.reduce<Record<string, number>>((counts, row) => { counts[row.bonus_status] = (counts[row.bonus_status] ?? 0) + 1; return counts; }, {});
  return <aside className="space-y-4">
    <RmPanel title="Network Summary">{cards ? <RmInfoRows rows={[["Total SCs", cards.state_coordinators.count], ["Active", cards.active_scs.count], ["At Risk", cards.at_risk.count], ["Suspended", cards.suspended.count], ["Total APs", cards.agency_partners.count], ...(comparison.data ? [["Network Acts", comparison.data.summary_row.total_activations.toLocaleString()] as [string, string]] : [])]} /> : <AppEmptyState title="No network summary" />}</RmPanel>
    <RmPanel title="Stock Alerts"><RmQueryState loading={comparison.isLoading} error={comparison.error} retry={() => void comparison.refetch()}>{low.length ? low.map(row => <div key={row.rank} className="mb-2 rounded-lg border p-3 text-xs" style={{ borderColor: colors.ambers.light, background: colors.backgrounds.base }}><strong style={{ color: row.stock === 0 ? colors.danger : colors.warning }}>{row.name} · {row.state}</strong><p className="mt-1">{row.stock} SIMs · {row.stock_status}</p></div>) : <AppEmptyState title="No stock alerts" />}</RmQueryState><Button block onClick={() => onAction("bulkDistribute")} icon={<Send size={13} />}>Distribute to SCs</Button>{/* Per-alert distribution is commented out: comparison rows do not contain coordinator IDs. Select a verified recipient in the distribution form. */}</RmPanel>
    <RmPanel title="Bonus Status This Period"><RmQueryState loading={comparison.isLoading} error={comparison.error} retry={() => void comparison.refetch()}>{rows.length ? <RmInfoRows rows={Object.entries(bonuses)} /> : <AppEmptyState title="No bonus data" />}</RmQueryState><Button block type="text" style={{ color: colors.warning }} onClick={() => onAction("remind")}>Send Reminders to At Risk</Button></RmPanel>
    <RmPanel title="Quick Actions"><div className="rm-action-stack">{[{ key: "onboard", label: "Onboard New SC", icon: Users }, { key: "bulkDistribute", label: "Distribute to Multiple SCs", icon: Send }, { key: "remind", label: "Send Bulk Reminder", icon: Bell }, { key: "export", label: "Export SC Report", icon: Download }, { key: "comparison", label: "Compare Performance", icon: BarChart3 }].map(({ key, label, icon: Icon }) => <Button key={key} icon={<Icon size={14} />} onClick={() => onAction(key as Parameters<typeof onAction>[0])}>{label}</Button>)}</div>{/* Dedicated Network Activity link remains commented out: no dedicated RM activity page endpoint supplied. */}</RmPanel>
  </aside>;
}

