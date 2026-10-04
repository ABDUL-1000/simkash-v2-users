import { Alert, Progress } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { ScMetric, ScSection } from "../ScSection";
import { ScStatusTag } from "../ScStatusTag";
import type { ScSimInventoryOverviewData } from "../../types/inventory";

export function ScInventoryMetricCards({ data }: { data: ScSimInventoryOverviewData }) {
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">{Object.entries(data.summary_cards).map(([key, card]) =>
    <ScMetric key={key} label={card.label} value={<span style={{ color: key === "aps_low_on_stock" && card.count > 0 ? colors.warning : colors.textPrimary }}>{card.count}</span>} subtext={card.subtext} />)}</div>;
}

export function ScPerTypeStockCards({ data }: { data: ScSimInventoryOverviewData }) {
  if (!data.stock_types.length) return <AppEmptyState title="No SIM stock" description="SIM stock types will appear after stock is received." />;
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{data.stock_types.map((stock) =>
    <ScSection key={stock.type} title={stock.label} description={stock.allocated_text}>
      <div className="flex flex-wrap items-center justify-between gap-2"><strong className="text-2xl">{stock.available}</strong><ScStatusTag status={stock.status} /></div>
      <Progress percent={Math.min(100, Math.max(0, stock.allocated_percentage))} strokeColor={colors.primary} />
      {stock.network_breakdown.length ? <ul className="space-y-2 text-sm">{stock.network_breakdown.map((network) => <li key={network.network} className="flex justify-between"><span>{network.network}</span><strong>{network.count}</strong></li>)}</ul> : <AppEmptyState title="No network breakdown" />}
    </ScSection>)}</div>;
}

export function ScInventoryAlertsAndRmCard({ data, onRequest, onDistributeAll }: {
  data: ScSimInventoryOverviewData; onRequest: () => void; onDistributeAll: () => void;
}) {
  return <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
    <ScSection title="Inventory health" description={data.inventory_health.total_sims_text}>
      <ScStatusTag status={data.inventory_health.overall_health} />
      <p className="text-sm" style={{ color: colors.textSecondary }}>{data.estimated_days_remaining.subtitle}</p>
      <Alert type="warning" showIcon title={data.estimated_days_remaining.alert_callout.message} />
      {/* Commented out: Backend response has no numeric estimated-days values; no invented forecast is shown. */}
    </ScSection>
    <ScSection title={data.aps_need_distribution.title} description={data.summary_cards.aps_low_on_stock.subtext}
      actions={[{ key: "all", label: "Distribute to all low", disabled: !data.aps_need_distribution.can_distribute_all, onClick: onDistributeAll }]}>
      <p className="text-2xl font-bold" style={{ color: colors.warning }}>{data.summary_cards.aps_low_on_stock.count}</p>
      {/* Commented out: The inventory overview supplies no per-AP alert items. See the distribution table or Agency Partners page. */}
    </ScSection>
    <ScSection title="Regional manager" description={data.rm_info.region} actions={[
      { key: "contact", label: "Contact RM", variant: "outline", disabled: !data.rm_info.phone, onClick: () => { window.location.href = `tel:${data.rm_info.phone.replace(/[^\d+]/g, "")}`; } },
      { key: "request", label: "Request stock", onClick: onRequest },
    ]}>
      <p className="font-semibold">{data.rm_info.name}</p><p className="text-sm">{data.rm_info.role} · {data.rm_info.phone}</p>
    </ScSection>
  </div>;
}
