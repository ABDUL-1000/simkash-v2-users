import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { CheckCircle2, MessageSquare } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface ReminderSentSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
  channel: string;
}

export const ReminderSentSuccessModal: React.FC<ReminderSentSuccessModalProps> = ({
  open,
  onOpenChange,
  coordinator,
  channel,
}) => {
  const channelLabel =
    channel === "both" ? "SMS and WhatsApp" : channel === "whatsapp" ? "WhatsApp" : "SMS";

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="space-y-4 pt-2 text-center text-xs">
        <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Reminder Dispatched!</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Your activation reminder was successfully delivered via{" "}
            <span className="font-semibold text-slate-800">{channelLabel}</span> to{" "}
            <span className="font-semibold text-slate-800">{coordinator?.name}</span> ({coordinator?.phone}).
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-1.5 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5 font-medium text-slate-800">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Target gap reminder logged</span>
          </div>
          <p className="text-slate-500">
            Coordinator has been alerted to review their subordinate APs and drive activations.
          </p>
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
