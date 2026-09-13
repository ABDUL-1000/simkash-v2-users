import { AlertCircle,  FileText, Info, MapPin, UserCheck, ShieldCheck } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface KycDocItem {
  key: string;
  title: string;
  subtitle: string;
  status: "Verified" | "Pending" | "Not Submitted";
  actionText?: string;
  icon: any;
}

interface KycVerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadDoc?: (docKey: string, title: string) => void;
  onUpdateSuccess?: () => void;
}

export function KycVerificationModal({
  open,
  onOpenChange,
  onUploadDoc,
  onUpdateSuccess,
}: KycVerificationModalProps) {
  const docsList: KycDocItem[] = [
    {
      key: "bvn",
      title: "BVN Verification",
      subtitle: "Bank Verification Number",
      status: "Verified",
      icon: ShieldCheck,
    },
    {
      key: "nin",
      title: "NIN Verification",
      subtitle: "National ID Number",
      status: "Verified",
      icon: ShieldCheck,
    },
    {
      key: "govt-id",
      title: "Government ID",
      subtitle: "National ID, Passport, or Drivers License",
      status: "Verified",
      actionText: "View",
      icon: FileText,
    },
    {
      key: "address",
      title: "Proof of Address",
      subtitle: "Utility bill or bank statement",
      status: "Pending",
      actionText: "Upload",
      icon: MapPin,
    },
    {
      key: "selfie",
      title: "Selfie Verification",
      subtitle: "Photo holding your ID",
      status: "Not Submitted",
      actionText: "Upload",
      icon: UserCheck,
    },
  ];

  const getStatusBadge = (status: KycDocItem["status"]) => {
    switch (status) {
      case "Verified":
        return "bg-[#EBFFF8] text-[#10B981]";
      case "Pending":
        return "bg-[#FFFBEB] text-[#D9990D]";
      case "Not Submitted":
        return "bg-[#F8FAFC] text-[#66738C] border border-[#E2ECF6]";
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="KYC Verification"
      description="Your identity and document status"
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Amber Incomplete Warning Banner (Matching Image 1) */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#D9990D] font-bold flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0 text-[#D9990D]" />
          <span>Incomplete - 1 document pending</span>
        </div>

        {/* Document Status List (Matching Image 1) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6]">
          {docsList.map((doc) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.key}
                className="p-3.5 flex items-center justify-between hover:bg-[#F8FAFC] transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-9 items-center justify-center rounded-full ${
                      doc.status === "Verified"
                        ? "bg-[#EBFFF8] text-[#10B981]"
                        : doc.status === "Pending"
                        ? "bg-[#FFFBEB] text-[#D9990D]"
                        : "bg-[#F8FAFC] text-[#8C909B]"
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0F152A] text-xs">
                      {doc.title}
                    </h4>
                    <p className="text-[11px] text-[#66738C] font-medium">
                      {doc.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${getStatusBadge(
                      doc.status
                    )}`}
                  >
                    {doc.status}
                  </span>
                  {doc.actionText && (
                    <button
                      type="button"
                      onClick={() => onUploadDoc?.(doc.key, doc.title)}
                      className={`text-xs font-bold hover:underline ${
                        doc.status === "Pending"
                          ? "text-[#D9990D]"
                          : "text-[#2563EB]"
                      }`}
                    >
                      {doc.actionText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Callout Box (Matching Image 1) */}
        <div className="rounded-2xl border border-[#2563EB]/20 bg-[#EFF4F8] p-3.5 text-xs text-[#2563EB] font-medium flex items-center gap-2.5">
          <Info className="size-4 shrink-0 text-[#2563EB]" />
          <span>
            Keeping your KYC up to date ensures uninterrupted payouts and higher transaction limits.
          </span>
        </div>

        {/* Action Buttons (Matching Image 1) */}
        <div className="pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onUpdateSuccess?.();
              }}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              Update Documents
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
