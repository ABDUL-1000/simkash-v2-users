import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Download,
  Building,
  User,

} from "lucide-react";
import { appPaths } from "@/app/router/paths";

export function ScActivationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const refId = id || "ACT-2026-008472";

  const handleCopy = () => {
    navigator.clipboard.writeText(refId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 ">
      {/* Top Header & Breadcrumb Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E2ECF6] pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex size-9 items-center justify-center rounded-xl border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs text-[#8C909B] font-medium">
              <span className="text-[#10B981] font-extrabold">• Completed</span>
              <span>·</span>
              <span>SIM: 07022222222</span>
              <span>·</span>
              <span>POS SIM</span>
              <span>·</span>
              <span>MTN</span>
              <span>·</span>
              <span>AP: Rabiu Sani</span>
            </div>
            <h1 className="text-xl font-black text-[#0F152A] pt-0.5">
              Activation Record: {refId}
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Downloading receipt...")}
          className="flex items-center gap-2 rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC] shadow-xs"
        >
          <Download className="size-4" />
          <span>Download Receipt</span>
        </button>
      </div>

      {/* Main SIM Header Card (Matching Image 3) */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[#FFFBEB] font-black text-amber-600 text-lg border border-[#FDE68A]">
            MTN
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-[#0F152A]">
                07022222222
              </h2>
              <span className="rounded-full bg-[#EBFFF8] px-3 py-1 text-xs font-extrabold text-[#10B981]">
                • POS SIM · MTN · Completed
              </span>
            </div>
            <p className="text-xs text-[#8C909B] font-medium mt-0.5">
              Activated by Rabiu Sani on 24 Jun 2026, 3:47:22 PM
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Downloading receipt...")}
          className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 shrink-0"
        >
          <Download className="size-4" />
          <span>Download Receipt</span>
        </button>
      </div>

      {/* Main Content 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Details & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activation Details Table Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-extrabold text-[#0F152A]">
              Activation Details
            </h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="py-3 flex justify-between items-center first:pt-0">
                <span className="text-[#8C909B] font-medium">Reference</span>
                <div className="flex items-center gap-2 font-bold text-[#0F152A]">
                  <span>{refId}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-[#8C909B] hover:text-[#0F152A]"
                  >
                    <Copy className="size-3.5" />
                  </button>
                  {copied && <span className="text-[10px] text-[#10B981]">Copied!</span>}
                </div>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">Status</span>
                <span className="font-extrabold text-[#10B981]">Completed</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">Date</span>
                <span className="font-bold text-[#0F152A]">24 Jun 2026</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">Time</span>
                <span className="font-bold text-[#0F152A]">3:47:22 PM</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">SIM Number</span>
                <span className="font-bold text-[#0F152A]">07022222222</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">SIM Type</span>
                <span className="rounded-lg bg-[#EFF4F8] px-2.5 py-0.5 font-extrabold text-[#2563EB]">
                  POS SIM
                </span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">Network</span>
                <span className="rounded-lg bg-[#FFFBEB] px-2.5 py-0.5 font-extrabold text-[#854D0E]">
                  MTN
                </span>
              </div>

              {/* CUSTOMER SECTION */}
              <div className="pt-4 pb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  CUSTOMER
                </span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">Customer</span>
                <span className="font-bold text-[#0F152A]">Chidi Eze</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">Phone</span>
                <span className="font-bold text-[#0F152A]">08120600542</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">Address</span>
                <span className="font-bold text-[#0F152A]">23 Marina Street, Lagos</span>
              </div>

              {/* AGENCY PARTNER SECTION */}
              <div className="pt-4 pb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  AGENCY PARTNER
                </span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">AP Name</span>
                <span className="font-bold text-[#0F152A]">Rabiu Sani</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">AP Phone</span>
                <span className="font-bold text-[#0F152A]">08120600542</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">AP Status</span>
                <span className="font-extrabold text-[#10B981]">• Active</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">SC (You)</span>
                <span className="font-bold text-[#0F152A]">Aminat Okafor</span>
              </div>

              {/* COMMISSION SECTION */}
              <div className="pt-4 pb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                  COMMISSION
                </span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">AP Commission</span>
                <span className="font-extrabold text-[#10B981]">₦1,000</span>
              </div>

              <div className="py-3 flex justify-between items-center">
                <span className="text-[#8C909B] font-medium">SC Commission</span>
                <span className="font-extrabold text-[#10B981]">₦150</span>
              </div>

              <div className="py-3 flex justify-between items-center font-black text-sm pt-4">
                <span className="text-[#0F152A]">Total</span>
                <span className="text-[#10B981]">₦1,150</span>
              </div>
            </div>
          </div>

          {/* Activation Timeline Card */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-[#0F152A]">
              Activation Timeline
            </h3>

            <div className="space-y-4 text-xs">
              {/* Event 1 */}
              <div className="flex items-start gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981] shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">
                    3:47:20 PM · Activation requested
                  </h4>
                  <p className="text-[11px] text-[#8C909B]">
                    AP: Rabiu Sani submitted
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex items-start gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981] shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">
                    3:47:21 PM · Network confirmed
                  </h4>
                  <p className="text-[11px] text-[#8C909B]">
                    MTN confirmed SIM registration
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex items-start gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981] shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">
                    3:47:22 PM · Commission credited
                  </h4>
                  <p className="text-[11px] text-[#8C909B]">
                    ₦1,000 to Rabiu Sani's wallet
                  </p>
                </div>
              </div>

              {/* Event 4 */}
              <div className="flex items-start gap-3">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981] shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">
                    3:47:23 PM · Records updated
                  </h4>
                  <p className="text-[11px] text-[#8C909B]">
                    AP, SC records updated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Distribution Chain & Quick Actions */}
        <div className="space-y-6">
          {/* Distribution Chain Card (Matching Image 3) */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-[#0F152A]">
              Distribution Chain
            </h3>

            <div className="space-y-2 text-xs">
              {/* Level 1: SimKash */}
              <div className="rounded-2xl bg-[#0F152A] p-3 text-white flex items-center gap-3">
                <Building className="size-5 shrink-0" />
                <div>
                  <h4 className="font-extrabold">SimKash</h4>
                  <p className="text-[10px] text-slate-300">Platform</p>
                </div>
              </div>
              <div className="text-center text-[#8C909B]">↓</div>

              {/* Level 2: Regional Manager */}
              <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3 flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#EFF4F8] font-bold text-[#0F152A]">
                  YA
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">Yusuf Adam Baba</h4>
                  <p className="text-[10px] text-[#8C909B]">Regional Manager</p>
                </div>
              </div>
              <div className="text-center text-[#8C909B]">↓</div>

              {/* Level 3: State Coordinator (You) */}
              <div className="rounded-2xl bg-[#EBFFF8] border border-[#10B981]/30 p-3 flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#10B981] font-bold text-white">
                  AO
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">Aminat Okafor (You)</h4>
                  <p className="text-[10px] text-[#10B981]">State Coordinator</p>
                </div>
              </div>
              <div className="text-center text-[#8C909B]">↓</div>

              {/* Level 4: Agency Partner */}
              <div className="rounded-2xl bg-[#EBFFF8] border border-[#10B981]/30 p-3 flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#10B981] font-bold text-white">
                  RS
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">Rabiu Sani</h4>
                  <p className="text-[10px] text-[#10B981]">Agency Partner</p>
                </div>
              </div>
              <div className="text-center text-[#8C909B]">↓</div>

              {/* Level 5: Customer */}
              <div className="rounded-2xl bg-white border border-[#E2ECF6] p-3 flex items-center gap-3">
                <User className="size-5 shrink-0 text-[#0F152A]" />
                <div>
                  <h4 className="font-extrabold text-[#0F152A]">Chidi Eze</h4>
                  <p className="text-[10px] text-[#8C909B]">Customer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-extrabold text-[#0F152A]">
              Quick Actions
            </h3>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => navigate(appPaths.agencyPartnerDetails("rabiu-sani").path)}
                className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 font-bold text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                View AP Profile
              </button>

              <button
                type="button"
                onClick={() => alert("Downloading receipt...")}
                className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white shadow-xs hover:bg-blue-700"
              >
                Download Receipt
              </button>

              <button
                type="button"
                onClick={() => alert("Reporting issue to support...")}
                className="w-full rounded-xl border border-[#EF4444] bg-white py-2.5 font-bold text-[#EF4444] hover:bg-[#FFF7F8]"
              >
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
