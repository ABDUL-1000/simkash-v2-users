import { Button, Progress } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useGetRmUndistributedSims } from "../../api/inventory";
import type { RmCoordinatorDetailData } from "../../types/api";
import { RmPanel } from "./RmDesign";
import { RmQueryState } from "./RmDashboardPrimitives";
export function RmProfileStock({ id, data, onDistribute }: { id: number; data: RmCoordinatorDetailData["sim_stock"]; onDistribute: () => void }) {
  const query = useGetRmUndistributedSims({ coordinator_id: id, page: 1, limit: 1, type: "all" });
  const types = ["pos", "cctv", "gps", "router"] as const;
  const tones = [colors.blues.primary, colors.success, colors.primary, colors.warning];
  return <RmPanel title="SIM Stock"><RmQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>
    {query.data ? types.map((type, index) => { const count = query.data!.summary[type]; const total = query.data!.summary.total_undistributed; const percent = total > 0 ? Math.round(count / total * 100) : 0;
      return <div key={type} className="flex items-center gap-3 border-b py-3 text-xs" style={{ borderColor: colors.border }}><span className="w-16 shrink-0">{type.toUpperCase()} SIM</span><Progress className="min-w-0 flex-1" percent={percent} showInfo={false} size="small" strokeColor={tones[index]} trailColor={colors.blues.surfaceLight} /><strong>{count}</strong><span style={{ color: colors.texts.muted }}>{percent}%</span></div>;
    }) : <AppEmptyState title="No SIM stock data" />}
  </RmQueryState><div className="my-3 flex justify-between rounded-lg p-3 text-sm font-semibold" style={{ background: colors.backgrounds.base }}><span>Total</span><span>{data.total_label}</span></div><p className="text-xs" style={{ color: colors.texts.muted }}>{data.received_from_you_text}</p><p className="mt-1 text-xs" style={{ color: colors.texts.muted }}>{data.last_distribution_text}</p><Button className="mt-4" block onClick={onDistribute} style={{ color: colors.success, borderColor: colors.success }}>Distribute More SIMs</Button></RmPanel>;
}
