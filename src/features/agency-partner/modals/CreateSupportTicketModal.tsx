import { useState } from "react";
import { Paperclip } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface TicketFormData {
  category: string;
  subject: string;
  description: string;
  reference?: string;
  priority: "Low" | "Medium" | "High";
  attachment?: File | null;
}

interface CreateSupportTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitTicket?: (data: TicketFormData) => void;
}

export function CreateSupportTicketModal({
  open,
  onOpenChange,
  onSubmitTicket,
}: CreateSupportTicketModalProps) {
  const categories = [
    "SIM Activation",
    "Stock",
    "Payout",
    "Account",
    "Commission",
    "Other",
  ];

  const [selectedCategory, setSelectedCategory] = useState("SIM Activation");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      alert("Please fill in both Subject and Description fields.");
      return;
    }

    onSubmitTicket?.({
      category: selectedCategory,
      subject,
      description,
      reference,
      priority,
      attachment: selectedFile,
    });

    onOpenChange(false);
    // reset form
    setSubject("");
    setDescription("");
    setReference("");
    setPriority("Medium");
    setSelectedFile(null);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Create Support Ticket"
      description="We will get back to you within 24 hours"
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* ISSUE CATEGORY */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            ISSUE CATEGORY
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    isSelected
                      ? "bg-[#2563EB] text-white shadow-xs"
                      : "bg-white border border-[#E2ECF6] text-[#0F152A] hover:border-[#2563EB] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1">
          <label className="font-extrabold text-[#0F152A]">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief summary of your issue"
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F152A] placeholder:text-[#8C909B] focus:border-[#2563EB] focus:outline-hidden"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="font-extrabold text-[#0F152A]">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe in detail what happened"
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F152A] placeholder:text-[#8C909B] focus:border-[#2563EB] focus:outline-hidden resize-none"
          />
        </div>

        {/* Related reference */}
        <div className="space-y-1">
          <label className="font-extrabold text-[#0F152A]">
            Related reference
          </label>
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="SIM number, activation ref, payout ref"
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#0F152A] placeholder:text-[#8C909B] focus:border-[#2563EB] focus:outline-hidden"
          />
        </div>

        {/* PRIORITY */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            PRIORITY
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {(["Low", "Medium", "High"] as const).map((p) => {
              const isSelected = priority === p;
              return (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`rounded-xl py-2.5 text-xs text-center transition ${
                    isSelected
                      ? "border-2 border-[#2563EB] bg-[#EFF4F8] text-[#2563EB] font-extrabold"
                      : "border border-[#E2ECF6] bg-white text-[#66738C] font-semibold hover:border-slate-300"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* File Attachment Dropzone */}
        <div className="relative border-2 border-dashed border-[#E2ECF6] bg-[#F8FAFC] rounded-2xl p-4 text-center hover:border-[#2563EB] transition">
          <input
            type="file"
            id="ticket-file-upload"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />
          <label
            htmlFor="ticket-file-upload"
            className="cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold text-[#66738C]"
          >
            <Paperclip className="size-4 text-[#2563EB]" />
            <span className="text-[#2563EB] font-bold hover:underline">
              {selectedFile ? selectedFile.name : "Attach screenshots"}
            </span>
            <span className="text-[#8C909B]">(optional)</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-[#E2ECF6] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </AppModal>
  );
}
