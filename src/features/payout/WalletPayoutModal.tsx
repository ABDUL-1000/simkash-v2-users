import { useState } from "react";
import { Popconfirm } from "antd";
import { CheckCircle2, Clock, Landmark, Loader2, Plus, RefreshCw, Trash2, XCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useGetUserProfile } from "@/features/settings/api/useGetUserProfile";
import { useMainWalletBalance } from "@/features/wallet/api/useMainWalletBalance";
import { PAYOUT_FEE, payoutState, useDeleteBankAccount, usePayoutStatus, useRequestWalletPayout, type WalletPayoutResult } from "./api";

const naira = (value: number) => `₦${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const mask = (accountNumber: string) => `****${accountNumber.slice(-4)}`;

interface WalletPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Opens the role's form for adding a payout bank account. */
  onAddAccount?: () => void;
}

/**
 * Request Payout for every agent (AP, SC, RM, Corporate Agent, Enterprise):
 * POST /user/wallet/request-payout from the main wallet to a saved bank account, then tracks the OPay status.
 */
export function WalletPayoutModal({ open, onOpenChange, onAddAccount }: WalletPayoutModalProps) {
  const [result, setResult] = useState<WalletPayoutResult | null>(null);
  const close = () => { setResult(null); onOpenChange(false); };
  return (
    <AppModal open={open} onOpenChange={(value) => { if (!value) close(); }} title={result ? "Payout Status" : "Request Payout"}
      description={result ? undefined : "Withdraw from your wallet balance to your bank account"} size="md" footer={null}>
      {open && (result ? <PayoutStatusView result={result} onClose={close} /> : <PayoutForm onDone={setResult} onCancel={close} onAddAccount={onAddAccount} />)}
    </AppModal>
  );
}

function PayoutForm({ onDone, onCancel, onAddAccount }: { onDone: (result: WalletPayoutResult) => void; onCancel: () => void; onAddAccount?: () => void }) {
  const { balance, isLoading: loadingBalance } = useMainWalletBalance();
  // Saved accounts come with /user/profile; refetch on open so accounts added elsewhere show up.
  const profile = useGetUserProfile({ refetchOnMount: "always" });
  const accounts = profile.bankAccounts;
  const remove = useDeleteBankAccount();
  const payout = useRequestWalletPayout();
  const [chosenId, setChosenId] = useState<number>();
  const [amountText, setAmountText] = useState("");
  const [narration, setNarration] = useState("");
  const [pin, setPin] = useState("");

  const selected = accounts.find((account) => account.id === chosenId) ?? accounts.find((account) => account.is_default) ?? accounts[0];
  const amount = Number(amountText) || 0;
  const totalDebit = amount > 0 ? amount + PAYOUT_FEE : 0;
  const maxAmount = Math.max(0, balance - PAYOUT_FEE);
  const tooMuch = totalDebit > balance;
  const canSubmit = Boolean(selected) && amount > 0 && !tooMuch && pin.length === 4 && !payout.isPending;
  const chips = [5000, 10000, 50000].filter((value) => value < maxAmount);

  const submit = () => {
    if (!selected || !canSubmit) return;
    payout.mutate({ amount, bank_account_id: selected.id, pin, narration: narration.trim() || "Withdrawal" }, {
      onSuccess: onDone,
      onError: () => setPin(""),
    });
  };

  return (
    <div className="space-y-4 pt-1 text-xs">
      {/* Wallet balance */}
      <div className="rounded-2xl border border-[#10B981]/20 bg-[#EBFFF8] p-4">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#10B981]">Wallet balance</span>
        <p className="text-2xl font-black text-[#10B981] sm:text-3xl">{loadingBalance ? "…" : naira(balance)}</p>
        <p className="text-[11px] text-[#66738C]">A ₦{PAYOUT_FEE} transfer charge is added to each payout.</p>
      </div>

      {/* Destination account */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">Send to</span>
          {onAddAccount && accounts.length > 0 && <button type="button" onClick={onAddAccount} className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2563EB] hover:underline"><Plus className="size-3" />Add account</button>}
        </div>
        {profile.isPending ? <div className="h-16 animate-pulse rounded-xl bg-slate-100" />
          : profile.isError ? <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-[#EF4444]">{profile.error.message} <button type="button" onClick={() => void profile.refetch()} className="font-bold underline">Retry</button></div>
          : accounts.length === 0 ? <AppEmptyState icon={<Landmark className="size-5" />} title="No saved bank account" description="Add a bank account to receive your payout." actionText={onAddAccount ? "Add Bank Account" : undefined} onAction={onAddAccount} />
          : <div className="space-y-2">
            {accounts.map((account) => {
              const active = selected?.id === account.id;
              return (
                <div key={account.id} className={`flex items-center gap-3 rounded-xl border p-3 transition ${active ? "border-[#2563EB] bg-[#EFF4F8]" : "border-[#E2ECF6] bg-white"}`}>
                  <button type="button" onClick={() => setChosenId(account.id)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                    <span className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${active ? "border-[#2563EB]" : "border-[#CBD5E1]"}`}>{active && <span className="size-2 rounded-full bg-[#2563EB]" />}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-bold text-[#0F152A]">{account.bank_name}{account.is_default && <span className="ml-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold text-blue-800">Default</span>}</span>
                      <span className="block truncate text-[11px] text-[#66738C]">{mask(account.account_number)} · {account.account_name}</span>
                    </span>
                  </button>
                  <Popconfirm title="Remove this bank account?" okText="Remove" okButtonProps={{ danger: true, loading: remove.isPending }} onConfirm={() => remove.mutateAsync(account.id).then(() => { if (chosenId === account.id) setChosenId(undefined); }).catch(() => undefined)}>
                    <button type="button" aria-label={`Remove ${account.bank_name} account`} className="shrink-0 rounded-lg p-1.5 text-[#8C909B] hover:bg-red-50 hover:text-[#EF4444]"><Trash2 className="size-3.5" /></button>
                  </Popconfirm>
                </div>
              );
            })}
          </div>}
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <label htmlFor="wallet-payout-amount" className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">Amount</label>
        <div className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 ${tooMuch ? "border-[#EF4444]" : "border-[#E2ECF6] focus-within:border-[#2563EB]"}`}>
          <span className="text-xl font-bold text-[#8C909B]">₦</span>
          <input id="wallet-payout-amount" inputMode="numeric" value={amountText} placeholder="0" onChange={(event) => setAmountText(event.target.value.replace(/\D/g, ""))} className="w-full bg-transparent text-xl font-black text-[#0F152A] outline-none" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {chips.map((value) => <button key={value} type="button" onClick={() => setAmountText(String(value))} className="rounded-lg border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-1.5 font-bold text-[#0F152A] hover:bg-[#EFF4F8]">₦{value.toLocaleString()}</button>)}
          {maxAmount > 0 && <button type="button" onClick={() => setAmountText(String(Math.floor(maxAmount)))} className="rounded-lg border border-[#2563EB]/30 bg-[#EFF4F8] px-3 py-1.5 font-bold text-[#2563EB]">Max</button>}
        </div>
        {amount > 0 && <p className={`font-semibold ${tooMuch ? "text-[#EF4444]" : "text-[#66738C]"}`}>
          {tooMuch ? `Amount plus the ₦${PAYOUT_FEE} charge exceeds your wallet balance.` : `${naira(totalDebit)} will be debited (₦${PAYOUT_FEE} charge included).`}
        </p>}
      </div>

      {/* Narration */}
      <label className="block space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">Narration (optional)</span>
        <input value={narration} maxLength={60} placeholder="Withdrawal" onChange={(event) => setNarration(event.target.value)} className="w-full rounded-xl border border-[#E2ECF6] px-3 py-2.5 text-sm outline-none focus:border-[#2563EB]" />
      </label>

      {/* PIN */}
      <div className="space-y-2 text-center">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">Enter transaction PIN</span>
        <div className="flex justify-center">
          <InputOTP maxLength={4} value={pin} onChange={setPin} inputMode="numeric">
            <InputOTPGroup className="gap-2.5">{[0, 1, 2, 3].map((index) => <InputOTPSlot key={index} index={index} className="size-11 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-base font-bold" />)}</InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <div className="flex gap-2 border-t border-[#E2ECF6] pt-3">
        <button type="button" onClick={onCancel} disabled={payout.isPending} className="flex-1 rounded-xl border border-[#E2ECF6] py-2.5 font-bold text-[#0F152A] hover:bg-slate-50 disabled:opacity-50">Cancel</button>
        <button type="button" onClick={submit} disabled={!canSubmit} className="flex flex-2 items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-2.5 font-bold text-white hover:bg-blue-700 disabled:opacity-50">
          {payout.isPending ? <><Loader2 className="size-4 animate-spin" />Sending…</> : `Withdraw ${amount > 0 ? naira(amount) : ""}`}
        </button>
      </div>
    </div>
  );
}

function PayoutStatusView({ result, onClose }: { result: WalletPayoutResult; onClose: () => void }) {
  const status = usePayoutStatus(result.reference);
  const state = payoutState(status.data?.status ?? result.status);
  const tone = {
    pending: { icon: <Clock className="size-7" />, ring: "bg-amber-50 text-amber-600 border-amber-200", title: "Payout processing", text: "We're waiting for OPay to confirm the transfer. This usually takes a few minutes." },
    success: { icon: <CheckCircle2 className="size-7" />, ring: "bg-emerald-50 text-emerald-600 border-emerald-200", title: "Payout successful", text: "The money has been sent to your bank account." },
    failed: { icon: <XCircle className="size-7" />, ring: "bg-red-50 text-red-600 border-red-200", title: "Payout failed", text: `OPay could not complete the transfer. ${naira(result.total_debited ?? result.amount + PAYOUT_FEE)} has been refunded to your wallet.` },
  }[state];
  const account = result.bank_account;
  const rows: Array<[string, string]> = [
    ["Amount", naira(result.amount)],
    ["Transfer charge", naira(result.fee ?? PAYOUT_FEE)],
    ["Total debited", naira(result.total_debited ?? result.amount + PAYOUT_FEE)],
    ...(account ? [["To", `${account.bank_name} · ${mask(account.account_number)}`] as [string, string], ["Account name", account.account_name] as [string, string]] : []),
    ["Reference", result.reference],
  ];
  return (
    <div className="space-y-4 py-2 text-center text-xs">
      <div className={`mx-auto flex size-14 items-center justify-center rounded-full border ${tone.ring}`}>{tone.icon}</div>
      <div>
        <h4 className="text-base font-bold text-[#0F152A]">{tone.title}</h4>
        <p className="mx-auto mt-1 max-w-xs text-[#66738C]">{tone.text}</p>
      </div>
      <div className="divide-y divide-[#E2ECF6] rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-left">
        {rows.map(([label, value]) => <div key={label} className="flex justify-between gap-3 px-3 py-2"><span className="text-[#8C909B]">{label}</span><span className="break-all text-right font-semibold text-[#0F152A]">{value}</span></div>)}
      </div>
      {status.isError && <p className="text-[#EF4444]">{status.error.message}</p>}
      <div className="flex gap-2">
        {state === "pending" && <button type="button" onClick={() => void status.refetch()} disabled={status.isFetching} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E2ECF6] py-2.5 font-bold text-[#0F152A] hover:bg-slate-50 disabled:opacity-50">
          <RefreshCw className={`size-3.5 ${status.isFetching ? "animate-spin" : ""}`} />{status.isFetching ? "Checking…" : "Refresh status"}
        </button>}
        <button type="button" onClick={onClose} className="flex-1 rounded-xl bg-[#0F152A] py-2.5 font-bold text-white hover:bg-slate-800">Done</button>
      </div>
    </div>
  );
}
