import { useState } from "react";
import { Landmark } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { BankAccountFields, type BankAccountDetails } from "@/features/bank-account";
import { useGetCaPayoutAccount, useSaveCaPayoutAccount } from "../api";

/** GET/POST /wallet/payout-account, with the shared bank list + account-name verification. */
export function CaPayoutAccountModal({ onClose }: { onClose: () => void }) {
  const account = useGetCaPayoutAccount();
  const save = useSaveCaPayoutAccount();
  const [details, setDetails] = useState<BankAccountDetails>();
  const current = account.data?.default_account;
  const others = (account.data?.accounts ?? []).filter((item) => item.id !== current?.id);
  const unchanged = Boolean(details && current && details.bank_code === current.bank_code && details.account_number === current.account_number);
  const submit = async () => {
    if (!details) return;
    try {
      await save.mutateAsync({ bank_name: details.bank_name, bank_code: details.bank_code, account_number: details.account_number, account_name: details.account_name });
      onClose();
    } catch { /* The hook shows the API error. */ }
  };
  return <AppModal open onOpenChange={(value) => { if (!value && !save.isPending) onClose(); }} title="Payout Account" description="Manage the bank account for your payouts" size="sm" footer={null}>
    <div className="space-y-4">
      {account.isLoading ? <p className="text-xs" style={{ color: colors.textSecondary }}>Loading saved account…</p>
        : current && <div className="space-y-1.5"><p className="text-[11px] font-semibold uppercase" style={{ color: colors.texts.muted }}>Current account</p>
          <div className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: colors.border }}><Landmark className="size-5" style={{ color: colors.blues.primary }} /><div className="min-w-0"><strong className="block truncate text-sm">{current.bank_name} · ****{current.account_number.slice(-4)}</strong><span className="text-xs" style={{ color: colors.textSecondary }}>{current.account_name}</span></div></div>
          {others.map((item) => <p key={item.id} className="text-[11px]" style={{ color: colors.textSecondary }}>Also on file: {item.bank_name} · ****{item.account_number.slice(-4)}</p>)}
        </div>}
      <BankAccountFields onChange={setDetails} disabled={save.isPending} />
      {unchanged && <p className="text-xs" style={{ color: colors.textSecondary }}>This is already your payout account.</p>}
      <button type="button" onClick={submit} disabled={save.isPending || !details || unchanged} className="w-full rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: colors.primary }}>{save.isPending ? "Saving…" : "Save Payout Account"}</button>
    </div>
  </AppModal>;
}
