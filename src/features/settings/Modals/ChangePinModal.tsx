import { useState, useEffect } from "react";
import { ArrowLeft, Loader2, Lock, ShieldCheck } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useChangePin } from "../api/useChangePin";

interface ChangePinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePinModal({ open, onOpenChange }: ChangePinModalProps) {
  const { mutate: changePin, isPending } = useChangePin();

  const [step, setStep] = useState<1 | 2>(1);
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setOldPin("");
      setNewPin("");
      setConfirmNewPin("");
      setError(null);
    }
  }, [open]);

  const handleContinueStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (oldPin.length < 4) {
      setError("Please enter your 4-digit current PIN");
      return;
    }
    setStep(2);
  };

  const handleSetPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPin.length < 4 || confirmNewPin.length < 4) {
      setError("Please fill in both PIN fields with 4 digits");
      return;
    }

    if (newPin !== confirmNewPin) {
      setError("New PINs do not match. Please try again.");
      return;
    }

    changePin(
      {
        old_pin: oldPin,
        new_pin: newPin,
        confirm_new_pin: confirmNewPin,
      },
      {
        onSuccess: () => {
          setStep(1);
          setOldPin("");
          setNewPin("");
          setConfirmNewPin("");
          setError(null);
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => {
        if (!isPending) onOpenChange(v);
      }}
      title={step === 1 ? "Change Transaction PIN" : "Set New Transaction PIN"}
      description={
        step === 1
          ? "Enter your current 4-digit PIN to proceed"
          : "Choose a new secure 4-digit PIN"
      }
      size="md"
    >
      {step === 1 ? (
        <form onSubmit={handleContinueStep1} className="space-y-6 pt-2 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#EFF4F8] text-[#2563EB]">
            <Lock className="size-6" />
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              Enter Current PIN
            </label>

            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={oldPin}
                onChange={(val) => {
                  setError(null);
                  setOldPin(val);
                }}
                disabled={isPending}
              >
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot
                    index={0}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                  <InputOTPSlot
                    index={1}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                  <InputOTPSlot
                    index={2}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                  <InputOTPSlot
                    index={3}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <p className="text-xs font-medium text-red-600 animate-in fade-in">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={oldPin.length < 4}
              className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSetPinSubmit} className="space-y-5 pt-1 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#EFF4F8] text-[#2563EB]">
            <ShieldCheck className="size-6" />
          </div>

          {/* NEW PIN */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              New 4-Digit PIN
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={newPin}
                onChange={(val) => {
                  setError(null);
                  setNewPin(val);
                }}
                disabled={isPending}
              >
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot
                    index={0}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                  <InputOTPSlot
                    index={1}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                  <InputOTPSlot
                    index={2}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                  <InputOTPSlot
                    index={3}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {/* CONFIRM NEW PIN */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              Confirm New PIN
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={confirmNewPin}
                onChange={(val) => {
                  setError(null);
                  setConfirmNewPin(val);
                }}
                disabled={isPending}
              >
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot
                    index={0}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                  <InputOTPSlot
                    index={1}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                  <InputOTPSlot
                    index={2}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                  <InputOTPSlot
                    index={3}
                    className="size-12 rounded-xl border border-[#E2ECF6] text-lg font-bold"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {error ? (
            <p className="text-xs font-medium text-red-600 animate-in fade-in">
              {error}
            </p>
          ) : (
            <p className="text-[11px] text-[#8C909B]">
              Avoid obvious patterns like 1234, 0000, or your birth year
            </p>
          )}

          <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setStep(1);
              }}
              disabled={isPending}
              className="flex items-center gap-1 rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              type="submit"
              disabled={
                newPin.length < 4 || confirmNewPin.length < 4 || isPending
              }
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              {isPending ? "Updating PIN..." : "Update PIN"}
            </button>
          </div>
        </form>
      )}
    </AppModal>
  );
}
