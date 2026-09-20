import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ReportIssueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobRef?: string;
  onSubmitSuccess?: () => void;
}

export function ReportIssueModal({
  open,
  onOpenChange,
  jobRef = "JOB-2026-00847",
  onSubmitSuccess,
}: ReportIssueModalProps) {
  const [issueType, setIssueType] = useState<string>("Site inaccessible");
  const [details, setDetails] = useState<string>("");

  const issueTypes = [
    "Site inaccessible",
    "Missing equipment",
    "Client unavailable",
    "Danger / Hazard on site",
    "Specification mismatch",
    "Other issue",
  ];

  const handleSubmit = () => {
    onOpenChange(false);
    onSubmitSuccess?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      title="Report Issue"
      description={`${jobRef} · Flag to Super Admin`}
      footer={
        <div className="flex w-full items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-[#EF4444] px-5 py-2 text-xs font-bold text-white hover:bg-[#DC2626]"
          >
            Submit Issue
          </button>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-xs">
        {/* Issue Type Selector */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Select Issue Type
          </label>
          <div className="mt-2 space-y-1.5">
            {issueTypes.map((type) => (
              <label
                key={type}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 transition ${
                  issueType === type
                    ? "border-[#EF4444] bg-[#FFF7F8] text-[#B91C1C] font-bold"
                    : "border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                }`}
              >
                <span>{type}</span>
                <input
                  type="radio"
                  name="issueType"
                  checked={issueType === type}
                  onChange={() => setIssueType(type)}
                  className="accent-[#EF4444]"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Details Textarea */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#66738C]">
            Describe the problem
          </label>
          <textarea
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Provide relevant details so Super Admin can assist promptly..."
            className="mt-1.5 w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs text-[#0F152A] outline-none transition focus:border-[#EF4444] focus:bg-white"
          />
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-[#FFF7F8] p-3 text-xs text-[#B91C1C]">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-[#EF4444]" />
          <span>
            Urgent issues are reviewed within 2 hours. You will receive an SMS response from the admin desk.
          </span>
        </div>
      </div>
    </AppModal>
  );
}
