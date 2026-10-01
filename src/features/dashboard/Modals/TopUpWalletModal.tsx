import { useState } from "react";
import { ArrowRight, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { openNotification } from "@/utils/notifications";
import { useDepositWallet } from "@/features/wallet/api/useDepositWallet";
import { useGetWallet } from "@/features/wallet/api/useGetWallet";

interface TopUpWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance?: number;
}

const PRESET_AMOUNTS = [1000, 2000, 5000, 10000, 20000, 50000];

export function TopUpWalletModal({ open, onOpenChange, currentBalance }: TopUpWalletModalProps) {
  const { wallet } = useGetWallet();
  const [amount, setAmount] = useState("5000");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(5000);
  const depositMutation = useDepositWallet();
  const balance = currentBalance ?? wallet?.balance ?? 0;
  const parsedAmount = Number(amount) || 0;

  const selectPreset = (value: number) => {
    setAmount(String(value));
    setSelectedPreset(value);
  };

  const proceedToPayment = () => {
    if (!Number.isFinite(parsedAmount) || parsedAmount < 100) {
      openNotification({ state: "warning", title: "Invalid Amount", description: "Minimum top-up amount is ₦100." });
      return;
    }

    depositMutation.mutate(
      { amount: parsedAmount, returnUrl: `${window.location.origin}/dashboard` },
      {
        onSuccess: (response) => {
          const cashierUrl = response.data?.cashierUrl;
          if (!cashierUrl) {
            openNotification({ state: "error", title: "Checkout Error", description: "No cashier URL was returned. Please try again." });
            return;
          }
          openNotification({ state: "info", title: "Redirecting to Payment", description: "Opening secure OPay checkout..." });
          window.location.assign(cashierUrl);
        },
      }
    );
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} title="Top Up Wallet" description="Add funds securely through OPay Cashier" size="md">
      <div className="space-y-5 pt-1">
        <div className="flex items-center justify-between rounded-2xl bg-[#EFF4F8] p-3 text-xs">
          <span className="flex items-center gap-1.5 font-bold text-[#2563EB]"><Wallet className="size-4" /> Current Balance</span>
          <span className="font-extrabold text-[#0F152A]">₦{balance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>

        <div className="space-y-2">
          <label htmlFor="wallet-topup-amount" className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">Enter Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#0F152A]">₦</span>
            <input id="wallet-topup-amount" type="number" min={100} step="100" value={amount} onChange={(event) => { setAmount(event.target.value); setSelectedPreset(null); }} placeholder="0.00" className="w-full rounded-2xl border-2 border-[#2563EB] py-3 pl-10 pr-4 text-2xl font-bold text-[#0F152A] outline-none" />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {PRESET_AMOUNTS.map((value) => <button key={value} type="button" onClick={() => selectPreset(value)} className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${selectedPreset === value ? "border border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]" : "border border-[#E2ECF6] bg-[#F8FAFC] text-[#0F152A] hover:bg-[#EFF4F8]"}`}>₦{value.toLocaleString()}</button>)}
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#10B981]"><ShieldCheck className="size-5" /></span>
          <div><p className="font-bold text-[#0F152A]">Secure OPay checkout</p><p className="mt-0.5 text-[11px] text-[#8C909B]">Choose an available payment method at checkout. Any applicable fees will be shown before you confirm payment.</p></div>
        </div>

        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
          <button type="button" onClick={() => onOpenChange(false)} disabled={depositMutation.isPending} className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 disabled:opacity-50">Cancel</button>
          <button type="button" onClick={proceedToPayment} disabled={depositMutation.isPending || parsedAmount < 100} className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">
            {depositMutation.isPending ? <><Loader2 className="size-4 animate-spin" /> Initializing...</> : <>Pay ₦{parsedAmount.toLocaleString("en-NG")} <ArrowRight className="size-3.5" /></>}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
