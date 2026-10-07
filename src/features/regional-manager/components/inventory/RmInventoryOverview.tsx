import { Progress } from "antd";
import { AlertTriangle, ArrowRight, MapPin, Package, Radio, Router, Video } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import type { RmInventoryOverviewData } from "../../types/inventory";
import { RmStatus } from "../dashboard/RmDashboardPrimitives";
type Row = RmInventoryOverviewData["how_stock_is_distributed"]["coordinators"][number];
const columns: ColumnsType<Row> = [
  { title: "Coordinator", dataIndex: "name" }, { title: "State", dataIndex: "state" },
  ...["pos", "cctv", "gps", "router", "total"].map(key => ({ title: key === "total" ? "TOTAL" : key.toUpperCase(), dataIndex: key })),
  { title: "Status", dataIndex: "status", render: (value: string) => <RmStatus value={value} /> },
];

const itemIcons: Record<string, typeof Package> = { pos: Package, cctv: Video, gps: MapPin, router: Router };
const itemAccents: Record<string, { icon: string; value: string }> = {
  pos: { icon: "bg-blue-50 text-blue-700", value: "text-slate-900" },
  cctv: { icon: "bg-emerald-50 text-emerald-700", value: "text-slate-900" },
  gps: { icon: "bg-amber-50 text-amber-700", value: "text-amber-600" },
  router: { icon: "bg-rose-50 text-rose-600", value: "text-rose-500" },
};

export function RmInventoryOverview({ data, onDistribute, onRequestStock }: { data: RmInventoryOverviewData; onDistribute: () => void; onRequestStock: () => void }) {
  const pagination = useTablePagination({ total: data.how_stock_is_distributed.coordinators.length });
  return <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,1.9fr)_minmax(300px,0.85fr)]">
    <div className="min-w-0 space-y-4">
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div><h2 className="text-base font-semibold text-slate-900">Current inventory</h2><p className="mt-1 text-xs text-slate-500">Available to distribute from your regional stock</p></div>
          <span className="text-xs text-slate-400">Live inventory</span>
        </div>
        {data.current_inventory.length ? <div className="divide-y divide-slate-100">
          {data.current_inventory.map((stock) => {
            const key = stock.type.toLowerCase();
            const Icon = itemIcons[key] ?? Radio;
            const accent = itemAccents[key] ?? itemAccents.pos;
            const percent = Math.max(0, Math.min(100, stock.used_percentage));
            const progressColor = stock.status.toLowerCase().includes("critical") ? "#f04452" : stock.status.toLowerCase().includes("low") ? "#f59e0b" : "#10b981";
            return <div key={stock.type} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_100px_100px]">
              <div className="flex min-w-0 items-center gap-3">
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${accent.icon}`}><Icon className="size-5" /></span>
                <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{stock.label}</p><p className="mt-0.5 text-xs text-slate-500">Ready to distribute</p></div>
              </div>
              <div className="text-right"><p className={`text-2xl font-bold leading-none ${accent.value}`}>{stock.available.toLocaleString()}</p><p className="mt-1 text-[11px] text-slate-400">SIMs</p></div>
              <div className="col-span-2 flex items-center gap-3 sm:col-span-1 sm:block sm:text-right">
                <div className="min-w-0 flex-1 sm:ml-auto sm:w-18"><Progress percent={percent} showInfo={false} strokeColor={progressColor} trailColor="#eef2f7" strokeWidth={5} /></div>
                <span className="whitespace-nowrap text-[11px] text-slate-500">{percent}% used</span>
                <button type="button" onClick={onDistribute} className="ml-auto inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#203c64] hover:underline sm:ml-0 sm:mt-1">Distribute <ArrowRight className="size-3.5" /></button>
              </div>
            </div>;
          })}
        </div> : <div className="p-5"><AppEmptyState title="No SIM stock" description="Received stock will appear here." /></div>}
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div><h2 className="text-base font-semibold text-slate-900">How stock is distributed</h2><p className="mt-1 text-xs text-slate-500">{data.how_stock_is_distributed.total_coordinators} State Coordinators</p></div>
          <button type="button" onClick={onDistribute} className="inline-flex items-center gap-1 text-xs font-semibold text-[#203c64] hover:underline">Distribute <ArrowRight className="size-3.5" /></button>
        </div>
        <DataTable columns={columns} dataSource={data.how_stock_is_distributed.coordinators} rowKey={row => `${row.name}-${row.state}`} pagination={pagination.paginationConfig} emptyTitle="No distributions yet" />
      </section>
    </div>

    <aside className="space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold text-slate-900">Inventory health</h2><p className="mt-1 text-xs text-slate-500">{data.inventory_health.total_sims.toLocaleString()} SIMs total</p></div><span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold uppercase text-amber-700">{data.inventory_health.overall_health}</span></div>
        <div className="mt-4 space-y-3">{data.current_inventory.map(stock => <div key={stock.type} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0"><span className="flex items-center gap-2 text-xs text-slate-700"><span className={`size-2 rounded-full ${stock.status.toLowerCase().includes("critical") ? "bg-rose-500" : stock.status.toLowerCase().includes("low") ? "bg-amber-500" : "bg-emerald-500"}`} />{stock.label}</span><span className="text-xs font-semibold text-slate-800">{stock.available.toLocaleString()}</span></div>)}</div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Estimated days remaining</h2><p className="mt-1 text-xs text-slate-500">Based on distribution pace</p>
        {data.estimated_days_remaining.estimates.length ? <div className="mt-3 divide-y divide-slate-100">{data.estimated_days_remaining.estimates.map(item => <div key={item.type} className="flex items-center justify-between gap-3 py-3 first:pt-1"><span className="text-xs text-slate-700">{item.type.toUpperCase()}</span><span className="text-xs font-semibold text-emerald-600">{item.days_text}</span></div>)}</div> : <div className="pt-3"><AppEmptyState title="No distribution estimate" /></div>}
      </section>

      <section className="rounded-xl border border-amber-300 bg-amber-50/70 p-5">
        <div className="flex items-center gap-2"><AlertTriangle className="size-4 text-amber-600" /><h2 className="text-sm font-semibold text-slate-900">SCs needing distribution</h2></div>
        {data.scs_need_distribution.items.length ? <div className="mt-3 space-y-2">{data.scs_need_distribution.items.map(item => <div key={`${item.name}-${item.state}`} className="flex items-center justify-between gap-3 rounded-lg border border-amber-100 bg-white p-3">
          <div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-800">{item.name} · {item.state}</p><p className="mt-1 text-[11px] text-slate-500">{item.subtitle}</p></div>
          <button type="button" onClick={onDistribute} className="shrink-0 rounded-md bg-amber-500 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-amber-600">Distribute</button>
        </div>)}</div> : <p className="mt-3 text-xs text-slate-600">No coordinators currently need stock.</p>}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-slate-900">Need more stock?</h2><p className="mt-1 text-xs text-slate-500">Request replenishment from Super Admin.</p>
        <button type="button" onClick={onRequestStock} className="mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#203c64] text-xs font-semibold text-[#203c64] hover:bg-slate-50"><Package className="size-4" /> Request stock</button>
      </section>
    </aside>
  </div>;
}
