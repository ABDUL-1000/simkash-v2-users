import { useEffect, useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { useGetPartnerPayoutAccount, useSetPartnerPayoutAccount } from "../api";

type Account = { bank_name: string; bank_code: string; account_number: string; account_name: string };
const empty: Account = { bank_name: "", bank_code: "", account_number: "", account_name: "" };
export function PayoutAccountModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { payoutAccount, isLoading } = useGetPartnerPayoutAccount();
  const [form, setForm] = useState<Account>(empty);
  const save = useSetPartnerPayoutAccount();
  useEffect(() => { if (payoutAccount) setForm(payoutAccount); }, [payoutAccount]);
  const update = (key: keyof Account, value: string) => setForm((previous) => ({ ...previous, [key]: value }));
  const submit = async () => { try { await save.mutateAsync(form); onOpenChange(false); } catch { /* Hook displays the API error notification. */ } };
  return <AppModal open={open} onOpenChange={onOpenChange} title="Payout Account" description="Manage the bank account for your payouts" size="sm" footer={null}><div className="space-y-3">{isLoading && <p className="text-xs" style={{ color: colors.textSecondary }}>Loading saved account…</p>}{([["bank_name", "Bank name"], ["bank_code", "Bank code"], ["account_number", "Account number"], ["account_name", "Account name"]] as const).map(([key, label]) => <label key={key} className="block space-y-1 text-xs font-semibold" style={{ color: colors.textPrimary }}>{label}<input value={form[key]} onChange={(event) => update(key, event.target.value)} className="w-full rounded-xl border p-3 text-sm" style={{ borderColor: colors.border }} /></label>)}<button type="button" onClick={submit} disabled={save.isPending || Object.values(form).some((value) => !value)} className="w-full rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50" style={{ background: colors.primary }}>{save.isPending ? "Saving…" : "Save Payout Account"}</button></div></AppModal>;
}
