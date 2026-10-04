import type { RmCoordinatorDetailData } from "../../types/api";
import { RmMetric, RmSection } from "./RmDashboardPrimitives";
import { colors } from "@/constants/colors";

export function RmCoordinatorDetails({ data }: { data: RmCoordinatorDetailData }) {
  const summary = data.summary_bar;
  return <>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <RmMetric label="Stock" value={summary.stock.label} subtitle={summary.stock.sublabel} />
      <RmMetric label="APs managed" value={summary.aps_managed.label} subtitle={summary.aps_managed.sublabel} />
      <RmMetric label="Activations" value={summary.activations.label} subtitle={summary.activations.sublabel} />
      <RmMetric label="Bonus" value={summary.bonus.status} subtitle={summary.bonus.target_tier} />
      <RmMetric label="Last active" value={summary.last_active.time_ago} subtitle={summary.last_active.location} />
    </div>
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <RmSection title="Coordinator information"><dl className="space-y-3 text-sm">{Object.entries(data.sc_information).map(([label, value]) => <div key={label} className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-3"><dt className="capitalize" style={{ color: colors.textSecondary }}>{label.replaceAll("_", " ")}</dt><dd className="break-words sm:text-right">{value}</dd></div>)}</dl></RmSection>
      <RmSection title="SIM stock" description={data.sim_stock.total_label}><p>{data.sim_stock.received_from_you_text}</p><p className="text-sm">{data.sim_stock.last_distribution_text}</p>
        {/* Commented out: SIM-type counts/progress bars are absent from the supplied detail response. */}
      </RmSection>
      <RmSection title="Performance"><div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><RmMetric label="Activations" value={data.performance.activations} /><RmMetric label="Network APs" value={data.performance.network_aps} /><RmMetric label="Average / AP" value={data.performance.avg_per_ap} /><RmMetric label="Commission" value={data.performance.commission_formatted} /></div>
        {/* Commented out: Daily histogram and month-comparison data are absent from the detail API. */}
      </RmSection>
      <RmSection title="Bonus status" description={data.bonus_status.headline}><p>{data.bonus_status.detail}</p><p className="font-semibold" style={{ color: colors.success }}>{data.bonus_status.bonus_tag}</p><p className="text-sm">{data.bonus_status.subtext}</p></RmSection>
      <RmSection title="Network commission" description={data.network_commission.sc_network_acts_text}><dl className="space-y-3 text-sm"><div className="flex justify-between gap-3"><dt>SC commission pool</dt><dd>{data.network_commission.commission_pool_formatted}</dd></div><div className="flex justify-between gap-3"><dt>RM share</dt><dd>{data.network_commission.rm_share_formatted}</dd></div></dl><p className="text-sm">{data.network_commission.rm_share_rate}</p></RmSection>
      {/* Commented out: No account-timeline data or endpoint is supplied. */}
    </div>
  </>;
}
