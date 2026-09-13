import { useState } from "react";
import { Check, Info, Trash2, UploadCloud, FileText } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface UploadKycDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documentTitle?: string;
  onSubmitSuccess?: (docTitle: string) => void;
}

export function UploadKycDocumentModal({
  open,
  onOpenChange,
  documentTitle = "Proof of Address",
  onSubmitSuccess,
}: UploadKycDocumentModalProps) {
  const [address, setAddress] = useState("23 Allen Avenue, Ikeja, Lagos");
  const [file, setFile] = useState<{ name: string; size: string } | null>({
    name: "Utility_Bill.pdf",
    size: "2.4MB",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      onSubmitSuccess?.(documentTitle);
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Upload Document"
      description={documentTitle}
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Requirement Checklist Card (Matching Image 2) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2 text-xs">
          <div>
            <h4 className="font-extrabold text-[#0F152A] text-xs">{documentTitle}</h4>
            <p className="text-[11px] text-[#66738C] font-medium">
              Must be dated within last 3 months
            </p>
          </div>

          <div className="space-y-1.5 pt-1 font-bold text-[#0F152A]">
            <div className="flex items-center gap-2">
              <Check className="size-4 shrink-0 text-[#10B981] stroke-[3]" />
              <span>Utility bill (electricity, water, waste)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-4 shrink-0 text-[#10B981] stroke-[3]" />
              <span>Bank statement or credit card statement</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-4 shrink-0 text-[#10B981] stroke-[3]" />
              <span>Government-issued formal letter</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-4 shrink-0 text-[#10B981] stroke-[3]" />
              <span>Signed tenancy or lease agreement</span>
            </div>
          </div>
        </div>

        {/* File Dropzone / Upload Area (Matching Image 2) */}
        {!file ? (
          <div
            onClick={() =>
              setFile({ name: "Utility_Bill.pdf", size: "2.4MB" })
            }
            className="rounded-2xl border-2 border-dashed border-[#E2ECF6] bg-[#F8FAFC] p-6 text-center cursor-pointer hover:border-[#2563EB] transition space-y-2"
          >
            <UploadCloud className="mx-auto size-8 text-[#8C909B]" />
            <div>
              <p className="font-extrabold text-[#0F152A] text-xs">
                Drop file here or browse
              </p>
              <p className="text-[11px] text-[#8C909B]">
                PDF, JPG or PNG · Max 10MB
              </p>
            </div>
          </div>
        ) : (
          /* Uploaded File Card (Matching Image 2) */
          <div className="rounded-2xl border border-[#9DF8DA] bg-[#EBFFF8]/70 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-[#10B981]" />
              <div>
                <h5 className="font-extrabold text-[#0F152A] text-xs">
                  {file.name}
                </h5>
                <p className="text-[10px] text-[#66738C] font-mono">{file.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-4 text-[#10B981] stroke-[3]" />
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-[#66738C] hover:text-[#EF4444] transition p-1"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        )}

        {/* Current Address Confirmation Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            CONFIRM YOUR CURRENT ADDRESS
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB] font-bold"
          />
        </div>

        {/* Info Box (Matching Image 2) */}
        <div className="rounded-2xl border border-[#2563EB]/20 bg-[#EFF4F8] p-3 text-xs text-[#2563EB] font-medium flex items-center gap-2">
          <Info className="size-4 shrink-0 text-[#2563EB]" />
          <span>
            Document is reviewed within 24-48 hours. You will be notified when approved.
          </span>
        </div>

        {/* Action Buttons (Matching Image 2) */}
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
              type="submit"
              disabled={loading || !file}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Submit Document"}
            </button>
          </div>
        </div>
      </form>
    </AppModal>
  );
}
