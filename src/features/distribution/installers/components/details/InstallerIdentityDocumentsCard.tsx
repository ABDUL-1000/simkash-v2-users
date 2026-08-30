type DocItem = {
  label: string;
  status: "Verified" | "Submitted" | "Pending";
};

const DOCS: DocItem[] = [
  { label: "NIN Verification", status: "Verified" },
  { label: "BVN Verification", status: "Verified" },
  { label: "Guarantor Details", status: "Submitted" },
  { label: "Business Insurance", status: "Pending" },
  { label: "Background Check", status: "Verified" },
  { label: "ID Document", status: "Verified" },
];

function DocBadge({ status }: { status: DocItem["status"] }) {
  if (status === "Verified" || status === "Submitted") {
    return (
      <span className="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-bold text-[#059669]">
        {status}
      </span>
    );
  }
  return (
    <span className="rounded-full border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-0.5 text-[11px] font-bold text-[#D97706]">
      {status}
    </span>
  );
}

export function InstallerIdentityDocumentsCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Identity & Documents</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
        {DOCS.map((doc, idx) => (
          <div key={doc.label} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <span className="text-[#64748B]">{doc.label}</span>
            <DocBadge status={doc.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
