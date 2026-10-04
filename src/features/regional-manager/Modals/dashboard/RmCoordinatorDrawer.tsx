import { useState } from "react";
import { Drawer, Tabs } from "antd";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { colors } from "@/constants/colors";
import { useGetRmCoordinatorDetail } from "../../api/dashboard";
import type { RmTarget } from "../../types/dashboard";
import { RmQueryState, RmStatus } from "../../components/dashboard/RmDashboardPrimitives";
import { RmCoordinatorDetails } from "../../components/dashboard/RmCoordinatorDetails";
import { RmCoordinatorApsTable, RmCoordinatorStockHistoryTable } from "../../components/dashboard/RmCoordinatorDetailTables";
import { RmQuickDistributeModal } from "./RmStockModals";
import { RmOnboardApForm, RmReminderForm, RmSuspendForm } from "./RmPeopleModals";

export function RmCoordinatorDrawer({ target, onClose }: { target: RmTarget; onClose: () => void }) {
  const query = useGetRmCoordinatorDetail(target.id);
  const data = query.data;
  const [tab, setTab] = useState("partners");
  const [modal, setModal] = useState<"distribute" | "onboard" | "remind" | "suspend" | null>(null);
  const suspended = data?.hero.status.toLowerCase() === "suspended";
  const close = () => setModal(null);
  const actions: PageHeaderAction[] = [
    { key: "distribute", label: "Distribute SIMs", disabled: !data, onClick: () => setModal("distribute") },
    { key: "onboard", label: "Onboard AP for SC", variant: "outline", disabled: !data, onClick: () => setModal("onboard") },
    { key: "remind", label: "Send reminder", variant: "outline", disabled: !data, onClick: () => setModal("remind") },
    { key: "suspend", label: suspended ? "Re-activate SC" : "Suspend SC", variant: suspended ? "outline" : "destructive", disabled: !data, onClick: () => setModal("suspend") },
  ];
  return <>
    <Drawer open onClose={() => { if (!modal) onClose(); }} closable={!modal} title="State coordinator" size="large" styles={{ wrapper: { width: "min(1100px, 100vw)" }, body: { background: colors.backgrounds.base } }}>
      <div className="space-y-5">
        <PageHeader title={data?.hero.name ?? target.name} description={data && `${data.hero.phone} · ${data.hero.location}`} actions={actions} extra={data && <><span>{data.hero.initials}</span><RmStatus value={data.summary_bar.role.status} /></>} />
        <RmQueryState loading={query.isLoading} error={query.error} empty={!data} retry={() => void query.refetch()}>
          {data && <><RmCoordinatorDetails data={data} />
            <Tabs activeKey={tab} onChange={setTab} items={[{ key: "partners", label: "Agency partners" }, { key: "history", label: "Stock distribution history" }]} />
            {tab === "partners" ? <RmCoordinatorApsTable id={target.id} /> : <RmCoordinatorStockHistoryTable id={target.id} />}
          </>}
        </RmQueryState>
        {/* Commented out: Coordinator editing/removal and report exports have no supplied RM endpoints. */}
      </div>
    </Drawer>
    {modal === "distribute" && <RmQuickDistributeModal target={target} onClose={close} />}
    {modal === "onboard" && <RmOnboardApForm target={target} onClose={close} />}
    {modal === "remind" && <RmReminderForm target={target} onClose={close} />}
    {modal === "suspend" && <RmSuspendForm target={target} suspended={suspended} onClose={close} />}
  </>;
}
