import { useGetEnterpriseNetworkTree } from "../api/useGetEnterpriseNetworkTree";
import { useGetEnterpriseNetworkActivity } from "../api/useGetEnterpriseNetworkActivity";
import { useGetEnterpriseOverview } from "../api/useGetEnterpriseOverview";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { EpQueryState } from "../components/EpQueryState";
import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { ArrowRight } from "lucide-react";

interface MyNetworkOverviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MyNetworkOverviewModal({ open, onOpenChange }: MyNetworkOverviewModalProps) {
  const navigate = useNavigate();
  const tree = useGetEnterpriseNetworkTree(open);
  const activity = useGetEnterpriseNetworkActivity({}, open);
  const overview = useGetEnterpriseOverview();
  const getActivationsCount = (item: any): number => {
    const val = item?.activations ?? item?.activations_count ?? item?.total_activations ?? 0;
    return typeof val === "number" ? val : Number(val) || 0;
  };

  const TOP_COORDINATORS = [...(tree.data?.state_coordinators ?? [])]
    .sort((a, b) => getActivationsCount(b) - getActivationsCount(a))
    .slice(0, 5)
    .map((sc, index) => {
      const actsCount = getActivationsCount(sc);
      const name = sc.name || "Coordinator";
      const initials =
        (sc as any).initials ||
        (name
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map((part) => part[0])
          .slice(0, 2)
          .join("")
          .toUpperCase() || "SC");
      const earned =
        (sc as any).total_earnings_formatted ??
        (sc as any).earnings_formatted ??
        (sc as any).commission_formatted ??
        "—";

      return {
        ...sc,
        name,
        medal: String(index + 1),
        initials,
        acts: actsCount.toLocaleString(),
        earned,
      };
    });

  const NETWORK_ACTIVITIES = (activity.data?.items ?? []).map((item) => ({
    network: item.network || "SIM",
    phone: item.phone || "—",
    customer: item.state || "—",
    route: `SC: ${item.coordinator_name || "—"} → AP: ${item.agent_name || "—"}`,
    comm: item.commission_formatted || "—",
    time: item.time_formatted || "—",
  }));

  const handleGoToNetwork = () => {
    onOpenChange(false);
    navigate(appPaths.enterpriseProNetwork);
  };

  const getBadgeClass = (net: string) => {
    switch (net) {
      case "MTN": return "bg-amber-500 text-white";
      case "GLO": return "bg-emerald-600 text-white";
      case "AIRTEL": return "bg-red-600 text-white";
      default: return "bg-slate-900 text-white";
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="My Network Overview"
      description={`${tree.data?.sc_count ?? 0} SCs · ${(tree.data as any)?.ap_count ?? (tree.data as any)?.aps_count ?? 0} APs`}
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* 4 Metric Cards */}
        <div className="grid grid-cols-4 gap-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-2.5">
            <p className="text-[9px] uppercase font-bold text-slate-400">STATE COORDS</p>
            <p className="text-lg font-black text-slate-900 mt-0.5">{tree.data?.sc_count ?? "—"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-2.5">
            <p className="text-[9px] uppercase font-bold text-slate-400">AGENCY PTRS</p>
            <p className="text-lg font-black text-slate-900 mt-0.5">{(tree.data as any)?.ap_count ?? (tree.data as any)?.aps_count ?? "—"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-2.5">
            <p className="text-[9px] uppercase font-bold text-slate-400">ACTS TODAY</p>
            <p className="text-lg font-black text-slate-900 mt-0.5">{activity.data?.total ?? "—"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-2.5">
            <p className="text-[9px] uppercase font-bold text-slate-400">COMMISSION</p>
            <p className="text-sm font-black text-slate-900 mt-0.5">{overview.data?.secondary_cards?.network_commission?.amount_formatted ?? "—"}</p>
          </div>
        </div>

        {/* Top Performing Coordinators */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            <span>TOP PERFORMING COORDINATORS</span>
            <span>ACTS / EARNINGS</span>
          </div>

          <EpQueryState pending={tree.isPending} error={tree.error} retry={tree.refetch} />
          {tree.isSuccess && !TOP_COORDINATORS.length && <AppEmptyState title="No State Coordinators" description="Your coordinators will appear here once your network grows." />}
          <div className="divide-y divide-slate-100">
            {TOP_COORDINATORS.map((sc, index) => (
              <div key={sc.id ?? `${sc.name}-${index}`} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-4 text-xs font-bold text-slate-500 text-center">{sc.medal}</span>
                  <div className="flex size-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                    {sc.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{sc.name}</p>
                    <p className="text-[10px] text-slate-400">{sc.state || "—"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{sc.acts}</p>
                    <p className="text-[9px] text-slate-400">activations</p>
                  </div>
                  <div>
                    <p className="font-bold text-emerald-600 text-xs">{sc.earned}</p>
                    <p className="text-[9px] text-slate-400">earned</p>
                  </div>
                  <button onClick={handleGoToNetwork} className="text-xs font-bold text-blue-600 hover:text-blue-800">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-100">
            <span>{Math.max(0, (tree.data?.sc_count ?? 0) - TOP_COORDINATORS.length)} more State Coordinators</span>
            <button onClick={handleGoToNetwork} className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5">
              View Full Network <ArrowRight className="size-3" />
            </button>
          </div>
        </div>

        {/* Today's Network Activity */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">TODAY&apos;S NETWORK ACTIVITY</p>
          <EpQueryState pending={activity.isPending} error={activity.error} retry={activity.refetch} />
          {activity.isSuccess && !NETWORK_ACTIVITIES.length && <AppEmptyState title="No Network Activity" description="No network activations have been recorded today." />}
          <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-0.5">
            {NETWORK_ACTIVITIES.map((act, i) => (
              <div key={i} className="flex items-center justify-between py-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${getBadgeClass(act.network)}`}>
                    {act.network}
                  </span>
                  <div>
                    <p className="font-bold text-slate-800 text-[11px]">
                      {act.phone} <span className="font-normal text-slate-400">· {act.customer}</span>
                    </p>
                    <p className="text-[10px] text-slate-400">{act.route}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600 text-xs">{act.comm}</p>
                  <p className="text-[9px] text-slate-400">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button onClick={() => onOpenChange(false)} className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800">
            Close
          </button>
          <button
            onClick={handleGoToNetwork}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs"
          >
            Go to My Network
          </button>
        </div>
      </div>
    </AppModal>
  );
}
