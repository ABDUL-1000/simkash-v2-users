import { useState } from "react";
import { Pagination } from "antd";
import { colors } from "@/constants/colors";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { NetworkBadge } from "@/features/device-sim/components/NetworkBadge";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetEnterpriseRecentActivations } from "../api/useGetEnterpriseRecentActivations";
import { EpQueryState } from "./EpQueryState";

/** GET /enterprise/dashboard/recent-activations with the All / Mine Only tab. */
export function EpRecentActivationsCard({ initialTab = "all" }: { initialTab?: "all" | "mine" }) {
  const [tab, setTab] = useState<"all" | "mine">(initialTab);
  const pagination = useTablePagination({ initialPageSize: 10 });
  const query = useGetEnterpriseRecentActivations({ tab, page: pagination.page, limit: pagination.pageSize });
  const items = query.data?.activations ?? [];

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3" style={{ borderColor: colors.border }}>
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-bold text-slate-900 text-sm">Recent Activations</p>
        <div className="flex items-center gap-1">
          {(["all", "mine"] as const).map((value) => (
            <button key={value} type="button" onClick={() => { setTab(value); pagination.resetPage(); }}
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition ${tab === value ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
              {value === "all" ? "All" : "Mine Only"}
            </button>
          ))}
        </div>
      </div>

      <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />
      {query.isSuccess && !items.length && <AppEmptyState title="No Recent Activations" description="No activations recorded for this filter." />}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border p-2.5 transition hover:bg-slate-50/80" style={{ borderColor: colors.border }}>
            <div className="flex min-w-0 items-center gap-2.5">
              <NetworkBadge network={item.network_code || item.network} />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate font-bold text-slate-900 text-xs">{item.sim_number}</p>
                  <span className={`shrink-0 rounded px-1.5 text-[9px] font-bold ${item.is_own ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-800"}`}>{item.actor_badge}</span>
                </div>
                <p className="truncate text-[10px] text-slate-400">
                  {[item.type_label, item.customer_name, item.partner_name].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="block font-bold text-emerald-600 text-xs">{item.profit_earned_formatted}</span>
              <span className="block text-[10px] text-slate-400">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
      {(query.data?.total ?? 0) > pagination.pageSize && <Pagination {...pagination.paginationConfig} total={query.data?.total ?? 0} responsive size="small" showSizeChanger={false} />}
    </div>
  );
}
