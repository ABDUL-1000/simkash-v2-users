import { useState } from "react";
import { Button } from "antd";
import { Eye, EyeOff, Package, Smartphone, Users, UserCheck } from "lucide-react";
import { colors } from "@/constants/colors";
import type { RmDashboardOverviewData } from "../../types/api";

export function RmDashboardMetrics({ data, onPayout }: { data: RmDashboardOverviewData; onPayout: () => void }) {
  const [hidden, setHidden] = useState(false);
  const cards = data.primary_cards;
  const icons = [Users, UserCheck, Smartphone, Package];
  const tones = [colors.blues.primary, colors.success, colors.primary, colors.warning];
  const surfaces = [colors.blues.surfaceLight, colors.greens.light, colors.blues.surfaceLight, colors.ambers.light];
  return <>
    <div className="rm-primary-strip">
      <div><p>Today</p><div className="rm-amount">{cards.today.activations.toLocaleString()}</div><p style={{ color: colors.success }}>{cards.today.commission_formatted} network commission</p><p className="mt-1" style={{ color: cards.today.comparison.direction === "down" ? colors.danger : colors.success }}>{cards.today.comparison.text}</p></div>
      <div><p>This Month</p><div className="rm-amount">{cards.this_month.activations_formatted}</div><p>{cards.this_month.subtitle}</p><p className="mt-1" style={{ color: colors.blues.primary }}>{cards.this_month.target.text}</p></div>
      <div><p>My Stock</p><div className="rm-amount">{cards.my_stock.available.toLocaleString()}</div><p>{cards.my_stock.subtitle}</p><p className="mt-1">{cards.my_stock.distributed_this_week_text}</p></div>
      <div><p>My Commission <button type="button" aria-label={hidden ? "Show commission" : "Hide commission"} onClick={() => setHidden(!hidden)} className="ml-1 inline-flex align-middle">{hidden ? <EyeOff size={13} /> : <Eye size={13} />}</button></p><div className="rm-amount">{hidden ? "••••••" : cards.my_commission.formatted}</div><p>{cards.my_commission.subtitle}</p><Button className="mt-2" size="small" style={{ background: colors.warning, borderColor: colors.warning, color: colors.texts.whiteFixed }} disabled={!cards.my_commission.can_request_payout} onClick={onPayout}>Request payout</Button></div>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{Object.entries(data.summary_cards).map(([key, card], index) => {
      const Icon = icons[index] ?? Package;
      return <div key={key} className="rounded-2xl border p-5" style={{ borderColor: colors.border, background: colors.backgrounds.background }}>
        <span className="mb-3 flex size-10 items-center justify-center rounded-full" style={{ background: surfaces[index], color: tones[index] }}><Icon size={20} /></span>
        <strong className="block text-3xl font-extrabold" style={{ color: tones[index] }}>{card.count.toLocaleString()}</strong><p className="mt-1 text-sm font-semibold">{card.label}</p><p className="mt-2 text-xs" style={{ color: colors.texts.muted }}>{card.subtitle}</p>
      </div>;
    })}</div>
  </>;
}
