import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { colors } from "@/constants/colors";
import { formatNaira } from "../utils/formatters";
import { Calendar, AlertTriangle, Check } from "lucide-react";
import { toast } from "sonner";

interface PayDownBalanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentSuccess?: (paidAmount: number) => void;
}

const PRESET_AMOUNTS = [500000, 1000000, 2000000, 2847000];

export function PayDownBalanceModal({ open, onOpenChange, onPaymentSuccess }: PayDownBalanceModalProps) {
  const initialBalance = 7500000;
  const initialWallet = 2847000;
  const [paymentAmount, setPaymentAmount] = useState(2847000);
  const [pin, setPin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const balanceAfter = Math.max(0, initialBalance - paymentAmount);
  const walletAfter = Math.max(0, initialWallet - paymentAmount);
  const percentPaidAfter = (((15000000 - balanceAfter) / 15000000) * 100).toFixed(1);

  const handlePay = () => {
    if (paymentAmount <= 0 || pin.length < 4) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Successfully paid ${formatNaira(paymentAmount)} toward debt balance`);
      onPaymentSuccess?.(paymentAmount);
      onOpenChange(false);
      setPin("");
    }, 600);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Pay Down Balance"
      description="Reduce your remaining ₦7,500,000"
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      <div className="space-y-3.5 pt-1 text-xs">
        {/* Balance Remaining Card */}
        <div className="rounded-2xl border p-3 bg-amber-50/80 border-amber-200">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] uppercase font-bold text-amber-800">Balance Remaining</span>
            <span className="text-xl font-black text-amber-700">₦7,500,000</span>
          </div>
          <p className="text-[10px] text-amber-800/80">50% of ₦15,000,000 initial investment</p>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-900 overflow-hidden flex">
            <div className="h-full bg-emerald-500" style={{ width: "50%" }} />
            <div className="h-full bg-amber-500" style={{ width: "50%" }} />
          </div>
          <div className="flex justify-between text-[10px] font-semibold mt-1">
            <span className="text-emerald-700">Paid: ₦7,500,000</span>
            <span className="text-amber-800">Owed: ₦7,500,000</span>
          </div>
        </div>

        {/* Available In Wallet */}
        <div className="rounded-2xl border p-3 bg-emerald-50/70 border-emerald-200 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-emerald-800">Available In Wallet</p>
            <p className="text-lg font-black text-emerald-600 mt-0.5">₦2,847,000</p>
            <p className="text-[10px] text-emerald-700/80">Maximum you can pay now</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
            Active
          </span>
        </div>

        {/* How much to pay? */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700">How much to pay?</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-500">₦</span>
            <input
              type="text"
              readOnly
              value={paymentAmount.toLocaleString()}
              className="w-full rounded-xl border border-emerald-500 bg-white py-2.5 pl-8 pr-10 text-sm font-bold text-slate-900 outline-none"
            />
            <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-emerald-600" />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setPaymentAmount(amt)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  paymentAmount === amt
                    ? "border border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {formatNaira(amt)} {amt === 2847000 ? "(Full)" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Preview */}
        <div className="rounded-2xl border p-3 bg-slate-50 border-slate-200 space-y-1.5">
          <p className="font-bold text-slate-800">Payment Preview</p>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Balance before</span>
              <span className="font-semibold text-slate-900">{formatNaira(initialBalance)}</span>
            </div>
            <div className="flex justify-between text-red-600 font-semibold">
              <span>This payment</span>
              <span>-{formatNaira(paymentAmount)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold border-t pt-1">
              <span>Balance after ({percentPaidAfter}% cleared)</span>
              <span>{formatNaira(balanceAfter)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Wallet remaining</span>
              <span className="font-bold text-amber-600">{formatNaira(walletAfter)}</span>
            </div>
          </div>

          <div className="mt-2 p-2 rounded-xl bg-emerald-100/70 text-emerald-900 text-[11px] flex items-center gap-2">
            <Calendar className="size-4 shrink-0 text-emerald-700" />
            <span>At ~₦2.8M/mo earning pace, {formatNaira(balanceAfter)} clears in ~1.7 months.</span>
          </div>
          {walletAfter === 0 && (
            <div className="p-2 rounded-xl bg-amber-100/70 text-amber-900 text-[11px] flex items-center gap-2">
              <AlertTriangle className="size-4 shrink-0 text-amber-700" />
              <span>Wallet will be empty after this payment.</span>
            </div>
          )}
        </div>

        {/* Enter Transaction PIN */}
        <div className="space-y-2 text-center pt-1">
          <p className="font-bold uppercase text-[10px] tracking-wider text-slate-500">Enter Transaction PIN</p>
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={setPin}
              containerClassName="gap-2.5"
            >
              <InputOTPGroup className="gap-2.5">
                <InputOTPSlot
                  index={0}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={1}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={2}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={3}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: colors.border }}>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={handlePay}
            className="rounded-xl px-5 py-2.5 text-xs font-bold text-white transition hover:opacity-90 bg-amber-500 hover:bg-amber-600 shadow-sm"
          >
            {isProcessing ? "Processing..." : `Pay ${formatNaira(paymentAmount)} Now`}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
