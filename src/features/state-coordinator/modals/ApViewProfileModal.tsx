import {
  PhoneCall,
  UserPlus,
  Send,
  PauseCircle,
  PlayCircle,
  UserMinus,
  MapPin,
  Smartphone,
  Trophy,
  Users,
  Box,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface ApProfileData {
  id: string;
  name: string;
  phone: string;
  state: string;
  status: "Active" | "Suspended" | "At Risk" | "Missed";
  inStock: number;
  activations: string;
  customersCount?: number;
  bonusStatus?: string;
  joinedDate?: string;
}

interface ApViewProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ap?: ApProfileData;
  onContactAp?: (ap: ApProfileData) => void;
  onOnboardCustomer?: (ap: ApProfileData) => void;
  onDistributeStock?: (ap: ApProfileData) => void;
  onSuspendAp?: (ap: ApProfileData) => void;
  onReactivateAp?: (ap: ApProfileData) => void;
  onRemoveNetwork?: (ap: ApProfileData) => void;
}

export function ApViewProfileModal({
  open,
  onOpenChange,
  ap = {
    id: "AP-001",
    name: "Rabiu Sani",
    phone: "08120600542",
    state: "Lagos",
    status: "Active",
    inStock: 18,
    activations: "847/mo",
    customersCount: 247,
    bonusStatus: "Achieved",
    joinedDate: "12 Jan 2026",
  },
  onContactAp,
  onOnboardCustomer,
  onDistributeStock,
  onSuspendAp,
  onReactivateAp,
  onRemoveNetwork,
}: ApViewProfileModalProps) {
  const isSuspended = ap.status === "Suspended";

  const handleAction = (actionFn?: (ap: ApProfileData) => void) => {
    onOpenChange(false);
    actionFn?.(ap);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Agency Partner Profile"
      description="View details and perform actions"
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Profile Card Header */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-[#EFF4F8] font-black text-[#2563EB] text-base sm:text-lg shadow-xs">
              {ap.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-extrabold text-[#0F152A] truncate">{ap.name}</h3>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shrink-0 ${
                    isSuspended
                      ? "bg-[#FFF7F8] text-[#EF4444]"
                      : "bg-[#EBFFF8] text-[#10B981]"
                  }`}
                >
                  {ap.status}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#66738C] mt-0.5 font-mono">
                {ap.phone}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-[#8C909B] mt-1 font-medium flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3 text-[#8C909B]" />
                  {ap.state}
                </span>
                <span>• Joined {ap.joinedDate || "Jan 2026"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3 space-y-0.5">
            <div className="flex items-center gap-1.5 text-[#8C909B]">
              <Box className="size-3.5 text-[#10B981]" />
              <span className="text-[10px] font-extrabold uppercase">STOCK</span>
            </div>
            <p className="text-lg font-black text-[#0F152A]">{ap.inStock} SIMs</p>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3 space-y-0.5">
            <div className="flex items-center gap-1.5 text-[#8C909B]">
              <Smartphone className="size-3.5 text-[#2563EB]" />
              <span className="text-[10px] font-extrabold uppercase">ACTS/MO</span>
            </div>
            <p className="text-lg font-black text-[#0F152A]">{ap.activations}</p>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3 space-y-0.5">
            <div className="flex items-center gap-1.5 text-[#8C909B]">
              <Users className="size-3.5 text-[#7C3AED]" />
              <span className="text-[10px] font-extrabold uppercase">CUSTOMERS</span>
            </div>
            <p className="text-lg font-black text-[#0F152A]">{ap.customersCount || 247}</p>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3 space-y-0.5">
            <div className="flex items-center gap-1.5 text-[#8C909B]">
              <Trophy className="size-3.5 text-[#F59E0B]" />
              <span className="text-[10px] font-extrabold uppercase">BONUS</span>
            </div>
            <p className="text-sm font-black text-[#10B981] truncate">
              {ap.bonusStatus || "Achieved"}
            </p>
          </div>
        </div>

        {/* Quick Actions List */}
        <div className="space-y-2 pt-1">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            QUICK PROFILE ACTIONS
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Contact AP */}
            <button
              type="button"
              onClick={() => handleAction(onContactAp)}
              className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3 hover:bg-[#F8FAFC] transition text-left"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                <PhoneCall className="size-4" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#0F152A] text-xs">Contact AP</h5>
                <p className="text-[10px] text-[#8C909B]">Call or Send SMS</p>
              </div>
            </button>

            {/* Onboard Customer */}
            <button
              type="button"
              onClick={() => handleAction(onOnboardCustomer)}
              className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3 hover:bg-[#F8FAFC] transition text-left"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED]">
                <UserPlus className="size-4" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#0F152A] text-xs">Onboard Customer</h5>
                <p className="text-[10px] text-[#8C909B]">Register on behalf of AP</p>
              </div>
            </button>

            {/* Distribute Stock */}
            <button
              type="button"
              onClick={() => handleAction(onDistributeStock)}
              className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3 hover:bg-[#F8FAFC] transition text-left"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
                <Send className="size-4" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#0F152A] text-xs">Distribute Stock</h5>
                <p className="text-[10px] text-[#8C909B]">Send SIMs from inventory</p>
              </div>
            </button>

            {/* Suspend or Reactivate AP */}
            {isSuspended ? (
              <button
                type="button"
                onClick={() => handleAction(onReactivateAp)}
                className="flex items-center gap-3 rounded-2xl border border-[#9DF8DA] bg-[#EBFFF8] p-3 hover:bg-[#D1FAE5] transition text-left"
              >
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#10B981]/15 text-[#10B981]">
                  <PlayCircle className="size-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#10B981] text-xs">Reactivate AP</h5>
                  <p className="text-[10px] text-[#059669]">Unlock account</p>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleAction(onSuspendAp)}
                className="flex items-center gap-3 rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 hover:bg-[#FFE4E6] transition text-left"
              >
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#EF4444]/15 text-[#EF4444]">
                  <PauseCircle className="size-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#EF4444] text-xs">Suspend AP</h5>
                  <p className="text-[10px] text-[#DC2626]">Pause account transactions</p>
                </div>
              </button>
            )}

            {/* Remove from Network */}
            <button
              type="button"
              onClick={() => handleAction(onRemoveNetwork)}
              className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3 hover:bg-[#FFF7F8] transition text-left sm:col-span-2"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFF7F8] text-[#EF4444]">
                <UserMinus className="size-4" />
              </div>
              <div>
                <h5 className="font-extrabold text-[#EF4444] text-xs">Remove from Network</h5>
                <p className="text-[10px] text-[#8C909B]">Extreme action · Irreversible</p>
              </div>
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC]"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
