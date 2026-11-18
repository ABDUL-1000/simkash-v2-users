import { useEffect, useState } from "react";
import { CheckCircle2, KeyRound, Loader2, Mail, ShieldCheck } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { openNotification } from "@/utils/notifications";
import { useForgotPinStore, useRequestPinReset, useResetPin, useVerifyPinResetOtp } from "../api/usePinReset";

type Step = "intro" | "code" | "pin" | "done";
const slot = "size-10 rounded-xl border border-[#E2ECF6] text-base font-bold sm:size-12 sm:text-lg";
const pinSlot = "size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold";

/** Forgot transaction PIN: email code → verify → new PIN. Mounted once; open it with `useForgotPinStore().show()`. */
export function ForgotPinModal() {
  const { open, hide } = useForgotPinStore();
  // Remount on each open so every attempt starts clean and the reset token never outlives the flow.
  return open ? <ForgotPinFlow onClose={hide} /> : null;
}

function ForgotPinFlow({ onClose }: { onClose: () => void }) {
  const request = useRequestPinReset();
  const verify = useVerifyPinResetOtp();
  const reset = useResetPin();
  const [step, setStep] = useState<Step>("intro");
  const [email, setEmail] = useState("");
  const [expiresAt, setExpiresAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState<string | null>(null); // memory only
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [needsNewCode, setNeedsNewCode] = useState(false);
  const busy = request.isPending || verify.isPending || reset.isPending;

  useEffect(() => {
    if (step !== "code") return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [step]);
  const secondsLeft = Math.max(0, Math.round((expiresAt - now) / 1000));
  const countdown = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;

  const sendCode = () => {
    setError(null);
    request.mutate(undefined, {
      onSuccess: (data) => {
        setEmail(data.email); setExpiresAt(Date.now() + (data.expiresIn || 600) * 1000); setNow(Date.now());
        setOtp(""); setToken(null); setNeedsNewCode(false); setStep("code");
      },
      onError: (err) => setError(err.message),
    });
  };

  const submitCode = (code = otp) => {
    if (code.length !== 6) { setError("Enter the 6-digit code"); return; }
    setError(null);
    verify.mutate(code, {
      onSuccess: (data) => { setToken(data.reset_token); setStep("pin"); },
      onError: (err) => {
        setError(err.message);
        if (/too many|expired|invalid|request a new/i.test(err.message)) { setOtp(""); setNeedsNewCode(true); }
      },
    });
  };

  const submitPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(newPin)) { setError("PIN must be 4 digits"); return; }
    if (newPin !== confirmPin) { setError("The PINs don't match"); return; }
    if (!token) { setStep("intro"); return; }
    setError(null);
    reset.mutate({ reset_token: token, new_pin: newPin, confirm_new_pin: confirmPin }, {
      onSuccess: () => { setToken(null); setStep("done"); openNotification({ state: "success", title: "Transaction PIN reset" }); },
      onError: (err) => {
        // An expired/used token means starting again from a new code.
        if (/token/i.test(err.message)) { setToken(null); setNewPin(""); setConfirmPin(""); setStep("intro"); }
        setError(err.message);
      },
    });
  };

  const close = () => { if (!busy) onClose(); };
  const titles: Record<Step, [string, string]> = {
    intro: ["Forgot transaction PIN", "We'll email you a code to reset it"],
    code: ["Enter the code", email ? `We sent a 6-digit code to ${email}` : "Check your email for a 6-digit code"],
    pin: ["Set a new PIN", "Choose a new 4-digit transaction PIN"],
    done: ["PIN reset", "Your new PIN works straight away"],
  };
  const errorBox = error && <p className="rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{error}</p>;
  const footer = "flex flex-col-reverse gap-2 border-t border-[#E2ECF6] pt-4 sm:flex-row sm:justify-end";

  return <AppModal open onOpenChange={(v) => { if (!v) close(); }} title={titles[step][0]} description={titles[step][1]} size="sm">
    {step === "intro" && <div className="space-y-5 pt-1 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#EFF4F8] text-[#2563EB]"><Mail className="size-6" /></span>
      <p className="text-xs text-[#66738C]">We'll send a 6-digit code to the email on your account. It's valid for 10 minutes.</p>
      {errorBox}
      <div className={footer}>
        <button type="button" disabled={busy} onClick={close} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Cancel</button>
        <button type="button" disabled={busy} onClick={sendCode} className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">
          {request.isPending && <Loader2 className="size-4 animate-spin" />} {request.isPending ? "Sending…" : "Send code"}
        </button>
      </div>
    </div>}

    {step === "code" && <form onSubmit={(e) => { e.preventDefault(); submitCode(); }} className="space-y-5 pt-1 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#EFF4F8] text-[#2563EB]"><KeyRound className="size-6" /></span>
      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} disabled={busy || needsNewCode} autoFocus
          onChange={(v) => { setError(null); setOtp(v.replace(/\D/g, "")); }} onComplete={(v: string) => submitCode(v)}>
          <InputOTPGroup className="gap-1.5 sm:gap-2">{[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} className={slot} />)}</InputOTPGroup>
        </InputOTP>
      </div>
      <p className="text-[11px] text-[#8C909B]">{secondsLeft > 0 ? <>Code expires in <b className="text-[#0F152A]">{countdown}</b></> : <span className="font-semibold text-[#EF4444]">This code has expired.</span>}</p>
      {errorBox}
      <p className="text-[11px] text-[#66738C]">Didn't get it? Check spam, or{" "}
        <button type="button" disabled={busy} onClick={sendCode} className="font-bold text-[#2563EB] hover:underline disabled:opacity-50">{request.isPending ? "sending…" : "resend code"}</button>
      </p>
      <div className={footer}>
        <button type="button" disabled={busy} onClick={close} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={busy || otp.length !== 6 || needsNewCode || secondsLeft === 0} className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">
          {verify.isPending && <Loader2 className="size-4 animate-spin" />} Verify code
        </button>
      </div>
    </form>}

    {step === "pin" && <form onSubmit={submitPin} className="space-y-5 pt-1 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#EFF4F8] text-[#2563EB]"><ShieldCheck className="size-6" /></span>
      {([["New PIN", newPin, setNewPin], ["Confirm new PIN", confirmPin, setConfirmPin]] as const).map(([label, value, set]) => <div key={label} className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">{label}</p>
        <div className="flex justify-center">
          <InputOTP maxLength={4} value={value} disabled={busy} onChange={(v) => { setError(null); set(v.replace(/\D/g, "")); }}>
            <InputOTPGroup className="gap-3">{[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} className={pinSlot} />)}</InputOTPGroup>
          </InputOTP>
        </div>
      </div>)}
      {error ? errorBox : <p className="text-[11px] text-[#8C909B]">Avoid obvious patterns like 1234, 0000 or your birth year</p>}
      <div className={footer}>
        <button type="button" disabled={busy} onClick={close} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={busy || newPin.length !== 4 || confirmPin.length !== 4} className="flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">
          {reset.isPending && <Loader2 className="size-4 animate-spin" />} {reset.isPending ? "Saving…" : "Reset PIN"}
        </button>
      </div>
    </form>}

    {step === "done" && <div className="space-y-5 pt-1 text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8]"><CheckCircle2 className="size-8 text-[#10B981]" /></span>
      <p className="text-xs text-[#66738C]">Your transaction PIN has been changed. Use the new PIN for your next payment.</p>
      <button type="button" onClick={onClose} className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700">Done</button>
    </div>}
  </AppModal>;
}

/** Drop under any PIN input. Opens the Forgot PIN flow on top of the current modal. */
export function ForgotPinLink({ className = "" }: { className?: string }) {
  const show = useForgotPinStore((s) => s.show);
  return <button type="button" onClick={show} className={`text-[11px] font-bold text-[#2563EB] hover:underline ${className}`}>Forgot PIN?</button>;
}
