import { useState } from "react";
import { CreditCard, ShieldCheck, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useGetWalletBalance } from "@/features/wallet/api/useGetWalletBalance";
import { cashierUrlFrom, easyBuyReturnUrl, usePayEasyBuyDownPayment, usePayEasyBuyInstallment } from "../api/easybuy";
import type { EasyBuyAgreement, EasyBuyPayMethod } from "../types/api";
import { fmtDueDate, naira } from "../utils";

type Mode = "down_payment" | "installment";
type Option = "suggested" | "custom" | "payoff";
const MIN_PAYMENT = 100;

/**
 * One sheet for both payments:
 * - down payment: pays `amounts.dueNow` (down payment + delivery)
 * - installment: suggested amount, a custom amount (₦100 → payoff) or the full payoff
 * Wallet asks for the transaction PIN; card redirects to the OPay cashier and comes back to the detail page.
 */
export function EasyBuyPayModal({ agreement, mode, open, onClose, onPaid }: {
  agreement: EasyBuyAgreement; mode: Mode; open: boolean; onClose: () => void;
  onPaid: (summary: { amount: number; method: EasyBuyPayMethod; payoff: boolean }) => void;
}) {
  const downPayment = usePayEasyBuyDownPayment();
  const installment = usePayEasyBuyInstallment();
  const wallet = useGetWalletBalance({ enabled: open });
  const [method, setMethod] = useState<EasyBuyPayMethod>("wallet");
  const [option, setOption] = useState<Option>("suggested");
  const [custom, setCustom] = useState("");
  const [step, setStep] = useState<"choose" | "pin">("choose");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const repayment = agreement.repayment;
  const suggested = repayment?.suggestedAmount ?? 0;
  const payoff = repayment?.payoffAmount ?? agreement.amounts.outstanding;
  const customValue = Number(custom.replace(/,/g, ""));
  const customError = option !== "custom" || !custom ? null
    : !Number.isFinite(customValue) || customValue <= 0 ? "Enter a valid amount"
      : customValue > payoff ? `The most you can pay is ${naira(payoff)}`
        : customValue < MIN_PAYMENT && customValue !== payoff ? `The minimum is ${naira(MIN_PAYMENT)}` : null;

  const amount = mode === "down_payment" ? agreement.amounts.dueNow
    : option === "payoff" ? payoff : option === "custom" ? (customError ? 0 : customValue) : suggested;
  const balance = wallet.balanceData ? Number(wallet.balanceData.balance) : null;
  const walletShort = balance !== null && amount > 0 && balance < amount;
  const pending = downPayment.isPending || installment.isPending;
  const canContinue = amount > 0 && !customError && !pending;

  const reset = () => { setStep("choose"); setPin(""); setError(null); setOption("suggested"); setCustom(""); setMethod("wallet"); };
  const close = () => { if (pending) return; reset(); onClose(); };

  const submit = (walletPin?: string) => {
    setError(null);
    const body = {
      id: agreement.id, method,
      ...(walletPin ? { pin: walletPin } : {}),
      ...(method === "card" ? { returnUrl: easyBuyReturnUrl(agreement.id) } : {}),
      ...(mode === "installment" && option === "payoff" ? { payoff: true } : {}),
      ...(mode === "installment" && option === "custom" ? { amount: customValue } : {}),
    };
    const handlers = {
      onSuccess: (result: Parameters<typeof cashierUrlFrom>[0]) => {
        const url = cashierUrlFrom(result);
        if (url) { window.location.assign(url); return; }
        const paid = { amount, method, payoff: option === "payoff" };
        reset(); onClose(); onPaid(paid);
      },
      onError: (err: Error) => { setPin(""); setError(err.message); },
    };
    if (mode === "down_payment") downPayment.mutate(body, handlers); else installment.mutate(body, handlers);
  };

  const proceed = () => { if (method === "wallet") { setError(null); setStep("pin"); } else submit(); };

  const optionCard = (key: Option, title: string, value: number, note?: string) =>
    <button type="button" onClick={() => setOption(key)} className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left text-xs transition ${option === key ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]" : "border-[#E2ECF6] bg-[#F8FAFC] hover:border-[#C7DAFC]"}`}>
      <span className="min-w-0"><span className="block font-extrabold text-[#0F152A]">{title}</span>{note && <span className="block text-[11px] text-[#8C909B]">{note}</span>}</span>
      <span className="shrink-0 font-extrabold text-[#0F152A]">{naira(value)}</span>
    </button>;

  const methodCard = (key: EasyBuyPayMethod, icon: React.ReactNode, title: string, note: string) =>
    <button type="button" onClick={() => setMethod(key)} className={`flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left text-xs transition ${method === key ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]" : "border-[#E2ECF6] bg-[#F8FAFC] hover:border-[#C7DAFC]"}`}>
      <span className="mt-0.5 text-[#2563EB]">{icon}</span>
      <span className="min-w-0 flex-1"><span className="block font-extrabold text-[#0F152A]">{title}</span><span className="block text-[11px] text-[#8C909B]">{note}</span></span>
      {method === key && <span className="mt-1 size-2.5 shrink-0 rounded-full bg-[#10B981]" />}
    </button>;

  const title = mode === "down_payment" ? "Pay down payment" : "Make a payment";
  const description = `${agreement.product.name} · ${agreement.reference}`;

  return <AppModal open={open} onOpenChange={(value) => { if (!value) close(); }} title={step === "pin" ? "Confirm payment" : title} description={step === "pin" ? `Authorise ${naira(amount)} from your wallet` : description} size="sm">
    {step === "choose" ? <div className="space-y-4 pt-1">
      {mode === "down_payment" ? <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
        <div className="flex justify-between py-1.5 first:pt-0"><span className="text-[#66738C]">Down payment</span><span className="font-bold text-[#0F152A]">{naira(agreement.amounts.downPayment)}</span></div>
        <div className="flex justify-between py-1.5"><span className="text-[#66738C]">Delivery</span><span className={`font-bold ${agreement.amounts.deliveryFee ? "text-[#0F152A]" : "text-[#10B981]"}`}>{agreement.amounts.deliveryFee ? naira(agreement.amounts.deliveryFee) : "Free"}</span></div>
        <div className="flex justify-between pt-2.5 text-sm font-extrabold text-[#0F152A]"><span>Pay now</span><span>{naira(agreement.amounts.dueNow)}</span></div>
        <p className="pt-2 text-[11px] text-[#8C909B]">Your order ships right after this payment and installments start today.</p>
      </div> : <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">How much?</p>
        {suggested > 0 && optionCard("suggested", repayment?.overdueAmount ? "Pay what's due" : "Pay next installment", suggested,
          repayment?.overdueAmount ? `Includes ${naira(repayment.overdueAmount)} overdue` : repayment?.nextInstallment ? `Due ${fmtDueDate(repayment.nextInstallment.dueDate)}` : undefined)}
        <div className={`rounded-2xl border p-3.5 text-xs transition ${option === "custom" ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]" : "border-[#E2ECF6] bg-[#F8FAFC]"}`}>
          <button type="button" onClick={() => setOption("custom")} className="w-full text-left"><span className="block font-extrabold text-[#0F152A]">Pay another amount</span><span className="block text-[11px] text-[#8C909B]">Min {naira(MIN_PAYMENT)} · max {naira(payoff)}</span></button>
          {option === "custom" && <div className="mt-2.5">
            <div className="flex items-center rounded-xl border border-[#E2ECF6] bg-white px-3 focus-within:border-[#2563EB]">
              <span className="text-sm font-bold text-[#8C909B]">₦</span>
              <input autoFocus inputMode="decimal" value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^\d.,]/g, ""))} placeholder="0" className="w-full bg-transparent px-2 py-2.5 text-sm font-bold text-[#0F152A] outline-none" />
            </div>
            {customError && <p className="mt-1 text-[11px] font-semibold text-[#EF4444]">{customError}</p>}
          </div>}
        </div>
        {payoff > 0 && optionCard("payoff", "Pay off everything", payoff, "Completes your EasyBuy today")}
      </div>}

      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Pay with</p>
        {methodCard("wallet", <Wallet className="size-4" />, "Simkash Wallet", balance !== null ? `${naira(balance)} available` : "Pay instantly with your PIN")}
        {method === "wallet" && walletShort && <p className="rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] p-2.5 text-[11px] font-semibold text-[#D9990D]">Your wallet balance is lower than {naira(amount)}. Top up or pay by card.</p>}
        {methodCard("card", <CreditCard className="size-4" />, "Debit / Credit Card", "You'll be taken to OPay to pay")}
      </div>

      {error && <p className="rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{error}</p>}

      <div className="flex flex-col-reverse gap-2 border-t border-[#E2ECF6] pt-4 sm:flex-row sm:justify-end">
        <button type="button" disabled={pending} onClick={close} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Cancel</button>
        <button type="button" disabled={!canContinue} onClick={proceed} className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">
          {pending ? "Starting card payment…" : `Pay ${amount > 0 ? naira(amount) : ""}`}
        </button>
      </div>
      <p className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-[#8C909B]"><ShieldCheck className="size-3.5 text-[#10B981]" /> Secured by OPay · All payments encrypted</p>
    </div> : <div className="space-y-4 pt-1 text-center">
      <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">Enter transaction PIN</label>
      <div className="flex justify-center">
        <InputOTP maxLength={4} value={pin} onChange={setPin} containerClassName="gap-3">
          <InputOTPGroup className="gap-2 sm:gap-3">{[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} className="size-11 text-lg font-bold sm:size-12" />)}</InputOTPGroup>
        </InputOTP>
      </div>
      {error && <p className="rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{error}</p>}
      <div className="flex items-center justify-between gap-2 border-t border-[#E2ECF6] pt-4">
        <button type="button" disabled={pending} onClick={() => { setStep("choose"); setPin(""); setError(null); }} className="rounded-xl border border-[#E2ECF6] px-5 py-2 text-xs font-bold text-[#0F152A]">Back</button>
        <button type="button" onClick={() => submit(pin)} disabled={pin.length < 4 || pending} className="rounded-xl bg-[#10B981] px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-600 disabled:opacity-50">
          {pending ? "Processing…" : "Confirm & Pay"}
        </button>
      </div>
    </div>}
  </AppModal>;
}
