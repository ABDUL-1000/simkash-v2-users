import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import { Plus } from "lucide-react";
import { TopUpWalletModal } from "@/features/dashboard/Modals/TopUpWalletModal";

/**
 * "Top Up" for agent dashboards (AP, SC, RM, CA, EP, EB, installer).
 * Opens the wallet top-up modal with the agent's virtual accounts, and returns to this page after OPay checkout.
 * `compact` matches the small buttons inside WalletBalanceCards; the default matches PageHeader actions.
 */
export function AgentTopUpButton({ compact = false, currentBalance }: { compact?: boolean; currentBalance?: number }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return <>
    {compact
      ? <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3 py-1.5 text-[11px] font-bold text-white shadow-xs hover:bg-blue-700">
          <Plus className="size-3.5" />Top Up
        </button>
      : <Button icon={<Plus className="size-4" />} onClick={() => setOpen(true)}>Top Up</Button>}
    <TopUpWalletModal open={open} onOpenChange={setOpen} currentBalance={currentBalance} showVirtualAccounts returnPath={pathname} />
  </>;
}
