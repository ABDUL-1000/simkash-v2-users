import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useGetPartnerTransactionDetail, useRetryTransaction } from "../api";

/** GET /partner/wallet/transactions/{id}: core fields plus the SIM / customer / bank / bill blocks the category returns. */
export function PartnerTransactionDetailModal({ id, open, onOpenChange }: { id?: string; open: boolean; onOpenChange: (open: boolean) => void }) {
  const { transaction: tx, isLoading, error, refetch } = useGetPartnerTransactionDetail(id);
  const retry = useRetryTransaction();
  const failed = tx?.status.toLowerCase() === "failed";
  const amountColor = failed ? colors.textSecondary : tx?.flow === "credit" ? colors.success : colors.danger;

  return <AppModal open={open} onOpenChange={onOpenChange} title="Transaction Details" description={tx?.reference} size="sm" footer={null}>
    {isLoading ? <p className="py-8 text-center text-sm" style={{ color: colors.textSecondary }}>Loading transaction…</p>
      : !tx ? <AppEmptyState title="Transaction unavailable" description={error?.message ?? "This transaction could not be found."} actionText={error ? "Retry" : undefined} onAction={error ? () => void refetch() : undefined} />
        : <div className="space-y-3 text-sm">
          <div className="py-2 text-center"><p className="text-2xl font-bold" style={{ color: amountColor }}>{tx.amount_formatted}</p><p className="text-xs" style={{ color: colors.textSecondary }}>{tx.type_label}</p></div>
          <Line label="Reference" value={tx.reference} />
          <Line label="Status" value={tx.status_label} />
          <Line label="Date" value={tx.date_formatted} />
          {tx.sim && <Line label="SIM" value={tx.sim.formatted} />}
          {tx.customer && <Line label="Customer" value={tx.customer.formatted} />}
          {tx.commission_rate && <Line label="Commission rate" value={tx.commission_rate} />}
          {tx.bank && <Line label="Bank" value={`${tx.bank.bank_name} · ${tx.bank.account_number_masked}`} />}
          {tx.provider && <Line label="Provider" value={tx.provider} />}
          {tx.meter_number && <Line label="Meter" value={tx.meter_number} />}
          {tx.customer_name && <Line label="Customer name" value={tx.customer_name} />}
          {tx.token && <Line label="Token" value={tx.token} mono />}
          {tx.wallet_before_formatted && <Line label="Wallet before" value={tx.wallet_before_formatted} />}
          {tx.this_change_formatted && <Line label="This change" value={tx.this_change_formatted} />}
          {tx.wallet_after_formatted && <Line label="Wallet after" value={tx.wallet_after_formatted} />}
          {tx.timeline && tx.timeline.length > 0 && <div className="space-y-1.5 rounded-lg p-3 text-xs" style={{ background: colors.backgrounds.base }}>{tx.timeline.map((step, index) => <div key={`${step.time}-${index}`} className="flex justify-between gap-3"><span style={{ color: colors.textSecondary }}>{step.time}</span><span className="text-right font-medium" style={{ color: /fail/i.test(step.status) ? colors.danger : colors.textPrimary }}>{step.description}</span></div>)}</div>}
          {failed && tx.failure_reason && <div className="rounded-lg p-3 text-xs" style={{ background: `${colors.danger}10`, color: colors.danger }}>{tx.failure_reason}{tx.reassurance_message && <p className="mt-1 font-semibold" style={{ color: colors.success }}>{tx.reassurance_message}</p>}</div>}
          {failed && tx.can_retry && <button type="button" disabled={retry.isPending} onClick={() => retry.mutate(tx.id)} className="w-full rounded-lg py-2.5 font-semibold text-white disabled:opacity-50" style={{ background: colors.primary }}>{retry.isPending ? "Retrying…" : "Retry Transaction"}</button>}
        </div>}
  </AppModal>;
}
function Line({ label, value, mono }: { label: string; value: string; mono?: boolean }) { return <div className="flex justify-between gap-4 border-b py-2" style={{ borderColor: colors.border }}><span style={{ color: colors.textSecondary }}>{label}</span><span className={`text-right font-semibold ${mono ? "font-mono" : ""}`} style={{ color: colors.textPrimary }}>{value}</span></div>; }
