import React, { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowRight, Wallet, Landmark, CreditCard } from "lucide-react";
import { colors } from "@/constants/colors";
import { investmentSummaryData } from "../../data/mockInvestmentData";

interface BalancePayoffFormProps {
  onSubmitPayment: (data: { amount: number; source: string; pin: string }) => void;
}

export const BalancePayoffForm: React.FC<BalancePayoffFormProps> = ({
  onSubmitPayment,
}) => {
  const { remainingBalance, walletAvailable } = investmentSummaryData;
  const [amount, setAmount] = useState<number>(5_000_000);
  const [source, setSource] = useState<string>("wallet");
  const [pin, setPin] = useState<string>("");

  const newBalance = Math.max(0, remainingBalance - amount);
  const newProgressPercent = Math.min(
    100,
    Math.round(((50_000_000 - newBalance) / 50_000_000) * 100)
  );

  const quickPills = [
    { label: "₦1,000,000", val: 1_000_000 }, { label: "₦2,500,000", val: 2_500_000 },
    { label: "₦5,000,000", val: 5_000_000 }, { label: "Full Balance (₦15M)", val: remainingBalance },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || pin.length < 4) return;
    onSubmitPayment({ amount, source, pin });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-5">
      {/* Amount Input */}
      <div>
        <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
          1. Enter Paydown Amount (₦)
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">
            ₦
          </span>
          <input
            type="number"
            min={100_000}
            max={remainingBalance}
            step={100_000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Quick select pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {quickPills.map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => setAmount(pill.val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                amount === pill.val
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Source */}
      <div>
        <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-2">
          2. Select Payment Source
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            onClick={() => setSource("wallet")}
            className={`p-3 rounded-xl border cursor-pointer transition ${
              source === "wallet"
                ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-gray-900">Wallet Balance</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">
              ₦{walletAvailable.toLocaleString()} Avail.
            </p>
          </div>

          <div
            onClick={() => setSource("bank-transfer")}
            className={`p-3 rounded-xl border cursor-pointer transition ${
              source === "bank-transfer"
                ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-gray-700" />
              <span className="text-xs font-bold text-gray-900">Direct Bank Wire</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Virtual Dedicated Acct</p>
          </div>

          <div
            onClick={() => setSource("card")}
            className={`p-3 rounded-xl border cursor-pointer transition ${
              source === "card"
                ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600/20"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-700" />
              <span className="text-xs font-bold text-gray-900">Corporate Card</span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1">Mastercard / Visa</p>
          </div>
        </div>
      </div>

      {/* Live Payoff Impact Box */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
        <div className="flex justify-between text-gray-600">
          <span>Current Debt:</span>
          <span className="font-bold text-gray-900">₦{remainingBalance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-emerald-700 font-semibold">
          <span>Payment Deduction:</span>
          <span>-₦{amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between pt-1.5 border-t border-slate-200">
          <span className="font-bold text-gray-900">New Outstanding:</span>
          <span className="font-extrabold text-blue-600">
            ₦{newBalance.toLocaleString()} ({newProgressPercent}% Paid)
          </span>
        </div>
      </div>

      {/* Security PIN */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block">
          3. Security Transaction PIN
        </label>
        <div className="flex">
          <InputOTP
            maxLength={4}
            value={pin}
            onChange={setPin}
            containerClassName="gap-2.5"
          >
            <InputOTPGroup className="gap-2.5">
              <InputOTPSlot
                index={0}
                className="size-11 rounded-xl border border-gray-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
              />
              <InputOTPSlot
                index={1}
                className="size-11 rounded-xl border border-gray-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
              />
              <InputOTPSlot
                index={2}
                className="size-11 rounded-xl border border-gray-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
              />
              <InputOTPSlot
                index={3}
                className="size-11 rounded-xl border border-gray-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-blue-600 data-[active=true]:ring-2 data-[active=true]:ring-blue-600/20"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <button
        type="submit"
        disabled={amount <= 0 || pin.length < 4 || amount > remainingBalance}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
        style={{ backgroundColor: colors.primary }}
      >
        <span>Submit Balance Payment</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};
