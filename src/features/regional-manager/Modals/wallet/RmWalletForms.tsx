import { useState } from "react";
import { Checkbox } from "antd";
import { CheckCircle2, Landmark, Pencil, RefreshCcw, XCircle } from "lucide-react";
import { BankAccountFields, type BankAccountDetails } from "@/features/bank-account";
import { useRequestRmPayout, useSaveRmPayoutAccount } from "../../api/wallet";
import type { RmPayoutAccountData } from "../../types/wallet";
import { RmBadge, RmFlowModal, RmLabel, RmNote, RmPinInput, RmProcessingModal, RmReceipt, RmResultModal } from "../flow/RmFlow";
import { rmFlow } from "../flow/rmFlowTokens";

const naira = (value: number, decimals = 0) => `₦${value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: 2 })}`;
const bankLine = (account: RmPayoutAccountData) => `${account.bank_name} ${account.account_number_masked}`;

function BankRow({ account, onChange, disabled }: { account: RmPayoutAccountData; onChange?: () => void; disabled?: boolean }) {
  return <div className="flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: rmFlow.border }}>
    <span className="flex size-9 items-center justify-center rounded-lg" style={{ background: rmFlow.base, color: rmFlow.navy }}><Landmark className="size-4" /></span>
    <div className="min-w-0 flex-1"><strong className="block truncate text-sm">{account.bank_name} · {account.account_number_masked}</strong><span className="text-xs" style={{ color: rmFlow.muted }}>{account.account_name} · {account.is_verified ? "Verified ✓" : "Pending verification"}</span></div>
    {onChange && <button type="button" disabled={disabled} onClick={onChange} className="inline-flex items-center gap-1 text-xs font-semibold disabled:opacity-50" style={{ color: rmFlow.navy }}>Change <Pencil className="size-3" /></button>}
  </div>;
}

