import { useState } from "react";
import { RmComparisonScSelector } from "./RmComparisonScSelector";
import { RmComparisonMetricPills, type ComparisonMetricKey,  } from "./RmComparisonMetricPills";
import { RmComparisonBarChart } from "./RmComparisonBarChart";
import { RmComparisonCommissionRows } from "./RmComparisonCommissionRows";
import { RmComparisonMatrixTable } from "./RmComparisonMatrixTable";
import { RmComparisonInsightsCard } from "./RmComparisonInsightsCard";
import type { ScPerformanceRowItem } from "../../../types/regional-manager-performance.types";

interface RmScComparisonTabProps {
  onContactSc: (sc: ScPerformanceRowItem) => void;
}

export function RmScComparisonTab({ onContactSc }: RmScComparisonTabProps) {
  const [selectedScIds, setSelectedScIds] = useState<string[]>(["sc-1", "sc-2", "sc-3"]);
  const [selectedMetric, setSelectedMetric] = useState<ComparisonMetricKey>("activations");

  const handleToggleSc = (id: string) => {
    if (selectedScIds.includes(id)) {
      if (selectedScIds.length > 2) {
        setSelectedScIds(selectedScIds.filter((item) => item !== id));
      }
    } else {
      if (selectedScIds.length < 4) {
        setSelectedScIds([...selectedScIds, id]);
      }
    }
  };

  const handleReset = () => {
    setSelectedScIds(["sc-1", "sc-2", "sc-3"]);
    setSelectedMetric("activations");
  };

  return (
    <div className="space-y-4">
      {/* SC Tag Selector & Controls */}
      <RmComparisonScSelector
        selectedScIds={selectedScIds}
        onToggleSc={handleToggleSc}
        onReset={handleReset}
      />

      {/* Metric Filter Pills */}
      <RmComparisonMetricPills
        selectedMetric={selectedMetric}
        onSelectMetric={setSelectedMetric}
      />

      {/* Comparative Bar Chart */}
      <RmComparisonBarChart
        selectedScIds={selectedScIds}
        selectedMetric={selectedMetric}
      />

      {/* Coordinator Summary Cards */}
      <RmComparisonCommissionRows
        selectedScIds={selectedScIds}
        onContactSc={onContactSc}
      />

      {/* Side-by-Side Matrix Table with Leader Badges */}
      <RmComparisonMatrixTable selectedScIds={selectedScIds} />

      {/* Strategic Insights */}
      <RmComparisonInsightsCard />
    </div>
  );
}
