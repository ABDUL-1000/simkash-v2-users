import { useState } from "react";
import { Copy, RefreshCw, Zap } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TopUpHistoryModal } from "./TopUpHistoryModal";

interface ZeroLimitDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTopUpNowClick: () => void;
  onReportIssueClick: () => void;
  msisdn?: string;
  simId?: string;
}

export function ZeroLimitDetailsModal({
  open,
  onOpenChange,
  onTopUpNowClick,
  onReportIssueClick,
  msisdn = "0812 345 6789",
  simId = "89234XXXXXXXXX",
}: ZeroLimitDetailsModalProps) {
  const [copiedMsisdn, setCopiedMsisdn] = useState(false);
  const [copiedIccid, setCopiedIccid] = useState(false);
  const [topUpHistoryOpen, setTopUpHistoryOpen] = useState(false);

  const handleCopyMsisdn = () => {
    navigator.clipboard.writeText(msisdn);
    setCopiedMsisdn(true);
    setTimeout(() => setCopiedMsisdn(false), 2000);
  };

  const handleCopyIccid = () => {
    navigator.clipboard.writeText(simId);
    setCopiedIccid(true);
    setTimeout(() => setCopiedIccid(false), 2000);
  };

  const handleTopUp = () => {
    onOpenChange(false);
    onTopUpNowClick();
  };

  const handleReportIssue = () => {
    onOpenChange(false);
    onReportIssueClick();
  };

  return (
    <>
      <AppModal
        open={open}
        onOpenChange={onOpenChange}
        title="ZeroLimit SIM Details"
        description={`${msisdn} · MTN Nigeria`}
        size="lg"
      >
        <div className="space-y-5 pt-1">
          {/* Dark Header Card */}
          <div className="rounded-2xl bg-[#0D1B2E] p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFCC00] text-xs font-extrabold text-[#0F152A]">
                MTN
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">ZeroLimit SIM</h3>
                <p className="text-xs text-[#8C909B] font-mono">{msisdn}</p>
              </div>
            </div>
            <span className="rounded-full bg-[#10B981]/20 px-3 py-1 text-xs font-bold text-[#10B981]">
              ● MTN Nigeria · Active
            </span>
          </div>

          {/* Live Data Balance Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#8C909B] uppercase tracking-wider text-[10px]">
                LIVE DATA BALANCE
              </span>
              <span className="text-[#10B981] flex items-center gap-1">
                <RefreshCw className="size-3" /> Live from MTN API
              </span>
            </div>

            <div className="text-center py-1">
              <h2 className="text-4xl font-extrabold text-[#0F152A]">67GB</h2>
              <p className="text-xs font-medium text-[#8C909B]">Remaining of 120GB</p>

              <div className="mt-3">
                <div className="h-3 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
                  <div className="h-full w-[44%] rounded-full bg-[#2563EB]" />
                </div>
                <p className="text-[11px] font-semibold text-[#8C909B] mt-1">
                  44% used · 53GB consumed
                </p>
              </div>
            </div>
          </div>

          {/* 7-Day Usage Trend (GB) Chart */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              7-DAY USAGE TREND (GB)
            </label>
            <div className="flex items-end justify-between gap-2 h-20 pt-2 px-2">
              {[
                { day: "Mon", height: "h-8" },
                { day: "Tue", height: "h-14" },
                { day: "Wed", height: "h-10" },
                { day: "Thu", height: "h-6" },
                { day: "Fri", height: "h-16" },
                { day: "Sat", height: "h-12" },
                { day: "Sun", height: "h-8" },
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 gap-1">
                  <div className="w-full max-w-[14px] rounded-t-md bg-[#EFF4F8] flex items-end justify-center h-full">
                    <div className={`w-full rounded-t-md bg-[#2563EB] ${bar.height}`} />
                  </div>
                  <span className="text-[9px] font-bold text-[#8C909B]">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SIM Information Table */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              SIM INFORMATION
            </label>
            <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
              <div className="flex justify-between py-2 first:pt-0 last:pb-0 items-center">
                <span className="text-[#8C909B]">MSISDN</span>
                <div className="flex items-center gap-1.5 font-bold text-[#0F152A]">
                  <span>{msisdn}</span>
                  <button type="button" onClick={handleCopyMsisdn} className="text-[#8C909B] hover:text-[#2563EB]">
                    <Copy className="size-3.5" />
                  </button>
                  {copiedMsisdn && <span className="text-[9px] text-[#10B981]">Copied!</span>}
                </div>
              </div>

              <div className="flex justify-between py-2 first:pt-0 last:pb-0 items-center">
                <span className="text-[#8C909B]">SIM ID (ICCID)</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-[#0F152A]">
                  <span>{simId}</span>
                  <button type="button" onClick={handleCopyIccid} className="text-[#8C909B] hover:text-[#2563EB]">
                    <Copy className="size-3.5" />
                  </button>
                  {copiedIccid && <span className="text-[9px] text-[#10B981]">Copied!</span>}
                </div>
              </div>

              <div className="flex justify-between py-2 first:pt-0 last:pb-0 items-center">
                <span className="text-[#8C909B]">Provider</span>
                <span className="rounded-md bg-[#FFCC00] px-2 py-0.5 font-bold text-[#0F152A]">
                  MTN Nigeria
                </span>
              </div>

              <div className="flex justify-between py-2 first:pt-0 last:pb-0 items-center">
                <span className="text-[#8C909B]">Plan</span>
                <span className="font-bold text-[#0F152A]">120GB Fixed Plan</span>
              </div>

              <div className="flex justify-between py-2 first:pt-0 last:pb-0 items-center">
                <span className="text-[#8C909B]">Status</span>
                <span className="font-bold text-[#10B981]">● Active</span>
              </div>

              <div className="flex justify-between py-2 first:pt-0 last:pb-0 items-center">
                <span className="text-[#8C909B]">Linked</span>
                <span className="font-bold text-[#0F152A]">24 Jan 2026</span>
              </div>

              <div className="flex justify-between py-2 first:pt-0 last:pb-0 items-center">
                <span className="text-[#8C909B]">API Status</span>
                <span className="font-bold text-[#10B981]">
                  📡 MTN API: Connected · Syncing live
                </span>
              </div>
            </div>
          </div>

          {/* Top Up History List */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              TOP UP HISTORY
            </label>
            <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs">
              {[
                { date: "24 Jun", data: "20GB", cost: "₦6,000" },
                { date: "10 Jun", data: "50GB", cost: "₦13,000" },
                { date: "1 Jun", data: "20GB", cost: "₦6,000" },
                { date: "15 May", data: "100GB", cost: "₦24,000" },
                { date: "1 May", data: "20GB", cost: "₦6,000" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <span className="text-[#8C909B] font-medium">{item.date}</span>
                  <span className="font-bold text-[#0F152A]">{item.data}</span>
                  <span className="font-bold text-[#0F152A]">{item.cost}</span>
                  <span className="font-bold text-[#10B981]">Processed ✓</span>
                </div>
              ))}
            </div>
            <p className="text-right">
              <button
                type="button"
                onClick={() => setTopUpHistoryOpen(true)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                View full top-up history →
              </button>
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={handleTopUp}
              className="flex items-center gap-1.5 rounded-xl bg-[#F59E0B] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-amber-600"
            >
              <Zap className="size-4 fill-white" /> Top Up Now
            </button>
            <button
              type="button"
              onClick={handleReportIssue}
              className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Report SIM Issue
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </AppModal>

      {/* Linked Top-Up History Modal */}
      <TopUpHistoryModal
        open={topUpHistoryOpen}
        onOpenChange={setTopUpHistoryOpen}
        msisdn={msisdn}
      />
    </>
  );
}
