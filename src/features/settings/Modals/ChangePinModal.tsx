import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ChangePinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePinModal({ open, onOpenChange }: ChangePinModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [currentPin, setCurrentPin] = useState(["", "", "", ""]);
  const [newPin, setNewPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);

  const handleCurrentPinChange = (idx: number, val: string) => {
    if (val.length > 1) return;
    const updated = [...currentPin];
    updated[idx] = val;
    setCurrentPin(updated);

    if (val && idx < 3) {
      const nextInput = document.getElementById(`current-pin-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleNewPinChange = (idx: number, val: string) => {
    if (val.length > 1) return;
    const updated = [...newPin];
    updated[idx] = val;
    setNewPin(updated);

    if (val && idx < 3) {
      const nextInput = document.getElementById(`new-pin-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleConfirmPinChange = (idx: number, val: string) => {
    if (val.length > 1) return;
    const updated = [...confirmPin];
    updated[idx] = val;
    setConfirmPin(updated);

    if (val && idx < 3) {
      const nextInput = document.getElementById(`confirm-pin-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleContinueStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPin.join("").length < 4) {
      alert("Please enter your full 4-digit current PIN");
      return;
    }
    setStep(2);
  };

  const handleSetPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.join("").length < 4 || confirmPin.join("").length < 4) {
      alert("Please fill in both PIN fields");
      return;
    }
    if (newPin.join("") !== confirmPin.join("")) {
      alert("PINs do not match!");
      return;
    }
    onOpenChange(false);
    setStep(1);
    setCurrentPin(["", "", "", ""]);
    setNewPin(["", "", "", ""]);
    setConfirmPin(["", "", "", ""]);
    alert("Transaction PIN changed successfully!");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => {
        if (!v) setStep(1);
        onOpenChange(v);
      }}
      title={step === 1 ? "Change Transaction PIN" : "Set New PIN"}
      description={step === 1 ? "Enter your current PIN first" : "Choose a 4-digit PIN"}
      size="md"
    >
      {step === 1 ? (
        <form onSubmit={handleContinueStep1} className="space-y-6 pt-2 text-center">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              CURRENT PIN
            </label>

            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  id={`current-pin-${idx}`}
                  type="password"
                  maxLength={1}
                  value={currentPin[idx]}
                  onChange={(e) => handleCurrentPinChange(idx, e.target.value)}
                  className="size-11 rounded-xl border border-[#E2ECF6] bg-white text-center text-lg font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSetPinSubmit} className="space-y-5 pt-2 text-center">
          {/* NEW PIN */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              NEW PIN
            </label>
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  id={`new-pin-${idx}`}
                  type="password"
                  maxLength={1}
                  value={newPin[idx]}
                  onChange={(e) => handleNewPinChange(idx, e.target.value)}
                  className="size-11 rounded-xl border border-[#E2ECF6] bg-white text-center text-lg font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
                />
              ))}
            </div>
          </div>

          {/* CONFIRM NEW PIN */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              CONFIRM NEW PIN
            </label>
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  id={`confirm-pin-${idx}`}
                  type="password"
                  maxLength={1}
                  value={confirmPin[idx]}
                  onChange={(e) => handleConfirmPinChange(idx, e.target.value)}
                  className="size-11 rounded-xl border border-[#E2ECF6] bg-white text-center text-lg font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
                />
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[#8C909B]">
            Avoid obvious PINs like 1234 or your birth year
          </p>

          <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1 rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Set PIN
            </button>
          </div>
        </form>
      )}
    </AppModal>
  );
}
