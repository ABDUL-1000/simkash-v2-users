import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Paperclip, Send } from "lucide-react";
import { CreateTicketModal } from "../Modals/CreateTicketModal";
import { CloseTicketModal } from "../Modals/CloseTicketModal";
import { AttachFileModal } from "../Modals/AttachFileModal";

export default function SupportTicketDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ticketId = id || "TKT-2026-00851";

  const [replyText, setReplyText] = useState("");
  const [createTicketOpen, setCreateTicketOpen] = useState(false);
  const [closeTicketOpen, setCloseTicketOpen] = useState(false);
  const [attachFileOpen, setAttachFileOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "You",
      isUser: true,
      time: "24 Jun · 03:47 PM",
      text: "My SIM 07022222222 is not activating after I submitted a request 3 days ago. The agent said it would be active in 24 hours.",
    },
    {
      id: 2,
      sender: "Support Team",
      isUser: false,
      badge: "Simkash",
      time: "24 Jun · 04:02 PM",
      text: "Hi Yusuf, thank you for reaching out. We've checked your request REQ-2026-00847. The agent has been notified and will finalize your SIM activation shortly.",
    },
    {
      id: 3,
      sender: "You",
      isUser: true,
      time: "24 Jun · 04:10 PM",
      text: "Thank you. I'll wait and update you if it's still not done.",
    },
  ]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        isUser: true,
        time: "Just now",
        text: replyText,
      },
    ]);
    setReplyText("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/support")}
            className="rounded-xl border border-[#E2ECF6] bg-white p-2 text-[#0F152A] hover:bg-slate-50"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F152A]">
              SIM not activating after request
            </h1>
            <p className="mt-0.5 text-xs text-[#8C909B]">
              Opened 24 Jun 2026 · 03:47 PM
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCloseTicketOpen(true)}
          className="rounded-xl border border-[#EF4444] px-4 py-2 text-xs font-bold text-[#EF4444] hover:bg-red-50"
        >
          Close Ticket
        </button>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column — Conversation & Reply Box (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-[#0F152A]">Conversation</h3>

            {/* Conversation Messages List */}
            <div className="space-y-4 text-xs">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-[#0F152A]">
                      <span className="flex size-6 items-center justify-center rounded-full bg-[#2563EB] text-[10px] text-white">
                        {msg.isUser ? "YA" : "ST"}
                      </span>
                      <span>{msg.sender}</span>
                      {msg.badge && (
                        <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">
                          {msg.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8C909B]">{msg.time}</span>
                  </div>

                  <div className="rounded-2xl bg-[#F8FAFC] p-4 text-[#0F152A] font-medium leading-relaxed border border-[#E2ECF6]">
                    {msg.text}
                  </div>
                </div>
              ))}

              <div className="text-center text-[10px] text-[#8C909B] font-bold py-1">
                Status updated: Open → In Progress · 24 Jun 2026 · 04:15 PM
              </div>

              <div className="flex items-center justify-center gap-1 text-[11px] text-[#2563EB] font-bold animate-pulse">
                <span>●●●</span> Still waiting for response...
              </div>
            </div>

            {/* Reply Input Box */}
            <form onSubmit={handleSendReply} className="space-y-3 border-t border-[#E2ECF6] pt-4">
              <textarea
                rows={3}
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
              />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setAttachFileOpen(true)}
                  className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
                >
                  <Paperclip className="size-4" /> Attach file
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
                >
                  <Send className="size-3.5" /> Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Ticket Details Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
            <div className="divide-y divide-[#E2ECF6]">
              <div className="flex justify-between py-2.5 first:pt-0">
                <span className="text-[#8C909B]">Ticket ID</span>
                <span className="font-mono font-bold text-[#0F152A]">{ticketId}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Status</span>
                <span className="rounded-full bg-[#EFF4F8] px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
                  In Progress
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Category</span>
                <span className="font-bold text-[#0F152A]">SIM Issues</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Priority</span>
                <span className="rounded bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-bold text-[#F59E0B]">
                  Medium
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Created</span>
                <span className="font-bold text-[#0F152A]">24 Jun 2026 · 03:47 PM</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-[#8C909B]">Last Update</span>
                <span className="font-bold text-[#0F152A]">2 hours ago</span>
              </div>
              <div className="flex justify-between py-2.5 last:pb-0">
                <span className="text-[#8C909B]">Assigned To</span>
                <span className="font-bold text-[#0F152A]">Support Team</span>
              </div>
            </div>
          </div>

          {/* Related to this Ticket Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-[#0F152A]">Related to this Ticket</h4>

            <div className="space-y-2">
              <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#0F152A]">SIM: 07022222222 · MTN</span>
                  <span className="rounded-full bg-[#FFFBEB] px-2 py-0.5 text-[9px] font-bold text-[#F59E0B]">
                    Pending
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/device-sim/07022222222")}
                  className="text-[11px] font-bold text-[#2563EB] hover:underline"
                >
                  View SIM →
                </button>
              </div>

              <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 space-y-1">
                <span className="font-bold text-[#0F152A] block">REQ-2026-00847 · POS SIM</span>
                <button
                  type="button"
                  onClick={() => navigate("/device-sim")}
                  className="text-[11px] font-bold text-[#2563EB] hover:underline"
                >
                  Track Request →
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setAttachFileOpen(true)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Add More Info
            </button>
            <button
              type="button"
              onClick={() => setCloseTicketOpen(true)}
              className="w-full rounded-xl border border-[#EF4444] bg-white py-2.5 text-xs font-bold text-[#EF4444] hover:bg-red-50"
            >
              Close Ticket
            </button>
            <button
              type="button"
              onClick={() => setCreateTicketOpen(true)}
              className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Create New Ticket
            </button>
          </div>

          {/* Ticket History */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-[#0F152A]">Ticket History</h4>

            <div className="divide-y divide-[#E2ECF6] text-[11px]">
              <div className="flex justify-between py-2 first:pt-0">
                <span className="text-[#8C909B]">Ticket created</span>
                <span className="font-bold text-[#0F152A]">24 Jun · 03:47 PM</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Agent assigned</span>
                <span className="font-bold text-[#0F152A]">24 Jun · 03:50 PM</span>
              </div>
              <div className="flex justify-between py-2 last:pb-0">
                <span className="text-[#8C909B]">Status: In Progress</span>
                <span className="font-bold text-[#0F152A]">24 Jun · 04:15 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateTicketModal
        open={createTicketOpen}
        onOpenChange={setCreateTicketOpen}
      />
      <CloseTicketModal
        open={closeTicketOpen}
        onOpenChange={setCloseTicketOpen}
        ticketId={ticketId}
      />
      <AttachFileModal
        open={attachFileOpen}
        onOpenChange={setAttachFileOpen}
      />
    </div>
  );
}
