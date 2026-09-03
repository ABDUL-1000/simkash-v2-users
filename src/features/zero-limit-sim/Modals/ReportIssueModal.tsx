import { useState } from "react";
import { AlertCircle, AlertTriangle, Edit3, HelpCircle, RefreshCw, WifiOff } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";

interface ReportIssueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simNumber?: string;
}

export function ReportIssueModal({
  open,
  onOpenChange,
  simNumber = "0812 345 6789",
}: ReportIssueModalProps) {
  const [category, setCategory] = useState("data_not_added");
  const [topUpRef, setTopUpRef] = useState("TU-ZL-2026-00847");
  const [details, setDetails] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const issueCategories = [
    {
      id: "data_not_added",
      title: "Data Not Added",
      desc: "Topped up but data didn't reflect",
      icon: AlertTriangle,
      color: "text-[#EF4444] bg-[#FFF7F8]",
    },
    {
      id: "sim_inactive",
      title: "SIM Inactive",
      desc: "SIM stopped working or responding",
      icon: WifiOff,
      color: "text-[#66738C] bg-[#EFF4F8]",
    },
    {
      id: "balance_wrong",
      title: "Balance Wrong",
      desc: "App shows incorrect data balance",
      icon: RefreshCw,
      color: "text-[#2563EB] bg-[#EFF4F8]",
    },
    {
      id: "api_sync_error",
      title: "API Sync Error",
      desc: "Sync with MTN API keeps failing",
      icon: AlertCircle,
      color: "text-[#F59E0B] bg-[#FFFBEB]",
    },
    {
      id: "wrong_sim",
      title: "Wrong SIM Linked",
      desc: "Incorrect number linked to account",
      icon: Edit3,
      color: "text-[#66738C] bg-[#EFF4F8]",
    },
    {
      id: "other",
      title: "Other Issue",
      desc: "Something else is wrong",
      icon: HelpCircle,
      color: "text-[#66738C] bg-[#EFF4F8]",
    },
  ];

  const handleSubmitReport = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "Ticket Ref", value: "#TK-2026-9482" },
    { label: "SIM Number", value: `${simNumber} (MTN)` },
    { label: "Issue Category", value: issueCategories.find((c) => c.id === category)?.title || "Data Not Added" },
    { label: "Top-Up Ref", value: topUpRef },
    { label: "Response Time", value: "Within 2 hours" },
  ];

  return (
    <>
      <AppModal
        open={open && !isSuccess}
        onOpenChange={handleClose}
        title="Report SIM Issue"
        description={`${simNumber} · MTN Nigeria`}
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {issueCategories.map((item) => {
              const isSelected = category === item.id;
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  className={`cursor-pointer flex items-start gap-3 rounded-2xl border p-3.5 transition ${
                    isSelected
                      ? "border-[#EF4444] bg-[#FFF7F8] ring-1 ring-[#EF4444]"
                      : "border-[#E2ECF6] bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`flex size-9 items-center justify-center rounded-xl shrink-0 ${item.color}`}
                  >
                    <IconComp className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F152A]">{item.title}</h4>
                    <p className="text-[10px] text-[#8C909B]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top-up Reference Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Top-up reference (if applicable)
            </label>
            <input
              type="text"
              value={topUpRef}
              onChange={(e) => setTopUpRef(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Additional Details Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Additional Details
            </label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the issue in more detail..."
              className="w-full rounded-2xl border border-[#E2ECF6] p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Footer Actions */}
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
              onClick={handleSubmitReport}
              className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Submit Report
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && isSuccess}
        onOpenChange={handleClose}
        title="Issue Report Submitted!"
        subtitle="Our technical team is reviewing your ticket"
        details={successDetails}
        walletBalanceText="SimKash Support Ticket"
        doneButtonText="Done"
        onDone={handleClose}
      />
    </>
  );
}
