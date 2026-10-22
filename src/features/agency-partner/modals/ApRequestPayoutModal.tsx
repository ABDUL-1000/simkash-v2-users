import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useGetPartnerPayoutAccount, useGetPartnerWallet, useRequestPartnerPayout } from "../api";

/** Response of POST /partner/wallet/request-payout. */
export interface PartnerPayoutResult {
  payout_id: number;
  amount: number;
  reference: string;
  status: string;
  bank_account: { bank_name: string; account_number: string; account_name: string };
}

interface ApRequestPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestSuccess?: (result: PartnerPayoutResult) => void;
  /** Opens the payout-account form (no account yet, or "Change"). */
  onChangeBank?: () => void;
}

const mask = (accountNumber: string) => `****${accountNumber.slice(-4)}`;

export function ApRequestPayoutModal({
  open,
  onOpenChange,
  onRequestSuccess,
  onChangeBank,
}: ApRequestPayoutModalProps) {
  const { wallet } = useGetPartnerWallet();
  const { payoutAccount, isLoading: loadingAccount } = useGetPartnerPayoutAccount();
  const payout = useRequestPartnerPayout();
  const [payoutAmount, setPayoutAmount] = useState("");
  const available = wallet?.commission_balance.amount ?? 0;
  const amount = Number(payoutAmount.replace(/[^\d.]/g, "")) || 0;
  const canSubmit = amount > 0 && amount <= available && Boolean(payoutAccount) && Boolean(wallet?.can_request_payout) && !payout.isPending;

  const close = (value: boolean) => { if (payout.isPending) return; if (!value) { setPayoutAmount(""); payout.reset(); } onOpenChange(value); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    payout.mutate({ amount }, {
      onSuccess: (response) => {
        setPayoutAmount("");
        onOpenChange(false);
        onRequestSuccess?.((response as { data: PartnerPayoutResult }).data);
      },
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={close}
      title="Request Payout"
      size="md"
      showCloseButton={!payout.isPending}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Dark Navy Available for Payout Banner (Matching Image 5) */}
        <div className="rounded-2xl bg-[#0F152A] p-5 text-white space-y-1 shadow-md">
          <span className="text-xs font-semibold text-[#8C909B]">
            Available for Payout
          </span>
          <h2 className="text-3xl font-black tracking-wide text-white font-sans">
            ₦{available.toLocaleString()}
          </h2>
          {wallet?.pending_payout.amount ? <p className="text-[11px] text-[#8C909B]">Pending payout: ₦{wallet.pending_payout.amount.toLocaleString()}</p> : null}
        </div>

        {/* Payout Amount Field */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            Payout Amount
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="₦0"
            value={payoutAmount}
            onChange={(e) => setPayoutAmount(e.target.value.replace(/[^\d]/g, ""))}
            className="w-full rounded-2xl border-2 border-[#2563EB] bg-white p-3.5 text-sm font-extrabold text-[#0F152A] outline-none font-mono"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
            {amount > available
              ? <p className="text-[11px] font-semibold text-[#EF4444]">Amount exceeds your available balance.</p>
              : <span />}
            {available > 0 && <button type="button" onClick={() => setPayoutAmount(String(available))} className="text-[11px] font-bold text-[#2563EB] hover:underline">Withdraw all</button>}
          </div>
        </div>

        {/* Bank Account Selection Box */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            Bank Account
          </label>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center justify-between">
            <div>
              {loadingAccount ? <p className="text-[11px] text-[#66738C]">Loading bank account…</p>
                : payoutAccount ? <>
                  <h4 className="font-extrabold text-[#0F152A] text-xs">{payoutAccount.bank_name}</h4>
                  <p className="text-[11px] text-[#66738C] font-mono">{mask(payoutAccount.account_number)} · {payoutAccount.account_name}</p>
                </> : <p className="text-[11px] font-semibold text-[#D9990D]">No payout account yet — add one to request a payout.</p>}
            </div>
            {onChangeBank && (
              <button
                type="button"
                onClick={() => { close(false); onChangeBank(); }}
                className="rounded-lg bg-white border border-[#E2ECF6] px-3 py-1.5 text-xs font-extrabold text-[#2563EB] hover:bg-[#EFF4F8]"
              >
                {payoutAccount ? "Change" : "Add"}
              </button>
            )}
          </div>
        </div>

        {/* Note field and minimum-amount hint are disabled: request-payout accepts { amount } only. */}
        {wallet && !wallet.can_request_payout && <p className="rounded-xl bg-[#FFFBEB] p-3 text-[11px] font-semibold text-[#D9990D]">Payouts aren't available on your account right now.</p>}

        {/* Action Buttons (Matching Image 5) */}
        <div className="pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={payout.isPending}
              onClick={() => close(false)}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
            >
              {payout.isPending ? "Processing..." : "Request Payout"}
            </button>
          </div>
        </div>
      </form>
    </AppModal>
  );
}
