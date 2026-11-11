import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pagination, Select } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useGetBanks } from "@/features/bank-account/api";
import {
  useDownloadStatement, useInstallerPayouts, useInstallerTransactions, useInstallerWallet, useRefreshPayout,
  useRequestInstallerPayout, useSavePayoutAccount, type PayoutAccount,
} from "../api";
import { Card, Change, Kpi, QueryState } from "../ui";
import { dateText, naira } from "../format";

const TYPES = [["all", "All"], ["job_payment", "Job payments"], ["payout", "Payouts"], ["fee", "Fees"]] as const;

/** Installer wallet — GET /installer/wallet, transactions, CSV statement, payout account, payouts. */
export default function InstallerWalletPage() {
  const [params, setParams] = useSearchParams();
  const wallet = useInstallerWallet();
  const [type, setType] = useState<string>("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [txPage, setTxPage] = useState(1);
  const [payoutPage, setPayoutPage] = useState(1);
  const tx = useInstallerTransactions({ type, from: from || undefined, to: to || undefined, page: txPage, limit: 15 });
  const payouts = useInstallerPayouts({ page: payoutPage, limit: 10 });
  const statement = useDownloadStatement();
  const refresh = useRefreshPayout();
  const [accountOpen, setAccountOpen] = useState(false);
  const withdrawOpen = params.get("payout") === "1";
  const setWithdrawOpen = (open: boolean) => setParams(open ? { payout: "1" } : {}, { replace: true });
  const w = wallet.data;
  const maxMonth = Math.max(1, ...(w?.monthlyEarnings ?? []).map((m) => m.amount));
  const rows = tx.data?.transactions ?? tx.data?.items ?? [];

  return <div className="space-y-5 pb-12">
    <PageHeader title="Earnings & Payout" description="Job pay lands in your wallet after verification" actions={[
      { key: "account", label: w?.payoutAccount ? "Change payout account" : "Add payout account", variant: "outline", onClick: () => setAccountOpen(true) },
      { key: "withdraw", label: "Withdraw", disabled: !w || w.withdrawable < (w.rules?.minPayout ?? 1000), onClick: () => setWithdrawOpen(true) },
    ]} />
    <QueryState loading={wallet.isLoading} error={wallet.error} retry={() => void wallet.refetch()} empty={!w}>
      {w && <>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi label="Available balance" value={naira(w.availableBalance)} hint={`${naira(w.withdrawable)} withdrawable`} />
          <Kpi label="Pending verification" value={naira(w.pendingVerification?.amount)} hint={w.pendingVerification?.note ?? `${w.pendingVerification?.jobs ?? 0} jobs`} tone="text-[#7C3AED]" />
          <Kpi label="This month" value={naira(w.thisMonth?.amount)} hint={<Change pct={w.thisMonth?.changePercent} />} tone="text-[#10B981]" />
          <Kpi label="Total earned" value={naira(w.totalEarned)} hint={`${w.jobsPaid} jobs paid${w.bestMonth ? ` · best: ${w.bestMonth.label}` : ""}`} />
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <Card title="Monthly earnings" className="lg:col-span-2">
            <div className="flex h-32 items-end gap-2">{w.monthlyEarnings.map((m) => <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full rounded-t-md bg-[#10B981]" style={{ height: `${Math.max(4, (m.amount / maxMonth) * 96)}px` }} title={naira(m.amount)} /><span className="text-[10px] text-[#8C909B]">{m.label}</span>
            </div>)}</div>
          </Card>
          <Card title="Payout account" action={<button type="button" onClick={() => setAccountOpen(true)} className="text-xs font-bold text-[#2563EB]">{w.payoutAccount ? "Change" : "Add"}</button>}>
            {w.payoutAccount ? <div className="text-xs"><p className="font-bold text-[#0F152A]">{w.payoutAccount.accountName}</p><p className="text-[#66738C]">{w.payoutAccount.bankName} · {w.payoutAccount.accountNumberMasked}</p></div> : <p className="text-xs text-[#D9990D]">Add a bank account to withdraw.</p>}
            <div className="space-y-1 border-t border-[#E2ECF6] pt-2 text-[11px] text-[#66738C]">
              <p>Paid out {naira(w.payouts?.totalPaidOut)} ({w.payouts?.count ?? 0}) · fees {naira(w.payouts?.feesPaid)}</p>
              {w.payouts?.pendingCount ? <p className="text-[#D9990D]">{w.payouts.pendingCount} pending · {naira(w.payouts.pendingAmount)}</p> : null}
              <p>Minimum {naira(w.rules?.minPayout)} · ₦{w.rules?.transferFee ?? 20} transfer fee</p>
            </div>
          </Card>
        </div>
      </>}
    </QueryState>

    <Card title="Transactions" action={<div className="flex flex-wrap gap-2">
      <input type="date" value={from} onChange={(e) => { setFrom(e.target.value); setTxPage(1); }} className="rounded-lg border border-[#E2ECF6] px-2 py-1 text-xs" />
      <input type="date" value={to} onChange={(e) => { setTo(e.target.value); setTxPage(1); }} className="rounded-lg border border-[#E2ECF6] px-2 py-1 text-xs" />
      <button type="button" disabled={statement.isPending} onClick={() => statement.mutate({ from: from || undefined, to: to || undefined, type: type === "all" ? undefined : type })} className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#2563EB]">{statement.isPending ? "Downloading…" : "Statement (CSV)"}</button>
    </div>}>
      <div className="flex gap-1.5 overflow-x-auto">{TYPES.map(([key, label]) => <button key={key} type="button" onClick={() => { setType(key); setTxPage(1); }} className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold ${type === key ? "bg-[#0F152A] text-white" : "border border-[#E2ECF6] text-[#66738C]"}`}>{label}</button>)}</div>
      <QueryState loading={tx.isLoading} error={tx.error} retry={() => void tx.refetch()} empty={!rows.length} emptyTitle="No transactions">
        <div className="divide-y divide-[#E2ECF6]">{rows.map((row) => <div key={row.id} className="flex items-center justify-between gap-3 py-2.5 text-xs">
          <div className="min-w-0"><p className="truncate font-semibold text-[#0F152A]">{row.description ?? row.kind}</p><p className="text-[10px] text-[#8C909B]">{row.jobNumber ? `${row.jobNumber} · ` : ""}{dateText(row.createdAt, true)} · {row.status}</p></div>
          <div className="shrink-0 text-right"><p className={`font-extrabold ${row.direction === "credit" ? "text-[#10B981]" : "text-[#0F152A]"}`}>{row.direction === "credit" ? "+" : "−"}{naira(Math.abs(row.amount))}</p>{row.balanceAfter != null && <p className="text-[10px] text-[#8C909B]">Bal {naira(row.balanceAfter)}</p>}</div>
        </div>)}</div>
        {(tx.data?.pagination?.totalPages ?? 1) > 1 && <Pagination current={txPage} pageSize={15} total={tx.data?.pagination.total} onChange={setTxPage} showSizeChanger={false} />}
      </QueryState>
    </Card>

    <Card title="Payout history" action={payouts.data?.summary && <span className="text-[11px] text-[#8C909B]">Paid {naira(payouts.data.summary.paidOut)} · pending {naira(payouts.data.summary.pending)}</span>}>
      <QueryState loading={payouts.isLoading} error={payouts.error} retry={() => void payouts.refetch()} empty={!payouts.data?.payouts.length} emptyTitle="No payouts yet">
        <div className="divide-y divide-[#E2ECF6]">{(payouts.data?.payouts ?? []).map((p) => <div key={p.id} className="flex items-center justify-between gap-3 py-2.5 text-xs">
          <div className="min-w-0"><p className="font-semibold text-[#0F152A]">{naira(p.amount)} <span className="font-normal text-[#8C909B]">+ ₦{p.fee} fee</span></p>
            <p className="text-[10px] text-[#8C909B]">{p.bankAccount ? `${p.bankAccount.bankName} ${p.bankAccount.accountNumberMasked} · ` : ""}{dateText(p.requestedAt, true)} · {p.reference}</p>
            {p.failureReason && <p className="text-[10px] text-[#EF4444]">{p.failureReason} (refunded)</p>}</div>
          <div className="flex shrink-0 items-center gap-2"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${/success|paid/i.test(p.status) ? "bg-emerald-50 text-[#10B981]" : /fail/i.test(p.status) ? "bg-red-50 text-[#EF4444]" : "bg-amber-50 text-[#D9990D]"}`}>{p.status}</span>
            {/pending|process/i.test(p.status) && <button type="button" disabled={refresh.isPending} onClick={() => refresh.mutate(p.id)} className="text-[10px] font-bold text-[#2563EB]">Refresh</button>}</div>
        </div>)}</div>
        {(payouts.data?.pagination?.totalPages ?? 1) > 1 && <Pagination current={payoutPage} pageSize={10} total={payouts.data?.pagination.total} onChange={setPayoutPage} showSizeChanger={false} />}
      </QueryState>
    </Card>

    {accountOpen && <PayoutAccountModal onClose={() => setAccountOpen(false)} />}
    {withdrawOpen && w && <WithdrawModal withdrawable={w.withdrawable} min={w.rules?.minPayout ?? 1000} fee={w.rules?.transferFee ?? 20} account={w.payoutAccount} onAddAccount={() => setAccountOpen(true)} onClose={() => setWithdrawOpen(false)} />}
  </div>;
}

/** POST /wallet/payout-account { bankCode, accountNumber, bankName } — the name comes back from OPay. */
function PayoutAccountModal({ onClose }: { onClose: () => void }) {
  const banks = useGetBanks();
  const save = useSavePayoutAccount();
  const [bankCode, setBankCode] = useState<string>();
  const [accountNumber, setAccountNumber] = useState("");
  const [saved, setSaved] = useState<PayoutAccount | null>(null);
  const bank = banks.data?.find((b) => b.code === bankCode);
  return <AppModal open onOpenChange={(v) => !v && onClose()} title="Payout account" size="sm" footer={null}>
    {saved ? <div className="space-y-3 text-center text-xs">
      <p className="text-base font-black text-[#0F152A]">{saved.accountName}</p><p className="text-[#66738C]">{saved.bankName} · {saved.accountNumberMasked}</p>
      <p className="font-semibold text-[#0F152A]">Is this you? This is now your default payout account.</p>
      <div className="flex gap-2"><button type="button" onClick={() => setSaved(null)} className="flex-1 rounded-xl border border-[#E2ECF6] py-2.5 font-bold">No, change it</button><button type="button" onClick={onClose} className="flex-1 rounded-xl bg-[#2563EB] py-2.5 font-bold text-white">Yes, that's me</button></div>
    </div> : <div className="space-y-3 text-xs">
      <Select showSearch size="large" className="w-full" placeholder="Select bank" loading={banks.isLoading} value={bankCode} onChange={setBankCode} optionFilterProp="label" options={(banks.data ?? []).map((b) => ({ value: b.code, label: b.name }))} />
      <input inputMode="numeric" maxLength={10} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))} placeholder="10-digit account number" className="w-full rounded-xl border border-[#E2ECF6] px-3 py-2.5 text-sm outline-none focus:border-[#2563EB]" />
      <button type="button" disabled={!bank || accountNumber.length !== 10 || save.isPending} onClick={() => bank && save.mutate({ bankCode: bank.code, bankName: bank.name, accountNumber }, { onSuccess: setSaved })} className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white disabled:opacity-50">{save.isPending ? "Verifying with OPay…" : "Verify & save"}</button>
    </div>}
  </AppModal>;
}

