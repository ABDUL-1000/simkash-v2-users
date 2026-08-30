"use client";

import { useState } from "react";

export function NotificationsTab() {
  const [smsNotif, setSmsNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [adminNotifs, setAdminNotifs] = useState({
    newAgentApp: true,
    simActivation: false,
    payoutRequest: true,
    flaggedTxn: true,
    accountSuspended: true,
    upgradeEligible: true,
    lowStock: true,
    easybuyApp: true,
    newOrder: false,
    referralClosed: true,
  });

  return (
    <div className="space-y-6 text-xs sm:text-sm">
      {/* Notification Channels */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Notification Channels</h3>

        <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-[#0F172A]">SMS Notifications</span>
            <input
              type="checkbox"
              checked={smsNotif}
              onChange={(e) => setSmsNotif(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="font-bold text-[#0F172A]">Push Notifications</span>
            <input
              type="checkbox"
              checked={pushNotif}
              onChange={(e) => setPushNotif(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="font-bold text-[#0F172A]">Email Notifications</span>
            <input
              type="checkbox"
              checked={emailNotif}
              onChange={(e) => setEmailNotif(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Notify Admin When */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Notify Admin When</h3>

        <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
          {Object.entries({
            newAgentApp: "New agent application",
            simActivation: "SIM activation",
            payoutRequest: "Payout request",
            flaggedTxn: "Flagged transaction",
            accountSuspended: "Account suspended",
            upgradeEligible: "Upgrade eligible agent",
            lowStock: "Low SIM stock (<50)",
            easybuyApp: "EasyBuy application",
            newOrder: "New marketplace order",
            referralClosed: "Referral deal closed",
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between pt-2.5">
              <span className="font-bold text-[#0F172A]">{label}</span>
              <input
                type="checkbox"
                checked={adminNotifs[key as keyof typeof adminNotifs]}
                onChange={(e) => setAdminNotifs({ ...adminNotifs, [key]: e.target.checked })}
                className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Customer Renewal Reminders */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Customer Renewal Reminders</h3>

        <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
          {["30 days before expiry", "14 days before expiry", "7 days before expiry", "3 days before expiry", "1 day before expiry", "Day of expiry"].map((item) => (
            <div key={item} className="flex items-center justify-between pt-2.5">
              <span className="font-bold text-[#0F172A]">{item}</span>
              <input
                type="checkbox"
                defaultChecked
                className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
