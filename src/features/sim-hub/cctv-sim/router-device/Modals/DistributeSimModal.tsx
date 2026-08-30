import { useMemo, useState } from "react";
import { Select, Input } from "antd";
import { AppModal } from "@/components/common/AppModal";
import { DEFAULT_NETWORK_OPTIONS, DEFAULT_SIM_TYPE_OPTIONS } from "@/constants/network";


type AgentInfo = {
  id: string;
  name: string;
  phone: string;
  location: string;
  role: string;
  currentStock: number;
};

const DUMMY_AGENTS: AgentInfo[] = [
  { id: "usman-bello", name: "Usman Bello", phone: "08065942373", location: "Kano", role: "Corporate Agent", currentStock: 847 },
];

const AGENT_OPTIONS = DUMMY_AGENTS.map((a) => ({
  label: `${a.name} — ${a.phone} — ${a.location} — ${a.role}`,
  value: a.id,
}));

type DistributeSimsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableStock?: number; // your current stock for the selected SIM type/network
  onConfirm?: (payload: { simType?: string; network?: string; agentId?: string; quantity: number; note: string }) => void;
};

export function DistributeSimsModal({ open, onOpenChange, availableStock = 12847, onConfirm }: DistributeSimsModalProps) {
  const [simType, setSimType] = useState<string>();
  const [network, setNetwork] = useState<string>();
  const [agentId, setAgentId] = useState<string>();
  const [quantity, setQuantity] = useState<number>(100);
  const [note, setNote] = useState("");

  const selectedAgent = useMemo(() => DUMMY_AGENTS.find((a) => a.id === agentId), [agentId]);
  const stockAfter = Math.max(0, availableStock - (quantity || 0));

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Distribute SIMs"
      description="Allocate SIM stock to a Corporate Agent or Agency Partner"
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: `Distribute ${quantity || 0} ${simType ? DEFAULT_SIM_TYPE_OPTIONS.find((o) => o.value === simType)?.label : "SIMs"} →`,
          variant: "primary",
          disabled: !agentId || !quantity || quantity > availableStock,
          onClick: () => onConfirm?.({ simType, network, agentId, quantity, note }),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5">
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
          <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">Distribute To</label>
          <Select className="w-full" size="large" placeholder="Select recipient type" options={[{ label: "Corporate Agent", value: "corporate" }, { label: "Agency Partner", value: "agency" }]} />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">Agent Name / Phone</label>
          <Select
            className="w-full"
            size="large"
            showSearch
            placeholder="Search by name or phone number..."
            options={AGENT_OPTIONS}
            value={agentId}
            onChange={setAgentId}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
          />
          {selectedAgent && (
            <p className="mt-1.5 text-sm text-[#64748B]">
              Selected: {selectedAgent.name} · {selectedAgent.phone} · {selectedAgent.location} · {selectedAgent.role}
            </p>
          )}
        </div>

        {selectedAgent && (
          <div className="space-y-2 rounded-xl bg-[#EFF6FF] px-4 py-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#334155]">Agent's current stock</span>
              <span className="font-bold text-[#0F1F36]">
                {selectedAgent.currentStock.toLocaleString()} POS SIMs (MTN)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#334155]">Your available stock</span>
              <span className="font-bold text-[#0F1F36]">{availableStock.toLocaleString()} POS SIMs (MTN)</span>
            </div>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">Quantity to Distribute</label>
          <Input
            type="number"
            size="large"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <p className="mt-1.5 text-sm text-[#64748B]">
            Max: {availableStock.toLocaleString()} · Your stock after distribution: {stockAfter.toLocaleString()}
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">Note (optional)</label>
          <Input
            size="large"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Weekly stock allocation — Kano region"
          />
        </div>
      </div>
    </AppModal>
  );
}