import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useCaWithdrawProfit } from "../api";

interface CaPinAmountModalProps {
  /** POST /wallet/withdraw-profit (to main wallet). Bank payouts use the shared WalletPayoutModal. */
  mode: "profit";
  available: number;
  walletBalance: number;
  onClose: () => void;
}

const naira = (value: number) => `₦${value.toLocaleString()}`;

export function CaPinAmountModal({ available, walletBalance, onClose }: CaPinAmountModalProps) {
  const mutation = useCaWithdrawProfit();
  const [amountText, setAmountText] = useState("");
  const [pin, setPin] = useState("");
  const amount = Number(amountText) || 0;
  const tooMuch = amount > available;
  const canSubmit = amount > 0 && !tooMuch && pin.length === 4 && !mutation.isPending;
  const close = () => { if (!mutation.isPending) onClose(); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    mutation.mutate({ amount, pin }, { onSuccess: onClose, onError: () => setPin("") });
  };

  return (
    <AppModal open onOpenChange={(value) => { if (!value) close(); }} title="Withdraw Profit to Wallet"
      description="Move profit into your main wallet balance" size="sm" showCloseButton={!mutation.isPending}>
      <form onSubmit={submit} className="space-y-4 pt-1 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#0F152A] p-3 text-white">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Available</p>
            <p className="text-lg font-black">{naira(available)}</p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Wallet balance</p>
            <p className="text-lg font-black text-[#0F152A]">{naira(walletBalance)}</p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">Amount</label>
          <input type="text" inputMode="numeric" placeholder="₦0" value={amountText} onChange={(e) => setAmountText(e.target.value.replace(/[^\d]/g, ""))}
            className="w-full rounded-2xl border-2 border-[#2563EB] bg-white p-3.5 text-sm font-extrabold text-[#0F152A] outline-none font-mono" />
          <div className="flex items-center justify-between pt-0.5">
            {tooMuch ? <p className="text-[11px] font-semibold text-[#EF4444]">Amount exceeds your available balance.</p> : <span />}
            {available > 0 && <button type="button" onClick={() => setAmountText(String(available))} className="text-[11px] font-bold text-[#2563EB] hover:underline">Use all</button>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-center text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Enter Transaction PIN</label>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={setPin} inputMode="numeric">
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3].map((index) => <InputOTPSlot key={index} index={index} className="size-11 rounded-xl border border-[#E2ECF6] text-base font-bold" />)}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E2ECF6]">
          <button type="button" disabled={mutation.isPending} onClick={close} className="rounded-xl bg-[#F1F5F9] py-3 font-bold text-[#66738C] hover:bg-[#E2ECF6] disabled:opacity-50">Cancel</button>
          <button type="submit" disabled={!canSubmit} className="rounded-xl bg-[#2563EB] py-3 font-bold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50">
            {mutation.isPending ? "Processing..." : "Withdraw to Wallet"}
          </button>
        </div>
      </form>
    </AppModal>
  );
}
