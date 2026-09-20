import { useState } from "react";
import { Clock, CheckCircle2, Coins, Wallet } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RenewSimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerName?: string;
  simNumber?: string;
  simType?: string;
  expiryDate?: string;
  onSuccess?: () => void;
}

interface PlanOption {
  id: string;
  days: string;
  price: string;
  rawPrice: number;
  newExpiry: string;
  badge?: string;
}

const PLANS: PlanOption[] = [
  {
    id: "30d",
    days: "30 Days",
    price: "₦5,000",
    rawPrice: 5000,
    newExpiry: "26 Aug 2026",
  },
  {
    id: "60d",
    days: "60 Days",
    price: "₦9,500",
    rawPrice: 9500,
    newExpiry: "25 Sep 2026",
  },
  {
    id: "90d",
    days: "90 Days",
    price: "₦13,500",
    rawPrice: 13500,
    newExpiry: "24 Oct 2026",
    badge: "BEST VALUE",
  },
];

export function RenewSimModal({
  open,
  onOpenChange,
  customerName = "Chidi Eze",
  simNumber = "07022222222",
  simType = "POS",
  expiryDate = "26 Jun 2026",
  onSuccess,
}: RenewSimModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("30d");
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const activePlan = PLANS.find((p) => p.id === selectedPlan) || PLANS[0];

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`renew-pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`renew-pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleRenew = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess?.();
    }, 800);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setPin(["", "", "", ""]);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSuccess ? "Renewal Successful!" : "Renew SIM"}
      description={
        isSuccess
          ? "SIM subscription renewed successfully"
          : `${customerName} · ${simNumber} · ${simType} SIM`
      }
      size="md"
      showCloseButton={true}
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0F152A]">SIM Renewed Successfully!</h3>
            <p className="mt-1 text-xs text-[#66738C]">
              {customerName}&apos;s subscription has been extended with the {activePlan.days} plan.
            </p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-[#8C909B]">New Expiry Date</span>
              <span className="font-bold text-[#10B981]">{activePlan.newExpiry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Amount Charged</span>
              <span className="font-black text-[#0F152A]">{activePlan.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Commission Earned</span>
              <span className="font-black text-[#10B981]">+₦1,000</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#10B981] py-2.5 text-xs font-bold text-white transition hover:bg-[#059669]"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-1 text-xs">
          {/* Expiry Alert Banner */}
          <div className="flex items-center gap-3 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 text-[#854D0E]">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow-xs">
              <Clock className="size-4 text-[#F59E0B]" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#0F152A]">
                Expires in 3 days · {expiryDate}
              </h4>
              <p className="text-[11px] text-[#854D0E] font-medium">
                Renew now to keep customer active
              </p>
            </div>
          </div>

          {/* Select Renewal Plan */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              Select Renewal Plan
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative rounded-2xl p-3 text-left transition-all border ${
                      isSelected
                        ? "border-[#2563EB] bg-[#EFF6FF] ring-2 ring-[#2563EB]/20"
                        : "border-[#E2ECF6] bg-white hover:border-[#CBD5E1]"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-2.5 right-2 rounded-full bg-[#10B981] px-2 py-0.5 text-[8px] font-black uppercase text-white shadow-xs">
                        {plan.badge}
                      </span>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0F152A]">{plan.days}</span>
                      {isSelected && <CheckCircle2 className="size-4 text-[#2563EB]" />}
                    </div>

                    <p className="mt-1 text-base font-black text-[#0F152A]">{plan.price}</p>
                    <p className="mt-1 text-[10px] text-[#66738C] font-medium">
                      New expiry: {plan.newExpiry}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Commission Pill */}
          <div className="flex items-center gap-2 rounded-xl bg-[#EBFFF8] p-3 text-[#10B981]">
            <Coins className="size-4 text-[#10B981] shrink-0" />
            <span className="text-xs font-bold">You earn +₦1,000 commission on this renewal</span>
          </div>

          {/* Payment Source */}
          <div className="flex items-center gap-2.5 rounded-xl bg-[#F8FAFC] p-3 text-[#66738C] border border-[#E2ECF6]">
            <Wallet className="size-4 text-[#66738C]" />
            <span className="text-xs font-medium text-[#0F152A]">Charged to customer</span>
          </div>

          {/* PIN Entry */}
          <div className="space-y-2 pt-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              Enter PIN to Renew
            </label>
            <div className="flex justify-center gap-3">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  id={`renew-pin-${i}`}
                  type="password"
                  maxLength={1}
                  value={pin[i]}
                  onChange={(e) => handlePinChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="size-11 rounded-xl border border-[#CBD5E1] bg-white text-center text-lg font-black text-[#0F152A] shadow-xs focus:border-[#2563EB] focus:outline-hidden focus:ring-2 focus:ring-[#2563EB]/20"
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] transition hover:bg-[#F1F5F9]"
            >
              ← Back
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleRenew}
              className="inline-flex items-center justify-center rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-black text-white shadow-xs transition hover:bg-[#059669] disabled:opacity-50"
              style={{ backgroundColor: APP_COLORS.greens.green }}
            >
              {isSubmitting ? "Processing..." : `Renew — ${activePlan.price}`}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}

export default RenewSimModal;
