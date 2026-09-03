import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Download, ExternalLink, Phone, Send } from "lucide-react";
import { SendFollowUpModal } from "../Modals/SendFollowUpModal";

export default function ReferralDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State to switch between Closed deal and In Progress deal preview
  const [isInProgressState, setIsInProgressState] = useState(
    id?.includes("004") || id?.includes("kano") || false
  );

  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);

  const isClosed = !isInProgressState;

  return (
    <div className="space-y-6">
      {/* Top Status Bar Summary Header */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
        <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#E2ECF6]">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">STATUS</span>
            <div className="flex items-center gap-1.5 pt-0.5 font-bold">
              <span className={`size-2 rounded-full ${isClosed ? "bg-[#10B981]" : "bg-[#2563EB]"}`} />
              <span className={isClosed ? "text-[#10B981]" : "text-[#2563EB]"}>
                {isClosed ? "Closed" : "In Progress"}
              </span>
            </div>
          </div>

          <div className="space-y-0.5 sm:pl-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">REFERRED</span>
            <p className="font-extrabold text-[#0F152A] pt-0.5">
              {isClosed ? "1 Jan 2026" : "20 Mar 2026"}
            </p>
          </div>

          <div className="space-y-0.5 sm:pl-4 pt-2 sm:pt-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">CLOSED</span>
            <p className="font-extrabold text-[#0F152A] pt-0.5">
              {isClosed ? "14 Jan 2026" : "Pending"}
            </p>
          </div>

          <div className="space-y-0.5 sm:pl-4 pt-2 sm:pt-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">COMMISSION</span>
            <p className={`font-extrabold pt-0.5 ${isClosed ? "text-[#10B981]" : "text-[#F59E0B]"}`}>
              {isClosed ? "₦50,000 · Paid" : "Pending"}
            </p>
          </div>

          <div className="space-y-0.5 sm:pl-4 pt-2 sm:pt-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              {isClosed ? "DAYS TO CLOSE" : "DAYS SINCE REFERRAL"}
            </span>
            <p className="font-extrabold text-[#0F152A] pt-0.5">
              {isClosed ? "13 days" : "96 days"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Title Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/referrals")}
            className="rounded-xl border border-[#E2ECF6] bg-white p-2 text-[#0F152A] hover:bg-slate-50"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-[#0F152A]">
                {isClosed ? "Femi Enterprises Ltd" : "Kano Distributors Ltd"}
              </h1>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                  isClosed ? "bg-[#EBFFF8] text-[#10B981]" : "bg-[#EFF4F8] text-[#2563EB]"
                }`}
              >
                {isClosed ? "Closed" : "In Progress"}
              </span>
              <span className="rounded-full bg-[#F8FAFC] px-3 py-0.5 text-xs font-bold text-[#8C909B]">
                {isClosed ? "Corporate" : "Distribution"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#8C909B]">
              {isClosed
                ? "Referred 1 Jan 2026 · Closed 14 Jan"
                : "Referred 20 Mar 2026 · In Progress"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Variant Switcher for Preview */}
          <button
            type="button"
            onClick={() => setIsInProgressState(!isInProgressState)}
            className="rounded-xl border border-[#D0DFF0] bg-[#EFF4F8] px-3 py-1.5 text-xs font-bold text-[#2563EB]"
          >
            Preview: {isClosed ? "Closed Deal" : "In Progress Deal"} (Click to Switch)
          </button>

          {isClosed ? (
            <button
              type="button"
              onClick={() => alert("Commission receipt downloaded")}
              className="flex items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50"
            >
              <Download className="size-4" /> Download Commission Receipt
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setFollowUpModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50"
            >
              <Send className="size-4" /> Send Reminder
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column — Info, Journey, Activity (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Business Information Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0F152A]">Business Information</h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-2.5 first:pt-0">
                <span className="text-[#8C909B]">Business Name</span>
                <span className="font-bold text-[#0F152A]">
                  {isClosed ? "Femi Enterprises Ltd" : "Kano Distributors Ltd"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Business Type</span>
                <span className="font-bold text-[#0F152A]">
                  {isClosed ? "Corporate" : "Distribution"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Contact Person</span>
                <span className="font-bold text-[#0F152A]">
                  {isClosed ? "Femi Adeyemi" : "Musa Abdullahi"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Phone</span>
                <span className="font-bold text-[#0F152A]">
                  {isClosed ? "08120600542" : "07055093537"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Email</span>
                <span className="font-bold text-[#0F152A]">
                  {isClosed ? "femi@femient.com" : "musa@kanodist.com"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">State</span>
                <span className="font-bold text-[#0F152A]">
                  {isClosed ? "Lagos" : "Kano"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Referred By</span>
                <span className="font-bold text-[#0F152A]">Yusuf Adam Baba (you)</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Referred On</span>
                <span className="font-bold text-[#0F152A]">
                  {isClosed ? "1 Jan 2026" : "20 Mar 2026"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Signed Up</span>
                <span className="font-bold text-[#0F152A]">
                  {isClosed ? "3 Jan 2026" : "22 Mar 2026"}
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Approved</span>
                <span className="font-bold text-[#0F152A]">
                  {isClosed ? "14 Jan 2026" : "Pending"}
                </span>
              </div>
              <div className="flex justify-between py-2.5 last:pb-0">
                <span className="text-[#8C909B]">Status</span>
                <span
                  className={`font-bold ${
                    isClosed ? "text-[#10B981]" : "text-[#2563EB]"
                  }`}
                >
                  {isClosed ? "Active" : "In Review"}
                </span>
              </div>
            </div>
          </div>

          {/* Journey Step Timeline Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#0F152A]">Journey</h3>

            <div className="space-y-4 text-xs">
              {isClosed ? (
                <>
                  <div className="flex gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                      <Check className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F152A]">You referred Femi Enterprises</h4>
                      <p className="text-[11px] text-[#8C909B]">1 Jan 2026 · via referral link</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                      <Check className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F152A]">Business registered on Simkash</h4>
                      <p className="text-[11px] text-[#8C909B]">3 Jan 2026</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                      <Check className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F152A]">Partner application submitted</h4>
                      <p className="text-[11px] text-[#8C909B]">5 Jan 2026</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                      <Check className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F152A]">Application approved by Admin</h4>
                      <p className="text-[11px] text-[#8C909B]">14 Jan 2026</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                      <Check className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F152A]">₦50,000 commission paid to you</h4>
                      <p className="text-[11px] text-[#8C909B]">14 Jan 2026 · Credited to wallet</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                      <Check className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F152A]">You referred Kano Distributors</h4>
                      <p className="text-[11px] text-[#8C909B]">20 Mar 2026 · via referral link</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                      <Check className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F152A]">Business registered on Simkash</h4>
                      <p className="text-[11px] text-[#8C909B]">22 Mar 2026</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#10B981] text-white">
                      <Check className="size-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F152A]">Partner application submitted</h4>
                      <p className="text-[11px] text-[#8C909B]">23 Mar 2026</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#2563EB] text-white font-bold text-[10px]">
                      ⏳
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2563EB]">Under Review</h4>
                      <p className="text-[11px] text-[#8C909B]">Application being reviewed by Simkash admin</p>
                    </div>
                  </div>

                  <div className="flex gap-3 opacity-50">
                    <div className="size-6 rounded-full border-2 border-[#E2ECF6] bg-white" />
                    <div>
                      <h4 className="font-bold text-[#8C909B]">Approved</h4>
                    </div>
                  </div>

                  <div className="flex gap-3 opacity-50">
                    <div className="size-6 rounded-full border-2 border-[#E2ECF6] bg-white" />
                    <div>
                      <h4 className="font-bold text-[#8C909B]">Commission Paid</h4>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Their Activity Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-[#0F152A]">Their Activity</h3>
              <p className="text-xs text-[#8C909B]">
                {isClosed
                  ? "Since becoming a partner"
                  : "Not yet active — awaiting approval"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#F8FAFC] p-4 space-y-1">
                <h4 className="text-2xl font-extrabold text-[#0F152A]">
                  {isClosed ? "124" : "0"}
                </h4>
                <p className="text-xs text-[#8C909B]">SIM Activations</p>
              </div>

              <div className="rounded-2xl bg-[#F8FAFC] p-4 space-y-1">
                <h4 className="text-2xl font-extrabold text-[#0F152A]">
                  {isClosed ? "6" : "0"}
                </h4>
                <p className="text-xs text-[#8C909B]">Months Active</p>
              </div>

              <div className="rounded-2xl bg-[#F8FAFC] p-4 space-y-1">
                <h4 className="text-xl font-extrabold text-[#0F152A]">
                  {isClosed ? "Corporate Agent" : "Pending"}
                </h4>
                <p className="text-xs text-[#8C909B]">Role</p>
              </div>
            </div>

            {!isClosed && (
              <p className="text-[10px] text-[#8C909B]">Activity will appear once approved</p>
            )}
            {isClosed && (
              <p className="text-[10px] text-[#8C909B]">This is shared to show your referral is active</p>
            )}
          </div>
        </div>

        {/* Right Column — Commission Box & Contact Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Commission Card */}
          {isClosed ? (
            <div className="rounded-2xl border border-[#9DF8DA] bg-[#EBFFF8] p-6 shadow-xs space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
                COMMISSION PAID
              </span>
              <h2 className="text-3xl font-extrabold text-[#10B981]">₦50,000</h2>
              <p className="text-[#8C909B] font-medium">Credited 14 Jan 2026</p>

              <div className="divide-y divide-[#10B981]/20 pt-2 text-[11px]">
                <div className="flex justify-between py-2">
                  <span className="text-[#8C909B]">Transaction ref</span>
                  <span className="font-mono font-bold text-[#0F152A]">TXN-2026-000124</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#8C909B]">Paid to</span>
                  <span className="font-bold text-[#0F152A]">Simkash Wallet</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#8C909B]">Status</span>
                  <span className="font-bold text-[#10B981]">Completed</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-6 shadow-xs space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9990D]">
                PENDING COMMISSION
              </span>
              <h2 className="text-3xl font-extrabold text-[#D9990D]">₦50,000</h2>
              <p className="text-[#8C909B] font-medium">Awaiting deal closure</p>

              <button
                type="button"
                onClick={() => alert("Simkash admins review applications within 3-5 business days.")}
                className="text-xs font-bold text-[#2563EB] hover:underline block pt-1"
              >
                What's taking long?
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            {isClosed ? (
              <>
                <button
                  type="button"
                  onClick={() => alert("Receipt Downloaded")}
                  className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700"
                >
                  Download Receipt
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/wallet")}
                  className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
                >
                  View in Wallet
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setFollowUpModalOpen(true)}
                  className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700"
                >
                  Follow Up
                </button>
                <button
                  type="button"
                  onClick={() => alert("Viewing partner details")}
                  className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
                >
                  View Details
                </button>
              </>
            )}
          </div>

          {/* Contact Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-[#0F152A]">
              {isClosed ? "Femi Adeyemi" : "Musa Abdullahi"}
            </h4>
            <p className="text-[#8C909B] font-mono">
              {isClosed ? "08120600542" : "07055093537"}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={`tel:${isClosed ? "08120600542" : "07055093537"}`}
                className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                <Phone className="size-3.5" /> Call
              </a>
              <a
                href={`https://wa.me/234${isClosed ? "8120600542" : "7055093537"}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-1"
              >
                <ExternalLink className="size-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Linked Follow Up Modal */}
      <SendFollowUpModal
        open={followUpModalOpen}
        onOpenChange={setFollowUpModalOpen}
        businessName={isClosed ? "Femi Enterprises Ltd" : "Kano Distributors Ltd"}
        contactPerson={isClosed ? "Femi Adeyemi" : "Musa Abdullahi"}
        phone={isClosed ? "08120600542" : "07055093537"}
        daysSinceReferral={isClosed ? 14 : 96}
        lastFollowUpDays={isClosed ? 10 : 45}
      />
    </div>
  );
}
