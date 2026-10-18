import { useState } from "react";
import { Checkbox } from "antd";
import { Landmark } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { BankAccountFields, type BankAccountDetails } from "@/features/bank-account";
import { useGetPartnerPayoutAccount, useSetPartnerPayoutAccount } from "../api";

export function PayoutAccountModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { payoutAccount, isLoading } = useGetPartnerPayoutAccount();
  const save = useSetPartnerPayoutAccount();
  const [details, setDetails] = useState<BankAccountDetails>();
  const [isDefault, setIsDefault] = useState(true);
  const unchanged = Boolean(details && payoutAccount && details.bank_code === payoutAccount.bank_code && details.account_number === payoutAccount.account_number);
  const close = () => { setDetails(undefined); onOpenChange(false); };
  const submit = async () => {
    if (!details) return;
    try { await save.mutateAsync({ ...details, is_default: isDefault }); close(); } catch { /* Hook displays the API error notification. */ }
  };
  return <AppModal open={open} onOpenChange={value => { if (!value && !save.isPending) close(); }} title="Payout Account" description="Manage the bank account for your payouts" size="sm" footer={null}>
    {open && <div className="space-y-4">
      {isLoading ? <p className="text-xs" style={{ color: colors.textSecondary }}>Loading saved account…</p>
        : payoutAccount?.account_number && <div className="space-y-1.5"><p className="text-[11px] font-semibold uppercase" style={{ color: colors.texts.muted }}>Current account</p>
          <div className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: colors.border }}><Landmark className="size-5" style={{ color: colors.blues.primary }} /><div className="min-w-0"><strong className="block truncate text-sm">{payoutAccount.bank_name} · ****{payoutAccount.account_number.slice(-4)}</strong><span className="text-xs" style={{ color: colors.textSecondary }}>{payoutAccount.account_name}</span></div></div></div>}
      {/* Bank list and account-name verification come from the shared OPay endpoints. */}
      <BankAccountFields onChange={setDetails} disabled={save.isPending} />
      {unchanged && <p className="text-xs" style={{ color: colors.textSecondary }}>This is already your payout account.</p>}
      <Checkbox checked={isDefault} disabled={save.isPending} onChange={event => setIsDefault(event.target.checked)}>Default payout account</Checkbox>
      <button type="button" onClick={submit} disabled={save.isPending || !details || unchanged} className="w-full rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: colors.primary }}>{save.isPending ? "Saving…" : "Save Payout Account"}</button>
    </div>}
  </AppModal>;
}
