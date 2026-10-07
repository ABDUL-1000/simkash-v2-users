import type { ReactNode } from "react";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { colors } from "@/constants/colors";
import "./rm-design.css";

export function RmPanel({ title, description, actions, children }: { title: string; description?: string; actions?: PageHeaderAction[]; children: ReactNode }) {
  return <section className="rm-panel"><div className="rm-panel-heading"><PageHeader title={title} description={description} actions={actions} /></div><div className="rm-panel-body">{children}</div></section>;
}
export function RmInfoRows({ rows }: { rows: Array<[string, ReactNode]> }) {
  return <dl className="rm-info-rows">{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}
export function RmStockSummary({ total, children }: { total: number; children?: ReactNode }) {
  return <div className="rounded-xl p-3 text-xs" style={{ background: colors.backgrounds.base, color: colors.blues.primary }}><strong>Your current inventory: {total.toLocaleString()} SIMs</strong>{children && <div className="mt-1" style={{ color: colors.texts.muted }}>{children}</div>}</div>;
}
