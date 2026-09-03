import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface SearchResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query?: string;
}

export function SearchResultsModal({
  open,
  onOpenChange,
  query = "sim not activating",
}: SearchResultsModalProps) {
  const navigate = useNavigate();

  const results = [
    {
      id: "res-1",
      category: "SIM Issues",
      title: "Why is my SIM not activating after request?",
      desc: "When you request a SIM, an agent in your area is notified...",
      slug: "why-is-my-sim-not-activating-after-i-requested-one",
    },
    {
      id: "res-2",
      category: "SIM Issues",
      title: "How do I track my SIM activation request?",
      desc: "Go to Device SIM → Pending Requests to view status...",
      slug: "how-do-i-track-my-sim-request",
    },
    {
      id: "res-3",
      category: "SIM Issues",
      title: "How long does SIM activation take?",
      desc: "Activation typically takes between 24 and 48 hours...",
      slug: "how-long-does-sim-activation-take",
    },
    {
      id: "res-4",
      category: "Billing",
      title: "I was charged for a SIM that wasn't activated",
      desc: "If you were charged but your SIM activation failed, a refund...",
      slug: "i-was-charged-for-a-sim-that-wasnt-activated",
    },
    {
      id: "res-5",
      category: "Account",
      title: "My SIM shows pending for more than 3 days",
      desc: "If your SIM request has been pending for over 3 days...",
      slug: "my-sim-shows-pending-for-more-than-3-days",
    },
    {
      id: "res-6",
      category: "SIM Issues",
      title: "How do I cancel a SIM request?",
      desc: "You can cancel a pending SIM request before the agent processes it...",
      slug: "how-do-i-cancel-a-sim-request",
    },
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center justify-between w-full pr-6">
          <span className="text-sm font-extrabold text-[#0F152A]">
            Results for '{query}'
          </span>
          <span className="text-xs text-[#8C909B] font-normal">
            {results.length} results
          </span>
        </div>
      }
      size="md"
    >
      <div className="space-y-4 pt-1">
        <div className="divide-y divide-[#E2ECF6] text-xs">
          {results.map((res) => (
            <div
              key={res.id}
              onClick={() => {
                onOpenChange(false);
                navigate(`/support/faq/${res.slug}`);
              }}
              className="cursor-pointer flex items-center justify-between py-3 hover:bg-[#F8FAFC] px-2 rounded-xl first:pt-0"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#EBFFF8] px-1.5 py-0.5 text-[9px] font-bold text-[#10B981]">
                    {res.category}
                  </span>
                  <h4 className="font-extrabold text-[#0F152A]">{res.title}</h4>
                </div>
                <p className="text-[11px] text-[#8C909B]">{res.desc}</p>
              </div>
              <ChevronRight className="size-4 text-[#8C909B] shrink-0" />
            </div>
          ))}
        </div>

        <div className="border-t border-[#E2ECF6] pt-3 text-center">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-bold text-[#2563EB] hover:underline"
          >
            View all 6 results
          </button>
        </div>
      </div>
    </AppModal>
  );
}
