"use client";

import { useState } from "react";

export function SecurityTab() {
  const [twoFA, setTwoFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [forcePinPayouts, setForcePinPayouts] = useState(true);
  const [loginAttemptLimit, setLoginAttemptLimit] = useState(true);
  const [minPasswordLen, setMinPasswordLen] = useState("8");
  const [reqSpecialChar, setReqSpecialChar] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState("90 days");

  return (
    <div className="space-y-6 text-xs sm:text-sm">
      {/* Authentication Card */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Authentication</h3>

        <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-[#0F172A]">Two-Factor Authentication (2FA)</span>
            <input
              type="checkbox"
              checked={twoFA}
              onChange={(e) => setTwoFA(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="font-bold text-[#0F172A]">Session Timeout (30 mins)</span>
            <input
              type="checkbox"
              checked={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="font-bold text-[#0F172A]">Force PIN on Payouts</span>
            <input
              type="checkbox"
              checked={forcePinPayouts}
              onChange={(e) => setForcePinPayouts(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="font-bold text-[#0F172A]">Login Attempt Limit (5 tries)</span>
            <input
              type="checkbox"
              checked={loginAttemptLimit}
              onChange={(e) => setLoginAttemptLimit(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Password Policy Card */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Password Policy</h3>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block font-bold text-[#64748B] text-xs">Min Password Length</label>
            <input
              type="text"
              value={minPasswordLen}
              onChange={(e) => setMinPasswordLen(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-[#0F172A] text-xs">Require Special Characters</span>
            <input
              type="checkbox"
              checked={reqSpecialChar}
              onChange={(e) => setReqSpecialChar(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#64748B] text-xs">Password Expiry</label>
            <input
              type="text"
              value={passwordExpiry}
              onChange={(e) => setPasswordExpiry(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
          </div>
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
        >
          Save Policy
        </button>
      </div>

      {/* Active Admin Sessions Card */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Active Admin Sessions</h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC]">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#059669]" />
              <div>
                <strong className="font-bold text-[#0F172A] block">Yusuf Adam Baba</strong>
                <span className="text-[11px] text-[#64748B]">Chrome · Lagos</span>
              </div>
            </div>
            <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">Current session</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC]">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#94A3B8]" />
              <div>
                <strong className="font-bold text-[#0F172A] block">Admin User 2</strong>
                <span className="text-[11px] text-[#64748B]">Safari · Abuja</span>
              </div>
            </div>
            <span className="text-[11px] text-[#64748B]">2 hours ago</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC]">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#94A3B8]" />
              <div>
                <strong className="font-bold text-[#0F172A] block">Admin User 3</strong>
                <span className="text-[11px] text-[#64748B]">Firefox · Kano</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#64748B]">Yesterday</span>
              <button type="button" className="font-bold text-[#DC2626] hover:underline">Revoke</button>
            </div>
          </div>
        </div>

        <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline block pt-1">
          View all sessions →
        </button>
      </div>
    </div>
  );
}
