import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { RmPayoutAccountData, RmWalletOverviewData } from "../../types/wallet";
import { RmMetric, RmSection, RmStatus } from "../dashboard/RmDashboardPrimitives";

export function RmWalletCards({ data }: { data: RmWalletOverviewData }) {
  return <>
    <RmSection title="Commission balance" description={data.balance_card.currency}>
      <p className="text-3xl font-bold">{data.balance_card.commission_balance_formatted}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{Object.entries(data.balance_card.chips).map(([key, chip]) => <RmMetric key={key} label={chip.label} value={chip.formatted} />)}</div>
    </RmSection>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{Object.entries(data.stats_cards).map(([key, stat]) => <RmMetric key={key} label={stat.label} value={stat.formatted} subtitle={stat.subtext} />)}</div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <RmSection title="How you earn" description={data.how_you_earn.info}><p>{data.how_you_earn.sc_network_acts_text}</p><p>{data.how_you_earn.commission_rate_text}</p><strong>{data.how_you_earn.total_earned_formatted}</strong></RmSection>
      <RmSection title="Payout and earnings summary" description={data.monthly_earnings.best_month_text}>
        <p>{data.recent_payouts.total_count} payouts · {data.recent_payouts.total_paid_out_formatted} paid out</p>
        {/* Commented out: <RmSixMonthEarningsChart /> — the API supplies best_month_text but no monthly bar data. */}
      </RmSection>
    </div>
  </>;
}
export function RmBankCard({ account }: { account: RmPayoutAccountData | null | undefined }) {
  return <RmSection title="Payout account">{account ? <div className="space-y-2"><strong>{account.bank_name}</strong><p>{account.account_number_masked}</p><p>{account.account_name}</p><RmStatus value={account.is_verified ? "Verified" : "Pending verification"} /></div> : <AppEmptyState title="No payout account" description="Add your bank account before requesting a payout." />}</RmSection>;
}
