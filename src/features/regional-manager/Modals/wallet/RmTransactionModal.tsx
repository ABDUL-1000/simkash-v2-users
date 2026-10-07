import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import type { RmGroupedTransactionItem } from "../../types/wallet";
import { RmInfoRows } from "../../components/dashboard/RmDesign";
import { rmDesignTokens } from "../../components/dashboard/rmDesignTokens";
import { RmStatus } from "../../components/dashboard/RmDashboardPrimitives";
export function RmTransactionModal({ transaction: tx, onClose }: { transaction: RmGroupedTransactionItem; onClose: () => void }) {
  return <AppModal open title="Transaction Details" description={`${tx.reference} · ${tx.title}`} size="sm" onOpenChange={open => { if (!open) onClose(); }} actions={[{ key: "close", label: "Close", onClick: onClose }]}><div className="rm-design space-y-5" style={rmDesignTokens}><div className="py-5 text-center"><strong className="text-2xl" style={{ color: tx.status.toLowerCase() === "failed" ? colors.texts.muted : tx.flow === "credit" ? colors.success : colors.textPrimary }}>{tx.amount_formatted}</strong><p className="my-2 text-xs">{tx.title}</p><RmStatus value={tx.status} /></div><RmInfoRows rows={[["Reference", tx.reference], ["Type", tx.category.replaceAll("_", " ")], ["Description", tx.subtitle], ["Status", tx.status], ["Time", tx.time], ["Flow", tx.flow]]} />{/* Wallet impact, network breakdown, provider tokens, receipt download and retry controls remain commented: no detail/receipt/retry endpoint supplies these fields. */}</div></AppModal>;
}
