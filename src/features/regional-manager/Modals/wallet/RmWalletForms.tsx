import { useState } from "react";
import { Checkbox } from "antd";
import { Landmark, Pencil } from "lucide-react";
import { BankAccountFields, type BankAccountDetails } from "@/features/bank-account";
import { useSaveRmPayoutAccount } from "../../api/wallet";
import type { RmPayoutAccountData } from "../../types/wallet";
import { RmFlowModal, RmLabel, RmNote, RmReceipt, RmResultModal } from "../flow/RmFlow";
import { rmFlow } from "../flow/rmFlowTokens";


function BankRow({ account, onChange, disabled }: { account: RmPayoutAccountData; onChange?: () => void; disabled?: boolean }) {
  return <div className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: rmFlow.border }}>
    <span className="flex size-9 items-center justify-center rounded-lg" style={{ background: rmFlow.base, color: rmFlow.navy }}><Landmark className="size-4" /></span>
    <div className="min-w-0 flex-1"><strong className="block truncate text-sm">{account.bank_name} · {account.account_number_masked}</strong><span className="text-xs" style={{ color: rmFlow.muted }}>{account.account_name} · {account.is_verified ? "Verified ✓" : "Pending verification"}</span></div>
    {onChange && <button type="button" disabled={disabled} onClick={onChange} className="inline-flex items-center gap-1 text-xs font-semibold disabled:opacity-50" style={{ color: rmFlow.navy }}>Change <Pencil className="size-3" /></button>}
  </div>;
}


export function RmPayoutAccountModal({ account, onClose }: { account?: RmPayoutAccountData | null; onClose: () => void }) {
  const mutation = useSaveRmPayoutAccount();
  const [details, setDetails] = useState<BankAccountDetails>();
  const [isDefault, setIsDefault] = useState(account?.is_default ?? true);
  const unchanged = Boolean(details && account && details.bank_code === account.bank_code && details.account_number === account.account_number);
  if (mutation.isSuccess) {
    const saved = (mutation.data.data ?? {}) as Partial<RmPayoutAccountData>;
    return <RmResultModal iconColor={rmFlow.green} title="Bank Account Updated!" subtitle={mutation.data.message} onClose={onClose} actions={[{ label: "Done", color: rmFlow.navy, onClick: onClose }]}>
      <RmReceipt rows={[["Bank", saved.bank_name ?? "—"], ["Account", saved.account_number_masked ?? "—"], ["Account name", saved.account_name ?? "—"]]} />
    </RmResultModal>;
  }
  return <RmFlowModal title="Change Bank Account" subtitle="Update your payout account" onClose={onClose} pending={mutation.isPending}
    secondary={{ label: "Cancel", onClick: onClose, disabled: mutation.isPending }} primary={{ label: "Save New Account", loading: mutation.isPending, disabled: !details || unchanged, onClick: () => details && mutation.mutate({ ...details, is_default: isDefault }) }}>
    {account && <><RmLabel>Current account</RmLabel><BankRow account={account} /></>}
    {mutation.error && <RmNote tone="danger">{mutation.error.message}</RmNote>}
    {/* Bank list and account-name verification come from the shared OPay endpoints; the name can't be typed by hand. */}
    <BankAccountFields onChange={setDetails} disabled={mutation.isPending} />
    {unchanged && <RmNote tone="neutral">This is already your payout account.</RmNote>}
    <Checkbox checked={isDefault} disabled={mutation.isPending} onChange={event => setIsDefault(event.target.checked)}>Default payout account</Checkbox>
  </RmFlowModal>;
}