/** POST /wallet/payouts { amount, pin } — min ₦1,000 + ₦20 fee; 400 messages shown as-is. */
function WithdrawModal({ withdrawable, min, fee, account, onAddAccount, onClose }: { withdrawable: number; min: number; fee: number; account: PayoutAccount | null; onAddAccount: () => void; onClose: () => void }) {
  const payout = useRequestInstallerPayout();
  const [amountText, setAmountText] = useState("");
  const [pin, setPin] = useState("");
  const amount = Number(amountText) || 0;
  const valid = account && amount >= min && amount <= withdrawable && pin.length === 4;
  const result = payout.data;
  return <AppModal open onOpenChange={(v) => !v && onClose()} title={result ? "Withdrawal" : "Withdraw to bank"} size="sm" footer={null}>
    {result ? <div className="space-y-2 text-center text-xs">
      <p className="text-2xl font-black text-[#0F152A]">{naira(result.amount)}</p>
      <p className={result.status === "success" ? "font-bold text-[#10B981]" : "font-bold text-[#D9990D]"}>{result.status === "success" ? "Sent to your bank" : "Processing with OPay — check payout history"}</p>
      <p className="text-[#66738C]">Total debited {naira(result.totalDebited)} · balance {naira(result.balanceAfter)} · {result.reference}</p>
      <button type="button" onClick={onClose} className="w-full rounded-xl bg-[#0F152A] py-2.5 font-bold text-white">Done</button>
    </div> : <div className="space-y-3 text-xs">
      <div className="rounded-xl bg-[#EBFFF8] p-3"><p className="text-[10px] font-bold uppercase text-[#10B981]">Withdrawable</p><p className="text-2xl font-black text-[#10B981]">{naira(withdrawable)}</p></div>
      {account ? <p className="text-[#66738C]">To {account.accountName} · {account.bankName} {account.accountNumberMasked}</p> : <button type="button" onClick={onAddAccount} className="font-bold text-[#2563EB]">Add a payout account first</button>}
      <input inputMode="numeric" value={amountText} onChange={(e) => setAmountText(e.target.value.replace(/\D/g, ""))} placeholder={`Amount (min ${naira(min)})`} className="w-full rounded-xl border border-[#E2ECF6] px-3 py-2.5 text-lg font-bold outline-none focus:border-[#2563EB]" />
      {amount > 0 && <p className={amount > withdrawable || amount < min ? "font-semibold text-[#EF4444]" : "text-[#66738C]"}>{amount < min ? `Minimum is ${naira(min)}` : amount > withdrawable ? "More than your withdrawable balance" : `${naira(amount + fee)} will be debited (₦${fee} fee)`}</p>}
      <div className="flex justify-center"><InputOTP maxLength={4} value={pin} onChange={setPin} inputMode="numeric"><InputOTPGroup className="gap-2">{[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} className="size-11" />)}</InputOTPGroup></InputOTP></div>
      <button type="button" disabled={!valid || payout.isPending} onClick={() => payout.mutate({ amount, pin }, { onError: () => setPin("") })} className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white disabled:opacity-50">{payout.isPending ? "Sending…" : `Withdraw ${amount ? naira(amount) : ""}`}</button>
    </div>}
  </AppModal>;
}
