import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, Plus, ArrowLeft } from "lucide-react";
import { SubPartnerTable } from "../components/SubPartnerTable";
import { OnboardPartnerModal } from "@/features/dashboard/corporate-agent/agency-partner/Modals/OnboardPartnerModal";
import { appPaths } from "@/app/router/paths";

type SubPartnerTab = "all" | "active" | "on_target" | "at_risk" | "inactive";

const TABS: { id: SubPartnerTab; label: string; count: string }[] = [
  { id: "all", label: "All", count: "63" },
  { id: "active", label: "Active", count: "56" },
  { id: "on_target", label: "On Target", count: "41" },
  { id: "at_risk", label: "At Risk", count: "15" },
  { id: "inactive", label: "Inactive", count: "7" },
];

export default function SubPartnerNetworkPage() {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SubPartnerTab>("all");
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Back button if partnerId is present */}
      {partnerId && (
        <div>
          <button
            type="button"
            onClick={() => navigate(appPaths.agencyPartnerDetails(partnerId).path)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Partner Details</span>
          </button>
        </div>
      )}

      <PageHeader
        title="Sub-Partner Network"
        description={`63 sub-partners under ${partnerId ? "Rabiu Sani" : "Agency Partner"}`}
        actions={[
          {
            key: "export",
            label: "Export",
            icon: <Download className="size-4" />,
            variant: "outline",
          },
          {
            key: "onboard-sub-partner",
            label: "Onboard Sub-Partner",
            icon: <Plus className="size-4" />,
            variant: "default",
            onClick: () => setOnboardModalOpen(true),
          },
        ]}
      />

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0F1F36] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#E2ECF8] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[11px] ${
                  isActive ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                }`}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main SubPartner Table */}
      <SubPartnerTable activeTab={activeTab} />

      {/* Onboard Sub-Partner Modal */}
      <OnboardPartnerModal
        open={onboardModalOpen}
        onOpenChange={setOnboardModalOpen}
      />
    </div>
  );
}
