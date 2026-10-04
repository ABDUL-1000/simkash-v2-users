import { Progress, Timeline } from "antd";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import type { ScAgentDetailData } from "../../types/agents";
import { ScMetric, ScSection } from "../ScSection";

export function ScAgentSummary({ data }: { data: ScAgentDetailData }) {
  const summary = data.summary_bar;
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
    <ScMetric label="Stock" value={summary.stock.label} subtext={summary.stock.sublabel} />
    <ScMetric label="Customers" value={summary.customers.count} /><ScMetric label="Activations" value={summary.activations.count} />
    <ScMetric label="Bonus" value={summary.bonus.status} /><ScMetric label="Last active" value={summary.last_active} />
  </div>;
}

export function ScAgentDetailCards({ data }: { data: ScAgentDetailData }) {
  const profile = data.profile_details;
  const performance = data.performance_this_month;
  return <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <ScSection title="AP details"><dl className="space-y-3 text-sm">{Object.entries(profile).map(([label, value]) => <div key={label} className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4"><dt className="capitalize" style={{ color: colors.textSecondary }}>{label.replaceAll("_", " ")}</dt><dd className="break-words sm:text-right">{value}</dd></div>)}</dl></ScSection>
    <ScSection title="Stock details" description={data.stock_details.total_stock_label}>
      {data.stock_details.breakdown.length ? data.stock_details.breakdown.map((stock) => <div key={stock.label}><p className="flex justify-between text-sm"><span>{stock.label}</span><strong>{stock.count}</strong></p><Progress percent={Math.min(100, Math.max(0, stock.percentage))} strokeColor={colors.primary} /></div>) : <AppEmptyState title="No stock breakdown" />}
      <p className="text-sm">{data.stock_details.received_all_time_text}</p><p className="text-sm">{data.stock_details.last_distribution_text}</p>
    </ScSection>
    <ScSection title="Performance this month" description={`${performance.avg_per_day} activations per day`}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3"><ScMetric label="Activations" value={performance.activations} /><ScMetric label="Customers" value={performance.customers} /><ScMetric label="Commission" value={performance.commission_formatted} /></div>
      {performance.daily_activations.length ? <div className="h-64 w-full" role="img" aria-label="Daily activations for this month"><ResponsiveContainer width="100%" height="100%"><BarChart data={performance.daily_activations} accessibilityLayer>
        <CartesianGrid stroke={colors.border} vertical={false} /><XAxis dataKey="day" stroke={colors.textSecondary} /><YAxis allowDecimals={false} stroke={colors.textSecondary} /><Tooltip /><Bar dataKey="count" name="Activations" fill={colors.primary} />
      </BarChart></ResponsiveContainer></div> : <AppEmptyState title="No daily activations" />}
    </ScSection>
    <ScSection title="Bonus tracker" description={data.bonus_tracker.headline}>
      <Progress percent={Math.min(100, Math.max(0, data.bonus_tracker.percentage))} strokeColor={colors.success} /><p>{data.bonus_tracker.bonus_reward}</p>
    </ScSection>
    <ScSection title="Commission from AP" description={data.commission.subtitle}>
      <p className="text-2xl font-bold" style={{ color: colors.primary }}>{data.commission.current_month_formatted}</p>
      <dl className="space-y-3 text-sm">{[["Activation rate", data.commission.activation_rate], ["Bonus status", data.commission.bonus_status], ["Vs last month", data.commission.vs_last_month_formatted], ["Last month", data.commission.last_month_formatted], ["Two months ago", data.commission.two_months_ago_formatted]].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </ScSection>
    <ScSection title="Account timeline">{data.account_timeline.length ? <Timeline items={data.account_timeline.map((event, index) => ({ key: `${event.title}-${index}`, color: colors.primary, content: <div><strong>{event.title}</strong><p className="text-sm">{event.subtitle}</p></div> }))} /> : <AppEmptyState title="No account activity" />}</ScSection>
  </div>;
}
