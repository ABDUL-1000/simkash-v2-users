import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Copy,
  Info,
  Plus,
  RefreshCw,
  Zap,
} from "lucide-react";
import { TopUpSimModal } from "../Modals/TopUpSimModal";
import { GetAnotherSimModal } from "../Modals/GetAnotherSimModal";
import { ZeroLimitDetailsModal } from "../Modals/ZeroLimitDetailsModal";
import { ReportIssueModal } from "../Modals/ReportIssueModal";

type SimState = "active" | "low_data" | "exhausted" | "inactive" | "syncing";
type ZeroLimitTab = "sim" | "buy_data" | "history";

export default function ZeroLimitSimPage() {
  const [simState, setSimState] = useState<SimState>("active");
  const [activeTab, setActiveTab] = useState<ZeroLimitTab>("sim");
  const [copied, setCopied] = useState(false);

  // Modal triggers
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [getAnotherSimModalOpen, setGetAnotherSimModalOpen] = useState(false);
  const [zeroLimitDetailsOpen, setZeroLimitDetailsOpen] = useState(false);
  const [reportIssueOpen, setReportIssueOpen] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState("20GB");

  const handleCopyNumber = () => {
    navigator.clipboard.writeText("08123456789");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenTopUpWithPackage = (pkgSize: string) => {
    setSelectedPackage(pkgSize);
    setTopUpModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 0. Top Page Red Warning Banner (Exhausted State Only - Image 3) */}
      {simState === "exhausted" && (
        <div className="flex items-center gap-2 rounded-2xl bg-[#EF4444] px-4 py-3 text-xs font-bold text-white shadow-md">
          <AlertTriangle className="size-4 shrink-0" />
          <span>
            Data Exhausted — Your ZeroLimit SIM has no data remaining. Top up now to restore connectivity.
          </span>
        </div>
      )}

      {/* 1. Header & Primary Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">My ZeroLimit SIMs</h1>
          <p className="mt-1 text-xs text-[#8C909B]">
            MTN Nigeria · Data synced via API
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTopUpModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] px-5 py-2.5 text-xs font-bold text-[#D9990D] shadow-xs transition hover:bg-[#FFF5D6]"
          >
            <Zap className="size-4 fill-[#D9990D]" /> Top Up SIM
          </button>
          <button
            type="button"
            onClick={() => setGetAnotherSimModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            <Plus className="size-4" /> Get Another SIM
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex rounded-2xl bg-[#EFF4F8] p-1 w-fit border border-[#E2ECF6]">
        <button
          type="button"
          onClick={() => setActiveTab("sim")}
          className={`rounded-xl px-5 py-2 text-xs font-bold transition ${
            activeTab === "sim"
              ? "bg-white text-[#2563EB] shadow-xs"
              : "text-[#8C909B] hover:text-[#0F152A]"
          }`}
        >
          Zero Limit SIM
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("buy_data")}
          className={`rounded-xl px-5 py-2 text-xs font-bold transition ${
            activeTab === "buy_data"
              ? "bg-white text-[#2563EB] shadow-xs"
              : "text-[#8C909B] hover:text-[#0F152A]"
          }`}
        >
          Buy Data
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`rounded-xl px-5 py-2 text-xs font-bold transition ${
            activeTab === "history"
              ? "bg-white text-[#2563EB] shadow-xs"
              : "text-[#8C909B] hover:text-[#0F152A]"
          }`}
        >
          History
        </button>
      </div>

      {/* Real-time API Connection Banner */}
      <div className="flex items-center justify-between rounded-2xl bg-[#EBFFF8] p-3 px-4 text-xs font-bold text-[#10B981]">
        <span className="flex items-center gap-2">
          <span>📡</span> MTN API Connected · Data syncing in real time
        </span>
        <span className="flex items-center gap-1 text-[11px] font-semibold text-[#8C909B]">
          Last sync: Just now <RefreshCw className="size-3 animate-spin" />
        </span>
      </div>

      {/* State Switcher Bar (Interactive preview for all 5 images) */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3.5 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold text-[#8C909B] uppercase tracking-wider">
            Simulate SIM State:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "active", label: "Active (67GB)" },
              { id: "low_data", label: "Low Data (8GB)" },
              { id: "exhausted", label: "Exhausted (0GB)" },
              { id: "inactive", label: "SIM Inactive" },
              { id: "syncing", label: "Syncing API..." },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSimState(st.id as any)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                  simState === st.id
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "border border-[#E2ECF6] bg-[#F8FAFC] text-[#66738C] hover:bg-slate-100"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === "sim" && (
        <>
          {/* How Top Up Works Info Box */}
          <div className="rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-5 text-xs text-[#2563EB] space-y-2">
            <h4 className="font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <Info className="size-4" /> HOW TOP UP WORKS
            </h4>
            <div className="space-y-1 text-[#0F152A]">
              <p className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="size-3.5 text-[#2563EB]" /> Your ZeroLimit SIM is an MTN SIM with a linked number (MSISDN)
              </p>
              <p className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="size-3.5 text-[#2563EB]" /> Data balance and status sync automatically via MTN API
              </p>
              <p className="flex items-center gap-1.5 font-bold text-[#EF4444]">
                <AlertTriangle className="size-3.5 text-[#EF4444]" /> To top up, enter your linked SIM number on SimKash — top up cannot be done directly from this screen
              </p>
            </div>
            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setTopUpModalOpen(true)}
                className="font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1"
              >
                Top Up via SimKash <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* 2-Column Dashboard Grid: Left SIM Card + History, Right Plan & Packages */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column (Span 2) */}
            <div className="space-y-6 lg:col-span-2">
              {/* Main Card — ZeroLimit SIM Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[#FFCC00] font-extrabold text-[#0F152A] text-xs">
                      MTN
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-[#0F152A]">ZeroLimit SIM</h3>
                      <p className="text-xs text-[#8C909B]">MTN Nigeria · 120GB Fixed Plan</p>
                    </div>
                  </div>

                  {/* Dynamic Status Badge */}
                  {simState === "active" && (
                    <span className="rounded-full bg-[#EBFFF8] px-3 py-1 text-xs font-bold text-[#10B981]">
                      ● Active
                    </span>
                  )}
                  {simState === "low_data" && (
                    <span className="rounded-full bg-[#EBFFF8] px-3 py-1 text-xs font-bold text-[#10B981]">
                      ● Active
                    </span>
                  )}
                  {simState === "exhausted" && (
                    <span className="rounded-full bg-[#FFFBEB] px-3 py-1 text-xs font-bold text-[#D9990D]">
                      ● Active
                    </span>
                  )}
                  {simState === "inactive" && (
                    <span className="rounded-full bg-[#FFF7F8] px-3 py-1 text-xs font-bold text-[#EF4444]">
                      ● Inactive
                    </span>
                  )}
                  {simState === "syncing" && (
                    <span className="rounded-full bg-[#FFFBEB] px-3 py-1 text-xs font-bold text-[#D9990D]">
                      ● Syncing...
                    </span>
                  )}
                </div>

                {/* Linked Number Box */}
                <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3 px-4">
                  <span className="text-xs font-bold text-[#8C909B] tracking-wider uppercase">
                    LINKED NUMBER
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-[#0F152A]">0812 345 6789</span>
                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className="text-[#8C909B] hover:text-[#2563EB]"
                    >
                      <Copy className="size-4" />
                    </button>
                    {copied && <span className="text-[10px] font-bold text-[#10B981]">Copied!</span>}
                  </div>
                </div>

                {/* Data Balance Center Display */}
                <div className="text-center py-2 space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
                    DATA BALANCE
                  </label>

                  {simState === "active" && (
                    <h2 className="text-5xl font-extrabold tracking-tight text-[#0F152A]">
                      67GB
                    </h2>
                  )}
                  {simState === "low_data" && (
                    <h2 className="text-5xl font-extrabold tracking-tight text-[#EF4444]">
                      8GB
                    </h2>
                  )}
                  {simState === "exhausted" && (
                    <h2 className="text-5xl font-extrabold tracking-tight text-[#EF4444]">
                      0GB
                    </h2>
                  )}
                  {(simState === "inactive" || simState === "syncing") && (
                    <h2 className="text-5xl font-extrabold tracking-tight text-[#8C909B]">
                      ——
                    </h2>
                  )}

                  <p className="text-xs font-semibold text-[#8C909B]">
                    {simState === "syncing" ? "Loading..." : "Remaining"}
                  </p>

                  {/* Dynamic Progress Bar */}
                  <div className="pt-3">
                    <div className="h-3.5 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
                      {simState === "active" && (
                        <div className="h-full w-[44%] rounded-full bg-[#2563EB]" />
                      )}
                      {(simState === "low_data" || simState === "exhausted") && (
                        <div className="h-full w-[95%] rounded-full bg-[#EF4444]" />
                      )}
                      {simState === "inactive" && (
                        <div className="h-full w-0 rounded-full bg-slate-300" />
                      )}
                      {simState === "syncing" && (
                        <div className="h-full w-full rounded-full bg-slate-200 animate-pulse" />
                      )}
                    </div>
                    <div className="flex justify-between text-[11px] font-semibold text-[#8C909B] mt-1.5">
                      <span>
                        {simState === "active"
                          ? "53GB / 120GB"
                          : simState === "low_data"
                          ? "112GB / 120GB"
                          : simState === "exhausted"
                          ? "120GB / 120GB"
                          : "— / —"}
                      </span>
                      <span>
                        {simState === "active"
                          ? "53GB used"
                          : simState === "low_data"
                          ? "112GB used"
                          : simState === "exhausted"
                          ? "120GB used"
                          : "— used"}
                      </span>
                    </div>
                  </div>

                  {/* Sync Status Note */}
                  <p className="text-[11px] font-semibold text-[#8C909B] pt-2">
                    {simState === "active" && "🔄 Synced via MTN API · 2 minutes ago"}
                    {simState === "low_data" && (
                      <span className="text-[#EF4444]">
                        🔄 ⌛ Synced via MTN API · 5 minutes ago — Data running low! Top up now.
                      </span>
                    )}
                    {simState === "exhausted" && (
                      <span className="text-[#EF4444]">
                        🔄 ⌛ Synced via MTN API · Just now — Data exhausted! Top up to restore.
                      </span>
                    )}
                    {simState === "inactive" && (
                      <span className="text-[#EF4444]">
                        🔄 ⌛ Last sync: Unable to sync — SIM inactive. SIM inactive — contact SimKash support to activate
                      </span>
                    )}
                    {simState === "syncing" && "🔄 ⌛ Syncing with MTN API... Fetching data from MTN API..."}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4 text-xs">
                  <span className="text-[#8C909B] font-mono">
                    SIM ID: 89234082104900
                  </span>

                  <button
                    type="button"
                    disabled={simState === "inactive"}
                    onClick={() => setTopUpModalOpen(true)}
                    className={`flex items-center gap-1.5 rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition ${
                      simState === "low_data" || simState === "exhausted"
                        ? "bg-[#EF4444] hover:bg-red-600"
                        : simState === "inactive"
                        ? "bg-slate-300 cursor-not-allowed"
                        : "bg-[#2563EB] hover:bg-blue-700"
                    }`}
                  >
                    <Zap className="size-3.5 fill-white" /> Top Up
                  </button>
                </div>
              </div>

              {/* View Full Details Action -> Opens ZeroLimitDetailsModal (Image 5) */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setZeroLimitDetailsOpen(true)}
                  className="font-bold text-xs text-[#2563EB] hover:underline inline-flex items-center gap-1"
                >
                  View Full Details <ArrowRight className="size-3.5" />
                </button>
              </div>

              {/* Dynamic State Alert Boxes (Under Card) */}
              {simState === "low_data" && (
                <div className="flex items-center justify-between rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-4 text-xs text-[#D9990D]">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#D9990D]">8GB remaining</h4>
                    <p className="text-xs text-[#D9990D]">
                      At your current pace, your data will run out in ~21 hours
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTopUpModalOpen(true)}
                    className="rounded-xl bg-[#F59E0B] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-amber-600"
                  >
                    Top Up Now
                  </button>
                </div>
              )}

              {simState === "exhausted" && (
                <div className="flex items-center justify-between rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 text-xs text-[#EF4444]">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#EF4444]">
                      0GB remaining — Data Exhausted
                    </h4>
                    <p className="text-xs text-[#EF4444]">
                      Your SIM is active but has no data. Top up via SimKash to restore.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTopUpModalOpen(true)}
                    className="rounded-xl bg-[#EF4444] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-red-600"
                  >
                    Top Up Now
                  </button>
                </div>
              )}

              {simState === "inactive" && (
                <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 text-xs space-y-3">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#EF4444]">SIM Inactive</h4>
                    <p className="text-xs text-[#EF4444] mt-0.5">
                      This ZeroLimit SIM is currently inactive. Contact SimKash support to reactivate your SIM and restore data connectivity.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReportIssueOpen(true)}
                    className="rounded-xl bg-[#EF4444] px-6 py-2.5 font-bold text-white shadow-xs hover:bg-red-600"
                  >
                    Contact Support
                  </button>
                </div>
              )}

              {/* Usage History Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#0F152A]">Usage History</h3>
                  <span className="text-xs text-[#8C909B]">Powered by MTN API</span>
                </div>

                {/* Bar Chart */}
                <div className="flex items-end justify-between gap-3 h-32 pt-6 px-4 border-b border-[#E2ECF6] pb-4">
                  {[
                    { day: "M", val: "8.4GB", height: "h-16", color: "bg-[#10B981]" },
                    { day: "T", val: "12.1GB", height: "h-24", color: "bg-[#10B981]" },
                    { day: "W", val: "6.7GB", height: "h-12", color: "bg-[#10B981]" },
                    { day: "T", val: "9.2GB", height: "h-20", color: "bg-[#10B981]" },
                    { day: "F", val: "14.5GB", height: "h-28", color: "bg-[#F59E0B]" },
                    { day: "S", val: "4.1GB", height: "h-8", color: "bg-[#10B981]" },
                    { day: "S", val: "5.7GB", height: "h-10", color: "bg-[#10B981]" },
                  ].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                      <span className="text-[10px] font-bold text-[#8C909B]">{bar.val}</span>
                      <div className="w-full max-w-[20px] rounded-t-md bg-[#EFF4F8] flex items-end justify-center h-full">
                        <div className={`w-full rounded-t-md ${bar.color} ${bar.height}`} />
                      </div>
                      <span className="text-[11px] font-bold text-[#0F152A]">{bar.day}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Notes */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8C909B]">Avg daily usage: 8.9GB</span>
                  <span className="font-bold text-[#10B981]">
                    At this pace: 7.5 days until top-up
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (Span 1) */}
            <div className="space-y-6">
              {/* Your Data Plan Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-[#0F152A]">Your Data Plan</h3>

                {/* Active Plan Banner */}
                <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#10B981]">
                    ACTIVE PLAN
                  </span>
                  <h4 className="text-lg font-extrabold text-[#0F152A] mt-0.5">
                    120GB Fixed Plan
                  </h4>
                  <p className="text-xs text-[#8C909B]">MTN Nigeria · Fixed allocation</p>
                </div>

                {/* Plan Stats Table */}
                <div className="divide-y divide-[#E2ECF6] text-xs">
                  <div className="flex justify-between py-2.5">
                    <span className="text-[#8C909B]">Total data</span>
                    <span className="font-bold text-[#0F152A]">120GB</span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-[#8C909B]">Used</span>
                    <span
                      className={`font-bold ${
                        simState === "low_data" || simState === "exhausted"
                          ? "text-[#EF4444]"
                          : "text-[#0F152A]"
                      }`}
                    >
                      {simState === "active"
                        ? "53GB"
                        : simState === "low_data"
                        ? "112GB"
                        : simState === "exhausted"
                        ? "120GB"
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-[#8C909B]">Remaining</span>
                    <span
                      className={`font-bold ${
                        simState === "low_data" || simState === "exhausted"
                          ? "text-[#EF4444]"
                          : "text-[#0F152A]"
                      }`}
                    >
                      {simState === "active"
                        ? "67GB"
                        : simState === "low_data"
                        ? "8GB"
                        : simState === "exhausted"
                        ? "0GB"
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-[#8C909B]">Validity</span>
                    <span className="font-bold text-[#0F152A]">Rolling (no expiry)</span>
                  </div>
                </div>
              </div>

              {/* Available Packages Grid */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C909B]">
                  AVAILABLE PACKAGES
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { size: "5GB", price: "₦2,000" },
                    { size: "10GB", price: "₦3,500" },
                    { size: "20GB", price: "₦6,000" },
                    { size: "50GB", price: "₦13,000" },
                    { size: "100GB", price: "₦24,000" },
                    { size: "Unlimited", price: "₦35,000" },
                  ].map((pkg) => (
                    <div
                      key={pkg.size}
                      onClick={() => handleOpenTopUpWithPackage(pkg.size)}
                      className="cursor-pointer rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 transition hover:border-[#2563EB] hover:bg-white"
                    >
                      <h4 className="text-sm font-extrabold text-[#0F152A]">{pkg.size}</h4>
                      <p className="text-xs text-[#8C909B] font-semibold">{pkg.price}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setTopUpModalOpen(true)}
                    className="font-bold text-xs text-[#2563EB] hover:underline inline-flex items-center gap-1"
                  >
                    Top Up to Add More Data <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Buy Data View (When Tab 2 is active) */}
      {activeTab === "buy_data" && (
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-[#0F152A]">Buy Data Packages</h2>
          <p className="text-xs text-[#8C909B]">
            Select a ZeroLimit high-speed data package to top up your linked MSISDN number instantly.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-2">
            {[
              { size: "5GB", price: "₦2,000", desc: "Standard Plan · Rolling Validity" },
              { size: "10GB", price: "₦3,500", desc: "Popular Plan · Rolling Validity" },
              { size: "20GB", price: "₦6,000", desc: "Heavy User · Rolling Validity" },
              { size: "50GB", price: "₦13,000", desc: "Best Value · Fixed Allocation" },
              { size: "100GB", price: "₦24,000", desc: "Ultra Plan · Fixed Allocation" },
              { size: "Unlimited", price: "₦35,000", desc: "Uncapped Monthly Data" },
            ].map((pkg) => (
              <div
                key={pkg.size}
                className="rounded-2xl border border-[#E2ECF6] p-5 space-y-3 bg-[#F8FAFC] hover:border-[#2563EB] transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-extrabold text-[#0F152A]">{pkg.size}</h3>
                  <span className="text-base font-extrabold text-[#2563EB]">{pkg.price}</span>
                </div>
                <p className="text-xs text-[#8C909B]">{pkg.desc}</p>
                <button
                  type="button"
                  onClick={() => handleOpenTopUpWithPackage(pkg.size)}
                  className="w-full rounded-xl bg-[#2563EB] py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
                >
                  Buy Package
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History View (When Tab 3 is active) */}
      {activeTab === "history" && (
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-[#0F152A]">API & Top Up History</h2>
          <p className="text-xs text-[#8C909B]">
            Recent data sync events and wallet top-up transactions for linked MSISDN 0812 345 6789.
          </p>

          <div className="divide-y divide-[#E2ECF6] text-xs">
            {[
              { type: "Top Up", pkg: "20GB Data Top Up", amount: "₦6,000", date: "Today, 10:45 AM", status: "Success" },
              { type: "API Sync", pkg: "Data Balance Synced (67GB)", amount: "—", date: "Today, 10:42 AM", status: "Synced" },
              { type: "Top Up", pkg: "50GB Package", amount: "₦13,000", date: "10 Jun 2026", status: "Success" },
              { type: "Top Up", pkg: "100GB Package", amount: "₦24,000", date: "15 May 2026", status: "Success" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-3">
                <div>
                  <h4 className="font-bold text-[#0F152A]">{item.pkg}</h4>
                  <p className="text-[11px] text-[#8C909B]">{item.date}</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-[#0F152A]">{item.amount}</span>
                  <p className="text-[10px] font-bold text-[#10B981]">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Linked Modals */}
      <TopUpSimModal
        open={topUpModalOpen}
        onOpenChange={setTopUpModalOpen}
        linkedNumber="0812 345 6789"
        initialPackage={selectedPackage}
        onViewMySimClick={() => setZeroLimitDetailsOpen(true)}
      />
      <GetAnotherSimModal
        open={getAnotherSimModalOpen}
        onOpenChange={setGetAnotherSimModalOpen}
      />
      <ZeroLimitDetailsModal
        open={zeroLimitDetailsOpen}
        onOpenChange={setZeroLimitDetailsOpen}
        onTopUpNowClick={() => setTopUpModalOpen(true)}
        onReportIssueClick={() => setReportIssueOpen(true)}
        msisdn="0812 345 6789"
      />
      <ReportIssueModal
        open={reportIssueOpen}
        onOpenChange={setReportIssueOpen}
        simNumber="0812 345 6789"
      />
    </div>
  );
}
