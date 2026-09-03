import { useState } from "react";
import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ChangeBankAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBank?: string;
  accountName?: string;
}

export function ChangeBankAccountModal({
  open,
  onOpenChange,
  currentBank = "Access Bank · ****0476",
  accountName = "Yusuf Adam Baba",
}: ChangeBankAccountModalProps) {
  const [bankName, setBankName] = useState("Access Bank");
  const [accountNumber, setAccountNumber] = useState("0123456789");
  const [pin, setPin] = useState(["", "", "", ""]);

  const handlePinChange = (idx: number, val: string) => {
    if (val.length > 1) return;
    const updated = [...pin];
    updated[idx] = val;
    setPin(updated);

    if (val && idx < 3) {
      const nextInput = document.getElementById(`change-bank-pin-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.join("").length < 4) {
      alert("Please enter your 4-digit transaction PIN to confirm");
      return;
    }
    onOpenChange(false);
    alert("Payout bank account changed successfully!");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Change Bank Account"
      description="Update your payout account"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Current Bank Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-0.5">
          <span className="font-extrabold text-[#0F152A]">Current: {currentBank}</span>
          <p className="font-semibold text-[#10B981] flex items-center gap-1">
            {accountName} · Verified <Check className="size-3" />
          </p>
        </div>

        {/* Bank Name Select */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Bank Name</label>
          <select
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          >
            <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
            <option value="Access Bank">Access Bank</option>
            <option value="Zenith Bank">Zenith Bank</option>
            <option value="First Bank">First Bank</option>
            <option value="United Bank for Africa">United Bank for Africa (UBA)</option>
            <option value="Kuda Bank">Kuda Bank</option>
            <option value="OPay">OPay</option>
            <option value="Palmpay">Palmpay</option>
          </select>
        </div>

        {/* Account Number Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Account Number</label>
          <input
            type="text"
            required
            maxLength={10}
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Verification Success Box */}
        {accountNumber.length === 10 && (
          <div className="rounded-2xl border border-[#9DF8DA] bg-[#EBFFF8] p-3 text-xs font-bold text-[#10B981] flex items-center gap-1.5">
            <Check className="size-4" /> {accountName} · {bankName}
          </div>
        )}

        {/* Amber Notice Banner */}
        <div className="rounded-xl bg-[#FFFBEB] p-3 text-[11px] font-bold text-[#D9990D] border border-[#FCEEC1]">
          Bank account changes take effect immediately. Previous account will no longer receive payouts.
        </div>

        {/* Confirm with PIN */}
        <div className="space-y-2 text-center pt-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            CONFIRM WITH PIN
          </label>

          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                id={`change-bank-pin-${idx}`}
                type="password"
                maxLength={1}
                value={pin[idx]}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className="size-11 rounded-xl border border-[#E2ECF6] bg-white text-center text-lg font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
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
            Save Account
          </button>
        </div>
      </form>
    </AppModal>
  );
}
