import { useState } from "react";
import { Upload } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTicketCreated?: () => void;
}

export function CreateTicketModal({
  open,
  onOpenChange,
  onTicketCreated,
}: CreateTicketModalProps) {
  const [category, setCategory] = useState("Billing & Payments");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  const categories = [
    { title: "Billing & Payments", desc: "Wallet, top up, withdrawal, PayLater" },
    { title: "SIM Issues", desc: "Activation, renewal, swap, connectivity" },
    { title: "ZeroLimit SIM", desc: "Data balance, top up, SIM not working" },
    { title: "Orders & Delivery", desc: "Marketplace, tracking, returns" },
    { title: "Account & Security", desc: "Login, PIN, KYC, profile" },
    { title: "Other", desc: "Something else entirely" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    onTicketCreated?.();
    alert("Support ticket created! A support agent will respond shortly.");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Create Support Ticket"
      description="Describe your issue and we'll help"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* WHAT'S THIS ABOUT? Category Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            WHAT'S THIS ABOUT?
          </label>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {categories.map((cat) => {
              const isSelected = category === cat.title;
              return (
                <div
                  key={cat.title}
                  onClick={() => setCategory(cat.title)}
                  className={`cursor-pointer rounded-2xl p-3 border text-xs transition space-y-1 ${
                    isSelected
                      ? "border-[#2563EB] bg-[#EFF4F8]"
                      : "border-[#E2ECF6] bg-white hover:border-[#2563EB]"
                  }`}
                >
                  <div className="flex size-7 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB] mb-1">
                    ●
                  </div>
                  <h4 className="font-bold text-[#0F152A]">{cat.title}</h4>
                  <p className="text-[10px] text-[#8C909B]">{cat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subject Input */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-bold text-[#0F152A]">
            <label>Subject (required)</label>
            <span className="text-[10px] text-[#8C909B] font-normal">
              {subject.length}/100
            </span>
          </div>
          <input
            type="text"
            required
            maxLength={100}
            placeholder="Brief summary of your issue"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Description Textarea */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">
            Description (required)
          </label>
          <textarea
            rows={3}
            required
            placeholder="Describe your issue in detail. Include any error messages, transaction references, or steps to reproduce..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white p-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Related Reference Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">
            Related reference (optional)
          </label>
          <input
            type="text"
            placeholder="e.g. TXN-2026-008472 or ORD-2026-00847"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Priority Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F152A]">Priority</label>
          <div className="flex items-center gap-2">
            {(["Low", "Medium", "High"] as const).map((p) => {
              const isSelected = priority === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`rounded-full px-5 py-1.5 text-xs font-bold transition ${
                    isSelected
                      ? "border border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                      : "border border-[#E2ECF6] bg-white text-[#8C909B] hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-[#8C909B]">
            Select High if your wallet or account is at risk
          </p>
        </div>

        {/* File Dropzone */}
        <div className="rounded-2xl border-2 border-dashed border-[#E2ECF6] bg-[#F8FAFC] p-4 text-center space-y-1 cursor-pointer hover:border-[#2563EB]">
          <Upload className="mx-auto size-5 text-[#8C909B]" />
          <p className="text-xs font-bold text-[#0F152A]">Attach screenshots or files</p>
          <p className="text-[10px] text-[#8C909B]">
            JPG, PNG, PDF · Max 5MB each · Up to 3 files
          </p>
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
            Submit Ticket
          </button>
        </div>
      </form>
    </AppModal>
  );
}
