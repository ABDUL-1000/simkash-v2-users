import { useState } from "react";
import { Input } from "antd";
import { AppModal } from "@/components/common/AppModal";
import { Tag } from "./shared";
import { ECOLOR } from "@/constants/colors";
import { NETWORK_COLORS } from "@/constants/colors";

type AllocationRequest = {
  id: string;
  name: string;
  role: string;
  location: string;
  simType: string;
  network: keyof typeof NETWORK_COLORS;
  requested: number;
  currentStock: number;
  max: number;
};

const DUMMY_REQUESTS: AllocationRequest[] = [
  { id: "1", name: "Usman Bello", role: "Corporate Agent", location: "Kano", simType: "POS SIM", network: "mtn", requested: 500, currentStock: 847, max: 12847 },
  { id: "2", name: "Rabiu Sani", role: "Agency Partner", location: "Lagos", simType: "CCTV SIM", network: "airtel", requested: 200, currentStock: 23, max: 72104 },
  { id: "3", name: "Glory Effah", role: "Agency Partner", location: "Lagos", simType: "GPS SIM", network: "glo", requested: 100, currentStock: 0, max: 89450 },
];

type ApproveAllocationsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProcessAll?: (approvedQuantities: Record<string, number>) => void;
};

export function ApproveAllocationsModal({ open, onOpenChange, onProcessAll }: ApproveAllocationsModalProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(DUMMY_REQUESTS.map((r) => [r.id, r.requested])),
  );

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Pending SIM Allocation Requests"
      description="Agents requesting SIM stock from Admin"
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "process-all",
          label: "Process All Approvals",
          variant: "primary",
          onClick: () => onProcessAll?.(quantities),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4">
        {DUMMY_REQUESTS.map((req) => {
          const networkColor = NETWORK_COLORS[req.network];
          return (
            <div key={req.id} className="rounded-xl bg-[#EFF6FF] p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-bold text-[#0F1F36]">
                  {req.name}
                  <span className="ml-2 font-normal text-[#64748B]">
                    {req.role} · {req.location}
                  </span>
                </p>
                <Tag bg={`${ECOLOR.pending}1A`} text={ECOLOR.pending}>
                  Pending
                </Tag>
              </div>

              <div className="mb-2 flex flex-wrap items-center gap-2 text-sm">
                <Tag bg="#EFF6FF" text="#1E40AF">
                  {req.simType}
                </Tag>
                <Tag bg={networkColor.bg} text={networkColor.text}>
                  {req.network.toUpperCase()}
                </Tag>
                <span className="text-[#334155]">
                  Requested: <span className="font-bold">{req.requested} SIMs</span>
                </span>
              </div>

              <p className="mb-3 text-sm text-[#64748B]">
                Current stock: <span className="font-bold text-[#0F1F36]">{req.currentStock} SIMs</span>
              </p>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-sm font-bold text-[#0F1F36]">Approve quantity</span>
                <Input
                  type="number"
                  value={quantities[req.id]}
                  onChange={(e) => setQuantities((q) => ({ ...q, [req.id]: Number(e.target.value) }))}
                  className="w-28"
                />
                <span className="text-sm text-[#64748B]">Max: {req.max.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-5 text-sm font-bold">
                <button
                  type="button"
                  className="text-[#2563EB] hover:underline"
                  onClick={() => setQuantities((q) => ({ ...q, [req.id]: req.requested }))}
                >
                  Approve Full Amount
                </button>
                <button type="button" className="text-[#64748B] hover:underline">
                  Approve Reduced
                </button>
                <button type="button" className="text-[#DC2626] hover:underline">
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppModal>
  );
}