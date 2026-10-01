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
    { id: "profile", label: "Profile", icon: <User className="size-4 shrink-0" /> },
    { id: "security", label: "Security & PIN", icon: <Lock className="size-4 shrink-0" /> },
    { id: "bank", label: "Bank Account", icon: <Landmark className="size-4 shrink-0" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="size-4 shrink-0" /> },
    { id: "paylater", label: "PayLater", icon: <CreditCard className="size-4 shrink-0" /> },
    { id: "devices", label: "Linked Devices", icon: <Smartphone className="size-4 shrink-0" /> },
    { id: "about", label: "About & Help", icon: <HelpCircle className="size-4 shrink-0" /> },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-12 w-full min-w-0 max-w-full overflow-hidden">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#0F152A]">Settings</h1>
        <p className="mt-0.5 text-xs text-[#8C909B]">
          Manage your account, security, bank accounts, and preferences
        </p>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-12 items-start w-full min-w-0">
        {/* Navigation Tabs (Horizontal scroll on mobile, Vertical on desktop) */}
        <div className="lg:col-span-4 xl:col-span-3 w-full min-w-0">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-2 sm:p-3 shadow-xs w-full min-w-0">
            <h4 className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8C909B] hidden lg:block">
              Settings Navigation
            </h4>

            {/* Scrollable Container */}
            <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain touch-pan-x flex lg:flex-col gap-1.5 lg:gap-1 pb-1 lg:pb-0 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all relative shrink-0 lg:shrink lg:w-full whitespace-nowrap select-none ${
                      isActive
                        ? "bg-[#2563EB] text-white shadow-xs lg:bg-[#F8FAFC] lg:text-[#0F152A]"
                        : "text-[#66738C] bg-transparent hover:bg-slate-50 hover:text-[#0F152A]"
                    }`}
                  >
                    {isActive && (
                      <span className="hidden lg:block absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#2563EB]" />
                    )}
                    <span
                      className={
                        isActive
                          ? "text-white lg:text-[#2563EB]"
                          : "text-[#8C909B]"
                      }
                    >
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-8 xl:col-span-9 w-full min-w-0">
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