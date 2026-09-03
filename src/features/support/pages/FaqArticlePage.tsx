import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { CreateTicketModal } from "../Modals/CreateTicketModal";

export default function FaqArticlePage() {
  const navigate = useNavigate();
  const [rated, setRated] = useState<boolean | null>(null);
  const [createTicketOpen, setCreateTicketOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-[#8C909B]">
        <button
          type="button"
          onClick={() => navigate("/support")}
          className="hover:text-[#2563EB]"
        >
          Support
        </button>
        <span>→</span>
        <button
          type="button"
          onClick={() => navigate("/support")}
          className="hover:text-[#2563EB]"
        >
          FAQ
        </button>
        <span>→</span>
        <span className="text-[#0F152A]">SIM Issues</span>
      </div>

      {/* Main Title & Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-[#0F152A]">
          Why is my SIM not activating after I requested one?
        </h1>
        <p className="text-xs text-[#8C909B]">Last updated: 1 Jun 2026</p>
      </div>

      {/* Article Content */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-6 text-xs text-[#0F152A] leading-relaxed">
        <p>
          When you request a SIM on Simkash, an agent in your area is notified to fulfill your request. Here is how the activation process works step by step:
        </p>

        {/* Step-by-Step Numbered Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2 font-bold text-xs">
          <p>1. Request submitted (instant)</p>
          <p>2. Agent notified (within 1 hour)</p>
          <p>3. Agent contacts you (within 24hrs)</p>
          <p>4. SIM activated (same day as contact)</p>
        </div>

        {/* COMMON REASONS FOR DELAYS */}
        <div className="space-y-3">
          <h3 className="font-extrabold uppercase tracking-wider text-[10px] text-[#8C909B]">
            COMMON REASONS FOR DELAYS
          </h3>

          <div className="space-y-2">
            <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-0.5">
              <h4 className="font-extrabold text-[#0F152A]">Agent is in high demand</h4>
              <p className="text-[#8C909B] text-[11px]">
                Try again during off-peak hours or request a different agent area.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-0.5">
              <h4 className="font-extrabold text-[#0F152A]">SIM stock unavailable</h4>
              <p className="text-[#8C909B] text-[11px]">
                Your area may temporarily be out of stock. We'll notify you when stock is replenished.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-0.5">
              <h4 className="font-extrabold text-[#0F152A]">Incorrect delivery address</h4>
              <p className="text-[#8C909B] text-[11px]">
                Check your request details and update if the address is wrong.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-0.5">
              <h4 className="font-extrabold text-[#0F152A]">Network-specific delay</h4>
              <p className="text-[#8C909B] text-[11px]">
                Some network SIMs take longer. MTN and Airtel are usually fastest.
              </p>
            </div>
          </div>
        </div>

        {/* WHAT TO DO */}
        <div className="space-y-2">
          <h3 className="font-extrabold uppercase tracking-wider text-[10px] text-[#8C909B]">
            WHAT TO DO:
          </h3>
          <ol className="list-decimal list-inside space-y-1 font-medium text-[#0F152A]">
            <li>Wait 48 hours from request date</li>
            <li>Check your Device SIM screen for status updates</li>
            <li>If still pending, contact support using the button below</li>
          </ol>
        </div>

        {/* Was this article helpful? */}
        <div className="border-t border-[#E2ECF6] pt-5 flex items-center justify-center gap-3">
          <span className="text-xs font-semibold text-[#8C909B]">Was this article helpful?</span>
          <button
            type="button"
            onClick={() => setRated(true)}
            className={`rounded-xl border px-4 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
              rated === true
                ? "border-[#10B981] bg-[#EBFFF8] text-[#10B981]"
                : "border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-slate-50"
            }`}
          >
            <ThumbsUp className="size-3.5" /> Yes
          </button>
          <button
            type="button"
            onClick={() => setRated(false)}
            className={`rounded-xl border px-4 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
              rated === false
                ? "border-[#EF4444] bg-[#FFF7F8] text-[#EF4444]"
                : "border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-slate-50"
            }`}
          >
            <ThumbsDown className="size-3.5" /> No
          </button>
        </div>

        {/* Related Articles Grid */}
        <div className="grid gap-3 sm:grid-cols-3 pt-2">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-1">
            <h4 className="font-bold text-[#0F152A] text-xs">How to track my SIM request</h4>
            <button type="button" className="text-[11px] font-bold text-[#2563EB] hover:underline">
              Read article →
            </button>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-1">
            <h4 className="font-bold text-[#0F152A] text-xs">SIM renewal guide</h4>
            <button type="button" className="text-[11px] font-bold text-[#2563EB] hover:underline">
              Read article →
            </button>
          </div>

          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-1">
            <h4 className="font-bold text-[#0F152A] text-xs">How to do a SIM swap</h4>
            <button type="button" className="text-[11px] font-bold text-[#2563EB] hover:underline">
              Read article →
            </button>
          </div>
        </div>

        {/* Still Need Help CTA */}
        <div className="text-center space-y-2 pt-2">
          <p className="text-xs text-[#8C909B] font-semibold">Still need help?</p>
          <button
            type="button"
            onClick={() => setCreateTicketOpen(true)}
            className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Contact Support
          </button>
        </div>
      </div>

      <CreateTicketModal
        open={createTicketOpen}
        onOpenChange={setCreateTicketOpen}
      />
    </div>
  );
}
