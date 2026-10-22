import { useState } from "react";
import { Clock } from "lucide-react";
import { TransactionSuccessModal } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { useCheckPayLaterEligibility } from "../api/usePayLater";
import type { PayLaterEligibilityResult, PayLaterOnboarding } from "../types/api";

/** Shown until the user has a credit limit. "Check Eligibility" uses GET, or POST with a requested limit when one is entered. */
export function PayLaterOnboardingCard({ onboarding }: { onboarding: PayLaterOnboarding }) {
  const [requestedLimit, setRequestedLimit] = useState("");
  const [result, setResult] = useState<PayLaterEligibilityResult | null>(null);
  const [declined, setDeclined] = useState("");
  const check = useCheckPayLaterEligibility();
  const limit = parseInt(requestedLimit || "0", 10);

  const run = () => check.mutate(limit > 0 ? limit : undefined, {
    onSuccess: data => data.eligible ? setResult(data) : setDeclined(data.message),
    onError: error => setDeclined(error.message),
  });

  return (
    <>
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFFBEB] text-[#F59E0B]">
            <Clock className="size-6" />
          </div>
          <div className="space-y-1">
            <span className="inline-block rounded-full bg-[#FFFBEB] px-3 py-1 text-[10px] font-bold text-[#D9990D]">{onboarding.status_label}</span>
            <h2 className="text-lg font-extrabold text-[#0F152A]">Get started with PayLater</h2>
            <p className="text-xs leading-relaxed text-[#66738C]">{onboarding.message}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">REQUESTED LIMIT (OPTIONAL)</label>
          <div className="relative max-w-sm">
            <span className="absolute left-4 top-3 text-sm font-extrabold text-[#0F152A]">₦</span>
            <input type="number" value={requestedLimit} onChange={event => setRequestedLimit(event.target.value.replace(/\D/g, ""))} placeholder="Leave blank to let Simkash decide"
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-9 pr-4 text-sm font-bold text-[#0F152A] outline-none focus:border-[#2563EB]" />
          </div>
        </div>

        <button type="button" onClick={run} disabled={check.isPending} className="rounded-xl bg-[#F59E0B] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600 disabled:opacity-50">
          {check.isPending ? "Checking..." : onboarding.cta_button_text || "Check Eligibility"}
        </button>
      </div>

      <TransactionSuccessModal
        open={Boolean(result)}
        onOpenChange={() => setResult(null)}
        title="PayLater Activated!"
        subtitle={result?.message ?? ""}
        details={[
          { label: "Credit Limit", value: result?.credit_limit_formatted ?? "—" },
          ...(result?.account ? [{ label: "Available Credit", value: result.account.available_credit_formatted }] : []),
        ]}
        walletBalanceText="You can now pay bills on credit"
        doneButtonText="Start Using PayLater"
        onDone={() => setResult(null)}
      />
      <TransactionFailureModal
        open={Boolean(declined)}
        onOpenChange={() => setDeclined("")}
        title="Not Eligible Yet"
        subtitle="Keep using your wallet to unlock PayLater credit."
        reason={declined}
        tryAgainButtonText="Try Again"
        cancelButtonText="Close"
        onTryAgain={() => { setDeclined(""); run(); }}
        onCancel={() => setDeclined("")}
      />
    </>
  );
}
