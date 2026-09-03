import { useState } from "react";
import { useParams } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { SimSwapModal } from "../Modals/SimSwapModal";
import { RenewSimModal } from "../Modals/RenewSimModal";
import { ReportIssueModal } from "../Modals/ReportIssueModal";

export default function DeviceSimDetailsPage() {
  const { simId } = useParams<{ simId?: string }>();
  const simNum = simId || "07022222222";

  const [autoRenewEnabled, setAutoRenewEnabled] = useState(true);

  // Modal states
  const [simSwapOpen, setSimSwapOpen] = useState(false);
  const [renewSimOpen, setRenewSimOpen] = useState(false);
  const [reportIssueOpen, setReportIssueOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#FFCC00] px-2.5 py-0.5 text-xs font-extrabold text-[#0F152A]">
                MTN
              </span>
              <span className="rounded-md border border-[#E2ECF6] bg-[#F8FAFC] px-2 py-0.5 text-xs font-semibold text-[#66738C]">
                POS SIM
              </span>
            </div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#0F152A]">
              {simNum}
            </h1>
            <p className="mt-1 text-xs text-[#8C909B]">Active since 17 Jun 2026</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setRenewSimOpen(true)}
              className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Renew SIM
            </button>
            <button
              type="button"
              onClick={() => setSimSwapOpen(true)}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              SIM Swap
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (~65%) vs Right Column (~35%) */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (Span 2) */}
        <div className="space-y-6 lg:col-span-2">
          {/* SIM Details Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0F152A]">SIM Details</h3>

            {/* Status Banner */}
            <div className="flex items-center justify-between rounded-2xl bg-[#EBFFF8] p-3.5 text-xs text-[#065F46]">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="size-2 rounded-full bg-[#10B981]" /> Active
              </span>
              <span className="font-semibold text-[#10B981]">Renews in 13 days</span>
            </div>

            {/* Key-Value Table */}
            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">SIM Number</span>
                <span className="font-bold text-[#0F152A]">{simNum}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Network</span>
                <span className="font-bold text-[#F59E0B]">MTN</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">SIM Type</span>
                <span className="rounded-md border border-[#E2ECF6] bg-[#F8FAFC] px-2 py-0.5 font-semibold text-[#2563EB]">
                  POS SIM
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Serial/ICCID</span>
                <span className="font-mono font-medium text-[#0F152A]">89234082104900234</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Status</span>
                <span className="font-bold text-[#10B981]">Active</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Activated</span>
                <span className="font-bold text-[#0F152A]">17 Jun 2026</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Plan</span>
                <span className="font-bold text-[#0F152A]">30-day POS SIM</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Expiry</span>
                <span className="font-bold text-[#0F152A]">26 Jun 2026</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Auto-Renew</span>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 font-bold text-[#10B981]">
                    Enabled
                  </span>
                  <button
                    type="button"
                    onClick={() => setAutoRenewEnabled(!autoRenewEnabled)}
                    className="text-[#2563EB] hover:underline"
                  >
                    Turn off
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Usage Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-[#0F152A]">Data Usage</h3>

            {/* Circular Gauge Center Display */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative flex size-36 items-center justify-center rounded-full border-8 border-[#2563EB] border-t-[#E2ECF6]">
                <div className="text-center">
                  <span className="text-2xl font-extrabold text-[#2563EB]">78%</span>
                </div>
              </div>
              <h4 className="mt-3 text-base font-extrabold text-[#0F152A]">
                14GB used of 18GB
              </h4>
              <p className="text-xs text-[#8C909B]">4GB remaining</p>
            </div>

            {/* Usage Stats Table */}
            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Today</span>
                <span className="font-bold text-[#0F152A]">1.2GB</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">This Week</span>
                <span className="font-bold text-[#0F152A]">4.8GB</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">This Month</span>
                <span className="font-bold text-[#0F152A]">14GB</span>
              </div>
            </div>

            {/* 7-Day Usage Bar Chart */}
            <div className="space-y-2 pt-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                7-day Usage
              </label>
              <div className="flex items-end justify-between gap-2 h-24 pt-4">
                {[
                  { day: "Mon", height: "h-8" },
                  { day: "Tue", height: "h-12" },
                  { day: "Wed", height: "h-10" },
                  { day: "Thu", height: "h-14" },
                  { day: "Fri", height: "h-12" },
                  { day: "Sat", height: "h-10" },
                  { day: "Sun", height: "h-20", active: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 gap-2">
                    <div className="w-full max-w-[16px] rounded-t-md bg-[#EFF4F8] flex items-end justify-center h-full">
                      <div
                        className={`w-full rounded-t-md ${
                          item.active ? "bg-[#2563EB]" : "bg-[#D0DFF0]"
                        } ${item.height}`}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-bold ${
                        item.active ? "text-[#2563EB]" : "text-[#8C909B]"
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Plan History Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0F152A]">Plan History</h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              {[
                { date: "17 Jun 2026", amount: "₦5,000", plan: "30-day POS Plan" },
                { date: "17 May 2026", amount: "₦5,000", plan: "30-day POS Plan" },
                { date: "17 Apr 2026", amount: "₦5,000", plan: "30-day POS Plan" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-bold text-[#0F152A]">{item.plan}</h4>
                    <p className="text-[11px] text-[#8C909B]">
                      Customer-paid{" "}
                      <span className="ml-1 rounded-md bg-[#EBFFF8] px-1.5 py-0.5 font-bold text-[#10B981]">
                        Paid
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-[#0F152A]">{item.amount}</span>
                    <p className="text-[11px] text-[#8C909B]">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                Load more
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          {/* Renewal Status Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C909B]">
              Renewal Status
            </h3>
            <div>
              <h4 className="text-base font-bold text-[#0F152A]">Renews in 13 days</h4>
              <p className="text-xs text-[#8C909B]">26 Jun 2026</p>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setRenewSimOpen(true)}
                className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
              >
                Renew
              </button>
              <button
                type="button"
                onClick={() => setRenewSimOpen(true)}
                className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
              >
                Change Plan
              </button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C909B]">
              Quick Actions
            </h3>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setRenewSimOpen(true)}
                className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
              >
                Renew SIM
              </button>
              <button
                type="button"
                onClick={() => setRenewSimOpen(true)}
                className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
              >
                Change Plan
              </button>
              <button
                type="button"
                onClick={() => setSimSwapOpen(true)}
                className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
              >
                SIM Swap
              </button>
              <button
                type="button"
                onClick={() => setReportIssueOpen(true)}
                className="w-full rounded-xl border border-[#EF4444] py-2.5 text-xs font-bold text-[#EF4444] hover:bg-red-50"
              >
                Report Issue
              </button>
            </div>
          </div>

          {/* Reminder History Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C909B]">
              Reminder History
            </h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              {[
                { title: "30-day reminder", date: "28 May", status: "Sent", bg: "bg-[#EBFFF8] text-[#10B981]" },
                { title: "14-day reminder", date: "12 Jun", status: "Sent", bg: "bg-[#EBFFF8] text-[#10B981]" },
                { title: "7-day reminder", date: "19 Jun", status: "Sent", bg: "bg-[#EBFFF8] text-[#10B981]" },
                { title: "3-day reminder", date: "22 Jun", status: "Sent", bg: "bg-[#EBFFF8] text-[#10B981]" },
                { title: "1-day reminder", date: "Tomorrow", status: "Pending", bg: "bg-[#FFFBEB] text-[#F59E0B]" },
              ].map((rem, idx) => (
                <div key={idx} className="flex items-center justify-between py-2.5">
                  <div>
                    <h5 className="font-bold text-[#0F152A]">{rem.title}</h5>
                    <p className="text-[11px] text-[#8C909B]">{rem.date}</p>
                  </div>
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${rem.bg}`}>
                    {rem.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-Renew Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F152A]">Auto-Renew</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRenewEnabled}
                  onChange={(e) => setAutoRenewEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#E2ECF6] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]" />
              </label>
            </div>

            <p className="text-xs text-[#8C909B]">
              SIM renews automatically when it expires. Charged from wallet.
            </p>
            <p className="text-xs font-semibold text-[#0F152A]">
              Current plan: 30-day (₦5,000)
            </p>

            <div className="flex items-start gap-2 rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3 text-xs text-[#D9990D]">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <p>Ensure your wallet has at least ₦5,000 for auto-renewal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SimSwapModal
        open={simSwapOpen}
        onOpenChange={setSimSwapOpen}
        simNumber={simNum}
      />
      <RenewSimModal
        open={renewSimOpen}
        onOpenChange={setRenewSimOpen}
        simNumber={simNum}
      />
      <ReportIssueModal
        open={reportIssueOpen}
        onOpenChange={setReportIssueOpen}
        simNumber={simNum}
      />
    </div>
  );
}
