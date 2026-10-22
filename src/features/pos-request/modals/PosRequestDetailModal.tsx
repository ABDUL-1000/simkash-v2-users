import { Skeleton } from "antd";
import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetPosRequestDetail } from "../api/usePosRequests";
import type { PosRequestDetail } from "../types/api";
import { posStatusTone } from "../utils/posStatus";

interface PosRequestDetailModalProps {
  open: boolean;
  onClose: () => void;
  /** Fetches GET /user/pos-machine/requests/{id}. */
  id?: number | null;
  /** Already-loaded request (e.g. the POST response) — shown without refetching. */
  request?: PosRequestDetail | null;
}

export function PosRequestDetailModal({ open, onClose, id, request }: PosRequestDetailModalProps) {
  const query = useGetPosRequestDetail(request ? null : id);
  const data = request ?? query.data;
  const tone = posStatusTone(data?.status_color);
  const rows: Array<[string, string | null | undefined]> = data ? [
    ["Ref", data.reference],
    ["Business", data.business_name],
    ["Type", data.business_type],
    ["State", [data.state, data.lga].filter(Boolean).join(" · ")],
    ["Address", data.business_address],
    ["Volume", data.estimated_monthly_transactions ? `${data.estimated_monthly_transactions}/month` : null],
    ["Preferred provider", data.preferred_pos_provider],
    ["Contact", [data.fullname, data.phone].filter(Boolean).join(" · ")],
    ["Submitted", data.submitted_date_formatted?.replace(/^Submitted\s*/i, "") || data.submitted],
    ["Notes", data.additional_notes],
  ] : [];

  return <AppModal open={open} onOpenChange={value => { if (!value) onClose(); }} size="sm" title={<span className="text-[#1F3A5F]">POS Request Detail</span>} description={data?.reference}
    footer={<button type="button" onClick={onClose} className="w-full rounded-xl bg-[#2563EB] py-3 text-sm font-semibold text-white hover:bg-blue-700">Close</button>}>
    {!request && query.isLoading ? <Skeleton active paragraph={{ rows: 8 }} />
      : !data ? <AppEmptyState title="Request not found" description={query.error?.message ?? "This POS request may no longer be available."} actionText={query.error ? "Retry" : undefined} onAction={query.error ? () => void query.refetch() : undefined} />
        : <div className="space-y-4">
          <div className="rounded-xl p-3" style={{ background: tone.bg }}>
            <p className="flex items-center gap-2 text-sm font-bold" style={{ color: tone.color }}><span className="size-2 rounded-full" style={{ background: tone.color }} />{data.status_label}</p>
            {data.note && <p className="mt-1 text-xs" style={{ color: tone.color }}>{data.note}</p>}
          </div>

          {data.assigned_provider && <div className="flex items-center justify-between rounded-xl bg-[#1F3A5F] px-4 py-3 text-sm font-semibold text-white"><span>{data.assigned_provider}</span><span className="text-xs font-normal opacity-80">Assigned provider</span></div>}

          <dl className="divide-y divide-[#E2ECF6] text-xs">
            {rows.filter(([, value]) => value).map(([label, value]) => <div key={label} className="flex justify-between gap-4 py-2.5"><dt className="text-[#8C909B]">{label}</dt><dd className="text-right font-semibold text-[#1F3A5F]">{value}</dd></div>)}
            <div className="flex justify-between gap-4 py-2.5"><dt className="text-[#8C909B]">Status</dt><dd className="flex items-center gap-1.5 font-semibold" style={{ color: tone.color }}><span className="size-2 rounded-full" style={{ background: tone.color }} />{data.status_label}</dd></div>
          </dl>

          {data.timeline?.length > 0 && <ol>{data.timeline.map((step, index) => {
            const last = index === data.timeline.length - 1;
            const color = step.completed ? "#10B981" : step.current ? "#2563EB" : "#CBD5E1";
            return <li key={step.step} className="flex gap-3">
              <div className="flex flex-col items-center"><span className="mt-1 flex size-3.5 items-center justify-center rounded-full" style={{ background: color }}>{step.completed && <Check className="size-2.5 text-white" strokeWidth={4} />}</span>{!last && <span className="w-0.5 flex-1" style={{ background: step.completed ? "#10B981" : "#E2ECF6" }} />}</div>
              <div className={last ? "" : "pb-4"}><p className="text-sm font-semibold text-[#0F152A]">{step.title}</p><p className="text-[11px] text-[#8C909B]">{step.completed ? "Completed" : step.current ? "In progress" : "Pending"}</p></div>
            </li>;
          })}</ol>}

          {/* "Rate your experience" from the design is not shown: there is no rating endpoint. */}
        </div>}
  </AppModal>;
}
