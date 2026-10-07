import { Button } from "antd";
import { Bell, Package, Shuffle, UserPlus, Users, ShieldAlert } from "lucide-react";
import { colors } from "@/constants/colors";
import type { RmCoordinatorDetailData } from "../../types/api";
import { RmInfoRows, RmPanel } from "./RmDesign";
import { RmCoordinatorApsTable, RmCoordinatorStockHistoryTable } from "./RmCoordinatorDetailTables";
import { RmProfileStock } from "./RmProfileStock";
import { RmStatus } from "./RmDashboardPrimitives";
export type RmProfileAction = "distribute" | "onboard" | "remind" | "suspend" | "redistribute";
export function RmProfileSummary({ data }: { data: RmCoordinatorDetailData }) {
  const summary = data.summary_bar;
  return <div className="rm-summary-bar">{[
    ["ROLE", summary.role.title, summary.role.status], ["STOCK", summary.stock.label, summary.stock.sublabel],
    ["APs MANAGED", summary.aps_managed.label, summary.aps_managed.sublabel], ["ACTIVATIONS", summary.activations.label, summary.activations.sublabel],
    ["BONUS", summary.bonus.status, summary.bonus.target_tier], ["LAST ACTIVE", summary.last_active.time_ago, summary.last_active.location],
  ].map(([label, value, sub]) => <div key={label}><p className="mb-1 font-semibold">{label}</p><strong>{value}</strong><p>{sub}</p></div>)}</div>;
}
export function RmProfileLayout({ id, data, onAction }: { id: number; data: RmCoordinatorDetailData; onAction: (action: RmProfileAction) => void }) {
  const suspended = data.hero.status.toLowerCase() === "suspended";
  return <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_1.1fr_.9fr]">
    <div className="min-w-0 space-y-4"><RmPanel title="SC Information"><RmInfoRows rows={Object.entries(data.sc_information).map(([key, value]) => [key.replaceAll("_", " ").replace(/^./, letter => letter.toUpperCase()), key === "kyc_status" ? <RmStatus value={value} /> : value])} /></RmPanel>
      <RmProfileStock id={id} data={data.sim_stock} onDistribute={() => onAction("distribute")} />
      <div id="rm-profile-partners" className="scroll-mt-24"><RmPanel title={`Agency Partners (${data.summary_bar.aps_managed.count})`}><RmCoordinatorApsTable id={id} /></RmPanel></div>
    </div>
    <div className="min-w-0 space-y-4"><RmPanel title="Performance"><div className="grid grid-cols-2 gap-2 xl:grid-cols-4">{[["Activations", data.performance.activations.toLocaleString()], ["Network APs", data.performance.network_aps.toLocaleString()], ["Avg/AP", data.performance.avg_per_ap], ["Commission", data.performance.commission_formatted]].map(([label, value]) => <div key={label} className="rounded-xl p-3" style={{ background: colors.blues.surfaceLight }}><p className="text-[10px]" style={{ color: colors.texts.muted }}>{label}</p><strong className="mt-1 block break-words text-lg">{value}</strong></div>)}</div>
      {/* Daily activations histogram and last-month comparison remain commented out: supplied detail response contains aggregate performance only. */}
    </RmPanel><RmPanel title="Bonus Status"><div className="rounded-xl p-4" style={{ background: colors.greens.light }}><strong style={{ color: colors.success }}>{data.bonus_status.headline}</strong><p className="mt-1 text-xs">{data.bonus_status.detail}</p><strong className="text-xs" style={{ color: colors.success }}>{data.bonus_status.bonus_tag}</strong></div><p className="mt-3 text-xs" style={{ color: colors.primary }}>{data.bonus_status.subtext}</p></RmPanel>
      <RmPanel title="Stock Distributions" description="From you to this SC"><RmCoordinatorStockHistoryTable id={id} /></RmPanel>
    </div>
    <aside className="min-w-0 space-y-4"><RmPanel title="QUICK ACTIONS"><div className="rm-action-stack">{[
      { label: "Distribute SIMs", icon: Package, action: () => onAction("distribute"), color: colors.success, filled: true },
      { label: "Onboard AP for SC", icon: UserPlus, action: () => onAction("onboard"), color: colors.blues.primary },
      { label: "Send Reminder", icon: Bell, action: () => onAction("remind"), color: colors.warning },
      { label: "View SC's APs", icon: Users, action: () => document.getElementById("rm-profile-partners")?.scrollIntoView({ behavior: "smooth" }), color: colors.blues.primary },
      { label: suspended ? "Reactivate SC" : "Suspend SC", icon: ShieldAlert, action: () => onAction("suspend"), color: suspended ? colors.success : colors.danger },
      { label: "Redistribute SIMs", icon: Shuffle, action: () => onAction("redistribute"), color: colors.success, filled: true },
    ].map(item => <Button key={item.label} icon={<item.icon size={15} />} onClick={item.action} style={{ background: item.filled ? item.color : colors.backgrounds.background, color: item.filled ? colors.texts.whiteFixed : item.color, borderColor: item.color }}>{item.label}</Button>)}</div></RmPanel>
      <RmPanel title="SC Network Commission"><RmInfoRows rows={[["SC network acts", data.network_commission.sc_network_acts_text], ["Commission pool", data.network_commission.commission_pool_formatted], ["RM share", data.network_commission.rm_share_formatted]]} /><p className="mt-2 text-xs" style={{ color: colors.texts.muted }}>{data.network_commission.rm_share_rate}</p></RmPanel>
      {/* Account Timeline remains commented out: no coordinator account timeline endpoint/data supplied. */}
    </aside>
  </div>;
}
