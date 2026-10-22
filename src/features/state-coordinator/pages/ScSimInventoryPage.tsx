import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Repeat, Send } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { TransactionSuccessModal } from "@/components/common/TransactionSuccessModal";
import { appPaths } from "@/app/router/paths";
import { useGetScSimInventoryOverview } from "../api/inventory";
import { ScAvailableStockTab } from "../components/sim-inventory/ScAvailableStockTab";
import { ScDistributeTab } from "../components/sim-inventory/ScDistributeTab";
import { ScHistoryTab } from "../components/sim-inventory/ScHistoryTab";
import { ScRedistributeTab } from "../components/sim-inventory/ScRedistributeTab";
import { DistributeStockToAgentsModal } from "../modals/DistributeStockToAgentsModal";
import type { InventoryDistributionResult, RedistributionResult } from "../types/operations";
import { REDIST_TYPES, REDIST_TYPE_LABELS, SC_SIM_TYPES } from "../utils/simTypes";

type InventoryTab = "Available Stock" | "Distribute to AP" | "Redistribute" | "Inventory History";
const TAB_PARAMS: Record<string, InventoryTab> = { distribute: "Distribute to AP", redistribute: "Redistribute", history: "Inventory History" };

export function ScSimInventoryPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // "?tab=distribute&partner=ID" / "&all_low=1" come from the dashboard and AP pages.
  const [activeTab, setActiveTab] = useState<InventoryTab>(() => TAB_PARAMS[searchParams.get("tab") ?? ""] ?? "Available Stock");
  const [redistributeFrom] = useState<number | undefined>(() => Number(searchParams.get("from")) || undefined);
  const [distributePartner, setDistributePartner] = useState<number | undefined>(() => Number(searchParams.get("partner")) || undefined);
  const [allLowOpen, setAllLowOpen] = useState(() => searchParams.get("all_low") === "1");

  // Modals state
  const [successModalConfig, setSuccessModalConfig] = useState<{
    open: boolean;
    title: string;
    subtitle?: string;
    details?: { label: string; value: string }[];
  }>({
    open: false,
    title: "",
  });

  const overview = useGetScSimInventoryOverview();

  const openDistribute = (partnerId?: number) => {
    setDistributePartner(partnerId);
    setActiveTab("Distribute to AP");
  };
  const closeAllLow = () => {
    setAllLowOpen(false);
    if (searchParams.has("all_low")) {
      searchParams.delete("all_low");
      setSearchParams(searchParams, { replace: true });
    }
  };
  const handleDistributed = (result: InventoryDistributionResult) => {
    setSuccessModalConfig({
      open: true,
      title: "Distribution Successful!",
      subtitle: result.message,
      details: [
        { label: "Recipient", value: `${result.recipient.name} (AP)` },
        { label: "Distributed", value: `${result.total_distributed} SIMs` },
        ...SC_SIM_TYPES.filter((type) => result.summary[type]).map((type) => ({ label: type.toUpperCase(), value: `${result.summary[type]} SIMs` })),
        { label: "Reference", value: result.reference },
      ],
    });
  };

  const handleRedistributed = (result: RedistributionResult) => {
    setSuccessModalConfig({
      open: true,
      title: "Redistribution Successful!",
      subtitle: result.message,
      details: [
        { label: "From", value: result.previous_partners.map((partner) => `${partner.name} (${partner.count})`).join(", ") || "—" },
        { label: "To", value: `${result.recipient.name} (AP)` },
        { label: "Moved", value: `${result.total_redistributed} SIMs` },
        ...REDIST_TYPES.filter((type) => result.summary[type]).map((type) => ({ label: REDIST_TYPE_LABELS[type], value: `${result.summary[type]}` })),
        { label: "Reference", value: result.reference },
      ],
    });
  };

  return (
    <div className="space-y-6 ">
      {/* Top Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">
            SIM Inventory
          </h1>
          <p className="text-xs font-medium text-[#66738C]">
            {activeTab === "Inventory History"
              ? "Track all stock movements: received from RM and distributed to your Agency Partners"
              : "Manage stock received from your Regional Manager and distribute to your Agency Partners"}
          </p>
        </div>

        {/* "Export Report" is omitted (no inventory export endpoint); "Request Stock" is removed for State Coordinators. */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("Redistribute")}
            className="flex items-center gap-2 rounded-xl border border-[#7C3AED] bg-purple-50 px-4 py-2.5 text-xs font-bold text-[#7C3AED] shadow-xs transition hover:bg-purple-100"
          >
            <Repeat className="size-4" />
            <span>Redistribute</span>
          </button>
          <button
            type="button"
            onClick={() => openDistribute(distributePartner)}
            className="flex items-center gap-2 rounded-xl border border-[#10B981] bg-[#EBFFF8] px-4 py-2.5 text-xs font-bold text-[#10B981] shadow-xs transition hover:bg-emerald-100"
          >
            <Send className="size-4" />
            <span>Distribute to AP</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation Pill Bar */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-1.5">
        {(
          ["Available Stock", "Distribute to AP", "Redistribute", "Inventory History"] as const
        ).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-5 py-2 text-xs font-extrabold transition ${
              activeTab === tab
                ? "bg-white text-[#0F152A] shadow-xs border border-[#E2ECF6]"
                : "text-[#66738C] hover:text-[#0F152A]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB 1: AVAILABLE STOCK — GET /sim-inventory/overview + /available */}
      {activeTab === "Available Stock" && (
        overview.isLoading ? <div className="space-y-6"><CardGridSkeleton count={5} /><CardGridSkeleton count={2} /></div>
          : overview.data ? <ScAvailableStockTab
            overview={overview.data}
            onDistribute={openDistribute}
            onDistributeAllLow={() => setAllLowOpen(true)}
            onViewAllPartners={() => navigate(appPaths.scAgencyPartners)}
          />
            : <AppEmptyState title="Unable to load your inventory" description={overview.error?.message ?? "Please try again."} actionText="Retry" onAction={() => void overview.refetch()} />
      )}

      {/* TAB 2: DISTRIBUTE TO AP — POST /sim-inventory/distribute */}
      {activeTab === "Distribute to AP" && (
        <ScDistributeTab key={distributePartner ?? "none"} initialPartnerId={distributePartner} onDistributed={handleDistributed} />
      )}

      {/* TAB 3: REDISTRIBUTE — GET /sim-inventory/redistributable + POST /sim-inventory/redistribute */}
      {activeTab === "Redistribute" && <ScRedistributeTab initialFromId={redistributeFrom} onRedistributed={handleRedistributed} />}

      {/* TAB 4: INVENTORY HISTORY — GET /sim-inventory/history */}
      {activeTab === "Inventory History" && <ScHistoryTab overview={overview.data} />}

      {/* --- MODALS --- */}
      {/* Distribute to all low APs: sim_type + quantity with distribute_to_all_low */}
      {allLowOpen && <DistributeStockToAgentsModal source="inventory" allLow canDistributeAll={overview.data?.aps_need_distribution.can_distribute_all ?? true} onClose={closeAllLow} />}

      {/* Transaction Success Modal */}
      <TransactionSuccessModal
        open={successModalConfig.open}
        onOpenChange={(op) =>
          setSuccessModalConfig((prev) => ({ ...prev, open: op }))
        }
        title={successModalConfig.title}
        subtitle={successModalConfig.subtitle}
        details={successModalConfig.details}
      />
    </div>
  );
}
