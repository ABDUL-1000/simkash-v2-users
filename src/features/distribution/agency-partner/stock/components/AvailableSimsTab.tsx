import { StockStatCards } from "./StockStatCards";
import { InventoryCardList } from "./InventoryCardList";
import { StockByNetworkCard } from "./StockByNetworkCard";
import { StockHealthCard } from "./StockHealthCard";
import { EstimatedDaysCard } from "./EstimatedDaysCard";
import { PendingStockCard } from "./PendingStockCard";
import { StockTipCard } from "./StockTipCard";
import type {
  SimInventoryItem,
  SimCategory,
  PendingStockRequestInfo,
} from "../types/stock.types";

interface AvailableSimsTabProps {
  inventoryItems: SimInventoryItem[];
  pendingRequest: PendingStockRequestInfo | null;
  onRequestMore: (simType?: SimCategory) => void;
  onViewPendingRequest: () => void;
  onCriticalClick?: () => void;
}

export function AvailableSimsTab({
  inventoryItems,
  pendingRequest,
  onRequestMore,
  onViewPendingRequest,
  onCriticalClick,
}: AvailableSimsTabProps) {
  const totalAvailable = inventoryItems.reduce((acc, curr) => acc + curr.count, 0);
  const simTypesLow = inventoryItems.filter(
    (item) => item.status === "Low" || item.status === "Critical"
  ).length;

  return (
    <div className="space-y-6">
      {/* 4 Metrics Cards */}
      <StockStatCards
        totalAvailable={totalAvailable}
        activatedThisMonth={247}
        simTypesLow={simTypesLow}
        pendingRequestsCount={pendingRequest ? 1 : 0}
        onPendingCardClick={pendingRequest ? onViewPendingRequest : undefined}
      />

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols): Inventory list & Network breakdown */}
        <div className="lg:col-span-8 space-y-6">
          <InventoryCardList
            items={inventoryItems}
            onRequestMore={(simType) => onRequestMore(simType)}
            onCriticalClick={onCriticalClick}
          />

          <StockByNetworkCard />
        </div>

        {/* Right Column (4 cols): Health, Days, Pending Request, Tip */}
        <div className="lg:col-span-4 space-y-6">
          <StockHealthCard totalRemaining={totalAvailable} />

          <EstimatedDaysCard onRequestStockClick={() => onRequestMore()} />

          <PendingStockCard
            request={pendingRequest}
            onViewRequest={onViewPendingRequest}
          />

          <StockTipCard />
        </div>
      </div>
    </div>
  );
}
