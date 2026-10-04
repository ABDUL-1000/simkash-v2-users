import { Activity, Coins } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetApRecentActivity } from "../api";

export function ApRecentActivityTimeline() {
  const { activities, isLoading } = useGetApRecentActivity(10);
  return <section className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs"><h2 className="mb-3 font-bold text-[#0F152A]">Recent Activity</h2>
    {isLoading ? <p className="text-xs text-[#8C909B]">Loading activity…</p> : activities.length === 0 ? <AppEmptyState title="No recent activity" description="Your latest account updates will appear here." icon={<Activity className="size-5" />} /> : <div className="space-y-4">{activities.map((item) => <div key={item.id} className="flex gap-3"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EFF4F8] text-[#2563EB]">{item.type === "commission" ? <Coins className="size-4" /> : <Activity className="size-4" />}</span><div className="min-w-0"><p className="text-xs font-bold text-[#0F152A]">{item.title}</p><p className="text-[11px] text-[#66738C]">{item.subtitle}</p><p className="text-[10px] text-[#8C909B]">{item.time_ago}</p></div></div>)}</div>}
  </section>;
}
