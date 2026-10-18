import { useState } from "react";
import { DatePicker, Input, Pagination, Select, Skeleton } from "antd";
import { Archive, ArrowDownToLine, Clock, Search, Send, X } from "lucide-react";
import dayjs from "dayjs";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmInventoryHistory } from "../../api/inventory";
import { useGetRmStateCoordinators } from "../../api/dashboard";
import type { RmHistoryParams } from "../../types/territory";
import type { RmInventoryHistoryItem } from "../../types/inventory";
import { RmFlowModal, RmReceipt } from "../../Modals/flow/RmFlow";
import { rmFlow } from "../../Modals/flow/rmFlowTokens";

type Filters = Omit<RmHistoryParams, "page" | "limit">;
const defaults: Filters = { event_type: "all", sim_type: "all", sortBy: "newest" };
const eventTones: Record<string, { color: string; bg: string }> = {
  received: { color: rmFlow.green, bg: rmFlow.greenBg }, distributed: { color: rmFlow.blue, bg: rmFlow.blueBg },
  adjusted: { color: rmFlow.slate, bg: rmFlow.base }, returned: { color: rmFlow.amberInk, bg: rmFlow.amberBg },
};
const simTones: Record<string, { color: string; bg: string }> = {
  pos: { color: rmFlow.navy, bg: rmFlow.softBlue }, cctv: { color: rmFlow.green, bg: rmFlow.greenBg },
  gps: { color: rmFlow.slate, bg: rmFlow.base }, router: { color: rmFlow.amberInk, bg: rmFlow.amberBg },
};
const cap = (value: string) => value ? value[0].toUpperCase() + value.slice(1) : value;
const simLabel = (value: string) => `${value.toLowerCase() === "router" ? "Router" : value.toUpperCase()} SIM`;
const Chip = ({ text, tone }: { text: string; tone: { color: string; bg: string } }) => <span className="inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold" style={{ color: tone.color, background: tone.bg }}>{text}</span>;

function HistoryDetail({ item, onClose }: { item: RmInventoryHistoryItem; onClose: () => void }) {
  const credit = item.quantity_delta >= 0;
  return <RmFlowModal title="Stock Event Details" subtitle={`${item.reference} · ${cap(item.event_type)}`} onClose={onClose} primary={{ label: "Close", onClick: onClose }}>
    <div className="py-2 text-center"><p className="text-3xl font-bold" style={{ color: credit ? rmFlow.green : rmFlow.red }}>{item.quantity_formatted}</p><p className="mt-1 text-xs" style={{ color: rmFlow.muted }}>{simLabel(item.sim_type)}</p></div>
    <RmReceipt rows={[["Reference", item.reference], ["Event", <Chip text={cap(item.event_type)} tone={eventTones[item.event_type] ?? eventTones.adjusted} />], ["SIM type", simLabel(item.sim_type)], ["Network", item.network], ["From / To", item.party_info], ["Time", item.time], "divider", ["Stock after", `${item.stock_after.toLocaleString()} SIMs`]]} />
  </RmFlowModal>;
}

