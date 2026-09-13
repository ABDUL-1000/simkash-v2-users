import {
  Bell,
  Eye,
  PauseCircle,
  PhoneCall,
  Send,
  UserMinus,
  Users,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ApQuickActionsMenuModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apId?: string;
  apName?: string;
  onViewProfile?: (id: string) => void;
  onDistributeSims?: (name: string) => void;
  onSendBonusReminder?: (name: string) => void;
  onContactAp?: (name: string) => void;
  onViewCustomers?: (name: string) => void;
  onSuspendAp?: (name: string) => void;
  onRemoveFromNetwork?: (name: string) => void;
}

export function ApQuickActionsMenuModal({
  open,
  onOpenChange,
  apId = "rabiu-sani",
  apName = "Rabiu Sani",
  onViewProfile,
  onDistributeSims,
  onSendBonusReminder,
  onContactAp,
  onViewCustomers,
  onSuspendAp,
  onRemoveFromNetwork,
}: ApQuickActionsMenuModalProps) {
  const handleAction = (actionFn?: (arg: string) => void, arg = apName) => {
    onOpenChange(false);
    actionFn?.(arg);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
    >
      <div className="space-y-1 text-xs pt-1 divide-y divide-[#E2ECF6]">
        {/* Item 1: View Full Profile */}
        <button
          type="button"
          onClick={() => handleAction(() => onViewProfile?.(apId), apId)}
          className="flex w-full items-center gap-3.5 p-3.5 text-left hover:bg-[#F8FAFC] first:rounded-t-2xl"
        >
          <Eye className="size-5 shrink-0 text-[#0F152A]" />
          <div>
            <h4 className="font-extrabold text-[#0F152A] text-xs">
              View Full Profile
            </h4>
          </div>
        </button>

        {/* Item 2: Distribute SIMs */}
        <button
          type="button"
          onClick={() => handleAction(onDistributeSims)}
          className="flex w-full items-center gap-3.5 p-3.5 text-left hover:bg-[#F8FAFC]"
        >
          <Send className="size-5 shrink-0 text-[#10B981]" />
          <div>
            <h4 className="font-extrabold text-[#0F152A] text-xs">
              Distribute SIMs
            </h4>
            <p className="text-[11px] text-[#8C909B]">
              Send stock from your inventory
            </p>
          </div>
        </button>

        {/* Item 3: Send Bonus Reminder */}
        <button
          type="button"
          onClick={() => handleAction(onSendBonusReminder)}
          className="flex w-full items-center gap-3.5 p-3.5 text-left hover:bg-[#F8FAFC]"
        >
          <Bell className="size-5 shrink-0 text-[#F59E0B]" />
          <div>
            <h4 className="font-extrabold text-[#0F152A] text-xs">
              Send Bonus Reminder
            </h4>
            <p className="text-[11px] text-[#8C909B]">
              Motivate AP to hit target
            </p>
          </div>
        </button>

        {/* Item 4: Contact AP */}
        <button
          type="button"
          onClick={() => handleAction(onContactAp)}
          className="flex w-full items-center gap-3.5 p-3.5 text-left hover:bg-[#F8FAFC]"
        >
          <PhoneCall className="size-5 shrink-0 text-[#0F152A]" />
          <div>
            <h4 className="font-extrabold text-[#0F152A] text-xs">
              Contact AP
            </h4>
            <p className="text-[11px] text-[#8C909B]">
              Call or WhatsApp
            </p>
          </div>
        </button>

        {/* Item 5: View AP's Customers */}
        <button
          type="button"
          onClick={() => handleAction(onViewCustomers)}
          className="flex w-full items-center gap-3.5 p-3.5 text-left hover:bg-[#F8FAFC]"
        >
          <Users className="size-5 shrink-0 text-[#9333EA]" />
          <div>
            <h4 className="font-extrabold text-[#0F152A] text-xs">
              View AP's Customers
            </h4>
            <p className="text-[11px] text-[#8C909B]">
              See all customers this AP manages
            </p>
          </div>
        </button>

        {/* Item 6: Suspend AP */}
        <button
          type="button"
          onClick={() => handleAction(onSuspendAp)}
          className="flex w-full items-center gap-3.5 p-3.5 text-left hover:bg-[#FFF7F8]"
        >
          <PauseCircle className="size-5 shrink-0 text-[#EF4444]" />
          <div>
            <h4 className="font-extrabold text-[#EF4444] text-xs">
              Suspend AP
            </h4>
            <p className="text-[11px] text-[#8C909B]">
              Pause account — no activations
            </p>
          </div>
        </button>

        {/* Item 7: Remove from Network */}
        <button
          type="button"
          onClick={() => handleAction(onRemoveFromNetwork)}
          className="flex w-full items-center gap-3.5 p-3.5 text-left hover:bg-[#FFF7F8]"
        >
          <UserMinus className="size-5 shrink-0 text-[#EF4444]" />
          <div>
            <h4 className="font-extrabold text-[#EF4444] text-xs">
              Remove from Network
            </h4>
          </div>
        </button>

        {/* Cancel Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full py-3 text-center text-xs font-extrabold text-[#0F152A] hover:bg-[#F8FAFC] rounded-b-2xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </AppModal>
  );
}
