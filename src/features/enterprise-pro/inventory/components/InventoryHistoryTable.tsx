import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import { DataTable } from '@/components/common/DataTable';
import { StockHistoryDetailModal } from '@/components/common/StockHistoryDetail';
import { useTablePagination } from '@/hooks/useTablePagination';
import { useGetEnterpriseInventoryHistory, useGetEnterpriseInventoryHistoryDetail } from '../api';
import type { EnterpriseInventoryHistoryRow, HistoryParams } from '../types/simInventory';
import { EpQueryState } from '../../components/EpQueryState';
import { useGetEnterpriseScOverview } from '../../network/api/queries';

const EVENTS: { key: NonNullable<HistoryParams['event_type']>; label: string }[] = [
    { key: 'all', label: 'All' }, { key: 'received', label: 'Received' }, { key: 'distributed', label: 'Distributed' }, { key: 'returned', label: 'Returned' }, { key: 'adjusted', label: 'Adjusted' },
];
const BADGE: Record<string, string> = { received: 'text-emerald-700 bg-emerald-50 border-emerald-200', distributed: 'text-blue-700 bg-blue-50 border-blue-200', returned: 'text-amber-700 bg-amber-50 border-amber-200', adjusted: 'text-slate-700 bg-slate-50 border-slate-200' };

