import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ReportIssueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simNumber?: string;
}

export function ReportIssueModal({
  open,
  onOpenChange,
  simNumber = "07022222222",
}: ReportIssueModalProps) {
  const [category, setCategory] = useState("network");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSubmitted ? "Issue Reported" : "Report an Issue"}
      description={isSubmitted ? "Our support team is reviewing your report" : `SIM: ${simNumber}`}
      size="md"
    >
      {!isSubmitted ? (
        <div className="space-y-4 pt-1">
          <div className="flex items-start gap-2.5 rounded-2xl bg-[#FFF7F8] p-3.5 text-xs text-[#EF4444] border border-[#F7D2D7]">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <p>
              Experiencing technical issues with your SIM card? Submit a report and a Simkash engineer will investigate within 2 hours.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Issue Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none"
            >
              <option value="network">No Network / No Signal</option>
              <option value="data">Data Bundle Not Credited</option>
              <option value="activation">SIM Activation Delay</option>
              <option value="hardware">Damaged SIM Card</option>
              <option value="other">Other Issue</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Describe the Problem
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about what happened..."
              className="w-full rounded-2xl border border-[#E2ECF6] p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!description}
              className="rounded-xl bg-[#EF4444] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-600 disabled:opacity-50"
            >
              Submit Report
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 pt-2 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981] mx-auto">
            ✓
          </div>
          <h4 className="text-sm font-bold text-[#0F152A]">Ticket #TK-2026-9482</h4>
          <p className="text-xs text-[#8C909B]">
            Your issue report has been submitted successfully. A ticket has been created and our team will get back to you via email/SMS shortly.
          </p>
          <div className="pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}
