import { Users, CheckCircle, AlertCircle, Ban, Network, Package, Send, Download, Clock } from "lucide-react";
import { colors } from "@/constants/colors";
const icons = { state_coordinators: Users, active_scs: CheckCircle, at_risk: AlertCircle, suspended: Ban, agency_partners: Network, total_available: Package, distributed: Send, received: Download, pending_request: Clock, scs_low_on_stock: AlertCircle };
export function RmSummaryCards({ cards }: { cards: Record<string, { count: number; label?: string; subtext?: string }> }) {
  const tones = [colors.blues.primary, colors.success, colors.primary, colors.warning, colors.danger];
  return <section aria-label="Summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">{Object.entries(cards).map(([key, card], index) => { const Icon = icons[key as keyof typeof icons] ?? Package; const tone = tones[index % tones.length]; return <div key={key} className="rounded-2xl border p-4" style={{ borderColor: colors.border, background: colors.backgrounds.background }}><span className="mb-3 flex size-10 items-center justify-center rounded-xl" style={{ background: colors.blues.surfaceLight, color: tone }}><Icon size={18} /></span><strong className="text-2xl" style={{ color: tone }}>{card.count.toLocaleString()}</strong><p className="mt-1 text-xs font-semibold">{card.label ?? key.replaceAll("_", " ")}</p>{card.subtext && <p className="mt-2 text-[11px]" style={{ color: colors.texts.muted }}>{card.subtext}</p>}</div>; })}</section>;
}

