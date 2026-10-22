import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bell, Package, PauseCircle, Pencil, PlayCircle, Repeat, Send } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { AppModal } from "@/components/common/AppModal";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { appPaths } from "@/app/router/paths";
import { useGetScAgentDetail } from "../api/agents";
import {
  AccountTimelineCard, AgentSummaryBar, ApDetailsCard, BonusTrackerCard, CommissionCard, CustomersPreviewCard,
  DetailCard, PerformanceCard, StockDetailsCard, StockSentCard,
} from "../components/agency-partners/ScAgentDetailParts";
import { ScAgentCustomersTable, ScAgentStockHistoryTable } from "../components/agency-partners/ScAgentDetailTables";
import { ScStockTable } from "../components/sim-inventory/ScStockTable";
import { EditScAgentModal } from "../modals/OnboardAgencyPartnerModal";
import { SendAgentReminderModal } from "../modals/SendAgentReminderModal";
import { SuspendAgentModal } from "../modals/SuspendAgentModal";
import { scDistributePath, scRedistributePath } from "../utils/scLinks";

export function ScAgentDetailPage() {
  const { agentId } = useParams();
  return <ScAgentDetailContent key={agentId} agentId={agentId} />;
}

type DetailModal = "edit" | "remind" | "suspend" | "customers" | "stock-history" | "undistributed";

function ScAgentDetailContent({ agentId }: { agentId?: string }) {
  const id = agentId && /^\d+$/.test(agentId) && Number(agentId) > 0 ? Number(agentId) : undefined;
  const query = useGetScAgentDetail(id);
  const data = query.data;
  const navigate = useNavigate();
  const [modal, setModal] = useState<DetailModal | null>(null);
  const close = () => setModal(null);

  if (!id) return <AppEmptyState title="Invalid agency partner" description="Select an agency partner from your network." actionText="All partners" onAction={() => navigate(appPaths.scAgencyPartners)} />;
  if (query.isLoading) return <div className="space-y-6"><CardGridSkeleton count={6} /><CardGridSkeleton count={3} /></div>;
  if (!data) return <AppEmptyState title="Unable to load this agency partner" description={query.error?.message ?? "Please try again."} actionText="Retry" onAction={() => void query.refetch()} />;

  const hero = data.hero;
  const suspended = hero.status.toLowerCase() === "suspended";
  const firstName = hero.name.split(" ")[0];
  const distribute = () => navigate(scDistributePath(id));

  return (
    <div className="space-y-6">
      <button type="button" onClick={() => navigate(appPaths.scAgencyPartners)} className="flex items-center gap-1.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]">
        <ArrowLeft className="size-3.5" />All agency partners
      </button>

      <AgentSummaryBar data={data} />

      {/* Hero */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-lg font-black text-white">{hero.initials}</div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">{hero.name}</h1>
            <p className="text-xs text-[#66738C]">{hero.phone}{data.profile_details.state ? ` · ${data.profile_details.state}` : ""}</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${suspended ? "bg-[#FFF7F8] text-[#EF4444]" : "bg-[#EBFFF8] text-[#10B981]"}`}>
                <span className={`size-1.5 rounded-full ${suspended ? "bg-[#EF4444]" : "bg-[#10B981]"}`} />{hero.status}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-bold text-[#1E2E4F]">
                <span className="size-1.5 rounded-full bg-[#1E2E4F]" />{data.summary_bar.role}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={distribute} className="rounded-xl bg-[#10B981] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600">Distribute SIMs</button>
          <button type="button" onClick={() => setModal("suspend")} className={`rounded-xl border px-4 py-2.5 text-xs font-bold ${suspended ? "border-[#10B981] text-[#10B981] hover:bg-[#EBFFF8]" : "border-[#EF4444] text-[#EF4444] hover:bg-[#FFF7F8]"}`}>{suspended ? "Re-activate AP" : "Suspend AP"}</button>
          <a href={`tel:${hero.phone}`} className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]">Contact AP</a>
        </div>
      </div>

      {/* 3-column body */}
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
        <div className="space-y-4">
          <ApDetailsCard data={data} />
          <StockDetailsCard data={data} onDistribute={distribute} />
          <CustomersPreviewCard agentId={id} firstName={firstName} total={data.summary_bar.customers.count} onViewAll={() => setModal("customers")} />
        </div>

        <div className="space-y-4">
          <PerformanceCard data={data} />
          <BonusTrackerCard data={data} firstName={firstName} />
          <StockSentCard agentId={id} firstName={firstName} onViewAll={() => setModal("stock-history")} />
        </div>

        <div className="space-y-4">
          <DetailCard title="Quick Actions">
            <div className="space-y-2 text-xs font-bold">
              <button type="button" onClick={distribute} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E2E4F] py-2.5 text-white hover:bg-[#0F152A]"><Send className="size-4" />Distribute SIMs</button>
              <button type="button" onClick={() => navigate(scRedistributePath(id))} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#7C3AED] py-2.5 text-[#7C3AED] hover:bg-purple-50"><Repeat className="size-4" />Redistribute {firstName}&apos;s Unactivated SIMs</button>
              {/* "View Activation History" is replaced: there is no per-AP activation endpoint, but /sim-inventory/undistributed accepts agent_id. */}
              <button type="button" onClick={() => setModal("undistributed")} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2ECF6] py-2.5 text-[#66738C] hover:bg-[#F8FAFC]"><Package className="size-4" />View {firstName}'s SIM Stock</button>
              <button type="button" onClick={() => setModal("remind")} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#F59E0B] bg-[#FFFBEB] py-2.5 text-[#F59E0B] hover:bg-amber-100"><Bell className="size-4" />Send Reminder</button>
              <button type="button" onClick={() => setModal("edit")} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2ECF6] py-2.5 text-[#66738C] hover:bg-[#F8FAFC]"><Pencil className="size-4" />Edit AP Details</button>
              <button type="button" onClick={() => setModal("suspend")} className={`flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 ${suspended ? "border-[#10B981] text-[#10B981] hover:bg-[#EBFFF8]" : "border-[#EF4444] text-[#EF4444] hover:bg-[#FFF7F8]"}`}>
                {suspended ? <PlayCircle className="size-4" /> : <PauseCircle className="size-4" />}{suspended ? "Re-activate AP" : "Suspend AP"}
              </button>
            </div>
          </DetailCard>
          <CommissionCard data={data} />
          <AccountTimelineCard data={data} />
        </div>
      </div>

      {/* Modals */}
      {modal === "edit" && <EditScAgentModal id={hero.id} profile={data.profile_details} onClose={close} />}
      {modal === "remind" && <SendAgentReminderModal target={hero} onClose={close} />}
      {modal === "suspend" && <SuspendAgentModal target={hero} suspended={suspended} onClose={close} />}
      <AppModal open={modal === "customers"} onOpenChange={(open) => !open && close()} title={`${firstName}'s Customers`} size="lg">
        {modal === "customers" && <ScAgentCustomersTable agentId={id} />}
      </AppModal>
      <AppModal open={modal === "stock-history"} onOpenChange={(open) => !open && close()} title={`Stock You Sent to ${firstName}`} size="lg">
        {modal === "stock-history" && <ScAgentStockHistoryTable agentId={id} />}
      </AppModal>
      <AppModal open={modal === "undistributed"} onOpenChange={(open) => !open && close()} title={`${firstName}'s SIM Stock`} description="SIMs with this AP that haven't been activated" size="lg">
        {modal === "undistributed" && <ScStockTable mode="undistributed" agentId={id} />}
      </AppModal>
      {/* Commented out: partner removal has no documented SC endpoint. */}
    </div>
  );
}
