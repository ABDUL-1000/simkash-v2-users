import {
  BarChart3,
  Smartphone,
  Users,
  RefreshCw,
  ClipboardList,
  Coins,
  Handshake,
  Download,
  MessageSquare,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ApMoreActionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAction?: (actionKey: string) => void;
}

export function ApMoreActionsModal({
  open,
  onOpenChange,
  onSelectAction,
}: ApMoreActionsModalProps) {
  const actions = [
    { key: "reports", label: "View Reports", icon: BarChart3, color: "text-[#2563EB]" },
    { key: "sim-history", label: "SIM History", icon: Smartphone, color: "text-[#0F152A]" },
    { key: "customers", label: "My Customers", icon: Users, color: "text-[#2563EB]" },
    { key: "transfer", label: "Transfer SIMs", icon: RefreshCw, color: "text-[#2563EB]" },
    { key: "kyc", label: "KYC Update", icon: ClipboardList, color: "text-[#D9990D]" },
    { key: "commission", label: "Commission", icon: Coins, color: "text-[#F59E0B]" },
    { key: "refer", label: "Refer Partner", icon: Handshake, color: "text-[#D9990D]" },
    { key: "export", label: "Export Data", icon: Download, color: "text-[#2563EB]" },
    { key: "support", label: "Support", icon: MessageSquare, color: "text-[#66738C]" },
  ];

  const handleItemClick = (key: string) => {
    onOpenChange(false);
    onSelectAction?.(key);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="More Actions"
      size="md"
      showCloseButton={true}
    >
      <div className="pt-2 text-xs">
        {/* 3x3 Grid of Action Cards (Matching Image 3) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {actions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleItemClick(item.key)}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 sm:p-4 text-center hover:bg-white hover:border-[#2563EB] hover:shadow-md transition group"
              >
                <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-white shadow-xs group-hover:scale-105 transition">
                  <Icon className={`size-4 sm:size-5 ${item.color}`} />
                </div>
                <span className="font-extrabold text-[#0F152A] text-[11px] sm:text-xs leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </AppModal>
  );
}