/** GET /sim-inventory/history with all filters; a row opens GET /history/{id}. */
export const InventoryHistoryTable: React.FC = () => {
    const [eventFilter, setEventFilter] = useState<NonNullable<HistoryParams['event_type']>>('all');
    const [typeFilter, setTypeFilter] = useState<NonNullable<HistoryParams['sim_type']>>('all');
    const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
    const [scId, setScId] = useState<number>();
    const [dates, setDates] = useState({ start: '', end: '' });
    const [search, setSearch] = useState('');
    const [debounced, setDebounced] = useState('');
    const [selectedId, setSelectedId] = useState<string>();
    const { page, pageSize, paginationConfig, resetPage } = useTablePagination({ initialPageSize: 12 });
    useEffect(() => { const timer = setTimeout(() => setDebounced(search), 350); return () => clearTimeout(timer); }, [search]);
    const query = useGetEnterpriseInventoryHistory({ event_type: eventFilter, sim_type: typeFilter, sortBy: sort, search: debounced || undefined, partner_id: scId, start_date: dates.start || undefined, end_date: dates.end || undefined, page, limit: pageSize });
    const coordinators = useGetEnterpriseScOverview({ page: 1, limit: 50 });
    const changeEvent = (value: NonNullable<HistoryParams['event_type']>) => { setEventFilter(value); resetPage(); };
    const changeType = (value: NonNullable<HistoryParams['sim_type']>) => { setTypeFilter(value); resetPage(); };
    const count = (value: number | undefined) => <span className={value ? 'font-mono font-bold text-slate-800' : 'text-slate-300 font-mono'}>{value ?? '—'}</span>;
    const columns: ColumnsType<EnterpriseInventoryHistoryRow> = [
        { title: 'DATE', dataIndex: 'date', render: (date: string, row) => <div><div className="font-bold text-slate-900">{date}</div><div className="text-[10px] text-slate-400">{row.time_ago}</div></div> },
        { title: 'EVENT', dataIndex: 'event_label', render: (label: string, row) => <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-md ${BADGE[row.event_type] ?? BADGE.adjusted}`}>{label}</span> },
        { title: 'DESCRIPTION', dataIndex: 'party_info', render: (info: string, row) => <div><div className="font-bold text-slate-900">{info}</div><div className="text-[10px] text-slate-400">{[row.sim_type_label, row.network].filter(Boolean).join(' · ')}</div></div> },
        ...(['pos', 'cctv', 'gps', 'router'] as const).map(key => ({ title: key.toUpperCase(), key, align: 'center' as const, render: (_: unknown, row: EnterpriseInventoryHistoryRow) => count(row.breakdown?.[key]) })),
        { title: 'TOTAL', dataIndex: 'quantity_formatted', align: 'center', render: (value: string, row) => <span className={row.quantity_delta >= 0 ? 'text-emerald-600 font-mono font-bold' : 'text-rose-600 font-mono font-bold'}>{value}</span> },
        { title: 'REF#', dataIndex: 'reference', align: 'right', render: (reference: string) => <span className="font-mono text-[11px] text-slate-400">{reference}</span> },
    ];
    return (<div className="space-y-4">
      {/* Filter strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {EVENTS.map((item) => (<button key={item.key} type="button" onClick={() => changeEvent(item.key)} className={`px-3 py-1.5 rounded-full font-medium transition-all ${eventFilter === item.key ? "bg-slate-900 text-white font-bold" : "bg-white text-slate-600 border border-slate-200"}`}>{item.label}</button>))}

          <span className="text-slate-300 px-1">·</span>

          <button type="button" onClick={() => changeType("all")} className={`px-2.5 py-1.5 rounded-lg font-semibold ${typeFilter === "all" ? "text-blue-700 bg-blue-50" : "text-slate-600"}`}>All Types</button>
          {["POS", "CCTV", "GPS", "Router"].map((t) => (<button key={t} type="button" onClick={() => changeType(t.toLowerCase() as NonNullable<HistoryParams["sim_type"]>)} className={`px-2.5 py-1.5 rounded-lg font-medium ${typeFilter === t.toLowerCase() ? "text-blue-700 bg-blue-50 font-bold" : "text-slate-500 hover:text-slate-900"}`}>{t}</button>))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select value={scId ?? ''} onChange={(e) => { setScId(Number(e.target.value) || undefined); resetPage(); }} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium">
            <option value="">All SCs</option>
            {(coordinators.data?.coordinators ?? []).map((sc) => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
          </select>
          <input type="date" aria-label="From date" value={dates.start} max={dates.end || undefined} onChange={(e) => { setDates({ ...dates, start: e.target.value }); resetPage(); }} className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"/>
          <input type="date" aria-label="To date" value={dates.end} min={dates.start || undefined} onChange={(e) => { setDates({ ...dates, end: e.target.value }); resetPage(); }} className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700"/>
          <button type="button" onClick={() => { setSort(sort === 'newest' ? 'oldest' : 'newest'); resetPage(); }} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium inline-flex items-center gap-1.5">
            <span>{sort === 'newest' ? 'Newest' : 'Oldest'}</span><ChevronDown className="w-3 h-3 text-slate-400"/>
          </button>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2"/>
            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); resetPage(); }} placeholder="Search..." className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 w-36 sm:w-44"/>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {query.isError ? <EpQueryState error={query.error} retry={query.refetch}/> : <DataTable<EnterpriseInventoryHistoryRow> hideToolbar columns={columns} dataSource={query.data?.history ?? []} loading={query.isPending} rowKey="id" pagination={{ ...paginationConfig, total: query.data?.total ?? 0 }} scroll={{ x: 'max-content' }} onRowClick={(row) => setSelectedId(row.id)} emptyTitle="No inventory movements"/>}
      </div>
      {selectedId && <HistoryDetail id={selectedId} onClose={() => setSelectedId(undefined)}/>}
    </div>);
};

function HistoryDetail({ id, onClose }: { id: string; onClose: () => void }) {
    const query = useGetEnterpriseInventoryHistoryDetail(id);
    const data = query.data;
    return <StockHistoryDetailModal open onOpenChange={(open) => { if (!open) onClose(); }} loading={query.isLoading} fetching={query.isFetching} error={query.error} onRetry={() => void query.refetch()} onPageChange={() => undefined}
      detail={data && {
            reference: data.reference, eventLabel: data.event_label, quantityText: data.quantity_formatted, incoming: data.quantity_delta >= 0,
            simTypeLabel: data.sim_type_label || data.sim_type, network: data.network, date: data.created_at || data.date, timeText: data.time,
            sender: data.sender, recipient: data.recipient, breakdown: data.breakdown as unknown as Record<string, number>, totalSims: data.total_sims, page: 1, totalPages: 1,
            sims: (data.sims ?? []).map((sim) => ({ ...sim, type_label: sim.sim_type_label })),
        }}/>;
}
