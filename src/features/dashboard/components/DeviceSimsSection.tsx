import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { appPaths } from "@/app/router/paths";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { useGetDeviceSims } from "@/features/device-sim/api/useGetDeviceSims";
import { ActiveSimCardTile } from "@/features/device-sim/components/ActiveSimCardTile";
import { PendingSimCardTile } from "@/features/device-sim/components/PendingSimCardTile";
import { RenewSimPlanModal } from "@/features/device-sim/modals/RenewSimPlanModal";
import { SimSwapModal } from "@/features/device-sim/modals/SimSwapModal";
import { RequestSimModal } from "@/features/device-sim/modals/RequestSimModal";
import { TrackRequestModal } from "@/features/device-sim/modals/TrackRequestModal";
import { CancelRequestModal } from "@/features/device-sim/modals/CancelRequestModal";
import type { DeviceSimItem } from "@/features/device-sim/types/api";
import { AppEmptyState } from "@/components/common/AppEmptyState";

export function DeviceSimsSection() {
  const navigate = useNavigate();
  const { wallet } = useGetAuthUser();
  const { data, isLoading, isError } = useGetDeviceSims({ page: 1, limit: 4 });
  const [selected, setSelected] = useState<DeviceSimItem | null>(null);
  const [activeModal, setActiveModal] = useState("");
  const sims = data?.sims ?? [];
  const open = (name: string, sim?: DeviceSimItem) => { setSelected(sim ?? null); setActiveModal(name); };
  const close = () => setActiveModal("");
  return <section className="space-y-4"><div className="flex items-center justify-between"><div><h3 className="text-base font-bold text-[#0F152A]">My Device SIMs</h3><p className="mt-1 text-xs text-[#8C909B]">Manage renewals, swaps, and active SIMs</p></div><div className="flex gap-3"><button type="button" onClick={() => open("request")} className="flex items-center gap-1 text-xs font-semibold text-[#2563EB]"><Plus size={14}/>Request SIM</button><Link to={appPaths.deviceSim} className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline">View all <ArrowRight className="size-3.5" /></Link></div></div>
    {isLoading ? <CardGridSkeleton count={2} /> : isError ? <div className="rounded-xl border border-[#E2ECF6] bg-white p-5 text-xs text-[#8C909B]">Unable to load your SIM cards. <Link to={appPaths.deviceSim} className="text-[#2563EB]">Open SIM management</Link></div> : sims.length === 0 ? <AppEmptyState title="No SIM cards yet" description="Request a SIM to get started." actionText="Request a SIM" onAction={() => open("request")} /> : <div className="grid gap-4 md:grid-cols-2">{sims.slice(0, 4).map((sim) => sim.status === "pending" ? <PendingSimCardTile key={sim.id} sim={sim} onTrack={() => open("track", sim)} onCancel={() => open("cancel", sim)} /> : <ActiveSimCardTile key={sim.id} sim={sim} onRenew={() => open("renew", sim)} onSwap={() => open("swap", sim)} onDetails={() => navigate(appPaths.deviceSimDetail(sim.sim_type, String(sim.id)).path)} />)}</div>}
    <RenewSimPlanModal open={activeModal === "renew"} sim={selected} balance={wallet?.balance ?? 0} onClose={close}/><SimSwapModal open={activeModal === "swap"} sim={selected} onClose={close}/><RequestSimModal open={activeModal === "request"} onClose={close}/><TrackRequestModal open={activeModal === "track"} sim={selected} onClose={close} onCancel={() => setActiveModal("cancel")}/><CancelRequestModal open={activeModal === "cancel"} sim={selected} onClose={close}/>
  </section>;
}
