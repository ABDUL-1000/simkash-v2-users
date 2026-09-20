import { useState } from "react";
import { Landmark, Check, AlertTriangle, CreditCard, Users } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface CaRequestPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance?: number;
  onSuccess?: (details: {
    amount: number;
    bankName: string;
    accountNumber: string;
    ref: string;
  }) => void;
}

export function CaRequestPayoutModal({
  open,
  onOpenChange,
  availableBalance = 284700,
  onSuccess,
}: CaRequestPayoutModalProps) {
  const [amount, setAmount] = useState<number>(availableBalance);
  const [pin, setPin] = useState(["●", "●", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bank = {
    bankName: "Access Bank",
    accountMasked: "****0476",
    accountName: "Femi Enterprises",
    verified: true,
  };

  const presetAmounts = [
    { label: "₦50,000", value: 50000 },
    { label: "₦100,000", value: 100000 },
    { label: "₦150,000", value: 150000 },
    { label: "₦284,700 (Full)", value: 284700 },
  ];

  const handlePinInput = (index: number, val: string) => {
    const newPin = [...pin];
    newPin[index] = val ? "●" : "";
    setPin(newPin);

    if (val && index < 3) {
      const next = document.getElementById(`ca-payout-pin-box-${index + 1}`);
      next?.focus();
    }
  };

  const walletAfter = Math.max(0, availableBalance - amount);

  const handleSubmit = () => {
    if (amount <= 0 || amount > availableBalance) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        amount,
        bankName: bank.bankName,
        accountNumber: "0123450476",
        ref: `PAY-CA-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    }, 450);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Request Payout"
      description="Withdraw your commission earnings"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* AVAILABLE TO WITHDRAW HERO BOX */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
            Available to Withdraw
          </span>
          <div className="text-3xl font-black text-emerald-600 tracking-tight">
            ₦{availableBalance.toLocaleString()}.00
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-blue-500" />
              <span>
                My activations:{" "}
                <strong className="text-slate-800">₦187,200</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                AP network:{" "}
                <strong className="text-slate-800">₦97,500</strong>
              </span>
            </div>
          </div>
        </div>

        {/* BANK ACCOUNT CARD */}
        <div
          className="p-3.5 rounded-2xl border flex items-center justify-between bg-white"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs">
                {bank.bankName} • {bank.accountMasked}
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <span>{bank.accountName}</span>
                <span>•</span>
                <span className="text-slate-600 font-medium">Verified</span>
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Change
          </button>
        </div>

        {/* WITHDRAWAL AMOUNT SECTION */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Withdrawal Amount
          </span>

          <div className="relative">
            <div className="w-full px-4 py-3 rounded-2xl border-2 border-emerald-500 flex items-center text-xl font-black text-slate-900 bg-white">
              <span className="text-slate-700 mr-2">₦</span>
              <input
                type="text"
                value={amount.toLocaleString()}
                onChange={(e) => {
                  const raw = Number(e.target.value.replace(/[^0-9]/g, "")) || 0;
                  setAmount(raw);
                }}
                className="w-full outline-none font-black bg-transparent"
              />
            </div>
          </div>

          {/* PRESET CHIPS */}
          <div className="flex flex-wrap gap-2 pt-1">
            {presetAmounts.map((chip) => {
              const isSelected = amount === chip.value;
              return (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => setAmount(chip.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Valid amount
            </span>
            <span className="text-slate-500">
              Wallet after:{" "}
              <strong className="text-slate-800">
                ₦{walletAfter.toLocaleString()}
              </strong>
            </span>
          </div>
        </div>

        {/* APPROVAL NOTICE */}
        <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100/80 flex items-center gap-2 text-xs text-amber-800 font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            ₦50,000+ requires admin approval. May take up to 24 hours.
          </span>
        </div>

        {/* ENTER PIN */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Enter PIN
          </span>
          <div className="flex items-center justify-center gap-3 py-1">
            {pin.map((p, i) => (
              <input
                key={i}
                id={`ca-payout-pin-box-${i}`}
                type="password"
                maxLength={1}
                value={p}
                onChange={(e) => handlePinInput(i, e.target.value)}
                className="w-12 h-12 rounded-2xl border border-slate-200 text-center text-lg font-black bg-white focus:border-blue-500 outline-none transition-colors"
              />
            ))}
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || amount <= 0}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50"
            style={{ backgroundColor: "#EA580C" }}
          >
            {isSubmitting ? "Processing..." : `Request ₦${amount.toLocaleString()}`}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
