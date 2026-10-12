import { validAllocation, allocationTotals } from '../types/validation';
import { useGetEnterpriseDistributeContext, useGetEnterpriseSimInventoryOverview, useGetEnterpriseScOverview, useDistributeToSingleSc, useDistributeToMultipleSc, useGetEnterpriseOrderContext } from '../api';
import { coordinatorItems } from '../types/adapters';
import type { BulkDistributionRow } from '../types';
import { EpQueryState } from '../../components/EpQueryState';
import React, { useState } from "react";
import { Send, CreditCard, Video, Navigation, Wifi } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { SingleScDistributionForm } from "../components/SingleScDistributionForm";
import { MultipleScDistributionTable } from "../components/MultipleScDistributionTable";
import { ConfirmDistributionModal } from "../modals/ConfirmDistributionModal";
import { ConfirmBulkDistributionModal } from "../modals/ConfirmBulkDistributionModal";
import type { StateCoordinatorStock } from "../types";
export const DistributeSIMsPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialScId = searchParams.get("scId") || undefined;
    const [activeTab, setActiveTab] = useState<"single" | "multiple">(initialScId ? "single" : "multiple");
    const context = useGetEnterpriseDistributeContext();
    const overview = useGetEnterpriseSimInventoryOverview();
    const scQuery = useGetEnterpriseScOverview();
    const orderContext = useGetEnterpriseOrderContext();
    const single = useDistributeToSingleSc();
    const bulk = useDistributeToMultipleSc();
    const coordinators = coordinatorItems(scQuery.data, context.data);
    const items = (orderContext.data?.sim_types ?? []).map(sim => ({ id: sim.sim_type.toUpperCase() as 'POS' | 'CCTV' | 'GPS' | 'ROUTER', name: sim.name, category: sim.sim_type, inStock: context.data?.available_stock[sim.sim_type.toLowerCase() as 'pos'] ?? 0, wholesalePrice: sim.wholesale_price, retailPrice: 0, profitMargin: 0, status: 'healthy' as const, description: '', minThreshold: 0, maxCapacity: 0 }));
    const [bulkRows, setBulkRows] = useState<BulkDistributionRow[]>([]);
    // Single SC State
    const [singleTargetSc, setSingleTargetSc] = useState<StateCoordinatorStock | null>(null);
    const [singleAllocation, setSingleAllocation] = useState({ pos: 0, cctv: 0, gps: 0, router: 0, notes: "" });
    const [showSingleConfirmModal, setShowSingleConfirmModal] = useState(false);
    const [showBulkConfirmModal, setShowBulkConfirmModal] = useState(false);
    const handleSingleSubmit = (payload: {
        sc: StateCoordinatorStock;
        pos: number;
        cctv: number;
        gps: number;
        router: number;
        notes: string;
        pin: string;
    }) => {
        setSingleTargetSc(payload.sc);
        setSingleAllocation({
            pos: payload.pos,
            cctv: payload.cctv,
            gps: payload.gps,
            router: payload.router,
            notes: payload.notes,
        });
        setShowSingleConfirmModal(true);
    };
    const handleBulkDistributeSuccess = (rows: BulkDistributionRow[]) => { setBulkRows(rows); setShowBulkConfirmModal(true); };
    const handleExecuteSingle = (pin: string) => { if (!singleTargetSc || single.isPending || !context.data || !/^\d{4}$/.test(pin) || !validAllocation(singleAllocation, context.data.available_stock))
        return; const allocation = singleAllocation; single.mutate({ sc_id: Number(singleTargetSc.id), pos_quantity: allocation.pos, cctv_quantity: allocation.cctv, gps_quantity: allocation.gps, router_quantity: allocation.router, notes: allocation.notes || undefined, pin }, { onSuccess: result => { setShowSingleConfirmModal(false); navigate(appPaths.enterpriseProDistributionComplete, { state: { result, before: context.data?.available_stock, recipients: [{ name: result.recipient.sc_name, state: result.recipient.state, initials: singleTargetSc.initials, breakdown: 'POS:' + allocation.pos + ' · CCTV:' + allocation.cctv + ' · GPS:' + allocation.gps + ' · Router:' + allocation.router, total: result.distribution_quantities.total + ' SIMs' }] } }); } }); };
    const handleExecuteBulk = (pin: string) => { if (bulk.isPending || !context.data || !/^\d{4}$/.test(pin) || !bulkRows.every(row => validAllocation(row, context.data!.available_stock)) || !validAllocation(allocationTotals(bulkRows), context.data.available_stock))
        return; bulk.mutate({ distributions: bulkRows.map(row => ({ sc_id: Number(row.scId), pos_quantity: row.pos, cctv_quantity: row.cctv, gps_quantity: row.gps, router_quantity: row.router })), pin }, { onSuccess: result => { setShowBulkConfirmModal(false); navigate(appPaths.enterpriseProDistributionComplete, { state: { result, before: context.data?.available_stock, recipients: bulkRows.map(row => ({ name: row.scName, state: row.state, initials: row.initials, breakdown: 'POS:' + row.pos + ' · CCTV:' + row.cctv + ' · GPS:' + row.gps + ' · Router:' + row.router, total: (row.pos + row.cctv + row.gps + row.router) + ' SIMs' })) } }); } }); };
    return (<div className="space-y-5 pb-16">
      <PageHeader title="Distribute SIMs to State Coordinators" description={`Allocate your enterprise SIM stock to your ${coordinators.length} SC network for activation and field deployment.`} actions={[
            {
                key: "distributeAll",
                label: "Distribute to All SCs",
                icon: <Send className="w-4 h-4"/>,
                variant: "default",
                style: { backgroundColor: "#10B981", borderColor: "#10B981" },
                onClick: () => setActiveTab("multiple"),
            },
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
          <span>POS: <strong>{context.data?.available_stock.pos.toLocaleString() ?? "—"}</strong> available</span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <Video className="w-4 h-4 text-emerald-600"/>
          <span>CCTV: <strong className="text-emerald-700">{context.data?.available_stock.cctv.toLocaleString() ?? "—"}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <Navigation className="w-4 h-4 text-amber-500"/>
          <span>GPS: <strong className="text-amber-600">{context.data?.available_stock.gps.toLocaleString() ?? "—"}</strong></span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">{overview.data?.stock_health_cards.gps.status ?? "—"}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <Wifi className="w-4 h-4 text-orange-500"/>
          <span>Router: <strong className="text-orange-600">{context.data?.available_stock.router.toLocaleString() ?? "—"}</strong></span>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="grid grid-cols-2 gap-3 bg-white p-1.5 rounded-2xl border border-slate-200">
        <button type="button" onClick={() => setActiveTab("single")} className={`py-3 px-4 rounded-xl text-center transition-all ${activeTab === "single"
            ? "bg-[#111827] text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"}`}>
          <div className="font-bold text-xs">Distribute to One SC</div>
          <div className="text-[11px] text-slate-400">Select a specific SC and set quantities</div>
        </button>

        <button type="button" onClick={() => setActiveTab("multiple")} className={`py-3 px-4 rounded-xl text-center transition-all ${activeTab === "multiple"
            ? "bg-[#111827] text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"}`}>
          <div className="font-bold text-xs">Distribute to Multiple SCs</div>
          <div className="text-[11px] text-slate-400">Set quantities per SC at once</div>
        </button>
      </div>

      {/* Content */}
      {!context.isSuccess || !scQuery.isSuccess || !overview.isSuccess || !orderContext.isSuccess ? <EpQueryState pending={context.isPending || scQuery.isPending || overview.isPending || orderContext.isPending} error={context.error || scQuery.error || overview.error || orderContext.error} retry={() => { void context.refetch(); void scQuery.refetch(); void overview.refetch(); void orderContext.refetch(); }}/> : activeTab === "single" ? (<SingleScDistributionForm coordinators={coordinators} stockItems={items} selectedScId={initialScId} onSubmit={handleSingleSubmit}/>) : (<MultipleScDistributionTable coordinators={coordinators} availableStock={context.data.available_stock} onDistribute={handleBulkDistributeSuccess} onCancel={() => navigate(appPaths.enterpriseProSimInventory)}/>)}

      {/* Single Confirmation Modal matching Image 5 */}
      <ConfirmDistributionModal key={`single-${showSingleConfirmModal}`} open={showSingleConfirmModal} onOpenChange={setShowSingleConfirmModal} sc={singleTargetSc} pos={singleAllocation.pos} cctv={singleAllocation.cctv} gps={singleAllocation.gps} router={singleAllocation.router} notes={singleAllocation.notes} availableStock={context.data?.available_stock} pending={single.isPending} onConfirm={handleExecuteSingle}/>

      {/* Bulk Confirmation Modal matching Image 1 */}
      <ConfirmBulkDistributionModal key={`bulk-${showBulkConfirmModal}`} open={showBulkConfirmModal} onOpenChange={setShowBulkConfirmModal} rows={bulkRows} availableStock={context.data?.available_stock} pending={bulk.isPending} onConfirm={handleExecuteBulk}/>
    </div>);
};
