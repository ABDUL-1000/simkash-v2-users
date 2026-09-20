import { useState } from "react";
import { Landmark, CheckCircle2, AlertCircle, Hourglass } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { INSTALLER_STATS } from "../data/installer.data";

interface RequestPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitSuccess: () => void;
}

export function RequestPayoutModal({
  open,
  onOpenChange,
  onSubmitSuccess,
}: RequestPayoutModalProps) {
  const [amount, setAmount] = useState<number>(INSTALLER_STATS.totalEarnings);
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);

  const presetAmounts = [
    { label: "₦50,000", value: 50000 },
    { label: "₦100,000", value: 100000 },
    { label: "₦200,000", value: 200000 },
    { label: "₦500,000", value: 500000 },
    { label: "₦960,000 (Full)", value: 960000 },
  ];

  const handlePinChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...pin];
    updated[index] = val;
    setPin(updated);

    if (val && index < 3) {
      const nextInput = document.getElementById(`payout-pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = () => {
    onOpenChange(false);
    onSubmitSuccess();
  };

  const walletAfter = Math.max(0, INSTALLER_STATS.totalEarnings - amount);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Request Payout"
      description="Withdraw your job earnings"
      actions={[
        {
          key: "cancel",
          label: "Cancel",
          variant: "secondary",
          onClick: () => onOpenChange(false),
        },
        {
          key: "submit",
          label: `Request ₦${amount.toLocaleString()}`,
          variant: "primary",
          style: { backgroundColor: "#EA580C", borderColor: "#EA580C", color: "#FFFFFF" },
          onClick: handleSubmit,
        },
      ]}
    >
      <div className="space-y-4 py-1">
        {/* Available to withdraw banner */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#EBFFF8] p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669]">
            Available to Withdraw
          </span>
          <div className="mt-1 text-2xl font-black text-[#059669] sm:text-3xl">
            ₦{INSTALLER_STATS.totalEarnings.toLocaleString()}.00
          </div>
          <div className="mt-2 flex items-start gap-1.5 text-xs text-[#D97706]">
            <Hourglass className="mt-0.5 size-3.5 shrink-0" />
            <span>
              ₦{INSTALLER_STATS.pendingEarnings.toLocaleString()} pending from 2 jobs awaiting verification — not yet available to withdraw
            </span>
          </div>
        </div>

        {/* Bank account selector */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#1F3A5F] text-white">
              <Landmark className="size-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F152A]">Access Bank · ****0476</div>
              <div className="text-[11px] text-[#8C909B]">Adeyemi Okafor · Verified ✓</div>
            </div>
          </div>
          <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
            Change
          </button>
        </div>

        {/* Withdrawal Amount Section */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#66738C]">
            Withdrawal Amount
          </label>
          <div className="relative mt-1.5">
            <input
              type="text"
              value={`₦ ${amount.toLocaleString()}`}
              onChange={(e) => {
                const numeric = Number(e.target.value.replace(/\D/g, ""));
                setAmount(numeric);
              }}
              className="w-full rounded-2xl border-2 border-[#10B981] bg-white py-2.5 pl-4 pr-10 text-base font-bold text-[#0F152A] outline-none"
            />
            <CheckCircle2 className="absolute right-3.5 top-1/2 size-5 -translate-y-1/2 text-[#10B981]" />
          </div>

          {/* Preset amount pills */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {presetAmounts.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setAmount(preset.value)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                  amount === preset.value
                    ? "border-[#10B981] bg-[#EBFFF8] text-[#059669]"
                    : "border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <div className="mt-1.5 text-[11px] text-[#8C909B]">
            Wallet after: ₦{walletAfter.toLocaleString()}
          </div>
        </div>

        {/* Admin Warning Alerts */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 rounded-xl bg-[#FFFBEB] p-3 text-xs text-[#D97706]">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>₦50,000+ requires admin approval. May take up to 24 hours.</span>
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-[#FFFBEB] p-3 text-xs text-[#D97706]">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>
              Only completed and verified job payments are available to withdraw. Pending verification jobs (₦{INSTALLER_STATS.pendingEarnings.toLocaleString()}) cannot be withdrawn yet.
            </span>
          </div>
        </div>

        {/* PIN Confirmation */}
        <div className="text-center pt-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#66738C]">
            Confirm with PIN
          </label>
          <div className="mt-2 flex justify-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <input
                key={i}
                id={`payout-pin-${i}`}
                type="password"
                maxLength={1}
                value={pin[i]}
                onChange={(e) => handlePinChange(i, e.target.value)}
                className="size-11 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-center text-lg font-black text-[#0F152A] outline-none transition focus:border-[#2563EB] focus:bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
