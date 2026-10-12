import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import { DataTable } from '@/components/common/DataTable';
import { useTablePagination } from '@/hooks/useTablePagination';
import { useGetEnterpriseInventoryHistory } from '../api';
import type { EnterpriseInventoryHistoryRow, HistoryParams } from '../types/simInventory';
import { EpQueryState } from '../../components/EpQueryState';
export const InventoryHistoryTable: React.FC = () => {
    const [directionFilter, setDirectionFilter] = useState<NonNullable<HistoryParams['flow']>>('all');
    const [typeFilter, setTypeFilter] = useState<NonNullable<HistoryParams['type']>>('all');
    const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
    const [search, setSearch] = useState('');
    const [debounced, setDebounced] = useState('');
    const { page, pageSize, paginationConfig, resetPage } = useTablePagination({ initialPageSize: 12 });
    useEffect(() => { const timer = setTimeout(() => setDebounced(search), 350); return () => clearTimeout(timer); }, [search]);
    const query = useGetEnterpriseInventoryHistory({ flow: directionFilter, type: typeFilter, sort, search: debounced, page, limit: pageSize });
    const changeFlow = (flow: NonNullable<HistoryParams['flow']>) => { setDirectionFilter(flow); resetPage(); };
    const changeType = (type: NonNullable<HistoryParams['type']>) => { setTypeFilter(type); resetPage(); };
    const delta = (value: string | undefined) => <span className={value?.startsWith('+') ? 'text-emerald-600 font-mono font-bold' : value?.startsWith('-') ? 'text-rose-600 font-mono font-bold' : 'text-slate-300 font-mono'}>{value ?? '—'}</span>;
    const columns: ColumnsType<EnterpriseInventoryHistoryRow> = [
        { title: 'DATE', dataIndex: 'date', render: (date: string) => <div className="font-bold text-slate-900">{date}</div> },
        { title: 'TYPE', dataIndex: 'type', render: (type: string) => <span className={type === 'ORDER IN' ? 'text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md' : 'text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md'}>{type}</span> },
        { title: 'DESCRIPTION', dataIndex: 'description', render: (description: string) => <div className="font-bold text-slate-900">{description}</div> },
        ...(['pos', 'cctv', 'gps', 'router'] as const).map(key => ({ title: key.toUpperCase(), dataIndex: key, align: 'center' as const, render: delta })),
        { title: 'TOTAL', dataIndex: 'total', align: 'center', render: (total: number, row) => delta(row.total_formatted ?? (total > 0 ? '+' : '') + total.toLocaleString()) },
        { title: 'BALANCE', dataIndex: 'balance_after', align: 'right', render: (balance: number) => <span className="font-extrabold text-slate-900 font-mono">{balance.toLocaleString()}</span> },
        { title: 'REF#', dataIndex: 'reference', align: 'right', render: (reference: string) => <span className="font-mono text-[11px] text-slate-400">{reference}</span> }
    ];
    return (<div className="space-y-4">
      {/* Filter strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" onClick={() => changeFlow("all")} className={`px-3 py-1.5 rounded-full font-bold transition-all ${directionFilter === "all" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>All</button>
          <button type="button" onClick={() => changeFlow("orders_in")} className={`px-3 py-1.5 rounded-full font-medium transition-all ${directionFilter === "orders_in" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>Orders In</button>
          <button type="button" onClick={() => changeFlow("distributions_out")} className={`px-3 py-1.5 rounded-full font-medium transition-all ${directionFilter === "distributions_out" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>Distributions Out</button>

          <span className="text-slate-300 px-1">·</span>

          <button type="button" onClick={() => changeType("all")} className={`px-2.5 py-1.5 rounded-lg font-semibold ${typeFilter === "all" ? "text-blue-700 bg-blue-50" : "text-slate-600"}`}>All Types</button>
          {["POS", "CCTV", "GPS", "Router"].map((t) => (<button key={t} type="button" onClick={() => changeType(t.toLowerCase() as NonNullable<HistoryParams["type"]>)} className={`px-2.5 py-1.5 rounded-lg font-medium ${typeFilter === t.toLowerCase() ? "text-blue-700 bg-blue-50 font-bold" : "text-slate-500 hover:text-slate-900"}`}>{t}</button>))}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" disabled title="Search by SC name" className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium inline-flex items-center gap-1.5">
            <span>All SCs</span><ChevronDown className="w-3 h-3 text-slate-400"/>
          </button>
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
        {query.isError ? <EpQueryState error={query.error} retry={query.refetch}/> : <DataTable<EnterpriseInventoryHistoryRow> hideToolbar columns={columns} dataSource={query.data?.rows ?? []} loading={query.isPending} rowKey="id" pagination={{ ...paginationConfig, total: query.data?.total_records ?? 0 }} scroll={{ x: 'max-content' }} emptyTitle="No inventory movements"/>}
      </div>
    </div>);
};
