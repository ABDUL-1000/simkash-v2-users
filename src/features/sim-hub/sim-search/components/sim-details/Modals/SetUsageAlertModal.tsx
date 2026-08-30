"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { MODAL_COLORS } from "@/constants/colors";

type SetUsageAlertModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simNumber?: string;
  network?: string;
  simType?: string;
  usedGb?: number;
  totalGb?: number;
  customerPhone?: string;
  agentName?: string;
  onSave?: (threshold: string, recipients: string[], channel: string) => void;
};

const THRESHOLDS = [
  { id: "60", label: "60%" },
  { id: "70", label: "70%" },
  { id: "80", label: "80%" },
  { id: "90", label: "90%" },
];

const CHANNELS = [
  { id: "sms", label: "SMS" },
  { id: "push", label: "Push" },
  { id: "email", label: "Email" },
];

export function SetUsageAlertModal({
  open,
  onOpenChange,
  simNumber = "07022222222",
  network = "MTN",
  simType = "POS SIM",
  usedGb = 14,
  totalGb = 18,
  customerPhone = "0812***4521",
  agentName = "Rabiu Sani",
  onSave,
}: SetUsageAlertModalProps) {
  const [selectedThreshold, setSelectedThreshold] = useState("80");
  const [selectedChannel, setSelectedChannel] = useState("sms");

  const [notifyCustomer, setNotifyCustomer] = useState(true);
  const [notifyAgent, setNotifyAgent] = useState(true);
  const [notifyAdmin, setNotifyAdmin] = useState(true);

  const usagePct = Math.round((usedGb / totalGb) * 100);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Set Data Usage Alert"
      description={`Configure alert threshold for SIM ${simNumber}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "save",
          label: "Save Alert Settings",
          variant: "primary",
          onClick: () => {
            const recipients = [
              notifyCustomer && "customer",
              notifyAgent && "agent",
              notifyAdmin && "admin",
            ].filter(Boolean) as string[];
            onSave?.(selectedThreshold, recipients, selectedChannel);
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5">
        {/* SIM Info Header Card */}
        <div className="rounded-2xl bg-[#F0F6FF] p-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-[#0F172A]">SIM: {simNumber}</span>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#FEF3C7] px-2.5 py-0.5 text-xs font-bold text-[#854D0E]">
                {network}
              </span>
              <span className="text-xs font-bold text-[#64748B]">{simType}</span>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-xs font-semibold text-[#64748B]">
              Current usage: <strong className="text-[#0F172A]">{usedGb}GB of {totalGb}GB ({usagePct}%)</strong>
            </p>
            {/* Progress Bar */}
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
              <div
                className="h-full rounded-full bg-[#F59E0B] transition-all duration-300"
                style={{ width: `${Math.min(usagePct, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Section 1: Alert When Usage Reaches */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Alert when usage reaches
          </p>
          <div className="grid grid-cols-4 gap-3">
            {THRESHOLDS.map((t) => {
              const isActive = t.id === selectedThreshold;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedThreshold(t.id)}
                  className="rounded-full border py-2.5 text-center text-sm font-bold transition-all"
                  style={{
                    backgroundColor: isActive ? MODAL_COLORS.primary : "#FFFFFF",
                    borderColor: isActive ? MODAL_COLORS.primary : "#E2E8F0",
                    color: isActive ? "#FFFFFF" : "#0F172A",
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Who Gets Notified */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Who gets notified
          </p>
          <div className="space-y-2.5">
            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#0F172A]">
              <input
                type="checkbox"
                checked={notifyCustomer}
                onChange={(e) => setNotifyCustomer(e.target.checked)}
                className="size-4.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB]"
              />
              <span>Customer <span className="font-normal text-[#64748B]">({customerPhone})</span></span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#0F172A]">
              <input
                type="checkbox"
                checked={notifyAgent}
                onChange={(e) => setNotifyAgent(e.target.checked)}
                className="size-4.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB]"
              />
              <span>Responsible Agent <span className="font-normal text-[#64748B]">({agentName})</span></span>
            </label>

            <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-[#0F172A]">
              <input
                type="checkbox"
                checked={notifyAdmin}
                onChange={(e) => setNotifyAdmin(e.target.checked)}
                className="size-4.5 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB]"
              />
              <span>Super Admin</span>
            </label>
          </div>
        </div>

        {/* Section 3: Notification Channel */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Notification channel
          </p>
          <div className="grid grid-cols-3 gap-3">
            {CHANNELS.map((ch) => {
              const isActive = ch.id === selectedChannel;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setSelectedChannel(ch.id)}
                  className="rounded-full border py-2.5 text-center text-sm font-bold transition-all"
                  style={{
                    backgroundColor: isActive ? MODAL_COLORS.primary : "#FFFFFF",
                    borderColor: isActive ? MODAL_COLORS.primary : "#E2E8F0",
                    color: isActive ? "#FFFFFF" : "#0F172A",
                  }}
                >
                  {ch.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Alert status banner */}
        <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs">
          <p className="font-bold text-[#059669]">● Alert already sent at 80% threshold</p>
          <p className="mt-0.5 text-[#64748B]">Sent: 22 Jun 2026 · 03:47 PM</p>
        </div>
      </div>
    </AppModal>
  );
}
