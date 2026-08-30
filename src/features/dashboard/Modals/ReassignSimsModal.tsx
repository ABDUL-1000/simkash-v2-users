import { useState } from "react";
import { Select } from "antd";
import { AppModal } from "@/components/common/AppModal";
import { ECOLOR } from "@/constants/colors";

type ReassignSimsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: {
    name: string;
    role: string;
    location: string;
    activationRate: number;
    simsAssigned: number;
    simsActivated: number;
  };
  onConfirm?: (option: "unactivated-only" | "full-transfer", transferToId: string) => void;
};

const TRANSFER_OPTIONS = [{ label: "Usman Bello — Corporate Agent — 847 SIMs — Kano", value: "usman-bello" }];

export function ReassignSimsModal({ open, onOpenChange, agent, onConfirm }: ReassignSimsModalProps) {
  const [option, setOption] = useState<"unactivated-only" | "full-transfer">("unactivated-only");
  const [transferTo, setTransferTo] = useState<string>();
  const unactivated = agent.simsAssigned - agent.simsActivated;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`Reassign SIMs — ${agent.name}`}
      description={`${agent.role} · ${agent.location} · Activation Rate: ${agent.activationRate}%`}
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Confirm Reassignment",
          variant: "primary",
          disabled: !transferTo,
          onClick: () => transferTo && onConfirm?.(option, transferTo),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5">
        <div className="rounded-xl p-4" style={{ backgroundColor: `${ECOLOR.failed}0D` }}>
          <span
            className="mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
            style={{ backgroundColor: `${ECOLOR.failed}1A`, color: ECOLOR.failed }}
          >
            ● Needs Improvement
          </span>
          <p className="mb-2 mt-3 text-sm text-[#334155]">
            SIMs Assigned: <span className="font-bold text-[#0F1F36]">{agent.simsAssigned}</span> &nbsp; Activated:{" "}
            <span className="font-bold text-[#0F1F36]">{agent.simsActivated}</span> &nbsp; Rate:{" "}
            <span className="font-bold" style={{ color: ECOLOR.failed }}>
              {agent.activationRate}%
            </span>
          </p>
          <p className="text-sm text-[#64748B]">
            Consistently below 50% for 3 consecutive weeks. Consider reassigning unactivated SIMs to a
            better-performing agent.
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">Reassignment Options</p>

          <div className="space-y-3">
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 ${
                option === "unactivated-only" ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#E2E8F0]"
              }`}
            >
              <input
                type="radio"
                checked={option === "unactivated-only"}
                onChange={() => setOption("unactivated-only")}
                className="mt-1"
              />
              <div>
                <p className="text-sm font-bold text-[#0F1F36]">Reassign Unactivated SIMs Only</p>
                <p className="mt-1 text-sm text-[#64748B]">
                  {unactivated} unactivated SIMs will be moved. Agent keeps their {agent.simsActivated} activated
                  customer SIMs.
                </p>
              </div>
            </label>

            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 ${
                option === "full-transfer" ? "border-[#2563EB] bg-[#EFF6FF]" : "border-[#E2E8F0]"
              }`}
            >
              <input
                type="radio"
                checked={option === "full-transfer"}
                onChange={() => setOption("full-transfer")}
                className="mt-1"
              />
              <div>
                <p className="text-sm font-bold text-[#0F1F36]">Full Account Transfer (Suspend &amp; Transfer)</p>
                <p className="mt-1 text-sm text-[#64748B]">Account suspended. All SIMs and customers transferred.</p>
              </div>
            </label>
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-sm font-bold text-[#0F1F36]">Transfer To</p>
          <Select className="w-full" size="large" placeholder="Select agent" options={TRANSFER_OPTIONS} value={transferTo} onChange={setTransferTo} />
        </div>

        <div className="rounded-xl bg-[#EFF6FF] p-4 text-sm text-[#1E3A8A]">
          ℹ️ Agent will be notified of the reassignment with a coaching message. Their wallet and commission history
          are unaffected.
        </div>
      </div>
    </AppModal>
  );
}