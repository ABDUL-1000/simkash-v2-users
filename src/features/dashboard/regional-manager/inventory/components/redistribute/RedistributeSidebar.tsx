import { ScNetworkMapCard } from "./ScNetworkMapCard";
import { TransferPreviewCard } from "./TransferPreviewCard";
import { RedistributeTipsCard } from "./RedistributeTipsCard";
import { RecentMovementsCard } from "./RecentMovementsCard";
import type { ScNetworkMapItem } from "../../../types/rm-redistribute.types";

interface RedistributeSidebarProps {
  fromName: string;
  fromBefore: number;
  fromAfter: number;
  toName: string;
  toBefore: number;
  toAfter: number;
  quantity: number;
  simType: string;
  selectedScId?: string;
  onSelectSc?: (sc: ScNetworkMapItem) => void;
  onViewAllHistory?: () => void;
}

export function RedistributeSidebar({
  fromName,
  fromBefore,
  fromAfter,
  toName,
  toBefore,
  toAfter,
  quantity,
  simType,
  selectedScId,
  onSelectSc,
  onViewAllHistory,
}: RedistributeSidebarProps) {
  return (
    <div className="space-y-4">
      {/* 1. SC Network Map */}
      <ScNetworkMapCard
        selectedScId={selectedScId}
        onSelectSc={onSelectSc}
      />

      {/* 2. Transfer Preview */}
      <TransferPreviewCard
        fromName={fromName}
        fromBefore={fromBefore}
        fromAfter={fromAfter}
        toName={toName}
        toBefore={toBefore}
        toAfter={toAfter}
        quantity={quantity}
        simType={simType}
      />

      {/* 3. Tips */}
      <RedistributeTipsCard />

      {/* 4. Recent Movements */}
      <RecentMovementsCard onViewAll={onViewAllHistory} />
    </div>
  );
}
