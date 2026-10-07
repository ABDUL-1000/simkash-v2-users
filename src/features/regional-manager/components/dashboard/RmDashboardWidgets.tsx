import { Button, Progress } from "antd";
import { Bell, CheckCircle, Package, Shuffle, TrendingUp, Trophy, Upload, UserPlus, XCircle, AlertTriangle } from "lucide-react";
import { colors } from "@/constants/colors";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetRmSimInventoryOverview } from "../../api/inventory";
import type { RmDashboardOverviewData } from "../../types/api";
import { RmQueryState, RmStatus } from "./RmDashboardPrimitives";
import { RmInfoRows, RmPanel } from "./RmDesign";
export function RmDashboardWidgets({ data, onRequest, onDistribute, onPayout, onOnboard, onRemind, onRedistribute }: {
  data: RmDashboardOverviewData; onRequest: () => void; onDistribute: () => void; onPayout: () => void;
  onOnboard: () => void; onRemind: () => void; onRedistribute: () => void;
}) {
  const query = useGetRmSimInventoryOverview();
  const health = data.network_health;
  const commission = data.commission_this_month;
  const tones = [colors.blues.primary, colors.success, colors.primary, colors.warning];
  const healthRows = [
    { label: "Active SCs", value: health.active_scs.text, status: health.active_scs.status, icon: CheckCircle, color: colors.success },
    { label: "Low Stock SCs", value: health.low_stock_scs.text, status: health.low_stock_scs.status, icon: AlertTriangle, color: colors.warning },
    { label: "Avg Acts/SC", value: health.avg_acts_per_sc.formatted, status: health.avg_acts_per_sc.status, icon: TrendingUp, color: colors.texts.muted },
    { label: "Bonus Hit Rate", value: `${health.bonus_hit_rate.percentage}%`, status: health.bonus_hit_rate.text, icon: Trophy, color: colors.warning },
    { label: "Out of Stock SCs", value: health.out_of_stock_scs.text, status: health.out_of_stock_scs.status, icon: XCircle, color: colors.danger },
  ];
  return <aside className="min-w-0 space-y-4">
    <RmPanel title="SIM Inventory">
      <strong className="block text-3xl font-extrabold">{data.sim_inventory.total_available.toLocaleString()}</strong><p className="text-xs" style={{ color: colors.texts.muted }}>SIMs available</p>
      <RmQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>
        {query.data?.current_inventory.length ? query.data.current_inventory.map((stock, index) => {
          const total = query.data!.summary_cards.total_available.count;
          const percent = total > 0 ? Math.round(stock.available / total * 100) : 0;
          return <div key={stock.type} className="border-t pt-2 text-xs" style={{ borderColor: colors.border }}><div className="flex justify-between gap-2"><span style={{ color: colors.texts.muted }}>{stock.label}</span><span><strong>{stock.available}</strong> <span style={{ color: colors.texts.muted }}>{percent}%</span></span></div><Progress percent={percent} showInfo={false} size="small" strokeColor={tones[index % tones.length]} trailColor={colors.blues.surfaceLight} /></div>;
        }) : <AppEmptyState title="No inventory breakdown" />}
      </RmQueryState>
      <p className="mt-2 text-xs" style={{ color: colors.texts.muted }}>Distributed to SCs this week</p><p className="text-xs font-semibold">{data.primary_cards.my_stock.distributed_this_week_text}</p>
      <div className="mt-3 text-center"><Button onClick={onDistribute} style={{ color: colors.success, borderColor: colors.success }}>Distribute Stock</Button></div>
    </RmPanel>
    <RmPanel title="Commission This Month"><RmInfoRows rows={[["Network activations", commission.network_activations.toLocaleString()], ["Commission rate", commission.commission_rate_text], ["Total earned", <strong style={{ color: colors.success }}>{commission.total_earned_formatted}</strong>]]} /><div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs" style={{ color: colors.warning }}><span>Pending payout: {commission.pending_payout_formatted}</span><Button type="text" size="small" style={{ color: colors.warning }} disabled={!data.primary_cards.my_commission.can_request_payout} onClick={onPayout}>Request Payout</Button></div></RmPanel>
    <RmPanel title="Network Health"><div>{healthRows.map(row => <div key={row.label} className="flex items-center gap-2 border-b py-2 last:border-0" style={{ borderColor: colors.border }}><row.icon size={16} style={{ color: row.color }} /><div className="min-w-0 flex-1 text-xs"><p style={{ color: colors.texts.muted }}>{row.label}</p><strong>{row.value}</strong></div><RmStatus value={row.status} /></div>)}</div></RmPanel>
    <RmPanel title="Quick Actions"><div className="rm-action-stack">{[
      { label: "Onboard New SC", icon: UserPlus, action: onOnboard, color: colors.blues.primary, filled: true },
      { label: "Distribute Stock", icon: Package, action: onDistribute, color: colors.success },
      { label: "Send Bonus Reminder", icon: Bell, action: onRemind, color: colors.warning },
      { label: "Request Stock from Admin", icon: Upload, action: onRequest, color: colors.textPrimary },
      { label: "Redistribute SIMs", icon: Shuffle, action: onRedistribute, color: colors.success },
    ].map(item => <Button key={item.label} icon={<item.icon size={15} />} onClick={item.action} style={{ background: item.filled ? item.color : colors.backgrounds.background, color: item.filled ? colors.texts.whiteFixed : item.color, borderColor: item.color }}>{item.label}</Button>)}</div>
      {/* <ViewNetworkReport /> remains commented out: no regional network-report endpoint supplied. */}
    </RmPanel>
  </aside>;
}
