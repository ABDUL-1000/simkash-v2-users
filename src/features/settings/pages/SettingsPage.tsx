import { useState } from "react";
import {
  Bell,
  CreditCard,
  HelpCircle,
  Landmark,
  Lock,
  Smartphone,
  User,
} from "lucide-react";
import { ProfileTab } from "../components/ProfileTab";
import { SecurityPinTab } from "../components/SecurityPinTab";
import { BankAccountTab } from "../components/BankAccountTab";
import { NotificationsSettingsTab } from "../components/NotificationsSettingsTab";
import { PayLaterSettingsTab } from "../components/PayLaterSettingsTab";
import { LinkedDevicesTab } from "../components/LinkedDevicesTab";
import { AboutHelpTab } from "../components/AboutHelpTab";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="size-4" /> },
    { id: "security", label: "Security & PIN", icon: <Lock className="size-4" /> },
    { id: "bank", label: "Bank Account", icon: <Landmark className="size-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="size-4" /> },
    { id: "paylater", label: "PayLater", icon: <CreditCard className="size-4" /> },
    { id: "devices", label: "Linked Devices", icon: <Smartphone className="size-4" /> },
    { id: "about", label: "About & Help", icon: <HelpCircle className="size-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F152A]">Settings</h1>
        <p className="mt-0.5 text-xs text-[#8C909B]">
          Manage your account, security and preferences
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column — Navigation Tabs Sidebar (4 cols on lg, 3 on xl) */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3 shadow-xs space-y-1">
            <h4 className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8C909B] hidden lg:block">
              Settings
            </h4>

            <div className="flex lg:flex-col overflow-x-auto gap-1 lg:gap-1 whitespace-nowrap pb-1 lg:pb-0">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all relative shrink-0 lg:shrink lg:w-full ${
                      isActive
                        ? "bg-[#F8FAFC] text-[#0F152A]"
                        : "text-[#66738C] hover:bg-slate-50 hover:text-[#0F152A]"
                    }`}
                  >
                    {isActive && (
                      <span className="hidden lg:block absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#2563EB]" />
                    )}
                    <span className={isActive ? "text-[#2563EB]" : "text-[#8C909B]"}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column — Tab Content (8 cols on lg, 9 on xl) */}
        <div className="lg:col-span-8 xl:col-span-9">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "security" && <SecurityPinTab />}
          {activeTab === "bank" && <BankAccountTab />}
          {activeTab === "notifications" && <NotificationsSettingsTab />}
          {activeTab === "paylater" && <PayLaterSettingsTab />}
          {activeTab === "devices" && <LinkedDevicesTab />}
          {activeTab === "about" && <AboutHelpTab />}
        </div>
      </div>
    </div>
  );
}
