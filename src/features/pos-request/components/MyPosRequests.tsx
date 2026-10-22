import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetPosRequests } from "../api/usePosRequests";
import type { PosRequestListItem, PosRequestStatusFilter } from "../types/api";
import { posStatusTone } from "../utils/posStatus";

const FILTERS: Array<{ value: PosRequestStatusFilter; label: string }> = [
  { value: "all", label: "All" }, { value: "pending", label: "Pending" }, { value: "matched", label: "Matched" }, { value: "linked", label: "Linked" },
];

const columns: ColumnsType<PosRequestListItem> = [
  { title: "REQUEST", key: "request", render: (_, row) => <div><p className="text-xs font-bold text-[#0F152A]">{row.title || row.business_name}</p><p className="font-mono text-[10px] text-[#8C909B]">{row.reference}</p></div> },
  { title: "DETAILS", key: "details", render: (_, row) => <div className="text-xs"><p className="text-[#0F152A]">{row.subtitle || [row.state, row.business_type].filter(Boolean).join(" · ")}</p>{row.lga && <p className="text-[10px] text-[#8C909B]">{row.lga}</p>}</div> },
  { title: "PROVIDER", key: "provider", render: (_, row) => row.assigned_provider
    ? <span className="text-xs font-semibold text-[#0F152A]">{row.assigned_provider}</span>
    : <span className="text-xs text-[#8C909B]">Preferred: {row.preferred_pos_provider}</span> },
  { title: "STATUS", key: "status", render: (_, row) => { const tone = posStatusTone(row.status_color);
    return <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ color: tone.color, background: tone.bg }}><span className="size-1.5 rounded-full" style={{ background: tone.color }} />{row.status_label}</span>; } },
  { title: "SUBMITTED", key: "submitted", render: (_, row) => <span className="text-xs text-[#8C909B]" title={new Date(row.submitted_at).toLocaleString()}>{row.submitted_date_formatted.replace(/^Submitted\s*/i, "")}</span> },
];

export function MyPosRequests({ onOpen }: { onOpen: (id: number) => void }) {
  const [status, setStatus] = useState<PosRequestStatusFilter>("all");
  const [search, setSearch] = useState("");
  const query = useGetPosRequests({ status, search: search.trim() || undefined });
  const rows = query.data ?? [];
  const pagination = useTablePagination({ initialPageSize: 10, total: rows.length });

  return <section className="space-y-3 rounded-2xl border border-[#E2ECF6] bg-white p-5 sm:p-6">
    <div><h2 className="text-base font-bold text-[#1F3A5F]">My POS Requests</h2><p className="text-xs text-[#8C909B]">Track your requests and the provider assigned to you</p></div>
    {query.error ? <AppEmptyState title="Couldn't load your POS requests" description={query.error.message} actionText="Retry" onAction={() => void query.refetch()} />
      : <DataTable<PosRequestListItem> columns={columns} dataSource={rows} rowKey="id" loading={query.isFetching} onRowClick={row => onOpen(row.id)}
        pagination={pagination.paginationConfig} scroll={{ x: "max-content" }}
        searchPlaceholder="Search reference, business, state, LGA or provider" onSearch={value => { setSearch(value); pagination.resetPage(); }}
        extraFilters={<div className="flex flex-wrap gap-1.5">{FILTERS.map(filter => <button key={filter.value} type="button" onClick={() => { setStatus(filter.value); pagination.resetPage(); }}
          className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${status === filter.value ? "border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]" : "border-[#E2ECF6] text-[#66738C] hover:bg-[#F8FAFC]"}`}>{filter.label}</button>)}</div>}
        emptyTitle={search || status !== "all" ? "No matching requests" : "No POS requests yet"}
        emptyDescription={search || status !== "all" ? "Try a different status or search term." : "Submit the form above and your request will appear here."} />}
  </section>;
}
