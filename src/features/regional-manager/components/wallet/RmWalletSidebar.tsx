import { Button } from "antd";
import { Landmark, Pencil, Info } from "lucide-react";
import { colors } from "@/constants/colors";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetRmRecentPayouts } from "../../api/wallet";
import type { RmPayoutAccountData, RmWalletOverviewData } from "../../types/wallet";
import { RmPanel, RmInfoRows } from "../dashboard/RmDesign";
import { RmQueryState, RmStatus } from "../dashboard/RmDashboardPrimitives";
export function RmWalletSidebar({ data, account, bankLoading, bankError, retryBank, onBank, onHistory }: { data?: RmWalletOverviewData; account?: RmPayoutAccountData | null; bankLoading: boolean; bankError: Error | null; retryBank: () => void; onBank: () => void; onHistory: () => void }) {
  const payouts = useGetRmRecentPayouts({ page: 1, limit: 5 });
  return <aside className="space-y-4">
    <RmPanel title="Payout Account"><RmQueryState loading={bankLoading} error={bankError} retry={retryBank}>{account ? <><div className="flex gap-3 rounded-xl p-4" style={{ background: colors.backgrounds.base }}><Landmark size={20} /><div><strong>{account.bank_name}</strong><p className="mt-1 text-xs" style={{ color: colors.texts.muted }}>{account.account_number_masked} · {account.account_name}</p></div></div><RmStatus value={account.is_verified ? "Verified" : "Pending verification"} /></> : <AppEmptyState title="No payout account" description="Add your bank details to request a payout." />}<Button type="text" icon={<Pencil size={13} />} onClick={onBank} disabled={bankLoading || Boolean(bankError)}>Change Bank Account</Button></RmQueryState></RmPanel>
    <RmPanel title="Recent Payouts"><RmQueryState loading={payouts.isLoading} error={payouts.error} retry={() => void payouts.refetch()}>{payouts.data?.payouts.length ? <div>{payouts.data.payouts.map(payout => <div key={payout.id} className="flex flex-wrap items-center gap-2 border-b py-4 text-xs" style={{ borderColor: colors.border }}><span style={{ color: colors.texts.muted }}>{payout.date_label}</span><strong className="ml-auto">{payout.amount_formatted}</strong><RmStatus value={payout.status_badge || payout.status} /></div>)}</div> : <AppEmptyState title="No payouts yet" description="Payout requests will appear here." />}</RmQueryState>{data && <RmInfoRows rows={[["Total paid out", data.recent_payouts.total_paid_out_formatted]]} />}<Button type="text" onClick={onHistory}>View all payouts →</Button></RmPanel>
    {data && <><RmPanel title="Monthly Earnings"><AppEmptyState title="Monthly breakdown unavailable" description={data.monthly_earnings.best_month_text} />{/* <RmSixMonthEarningsChart /> is commented out: overview supplies best_month_text only, no monthly amounts for chart bars. */}</RmPanel>
      <RmPanel title="How You Earn"><div className="flex gap-2 rounded-xl p-3 text-xs" style={{ background: colors.blues.surfaceLight, color: colors.blues.primary }}><Info size={16} className="shrink-0" /><p>{data.how_you_earn.info}</p></div><RmInfoRows rows={[["SC network acts", data.how_you_earn.sc_network_acts_text], ["Commission rate", data.how_you_earn.commission_rate_text], ["Total earned", <span style={{ color: colors.success }}>{data.how_you_earn.total_earned_formatted}</span>]]} /></RmPanel></>}
  </aside>;
}
