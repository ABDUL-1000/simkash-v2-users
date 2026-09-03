import { useState } from "react";
import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";

interface RequestLimitIncreaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentLimit?: number;
}

export function RequestLimitIncreaseModal({
  open,
  onOpenChange,
  currentLimit = 2000,
}: RequestLimitIncreaseModalProps) {
  const [requestedLimitStr, setRequestedLimitStr] = useState("5000");
  const [reason, setReason] = useState("Higher bill payments");
  const [income, setIncome] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const parsedLimit = parseInt(requestedLimitStr || "0", 10);

  const presetLimits = [
    { label: "₦5,000", val: 5000 },
    { label: "₦10,000", val: 10000 },
    { label: "₦20,000", val: 20000 },
  ];

  const handleSubmit = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "Current Limit", value: `₦${currentLimit.toLocaleString()}` },
    { label: "Requested Limit", value: `₦${parsedLimit.toLocaleString()}` },
    { label: "Reason", value: reason },
    { label: "Review Window", value: "24 – 48 Hours" },
    { label: "Notification", value: "SMS & Push Notification" },
  ];

  return (
    <>
      <AppModal
        open={open && !isSuccess}
        onOpenChange={handleClose}
        title="Request Credit Limit Increase"
        description={`Current limit: ₦${currentLimit.toLocaleString()}`}
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Current Limit Summary Box */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-2">
            <h4 className="font-extrabold text-sm text-[#0F152A]">
              Current Limit: ₦{currentLimit.toLocaleString()}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[#66738C]">
              <div>Used: <span className="font-bold text-[#0F152A]">₦1,000 (50%)</span></div>
              <div>On-time repayments: <span className="font-bold text-[#0F152A]">8 of 9</span></div>
              <div>Member since: <span className="font-bold text-[#0F152A]">Jan 2026</span></div>
            </div>
          </div>

          {/* Requested Limit Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              REQUESTED LIMIT
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-sm font-extrabold text-[#0F152A]">
                ₦
              </span>
              <input
                type="number"
                value={requestedLimitStr}
                onChange={(e) => setRequestedLimitStr(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-9 pr-4 text-sm font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          {/* Preset Chips */}
          <div className="flex flex-wrap gap-2">
            {presetLimits.map((item) => {
              const isSelected = parsedLimit === item.val;
              return (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setRequestedLimitStr(item.val.toString())}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    isSelected
                      ? "border border-[#F59E0B] bg-[#FFFBEB] text-[#D9990D]"
                      : "border border-[#E2ECF6] bg-[#F8FAFC] text-[#66738C] hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Reason Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Reason for increase
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none"
            >
              <option value="Higher bill payments">Higher bill payments</option>
              <option value="Increased monthly usage">Increased monthly usage</option>
              <option value="Business expenses">Business expenses</option>
              <option value="Emergency buffer">Emergency buffer</option>
            </select>
          </div>

          {/* Monthly Income Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              MONTHLY INCOME (OPTIONAL)
            </label>
            <input
              type="text"
              placeholder="₦ Enter amount"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none"
            />
            <p className="text-[10px] text-[#8C909B]">Helps us assess your request</p>
          </div>

          {/* Processing Note */}
          <div className="flex items-start gap-2.5 rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-3 text-xs text-[#2563EB]">
            <Info className="size-4 shrink-0 mt-0.5" />
            <p>
              Limit increase requests are reviewed within 24-48 hours. You'll be notified of the decision by SMS and push notification.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-[#0F152A] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800"
            >
              Submit Request
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && isSuccess}
        onOpenChange={handleClose}
        title="Limit Increase Requested!"
        subtitle="Your application has been received"
        details={successDetails}
        walletBalanceText="SimKash Credit Bureau"
        doneButtonText="Done"
        onDone={handleClose}
      />
    </>
  );
}
