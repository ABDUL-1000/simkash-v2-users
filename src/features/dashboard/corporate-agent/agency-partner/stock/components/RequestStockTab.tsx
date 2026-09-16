import { RequestSimStockForm } from "./RequestSimStockForm";
import { RequestSummaryCard } from "./RequestSummaryCard";
import { LastRequestCard } from "./LastRequestCard";
import { StateCoordinatorCard } from "./StateCoordinatorCard";
import type { StockRequestQuantities, UrgencyLevel } from "../types/stock.types";

interface RequestStockTabProps {
  quantities: StockRequestQuantities;
  onQuantityChange: (type: keyof StockRequestQuantities, val: number) => void;
  urgency: UrgencyLevel;
  onUrgencyChange: (urgency: UrgencyLevel) => void;
  reason: string;
  onReasonChange: (reason: string) => void;
  onClearForm: () => void;
  onSubmit: () => void;
}

export function RequestStockTab({
  quantities,
  onQuantityChange,
  urgency,
  onUrgencyChange,
  reason,
  onReasonChange,
  onClearForm,
  onSubmit,
}: RequestStockTabProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Left Column (8 cols): Request Form */}
      <div className="lg:col-span-8">
        <RequestSimStockForm
          quantities={quantities}
          onQuantityChange={onQuantityChange}
          urgency={urgency}
          onUrgencyChange={onUrgencyChange}
          reason={reason}
          onReasonChange={onReasonChange}
          onClearForm={onClearForm}
          onSubmit={onSubmit}
        />
      </div>

      {/* Right Column (4 cols): Summary + Last Request + SC Contact */}
      <div className="lg:col-span-4 space-y-6">
        <RequestSummaryCard quantities={quantities} urgency={urgency} />
        <LastRequestCard />
        <StateCoordinatorCard />
      </div>
    </div>
  );
}
