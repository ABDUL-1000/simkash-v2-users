import { useState } from "react";
import { Paperclip } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ActiveLiveChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEndChat?: () => void;
}

export function ActiveLiveChatModal({
  open,
  onOpenChange,
  onEndChat,
}: ActiveLiveChatModalProps) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Adeola",
      isUser: false,
      time: "2:30 PM",
      text: "Hi Yusuf! I'm Adeola from Simkash Support. How can I help you today?",
    },
    {
      id: 2,
      sender: "You",
      isUser: true,
      time: "2:31 PM",
      text: "My SIM 07022222222 has not activated and it's been 3 days.",
    },
    {
      id: 3,
      sender: "Adeola",
      isUser: false,
      time: "2:32 PM",
      text: "I can see your request REQ-2026-00847. Let me check the status for you.",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        isUser: true,
        time: "Just now",
        text: input,
      },
    ]);
    setInput("");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#10B981]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#0F152A]">Adeola · Support</h3>
            <p className="text-[10px] text-[#8C909B]">Simkash Support</p>
          </div>
        </div>
      }
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* End Chat Button in Header level */}
        <div className="flex justify-end -mt-10 mb-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onEndChat?.();
            }}
            className="rounded-xl border border-[#EF4444] px-3 py-1 text-xs font-bold text-[#EF4444] hover:bg-red-50"
          >
            End Chat
          </button>
        </div>

        {/* System join note */}
        <div className="text-center text-[10px] text-[#8C909B] font-bold">
          Adeola has joined the chat
        </div>

        {/* Chat Messages */}
        <div className="space-y-3 text-xs max-h-72 overflow-y-auto pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col space-y-1 ${
                m.isUser ? "items-end" : "items-start"
              }`}
            >
              <span className="text-[9px] text-[#8C909B]">
                {m.sender} · {m.time}
              </span>
              <div
                className={`max-w-[85%] rounded-2xl p-3 font-medium leading-relaxed ${
                  m.isUser
                    ? "bg-[#2563EB] text-white"
                    : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A]"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing Dots */}
          <div className="flex items-center gap-1 rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] px-3 py-2 text-[#8C909B] w-fit">
            <span className="size-1.5 rounded-full bg-[#8C909B] animate-ping" />
            <span className="size-1.5 rounded-full bg-[#8C909B] animate-ping delay-100" />
            <span className="size-1.5 rounded-full bg-[#8C909B] animate-ping delay-200" />
          </div>
        </div>

        {/* Input Box */}
        <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-[#E2ECF6] pt-3">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 px-4 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
          <button
            type="button"
            onClick={() => alert("Attach file requested")}
            className="text-[#8C909B] hover:text-[#0F152A] p-1"
          >
            <Paperclip className="size-4" />
          </button>
          <button
            type="submit"
            className="flex items-center justify-center rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </AppModal>
  );
}
