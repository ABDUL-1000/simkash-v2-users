import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Calendar, Users } from "lucide-react";

interface EbPayoutPendingAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  referenceId: string;
  onDone?: () => void;
  onViewTransactions?: () => void;
}

export const EbPayoutPendingAdminModal: React.FC<EbPayoutPendingAdminModalProps> = ({
  open,
  onOpenChange,
  amount,
  referenceId,
  onDone,
  onViewTransactions,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-center text-xs">
        <div className="text-left">
          <h3 className="text-base font-bold text-slate-900">Payout Submitted</h3>
          <p className="text-xs text-slate-400 mt-0.5">Your withdrawal request is pending approval</p>
        </div>

        <div className="pt-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center mx-auto mb-2.5">
            <Calendar className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Pending Admin Approval</h2>
        </div>

        {/* Structured Details Card */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-2.5 text-xs font-medium">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Payout Request Submitted
          </span>

          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Amount</span>
            <span className="font-extrabold text-slate-900 text-sm">₦{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Bank</span>
            <span className="font-bold text-slate-900">Access Bank ****0476</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Name</span>
            <span className="font-bold text-slate-900">Fidelity Commerce Ltd</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Approval</span>
            <span className="font-bold text-amber-600">Required (Enterprise)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60 items-center">
            <span className="text-slate-500">Status</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
              Pending Approval
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Est.</span>
            <span className="font-bold text-slate-900">Up to 24 hours</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Ref</span>
            <span className="font-mono font-bold text-slate-700">{referenceId}</span>
          </div>
        </div>

        {/* Manager Notification Box */}
        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center gap-2.5 text-left text-blue-900 text-xs font-medium">
          <Users className="w-4 h-4 text-blue-600 shrink-0" />
          <div>
            <div className="font-bold text-blue-950">Kemi Ade has been notified.</div>
            <div className="text-[11px] text-blue-700">Contact her to expedite: 08012345678</div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 font-medium">
          SMS confirmation sent to your registered number
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <a
            href="tel:08012345678"
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition text-center"
          >
            Contact Kemi Ade
          </a>
          {onViewTransactions && (
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onViewTransactions();
              }}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              View Transactions
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onDone?.();
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition"
          >
            Done
          </button>
        </div>
      </div>
    </AppModal>
  );
};
