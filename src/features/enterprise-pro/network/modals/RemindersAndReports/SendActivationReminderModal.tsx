import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Bell, MessageSquare, Smartphone, Send, Target } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface SendActivationReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
  onReminderSent: (sc: StateCoordinatorNetwork, channel: string, message: string) => void;
}

export const SendActivationReminderModal: React.FC<SendActivationReminderModalProps> = ({
  open,
  onOpenChange,
  coordinator,
  onReminderSent,
}) => {
  const [channel, setChannel] = useState<"both" | "whatsapp" | "sms">("both");

  if (!coordinator) return null;

  const target = coordinator.targetActivations || 2000;
  const current = coordinator.activationsThisMonth;
  const gap = Math.max(0, target - current);

  const defaultMessage = `Hi ${coordinator.name.split(" ")[0]}, you are currently at ${current.toLocaleString()} activations in ${coordinator.state} State—just ${gap.toLocaleString()} away from your monthly target of ${target.toLocaleString()}! Let's close out strong before month-end to maximize commissions.`;
  const [message, setMessage] = useState(defaultMessage);

  const handleSend = () => {
    onOpenChange(false);
    onReminderSent(coordinator, channel, message);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Send Activation Reminder</h3>
            <p className="text-xs text-slate-500">
              Notify {coordinator.name} ({coordinator.state}) of monthly target progress
            </p>
          </div>
        </div>

        {/* Target Gap Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold text-slate-700">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              Target vs Progress
            </span>
            <span className="font-bold text-blue-700">
              {current.toLocaleString()} / {target.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block">CURRENT</span>
              <span className="text-xs font-bold text-slate-900">{current.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 block">TARGET</span>
              <span className="text-xs font-bold text-slate-900">{target.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
              <span className="text-[10px] text-amber-700 block">GAP TO GO</span>
              <span className="text-xs font-bold text-amber-800">{gap.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Delivery Channel */}
        <div>
          <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
            Delivery Channel
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: "both", label: "SMS + WhatsApp", icon: Smartphone },
              { key: "whatsapp", label: "WhatsApp", icon: MessageSquare },
              { key: "sms", label: "SMS Only", icon: Smartphone },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setChannel(item.key as any)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-medium border transition ${
                    channel === item.key
                      ? "bg-[#1F3A5F] text-white border-[#1F3A5F]"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message editor */}
        <div>
          <label className="text-[11px] font-semibold text-slate-700 block mb-1">
            Reminder Message
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2.5 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-blue-600 leading-relaxed"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1F3A5F] text-white font-bold hover:bg-slate-800 transition"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch Reminder</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
