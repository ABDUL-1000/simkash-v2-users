import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, HelpCircle, RefreshCw } from "lucide-react";
import { TransactionReceiptModal } from "../Modals/TransactionReceiptModal";

export default function TransactionDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const reference = id || "TXN-2026-008466";

  // State to preview both Completed and Failed variants
  const [isFailedState, setIsFailedState] = useState(reference.includes("471"));
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  const isFailed = isFailedState;

  return (
    <div className="space-y-6">
      {/* Top Navigation & Back */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/transactions")}
            className="rounded-xl border border-[#E2ECF6] bg-white p-2 text-[#0F152A] hover:bg-slate-50"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#0F152A]">
                {isFailed ? "₦3,000" : "-₦184,999"}
              </h1>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                  isFailed
                    ? "bg-[#FFF7F8] text-[#EF4444]"
                    : "bg-[#EBFFF8] text-[#10B981]"
                }`}
              >
                {isFailed ? "Failed" : "Completed"}
              </span>
              <span className="rounded-full bg-[#F8FAFC] px-3 py-0.5 text-xs font-bold text-[#8C909B]">
                {isFailed ? "Electricity" : "Marketplace"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#8C909B]">
              {isFailed ? "Electricity Payment · Failed" : "Marketplace Order · Completed"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Variant Switcher for Preview */}
          <button
            type="button"
            onClick={() => setIsFailedState(!isFailedState)}
            className="rounded-xl border border-[#D0DFF0] bg-[#EFF4F8] px-3 py-1.5 text-xs font-bold text-[#2563EB]"
          >
            Preview: {isFailed ? "Failed State" : "Completed State"} (Click to Switch)
          </button>

          {!isFailed && (
            <button
              type="button"
              onClick={() => setReceiptModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50"
            >
              <Download className="size-4" /> Download Receipt
            </button>
          )}
          <button
            type="button"
            onClick={() => alert("Issue reported to support")}
            className="rounded-xl border border-[#EF4444] px-4 py-2 text-xs font-bold text-[#EF4444] hover:bg-red-50"
          >
            Report Issue
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column — Transaction Details & Info (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Transaction Details Table Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0F152A]">Transaction Details</h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-3 first:pt-0">
                <span className="text-[#8C909B]">Reference</span>
                <span className="font-mono font-bold text-[#0F152A]">
                  {isFailed ? "TXN-2026-008471" : reference}
                </span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Type</span>
                <span className="font-bold text-[#0F152A]">
                  {isFailed ? "Electricity Payment" : "Marketplace Purchase"}
                </span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Status</span>
                <span
                  className={`font-bold ${
                    isFailed ? "text-[#EF4444]" : "text-[#10B981]"
                  }`}
                >
                  {isFailed ? "Failed" : "Completed"}
                </span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Date</span>
                <span className="font-bold text-[#0F152A]">
                  {isFailed ? "Today · 9:15 AM" : "22 Jun 2026"}
                </span>
              </div>

              {!isFailed && (
                <div className="flex justify-between py-3">
                  <span className="text-[#8C909B]">Time</span>
                  <span className="font-bold text-[#0F152A]">11:45:22 AM</span>
                </div>
              )}

              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Amount</span>
                <span
                  className={`font-extrabold ${
                    isFailed ? "text-[#8C909B]" : "text-[#0F152A]"
                  }`}
                >
                  {isFailed ? "₦3,000 (not charged)" : "-₦184,999"}
                </span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-[#8C909B]">Payment</span>
                <span className="font-bold text-[#0F152A]">
                  {isFailed ? "Unchanged (not debited)" : "Simkash Wallet"}
                </span>
              </div>

              {!isFailed && (
                <>
                  <div className="flex justify-between py-3">
                    <span className="text-[#8C909B]">Wallet Before</span>
                    <span className="font-bold text-[#0F152A]">₦234,999</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-[#8C909B]">This Debit</span>
                    <span className="font-extrabold text-[#EF4444]">-₦184,999</span>
                  </div>
                  <div className="flex justify-between py-3 last:pb-0">
                    <span className="text-[#8C909B]">Wallet After</span>
                    <span className="font-bold text-[#0F152A]">₦50,000</span>
                  </div>
                </>
              )}
            </div>

            {/* Failure Reason Banner if Failed */}
            {isFailed && (
              <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 text-xs text-[#EF4444] space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px]">
                  FAILURE REASON
                </span>
                <p className="font-bold">EKEDC server temporarily unavailable</p>
              </div>
            )}
          </div>

          {/* Order Information Card (if Marketplace purchase) */}
          {!isFailed && (
            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0F152A]">Order Information</h3>
                <button
                  type="button"
                  onClick={() => navigate("/marketplace/orders/ORD-2026-00847")}
                  className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  View Order Details →
                </button>
              </div>

              <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[#0F152A]">ORD-2026-00847</span>
                  <span className="rounded-full bg-[#EFF4F8] px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
                    Dispatched
                  </span>
                </div>
                <div className="flex justify-between items-center font-bold text-[#0F152A]">
                  <span>Hikvision DS-2CD2143G2</span>
                  <span>₦184,999</span>
                </div>
                <p className="text-[11px] text-[#8C909B]">SIM included, Installation ₦40,000</p>
                <p className="text-[10px] text-[#8C909B] pt-1">Delivery: Est. 28–30 Jun 2026</p>
              </div>
            </div>
          )}

          {/* Printable Receipt Preview Box */}
          {!isFailed && (
            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0F152A]">Receipt Preview</h3>

              <div className="rounded-2xl border-2 border-dashed border-[#E2ECF6] bg-[#F8FAFC] p-6 text-center space-y-3 text-xs">
                <div className="font-extrabold uppercase tracking-wider text-[#0F152A]">
                  SIMKASH RECEIPT
                </div>
                <p className="font-mono text-[#8C909B] text-[11px]">TXN-2026-008466</p>
                <p className="text-[#8C909B] text-[11px]">22 Jun 2026 · 11:45 AM</p>
                <p className="text-[11px] text-[#8C909B]">Marketplace Order</p>
                <h2 className="text-2xl font-extrabold text-[#0F152A]">-₦184,999</h2>
                <span className="inline-block rounded-full bg-[#EBFFF8] px-3 py-0.5 text-[10px] font-bold text-[#10B981]">
                  Status: Completed
                </span>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setReceiptModalOpen(true)}
                    className="text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    View Official Receipt Modal →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column — Sidebar Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-[#0F152A]">Quick Actions</h4>

            {isFailed ? (
              <>
                <button
                  type="button"
                  onClick={() => navigate("/bill-payments")}
                  className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="size-4" /> Try Again
                </button>
                <button
                  type="button"
                  onClick={() => alert("Issue reported")}
                  className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
                >
                  Report Issue
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/support")}
                  className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
                >
                  Contact Support
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setReceiptModalOpen(true)}
                  className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700"
                >
                  Download Receipt
                </button>
                <button
                  type="button"
                  onClick={() => alert("Issue reported")}
                  className="w-full rounded-xl border border-[#EF4444] text-[#EF4444] py-2.5 text-xs font-bold hover:bg-red-50"
                >
                  Report Issue
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/marketplace/orders/ORD-2026-00847")}
                  className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
                >
                  Track Order
                </button>
              </>
            )}
          </div>

          {/* Same Order Card (if Marketplace) */}
          {!isFailed && (
            <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
              <h4 className="font-bold text-[#0F152A]">Same Order</h4>

              <div className="divide-y divide-[#E2ECF6] text-[11px]">
                <div className="flex items-center justify-between py-2 first:pt-0">
                  <div>
                    <span className="font-semibold text-[#0F152A] block">Installation fee</span>
                    <span className="font-extrabold text-[#0F152A]">₦40,000</span>
                  </div>
                  <button type="button" className="font-bold text-[#2563EB] hover:underline">
                    View
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="font-semibold text-[#0F152A] block">CCTV SIM month 1</span>
                    <span className="font-extrabold text-[#0F152A]">₦5,000</span>
                  </div>
                  <button type="button" className="font-bold text-[#2563EB] hover:underline">
                    View
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-[#8C909B] pt-1">All linked to ORD-2026-00847</p>
            </div>
          )}

          {/* Need Help Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-2 text-xs">
            <h4 className="font-bold text-[#0F152A] flex items-center gap-1.5">
              <HelpCircle className="size-4 text-[#2563EB]" /> Need Help?
            </h4>
            <p className="text-[11px] text-[#66738C]">
              {isFailed ? "Transaction failed? We can help." : "Something wrong with this transaction?"}
            </p>
            <div className="space-y-1 pt-1">
              <button
                type="button"
                onClick={() => alert("Issue reported")}
                className="text-xs font-bold text-[#EF4444] hover:underline block"
              >
                Report Issue
              </button>
              <button
                type="button"
                onClick={() => navigate("/support")}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                Contact Support <ExternalLink className="size-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Linked Official Receipt Modal */}
      <TransactionReceiptModal
        open={receiptModalOpen}
        onOpenChange={setReceiptModalOpen}
        reference={isFailed ? "TXN-2026-008471" : reference}
        amount={isFailed ? -3000 : -184999}
        type={isFailed ? "Electricity Payment" : "Marketplace Purchase"}
        date={isFailed ? "Today · 9:15 AM" : "22 Jun 2026 · 11:45 AM"}
        accountName="Yusuf Adam Baba"
        service={isFailed ? "Electricity (EKEDC)" : "Marketplace Order"}
        description={isFailed ? "EKEDC Prepaid Meter 00123456" : "Hikvision DS-2CD2143G2"}
        paymentMethod={isFailed ? "Simkash Wallet" : "Simkash Wallet"}
        status={isFailed ? "FAILED" : "COMPLETED"}
      />
    </div>
  );
}
