import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useEnterpriseWithdrawProfit } from "../api/useEnterpriseWallet";
import { useEnterpriseWalletData } from "../hooks/useEnterpriseWalletData";

const naira = (value: number) => `₦${value.toLocaleString()}`;

/** POST /enterprise/wallet/withdraw-profit { amount } — moves profit into the main wallet balance. */
export function WithdrawProfitModal({ onClose }: { onClose: () => void }) {
  const { walletBalance } = useEnterpriseWalletData();
  const withdraw = useEnterpriseWithdrawProfit();
  const [amountText, setAmountText] = useState("");
  const amount = Number(amountText) || 0;
  const available = walletBalance.totalBalance;
  const tooMuch = amount > available;
  const canSubmit = amount > 0 && !tooMuch && !withdraw.isPending;
  return (
    <AppModal open onOpenChange={(open) => { if (!open && !withdraw.isPending) onClose(); }} title="Withdraw Profit to Wallet" description="Move profit into your spendable wallet balance" size="sm" showCloseButton={!withdraw.isPending}
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", disabled: withdraw.isPending, onClick: onClose },
        { key: "submit", label: withdraw.isPending ? "Processing..." : "Withdraw to Wallet", variant: "primary", disabled: !canSubmit, onClick: () => withdraw.mutate({ amount }, { onSuccess: onClose }) },
      ]}>
      <div className="space-y-4 pt-1 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <span className="text-[11px] text-slate-500 block">Profit Balance</span>
            <span className="text-base font-black text-slate-900">{naira(available)}</span>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <span className="text-[11px] text-slate-500 block">Wallet Balance</span>
            <span className="text-base font-black text-slate-900">{naira(walletBalance.walletBalance)}</span>
          </div>
        </div>
        <div className="space-y-1">
          <label className="block font-bold text-slate-700">Amount (₦)</label>
          <input inputMode="numeric" value={amountText} placeholder="e.g. 25,000" onChange={(e) => setAmountText(e.target.value.replace(/\D/g, ""))} className="w-full px-3 py-2 text-base font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex items-center justify-between">
            {tooMuch ? <span className="font-semibold text-red-600">Amount exceeds your profit balance.</span> : <span />}
            {available > 0 && <button type="button" onClick={() => setAmountText(String(available))} className="font-bold text-blue-600 hover:underline">Use all</button>}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
