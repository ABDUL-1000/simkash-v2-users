import { useState } from "react";
import { Edit2, Landmark } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useScRequestPayout } from "../api/mutations";
import type { ScPayoutResult } from "../types/requests";

interface ScRequestPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** balance_card.commission_balance from GET /state-coordinator/wallet/overview. */
  available: number;
  pendingLabel?: string;
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  } | null;
  onChangeBankClick?: () => void;
  onSuccess?: (result: ScPayoutResult) => void;
}

export function ScRequestPayoutModal({
  open,
  onOpenChange,
  available,
  pendingLabel,
  bankAccount,
  onChangeBankClick,
  onSuccess,
}: ScRequestPayoutModalProps) {
  const payout = useScRequestPayout("wallet");
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>("");

  const presetAmounts = [10000, 20000, 30000]
    .filter((val) => val < available)
    .map((val) => ({ label: `₦${val.toLocaleString()}`, val }))
    .concat(available > 0 ? [{ label: `₦${available.toLocaleString()} (Full)`, val: available }] : []);

  const numericAmount = Number(withdrawalAmount) || 0;
  const walletAfter = Math.max(0, available - numericAmount);
  const canSubmit = numericAmount > 0 && numericAmount <= available && Boolean(bankAccount) && !payout.isPending;

  const close = (value: boolean) => {
    if (payout.isPending) return;
    if (!value) { setWithdrawalAmount(""); payout.reset(); }
    onOpenChange(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    payout.mutate({ amount: numericAmount }, {
      onSuccess: (response) => {
        setWithdrawalAmount("");
        onOpenChange(false);
        onSuccess?.(response.data as ScPayoutResult);
      },
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={close}
      title="Request Payout"
      description="Withdraw your commission earnings"
      size="md"
      showCloseButton={!payout.isPending}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Available to Withdraw Light Green Card */}
        <div className="rounded-2xl border border-[#10B981]/20 bg-[#EBFFF8] p-4 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#10B981]">
            AVAILABLE TO WITHDRAW
          </span>
          <h2 className="text-3xl font-black text-[#10B981]">
            ₦{available.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
          {pendingLabel && <p className="text-[11px] text-[#0F152A] font-medium">{pendingLabel}</p>}
        </div>

        {/* Bank Account Selector Card */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
              <Landmark className="size-4" />
            </div>
            {bankAccount ? <div>
              <h4 className="font-extrabold text-[#0F152A]">
                {bankAccount.bankName} · {bankAccount.accountNumber}
              </h4>
              <p className="text-[11px] text-[#66738C] flex items-center gap-1 font-medium">
                {bankAccount.accountName}
              </p>
            </div> : <p className="text-[11px] font-semibold text-[#D9990D]">No payout account yet — add one to request a payout.</p>}
          </div>
          <button
            type="button"
            onClick={() => {
              close(false);
              onChangeBankClick?.();
            }}
            className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
          >
            <span>{bankAccount ? "Change" : "Add"}</span> <Edit2 className="size-3" />
          </button>
        </div>

        {/* Withdrawal Amount Input Box */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            WITHDRAWAL AMOUNT
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-2xl font-black text-[#8C909B]">
              ₦
            </span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-2xl border-2 border-[#10B981] bg-white py-2.5 pl-10 pr-4 text-2xl font-black text-[#0F152A] outline-none"
            />
          </div>

          {/* Preset Pills */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {presetAmounts.map((preset) => {
              const isSelected = numericAmount === preset.val;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setWithdrawalAmount(String(preset.val))}
                  className={`rounded-full px-3.5 py-1 text-xs font-bold transition ${
                    isSelected
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {numericAmount > available
            ? <p className="text-[11px] text-[#EF4444] font-semibold px-1">Amount exceeds your available balance.</p>
            : <p className="text-[11px] text-[#8C909B] font-medium px-1">
              Wallet after: <strong>₦{walletAfter.toLocaleString()}</strong>
            </p>}
        </div>

        {/* "Auto-approved / 4 hours" banners and the PIN step are omitted:
            POST /state-coordinator/wallet/request-payout takes { amount } only and returns a pending payout. */}
        {payout.error && <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-[#EF4444] font-medium">{payout.error.message}</div>}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            disabled={payout.isPending}
            onClick={() => close(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-xl bg-[#F59E0B] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600 disabled:opacity-50"
          >
            {payout.isPending ? "Processing…" : `Request ₦${numericAmount.toLocaleString()}`}
          </button>
        </div>
      </form>
    </AppModal>
  );
}
