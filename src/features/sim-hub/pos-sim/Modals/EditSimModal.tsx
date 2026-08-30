import { useState } from "react";
import { Select, Input } from "antd";
import { AppModal } from "@/components/common/AppModal";
import { DEFAULT_NETWORK_OPTIONS } from "@/constants/network";
import { SIM_STATUS_OPTIONS } from "@/constants/status";
import { OWNER_ROLE_OPTIONS } from "@/constants/general";
import type { SimRecord } from "@/types/sim.types";



type EditSimModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sim: SimRecord | null;
  onSave?: (updated: SimRecord) => void;
};

export function EditSimModal({
  open,
  onOpenChange,
  sim,
  onSave,
}: EditSimModalProps) {
  const [simNumber, setSimNumber] = useState("");
  const [network, setNetwork] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [ownerRole, setOwnerRole] = useState<string>();

  //   useEffect(() => {
  //     if (sim) {
  //       setSimNumber(sim.simNumber);
  //       setNetwork(sim.network);
  //       setStatus(sim.status);
  //       setOwnerRole(sim.ownerRole);
  //     }
  //   }, [sim]);

  if (!sim) return null;

  const locked = sim.isActivated;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit SIM"
      description="Update SIM details · Activated SIMs cannot be edited"
      size="md"
      actions={[
        {
          key: "cancel",
          label: "Cancel",
          variant: "secondary",
          closeOnClick: true,
        },
        {
          key: "save",
          label: "Save Changes",
          variant: "primary",
          disabled: locked,
          onClick: () =>
            onSave?.({
              ...sim,
              simNumber,
              network: network ?? sim.network,
              status: status ?? sim.status,
              ownerRole,
            }),
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">
            SIM Number
          </label>
          <Input
            size="large"
            value={simNumber}
            onChange={(e) => setSimNumber(e.target.value)}
            disabled={locked}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">
              Network
            </label>
            <Select
              className="w-full"
              size="large"
              options={DEFAULT_NETWORK_OPTIONS}
              value={network}
              onChange={setNetwork}
              disabled={locked}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">
              Status
            </label>
            <Select
              className="w-full"
              size="large"
              options={SIM_STATUS_OPTIONS}
              value={status}
              onChange={setStatus}
              disabled={locked}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-[#0F1F36]">
            Owner Role
          </label>
          <Select
            className="w-full"
            size="large"
            options={OWNER_ROLE_OPTIONS}
            value={ownerRole}
            onChange={setOwnerRole}
            disabled={locked}
          />
        </div>
      </div>
    </AppModal>
  );
}
