import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { CA_MY_ACTIVATIONS_LIST } from "../data/ca-network.data";
import { ActivationDetailsHeader } from "../components/ActivationDetailsHeader";
import { ActivationDetailsTable } from "../components/ActivationDetailsTable";
import { ActivationTimelineCard } from "../components/ActivationTimelineCard";
import { ActivationChainCard } from "../components/ActivationChainCard";

export function CorporateAgentActivationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const record =
    CA_MY_ACTIVATIONS_LIST.find((r) => r.id === id || r.reference === id) ||
    CA_MY_ACTIVATIONS_LIST[0];

  const handleDownloadReceipt = () => {
    alert(`Downloading receipt for ${record.simNumber}...`);
  };

  const handleRetry = () => {
    alert(`Retrying activation for ${record.simNumber}...`);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(appPaths.caNetwork)}
          className="flex cursor-pointer items-center gap-2 text-xs font-bold text-[#66738C] transition hover:text-[#0F152A]"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Network Activity</span>
        </button>
      </div>

      {/* Top Header Strip & Hero Banner */}
      <ActivationDetailsHeader
        record={record}
        onDownloadReceipt={handleDownloadReceipt}
      />

      {/* Responsive 2-Column Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 Cols) */}
        <div className="space-y-6 lg:col-span-2">
          <ActivationDetailsTable record={record} />
          <ActivationTimelineCard />
        </div>

        {/* Right Column (1 Col) */}
        <div>
          <ActivationChainCard
            customerName={record.customerName}
            isFailed={record.status === "Failed"}
            onRetry={handleRetry}
            onDownloadReceipt={handleDownloadReceipt}
          />
        </div>
      </div>
    </div>
  );
}

export default CorporateAgentActivationDetailPage;
