import { useState } from "react";
import { ArrowDownToLine, Eye, EyeOff, Wallet, Coins } from "lucide-react";
import { TransactionSuccessModal } from "@/components/common/TransactionSuccessModal";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import type { CommissionRole, WithdrawCommissionResult } from "../api";
import { WithdrawCommissionModal } from "./WithdrawCommissionModal";

const naira = (value: number) => `₦${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface WalletBalanceCardsProps {
  role: CommissionRole;
  /** "both": balance + commission cards (dashboards). "balance": just the main balance card (wallet pages, which already show commission). */
  show?: "both" | "balance";
}

/** Main wallet balance and commission balance from GET /user/auth/me, with "move commission to wallet". */
export function WalletBalanceCards({ role, show = "both" }: WalletBalanceCardsProps) {
  const { wallet, isLoading } = useGetAuthUser();
  const [hidden, setHidden] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [result, setResult] = useState<WithdrawCommissionResult | null>(null);
  // /me returns these as strings ("0"), so coerce.
  const balance = Number(wallet?.balance ?? 0) || 0;
  const commission = Number(wallet?.commission_balance ?? 0) || 0;
  const value = (amount: number) => isLoading && !wallet ? "…" : hidden ? "••••••" : naira(amount);

  const moveButton = <button type="button" disabled={commission <= 0} onClick={() => setWithdrawOpen(true)}
    className="inline-flex items-center gap-1.5 rounded-lg bg-[#10B981] px-3 py-1.5 text-[11px] font-bold text-white shadow-xs hover:bg-emerald-600 disabled:opacity-50">
    <ArrowDownToLine className="size-3.5" />Move to Wallet
  </button>;

  return <>
    <div className={`grid gap-4 ${show === "both" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
      {/* Main balance */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5 space-y-1">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-xs font-semibold text-[#8C909B]"><span className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]"><Wallet className="size-4" /></span>Wallet Balance</span>
          <button type="button" aria-label={hidden ? "Show balances" : "Hide balances"} onClick={() => setHidden(!hidden)} className="text-[#8C909B] hover:text-[#0F152A]">{hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button>
        </div>
        <h2 className="text-2xl font-black text-[#0F152A] sm:text-3xl">{value(balance)}</h2>
        {show === "balance" ? <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <p className="text-[11px] font-medium text-[#8C909B]">Commission available: <strong className="text-[#10B981]">{value(commission)}</strong></p>
          {moveButton}
        </div> : <p className="text-[11px] font-medium text-[#8C909B]">Available for bills, airtime and purchases</p>}
      </div>

      {/* Commission balance */}
      {show === "both" && <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5 space-y-1">
        <span className="flex items-center gap-2 text-xs font-semibold text-[#8C909B]"><span className="flex size-7 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]"><Coins className="size-4" /></span>Commission Balance</span>
        <h2 className="text-2xl font-black text-[#10B981] sm:text-3xl">{value(commission)}</h2>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
          <p className="text-[11px] font-medium text-[#8C909B]">Move it to your wallet to spend</p>
          {moveButton}
        </div>
      </div>}
    </div>

    <WithdrawCommissionModal open={withdrawOpen} onOpenChange={setWithdrawOpen} role={role} commissionBalance={commission} walletBalance={balance} onSuccess={setResult} />
    <TransactionSuccessModal
      open={Boolean(result)}
      onOpenChange={(open) => { if (!open) setResult(null); }}
      title="Commission Moved!"
      subtitle="The amount is now in your wallet balance."
      details={result ? [
        { label: "Amount", value: naira(result.withdrawn_amount) },
        { label: "Wallet balance", value: naira(result.wallet_balance) },
        { label: "Commission left", value: naira(result.commission_balance) },
        { label: "Reference", value: result.reference },
      ] : []}
    />
  </>;
}
