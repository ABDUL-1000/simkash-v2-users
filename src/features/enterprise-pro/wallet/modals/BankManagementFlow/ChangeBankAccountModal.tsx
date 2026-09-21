import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Building2, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";
import { mockBankAccount } from "../../data/mockWalletData";

interface ChangeBankAccountModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (bank: string, acctNo: string, acctName: string) => void;
}

const NIGERIAN_BANKS = [
  "Access Bank",
  "Zenith Bank",
  "Guaranty Trust Bank (GTB)",
  "First Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Stanbic IBTC",
  "Fidelity Bank",
];

export const ChangeBankAccountModal: React.FC<ChangeBankAccountModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [bank, setBank] = useState("Zenith Bank");
  const [accountNumber, setAccountNumber] = useState("2048914582");
  const [accountName, setAccountName] = useState("Zenith Corp Ltd");
  const [pin, setPin] = useState("");

  const handleAccountChange = (val: string) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 10);
    setAccountNumber(cleaned);
    if (cleaned.length === 10) {
      setAccountName("Zenith Corp Ltd");
    } else {
      setAccountName("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountNumber.length === 10 && accountName && pin.length >= 4) {
      onSubmit(bank, accountNumber, accountName);
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Change Payout Bank Account"
      description="Update your corporate settlement account for Enterprise Pro earnings withdrawals."
      size="md"
      footer={null}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {/* Current Account Strip */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-500" />
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">CURRENT ACTIVE ACCOUNT</span>
              <span className="text-xs font-bold text-slate-800">
                {mockBankAccount.bankName} · {mockBankAccount.accountNumberMask} ({mockBankAccount.accountName})
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </span>
        </div>

        {/* Bank Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Select Bank</label>
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {NIGERIAN_BANKS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Account Number (10 Digits)
          </label>
          <input
            type="text"
            maxLength={10}
            value={accountNumber}
            onChange={(e) => handleAccountChange(e.target.value)}
            className="w-full px-3 py-2 text-sm font-mono font-bold tracking-wider rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0123456789"
            required
          />
        </div>

        {/* Account Name resolution */}
        {accountName ? (
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[10px] text-emerald-600 font-semibold">VERIFIED ACCOUNT NAME</div>
                <div className="font-bold">{accountName}</div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700">NIBSS Validated</span>
          </div>
        ) : null}

        {/* Admin Review Warning */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Compliance Verification Notice:</span> To safeguard corporate payouts,
            new settlement accounts undergo a 24–48 hour audit by Simkash Compliance before activation.
          </div>
        </div>

        {/* PIN Input */}
        <div className="space-y-2 text-center pt-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            AUTHORIZE WITH TRANSACTION PIN
          </label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={(val) => setPin(val)}
              containerClassName="gap-2.5"
            >
              <InputOTPGroup className="gap-2.5">
                <InputOTPSlot
                  index={0}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
                <InputOTPSlot
                  index={1}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
                <InputOTPSlot
                  index={2}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
                <InputOTPSlot
                  index={3}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={accountNumber.length !== 10 || !accountName || pin.length < 4}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-sm flex items-center gap-1.5 transition"
          >
            Submit for Review
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </AppModal>
  );
};
