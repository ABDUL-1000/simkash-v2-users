import { useState } from "react";
import { Copy, CreditCard, Landmark, PhoneCall } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface TopUpWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TopUpWalletModal({ open, onOpenChange }: TopUpWalletModalProps) {
  const [amount, setAmount] = useState<string>("0");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(500);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "ussd">("transfer");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const presets = [500, 1000, 2000, 5000, 10000];

  const handleSelectPreset = (val: number) => {
    setSelectedPreset(val);
    setAmount(val.toString());
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("7821456390");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Top Up Wallet"
      description="Add money to your Simkash wallet"
      size="md"
    >
      <div className="space-y-5">
        {/* Current Balance Box */}
        <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] p-4 text-sm">
          <span className="text-[#8C909B]">Current Balance</span>
          <span className="text-base font-bold text-[#0F152A]">₦50,000.00</span>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#8C909B]">
            AMOUNT
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl font-bold text-[#0F152A]">
              ₦
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setSelectedPreset(null);
              }}
              placeholder="0.00"
              className="w-full rounded-xl border border-[#E2ECF6] py-3 pl-9 pr-4 text-2xl font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {presets.map((val) => {
              const isSelected = selectedPreset === val;
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSelectPreset(val)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                    isSelected
                      ? "bg-[#2563EB] text-white"
                      : "bg-[#F8FAFC] text-[#0F152A] border border-[#E2ECF6] hover:bg-[#EFF4F8]"
                  }`}
                >
                  ₦{val.toLocaleString()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pay With Options */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#8C909B]">
            PAY WITH
          </label>

          {/* Card Option */}
          <div
            onClick={() => setPaymentMethod("card")}
            className={`cursor-pointer rounded-2xl border p-4 transition ${
              paymentMethod === "card"
                ? "border-[#2563EB] bg-white ring-1 ring-[#2563EB]"
                : "border-[#E2ECF6] bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#0F152A]">
                  <CreditCard className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F152A]">Debit / Credit Card</h4>
                  <p className="text-xs text-[#8C909B]">Visa, Mastercard, Verve</p>
                </div>
              </div>
              <input
                type="radio"
                name="paymethod"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="size-4 accent-[#2563EB]"
              />
            </div>
          </div>

          {/* Bank Transfer Option */}
          <div
            onClick={() => setPaymentMethod("transfer")}
            className={`cursor-pointer rounded-2xl border p-4 transition ${
              paymentMethod === "transfer"
                ? "border-[#2563EB] bg-white ring-1 ring-[#2563EB]"
                : "border-[#E2ECF6] bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#0F152A]">
                  <Landmark className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F152A]">Bank Transfer</h4>
                  <p className="text-xs text-[#8C909B]">Transfer to virtual account</p>
                </div>
              </div>
              <input
                type="radio"
                name="paymethod"
                checked={paymentMethod === "transfer"}
                onChange={() => setPaymentMethod("transfer")}
                className="size-4 accent-[#2563EB]"
              />
            </div>

            {/* Expanded Bank Transfer Details */}
            {paymentMethod === "transfer" && (
              <div className="mt-4 space-y-3 rounded-xl bg-[#F8FAFC] p-4 text-xs">
                <p className="text-[#8C909B]">
                  Transfer to the account below. Your wallet will be credited automatically.
                </p>

                <div className="flex justify-between">
                  <span className="text-[#8C909B]">Bank Name</span>
                  <span className="font-bold text-[#0F152A]">Wema Bank</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#8C909B]">Account Number</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#0F152A] text-sm">7821456390</span>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="text-[#2563EB] hover:text-blue-700"
                    >
                      <Copy className="size-3.5" />
                    </button>
                    {copied && <span className="text-[10px] text-green-600">Copied</span>}
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#8C909B]">Account Name</span>
                  <span className="font-bold text-[#0F152A]">Simkash/Yusuf Adam</span>
                </div>

                <p className="text-[11px] font-semibold text-[#F59E0B]">
                  This account expires in 30 minutes
                </p>
              </div>
            )}
          </div>

          {/* USSD Option */}
          <div
            onClick={() => setPaymentMethod("ussd")}
            className={`cursor-pointer rounded-2xl border p-4 transition ${
              paymentMethod === "ussd"
                ? "border-[#2563EB] bg-white ring-1 ring-[#2563EB]"
                : "border-[#E2ECF6] bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#0F152A]">
                  <PhoneCall className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F152A]">USSD</h4>
                  <p className="text-xs text-[#8C909B]">Dial from your phone</p>
                </div>
              </div>
              <input
                type="radio"
                name="paymethod"
                checked={paymentMethod === "ussd"}
                onChange={() => setPaymentMethod("ussd")}
                className="size-4 accent-[#2563EB]"
              />
            </div>

            {/* Expanded USSD Details */}
            {paymentMethod === "ussd" && (
              <div className="mt-4 space-y-3 rounded-xl bg-[#F8FAFC] p-4 text-xs">
                <p className="text-[#8C909B]">
                  Dial the USSD code below on your phone to complete the top-up.
                </p>

                <div className="space-y-1">
                  <label className="font-bold text-[#0F152A]">Select Your Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full rounded-lg border border-[#E2ECF6] bg-white p-2 text-xs font-semibold text-[#0F152A] outline-none"
                  >
                    <option value="">Choose a bank</option>
                    <option value="gtbank">GTBank (*737*...#)</option>
                    <option value="firstbank">FirstBank (*894*...#)</option>
                    <option value="zenith">Zenith Bank (*966*...#)</option>
                    <option value="access">Access Bank (*901*...#)</option>
                  </select>
                </div>

                <div className="text-center pt-2">
                  <span className="block text-[11px] text-[#8C909B]">Dial this code:</span>
                  <span className="mt-1 block text-lg font-bold text-[#0F152A]">
                    *737*50*{amount || "0"}#
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            Top Up ₦{Number(amount || 0).toLocaleString()}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
