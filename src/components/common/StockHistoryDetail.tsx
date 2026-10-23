import type { ReactNode } from "react";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";

/** A stock history event as returned by the role-specific GET .../history/{id} endpoints, normalised. */
export interface StockHistoryDetailView {
  reference: string;
  eventLabel: string;
  quantityText: string;
  incoming: boolean;
  simTypeLabel?: string;
  network?: string;
  date?: string;
  timeText?: string;
  sender?: { name: string; role?: string; phone?: string };
  recipient?: { name: string; role?: string; phone?: string; state?: string };
  stockAfter?: number;
  breakdown?: Record<string, number>;
  totalSims: number;
  page: number;
  totalPages: number;
  sims: Array<{ id: number; sim_number: string; serial_no?: string; network?: string; status?: string; type_label?: string; date?: string }>;
}

const TYPE_LABELS: Record<string, string> = { pos: "POS", cctv: "CCTV", gps: "GPS", router: "Router", cctv_device: "CCTV Device" };
const roleText = (role?: string) => role ? role.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : "";
const partyText = (party?: { name: string; role?: string; phone?: string; state?: string }) =>
  party ? [party.name, roleText(party.role), party.phone, party.state].filter(Boolean).join(" · ") : "—";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return <div className="flex justify-between gap-4 py-2"><span className="shrink-0 text-[#8C909B]">{label}</span><span className="text-right font-bold text-[#0F152A]">{children}</span></div>;
}

/** Body of the history detail: summary rows, per-type breakdown, and the paginated SIM list. */
export function StockHistoryDetailContent({ detail, loading, error, onRetry, onPageChange, fetching }: {
  detail?: StockHistoryDetailView; loading: boolean; error?: Error | null; onRetry?: () => void; onPageChange: (page: number) => void; fetching?: boolean;
}) {
  if (loading) return <p className="py-8 text-center text-xs text-[#8C909B]">Loading event details…</p>;
  if (!detail) return <AppEmptyState title="Couldn't load this event" description={error?.message ?? "Please try again."} actionText={onRetry ? "Retry" : undefined} onAction={onRetry} />;
  const breakdown = Object.entries(detail.breakdown ?? {}).filter(([type, count]) => type !== "total" && count > 0);

  return (
    <div className="space-y-4 text-xs">
      <div className="py-1 text-center">
        <p className={`text-3xl font-black ${detail.incoming ? "text-[#10B981]" : "text-[#EF4444]"}`}>{detail.quantityText}</p>
        <p className="mt-1 font-bold text-[#8C909B]">{detail.simTypeLabel}</p>
        <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-[10px] font-extrabold ${detail.incoming ? "bg-[#EBFFF8] text-[#10B981]" : "bg-[#EFF4F8] text-[#2563EB]"}`}>{detail.eventLabel}</span>
      </div>

      <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] px-4">
        <Row label="Reference"><span className="font-mono">{detail.reference}</span></Row>
        <Row label="From">{partyText(detail.sender)}</Row>
        <Row label="To">{partyText(detail.recipient)}</Row>
        {detail.network && <Row label="Network">{detail.network}</Row>}
        <Row label="Date">{detail.date ? new Date(detail.date).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" }) : detail.timeText ?? "—"}</Row>
        {detail.stockAfter !== undefined && <Row label="Stock after">{detail.stockAfter.toLocaleString()} SIMs</Row>}
      </div>

      {breakdown.length > 0 && <div className="space-y-2">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Breakdown</p>
        <div className="flex flex-wrap gap-2">
          {breakdown.map(([type, count]) => <span key={type} className="rounded-full bg-[#EFF4F8] px-3 py-1 font-bold text-[#0F152A]">{TYPE_LABELS[type] ?? type} <span className="text-[#2563EB]">{count}</span></span>)}
          <span className="rounded-full bg-[#0F152A] px-3 py-1 font-bold text-white">Total {detail.totalSims}</span>
        </div>
      </div>}

      <div className="space-y-2">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">SIMs in this event ({detail.totalSims})</p>
        <div className={`max-h-72 overflow-auto rounded-2xl border border-[#E2ECF6] ${fetching ? "opacity-60" : ""}`}>
          <table className="w-full min-w-[480px] text-left">
            <thead className="sticky top-0 bg-[#F8FAFC] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              <tr><th className="px-3 py-2">SIM number</th><th className="px-3 py-2">Serial</th><th className="px-3 py-2">Type</th><th className="px-3 py-2">Network</th><th className="px-3 py-2">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
              {detail.sims.length === 0 && <tr><td colSpan={5} className="px-3 py-4 text-center text-[#8C909B]">No SIM list for this event.</td></tr>}
              {detail.sims.map((sim) => (
                <tr key={sim.id}>
                  <td className="px-3 py-2 font-mono font-bold">{sim.sim_number}</td>
                  <td className="px-3 py-2 font-mono text-[#66738C]">{sim.serial_no || "—"}</td>
                  <td className="px-3 py-2">{sim.type_label ?? "—"}</td>
                  <td className="px-3 py-2 text-[#66738C]">{sim.network ?? "—"}</td>
                  <td className="px-3 py-2 text-[10px] font-bold text-[#66738C]">{sim.status ? roleText(sim.status) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {detail.totalPages > 1 && <div className="flex items-center justify-between">
          <button type="button" disabled={detail.page <= 1 || fetching} onClick={() => onPageChange(detail.page - 1)} className="font-bold text-[#2563EB] disabled:opacity-40">Prev</button>
          <span className="font-bold text-[#0F152A]">Page {detail.page} of {detail.totalPages}</span>
          <button type="button" disabled={detail.page >= detail.totalPages || fetching} onClick={() => onPageChange(detail.page + 1)} className="font-bold text-[#2563EB] disabled:opacity-40">Next</button>
        </div>}
      </div>
    </div>
  );
}

/** AppModal wrapper for roles without their own modal style. */
export function StockHistoryDetailModal({ open, onOpenChange, title = "Stock Event Details", ...content }: Parameters<typeof StockHistoryDetailContent>[0] & { open: boolean; onOpenChange: (open: boolean) => void; title?: string }) {
  return <AppModal open={open} onOpenChange={onOpenChange} title={title} description={content.detail?.reference} size="lg">
    <StockHistoryDetailContent {...content} />
  </AppModal>;
}
