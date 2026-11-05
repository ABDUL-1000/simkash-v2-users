import { Landmark, ShieldCheck } from "lucide-react";
import { VirtualAccountsList } from "./VirtualAccountsList";

/** Dashboard card listing the agent's funding accounts (GET /user/wallet/virtual-account). */
export function AgentVirtualAccountsCard() {
  return (
    <section className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs font-semibold text-[#8C909B]">
          <span className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]"><Landmark className="size-4" /></span>
          Dedicated Virtual Account
        </span>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-[#10B981]"><ShieldCheck className="size-3" /> Wallet funding</span>
      </div>
      <VirtualAccountsList layout="grid" />
    </section>
  );
}
