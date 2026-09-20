import { useState } from "react";
import { Building2, Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RmRequestPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance?: number;
  onSuccess?: (details: { amount: number; bankName: string; accountNumber: string; ref: string }) => void;
}

export function RmRequestPayoutModal({
  open,
  onOpenChange,
  availableBalance = 84000,
  onSuccess,
}: RmRequestPayoutModalProps) {
  const [amount, setAmount] = useState<number | string>(availableBalance);
  const [selectedBank, setSelectedBank] = useState("access");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bankAccounts = [
    {
      id: "access",
      bankName: "Access Bank",
      accountNumber: "0123456789",
      accountName: "Yusuf Adam Baba",
    },
    {
      id: "gtb",
      bankName: "Guaranty Trust Bank",
      accountNumber: "0987654321",
      accountName: "Yusuf Adam Baba",
    },
  ];

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);

    if (val && index < 3) {
      const nextInput = document.getElementById(`payout-pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const chosenBank = bankAccounts.find((b) => b.id === selectedBank) || bankAccounts[0];
  const payoutAmount = Number(amount) || 0;

  const handleSubmit = () => {
    if (payoutAmount <= 0 || payoutAmount > availableBalance) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        amount: payoutAmount,
        bankName: chosenBank.bankName,
        accountNumber: chosenBank.accountNumber,
        ref: `PAY-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      setPin(["", "", "", ""]);
    }, 450);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Request Commission Payout"
      description="Withdraw earned network activation commission"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* BALANCE HERO CARD */}
        <div
          className="rounded-2xl border p-4 text-center space-y-1 shadow-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: APP_COLORS.texts.slate }}>
            Available for Payout
          </span>
          <div className="text-3xl font-black" style={{ color: APP_COLORS.greens.secondary }}>
            ₦{availableBalance.toLocaleString()}
          </div>
          <span className="text-[11px] font-medium block" style={{ color: APP_COLORS.texts.slate }}>
            Of ₦284,000 total earned this month (₦200,000 already paid)
          </span>
        </div>

        {/* AMOUNT INPUT */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              className="block text-[11px] font-bold tracking-wider uppercase"
              style={{ color: APP_COLORS.texts.slate }}
            >
              Payout Amount (₦)
            </label>
            <button
              type="button"
              onClick={() => setAmount(availableBalance)}
              className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Withdraw Max
            </button>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="e.g. 50000"
            className="w-full rounded-2xl border p-3 text-sm font-bold focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>

        {/* SELECT DESTINATION BANK */}
        <div className="space-y-2">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Destination Bank Account
          </label>
          <div className="space-y-2">
            {bankAccounts.map((b) => {
              const isSelected = selectedBank === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBank(b.id)}
                  className="flex items-center justify-between rounded-2xl border p-3 transition cursor-pointer"
                  style={{
                    borderColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.greys.stroke,
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.surfaceLight
                      : APP_COLORS.backgrounds.background,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-9 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: isSelected ? "#DBEAFE" : APP_COLORS.backgrounds.surface,
                        color: isSelected ? APP_COLORS.blues.interactiveCta : APP_COLORS.texts.slate,
                      }}
                    >
                      <Building2 className="size-4" />
                    </div>
                    <div>
                      <span className="font-bold block text-xs" style={{ color: APP_COLORS.texts.primary }}>
                        {b.bankName}
                      </span>
                      <span className="text-[11px]" style={{ color: APP_COLORS.texts.slate }}>
                        {b.accountNumber} · {b.accountName}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div
                      className="flex size-5 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
                    >
                      <Check className="size-3 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4-BOX PIN */}
        <div className="space-y-1.5 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Security PIN to Authorize
          </label>
          <div className="flex items-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                id={`payout-pin-${i}`}
                type="password"
                maxLength={1}
                value={pin[i]}
                onChange={(e) => handlePinChange(i, e.target.value)}
                className="size-11 rounded-2xl border text-center text-lg font-black focus:outline-hidden transition"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  backgroundColor: APP_COLORS.backgrounds.surface,
                  color: APP_COLORS.texts.primary,
                }}
              />
            ))}
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div
          className="flex items-center justify-end gap-3 pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-semibold transition hover:opacity-80 cursor-pointer"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting || payoutAmount <= 0 || payoutAmount > availableBalance}
            onClick={handleSubmit}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: "#D97706" }}
          >
            {isSubmitting ? "Processing..." : `Request ₦${payoutAmount.toLocaleString()}`}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default RmRequestPayoutModal;
