import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, CheckCircle2 } from "lucide-react";
import { appPaths } from "@/app/router/paths";

import { ApprovePayoutRequestModal } from "../Modals/ApprovePayoutRequestModal";
import { RejectPayoutRequestModal } from "../Modals/RejectPayoutRequestModal";
import { ForcePayoutModal } from "../Modals/ForcePayoutModal";
import { FreezeWalletModal } from "../Modals/FreezeWalletModal";
import { UnfreezeWalletModal } from "../Modals/UnfreezeWalletModal";
import { TransactionDetailModal } from "../Modals/TransactionDetailModal";

export default function WalletAgentDetailsPage() {
  const { id } = useParams();
    console.log(id)

  const navigate = useNavigate();
  const [activeTxTab, setActiveTxTab] = useState("all");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedTxn, setSelectedTxn] = useState<{ id: string; amount: string; title: string } | null>(null);

  const transactions = [
    { id: "1", title: "SIM Commission", sub: "SIM Activation - 07022222222", time: "2 min ago", amount: "+₦1,000", type: "credit", bg: "#ECFDF5", color: "#10B981" },
    { id: "2", title: "SIM Commission", sub: "5 SIM Activations (batch)", time: "1 hour ago", amount: "+₦8,500", type: "credit", bg: "#ECFDF5", color: "#10B981" },
    { id: "3", title: "Payout", sub: "Payout Processed", time: "14 Jun", amount: "-₦45,000", type: "debit", bg: "#FFF1F2", color: "#EF4444" },
    { id: "4", title: "Bonus", sub: "Monthly Bonus", time: "1 Jun", amount: "+₦10,000", type: "bonus", bg: "#F3E8FF", color: "#9333EA" },
    { id: "5", title: "SIM Commission", sub: "SIM Activation", time: "Yesterday", amount: "+₦1,000", type: "credit", bg: "#ECFDF5", color: "#10B981" },
    { id: "6", title: "Payout", sub: "Payout Processed", time: "28 May", amount: "-₦30,000", type: "debit", bg: "#FFF1F2", color: "#EF4444" },
    { id: "7", title: "SIM Commission", sub: "SIM Activation", time: "27 May", amount: "+₦1,000", type: "credit", bg: "#ECFDF5", color: "#10B981" },
    { id: "8", title: "SIM Commission", sub: "3 SIM Activations (batch)", time: "25 May", amount: "+₦3,000", type: "credit", bg: "#ECFDF5", color: "#10B981" },
    { id: "9", title: "Sub-partner", sub: "Sub-partner Activation", time: "24 May", amount: "+₦500", type: "sub", bg: "#EFF6FF", color: "#2563EB" },
    { id: "10", title: "Payout", sub: "Payout Processed", time: "20 May", amount: "-₦25,000", type: "debit", bg: "#FFF1F2", color: "#EF4444" },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.walletPayouts)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Wallet & Payouts</span>
        </button>
      </div>

      {/* Main Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] font-bold text-white text-base shadow-xs">
            RS
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-[#0F172A]">Rabiu Sani</h1>
              <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-xs font-bold text-[#059669]">
                Active
              </span>
              <span className="rounded-md bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 text-xs font-bold text-[#2563EB]">
                KYC Verified
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">08120600542 · Agency Partner · Lagos</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-3.5 py-2 text-xs font-bold text-[#D97706] hover:bg-[#FEF3C7]"
          >
            Place PND
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("force_payout")}
            className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] px-3.5 py-2 text-xs font-bold text-[#2563EB] hover:bg-[#DBEAFE]"
          >
            Force Payout
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("freeze_wallet")}
            className="rounded-xl border border-[#FECACA] bg-[#FFF1F2] px-3.5 py-2 text-xs font-bold text-[#DC2626] hover:bg-[#FEE2E2]"
          >
            Freeze Wallet
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("unfreeze_wallet")}
            className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-3.5 py-2 text-xs font-bold text-[#059669] hover:bg-[#D1FAE5]"
          >
            Unfreeze Wallet
          </button>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1: Left */}
        <div className="space-y-6 min-w-0">
          {/* Balance Card */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
            <div>
              <p className="text-[#64748B]">Current available balance</p>
              <strong className="text-3xl font-extrabold text-[#0F172A] block mt-1">
                ₦124,500
              </strong>
            </div>

            <div className="space-y-2 divide-y divide-[#F1F5F9] text-xs">
              <div className="flex justify-between pt-1 text-[#64748B]">
                <span>Available</span>
                <strong className="font-bold text-[#059669]">₦124,500</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Pending payout</span>
                <strong className="font-bold text-[#D97706]">₦45,000</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Frozen amount</span>
                <strong className="font-bold text-[#0F172A]">₦0</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Lifetime earned</span>
                <strong className="font-extrabold text-[#0F172A]">₦847,000</strong>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => setActiveModal("approve_payout")}
                className="w-full rounded-xl bg-[#10B981] py-2.5 font-bold text-white text-xs shadow-xs hover:bg-[#059669]"
              >
                Approve Pending Payout
              </button>
              <button
                type="button"
                className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2 font-bold text-[#0F172A] text-xs hover:bg-[#F8FAFC]"
              >
                View Payout History
              </button>
            </div>
          </div>

          {/* Earnings by Type Card */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Earnings by Type</h3>

            <div className="space-y-2 divide-y divide-[#F1F5F9] text-xs">
              <div className="flex justify-between pt-1 text-[#64748B]">
                <span>SIM Commission (×847)</span>
                <strong className="font-bold text-[#059669]">₦847,000</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Bonus earned</span>
                <span className="text-[#94A3B8]">₦0</span>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Referral commission</span>
                <span className="text-[#94A3B8]">₦0</span>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>EasyBuy commission</span>
                <span className="text-[#94A3B8]">₦0</span>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span className="font-bold text-[#0F172A]">Total</span>
                <strong className="font-extrabold text-[#0F172A]">₦847,000</strong>
              </div>
            </div>
          </div>

          {/* Monthly Earnings Bar Chart Visual */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Monthly Earnings</h3>
              <p className="text-[11px] text-[#94A3B8]">Commission earned per month — 2026</p>
            </div>

            <div className="flex items-end justify-between gap-1 pt-6 pb-2 h-28 border-b border-[#F1F5F9]">
              {[
                { m: "Jan", h: 30 },
                { m: "Feb", h: 40 },
                { m: "Mar", h: 65 },
                { m: "Apr", h: 80 },
                { m: "May", h: 90 },
                { m: "Jun", h: 100, peak: true },
                { m: "Jul", h: 45, current: true },
                { m: "Aug", h: 10 },
                { m: "Sep", h: 10 },
                { m: "Oct", h: 10 },
                { m: "Nov", h: 10 },
                { m: "Dec", h: 10 },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={`w-full max-w-[12px] rounded-t-sm ${
                      item.current
                        ? "bg-[#2563EB]"
                        : item.peak
                        ? "bg-[#0F1F36]"
                        : "bg-[#CBD5E1]"
                    }`}
                    style={{ height: `${item.h}%` }}
                  />
                  <span className="text-[9px] font-bold text-[#64748B]">{item.m}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-[11px] text-[#64748B]">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#2563EB]" />
                <span>Current month</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#0F1F36]" />
                <span>Peak month</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#CBD5E1]" />
                <span>Past months</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Center */}
        <div className="space-y-6 min-w-0">
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F172A]">All Transactions</h3>
              <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
                Export
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 rounded-xl bg-[#F8FAFC] p-1">
              {["All", "Credits", "Debits", "Pending"].map((t) => {
                const id = t.toLowerCase();
                const isActive = activeTxTab === id;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTxTab(id)}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                      isActive ? "bg-white text-[#0F172A] shadow-xs" : "text-[#64748B] hover:text-[#0F172A]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Transactions List */}
            <div className="space-y-3.5 divide-y divide-[#F1F5F9]">
              {transactions.map((tx, idx) => (
                <div
                  key={tx.id}
                  onClick={() => {
                    setSelectedTxn({ id: `TXN-2025-06${tx.id}204`, amount: tx.amount, title: tx.title });
                    setActiveModal("transaction_detail");
                  }}
                  className={`flex items-center justify-between cursor-pointer hover:bg-[#F8FAFC] p-1.5 rounded-xl transition-colors ${
                    idx > 0 ? "pt-3.5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-white font-bold"
                      style={{ backgroundColor: tx.color }}
                    >
                      {tx.type === "debit" ? (
                        <ArrowDownLeft className="size-4" />
                      ) : (
                        <ArrowUpRight className="size-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-[#0F172A]">{tx.title}</p>
                      <p className="text-[11px] text-[#64748B]">{tx.sub}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <strong className="font-extrabold text-xs block" style={{ color: tx.color }}>
                      {tx.amount}
                    </strong>
                    <span className="text-[10px] text-[#94A3B8]">{tx.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
                Load more transactions
              </button>
            </div>
          </div>
        </div>

        {/* Column 3: Right */}
        <div className="space-y-6 min-w-0">
          {/* Pending Payout Action Card */}
          <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-5 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-extrabold text-[#D97706]">₦45,000</span>
              <span className="rounded-md bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">
                PENDING
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-[#64748B]">
              <p>Requested: 22 Jun 2026 - 2 days ago</p>
              <p>Payout type: Commission</p>
              <p>Bank: Access Bank ****0476</p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => setActiveModal("approve_payout")}
                className="w-full rounded-xl bg-[#10B981] py-2.5 font-bold text-white text-xs shadow-xs hover:bg-[#059669]"
              >
                Approve — Release ₦45,000
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("reject_payout")}
                className="w-full rounded-xl border border-[#FECACA] bg-white py-2 font-bold text-[#DC2626] text-xs hover:bg-[#FFF1F2]"
              >
                Reject Payout
              </button>
            </div>
          </div>

          {/* Payout Details Card */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Payout Details</h3>

            <div className="space-y-2 divide-y divide-[#F1F5F9] text-xs">
              <div className="flex justify-between pt-1 text-[#64748B]">
                <span>Bank name</span>
                <strong className="font-bold text-[#0F172A]">Access Bank</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Account</span>
                <strong className="font-bold text-[#0F172A]">****0476</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Account name</span>
                <strong className="font-bold text-[#0F172A]">Rabiu Sani</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Verified</span>
                <span className="flex items-center gap-1 font-bold text-[#059669]">
                  <CheckCircle2 className="size-3.5" />
                  Verified
                </span>
              </div>
            </div>

            <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline block pt-1">
              Change Account
            </button>
          </div>

          {/* Past Payouts Card */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Past Payouts</h3>

            <div className="space-y-2.5 divide-y divide-[#F1F5F9]">
              {[
                { date: "30 May 2026", amount: "₦150,000" },
                { date: "28 Apr 2026", amount: "₦120,000" },
                { date: "31 Mar 2026", amount: "₦98,500" },
                { date: "28 Feb 2026", amount: "₦89,000" },
                { date: "31 Jan 2026", amount: "₦220,000" },
              ].map((p, idx) => (
                <div key={idx} className={`flex items-center justify-between ${idx > 0 ? "pt-2.5" : ""}`}>
                  <span className="text-[#64748B]">{p.date}</span>
                  <div className="flex items-center gap-2">
                    <strong className="font-extrabold text-[#0F172A]">{p.amount}</strong>
                    <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-1.5 py-0.5 text-[10px] font-bold text-[#059669]">
                      Paid
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center font-extrabold text-[#059669] border-t border-[#F1F5F9]">
              ₦677,500 total paid out
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ApprovePayoutRequestModal
        open={activeModal === "approve_payout"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName="Rabiu Sani"
        role="Agency Partner"
        amount="₦45,000"
        onRejectClick={() => setActiveModal("reject_payout")}
      />

      <RejectPayoutRequestModal
        open={activeModal === "reject_payout"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName="Rabiu Sani"
        amount="₦45,000"
      />

      <ForcePayoutModal
        open={activeModal === "force_payout"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName="Rabiu Sani"
        availableBalance="₦124,500"
      />

      <FreezeWalletModal
        open={activeModal === "freeze_wallet"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName="Rabiu Sani"
        balance="₦124,500"
      />

      <UnfreezeWalletModal
        open={activeModal === "unfreeze_wallet"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName="Rabiu Sani"
      />

      <TransactionDetailModal
        open={activeModal === "transaction_detail"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        txnId={selectedTxn?.id || "TXN-2025-061204"}
        amount={selectedTxn?.amount || "+₦1,000"}
        title={selectedTxn?.title || "SIM Commission"}
      />
    </div>
  );
}
