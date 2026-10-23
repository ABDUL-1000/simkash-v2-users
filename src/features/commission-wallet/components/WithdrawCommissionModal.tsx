import { useState } from "react";
import { ArrowDownToLine } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useWithdrawCommission, type CommissionRole, type WithdrawCommissionResult } from "../api";

interface WithdrawCommissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: CommissionRole;
  commissionBalance: number;
  walletBalance: number;
  onSuccess?: (result: WithdrawCommissionResult) => void;
}

const naira = (value: number) => `₦${value.toLocaleString()}`;

/** Move commission into the main wallet balance (amount + transaction PIN). */
export function WithdrawCommissionModal({ open, onOpenChange, role, commissionBalance, walletBalance, onSuccess }: WithdrawCommissionModalProps) {
  const withdraw = useWithdrawCommission(role);
  const [amountText, setAmountText] = useState("");
  const [pin, setPin] = useState("");
  const amount = Number(amountText) || 0;
  const tooMuch = amount > commissionBalance;
  const canSubmit = amount > 0 && !tooMuch && pin.length === 4 && !withdraw.isPending;
  const presets = [0.25, 0.5, 1].map((share) => Math.floor(commissionBalance * share)).filter((value, index, list) => value > 0 && list.indexOf(value) === index);

  const close = (value: boolean) => {
    if (withdraw.isPending) return;
    if (!value) { setAmountText(""); setPin(""); withdraw.reset(); }
    onOpenChange(value);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    withdraw.mutate({ amount, pin }, {
      onSuccess: (result) => { setAmountText(""); setPin(""); onOpenChange(false); onSuccess?.(result); },
      onError: () => setPin(""),
    });
  };

  return (
    <AppModal open={open} onOpenChange={close} title="Move Commission to Wallet" description="Transfer from your commission balance to your main balance" size="sm" showCloseButton={!withdraw.isPending}>
      <form onSubmit={submit} className="space-y-4 pt-1 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#10B981]/20 bg-[#EBFFF8] p-3">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#10B981]">Commission</p>
            <p className="text-lg font-black text-[#0F152A]">{naira(commissionBalance)}</p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Wallet balance</p>
            <p className="text-lg font-black text-[#0F152A]">{naira(walletBalance)}</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-2.5 text-xl font-black text-[#8C909B]">₦</span>
            <input inputMode="numeric" placeholder="0" value={amountText} onChange={(e) => setAmountText(e.target.value.replace(/\D/g, ""))} className="w-full rounded-2xl border-2 border-[#10B981] bg-white py-2 pl-10 pr-4 text-xl font-black text-[#0F152A] outline-none" />
          </div>
          {presets.length > 0 && <div className="flex flex-wrap gap-1.5">
            {presets.map((value) => (
              <button key={value} type="button" onClick={() => setAmountText(String(value))} className={`rounded-full px-3 py-1 text-xs font-bold transition ${amount === value ? "bg-[#2563EB] text-white" : "border border-[#E2ECF6] bg-[#F8FAFC] text-[#0F152A] hover:bg-[#EFF4F8]"}`}>
                {value === commissionBalance ? `${naira(value)} (All)` : naira(value)}
              </button>
            ))}
          </div>}
          {tooMuch ? <p className="font-semibold text-[#EF4444]">Amount exceeds your commission balance.</p>
            : amount > 0 && <p className="text-[#66738C]">Wallet after: <strong className="text-[#0F152A]">{naira(walletBalance + amount)}</strong> · Commission after: <strong className="text-[#0F152A]">{naira(commissionBalance - amount)}</strong></p>}
        </div>

        <div className="space-y-1.5 text-center">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Enter transaction PIN</label>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={setPin} disabled={withdraw.isPending} inputMode="numeric" pattern="^[0-9]*$">
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3].map((index) => <InputOTPSlot key={index} index={index} className="size-11 rounded-xl border border-[#E2ECF6] text-base font-bold" />)}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {withdraw.error && <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 font-medium text-[#EF4444]">{withdraw.error.message}</div>}

        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-3">
          <button type="button" disabled={withdraw.isPending} onClick={() => close(false)} className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A] disabled:opacity-50">Cancel</button>
          <button type="submit" disabled={!canSubmit} className="flex items-center gap-1.5 rounded-xl bg-[#10B981] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 disabled:opacity-50">
            <ArrowDownToLine className="size-3.5" />{withdraw.isPending ? "Moving…" : `Move ${amount ? naira(amount) : ""} to Wallet`}
          </button>
        </div>
      </form>
    </AppModal>
  );
}
