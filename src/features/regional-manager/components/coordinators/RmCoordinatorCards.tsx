import { Button, Dropdown, Progress } from "antd";
import { Eye, Send, Bell, MoreHorizontal, Users, Package, Activity, Trophy } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { colors } from "@/constants/colors";
import type { RmMyScOverviewData } from "../../types/coordinators";
import { RmStatus } from "../dashboard/RmDashboardPrimitives";
export type CoordinatorRow = RmMyScOverviewData["coordinators"][number];
export type CoordinatorAction = "view" | "distribute" | "remind" | "suspend" | "contact" | "redistribute" | "onboardAp";
export function RmCoordinatorCards({ rows, onAction }: { rows: CoordinatorRow[]; onAction: (action: CoordinatorAction, row: CoordinatorRow) => void }) {
  if (!rows.length) return <AppEmptyState title="No state coordinators" description="Onboard a coordinator or adjust your filters." />;
  return <div className="space-y-4">{rows.map(row => {
    const suspended = row.status.toLowerCase() === "suspended";
    const atRisk = row.status.toLowerCase().replaceAll("_", " ") === "at risk";
    const tone = suspended ? colors.danger : atRisk ? colors.warning : colors.success;
    return <article key={row.id} className="rounded-xl border p-4" style={{ borderColor: suspended || atRisk ? tone : colors.border, background: colors.backgrounds.background }}>
      <div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: colors.blues.surfaceLight, color: colors.blues.primary }}>{row.name.split(" ").map(word => word[0]).slice(0, 2).join("")}</span><div className="min-w-0 flex-1"><PageHeader title={row.name} description={`${row.phone} · ${row.state}`} /></div><RmStatus value={row.status} /></div>
      <div className="my-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[{ icon: Users, text: row.sub_stats.aps_label, color: colors.blues.primary }, { icon: Package, text: row.sub_stats.stock_label, color: colors.success }, { icon: Activity, text: row.sub_stats.activations_label, color: colors.success }, { icon: Trophy, text: row.sub_stats.bonus_status, color: atRisk ? colors.warning : colors.primary }].map(({ icon: Icon, text, color }, index) => <div key={index} className="flex items-center justify-center gap-1 rounded-lg p-3 text-center text-xs font-semibold" style={{ background: colors.backgrounds.base, color }}><Icon size={12} className="shrink-0" />{text}</div>)}</div>
      <Progress percent={Math.min(100, Math.max(0, row.target_progress.percentage))} showInfo={false} strokeColor={tone} trailColor={colors.backgrounds.base} size="small" /><p className="mb-3 text-right text-[11px]" style={{ color: colors.texts.muted }}>{row.target_progress.text}</p>
      <div className="flex flex-wrap items-center gap-1 border-t pt-2" style={{ borderColor: colors.border }}><Button type="text" size="small" icon={<Eye size={12} />} onClick={() => onAction("view", row)}>View Profile</Button><Button type="text" size="small" style={{ color: colors.success }} icon={<Send size={12} />} disabled={suspended} onClick={() => onAction("distribute", row)}>Distribute</Button><Button type="text" size="small" style={{ color: suspended ? colors.success : colors.warning }} icon={<Bell size={12} />} onClick={() => onAction(suspended ? "suspend" : "remind", row)}>{suspended ? "Reactivate" : "Remind"}</Button>
        <Dropdown trigger={["click"]} menu={{ items: [{ key: "view", label: "View Full Profile" }, { key: "distribute", label: "Distribute SIMs", disabled: suspended }, { key: "redistribute", label: "Redistribute Stock", disabled: suspended }, { key: "remind", label: "Send Bonus Reminder" }, { key: "contact", label: "Contact SC" }, { key: "onboardAp", label: "Onboard AP for This SC", disabled: suspended }, { key: "suspend", label: suspended ? "Reactivate SC" : "Suspend SC", danger: !suspended }], onClick: ({ key }) => onAction(key as CoordinatorAction, row) }}><Button className="ml-auto" type="text" aria-label={`More options for ${row.name}`} icon={<MoreHorizontal size={16} />} /></Dropdown>
        {/* Remove from Network is commented out: no coordinator removal endpoint is supplied. */}
      </div>
    </article>;
  })}</div>;
}

