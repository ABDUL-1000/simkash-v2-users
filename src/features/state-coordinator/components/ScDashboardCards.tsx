import { Progress, Timeline } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import type { ScDashboardOverviewData } from "../types/api";
import { ScMetric, ScSection } from "./ScSection";

export function ScDashboardMetrics({ data }: { data: ScDashboardOverviewData }) {
  return <>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <ScMetric label="Today's activations" value={data.today.activations} subtext={`${data.today.commission_formatted} · ${data.today.comparison.text}`} />
      <ScMetric label="This month" value={data.this_month.activations_formatted} subtext={`${data.this_month.agency_partners_text} · ${data.this_month.target.text}`} />
      <ScMetric label="My stock" value={data.my_stock.total_available} subtext={`${data.my_stock.subtext} · ${data.my_stock.low_stock_aps.text}`} />
      <ScMetric label="My commission" value={data.my_commission.amount_formatted} subtext={data.my_commission.period_text} />
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Object.values(data.summary_cards).map((card) => <ScMetric key={card.key} label={card.label} value={card.value} subtext={card.subtext} highlight={card.highlight} />)}
    </div>
  </>;
}

export function ScDashboardCards({ data }: { data: ScDashboardOverviewData }) {
  const commission = data.commission_this_month;
  return <div className="grid gap-5 lg:grid-cols-2">
    <ScSection title="SIM inventory" description={data.sim_inventory.total_available_label}>
      {data.sim_inventory.breakdown.length ? data.sim_inventory.breakdown.map((item) => <div key={item.type}>
        <div className="flex justify-between text-sm"><span>{item.label}</span><span>{item.count}</span></div>
        <Progress percent={Math.max(0, Math.min(100, item.percentage))} strokeColor={colors.primary} />
      </div>) : <AppEmptyState title="No inventory" />}
      <p className="text-xs" style={{ color: colors.textSecondary }}>{data.sim_inventory.received_from_rm_text}</p>
      <p className="text-xs" style={{ color: colors.textSecondary }}>{data.sim_inventory.last_distribution_text}</p>
    </ScSection>
    <ScSection title="Needs attention">
      {data.needs_attention.items.length ? <ul className="space-y-3">{data.needs_attention.items.map((item) => <li key={item.partner_id} className="rounded-xl border p-3" style={{ borderColor: colors.border }}>
        <p className="font-semibold">{item.partner_name}</p>
        <p className="text-sm" style={{ color: item.level === "critical" ? colors.danger : colors.warning }}>{item.message}</p>
      </li>)}</ul> : <AppEmptyState title="Nothing needs attention" description="No stock alerts were reported." />}
    </ScSection>
    <ScSection title="Commission this month" description={`${commission.ap_network_acts_formatted} AP network activations`}>
      <dl className="space-y-3 text-sm">{[
        ["Commission", commission.commission_formatted], ["Bonus earned", commission.bonus_earned_formatted],
        ["Total this month", commission.total_this_month_formatted], ["Pending payout", commission.pending_payout_formatted],
      ].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt>{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl>
    </ScSection>
    <ScSection title="Recent activity">
      {data.activity_feed.length ? <Timeline items={data.activity_feed.map((item) => ({ key: item.id, color: colors.primary,
        content: <div><p className="font-semibold">{item.title}</p><p className="text-sm" style={{ color: colors.textSecondary }}>{item.subtitle}</p><p className="text-xs">{item.time_ago}</p></div>,
      }))} /> : <AppEmptyState title="No recent activity" />}
    </ScSection>
  </div>;
}
