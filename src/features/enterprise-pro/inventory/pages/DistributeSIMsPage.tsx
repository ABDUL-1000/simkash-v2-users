import React, { useState } from "react";
import { Send,  CreditCard, Video, Navigation, Wifi } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { mockStockItems, mockStateCoordinators } from "../data/mockInventoryData";
import { SingleScDistributionForm } from "../components/SingleScDistributionForm";
import { MultipleScDistributionTable } from "../components/MultipleScDistributionTable";
import { ConfirmDistributionModal } from "../modals/ConfirmDistributionModal";
import { ConfirmBulkDistributionModal } from "../modals/ConfirmBulkDistributionModal";
import type { StateCoordinatorStock } from "../types";

export const DistributeSIMsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialScId = searchParams.get("scId") || undefined;

  const [activeTab, setActiveTab] = useState<"single" | "multiple">("multiple");

  // Single SC State
  const [singleTargetSc, setSingleTargetSc] = useState<StateCoordinatorStock | null>(null);
  const [singleAllocation, setSingleAllocation] = useState({ pos: 200, cctv: 100, gps: 0, router: 50, notes: "" });
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

  const handleBulkDistributeSuccess = () => {
    setShowBulkConfirmModal(true);
  };

  const handleExecuteBulk = () => {
    setShowBulkConfirmModal(false);
    navigate(`${appPaths.enterpriseProDistributionComplete}?type=bulk&sims=1550&scs=7`);
  };

  return (
    <div className="space-y-5 pb-16">
      <PageHeader
        title="Distribute SIMs to State Coordinators"
        description="Allocate your enterprise SIM stock to your 12 SC network for activation and field deployment."
        actions={[
          {
            key: "distributeAll",
            label: "Distribute to All SCs",
            icon: <Send className="w-4 h-4" />,
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
        ]}
      />

      {/* Stock Pill Bar */}
      <div className="flex flex-wrap items-center gap-6 p-3.5 bg-white rounded-2xl border border-slate-200/90 text-xs font-semibold">
        <div className="flex items-center gap-2 text-slate-800">
          <CreditCard className="w-4 h-4 text-blue-600" />
          <span>POS: <strong>5,000</strong> available</span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <Video className="w-4 h-4 text-emerald-600" />
          <span>CCTV: <strong className="text-emerald-700">1,200</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <Navigation className="w-4 h-4 text-amber-500" />
          <span>GPS: <strong className="text-amber-600">450</strong></span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">Low</span>
        </div>
        <div className="flex items-center gap-2 text-slate-800">
          <Wifi className="w-4 h-4 text-orange-500" />
          <span>Router: <strong className="text-orange-600">597</strong></span>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="grid grid-cols-2 gap-3 bg-white p-1.5 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("single")}
          className={`py-3 px-4 rounded-xl text-center transition-all ${
            activeTab === "single"
              ? "bg-[#111827] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <div className="font-bold text-xs">Distribute to One SC</div>
          <div className="text-[11px] text-slate-400">Select a specific SC and set quantities</div>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("multiple")}
          className={`py-3 px-4 rounded-xl text-center transition-all ${
            activeTab === "multiple"
              ? "bg-[#111827] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <div className="font-bold text-xs">Distribute to Multiple SCs</div>
          <div className="text-[11px] text-slate-400">Set quantities per SC at once</div>
        </button>
      </div>

      {/* Content */}
      {activeTab === "single" ? (
        <SingleScDistributionForm
          coordinators={mockStateCoordinators}
          stockItems={mockStockItems}
          selectedScId={initialScId}
          onSubmit={handleSingleSubmit}
        />
      ) : (
        <MultipleScDistributionTable
          onDistribute={handleBulkDistributeSuccess}
          onCancel={() => navigate(appPaths.enterpriseProSimInventory)}
        />
      )}

      {/* Single Confirmation Modal matching Image 5 */}
      <ConfirmDistributionModal
        open={showSingleConfirmModal}
        onOpenChange={setShowSingleConfirmModal}
        sc={singleTargetSc}
        pos={singleAllocation.pos}
        cctv={singleAllocation.cctv}
        gps={singleAllocation.gps}
        router={singleAllocation.router}
        notes={singleAllocation.notes}
        onConfirm={() => {
          setShowSingleConfirmModal(false);
          navigate(`${appPaths.enterpriseProDistributionComplete}?type=single&scId=${singleTargetSc?.id || ""}`);
        }}
      />

      {/* Bulk Confirmation Modal matching Image 1 */}
      <ConfirmBulkDistributionModal
        open={showBulkConfirmModal}
        onOpenChange={setShowBulkConfirmModal}
        onConfirm={handleExecuteBulk}
      />
    </div>
  );
};
