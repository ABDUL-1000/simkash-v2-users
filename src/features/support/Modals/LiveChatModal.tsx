import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { ActiveLiveChatModal } from "./ActiveLiveChatModal";
import { ChatEndedModal } from "./ChatEndedModal";

interface LiveChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LiveChatModal({ open, onOpenChange }: LiveChatModalProps) {
  const [activeChatOpen, setActiveChatOpen] = useState(false);
  const [chatEndedOpen, setChatEndedOpen] = useState(false);

  const handleSimulateConnected = () => {
    onOpenChange(false);
    setActiveChatOpen(true);
  };

  return (
    <>
      <AppModal
        open={open}
        onOpenChange={onOpenChange}
        title="Live Chat"
        description="Connecting you to support..."
        size="md"
      >
        <div className="space-y-4 pt-4 text-center">
          {/* Pulsing Green Indicator */}
          <div
            onClick={handleSimulateConnected}
            className="relative mx-auto flex size-12 items-center justify-center cursor-pointer group"
            title="Click to simulate agent connected"
          >
            <span className="absolute inline-flex size-10 animate-ping rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex size-7 rounded-full bg-[#10B981]" />
          </div>

          <div>
            <h3 className="text-base font-extrabold text-[#0F152A]">Finding an available agent</h3>
            <p className="text-xs text-[#8C909B] mt-0.5">Usually connects in under 2 minutes</p>
          </div>

          <div className="inline-block rounded-full bg-[#F8FAFC] border border-[#E2ECF6] px-4 py-1 text-xs font-bold text-[#0F152A]">
            Position: #2 in queue
          </div>

          <div>
            <button
              type="button"
              onClick={handleSimulateConnected}
              className="text-xs font-bold text-[#10B981] hover:underline block mx-auto"
            >
              ~1 minute (Click to connect now)
            </button>
          </div>

          <div className="pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </AppModal>

      {/* Connected Live Chat Modal */}
      <ActiveLiveChatModal
        open={activeChatOpen}
        onOpenChange={setActiveChatOpen}
        onEndChat={() => {
          setActiveChatOpen(false);
          setChatEndedOpen(true);
        }}
      />

      {/* Chat Ended Rating Modal */}
      <ChatEndedModal
        open={chatEndedOpen}
        onOpenChange={setChatEndedOpen}
      />
    </>
  );
}
