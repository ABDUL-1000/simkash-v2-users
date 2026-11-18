import { Popconfirm } from "antd";
import { ArrowDownLeft, ArrowUpRight, Check, X } from "lucide-react";
import type { SimRequest } from "../types";
import { STATUS_STYLES, URGENCY_STYLES, fmtDateTime, fmtNumber, unitLabel } from "../utils";

interface SimRequestCardProps {
  request: SimRequest;
  /** "mine": you asked someone. "incoming": someone asked you. */
  direction: "mine" | "incoming";
  onCancel?: (request: SimRequest) => Promise<unknown>;
  cancelling?: boolean;
  onApprove?: (request: SimRequest) => void;
  onReject?: (request: SimRequest) => void;
}

export function SimRequestCard({ request, direction, onCancel, cancelling, onApprove, onReject }: SimRequestCardProps) {
  const status = STATUS_STYLES[request.status] ?? STATUS_STYLES.PENDING;
  const other = direction === "mine" ? request.supplier : request.requester;
  const pending = request.status === "PENDING";
  const Icon = direction === "mine" ? ArrowUpRight : ArrowDownLeft;

  return <div className="space-y-3 rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
    <div className="flex items-start gap-3">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${direction === "mine" ? "bg-[#EFF4F8] text-[#2563EB]" : "bg-[#EBFFF8] text-[#10B981]"}`}><Icon className="size-4" /></span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-[#0F152A]">{fmtNumber(request.quantity)} {request.sim_type_label || request.sim_type}{request.quantity === 1 ? "" : "s"}{request.network ? ` · ${request.network}` : ""}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${status.className}`}>{status.label}</span>
        </div>
        <p className="mt-0.5 truncate text-[11px] text-[#8C909B]">
          {direction === "mine" ? "To" : "From"} <b className="capitalize text-[#0F152A]">{other?.name?.toLowerCase() || "—"}</b>
          {other?.role_label ? ` (${other.role_label})` : ""} · <span className="font-mono">{request.reference}</span>
        </p>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
      <span className={`rounded-full px-2 py-0.5 capitalize ${URGENCY_STYLES[request.urgency] ?? URGENCY_STYLES.normal}`}>{request.urgency} urgency</span>
      <span className="rounded-full bg-[#F8FAFC] px-2 py-0.5 text-[#66738C]">Requested {fmtDateTime(request.created_at)}</span>
      {request.status === "APPROVED" && request.approved_quantity != null && <span className="rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[#10B981]">{fmtNumber(request.approved_quantity)} {unitLabel(request.sim_type, request.approved_quantity)} sent</span>}
    </div>

    {(request.note || request.response_note || request.distribution_reference) && <div className="space-y-1 rounded-xl bg-[#F8FAFC] p-3 text-[11px] text-[#66738C]">
      {request.note && <p><b className="text-[#0F152A]">Note:</b> {request.note}</p>}
      {request.response_note && <p><b className="text-[#0F152A]">{request.status === "REJECTED" ? "Reason" : "Reply"}:</b> {request.response_note}</p>}
      {request.distribution_reference && <p><b className="text-[#0F152A]">Distribution:</b> <span className="font-mono">{request.distribution_reference}</span></p>}
    </div>}

    {pending && (onCancel || onApprove) && <div className="flex flex-wrap justify-end gap-2 border-t border-[#E2ECF6] pt-3">
      {direction === "mine" && onCancel && <Popconfirm title="Cancel this request?" description="Your supplier will be told it's no longer needed." okText="Cancel request" cancelText="Keep"
        okButtonProps={{ danger: true, loading: cancelling }} onConfirm={() => onCancel(request).catch(() => undefined)}>
        <button type="button" className="rounded-lg border border-[#E2ECF6] px-3 py-1.5 text-[11px] font-bold text-[#EF4444] hover:bg-red-50">Cancel request</button>
      </Popconfirm>}
      {direction === "incoming" && <>
        <button type="button" onClick={() => onReject?.(request)} className="flex items-center gap-1 rounded-lg border border-[#E2ECF6] px-3 py-1.5 text-[11px] font-bold text-[#EF4444] hover:bg-red-50"><X className="size-3.5" /> Decline</button>
        <button type="button" onClick={() => onApprove?.(request)} className="flex items-center gap-1 rounded-lg bg-[#2563EB] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-blue-700"><Check className="size-3.5" /> Approve & send</button>
      </>}
    </div>}
  </div>;
}
