import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Plus,
  ShieldCheck,
  ShoppingBag,
  
} from "lucide-react";
import { CreateTicketModal } from "../Modals/CreateTicketModal";
import { LiveChatModal } from "../Modals/LiveChatModal";
import { SearchResultsModal } from "../Modals/SearchResultsModal";

export default function SupportCenterPage() {
  const navigate = useNavigate();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTicketTab, setActiveTicketTab] = useState("All");
  const [activeFaqTab, setActiveFaqTab] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Modals state
  const [createTicketOpen, setCreateTicketOpen] = useState(false);
  const [liveChatOpen, setLiveChatOpen] = useState(false);
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);

  const tickets = [
    {
      id: "TKT-2026-00851",
      title: "SIM not activating after request",
      category: "SIM Issues",
      updated: "Updated 2 hours ago",
      status: "In Progress",
    },
    {
      id: "TKT-2026-00847",
      title: "Wallet top up not reflecting",
      category: "Billing",
      updated: "Updated Yesterday",
      status: "Open",
    },
    {
      id: "TKT-2026-00831",
      title: "DSTV subscription failed but wallet was debited",
      category: "Billing",
      updated: "Updated 3 days ago",
      status: "Resolved",
    },
    {
      id: "TKT-2026-00812",
      title: "Cannot log into my account",
      category: "Account",
      updated: "Updated 1 week ago",
      status: "Closed",
    },
    {
      id: "TKT-2026-00798",
      title: "Order ORD-2026-00654 not delivered after 7 days",
      category: "Orders",
      updated: "Updated 2 weeks ago",
      status: "Closed",
    },
  ];

  const filteredTickets = tickets.filter((t) => {
    if (activeTicketTab !== "All" && t.status !== activeTicketTab) return false;
    return true;
  });

  const faqs = [
    {
      id: 0,
      question: "How do I top up my wallet?",
      answer:
        "You can top up your wallet by tapping 'Top Up' on your dashboard or in My Wallet. We accept debit cards, bank transfers (Providus Direct Deposit), and USSD.",
      category: "Wallet",
      slug: "how-do-i-top-up-my-wallet",
    },
    {
      id: 1,
      question: "My SIM is expiring — what do I do?",
      answer:
        "Go to SIM Hub or Renewal Monitoring, select your SIM number (MTN, Airtel, or Glo), choose your renewal plan, and pay using your wallet or PayLater.",
      category: "SIM",
      slug: "my-sim-is-expiring-what-do-i-do",
    },
    {
      id: 2,
      question: "Why is my SIM not activating after I requested one?",
      answer:
        "When you request a SIM on Simkash, an agent in your area is notified to fulfill your request. They usually contact you within 24 hours.",
      category: "SIM",
      slug: "why-is-my-sim-not-activating-after-i-requested-one",
    },
    {
      id: 3,
      question: "Why was my bill payment successful but service not received?",
      answer:
        "Occasionally provider network delays occur. If your electricity token or cable subscription is delayed beyond 15 minutes, click 'Retry' or create a ticket.",
      category: "Bills",
      slug: "why-was-my-bill-payment-successful-but-service-not-received",
    },
    {
      id: 4,
      question: "How do I earn from referrals?",
      answer:
        "Share your unique referral link (YUSUF50K) with a business. When they sign up and get approved as a Simkash partner, you earn ₦50,000.",
      category: "Account",
      slug: "how-do-i-earn-from-referrals",
    },
    {
      id: 5,
      question: "What is ZeroLimit SIM and how does it work?",
      answer:
        "ZeroLimit SIM allows unthrottled high-speed data for POS and CCTV devices without monthly data caps.",
      category: "ZeroLimit SIM",
      slug: "what-is-zerolimit-sim",
    },
    {
      id: 6,
      question: "How do I track my order from the marketplace?",
      answer:
        "Go to Marketplace > My Orders to view live dispatch status, delivery dates, and assigned installer contact details.",
      category: "Marketplace",
      slug: "how-do-i-track-my-order",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchResultsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">Support Center</h1>
          <p className="mt-0.5 text-xs text-[#8C909B]">How can we help you today?</p>
        </div>
        <button
          type="button"
          onClick={() => setCreateTicketOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
        >
          <Plus className="size-4" /> New Ticket
        </button>
      </div>

      {/* 2. Full Width Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          type="text"
          placeholder="Search for help, FAQs, or describe your issue..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-5 pr-28 text-xs font-semibold text-[#0F152A] outline-none shadow-xs focus:border-[#2563EB]"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 rounded-xl bg-[#2563EB] px-5 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* 3. 4 Quick Topic Category Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Billing & Payments",
            desc: "Wallet, top up, withdrawals, PayLater issues...",
            icon: <CreditCard className="size-5 text-[#2563EB]" />,
          },
          {
            title: "SIM Issues",
            desc: "Activation, renewal, swap, connectivity problems...",
   icon: <CreditCard className="size-5 text-[#2563EB]" />,          },
          {
            title: "Orders & Delivery",
            desc: "Marketplace orders, tracking, returns and refunds...",
            icon: <ShoppingBag className="size-5 text-[#9333EA]" />,
          },
          {
            title: "Account & Security",
            desc: "Login, PIN, KYC, profile and security concerns...",
            icon: <ShieldCheck className="size-5 text-[#F59E0B]" />,
          },
        ].map((cat) => (
          <div
            key={cat.title}
            onClick={() => setCreateTicketOpen(true)}
            className="cursor-pointer rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs transition hover:border-[#2563EB] space-y-2"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#F8FAFC]">
              {cat.icon}
            </div>
            <h4 className="font-extrabold text-[#0F152A] text-sm">{cat.title}</h4>
            <p className="text-xs text-[#8C909B]">{cat.desc}</p>
            <span className="text-xs font-bold text-[#2563EB] inline-flex items-center gap-1 pt-1">
              →
            </span>
          </div>
        ))}
      </div>

      {/* 4. Top 2-Column Section (My Support Tickets + Sidebar) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column — My Support Tickets (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-base font-bold text-[#0F152A]">My Support Tickets</h3>
              <button
                type="button"
                onClick={() => setCreateTicketOpen(true)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                New Ticket
              </button>
            </div>

            {/* Ticket Filter Tabs */}
            <div className="flex items-center gap-1.5 rounded-xl bg-[#F8FAFC] p-1 border border-[#E2ECF6] max-w-full overflow-x-auto whitespace-nowrap">
              {["All", "Open", "In Progress", "Resolved", "Closed"].map((tab) => {
                const isSelected = activeTicketTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTicketTab(tab)}
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

            {/* Tickets List */}
            <div className="divide-y divide-[#E2ECF6] text-xs">
              {filteredTickets.map((t) => (
                <div
                  key={t.id}
                  onClick={() => navigate(`/support/tickets/${t.id}`)}
                  className="cursor-pointer flex items-center justify-between py-3.5 hover:bg-[#F8FAFC] px-2 rounded-xl"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#8C909B]">{t.id}</span>
                    <h4 className="font-extrabold text-[#0F152A] text-sm">{t.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">
                        {t.category}
                      </span>
                      <span className="text-[10px] text-[#8C909B]">{t.updated}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        t.status === "In Progress"
                          ? "bg-[#EFF4F8] text-[#2563EB]"
                          : t.status === "Open"
                          ? "bg-[#FFFBEB] text-[#F59E0B]"
                          : t.status === "Resolved"
                          ? "bg-[#EBFFF8] text-[#10B981]"
                          : "bg-[#F8FAFC] text-[#8C909B]"
                      }`}
                    >
                      {t.status}
                    </span>
                    <span className="text-[#8C909B]">›</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="text-xs font-bold text-[#2563EB] hover:underline block pt-2"
            >
              View all tickets
            </button>
          </div>
        </div>

        {/* Right Column Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Reach Us Directly */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4 text-xs">
            <h4 className="font-extrabold text-[#0F152A]">Reach Us Directly</h4>

            <div className="space-y-3">
              {/* Live Chat */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-[#0F152A]">Live Chat</h5>
                  <span className="text-[10px] font-bold text-[#10B981]">● Online</span>
                </div>
                <p className="text-[10px] text-[#8C909B]">Usually responds in 2 minutes</p>
                <button
                  type="button"
                  onClick={() => setLiveChatOpen(true)}
                  className="w-full rounded-xl bg-[#10B981] py-2.5 font-bold text-white shadow-xs hover:bg-emerald-600 mt-1"
                >
                  Start Chat
                </button>
              </div>

              {/* WhatsApp */}
              <div className="space-y-1 pt-2 border-t border-[#E2ECF6]">
                <h5 className="font-bold text-[#0F152A]">WhatsApp</h5>
                <p className="text-[10px] text-[#8C909B]">+234 800 000 0000</p>
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-xl border border-[#E2ECF6] py-2 font-bold text-[#0F152A] hover:bg-slate-50 block text-center mt-1"
                >
                  Message Us
                </a>
              </div>

              {/* Call Us */}
              <div className="space-y-1 pt-2 border-t border-[#E2ECF6]">
                <h5 className="font-bold text-[#0F152A]">Call Us</h5>
                <p className="text-[10px] text-[#8C909B]">
                  0800-SIMKASH (Free) · Mon–Sat · 8AM–8PM
                </p>
                <a
                  href="tel:08007465274"
                  className="w-full rounded-xl border border-[#E2ECF6] py-2 font-bold text-[#0F152A] hover:bg-slate-50 block text-center mt-1"
                >
                  Call Now
                </a>
              </div>

              {/* Email */}
              <div className="space-y-1 pt-2 border-t border-[#E2ECF6]">
                <h5 className="font-bold text-[#0F152A]">Email</h5>
                <p className="text-[10px] text-[#8C909B]">
                  support@simkash.com · Usually responds in 24 hours
                </p>
                <a
                  href="mailto:support@simkash.com"
                  className="w-full rounded-xl border border-[#E2ECF6] py-2 font-bold text-[#0F152A] hover:bg-slate-50 block text-center mt-1"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Avg Response Times */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
            <h4 className="font-extrabold text-[#0F152A]">Avg Response Times</h4>

            <div className="divide-y divide-[#E2ECF6] text-[11px]">
              <div className="flex justify-between py-2 first:pt-0">
                <span className="text-[#8C909B]">Live Chat</span>
                <span className="font-bold text-[#10B981]">2 minutes</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">WhatsApp</span>
                <span className="font-bold text-[#10B981]">30 minutes</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Phone</span>
                <span className="font-bold text-[#10B981]">Instant</span>
              </div>
              <div className="flex justify-between py-2 last:pb-0">
                <span className="text-[#8C909B]">Email</span>
                <span className="font-bold text-[#F59E0B]">24 hours</span>
              </div>
            </div>
          </div>

          {/* Card 3: Fix It Yourself */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
            <h4 className="font-extrabold text-[#0F152A]">Fix It Yourself</h4>

            <div className="space-y-2 font-bold text-[#2563EB]">
              <button
                type="button"
                onClick={() => navigate("/bill-payments")}
                className="block hover:underline"
              >
                Retry failed transaction →
              </button>
              <button
                type="button"
                onClick={() => navigate("/marketplace/orders")}
                className="block hover:underline"
              >
                Track my order →
              </button>
              <button
                type="button"
                onClick={() => navigate("/device-sim")}
                className="block hover:underline"
              >
                Renew my SIM →
              </button>
              <button
                type="button"
                onClick={() => navigate("/transactions")}
                className="block hover:underline"
              >
                Download statement →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Main Bottom Section — Frequently Asked Questions */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-bold text-[#0F152A]">Frequently Asked Questions</h3>
          <button
            type="button"
            onClick={() => navigate("/support/faq/why-is-my-sim-not-activating")}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            View all →
          </button>
        </div>

        {/* FAQ Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl bg-[#F8FAFC] p-1 border border-[#E2ECF6] max-w-full overflow-x-auto whitespace-nowrap">
          {["All", "Wallet", "SIM", "ZeroLimit SIM", "Bills", "Marketplace", "Account"].map((tab) => {
            const isSelected = activeFaqTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFaqTab(tab)}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition whitespace-nowrap ${
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

        {/* Accordion FAQ List */}
        <div className="divide-y divide-[#E2ECF6] text-xs">
          {faqs
            .filter((f) => activeFaqTab === "All" || f.category === activeFaqTab)
            .map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <div key={faq.id} className="py-3.5">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                    className="flex w-full items-center justify-between font-extrabold text-[#0F152A] text-sm text-left"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="size-4 text-[#2563EB]" />
                    ) : (
                      <ChevronDown className="size-4 text-[#8C909B]" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="pt-2 text-xs text-[#66738C] space-y-2">
                      <p>{faq.answer}</p>
                      <button
                        type="button"
                        onClick={() => navigate(`/support/faq/${faq.slug}`)}
                        className="font-bold text-[#2563EB] hover:underline block"
                      >
                        Read full article →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Modals */}
      <CreateTicketModal
        open={createTicketOpen}
        onOpenChange={setCreateTicketOpen}
      />
      <LiveChatModal
        open={liveChatOpen}
        onOpenChange={setLiveChatOpen}
      />
      <SearchResultsModal
        open={searchResultsOpen}
        onOpenChange={setSearchResultsOpen}
        query={searchQuery || "sim not activating"}
      />
    </div>
  );
}
