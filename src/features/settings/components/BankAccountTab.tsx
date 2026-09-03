import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { ChangeBankAccountModal } from "../Modals/ChangeBankAccountModal";

export function BankAccountTab() {
  const [changeBankOpen, setChangeBankOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Card 1: Saved Bank Account */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#0F152A]">Saved Bank Account</h3>
          <button
            type="button"
            onClick={() => setChangeBankOpen(true)}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            Change Account
          </button>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#10B981] text-white font-bold text-sm">
                GT
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A] text-sm">Guaranty Trust Bank</h4>
                <p className="text-xs text-[#8C909B]">0123456789 · Adewale Okafor</p>
              </div>
            </div>
            <span className="rounded-full bg-[#EBFFF8] px-3 py-0.5 text-xs font-bold text-[#10B981] flex items-center gap-1">
              <Check className="size-3" /> Verified
            </span>
          </div>

          <div className="border-t border-[#E2ECF6] pt-3 text-xs space-y-0.5">
            <span className="font-bold text-[#0F152A] block">Account verification</span>
            <p className="text-[#8C909B]">
              This account has been verified and will receive all payouts and withdrawals.
            </p>
          </div>
        </div>
      </div>

      {/* Card 2: Withdrawal Settings */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Withdrawal Settings</h3>

        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white text-xs">
          <div className="flex justify-between p-3.5 px-4">
            <span className="text-[#8C909B]">Minimum withdrawal</span>
            <span className="font-extrabold text-[#0F152A]">₦1,000</span>
          </div>

          <div className="flex justify-between p-3.5 px-4">
            <span className="text-[#8C909B]">Processing time</span>
            <span className="font-extrabold text-[#0F152A]">Instant (0–5 mins)</span>
          </div>

          <div className="flex justify-between p-3.5 px-4">
            <span className="text-[#8C909B]">Daily limit</span>
            <span className="font-extrabold text-[#0F152A]">₦5,000,000</span>
          </div>
        </div>
      </div>

      {/* Button: Add Another Bank Account */}
      <button
        type="button"
        onClick={() => setChangeBankOpen(true)}
        className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3.5 text-xs font-bold text-[#2563EB] shadow-xs hover:bg-slate-50 flex items-center justify-center gap-2"
      >
        <Plus className="size-4" /> Add Another Bank Account
      </button>

      {/* Change Bank Account Modal */}
      <ChangeBankAccountModal
        open={changeBankOpen}
        onOpenChange={setChangeBankOpen}
      />
    </div>
  );
}
