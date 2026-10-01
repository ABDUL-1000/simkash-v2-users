import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { DetailsPageSkeleton } from "@/components/loaders/DetailsPageSkeleton";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { NetworkBadge } from "../components/NetworkBadge";
import { SimDetailPanels } from "../components/SimDetailPanels";
import { useGetDeviceSimDetail } from "../api/useGetDeviceSimDetail";
import { RenewSimPlanModal } from "../modals/RenewSimPlanModal";
import { SimSwapModal } from "../modals/SimSwapModal";

export function DeviceSimDetailPage() {
  const { type, id } = useParams(); const navigate = useNavigate(); const { wallet } = useGetAuthUser();
  const [modal, setModal] = useState(""); const query = useGetDeviceSimDetail(type, id); const sim = query.data;
  if (query.isLoading) return <DetailsPageSkeleton />;
  if (query.isError || !sim) return <div className="rounded-xl border border-[#E2ECF6] bg-white p-8 text-center"><p className="text-sm text-[#EF4444]">Unable to load this SIM.</p><button onClick={() => navigate(-1)} className="mt-3 text-sm text-[#2563EB]">Go back</button></div>;
  return <div className="space-y-5"><PageHeader title={sim.sim_number} description={`Active since ${sim.activated_at || "—"}`} actions={[{ key: "renew", label: "Renew SIM", onClick: () => setModal("renew") }, { key: "swap", label: "SIM Swap", variant: "outline", onClick: () => setModal("swap") }]} extra={<div className="flex gap-2"><NetworkBadge network={sim.network}/><span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">{sim.typeLabel || sim.sim_type}</span></div>} /><SimDetailPanels sim={sim} onRenew={() => setModal("renew")} onSwap={() => setModal("swap")} /><RenewSimPlanModal open={modal === "renew"} sim={sim} balance={wallet?.balance ?? 0} onClose={() => setModal("")} /><SimSwapModal open={modal === "swap"} sim={sim} onClose={() => setModal("")} /></div>;
}
