import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { Pagination } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { NetworkBadge } from "@/features/device-sim/components/NetworkBadge";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetCaRecentActivations } from "../api/useGetCaRecentActivations";
import { CaQueryState } from "./CaQueryState";

interface CaRecentActivationsCardProps {
  initialFilter?: "all" | "mine";
  onViewAll?: () => void;
}

export function CaRecentActivationsCard({ onViewAll, initialFilter = "all" }: CaRecentActivationsCardProps) {
  const [filter, setFilter] = useState<"all" | "mine">(initialFilter);

  const pagination = useTablePagination({ initialPageSize: 10 });
  const query = useGetCaRecentActivations({ filter, page: pagination.page, limit: pagination.pageSize });
  const filteredItems = query.data?.activations ?? [];
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3 bg-white"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-slate-900">Recent Activations</h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => { setFilter("all"); pagination.resetPage(); }}
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors ${
                filter === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => { setFilter("mine"); pagination.resetPage(); }}
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors ${
                filter === "mine"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              Mine Only
            </button>
          </div>
        </div>

        {onViewAll && <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>}
      </div>

      <CaQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>
      {!filteredItems.length && <AppEmptyState title="No Recent Activations" description="No activations recorded for this filter." />}
      {/* ITEMS LIST */}
      <div className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
        {filteredItems.map((item) => {


          return (
            <div
              key={item.id}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <NetworkBadge network={item.network_code || item.network} />

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 truncate">{item.sim_number}</span>
                    {item.is_own ? (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-700">
                        {item.actor_badge}
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 truncate">
                        {item.actor_badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {item.customer_name} • {item.time_ago}
                  </span>
                </div>
              </div>

              {/* Amount & Status */}
              <div className="text-right shrink-0">
                <span className="font-black text-xs text-emerald-600 block">
                  {item.corporate_profit_formatted ?? item.profit_formatted}
                </span>
                {item.partner_commission > 0 && <span className="text-[9px] font-semibold text-slate-400 block">AP comm. {item.partner_commission_formatted}</span>}
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded"
                  style={/fail|reject/i.test(item.status) ? { color: APP_COLORS.reds.red, backgroundColor: APP_COLORS.reds.light } : /pending|processing/i.test(item.status) ? { color: APP_COLORS.ambers.secondary, backgroundColor: APP_COLORS.ambers.light } : undefined}>
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination {...pagination.paginationConfig} total={query.data?.total ?? 0} responsive size="small" />
      </CaQueryState>
    </div>
  );
}
