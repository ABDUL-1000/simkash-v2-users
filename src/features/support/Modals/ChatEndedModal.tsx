import { useState } from "react";
import { Star } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ChatEndedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewTicket?: () => void;
}

export function ChatEndedModal({
  open,
  onOpenChange,
  onViewTicket,
}: ChatEndedModalProps) {
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState("");

  const handleDone = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    alert("Thank you for your feedback!");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="md"
    >
      <form onSubmit={handleDone} className="space-y-4 pt-1 text-center">
        {/* Circle Placeholder */}
        <div className="mx-auto size-16 rounded-full bg-[#F8FAFC] border border-[#E2ECF6]" />

        <div>
          <h3 className="text-lg font-extrabold text-[#0F152A]">Chat Ended</h3>
          <p className="text-xs text-[#8C909B] mt-0.5">Chat with Adeola · 14 minutes</p>
        </div>

        <div className="space-y-2 pt-1">
          <p className="text-xs font-semibold text-[#8C909B]">Rate this conversation:</p>
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
        </div>

        <div className="space-y-1 text-left">
          <label className="text-xs font-bold text-[#0F152A]">How was your experience?</label>
          <textarea
            rows={2}
            placeholder="Optional feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        <p className="text-[10px] text-[#8C909B]">Chat transcript saved to your tickets</p>

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onViewTicket?.();
            }}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            View Ticket
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </form>
    </AppModal>
  );
}
