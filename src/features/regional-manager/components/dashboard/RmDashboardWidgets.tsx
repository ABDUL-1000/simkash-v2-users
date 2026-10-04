import { Progress } from "antd";
import { colors } from "@/constants/colors";
import type { RmDashboardOverviewData } from "../../types/api";
import { RmSection, RmStatus } from "./RmDashboardPrimitives";

export function RmDashboardWidgets({ data, onRequest, onDistribute, onPayout }: { data: RmDashboardOverviewData; onRequest: () => void; onDistribute: () => void; onPayout: () => void }) {
  const health = data.network_health;
  const commission = data.commission_this_month;
  return <aside className="min-w-0 space-y-5">
    <RmSection title="Network health">
      <dl className="space-y-4 text-sm">{[
        { label: "Active SCs", value: health.active_scs.text, status: health.active_scs.status },
        { label: "Low-stock SCs", value: health.low_stock_scs.text, status: health.low_stock_scs.status },
        { label: "Average activations / SC", value: health.avg_acts_per_sc.formatted, status: health.avg_acts_per_sc.status },
        { label: "Out-of-stock SCs", value: health.out_of_stock_scs.text, status: health.out_of_stock_scs.status },
      ].map((item) => <div key={item.label} className="space-y-1"><dt style={{ color: colors.textSecondary }}>{item.label}</dt><dd className="flex flex-wrap items-center justify-between gap-2"><strong>{item.value}</strong><RmStatus value={item.status} /></dd></div>)}</dl>
      <p className="text-sm">Bonus hit rate · {health.bonus_hit_rate.text}</p>
      <Progress percent={Math.min(100, Math.max(0, health.bonus_hit_rate.percentage))} strokeColor={colors.success} />
    </RmSection>
    <RmSection title="Commission this month" description={commission.commission_rate_text} actions={[{ key: "payout", label: "Request payout", disabled: !data.primary_cards.my_commission.can_request_payout, onClick: onPayout }]}>
      <dl className="space-y-3 text-sm">{[["Network activations", commission.network_activations], ["Total earned", commission.total_earned_formatted], ["Pending payout", commission.pending_payout_formatted]].map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt>{label}</dt><dd className="font-semibold">{value}</dd></div>)}</dl>
    </RmSection>
    <RmSection title="SIM inventory" description={data.sim_inventory.total_available_label} actions={[
      { key: "distribute", label: "Distribute stock", onClick: onDistribute },
      { key: "request", label: "Request from Admin", variant: "outline", onClick: onRequest },
    ]}>
      <p className="text-sm">{data.sim_inventory.subtext}</p>
      {/* Commented out: A detailed RM inventory endpoint is not included in the dashboard API. */}
    </RmSection>
    {/* Commented out: Regional report/export and forecast endpoints are not supplied. */}
  </aside>;
}
