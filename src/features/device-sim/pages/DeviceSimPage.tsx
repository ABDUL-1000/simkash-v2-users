import { useState } from "react";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { appPaths } from "@/app/router/paths";
import { useGetDeviceSimOverview } from "../api/useGetDeviceSimOverview";
import { useGetDeviceSims } from "../api/useGetDeviceSims";
import { DeviceSimStatsCards } from "../components/DeviceSimStatsCards";
import { DeviceSimFilterBar } from "../components/DeviceSimFilterBar";
import { ActiveSimCardTile } from "../components/ActiveSimCardTile";
import { PendingSimCardTile } from "../components/PendingSimCardTile";
import { RenewSimPlanModal } from "../modals/RenewSimPlanModal";
import { SimSwapModal } from "../modals/SimSwapModal";
import { RequestSimModal } from "../modals/RequestSimModal";
import { TrackRequestModal } from "../modals/TrackRequestModal";
import { CancelRequestModal } from "../modals/CancelRequestModal";
import type { DeviceSimItem } from "../types/api";

export function DeviceSimPage() {
  const navigate = useNavigate(); const { wallet } = useGetAuthUser();
  const [network, setNetwork] = useState("All"); const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState<DeviceSimItem | null>(null); const [modal, setModal] = useState("");
  const { page, pageSize, paginationConfig, resetPage } = useTablePagination({ initialPageSize: 10 });
  const overview = useGetDeviceSimOverview(); const list = useGetDeviceSims({ page, limit: pageSize, network, status });
  const sims = list.data?.sims ?? [];
  const open = (name: string, sim?: DeviceSimItem) => { setSelected(sim ?? null); setModal(name); };
  const close = () => setModal("");
  const detail = (sim: DeviceSimItem) => navigate(appPaths.deviceSimDetail(sim.sim_type, String(sim.id)).path);
  const filterNetwork = (value: string) => { setNetwork(value); resetPage(); };
  const filterStatus = (value: string) => { setStatus(value); resetPage(); };
  return <div className="space-y-5"><PageHeader title="My Device SIMs" description="Manage all your active and pending SIM cards" actions={[{ key: "request-sim", label: "+ Request SIM", onClick: () => open("request"), className: "bg-[#2563EB] text-white" }]} />
    {overview.isLoading ? <CardGridSkeleton count={3} /> : <DeviceSimStatsCards stats={overview.data ?? list.data?.stats} />}
    <DeviceSimFilterBar network={network} status={status} onNetworkChange={filterNetwork} onStatusChange={filterStatus} />
    {list.isLoading ? <CardGridSkeleton count={4} /> : list.isError ? <div className="rounded-xl border border-red-100 bg-white p-8 text-center text-sm text-[#EF4444]">Unable to load your SIM cards. {list.error.message}</div> : sims.length === 0 ? <AppEmptyState title="No SIM cards found" description="Try another filter or request a SIM." actionText="Request a SIM" onAction={() => open("request")} /> : <div className="grid gap-4 lg:grid-cols-2">{sims.map((sim) => sim.status === "pending" ? <PendingSimCardTile key={sim.id} sim={sim} onTrack={() => open("track", sim)} onCancel={() => open("cancel", sim)} /> : <ActiveSimCardTile key={sim.id} sim={sim} onRenew={() => open("renew", sim)} onSwap={() => open("swap", sim)} onDetails={() => detail(sim)} />)}</div>}
    {!!list.data?.pagination && list.data.pagination.totalPages > 1 && <Pagination {...paginationConfig} total={list.data.pagination.total} />}
    <RenewSimPlanModal open={modal === "renew"} sim={selected} balance={wallet?.balance ?? 0} onClose={close} /><SimSwapModal open={modal === "swap"} sim={selected} onClose={close} /><RequestSimModal open={modal === "request"} onClose={close} /><TrackRequestModal open={modal === "track"} sim={selected} onClose={close} onCancel={() => setModal("cancel")} /><CancelRequestModal open={modal === "cancel"} sim={selected} onClose={close} />
  </div>;
}
