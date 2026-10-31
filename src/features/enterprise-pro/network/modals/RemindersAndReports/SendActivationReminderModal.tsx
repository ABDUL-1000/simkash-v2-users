import React, { useState } from "react";
import { Select } from "antd";
import { AppModal } from "@/components/common/AppModal";
import { Bell, Send } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";
import { useRemindCoordinator } from "../../api/mutations";

interface SendActivationReminderModalProps {
  /** Preselected coordinator; when absent the modal offers the loaded list. */
  coordinator: StateCoordinatorNetwork | null;
  coordinators: StateCoordinatorNetwork[];
  onClose: () => void;
}

const defaultMessage = (sc?: StateCoordinatorNetwork | null) => {
  if (!sc) return "Reminder: please review your stock and activations for this month.";
  if (/low|critical|out/i.test(sc.stockStatus)) return `Stock replenishment reminder: your inventory is below threshold (${sc.stockLabel}).`;
  return `Hi ${sc.name.split(" ")[0]}, you are at ${(sc.activationsThisMonth ?? 0).toLocaleString()} activations in ${sc.state} this month. Keep pushing activations.`;
};

/** POST /my-state-coordinator/remind { coordinator_id, message } */
export const SendActivationReminderModal: React.FC<SendActivationReminderModalProps> = ({ coordinator, coordinators, onClose }) => {
  const [selectedId, setSelectedId] = useState(coordinator?.id);
  const selected = coordinator ?? coordinators.find((sc) => sc.id === selectedId);
  const [message, setMessage] = useState(defaultMessage(coordinator));
  const remind = useRemindCoordinator();
  const handleSend = () => {
    if (!selected || !message.trim() || remind.isPending) return;
    remind.mutate({ coordinator_id: Number(selected.id), message: message.trim() }, { onSuccess: onClose });
  };

  return (
    <AppModal open onOpenChange={(open) => { if (!open && !remind.isPending) onClose(); }} size="md" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Send Reminder</h3>
            <p className="text-xs text-slate-500">
              {selected ? `Notify ${selected.name} (${selected.state})` : "Choose a State Coordinator to notify"}
            </p>
          </div>
        </div>

        {!coordinator && (
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">State Coordinator</label>
            <Select showSearch optionFilterProp="label" className="w-full" placeholder="Select a State Coordinator" value={selectedId}
              onChange={(value: string) => { setSelectedId(value); setMessage(defaultMessage(coordinators.find((sc) => sc.id === value))); }}
              options={coordinators.map((sc) => ({ value: sc.id, label: `${sc.name} · ${sc.state}` }))} />
          </div>
        )}

        <div>
          <label className="text-[11px] font-semibold text-slate-700 block mb-1">Message</label>
          <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-blue-600" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button type="button" disabled={remind.isPending} onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
          <button type="button" disabled={!selected || !message.trim() || remind.isPending} onClick={handleSend} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1F3A5F] text-white font-bold hover:bg-slate-800 disabled:opacity-50">
            <Send className="w-4 h-4" />
            <span>{remind.isPending ? "Sending…" : "Send Reminder"}</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
