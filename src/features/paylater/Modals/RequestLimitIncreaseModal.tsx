import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { useApplyPayLater } from "../api/usePayLater";
import type { PayLaterAccount, PayLaterEligibilityResult } from "../types/api";

interface RequestLimitIncreaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account?: PayLaterAccount;
  onTimeRatioText?: string;
}

export function RequestLimitIncreaseModal({ open, onOpenChange, account, onTimeRatioText }: RequestLimitIncreaseModalProps) {
  const currentLimit = account?.credit_limit ?? 0;
  const [requestedLimitStr, setRequestedLimitStr] = useState("");
  const [result, setResult] = useState<PayLaterEligibilityResult | null>(null);
  const [failureReason, setFailureReason] = useState("");
  const apply = useApplyPayLater();

  const parsedLimit = parseInt(requestedLimitStr || "0", 10);
  const usedPercent = currentLimit > 0 ? Math.round((account?.used_credit ?? 0) / currentLimit * 100) : 0;
  const memberSince = account?.createdAt ? new Date(account.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : null;

  // Presets step up from the current limit.
  const presetLimits = [5000, 10000, 20000, 50000, 100000].filter(value => value > currentLimit).slice(0, 3).map(val => ({ label: `₦${val.toLocaleString()}`, val }));

  const handleSubmit = () => {
    apply.mutate(parsedLimit, {
      onSuccess: data => data.eligible ? setResult(data) : setFailureReason(data.message),
      onError: error => setFailureReason(error.message),
    });
  };

  const handleClose = () => {
    setResult(null);
    setFailureReason("");
    setRequestedLimitStr("");
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "Previous Limit", value: `₦${currentLimit.toLocaleString()}` },
    { label: "Requested Limit", value: `₦${parsedLimit.toLocaleString()}` },
    { label: "Approved Limit", value: result?.credit_limit_formatted ?? "—" },
    ...(result?.account ? [{ label: "Available Credit", value: result.account.available_credit_formatted }] : []),
  ];

  return (
    <>
      <AppModal
        open={open && !result && !failureReason}
        onOpenChange={handleClose}
        title="Request Credit Limit Increase"
        description={`Current limit: ${account?.credit_limit_formatted ?? "—"}`}
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Current Limit Summary Box */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-2">
            <h4 className="font-extrabold text-sm text-[#0F152A]">
              Current Limit: {account?.credit_limit_formatted ?? "—"}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[#66738C]">
              <div>Used: <span className="font-bold text-[#0F152A]">{account?.used_credit_formatted ?? "—"} ({usedPercent}%)</span></div>
              {onTimeRatioText && <div>On-time repayments: <span className="font-bold text-[#0F152A]">{onTimeRatioText}</span></div>}
              {memberSince && <div>Member since: <span className="font-bold text-[#0F152A]">{memberSince}</span></div>}
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
                onChange={(e) => setRequestedLimitStr(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-9 pr-4 text-sm font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
            </div>
            {parsedLimit > 0 && parsedLimit <= currentLimit && <p className="text-[10px] text-[#EF4444]">Enter an amount above your current limit.</p>}
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

          {/* "Reason for increase", "Monthly income" and the 24–48h review note are disabled:
              POST /paylater/apply only accepts requestedLimit and returns its decision immediately. */}

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
              disabled={parsedLimit <= currentLimit || apply.isPending}
              className="rounded-xl bg-[#0F152A] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 disabled:opacity-50"
            >
              {apply.isPending ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && Boolean(result)}
        onOpenChange={handleClose}
        title="Credit Limit Updated!"
        subtitle={result?.message ?? ""}
        details={successDetails}
        walletBalanceText={`New limit: ${result?.credit_limit_formatted ?? "—"}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* Declined / error */}
      <TransactionFailureModal
        open={open && Boolean(failureReason)}
        onOpenChange={handleClose}
        title="Limit Increase Not Approved"
        subtitle="Your current credit limit is unchanged."
        reason={failureReason}
        tryAgainButtonText="Try Again"
        cancelButtonText="Close"
        onTryAgain={() => setFailureReason("")}
        onCancel={handleClose}
      />
    </>
  );
}
