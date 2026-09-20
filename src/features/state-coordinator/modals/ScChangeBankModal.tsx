import { useState } from "react";
import { AlertTriangle, CheckCircle2, Landmark } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface ScChangeBankModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (bankDetails: { bankName: string; accountNumber: string; accountName: string }) => void;
}

export function ScChangeBankModal({
  open,
  onOpenChange,
  onSuccess,
}: ScChangeBankModalProps) {
  const [selectedBank, setSelectedBank] = useState("GTBank");
  const [accountNumber, setAccountNumber] = useState("0123456789");
  const [accountName] = useState("Aminat Okafor");
  const [pin, setPin] = useState("");

  const banks = [
    "GTBank",
    "Access Bank",
    "Zenith Bank",
    "First Bank",
    "UBA",
    "Kuda Bank",
    "OPay",
    "Moniepoint",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountNumber.length < 10 || pin.length < 4) return;
    onSuccess?.({
      bankName: selectedBank,
      accountNumber: `****${accountNumber.slice(-4)}`,
      accountName,
    });
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Change Bank Account"
      description="Update your payout account"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Current Account Box */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            CURRENT ACCOUNT
          </span>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
              <Landmark className="size-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">
                Access Bank · ****0476
              </h4>
              <p className="text-[11px] text-[#66738C]">
                Aminat Okafor · <span className="text-[#10B981] font-bold">Verified</span>
              </p>
            </div>
          </div>
        </div>

        {/* Enter New Account Details */}
        <div className="space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            ENTER NEW ACCOUNT DETAILS
          </span>

          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
          >
            {banks.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Account Number Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#66738C]">
              Account Number
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={10}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-2xl border-2 border-[#2563EB] bg-white py-2.5 px-4 text-sm font-bold text-[#0F152A] outline-none"
              />
              <span className="absolute right-3.5 top-3 text-[11px] font-bold text-[#2563EB]">
                {accountNumber.length}/10
              </span>
            </div>
          </div>
        </div>

        {/* Name Match Verified Box */}
        {accountNumber.length === 10 && (
          <div className="rounded-2xl border border-[#10B981]/20 bg-[#EBFFF8] p-3 text-xs text-[#10B981] font-bold flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
            <div>
              <h4>{accountName} · {selectedBank}</h4>
              <p className="text-[10px] font-medium text-[#10B981]">Name matches your profile</p>
            </div>
          </div>
        )}

        {/* Amber Notice */}
        <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3.5 text-[#D9990D] font-medium flex items-start gap-2.5">
          <AlertTriangle className="size-4 shrink-0 text-[#D9990D] mt-0.5" />
          <span>
            Account changes require PIN. Previous account replaced immediately.
            Pending payouts use new account.
          </span>
        </div>

        {/* PIN Confirmation */}
        <div className="space-y-1.5 text-center pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            ENTER PIN TO CONFIRM
          </label>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={(v) => setPin(v)}>
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={1} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={2} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={3} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={accountNumber.length < 10 || pin.length < 4}
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 disabled:opacity-50"
          >
            Save New Account
          </button>
        </div>
      </form>
    </AppModal>
  );
}
