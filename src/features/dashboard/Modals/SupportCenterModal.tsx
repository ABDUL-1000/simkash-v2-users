import {
  HelpCircle,
  Mail,
  MessageCircle,
  MessageSquare,
  Package,
  Percent,
  Phone,
  Smartphone,
  User,
  CreditCard,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface SupportCenterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTicket?: () => void;
  onViewTicketDetails?: (ticketId: string) => void;
}

export function SupportCenterModal({
  open,
  onOpenChange,
  onCreateTicket,
  onViewTicketDetails,
}: SupportCenterModalProps) {
  const commonIssues = [
    {
      key: "activation",
      title: "SIM Activation Problem",
      desc: "SIM not activating or network error.",
      icon: Smartphone,
      color: "text-[#2563EB]",
    },
    {
      key: "stock",
      title: "Stock Request Issue",
      desc: "Stock not received or wrong quantity.",
      icon: Package,
      color: "text-[#2563EB]",
    },
    {
      key: "payout",
      title: "Payout Problem",
      desc: "Payment not received or delayed payout.",
      icon: CreditCard,
      color: "text-[#2563EB]",
    },
    {
      key: "account",
      title: "Account Problem",
      desc: "Login issues, PIN reset or KYC problem.",
      icon: User,
      color: "text-[#2563EB]",
    },
    {
      key: "commission",
      title: "Commission Missing",
      desc: "Commission not credited after activation.",
      icon: Percent,
      color: "text-[#2563EB]",
    },
    {
      key: "other",
      title: "Something Else",
      desc: "Any other issue not listed above.",
      icon: HelpCircle,
      color: "text-[#2563EB]",
    },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Support Center"
      description="Get help with your partner account"
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* COMMON ISSUES SECTION (Matching Image 4) */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            COMMON ISSUES
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {commonIssues.map((issue) => {
              const Icon = issue.icon;
              return (
                <div
                  key={issue.key}
                  onClick={() => {
                    onOpenChange(false);
                    onCreateTicket?.();
                  }}
                  className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-start gap-3 hover:bg-white hover:border-[#2563EB] cursor-pointer transition"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-xs mt-0.5">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#0F152A] text-xs">
                      {issue.title}
                    </h5>
                    <p className="text-[10px] text-[#66738C] leading-tight mt-0.5">
                      {issue.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REACH US DIRECTLY SECTION (Matching Image 4) */}
        <div className="space-y-2 pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            REACH US DIRECTLY
          </label>
          <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6]">
            {/* Live Chat */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                  <MessageSquare className="size-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#0F152A] flex items-center gap-2">
                    <span>Live Chat</span>
                    <span className="flex items-center gap-1 text-[10px] text-[#10B981] font-bold">
                      <span className="size-1.5 rounded-full bg-[#10B981]" /> Online
                    </span>
                  </h5>
                  <p className="text-[10px] text-[#8C909B]">Usually 2 minutes reply time</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("Connecting to Live Agent...")}
                className="rounded-xl bg-[#10B981] px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 transition"
              >
                Start Chat
              </button>
            </div>

            {/* WhatsApp */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                  <MessageCircle className="size-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#0F152A]">WhatsApp</h5>
                  <p className="text-[10px] text-[#8C909B] font-mono">+234 800 000 0000</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("Opening WhatsApp...")}
                className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-1.5 text-xs font-extrabold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                Message Us
              </button>
            </div>

            {/* Call Support */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                  <Phone className="size-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#0F152A]">Call Support</h5>
                  <p className="text-[10px] text-[#8C909B]">0800-SIMKASH · Mon-Sat 8AM-8PM</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("Calling 0800-SIMKASH...")}
                className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-1.5 text-xs font-extrabold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                Call Now
              </button>
            </div>

            {/* Email Support */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
                  <Mail className="size-4" />
                </div>
                <div>
                  <h5 className="font-extrabold text-[#0F152A]">Email Support</h5>
                  <p className="text-[10px] text-[#8C909B]">support@simkash.com · 24hr reply</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("Opening Email...")}
                className="rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-1.5 text-xs font-extrabold text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                Email Us
              </button>
            </div>
          </div>
        </div>

        {/* YOUR OPEN TICKETS SECTION (Matching Image 4) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            YOUR OPEN TICKETS
          </span>

          <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
            <div className="flex items-center justify-between py-1.5 first:pt-0">
              <div>
                <span className="font-extrabold font-mono text-[#2563EB]">TKT-2026-00847</span>
                <span className="text-xs text-[#0F152A] font-bold ml-2">SIM not activating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
                  In Progress
                </span>
                <button
                  type="button"
                  onClick={() => onViewTicketDetails?.("TKT-2026-00847")}
                  className="text-xs font-bold text-[#2563EB] hover:underline"
                >
                  View
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <div>
                <span className="font-extrabold font-mono text-[#2563EB]">TKT-2026-00831</span>
                <span className="text-xs text-[#0F152A] font-bold ml-2">Payout delayed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-extrabold text-[#D9990D]">
                  Open
                </span>
                <button
                  type="button"
                  onClick={() => onViewTicketDetails?.("TKT-2026-00831")}
                  className="text-xs font-bold text-[#2563EB] hover:underline"
                >
                  View
                </button>
              </div>
            </div>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onCreateTicket?.();
              }}
              className="text-xs font-extrabold text-[#2563EB] hover:underline"
            >
              Create New Ticket →
            </button>
          </div>
        </div>

        {/* Action Buttons (Matching Image 4) */}
        <div className="pt-3 border-t border-[#E2ECF6]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onCreateTicket?.();
              }}
              className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              Create Ticket
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
