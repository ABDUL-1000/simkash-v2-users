import { useState } from "react";
import { Eye, EyeOff, Wallet, Landmark, FileText, List, Building, TrendingUp, CircleCheck, Trophy } from "lucide-react";
import { colors } from "@/constants/colors";
import type { RmWalletOverviewData } from "../../types/wallet";
export type RmWalletAction = "payout" | "statement" | "history" | "bank";
export function RmWalletCards({ data, onAction, payoutDisabled, bankDisabled }: { data: RmWalletOverviewData; onAction: (action: RmWalletAction) => void; payoutDisabled: boolean; bankDisabled: boolean }) {
  const [hidden, setHidden] = useState(false);
  const actions = [{ key: "payout", label: "Request Payout", icon: Landmark, bg: colors.ambers.light, color: colors.warning }, { key: "statement", label: "Statement", icon: FileText, bg: colors.blues.surfaceLight, color: colors.blues.primary }, { key: "history", label: "History", icon: List, bg: colors.blues.surfaceMid, color: colors.blues.primary }, { key: "bank", label: "Bank Details", icon: Building, bg: colors.greens.primary, color: colors.success }] as const;
  const stats = [{ ...data.stats_cards.total_earned, icon: TrendingUp, color: colors.success, bg: colors.greens.primary }, { ...data.stats_cards.total_paid_out, icon: CircleCheck, color: colors.textPrimary, bg: colors.blues.surfaceLight }, { ...data.stats_cards.best_month, icon: Trophy, color: colors.warning, bg: colors.ambers.light }];
  return <>
    <section className="rm-wallet-balance">
      <div className="flex items-center gap-3 text-sm"><span className="rm-wallet-icon" style={{ background: colors.blues.surfaceLight, color: colors.blues.primary }}><Wallet size={21} /></span><span style={{ color: colors.texts.muted }}>Commission Balance</span><button className="ml-auto p-2" aria-label={hidden ? "Show balance" : "Hide balance"} onClick={() => setHidden(!hidden)}>{hidden ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
      <p className="my-4 break-words text-3xl font-bold sm:text-4xl">{hidden ? "••••••" : data.balance_card.commission_balance_formatted}</p>
      <div className="flex flex-wrap gap-6">{Object.entries(data.balance_card.chips).map(([key, chip]) => <div key={key} className="text-xs" style={{ color: key === "network_activations" ? colors.success : colors.texts.muted }}><strong>{hidden ? "••••" : chip.formatted}</strong><p className="mt-1" style={{ color: colors.texts.muted }}>{chip.label}</p></div>)}</div>
      <div className="mt-6 flex flex-wrap justify-center gap-5">{actions.map(({ key, label, icon: Icon, bg, color }) => <button key={key} disabled={key === "payout" ? payoutDisabled : key === "bank" ? bankDisabled : false} onClick={() => onAction(key)} className="flex flex-col items-center gap-2 text-xs font-medium disabled:opacity-40"><span className="rm-wallet-icon" style={{ background: bg, color }}><Icon size={20} /></span>{label}</button>)}</div>
    </section>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{stats.map(({ label, formatted, subtext, icon: Icon, color, bg }) => <section key={label} className="rm-wallet-stat"><span className="rm-wallet-icon" style={{ background: bg, color }}><Icon size={20} /></span><div><strong className="text-xl" style={{ color }}>{hidden ? "••••" : formatted}</strong><p className="text-xs" style={{ color: colors.texts.muted }}>{label}</p><p className="mt-1 text-[11px]" style={{ color: colors.texts.muted }}>{subtext}</p></div></section>)}</div>
  </>;
}
