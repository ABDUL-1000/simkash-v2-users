import { APP_COLORS } from "@/constants/colors";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { RmScCard } from "./RmScCard";
import type { StateCoordinatorItem } from "../../types/regional-manager.types";

interface RmScCardListProps {
  scs: StateCoordinatorItem[];
  onDistribute: (sc: StateCoordinatorItem) => void;
  onContact: (sc: StateCoordinatorItem) => void;
  onReactivate: (sc: StateCoordinatorItem) => void;
  onOnboardAp?: (sc: StateCoordinatorItem) => void;
  onSuspend?: (sc: StateCoordinatorItem) => void;
  onRedistribute?: (sc: StateCoordinatorItem) => void;
}

export function RmScCardList({
  scs,
  onDistribute,
  onContact,
  onReactivate,
  onOnboardAp,
  onSuspend,
  onRedistribute,
}: RmScCardListProps) {
  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <h2
          className="text-sm font-bold tracking-tight sm:text-base"
          style={{ color: APP_COLORS.texts.primary }}
        >
          {scs.length} State Coordinators
        </h2>
        <span
          className="text-xs font-semibold"
          style={{ color: APP_COLORS.texts.slate }}
        >
          Network Directory
        </span>
      </div>

      {/* Cards Stack */}
      {scs.length === 0 ? (
        <AppEmptyState title="No State Coordinators found" description="Try adjusting your search terms or filter selection." />
      ) : (
        <div className="space-y-3.5">
          {scs.map((sc) => (
            <RmScCard
              key={sc.id}
              sc={sc}
              onDistribute={onDistribute}
              onContact={onContact}
              onReactivate={onReactivate}
              onOnboardAp={onOnboardAp}
              onSuspend={onSuspend}
              onRedistribute={onRedistribute}
            />
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      {scs.length > 0 && (
        <div
          className="pt-2 text-center text-xs font-medium"
          style={{ color: APP_COLORS.texts.slate }}
        >
          Showing 1 to {scs.length} of {scs.length} SCs
        </div>
      )}
    </div>
  );
}

export default RmScCardList;
