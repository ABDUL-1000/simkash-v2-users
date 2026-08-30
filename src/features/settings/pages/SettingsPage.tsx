import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DashboardStats } from "@/features/distribution/agency-partner/components/DashboardStat";

import { GeneralTab } from "../components/GeneralTab";
import { SecurityTab } from "../components/SecurityTab";
import { NotificationsTab } from "../components/NotificationsTab";
import { CommissionPayoutsTab } from "../components/CommissionPayoutsTab";
import { BonusRewardsTab } from "../components/BonusRewardsTab";
import { ServicePricingTab } from "../components/ServicePricingTab";
import { IntegrationsTab } from "../components/IntegrationsTab";
import { AuditLogTab } from "../components/AuditLogTab";
import { AdminUsersTab } from "../components/AdminUsersTab";

import { AddNewPackageModal } from "../Modals/AddNewPackageModal";
import { AddAdminUserModal } from "../Modals/AddAdminUserModal";
import { AddWebhookModal } from "../Modals/AddWebhookModal";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Page Header */}
      <PageHeader
        title="Settings"
        description="Configure platform-wide preferences, security and integrations"
      />

      {/* Top Metric Cards - Reusing existing DashboardStats per explicit directive */}
      <DashboardStats />

      {/* 9 Interactive Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E2E8F0]">
        {[
          { id: "general", label: "General" },
          { id: "security", label: "Security" },
          { id: "notifications", label: "Notifications" },
          { id: "commission", label: "Commission & Payouts" },
          { id: "bonus", label: "Bonus & Rewards" },
          { id: "service_pricing", label: "Service Pricing" },
          { id: "integrations", label: "Integrations" },
          { id: "audit_log", label: "Audit Log" },
          { id: "admin_users", label: "Admin Users" },
        ].map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 font-bold transition-all border-b-2 text-xs sm:text-sm whitespace-nowrap ${
                isActive
                  ? "border-[#2563EB] text-[#2563EB] bg-[#EFF6FF]/50"
                  : "border-transparent text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENTS (Separated Components) */}
      {activeTab === "general" && <GeneralTab />}
      {activeTab === "security" && <SecurityTab />}
      {activeTab === "notifications" && <NotificationsTab />}
      {activeTab === "commission" && <CommissionPayoutsTab />}
      {activeTab === "bonus" && <BonusRewardsTab />}
      {activeTab === "service_pricing" && (
        <ServicePricingTab onAddPackageClick={() => setActiveModal("add_package_modal")} />
      )}
      {activeTab === "integrations" && (
        <IntegrationsTab onAddWebhookClick={() => setActiveModal("add_webhook_modal")} />
      )}
      {activeTab === "audit_log" && <AuditLogTab />}
      {activeTab === "admin_users" && (
        <AdminUsersTab onAddAdminClick={() => setActiveModal("add_admin_modal")} />
      )}

      {/* Modals */}
      <AddNewPackageModal
        open={activeModal === "add_package_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <AddAdminUserModal
        open={activeModal === "add_admin_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <AddWebhookModal
        open={activeModal === "add_webhook_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </div>
  );
}
