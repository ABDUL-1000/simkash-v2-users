import { useState } from "react";
import { Check, Copy, Landmark } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { openNotification } from "@/utils/notifications";
import { useGetVirtualAccounts } from "../api/useGetVirtualAccounts";

/** Agent funding accounts (GET /user/wallet/virtual-account) with copy-to-clipboard. "grid" lays accounts side by side on wider screens. */
export function VirtualAccountsList({ layout = "stack" }: { layout?: "stack" | "grid" }) {
  const query = useGetVirtualAccounts();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const accounts = query.data ?? [];

  const copy = async (id: number, accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedId(id);
      openNotification({ state: "success", title: "Copied", description: "Account number copied!" });
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      openNotification({ state: "error", title: "Copy failed", description: "Could not copy the account number." });
    }
  };

  if (query.isPending) return <div className="h-24 animate-pulse rounded-2xl border border-[#E2ECF6] bg-slate-50" />;
  if (query.isError) return <div className="rounded-2xl border border-red-100 bg-red-50 p-3 text-xs text-[#EF4444]">
    {query.error.message} <button type="button" onClick={() => void query.refetch()} className="ml-1 font-bold underline">Retry</button>
  </div>;
  if (!accounts.length) return <AppEmptyState title="No virtual account yet" description="Your dedicated funding account will appear here once it is created." />;

  return <div className="space-y-2">
    <div className={layout === "grid" ? "grid gap-2 sm:grid-cols-2 xl:grid-cols-3" : "space-y-2"}>
    {accounts.map((account) => <div key={account.id} className="rounded-2xl border border-[#E2ECF6] bg-white p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]"><Landmark className="size-4" /></span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-[#0F152A]">{account.bank_name}</p>
            <p className="font-mono text-lg font-black tracking-wider text-[#0F152A]">{account.account_number}</p>
          </div>
        </div>
        <button type="button" onClick={() => void copy(account.id, account.account_number)} className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[#E2ECF6] px-3 py-2 text-xs font-bold text-[#2563EB] hover:bg-[#F8FAFC]">
          {copiedId === account.id ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}{copiedId === account.id ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="mt-2 flex justify-between gap-3 text-[11px]"><span className="text-[#8C909B]">Account Name</span><span className="text-right font-bold uppercase text-[#0F152A]">{account.account_name}</span></div>
    </div>)}
    </div>
    <p className="text-[11px] leading-relaxed text-[#66738C]">Transfer to any of these accounts to fund your Simkash wallet instantly.</p>
  </div>;
}
