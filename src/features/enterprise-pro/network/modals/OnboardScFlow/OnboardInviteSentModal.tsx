import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Send, CheckCircle2 } from "lucide-react";
import type { OnboardScFormData } from "../../types";

interface OnboardInviteSentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: OnboardScFormData | null;
}

export const OnboardInviteSentModal: React.FC<OnboardInviteSentModalProps> = ({
  open,
  onOpenChange,
  data,
}) => {
  const totalSims = data
    ? data.posSims + data.cctvSims + data.gpsSims + data.routerSims
    : 95;

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-4 pt-2 text-center text-xs">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
          <Send className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Onboarding Invite Sent!</h3>
          <p className="text-xs text-slate-500 mt-1">
            An invitation link and login credentials have been sent to{" "}
            <span className="font-semibold text-slate-800">{data?.email || "the coordinator"}</span>.
          </p>
        </div>

        {data && (
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Coordinator</span>
              <span className="font-bold text-slate-900">{data.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Territory</span>
              <span className="font-semibold text-slate-900">{data.state} State</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Commission Rate</span>
              <span className="font-bold text-emerald-600">{(data.commissionRate * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Initial Allocation</span>
              <span className="font-bold text-blue-700">{totalSims} SIMs</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 justify-center text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-lg text-[11px] font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Tracking ID: SC-INV-{Math.floor(100000 + Math.random() * 900000)}</span>
        </div>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="w-full py-2.5 rounded-xl bg-[#1F3A5F] text-white font-bold hover:bg-slate-800 transition"
        >
          Done
        </button>
      </div>
    </AppModal>
  );
};