export function RmInventoryHistory() {
  const [filters, setFilters] = useState<Filters>(defaults);
  const [selected, setSelected] = useState<RmInventoryHistoryItem>();
  const pagination = useTablePagination({ initialPageSize: 15 });
  const query = useGetRmInventoryHistory({ ...filters, page: pagination.page, limit: pagination.pageSize });
  const coordinators = useGetRmStateCoordinators({ page: 1, limit: 50, status: "all" });
  const change = (values: Partial<Filters>) => { setFilters(current => ({ ...current, ...values })); pagination.resetPage(); };
  const coordinatorName = coordinators.data?.items.find(row => row.id === filters.coordinator_id)?.name;
  const chips = [
    filters.event_type !== "all" && { key: "event_type", label: cap(filters.event_type ?? ""), reset: { event_type: "all" } },
    filters.sim_type !== "all" && { key: "sim_type", label: simLabel(filters.sim_type ?? ""), reset: { sim_type: "all" } },
    filters.coordinator_id && { key: "coordinator", label: coordinatorName ?? "Selected SC", reset: { coordinator_id: undefined } },
    filters.start_date && { key: "dates", label: `${dayjs(filters.start_date).format("D MMM")} → ${dayjs(filters.end_date).format("D MMM")}`, reset: { start_date: undefined, end_date: undefined } },
    filters.search && { key: "search", label: `“${filters.search}”`, reset: { search: undefined } },
  ].filter(Boolean) as Array<{ key: string; label: string; reset: Partial<Filters> }>;
  const cards = query.data?.summary_cards;
  const summary = [
    { key: "total_received", label: "Total Received", sub: "SIMs received all time", icon: ArrowDownToLine, color: rmFlow.green },
    { key: "total_distributed", label: "Total Distributed", sub: "Sent to SCs all time", icon: Send, color: rmFlow.navy },
    { key: "currently_in_stock", label: "Currently in Stock", sub: "Available right now", icon: Archive, color: rmFlow.green },
    { key: "pending_request", label: "Pending Request", sub: "In pending request", icon: Clock, color: rmFlow.amber },
  ];
  const groups = query.data?.grouped_history.filter(group => group.items.length) ?? [];

  return <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{summary.map(({ key, label, sub, icon: Icon, color }) =>
      <div key={key} className="rounded-xl border bg-white p-4" style={{ borderColor: rmFlow.border }}>
        <p className="text-xs font-semibold" style={{ color: rmFlow.ink }}>{label}</p><Icon className="my-2 size-5" style={{ color }} />
        <p className="text-2xl font-bold" style={{ color }}>{cards?.[key]?.count?.toLocaleString() ?? "—"}</p><p className="text-[11px]" style={{ color: rmFlow.muted }}>{sub}</p>
      </div>)}</div>

    <div className="space-y-3 rounded-xl border bg-white p-4" style={{ borderColor: rmFlow.border }}>
      <Input size="large" prefix={<Search className="size-4" style={{ color: rmFlow.muted }} />} allowClear placeholder="Search by SC name, SIM type, ref..." value={filters.search ?? ""} onChange={event => change({ search: event.target.value || undefined })} />
      <div className="flex flex-wrap items-center gap-2">
        <Select className="min-w-36" value={filters.event_type} onChange={event_type => change({ event_type })} options={["all", "received", "distributed", "adjusted", "returned"].map(value => ({ value, label: value === "all" ? "All Events" : cap(value) }))} />
        <Select className="min-w-36" value={filters.sim_type} onChange={sim_type => change({ sim_type })} options={["all", "pos", "cctv", "gps", "router"].map(value => ({ value, label: value === "all" ? "All SIM Types" : simLabel(value) }))} />
        <Select className="min-w-40" allowClear showSearch optionFilterProp="label" placeholder="All SCs" value={filters.coordinator_id} loading={coordinators.isLoading} onChange={coordinator_id => change({ coordinator_id })} options={(coordinators.data?.items ?? []).map(row => ({ value: row.id, label: row.name }))} />
        <DatePicker.RangePicker placeholder={["From", "To"]} value={filters.start_date && filters.end_date ? [dayjs(filters.start_date), dayjs(filters.end_date)] : null} onChange={dates => change({ start_date: dates?.[0]?.format("YYYY-MM-DD"), end_date: dates?.[1]?.format("YYYY-MM-DD") })} />
        <div className="ml-auto flex items-center gap-3"><Select value={filters.sortBy} onChange={sortBy => change({ sortBy })} options={[{ value: "newest", label: "Newest First" }, { value: "oldest", label: "Oldest First" }]} /><span className="text-xs" style={{ color: rmFlow.muted }}>{query.data?.showing_text}</span></div>
      </div>
      {chips.length > 0 && <div className="flex flex-wrap items-center gap-2">{chips.map(chip => <button key={chip.key} type="button" onClick={() => change(chip.reset)} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: rmFlow.navy, color: rmFlow.navy, background: rmFlow.blueBg }}>{chip.label}<X className="size-3" /></button>)}
        <button type="button" className="text-xs font-semibold" style={{ color: rmFlow.navy }} onClick={() => { setFilters(defaults); pagination.resetPage(); }}>Clear all</button></div>}
    </div>

    <div className="overflow-hidden rounded-xl border bg-white" style={{ borderColor: rmFlow.border }}>
      {query.error ? <div className="p-5"><AppEmptyState title="Unable to load inventory history" description={query.error.message} actionText="Retry" onAction={() => void query.refetch()} /></div>
        : query.isLoading ? <div className="p-5"><Skeleton active paragraph={{ rows: 6 }} /></div>
          : groups.length ? <div className="overflow-x-auto"><table className="w-full min-w-215 text-sm">
            <thead><tr className="border-b text-left text-[11px] font-semibold uppercase" style={{ borderColor: rmFlow.border, color: rmFlow.muted }}>{["Date", "Event", "SIM Type", "Network", "Qty", "From / To", "Stock After", "Ref", ""].map(head => <th key={head} className="px-4 py-3 font-semibold">{head}</th>)}</tr></thead>
            {groups.map(group => <tbody key={group.date_group}>
              <tr><td colSpan={9} className="px-4 pb-1 pt-4 text-[11px] font-semibold uppercase" style={{ color: rmFlow.muted }}><span className="flex items-center gap-3">{group.date_group}<span className="h-px flex-1" style={{ background: rmFlow.border }} /></span></td></tr>
              {group.items.map(item => { const [day, ...rest] = item.time.split(" ");
                return <tr key={item.id} className="border-b transition hover:bg-slate-50" style={{ borderColor: rmFlow.border }}>
                  <td className="px-4 py-3"><p className="font-medium">{day}</p><p className="text-[11px]" style={{ color: rmFlow.muted }}>{rest.join(" ")}</p></td>
                  <td className="px-4 py-3"><Chip text={cap(item.event_type)} tone={eventTones[item.event_type] ?? eventTones.adjusted} /></td>
                  <td className="px-4 py-3"><Chip text={simLabel(item.sim_type)} tone={simTones[item.sim_type.toLowerCase()] ?? simTones.gps} /></td>
                  <td className="px-4 py-3 text-xs">{item.network}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: item.quantity_delta >= 0 ? rmFlow.green : rmFlow.red }}>{item.quantity_formatted}</td>
                  <td className="px-4 py-3 text-xs">{item.party_info}</td>
                  <td className="px-4 py-3 font-semibold">{item.stock_after.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[11px]" style={{ color: rmFlow.muted }}>{item.reference}</td>
                  <td className="px-4 py-3"><button type="button" className="text-xs font-semibold" style={{ color: rmFlow.navy }} onClick={() => setSelected(item)}>View</button></td>
                </tr>; })}
            </tbody>)}
          </table></div> : <div className="p-5"><AppEmptyState title="No inventory history" description="No stock events match these filters." /></div>}
      {(query.data?.total ?? 0) > pagination.pageSize && <div className="flex justify-center border-t p-4" style={{ borderColor: rmFlow.border }}><Pagination {...pagination.paginationConfig} total={query.data?.total} disabled={query.isFetching} showSizeChanger={false} responsive /></div>}
    </div>
    {selected && <HistoryDetail item={selected} onClose={() => setSelected(undefined)} />}
  </div>;
}
