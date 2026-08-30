import { useMemo, useState } from "react";
import { Select, Input } from "antd";
import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { DEFAULT_NETWORK_OPTIONS, DEFAULT_SIM_TYPE_OPTIONS } from "@/constants/network";


type AgentOption = { label: string; value: string };

type RedistributeSimsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentOptions?: AgentOption[];
  onConfirm?: (payload: {
    simType?: string;
    network?: string;
    reclaimFrom?: string;
    reassignTo?: string;
    simNumbers: string[];
  }) => void;
};

const DEFAULT_AGENT_OPTIONS: AgentOption[] = [
  { label: "Usman Bello — 08065942373 — Kano — Corporate Agent", value: "usman-bello" },
  { label: "Aminat Okafor — 08120600542 — Lagos — Agency Partner", value: "aminat-okafor" },
];

export function RedistributeSimsModal({
  open,
  onOpenChange,
  agentOptions = DEFAULT_AGENT_OPTIONS,
  onConfirm,
}: RedistributeSimsModalProps) {
  const [simType, setSimType] = useState<string>();
  const [network, setNetwork] = useState<string>();
  const [reclaimFrom, setReclaimFrom] = useState<string>();
  const [reassignTo, setReassignTo] = useState<string>();
  const [simNumbersRaw, setSimNumbersRaw] = useState("");

  const simNumbers = useMemo(
    () => simNumbersRaw.split("\n").map((s) => s.trim()).filter(Boolean),
    [simNumbersRaw],
  );

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Redistribute SIMs"
      description="Move unactivated SIMs from one agent to another"
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Confirm Redistribution",
          variant: "primary",
          disabled: !reclaimFrom || !reassignTo,
          onClick: () => onConfirm?.({ simType, network, reclaimFrom, reassignTo, simNumbers }),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5">
        <div className="flex items-start gap-2.5 rounded-xl bg-[#FFFBEB] p-4 text-sm text-[#78350F]">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#D97706]" />
          <p>
            Only <span className="font-bold">unactivated SIMs</span> (ASSIGNED_TO_PARTNER status) can be
            redistributed. Activated SIMs cannot be moved.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">SIM Type</label>
            <Select className="w-full" size="large" placeholder="Select SIM type" options={DEFAULT_SIM_TYPE_OPTIONS} value={simType} onChange={setSimType} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">Network</label>
            <Select className="w-full" size="large" placeholder="Select network" options={DEFAULT_NETWORK_OPTIONS} value={network} onChange={setNetwork} />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">Reclaim From (Agent)</label>
          <Select
            className="w-full"
            size="large"
            showSearch
            placeholder="Agent name or phone number..."
            options={agentOptions}
            value={reclaimFrom}
            onChange={setReclaimFrom}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">Reassign To (Agent)</label>
          <Select
            className="w-full"
            size="large"
            showSearch
            placeholder="Agent name or phone number..."
            options={agentOptions}
            value={reassignTo}
            onChange={setReassignTo}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">SIM Numbers to Redistribute</label>
          <Input.TextArea
            rows={4}
            value={simNumbersRaw}
            onChange={(e) => setSimNumbersRaw(e.target.value)}
            placeholder="Paste SIM numbers, one per line. Or leave blank to select all unactivated SIMs from the source agent."
          />
          <p className="mt-1.5 text-sm text-[#64748B]">
            {simNumbers.length} SIM numbers entered ·{" "}
            <button type="button" className="font-semibold text-[#2563EB] hover:underline">
              Import from CSV
            </button>
          </p>
        </div>
      </div>
    </AppModal>
  );
}