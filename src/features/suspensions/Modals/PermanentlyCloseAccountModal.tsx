"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type PermanentlyCloseAccountModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountName?: string;
  onCloseSuccess?: () => void;
};

export function PermanentlyCloseAccountModal({
  open,
  onOpenChange,
  accountName = "Elidan Corp",
  onCloseSuccess,
}: PermanentlyCloseAccountModalProps) {
  const [reason, setReason] = useState("");
  const [confirmNameInput, setConfirmNameInput] = useState("");
  const [checklist, setChecklist] = useState({
    subAgents: false,
    sims: false,
    wallet: false,
    legal: false,
  });

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Permanently Close Account"
      description="This action is irreversible"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Permanently Close Account",
          variant: "danger",
          onClick: () => {
            onCloseSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Red Warning Banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-4 text-xs text-[#DC2626]">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p className="leading-relaxed">
            Permanently closing this account will remove all access forever. The wallet balance will be forfeited per platform T&C. This cannot be undone.
          </p>
        </div>

        {/* Target Account Box */}
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-3.5 flex items-center justify-between">
          <div>
            <p className="font-bold text-[#0F172A] text-sm">{accountName}</p>
            <p className="text-xs text-[#64748B]">Suspended since: 14 Jun 2026</p>
          </div>
          <span className="rounded-full bg-[#E2E8F0] px-2.5 py-0.5 text-xs font-bold text-[#0F172A]">
            Corporate Agent
          </span>
        </div>

        {/* Closure Checklist */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            CLOSURE CHECKLIST
          </p>
          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2.5 cursor-pointer text-[#0F172A]">
              <input
                type="checkbox"
                checked={checklist.subAgents}
                onChange={(e) => setChecklist({ ...checklist, subAgents: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#DC2626]"
              />
              <span>All sub-agents have been transferred</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-[#0F172A]">
              <input
                type="checkbox"
                checked={checklist.sims}
                onChange={(e) => setChecklist({ ...checklist, sims: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#DC2626]"
              />
              <span>All SIMs have been transferred</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-[#0F172A]">
              <input
                type="checkbox"
                checked={checklist.wallet}
                onChange={(e) => setChecklist({ ...checklist, wallet: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#DC2626]"
              />
              <span>Wallet forfeiture has been reviewed</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer text-[#0F172A]">
              <input
                type="checkbox"
                checked={checklist.legal}
                onChange={(e) => setChecklist({ ...checklist, legal: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#DC2626]"
              />
              <span>Legal/compliance team has been notified</span>
            </label>
          </div>
        </div>

        {/* Reason for Closure */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            REASON FOR CLOSURE*
          </label>
          <textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Fraudulent activity confirmed after investigation"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Confirm Name Input */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            TYPE ACCOUNT NAME TO CONFIRM*
          </label>
          <input
            type="text"
            value={confirmNameInput}
            onChange={(e) => setConfirmNameInput(e.target.value)}
            placeholder={`Type: ${accountName}`}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>
    </AppModal>
  );
}
