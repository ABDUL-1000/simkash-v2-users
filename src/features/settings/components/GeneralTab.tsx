"use client";

import { useState } from "react";

export function GeneralTab() {
  const [platformName, setPlatformName] = useState("SimKash Admin");
  const [supportEmail, setSupportEmail] = useState("support@simkash.com");
  const [timezone, setTimezone] = useState("Africa/Lagos (GMT+1)");
  const [currency, setCurrency] = useState("NGN (₦)");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
        <h3 className="text-sm font-bold text-[#0F172A]">Platform Configuration</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-bold text-[#64748B]">Platform Name</label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-bold text-[#64748B]">Support Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-bold text-[#64748B]">System Timezone</label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-bold text-[#64748B]">Currency</label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
          <div>
            <strong className="font-bold text-[#0F172A] block">Maintenance Mode</strong>
            <span className="text-xs text-[#64748B]">Temporarily disable access for non-admin users</span>
          </div>
          <input
            type="checkbox"
            checked={maintenanceMode}
            onChange={(e) => setMaintenanceMode(e.target.checked)}
            className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
          />
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
        >
          Save Platform Settings
        </button>
      </div>
    </div>
  );
}
