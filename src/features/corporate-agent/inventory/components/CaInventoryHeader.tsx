import { Package, Send, Clock } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { PageHeader } from "@/components/common/PageHeader";
export function CaInventoryHeader({ onRequestStock, onDistributeStock, onRequests, canRequest }: { onRequestStock: () => void; onDistributeStock: () => void; onRequests: () => void; canRequest: boolean }) {
 return <PageHeader title="SIM Inventory" description="Manage stock received from Super Admin and distribute to your Agency Partners" actions={[
  // Export Report remains unavailable: no inventory export endpoint was supplied.
  { key: "requests", label: "Stock Requests", icon: <Clock className="w-3.5 h-3.5" />, variant: "outline", onClick: onRequests },
  { key: "request", label: "Request Stock", icon: <Package className="w-4 h-4" />, onClick: onRequestStock, disabled: !canRequest, className: "px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs", style: { backgroundColor: APP_COLORS.greys.primary, borderColor: APP_COLORS.greys.primary } },
  { key: "distribute", label: "Distribute to AP", icon: <Send className="w-3.5 h-3.5" />, onClick: onDistributeStock, variant: "outline", className: "px-4 py-2 rounded-xl text-xs font-bold border", style: { borderColor: APP_COLORS.greens.secondary, color: APP_COLORS.greens.secondary } },
 ]} />;
}
