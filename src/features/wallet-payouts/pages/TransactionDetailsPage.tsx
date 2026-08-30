import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Download, Flag, RotateCcw, ArrowRight } from "lucide-react";
import { appPaths } from "@/app/router/paths";

import { FlagTransactionModal } from "../Modals/FlagTransactionModal";
import { ReverseTransactionModal } from "../Modals/ReverseTransactionModal";
import { ExportTransactionHistoryModal } from "../Modals/ExportTransactionHistoryModal";

export default function TransactionDetailsPage() {
  const { id } = useParams();
    console.log(id)

  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.transactionHistory)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Transaction History</span>
        </button>
      </div>

      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669]">
            <ArrowUpRight className="size-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A]">
                +₦1,000 Commission Credit
              </h1>
              <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-xs font-bold text-[#059669]">
                Completed
              </span>
              <span className="rounded-md bg-[#EFF6FF] border border-[#BFDBFE] px-2 py-0.5 text-xs font-bold text-[#2563EB]">
                Commission
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              SIM Activation · 07022222222 · MTN
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveModal("export_modal")}
            className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-4 py-2 text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            <Download className="size-4" />
            <span>Download Receipt</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("flag_txn")}
            className="flex items-center gap-1.5 rounded-xl border border-[#FEF3C7] bg-[#FFFBEB] px-4 py-2 text-xs font-bold text-[#D97706] hover:bg-[#FEF3C7]"
          >
            <Flag className="size-4" />
            <span>Flag Transaction</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("reverse_txn")}
            className="flex items-center gap-1.5 rounded-xl border border-[#FECACA] bg-[#FFF1F2] px-4 py-2 text-xs font-bold text-[#DC2626] hover:bg-[#FEE2E2]"
          >
            <RotateCcw className="size-4" />
            <span>Reverse Transaction</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1 */}
        <div className="space-y-6 min-w-0">
          {/* Card 1: Transaction Details */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Transaction Details</h3>

            <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-5 text-center space-y-1">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#10B981] text-white font-bold mx-auto">
                <ArrowUpRight className="size-5" />
              </div>
              <strong className="text-2xl font-extrabold text-[#059669] block">+₦1,000</strong>
              <p className="text-[11px] text-[#64748B]">Commission Credit</p>
            </div>

            <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
              <div className="flex justify-between pt-1 text-[#64748B]">
                <span>Transaction Ref</span>
                <strong className="font-mono font-bold text-[#0F172A]">TXN-2026-008472</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Status</span>
                <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">Completed</span>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Type</span>
                <strong className="font-bold text-[#0F172A]">SIM Activation Commission</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Date</span>
                <strong className="font-bold text-[#0F172A]">24 Jun 2026</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Time</span>
                <strong className="font-bold text-[#0F172A]">03:47:22 PM</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Commission Rate</span>
                <strong className="font-bold text-[#0F172A]">₦1,000 per activation</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Platform Fee</span>
                <strong className="font-bold text-[#0F172A]">₦0 (paid in full)</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Net Amount</span>
                <strong className="font-extrabold text-[#059669]">₦1,000</strong>
              </div>
            </div>
          </div>

          {/* Card 2: SIM Details */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">SIM Details</h3>

            <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
              <div className="flex justify-between pt-1 text-[#64748B]">
                <span>SIM Number</span>
                <strong className="font-bold text-[#0F172A]">07022222222</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Network</span>
                <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">MTN</span>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>SIM Type</span>
                <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">POS SIM</span>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Activation Date</span>
                <strong className="font-bold text-[#0F172A]">24 Jun 2026</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Customer</span>
                <strong className="font-bold text-[#0F172A]">0812***4521 (masked)</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Serial / ICCID</span>
                <strong className="font-mono text-[11px] text-[#0F172A]">89234082104900234</strong>
              </div>
            </div>

            <button type="button" className="flex items-center gap-1 font-bold text-[#2563EB] text-xs hover:underline pt-1">
              <span>View in SIM Search</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6 min-w-0">
          {/* Card 3: Account Details */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Account Details</h3>

            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0F1F36] font-bold text-white text-xs">
                RS
              </div>
              <div>
                <strong className="font-bold text-[#0F172A] text-sm block">Rabiu Sani</strong>
                <span className="text-[11px] text-[#64748B]">Agency Partner · Lagos</span>
              </div>
            </div>

            <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
              <div className="flex justify-between pt-1 text-[#64748B]">
                <span>Phone</span>
                <strong className="font-bold text-[#0F172A]">08120600542</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Wallet Before</span>
                <strong className="font-bold text-[#0F172A]">₦123,500</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>This Credit</span>
                <strong className="font-extrabold text-[#059669]">+₦1,000</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Wallet After</span>
                <strong className="font-extrabold text-[#0F172A]">₦124,500</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>KYC Status</span>
                <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[10px] font-bold text-[#059669]">Verified</span>
              </div>
            </div>
          </div>

          {/* Card 4: Related to this SIM */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Related to this SIM · 07022222222</h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFC]">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 font-bold text-[#64748B] text-[10px]">Upload</span>
                  <span className="text-[11px] text-[#64748B]">01 Jun · ₦0</span>
                </div>
                <button type="button" className="font-bold text-[#2563EB] text-[11px] hover:underline">View →</button>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFC]">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 font-bold text-[#64748B] text-[10px]">Distribution</span>
                  <span className="text-[11px] text-[#64748B]">05 Jun · ₦0</span>
                </div>
                <button type="button" className="font-bold text-[#2563EB] text-[11px] hover:underline">View →</button>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFC]">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 font-bold text-[#64748B] text-[10px]">Assignment</span>
                  <span className="text-[11px] text-[#64748B]">10 Jun · ₦0</span>
                </div>
                <button type="button" className="font-bold text-[#2563EB] text-[11px] hover:underline">View →</button>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#2563EB] px-2 py-0.5 font-bold text-white text-[10px]">Activation</span>
                  <span className="text-[11px] font-bold text-[#059669]">24 Jun · +₦1,000</span>
                </div>
                <span className="font-bold text-[#2563EB] text-[11px]">← This transaction</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFC]">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 font-bold text-[#D97706] text-[10px]">Renewal</span>
                  <span className="text-[11px] text-[#64748B]">Pending · —</span>
                </div>
                <button type="button" className="font-bold text-[#2563EB] text-[11px] hover:underline">View →</button>
              </div>
            </div>
          </div>

          {/* Card 5: Transaction Audit */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Transaction Audit</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-[#10B981] mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-[#0F172A]">03:47:22 PM</p>
                  <p className="text-[#64748B]">Transaction initiated</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-[#10B981] mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-[#0F172A]">03:47:23 PM</p>
                  <p className="text-[#64748B]">Commission calculated — ₦1,000</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-[#10B981] mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-[#0F172A]">03:47:23 PM</p>
                  <p className="text-[#64748B]">Wallet credited ₦1,000</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-[#10B981] mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-[#0F172A]">03:47:24 PM</p>
                  <p className="text-[#64748B]">Agent notified (push + SMS)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6 min-w-0">
          {/* Card 6: Quick Actions */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Quick Actions</h3>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setActiveModal("export_modal")}
                className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white text-xs shadow-xs hover:bg-[#1D4ED8]"
              >
                Download Receipt
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("flag_txn")}
                className="w-full rounded-xl border border-[#FDE68A] bg-[#FFFBEB] py-2 font-bold text-[#D97706] text-xs hover:bg-[#FEF3C7]"
              >
                Flag for Review
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("reverse_txn")}
                className="w-full rounded-xl border border-[#FECACA] bg-[#FFF1F2] py-2 font-bold text-[#DC2626] text-xs hover:bg-[#FEE2E2]"
              >
                Reverse Transaction
              </button>
              <button
                type="button"
                onClick={() => navigate(appPaths.walletAgentDetails("1").path)}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2 font-bold text-[#0F172A] text-xs hover:bg-[#F8FAFC]"
              >
                View Agent Wallet
              </button>
            </div>
          </div>

          {/* Card 7: Receipt Preview */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Receipt Preview</h3>

            <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-2">
              <div>
                <p className="font-extrabold text-[#0F172A] text-sm">SIMKASH</p>
                <p className="text-[10px] uppercase tracking-wide text-[#64748B]">TRANSACTION RECEIPT</p>
              </div>

              <div className="space-y-1 divide-y divide-[#DBEAFE] text-[11px] pt-1">
                <div className="flex justify-between pt-1 text-[#64748B]">
                  <span>Ref</span>
                  <strong className="font-mono font-bold text-[#0F172A]">TXN-2026-008472</strong>
                </div>
                <div className="flex justify-between pt-1 text-[#64748B]">
                  <span>Date</span>
                  <strong className="font-bold text-[#0F172A]">24 Jun 2026</strong>
                </div>
                <div className="flex justify-between pt-1 text-[#64748B]">
                  <span>Type</span>
                  <strong className="font-bold text-[#0F172A]">Commission</strong>
                </div>
                <div className="flex justify-between pt-1 text-[#64748B]">
                  <span>Amount</span>
                  <strong className="font-extrabold text-[#059669]">+₦1,000</strong>
                </div>
                <div className="flex justify-between pt-1 text-[#64748B]">
                  <span>Agent</span>
                  <strong className="font-bold text-[#0F172A]">Rabiu Sani</strong>
                </div>
                <div className="flex justify-between pt-1 text-[#64748B]">
                  <span>Status</span>
                  <strong className="font-bold text-[#059669]">Completed</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal("export_modal")}
                className="text-xs font-bold text-[#2563EB] hover:underline block pt-1"
              >
                Download PDF →
              </button>
            </div>
          </div>

          {/* Card 8: Similar Transactions */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Similar Transactions</h3>
              <p className="text-[11px] text-[#94A3B8]">Other commissions by Rabiu Sani</p>
            </div>

            <div className="space-y-2.5 divide-y divide-[#F1F5F9]">
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="font-bold text-[#0F172A]">22 Jun 2026</p>
                  <p className="text-[11px] text-[#64748B]">SIM · 08145678901</p>
                </div>
                <div className="flex items-center gap-2">
                  <strong className="font-extrabold text-[#059669]">+₦1,000</strong>
                  <button type="button" className="text-[11px] font-bold text-[#2563EB] hover:underline">View →</button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <div>
                  <p className="font-bold text-[#0F172A]">19 Jun 2026</p>
                  <p className="text-[11px] text-[#64748B]">SIM · 07034567890</p>
                </div>
                <div className="flex items-center gap-2">
                  <strong className="font-extrabold text-[#059669]">+₦1,000</strong>
                  <button type="button" className="text-[11px] font-bold text-[#2563EB] hover:underline">View →</button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5">
                <div>
                  <p className="font-bold text-[#0F172A]">15 Jun 2026</p>
                  <p className="text-[11px] text-[#64748B]">SIM · 09012345678</p>
                </div>
                <div className="flex items-center gap-2">
                  <strong className="font-extrabold text-[#059669]">+₦1,000</strong>
                  <button type="button" className="text-[11px] font-bold text-[#2563EB] hover:underline">View →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <FlagTransactionModal
        open={activeModal === "flag_txn"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        txnRef="TXN-2026-008472"
        amount="+₦1,000"
        agentName="Rabiu Sani"
      />

      <ReverseTransactionModal
        open={activeModal === "reverse_txn"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        txnRef="TXN-2026-008472"
        amount="₦1,000"
        agentName="Rabiu Sani"
      />

      <ExportTransactionHistoryModal
        open={activeModal === "export_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </div>
  );
}
