import React, { useState } from "react";
import { CreditCard, Video, Navigation, Wifi } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { useDebouncedValue } from "@/features/corporate-agent/inventory/api/useDebouncedValue";
import { CaSuccessModal } from "@/features/corporate-agent/Modals/CaSuccessModal";
import { useGetEnterpriseScOverview } from "../../network/api/queries";
import { coordinatorOption } from "../../network/types/adapters";
import { EpQueryState } from "../../components/EpQueryState";
import { useEnterpriseDistributeSims, useGetEnterpriseUndistributedSummary } from "../api";
import { emptyEpSims, EP_SIM_TYPES } from "../types/adapters";
import type { EpRedistributionResult, EpSimSelection } from "../types/simInventory";
import type { EpCoordinatorOption } from "../types";
import { SingleScDistributionForm } from "../components/SingleScDistributionForm";
import { EpRedistributeTab } from "../components/EpRedistributeTab";
import { ConfirmDistributionModal } from "../modals/ConfirmDistributionModal";
const toId = (value: string | null) => (Number(value) > 0 ? Number(value) : undefined);
export const DistributeSIMsPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialScId = toId(searchParams.get("scId"));
    const initialFromId = toId(searchParams.get("from"));
    const [activeTab, setActiveTab] = useState<"single" | "redistribute">(searchParams.get("tab") === "redistribute" ? "redistribute" : "single");
    const stockQuery = useGetEnterpriseUndistributedSummary();
    const [scSearch, setScSearch] = useState("");
    const debouncedSearch = useDebouncedValue(scSearch);
    const scQuery = useGetEnterpriseScOverview({ page: 1, limit: 50, search: debouncedSearch || undefined });
    const coordinators = (scQuery.data?.coordinators ?? []).map(coordinatorOption);
    const distribute = useEnterpriseDistributeSims();
    const stock = stockQuery.data?.summary;
    const [target, setTarget] = useState<{ sc: EpCoordinatorOption; sims: EpSimSelection; notes: string } | null>(null);
    const [redistReceipt, setRedistReceipt] = useState<EpRedistributionResult>();
    const handleExecute = () => {
        if (!target || distribute.isPending)
            return;
        const picked = Object.fromEntries(EP_SIM_TYPES.filter((type) => target.sims[type].length).map((type) => [type, target.sims[type]]));
        distribute.mutate({ coordinator_id: target.sc.id, phone: target.sc.phone, sims: picked, notes: target.notes.trim() || undefined }, { onSuccess: (result) => {
                setTarget(null);
                navigate(appPaths.enterpriseProDistributionComplete, { state: { result, before: stock, initials: target.sc.initials } });
            } });
    };
    return (<div className="space-y-5 pb-16">
      <PageHeader title="Distribute SIMs to State Coordinators" description={`Allocate your enterprise SIM stock to your ${scQuery.data?.total ?? coordinators.length} SC network for activation and field deployment.`} actions={[
            {
                key: "history",
                label: "View Distribution History",
                variant: "outline",
                onClick: () => navigate(appPaths.enterpriseProInventoryHistory),
            },
        ]}/>

      {/* Stock Pill Bar */}
      <div className="flex flex-wrap items-center gap-6 p-3.5 bg-white rounded-2xl border border-slate-200/90 text-xs font-semibold">
        <div className="flex items-center gap-2 text-slate-800">
          <CreditCard className="w-4 h-4 text-blue-600"/>
          <span>POS: <strong>{stock?.pos?.toLocaleString() ?? "—"}</strong> available</span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <Video className="w-4 h-4 text-emerald-600"/>
          <span>CCTV: <strong className="text-emerald-700">{stock?.cctv?.toLocaleString() ?? "—"}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <Navigation className="w-4 h-4 text-amber-500"/>
          <span>GPS: <strong className="text-amber-600">{stock?.gps?.toLocaleString() ?? "—"}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <Wifi className="w-4 h-4 text-orange-500"/>
          <span>Router: <strong className="text-orange-600">{stock?.router?.toLocaleString() ?? "—"}</strong></span>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="grid grid-cols-2 gap-3 bg-white p-1.5 rounded-2xl border border-slate-200">
        <button type="button" onClick={() => setActiveTab("single")} className={`py-3 px-4 rounded-xl text-center transition-all ${activeTab === "single"
            ? "bg-[#111827] text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"}`}>
          <div className="font-bold text-xs">Distribute to an SC</div>
          <div className="text-[11px] text-slate-400">Select an SC and pick the SIMs to send</div>
        </button>

        <button type="button" onClick={() => setActiveTab("redistribute")} className={`py-3 px-4 rounded-xl text-center transition-all ${activeTab === "redistribute"
            ? "bg-[#111827] text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"}`}>
          <div className="font-bold text-xs">Redistribute Between SCs</div>
          <div className="text-[11px] text-slate-400">Move unactivated SIMs from one SC to another</div>
        </button>
      </div>

      {/* Content */}
      {activeTab === "redistribute" ? <EpRedistributeTab initialFromId={initialFromId} onRedistributed={setRedistReceipt}/>
            : !stock ? <EpQueryState pending={stockQuery.isPending} error={stockQuery.error} retry={stockQuery.refetch}/>
                : <SingleScDistributionForm coordinators={coordinators} coordinatorsLoading={scQuery.isFetching} onSearchCoordinators={setScSearch} stock={stock} selectedScId={initialScId} onSubmit={setTarget}/>}

      {/* Confirmation Modal */}
      <ConfirmDistributionModal open={Boolean(target)} onOpenChange={(open) => { if (!open) setTarget(null); }} sc={target?.sc ?? null} sims={target?.sims ?? emptyEpSims()} notes={target?.notes} availableStock={stock} pending={distribute.isPending} onConfirm={handleExecute}/>

      {redistReceipt && <CaSuccessModal open onOpenChange={(open) => { if (!open) setRedistReceipt(undefined); }} title="Redistribution Completed!" subtitle={redistReceipt.message} details={[
                { label: "Moved to", value: redistReceipt.redistributedTo }, { label: "SIMs moved", value: String(redistReceipt.total_redistributed) }, { label: "Reference", value: redistReceipt.reference },
                ...(redistReceipt.previous_coordinators ?? []).map((sc) => ({ label: "From " + sc.name, value: sc.count + " SIMs" })),
            ]}/>}
    </div>);
};
