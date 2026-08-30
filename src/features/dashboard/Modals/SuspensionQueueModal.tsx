import { AppModal } from "@/components/common/AppModal";
import { Tag } from "./shared";
import { ECOLOR } from "@/constants/colors";

type SuspendedAccount = {
  id: string;
  name: string;
  role: string;
  location: string;
  suspendedDate: string;
  reason: string;
  stats: string[];
};

const DUMMY_SUSPENDED: SuspendedAccount[] = [
  {
    id: "1",
    name: "Elidan Corp",
    role: "Enterprise",
    location: "Lagos",
    suspendedDate: "Suspended 14 Jun 2026",
    reason: "Activation target not met — 3 consecutive months",
    stats: ["47 Agency Partners", "832 unactivated SIMs", "₦2.4M wallet (frozen)"],
  },
  {
    id: "2",
    name: "Hamza Abdulsalam",
    role: "Corporate Agent",
    location: "Adamawa",
    suspendedDate: "Suspended 10 Jun 2026",
    reason: "Compliance violation — KYC documents expired",
    stats: ["12 Agency Partners", "449 unactivated SIMs", "₦847K wallet (frozen)"],
  },
  {
    id: "3",
    name: "Maduka Moses",
    role: "Agency Partner",
    location: "Lagos",
    suspendedDate: "Suspended Today",
    reason: "Fraudulent activation activity detected",
    stats: ["0 sub-agents", "93 unactivated SIMs", "₦124K wallet (frozen)"],
  },
];

type SuspensionQueueModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SuspensionQueueModal({ open, onOpenChange }: SuspensionQueueModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Suspended Accounts"
      description={`${DUMMY_SUSPENDED.length} accounts · Asset transfer pending`}
      size="lg"
      actions={[{ key: "close", label: "Close", variant: "secondary", closeOnClick: true }]}
    >
      <div className="space-y-4">
        {DUMMY_SUSPENDED.map((acc) => (
          <div key={acc.id} className="rounded-xl p-4" style={{ backgroundColor: `${ECOLOR.failed}0D` }}>
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-sm font-bold text-[#0F1F36]">
                🔒 {acc.name}
                <span className="ml-2 font-normal text-[#64748B]">
                  {acc.role} · {acc.location}
                </span>
              </p>
              <div className="text-right">
                <Tag bg={`${ECOLOR.failed}1A`} text={ECOLOR.failed}>
                  SUSPENDED
                </Tag>
                <p className="mt-1 text-xs text-[#94A3B8]">{acc.suspendedDate}</p>
              </div>
            </div>

            <p className="mb-3 text-sm italic text-[#64748B]">Reason: {acc.reason}</p>

            <div className="mb-3 flex flex-wrap gap-2">
              {acc.stats.map((s) => (
                <Tag key={s} bg={`${ECOLOR.failed}1A`} text="#0F1F36">
                  {s}
                </Tag>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-bold"
                style={{ backgroundColor: `${ECOLOR.pending}1A`, color: "#92400E" }}
              >
                Transfer Assets
              </button>
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-bold"
                style={{ backgroundColor: `${ECOLOR.success}1A`, color: ECOLOR.success }}
              >
                Reinstate
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppModal>
  );
}