import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { PageHeader } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { useGetRmCoordinatorDetail } from "../api/dashboard";
import { RmQueryState, RmStatus } from "../components/dashboard/RmDashboardPrimitives";
import { RmProfileLayout, RmProfileSummary, type RmProfileAction } from "../components/dashboard/RmProfileLayout";
import { rmDesignTokens } from "../components/dashboard/rmDesignTokens";
import { RmDesignedDistribute } from "../Modals/dashboard/RmDesignedDistribute";
import { RmDesignedReminder, RmDesignedSuspend } from "../Modals/dashboard/RmDesignedPeople";
import { RmOnboardApForm } from "../Modals/dashboard/RmPeopleModals";
import { RmInventoryRedistributeModal } from "../Modals/inventory/RmInventoryForms";
export function RegionalManagerCoordinatorPage() {
  const { coordinatorId, id } = useParams();
  const value = coordinatorId ?? id;
  const number = Number(value);
  const valid = Boolean(value && /^\d+$/.test(value) && Number.isSafeInteger(number) && number > 0);
  const query = useGetRmCoordinatorDetail(valid ? number : undefined);
  const navigate = useNavigate();
  const [modal, setModal] = useState<RmProfileAction | null>(null);
  const close = () => setModal(null);
  const data = query.data;
  if (!valid) return <AppEmptyState title="Invalid coordinator" description="Select a coordinator from your network." actionText="My state coordinators" onAction={() => navigate(appPaths.rmStateCoordinators)} />;
  const target = { id: number, name: data?.hero.name ?? "State coordinator" };
  return <main className="rm-design mx-auto max-w-[1440px] space-y-5 p-4 sm:p-6" style={rmDesignTokens}>
    <PageHeader title={data?.hero.name ?? "State Coordinator"} description={`State Coordinators → ${target.name}`} actions={[{ key: "back", label: "Back to dashboard", icon: <ArrowLeft size={15} />, variant: "ghost", onClick: () => navigate(appPaths.regionalManagerDashboard) }]} />
    <RmQueryState loading={query.isLoading} error={query.error} empty={!data} retry={() => void query.refetch()}>{data && <>
      <RmProfileSummary data={data} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center"><span className="flex size-14 shrink-0 items-center justify-center rounded-full text-xl font-bold" style={{ background: colors.blues.surfaceLight, color: colors.primary }}>{data.hero.initials}</span><div className="min-w-0 flex-1"><PageHeader title={data.hero.name} description={`${data.hero.phone} · ${data.hero.location}`} actions={[
        { key: "distribute", label: "Distribute SIMs", style: { background: colors.success, borderColor: colors.success }, onClick: () => setModal("distribute") },
        { key: "suspend", label: data.hero.status.toLowerCase() === "suspended" ? "Reactivate SC" : "Suspend SC", variant: "destructive", onClick: () => setModal("suspend") },
        { key: "contact", render: () => <Button href={`tel:${data.hero.phone.replace(/[^+\d]/g, "")}`}>Contact SC</Button> },
      ]} /><div className="mt-2 flex gap-2"><RmStatus value={data.hero.status} /><RmStatus value="State Coordinator" /></div></div></div>
      <RmProfileLayout id={number} data={data} onAction={setModal} />
    </>}</RmQueryState>
    {modal === "distribute" && data && <RmDesignedDistribute target={target} onClose={close} />}
    {modal === "remind" && data && <RmDesignedReminder target={target} onClose={close} />}
    {modal === "suspend" && data && <RmDesignedSuspend target={target} suspended={data.hero.status.toLowerCase() === "suspended"} onClose={close} />}
    {modal === "onboard" && data && <RmOnboardApForm target={target} onClose={close} />}
    {modal === "redistribute" && data && <RmInventoryRedistributeModal onClose={close} />}
  </main>;
}
