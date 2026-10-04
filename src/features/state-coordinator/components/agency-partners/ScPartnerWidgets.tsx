import { Button } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { ScAgencyPartnersOverviewData } from "../../types/agents";
import type { ScPartnerTarget } from "../../types/operations";
import { ScMetric, ScSection } from "../ScSection";
import { ScStatusTag } from "../ScStatusTag";

export function ScApOverviewCards({ data }: { data: ScAgencyPartnersOverviewData }) {
  return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">{Object.entries(data.cards).map(([key, metric]) => <ScMetric key={key} label={metric.label} value={metric.count} subtext={metric.subtitle} />)}</div>;
}

export function ScPartnerWidgets({ data, onDistribute, onDistributeAll, onBulkRemind }: {
  data: ScAgencyPartnersOverviewData; onDistribute: (target: ScPartnerTarget) => void; onDistributeAll: () => void; onBulkRemind: () => void;
}) {
  return <aside className="min-w-0 space-y-4">
    <ScSection title="Network summary"><dl className="space-y-2 text-sm">{Object.entries(data.network_summary).map(([label, count]) => <div key={label} className="flex justify-between gap-3"><dt className="capitalize">{label.replaceAll("_", " ")}</dt><dd className="font-semibold">{count}</dd></div>)}</dl></ScSection>
    <ScSection title="APs needing stock" actions={[{ key: "all", label: "Distribute to all low", disabled: !data.aps_needing_stock.can_distribute_all, onClick: onDistributeAll }]}>
      {data.aps_needing_stock.items.length ? <ul className="space-y-4">{data.aps_needing_stock.items.map((partner) => <li key={partner.id} className="space-y-2">
        <strong>{partner.name}</strong><p className="text-sm">{partner.subtitle}</p><ScStatusTag status={partner.severity} /><Button onClick={() => onDistribute(partner)}>Distribute</Button>
      </li>)}</ul> : <AppEmptyState title="No stock alerts" description="No partners currently need replenishment." />}
    </ScSection>
    <ScSection title="AP bonus status" actions={[{ key: "remind", label: "Remind at-risk APs", disabled: !data.ap_bonus_status.can_remind_at_risk, onClick: onBulkRemind }]}>
      <dl className="space-y-2 text-sm">{Object.entries(data.ap_bonus_status).filter(([key]) => key !== "can_remind_at_risk").map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt className="capitalize">{label.replaceAll("_", " ")}</dt><dd>{String(value)}</dd></div>)}</dl>
    </ScSection>
  </aside>;
}
