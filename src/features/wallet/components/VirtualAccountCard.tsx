import { useState } from "react";
import { Check, Copy, Landmark, ShieldCheck } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetWallet } from "../api/useGetWallet";
import { openNotification } from "@/utils/notifications";

export function VirtualAccountCard() {
  const { wallet, isLoading, isError } = useGetWallet();
  const [copied, setCopied] = useState(false);
  const account = wallet?.virtual_account;

  const copyAccountNumber = async () => {
    if (!account?.account_number) return;
    try {
      await navigator.clipboard.writeText(account.account_number);
      setCopied(true);
      openNotification({ state: "success", title: "Copied", description: "Account number copied!" });
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      openNotification({ state: "error", title: "Copy failed", description: "Could not copy the account number." });
    }
  };

  if (isLoading) return <div className="h-44 animate-pulse rounded-2xl border border-[#E2ECF6] bg-slate-50" />;
  if (isError) return <AppEmptyState title="Account details unavailable" description="We could not load your virtual account details." />;
  if (!account) return null;

  return (
    <section className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]"><Landmark className="size-5" /></span>
          <div><p className="text-[10px] font-bold uppercase tracking-wide text-[#8C909B]">Dedicated Virtual Account</p><h3 className="text-sm font-bold text-[#0F152A]">{account.bank_name}</h3></div>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-[#10B981]"><ShieldCheck className="size-3" /> Wallet funding</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div><p className="text-[10px] font-semibold uppercase text-[#8C909B]">Account Number</p><p className="font-mono text-xl font-black tracking-wider text-[#0F152A]">{account.account_number}</p></div>
        <button type="button" onClick={copyAccountNumber} className="flex items-center gap-1.5 rounded-xl border border-[#E2ECF6] px-3 py-2 text-xs font-bold text-[#2563EB] hover:bg-[#F8FAFC]">{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}{copied ? "Copied" : "Copy"}</button>
      </div>
      <div className="mt-3 flex justify-between gap-3 text-xs"><span className="text-[#8C909B]">Account Name</span><span className="text-right font-bold uppercase text-[#0F152A]">{account.account_name}</span></div>
      <p className="mt-3 text-[11px] leading-relaxed text-[#66738C]">Transfer directly to this dedicated account to fund your Simkash wallet instantly.</p>
    </section>
  );
}
