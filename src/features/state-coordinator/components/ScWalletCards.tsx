import { Progress } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import type { ScWalletOverviewData } from "../types/api";
import { ScMetric, ScSection } from "./ScSection";

export function ScWalletCards({ data }: { data: ScWalletOverviewData }) {
  const account = data.payout_account;
  return <>
    <ScSection title="Commission balance" description={data.balance_card.currency}>
      <p className="text-3xl font-bold" style={{ color: colors.primary }}>{data.balance_card.commission_balance_formatted}</p>
      <div className="grid gap-3 sm:grid-cols-3">{Object.entries(data.balance_card.chips).map(([key, chip]) => <ScMetric key={key} label={chip.label} value={chip.formatted} />)}</div>
    </ScSection>
    <div className="grid gap-4 sm:grid-cols-3">{Object.entries(data.stats_cards).map(([key, stat]) => <ScMetric key={key} label={stat.label} value={stat.formatted} subtext={stat.subtext} />)}</div>
    <div className="grid gap-5 lg:grid-cols-2">
      <ScSection title="Payout account">
        {account ? <div className="space-y-2 text-sm"><p className="font-semibold">{account.bank_name}</p><p>{account.account_number_masked}</p><p>{account.account_name}</p>
          <p style={{ color: account.is_verified ? colors.success : colors.warning }}>{account.status}</p></div> : <AppEmptyState title="No payout account" description="Add your bank account to receive payouts." />}
      </ScSection>
      <ScSection title="Recent payouts" description={data.recent_payouts.total_paid_out_formatted}>
        {data.recent_payouts.payouts.length ? <ul className="space-y-3">{data.recent_payouts.payouts.map((payout, index) => <li key={`${payout.date_label}-${index}`} className="flex flex-wrap justify-between gap-2 text-sm">
          <span>{payout.date_label}</span><strong>{payout.amount_formatted}</strong><span>{payout.status_badge}</span>
        </li>)}</ul> : <AppEmptyState title="No payouts yet" />}
        {/* Full payout-history modal omitted: no unambiguous history endpoint was supplied. */}
      </ScSection>
      <ScSection title="Monthly earnings" description={data.monthly_earnings.best_month_text}>
        {data.monthly_earnings.bars.length ? data.monthly_earnings.bars.map((bar) => <div key={bar.month}>
          <div className="flex justify-between text-sm"><span>{bar.month}</span><span>{data.balance_card.currency_symbol}{bar.earnings.toLocaleString()}</span></div>
          <Progress percent={Math.max(0, Math.min(100, bar.percentage))} strokeColor={bar.is_best_month ? colors.success : colors.primary} />
        </div>) : <AppEmptyState title="No earnings yet" />}
      </ScSection>
      <ScSection title="How you earn" description={data.how_you_earn.info}>
        <p className="text-sm" style={{ color: colors.textSecondary }}>{data.how_you_earn.ap_network_acts_text}</p>
        <dl className="space-y-3 text-sm">{[["Commission", data.how_you_earn.commission_formatted], ["Bonus earned", data.how_you_earn.bonus_earned_formatted], ["Total this month", data.how_you_earn.total_this_month_formatted]].map(([label, value]) =>
          <div key={label} className="flex justify-between gap-2"><dt>{label}</dt><dd className="font-semibold">{value}</dd></div>)}
        </dl>
      </ScSection>
    </div>
  </>;
}
