import type { RmDashboardOverviewData } from "../../types/api";
import { RmMetric, RmSection } from "./RmDashboardPrimitives";

export function RmDashboardMetrics({ data, onPayout }: { data: RmDashboardOverviewData; onPayout: () => void }) {
  const cards = data.primary_cards;
  return <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <RmMetric label="Today's network commission" value={cards.today.commission_formatted} subtitle={`${cards.today.activations} activations · ${cards.today.comparison.text}`} />
      <RmMetric label="This month's activations" value={cards.this_month.activations_formatted} subtitle={`${cards.this_month.subtitle} · ${cards.this_month.target.text}`} />
      <RmMetric label="Available regional stock" value={cards.my_stock.available} subtitle={`${cards.my_stock.subtitle} · ${cards.my_stock.distributed_this_week_text}`} />
      <RmSection title="Regional commission" description={cards.my_commission.subtitle} actions={[{ key: "withdraw", label: "Withdraw", disabled: !cards.my_commission.can_request_payout, onClick: onPayout }]}>
        <p className="text-2xl font-bold">{cards.my_commission.formatted}</p>
      </RmSection>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{Object.entries(data.summary_cards).map(([key, card]) => <RmMetric key={key} label={card.label} value={card.count} subtitle={card.subtitle} />)}</div>
  </>;
}
