import { useState } from "react";
import { Checkbox } from "antd";
import { Landmark, Loader2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { BankAccountFields, type BankAccountDetails } from "@/features/bank-account";
import { usePayoutAccountEndpoint, useSavePayoutAccount } from "../api/usePayoutAccountSetup";
import type { BankAccountItem } from "../types/api";

interface ChangeBankAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAccount?: BankAccountItem;
}

/** Add or change the payout bank account. The account name is verified with the bank before it can be saved. */
export function ChangeBankAccountModal({ open, onOpenChange, currentAccount }: ChangeBankAccountModalProps) {
  const endpoint = usePayoutAccountEndpoint();
  const save = useSavePayoutAccount();
  const [details, setDetails] = useState<BankAccountDetails>();
  const [isDefault, setIsDefault] = useState(true);
  const unchanged = Boolean(details && currentAccount && details.bank_code === currentAccount.bank_code && details.account_number === currentAccount.account_number);

  const close = () => { if (save.isPending) return; save.reset(); setDetails(undefined); onOpenChange(false); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details || unchanged) return;
    save.mutate({ details, isDefault }, { onSuccess: close });
  };

  return <AppModal open={open} onOpenChange={(v) => { if (!v) close(); }} title={currentAccount ? "Change Bank Account" : "Add Bank Account"}
    description="Where your commission payouts and withdrawals are sent" size="md" showCloseButton={!save.isPending}>
    {/* Only mounted while open, so the form starts empty each time. */}
    {open && <form onSubmit={submit} className="space-y-4 pt-1">
      {currentAccount && <div className="space-y-1.5">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Current account</span>
        <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]"><Landmark className="size-4" /></span>
          <div className="min-w-0 text-xs">
            <p className="truncate font-extrabold text-[#0F152A]">{currentAccount.bank_name} · ****{currentAccount.account_number.slice(-4)}</p>
            <p className="truncate text-[#66738C]">{currentAccount.account_name}</p>
          </div>
        </div>
      </div>}

      {endpoint ? <>
        <BankAccountFields onChange={setDetails} disabled={save.isPending} />
        {unchanged && <p className="text-xs text-[#66738C]">This is already your payout account.</p>}
        {endpoint.supportsDefault && <Checkbox checked={isDefault} disabled={save.isPending} onChange={(e) => setIsDefault(e.target.checked)}>
          <span className="text-xs font-semibold text-[#0F152A]">Use as my default payout account</span>
        </Checkbox>}
        {currentAccount && <p className="rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] p-3 text-[11px] font-bold text-[#D9990D]">
          Changes take effect immediately. Your previous account will stop receiving payouts.
        </p>}
      </> : <p className="rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] p-3 text-[11px] font-bold text-[#D9990D]">
        Bank account setup isn't available for your account type yet. Please contact support to link a bank account.
      </p>}

      <div className="flex flex-col-reverse gap-2 border-t border-[#E2ECF6] pt-4 sm:flex-row sm:justify-end">
        <button type="button" onClick={close} disabled={save.isPending} className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 disabled:opacity-50">Cancel</button>
        {endpoint && <button type="submit" disabled={save.isPending || !details || unchanged} className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">
          {save.isPending && <Loader2 className="size-4 animate-spin" />} {save.isPending ? "Saving…" : "Save Account"}
        </button>}
      </div>
    </form>}
  </AppModal>;
}
