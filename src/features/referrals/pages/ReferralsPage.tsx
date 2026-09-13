import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  Copy,



  QrCode,
  Search,
  Share2,
  Users,
} from "lucide-react";
import { ReferBusinessModal } from "../Modals/ReferBusinessModal";
import { SendFollowUpModal } from "../Modals/SendFollowUpModal";
import { ReferralNotApprovedModal } from "../Modals/ReferralNotApprovedModal";

export default function ReferralsPage() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter States
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [referModalOpen, setReferModalOpen] = useState(false);
  const [followUpModalOpen, setFollowUpModalOpen] = useState(false);
  const [notApprovedModalOpen, setNotApprovedModalOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<{
    id: string;
    business: string;
    contact: string;
    phone: string;
  } | null>(null);

  const referralCode = "YUSUF50K";
  const referralLink = "https://simkash.com/ref/YUSUF50K";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const referralItems = [
    {
      id: "REF-001",
      business: "Femi Enterprises",
      type: "Corporate",
      contact: "Femi Adeyemi",
      phone: "08120600542",
      date: "1 Jan 2026",
      status: "Closed",
      commission: "₦50,000",
    },
    {
      id: "REF-002",
      business: "Lagos Estate Ltd",
      type: "Real Estate",
      contact: "Buhari Mohammed",
      phone: "09122222222",
      date: "15 Feb 2026",
      status: "Closed",
      commission: "₦50,000",
    },
    {
      id: "REF-003",
      business: "Chukwu Tech Sol",
      type: "Technology",
      contact: "Emeka Chukwu",
      phone: "08163083409",
      date: "1 Mar 2026",
      status: "Closed",
      commission: "₦50,000",
    },
    {
      id: "REF-004",
      business: "Kano Distributors",
      type: "Distribution",
      contact: "Musa Abdullahi",
      phone: "07055093537",
      date: "20 Mar 2026",
      status: "In Progress",
      commission: "Pending",
    },
    {
      id: "REF-005",
      business: "Sunshine Logistics",
      type: "Logistics",
      contact: "Grace Okonkwo",
      phone: "08084147750",
      date: "5 Apr 2026",
      status: "In Progress",
      commission: "Pending",
    },
    {
      id: "REF-006",
      business: "Abuja Properties",
      type: "Real Estate",
      contact: "Hassan Ibrahim",
      phone: "09078859889",
      date: "10 Apr 2026",
      status: "In Progress",
      commission: "Pending",
    },
    {
      id: "REF-007",
      business: "Delta Farms Ltd",
      type: "Agriculture",
      contact: "Chioma Obi",
      phone: "08088282811",
      date: "22 Apr 2026",
      status: "In Review",
      commission: "Pending",
    },
    {
      id: "REF-008",
      business: "Niger Traders Co",
      type: "Trading",
      contact: "Abubakar Sula",
      phone: "08033175021",
      date: "1 May 2026",
      status: "Rejected",
      commission: "—",
    },
  ];

  const filteredReferrals = referralItems.filter((item) => {
    if (activeTab === "In Progress" && item.status !== "In Progress" && item.status !== "In Review") {
      return false;
    }
    if (activeTab === "Closed" && item.status !== "Closed") return false;
    if (activeTab === "Rejected" && item.status !== "Rejected") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.business.toLowerCase().includes(q) ||
        item.contact.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleActionClick = (item: (typeof referralItems)[0]) => {
    if (item.status === "In Progress") {
      setSelectedReferral({
        id: item.id,
        business: item.business,
        contact: item.contact,
        phone: item.phone,
      });
      setFollowUpModalOpen(true);
    } else if (item.status === "Rejected") {
      setSelectedReferral({
        id: item.id,
        business: item.business,
        contact: item.contact,
        phone: item.phone,
      });
      setNotApprovedModalOpen(true);
    } else {
      navigate(`/referrals/${item.id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">Referrals</h1>
          <p className="mt-0.5 text-xs text-[#8C909B]">
            Refer businesses to Simkash and earn ₦50,000 per closed deal
          </p>
        </div>
        <button
          type="button"
          onClick={() => setReferModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
        >
          <Share2 className="size-4" /> Share Referral Link
        </button>
      </div>

      {/* 2. Hero Dark Navy Banner */}
      <div className="rounded-2xl bg-[#0F152A] p-6 text-white shadow-md flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9DF8DA]">
            EARN PER REFERRAL
          </span>
          <h2 className="text-4xl font-extrabold text-white">₦50,000</h2>
          <p className="text-xs text-[#C6C6C6]">
            for every business you refer that becomes a Simkash partner
          </p>
        </div>

        <div className="rounded-2xl bg-white p-4 text-[#0F152A] shadow-xs space-y-2 text-center sm:min-w-[240px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            Your referral code
          </span>
          <h3 className="text-xl font-extrabold tracking-widest text-[#0F152A]">
            {referralCode}
          </h3>
          <button
            type="button"
            onClick={handleCopyCode}
            className="w-full rounded-xl bg-[#2563EB] py-2 text-xs font-bold text-white hover:bg-blue-700 flex items-center justify-center gap-1.5"
          >
            {copiedCode ? (
              <>
                <Check className="size-3.5" /> Copied!
              </>
            ) : (
              <>
                <Copy className="size-3.5" /> Copy Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3. 4 Metric Summary Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-1">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB] mb-2">
            <Users className="size-4" />
          </div>
          <h3 className="text-3xl font-extrabold text-[#0F152A]">12</h3>
          <p className="text-xs font-bold text-[#0F152A]">Businesses Referred</p>
          <p className="text-[11px] text-[#8C909B]">All time</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-1">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981] mb-2">
            <Check className="size-4" />
          </div>
          <h3 className="text-3xl font-extrabold text-[#10B981]">3</h3>
          <p className="text-xs font-bold text-[#0F152A]">Deals Closed</p>
          <p className="text-[11px] text-[#8C909B]">Successfully converted</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-1">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#9333EA] mb-2">
            ₦
          </div>
          <h3 className="text-3xl font-extrabold text-[#9333EA]">₦150,000</h3>
          <p className="text-xs font-bold text-[#0F152A]">Total Earned</p>
          <p className="text-[11px] text-[#8C909B]">3 × ₦50,000</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-1">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B] mb-2">
            ⌛
          </div>
          <h3 className="text-3xl font-extrabold text-[#F59E0B]">₦450,000</h3>
          <p className="text-xs font-bold text-[#0F152A]">Potential Earnings</p>
          <p className="text-[11px] text-[#8C909B]">9 referrals in progress</p>
        </div>
      </div>

      {/* 4. Top 2-Column Section (Your Link + Commission Summary + How It Works) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Card — Your Referral Link (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-[#0F152A]">Your Referral Link</h3>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5 px-3.5 text-xs font-mono text-[#0F152A] outline-none"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
            >
              {copiedLink ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              SHARE VIA
            </span>
            <div className="flex items-center gap-3">
              {[
                { name: "WhatsApp", color: "bg-[#10B981]" },
                { name: "SMS", color: "bg-[#2563EB]" },
                { name: "Email", color: "bg-[#EF4444]" },
                { name: "Twitter/X", color: "bg-[#0F152A]" },
                { name: "Copy Link", color: "bg-[#8C909B]" },
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={handleCopyLink}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div
                    className={`flex size-10 items-center justify-center rounded-full text-white shadow-xs transition group-hover:scale-105 ${item.color}`}
                  >
                    <Share2 className="size-4" />
                  </div>
                  <span className="text-[10px] text-[#8C909B] font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E2ECF6] pt-4 text-center space-y-2">
            <span className="text-xs text-[#8C909B] font-medium block">
              Or share your QR code
            </span>
            <div className="inline-flex flex-col items-center gap-2">
              <div className="flex size-24 items-center justify-center rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC]">
                <QrCode className="size-16 text-[#0F152A]" />
              </div>
              <button
                type="button"
                onClick={() => alert("QR code downloaded")}
                className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-1.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
              >
                Download QR
              </button>
            </div>
          </div>
        </div>

        {/* Right Column — Commission Summary & How It Works (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Commission Summary */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
            <h3 className="text-base font-bold text-[#0F152A]">Commission Summary</h3>

            <div className="divide-y divide-[#E2ECF6]">
              <div className="flex justify-between py-2.5 first:pt-0">
                <span className="text-[#8C909B]">Deals closed</span>
                <span className="font-bold text-[#0F152A]">3</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Total earned</span>
                <span className="font-extrabold text-[#10B981]">₦150,000</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Pending (9)</span>
                <span className="font-extrabold text-[#F59E0B]">₦450,000</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Potential total</span>
                <span className="font-extrabold text-[#0F152A]">₦600,000</span>
              </div>
            </div>

            <div className="rounded-xl bg-[#FFFBEB] p-3 text-[11px] font-bold text-[#D9990D] border border-[#FCEEC1]">
              Next payout: ₦50,000 pending admin approval
            </div>

            <button
              type="button"
              onClick={() => navigate("/wallet")}
              className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 pt-1"
            >
              Check Wallet →
            </button>
          </div>

          {/* How Referrals Work */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
            <h3 className="text-base font-bold text-[#0F152A]">How Referrals Work</h3>

            <div className="space-y-3">
              {[
                { num: 1, text: "Share your referral link or code with a business owner" },
                { num: 2, text: "They sign up using your link and apply to become a partner" },
                { num: 3, text: "Simkash reviews and approves their application" },
                { num: 4, text: "You earn ₦50,000 once their account is active and verified" },
              ].map((step) => (
                <div key={step.num} className="flex gap-3 text-[11px]">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EFF4F8] text-xs font-extrabold text-[#2563EB]">
                    {step.num}
                  </span>
                  <span className="text-[#66738C] font-medium">{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Main Bottom 2-Column Section (Referrals Table + Right Sidebar) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column — All Referrals Table (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white shadow-xs p-6 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0F152A]">
                  All Referrals <span className="text-xs text-[#8C909B] font-normal">12 total</span>
                </h3>
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 rounded-xl bg-[#F8FAFC] p-1 border border-[#E2ECF6] max-w-full overflow-x-auto whitespace-nowrap">
                {["All", "In Progress", "Closed", "Rejected"].map((tab) => {
                  const isSelected = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                        isSelected
                          ? "bg-white text-[#0F152A] shadow-xs"
                          : "text-[#8C909B] hover:text-[#0F152A]"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Bar & Date Range */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-2.5 size-4 text-[#8C909B]" />
                <input
                  type="text"
                  placeholder="Search referrals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2 pl-10 pr-4 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
                />
              </div>
              <button
                type="button"
                className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
              >
                Date range
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-xs">
                <thead className="bg-[#F8FAFC] font-bold text-[#8C909B] border-b border-[#E2ECF6]">
                  <tr>
                    <th className="py-3 px-3">Business</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Referred On</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Commission</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECF6]">
                  {filteredReferrals.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F8FAFC]">
                      <td className="py-3.5 px-3">
                        <div className="font-extrabold text-[#0F152A]">{item.business}</div>
                        <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-[#0F152A]">{item.contact}</div>
                        <div className="text-[10px] text-[#8C909B]">{item.phone}</div>
                      </td>
                      <td className="py-3.5 px-3 text-[#8C909B]">{item.date}</td>
                      <td className="py-3.5 px-3">
                        {item.status === "Closed" ? (
                          <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
                            Closed
                          </span>
                        ) : item.status === "In Progress" ? (
                          <span className="rounded-full bg-[#EFF4F8] px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
                            In Progress
                          </span>
                        ) : item.status === "In Review" ? (
                          <span className="rounded-full bg-[#F8FAFC] px-2.5 py-0.5 text-[10px] font-bold text-[#9333EA]">
                            In Review
                          </span>
                        ) : (
                          <span className="rounded-full bg-[#FFF7F8] px-2.5 py-0.5 text-[10px] font-bold text-[#EF4444]">
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        {item.commission === "₦50,000" ? (
                          <span className="font-extrabold text-[#10B981]">₦50,000</span>
                        ) : item.commission === "Pending" ? (
                          <span className="font-bold text-[#F59E0B]">Pending</span>
                        ) : (
                          <span className="text-[#8C909B]">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        {item.status === "In Progress" ? (
                          <button
                            type="button"
                            onClick={() => handleActionClick(item)}
                            className="font-bold text-[#2563EB] hover:underline"
                          >
                            Follow Up
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleActionClick(item)}
                            className="font-bold text-[#2563EB] hover:underline"
                          >
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 text-center text-xs text-[#8C909B]">
              Showing {filteredReferrals.length} of 12
            </div>
          </div>
        </div>

        {/* Right Column — Top Referrers & Recent Payments (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Referrers */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-[#0F152A]">Top Referrers</h4>

            <div className="divide-y divide-[#E2ECF6]">
              {[
                { rank: "#1", name: "Rabiu Sani", count: "8 referrals" },
                { rank: "#2", name: "Aminat Okafor", count: "6 referrals" },
                { rank: "#3", name: "Yusuf Baba", count: "3 referrals", isYou: true },
                { rank: "#4", name: "Chidi Eze", count: "2 referrals" },
                { rank: "#5", name: "Glory Effah", count: "1 referral" },
              ].map((r) => (
                <div key={r.rank} className="flex items-center justify-between py-2.5 first:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#8C909B] w-5">{r.rank}</span>
                    <span className="font-bold text-[#0F152A]">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#8C909B]">{r.count}</span>
                    {r.isYou && (
                      <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">
                        ← you
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-[#0F152A]">Recent Payments</h4>

            <div className="space-y-2 text-[11px]">
              <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5">
                <span className="font-extrabold text-[#10B981] block">₦50,000</span>
                <span className="text-[#8C909B]">Femi Enterprises · 1 Jan</span>
              </div>
              <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5">
                <span className="font-extrabold text-[#10B981] block">₦50,000</span>
                <span className="text-[#8C909B]">Lagos Estate Ltd · 15 Feb</span>
              </div>
              <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5">
                <span className="font-extrabold text-[#10B981] block">₦50,000</span>
                <span className="text-[#8C909B]">Chukwu Tech · 1 Mar</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/wallet")}
              className="text-xs font-bold text-[#2563EB] hover:underline block pt-1"
            >
              View in Wallet →
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReferBusinessModal
        open={referModalOpen}
        onOpenChange={setReferModalOpen}
      />
      <SendFollowUpModal
        open={followUpModalOpen}
        onOpenChange={setFollowUpModalOpen}
        businessName={selectedReferral?.business}
        contactPerson={selectedReferral?.contact}
        phone={selectedReferral?.phone}
      />
      <ReferralNotApprovedModal
        open={notApprovedModalOpen}
        onOpenChange={setNotApprovedModalOpen}
        businessName={selectedReferral?.business || "Niger Traders Co"}
        contactPerson={selectedReferral?.contact || "Abubakar Sula"}
      />
    </div>
  );
}