interface PayoutReceipt { reference?: string; amount?: number; amount_formatted?: string; status?: string; destination_account?: { bank_name?: string; account_number_masked?: string } }
export function RmWalletPayoutModal({ balance, account, onClose, onBank, onTransactions }: { balance: number; account: RmPayoutAccountData; onClose: () => void; onBank: () => void; onTransactions?: () => void }) {
  const mutation = useRequestRmPayout();
  const [amount, setAmount] = useState(balance);
  const [pin, setPin] = useState("");
  const [failure, setFailure] = useState<string>();
  const exceeds = amount > balance; const positive = amount > 0;
  const valid = positive && !exceeds && /^\d{4}$/.test(pin) && account.is_verified;
  // PIN errors stay on the form; any other API error shows the "Payout Failed" state (the wallet is never debited on error).
  const pinError = mutation.error && /pin/i.test(mutation.error.message) ? mutation.error.message : undefined;
  const submit = () => { setFailure(undefined); mutation.mutate({ amount, pin }, { onError: error => { setPin(""); if (!/pin/i.test(error.message)) setFailure(error.message); } }); };

  if (mutation.isPending) return <RmProcessingModal icon={RefreshCcw} title="Processing Request..." subtitle={`${naira(amount)} · ${bankLine(account)}`} />;
  if (failure) return <RmResultModal status="failed" title="Payout Failed" subtitle="Your wallet was not debited." onClose={onClose}
    actions={[{ label: "Update Bank", color: rmFlow.navy, onClick: onBank }, { label: "Try Again", variant: "secondary", onClick: () => { setFailure(undefined); mutation.reset(); } }, { label: "Cancel", variant: "text", onClick: onClose }]}>
    <RmReceipt rows={[["Attempted", naira(amount)], ["Status", <span style={{ color: rmFlow.red }}>Failed</span>]]} />
    <RmNote tone="warning">Reason: {failure}</RmNote>
  </RmResultModal>;
  if (mutation.isSuccess) {
    const receipt = (mutation.data.data ?? {}) as PayoutReceipt;
    const status = receipt.status ?? "pending";
    const approval = /approval|review/i.test(status) || (/pending/i.test(status) && /approval/i.test(mutation.data.message));
    const bank = receipt.destination_account ? `${receipt.destination_account.bank_name ?? ""} ${receipt.destination_account.account_number_masked ?? ""}`.trim() : bankLine(account);
    return <RmResultModal status={approval ? "pending" : "success"} iconColor={approval ? undefined : rmFlow.green} title={approval ? "Pending Admin Approval" : "Payout Requested!"} subtitle={mutation.data.message} onClose={onClose}
      actions={[{ label: "Done", color: rmFlow.navy, onClick: onClose }, ...(onTransactions ? [{ label: "View Transactions", variant: "text" as const, onClick: () => { onClose(); onTransactions(); } }] : [])]}>
      <RmReceipt heading="Payout receipt" rows={[["Amount", <span style={{ color: approval ? rmFlow.amber : rmFlow.green }}>{receipt.amount_formatted ?? naira(amount)}</span>], ["Bank", bank], ["Status", <RmBadge tone={approval ? "warning" : "info"}>{status[0].toUpperCase() + status.slice(1)}</RmBadge>], ["Ref", receipt.reference ?? "—"]]} />
    </RmResultModal>;
  }

  const chips = [50000, 100000, 150000].filter(value => value < balance);
  return <RmFlowModal title="Request Payout" subtitle="Withdraw your commission earnings" onClose={onClose}
    secondary={{ label: "Cancel", onClick: onClose }} primary={{ label: `Request ${naira(positive ? amount : 0)}`, color: rmFlow.amber, disabled: !valid, onClick: submit }}>
    <div className="rounded-xl p-4" style={{ background: rmFlow.greenBg }}><p className="text-[10px] font-semibold uppercase" style={{ color: rmFlow.muted }}>Available to withdraw</p><p className="text-2xl font-bold" style={{ color: rmFlow.green }}>{naira(balance, 2)}</p><p className="text-xs" style={{ color: rmFlow.muted }}>Network commission</p></div>
    <BankRow account={account} onChange={onBank} />
    <div className="space-y-2"><RmLabel>Withdrawal amount</RmLabel>
      <div className="flex items-center gap-2 rounded-xl border px-4 py-3" style={{ borderColor: exceeds ? rmFlow.red : rmFlow.border }}><span className="text-2xl" style={{ color: rmFlow.muted }}>₦</span>
        <input aria-label="Withdrawal amount" inputMode="numeric" value={amount ? amount.toLocaleString() : ""} onChange={event => setAmount(Number(event.target.value.replace(/\D/g, "")) || 0)} placeholder="0" className="min-w-0 flex-1 bg-transparent text-3xl font-bold outline-none" style={{ color: rmFlow.ink }} /></div>
      <div className="flex flex-wrap gap-2">{[...chips.map(value => ({ value, label: naira(value) })), { value: balance, label: `${naira(balance)} (Full)` }].map(chip => { const active = chip.value === amount;
        return <button key={chip.label} type="button" onClick={() => setAmount(chip.value)} className="rounded-lg border px-3 py-1.5 text-xs font-semibold" style={{ background: active ? rmFlow.navy : rmFlow.white, color: active ? "#fff" : rmFlow.ink, borderColor: active ? rmFlow.navy : rmFlow.border }}>{chip.label}</button>; })}</div>
      {exceeds ? <RmNote tone="danger" icon={XCircle}>Amount exceeds your available balance of {naira(balance)}</RmNote> : positive ? <RmNote tone="success" icon={CheckCircle2}>Valid amount</RmNote> : null}
      {positive && !exceeds && <p className="text-xs" style={{ color: rmFlow.muted }}>Wallet after withdrawal: {naira(balance - amount)}</p>}
    </div>
    {/* Minimum-withdrawal, approval-threshold and processing-time notices from the design are not shown: the API does not publish these rules. */}
    <RmPinInput value={pin} onChange={setPin} error={pinError} />
  </RmFlowModal>;
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
