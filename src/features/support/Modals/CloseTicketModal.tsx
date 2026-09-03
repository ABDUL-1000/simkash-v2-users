import { useState } from "react";
import { Star } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface CloseTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId?: string;
  ticketTitle?: string;
}

export function CloseTicketModal({
  open,
  onOpenChange,
  ticketId = "TKT-2026-00851",
  ticketTitle = "SIM not activating after request",
}: CloseTicketModalProps) {
  const [reason, setReason] = useState("Issue resolved");
  const [rating, setRating] = useState(4);
  const [comments, setComments] = useState("");

  const reasons = [
    { title: "Issue resolved", desc: "My issue has been fixed" },
    { title: "No longer needed", desc: "The issue is no longer relevant" },
    { title: "Resolved myself", desc: "I figured it out on my own" },
    { title: "Other", desc: "Another reason" },
  ];

  const handleCloseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    alert("Ticket has been closed. Thank you for your feedback!");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Close Ticket"
      description={ticketId}
      size="md"
    >
      <form onSubmit={handleCloseTicket} className="space-y-4 pt-1">
        {/* Ticket Summary Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs space-y-0.5">
          <h4 className="font-extrabold text-[#0F152A]">{ticketTitle}</h4>
          <p className="text-[11px] text-[#8C909B]">In Progress · Opened 24 Jun 2026</p>
        </div>

        {/* WHY ARE YOU CLOSING? */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            WHY ARE YOU CLOSING?
          </label>

          <div className="space-y-2">
            {reasons.map((r) => {
              const isSelected = reason === r.title;
              return (
                <label
                  key={r.title}
                  onClick={() => setReason(r.title)}
                  className={`flex items-center gap-3 rounded-2xl p-3 border text-xs cursor-pointer transition ${
                    isSelected
                      ? "border-[#2563EB] bg-[#EFF4F8]"
                      : "border-[#E2ECF6] bg-white hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="close_reason"
                    checked={isSelected}
                    onChange={() => setReason(r.title)}
                    className="size-4 accent-[#2563EB]"
                  />
                  <div>
                    <h5 className="font-bold text-[#0F152A]">{r.title}</h5>
                    <p className="text-[10px] text-[#8C909B]">{r.desc}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* RATE YOUR SUPPORT EXPERIENCE */}
        <div className="space-y-2 text-center pt-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            RATE YOUR SUPPORT EXPERIENCE
          </label>

          <div className="flex justify-center gap-1.5 text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 transition hover:scale-110"
              >
                <Star
                  className={`size-6 ${
                    star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            rows={2}
            placeholder="Any additional comments about your experience..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB] text-left"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Close Ticket
          </button>
        </div>
      </form>
    </AppModal>
  );
}
