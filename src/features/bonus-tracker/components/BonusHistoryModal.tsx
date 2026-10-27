import { AppModal } from "@/components/common/AppModal";
import type { BonusRole } from "../api";
import { BonusHistoryTable } from "./BonusHistoryTable";

export function BonusHistoryModal({ role, open, onClose }: { role: BonusRole; open: boolean; onClose: () => void }) {
  return <AppModal open={open} onOpenChange={(value) => { if (!value) onClose(); }} title="Bonus History" description="Weekly performance bonuses credited to your wallet" size="lg">
    {open && <BonusHistoryTable role={role} />}
  </AppModal>;
}
