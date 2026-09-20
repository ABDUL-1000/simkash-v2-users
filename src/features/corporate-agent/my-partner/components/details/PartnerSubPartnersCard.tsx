import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { appPaths } from "@/app/router/paths";

type SubPartner = {
  id: string;
  rank: string;
  name: string;
  acts: string;
  status: "On Target" | "At Risk" | "Active";
};

const SUB_PARTNERS: SubPartner[] = [
  { id: "1", rank: "#1", name: "Aminat Okafor", acts: "124 acts", status: "On Target" },
  { id: "2", rank: "#2", name: "Chidi Eze", acts: "98 acts", status: "On Target" },
  { id: "3", rank: "#3", name: "Glory Effah", acts: "45 acts", status: "At Risk" },
  { id: "4", rank: "#4", name: "Kola Ibrahim", acts: "38 acts", status: "Active" },
  { id: "5", rank: "#5", name: "Ngozi Adeyemi", acts: "22 acts", status: "Active" },
];

function StatusBadge({ status }: { status: SubPartner["status"] }) {
  let bg = "#ECFDF5";
  let text = "#059669";

  if (status === "On Target") {
    bg = "#EFF6FF";
    text = "#2563EB";
  } else if (status === "At Risk") {
    bg = "#FEF3C7";
    text = "#D97706";
  }

  return (
    <span
      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold"
      style={{ backgroundColor: bg, color: text }}
    >
      <span className="size-1 rounded-full" style={{ backgroundColor: text }} />
      {status}
    </span>
  );
}

export function PartnerSubPartnersCard() {
  const navigate = useNavigate();
  const { partnerId } = useParams();

  const handleViewAll = () => {
    navigate(appPaths.subPartners(partnerId || "1").path);
  };

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Sub-Partners (63)</h3>
        <button
          type="button"
          onClick={handleViewAll}
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          <span>View all</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="space-y-3.5 divide-y divide-[#F1F5F9] text-xs">
        {SUB_PARTNERS.map((sp, idx) => (
          <div key={sp.id} className={`flex items-center justify-between ${idx > 0 ? "pt-3.5" : ""}`}>
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-[#94A3B8]">{sp.rank}</span>
              <span className="font-bold text-[#0F172A]">{sp.name}</span>
              <span className="text-[#64748B]">{sp.acts}</span>
              <StatusBadge status={sp.status} />
            </div>

            <button
              type="button"
              onClick={handleViewAll}
              className="font-bold text-[#2563EB] hover:underline"
            >
              View
            </button>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="rounded-2xl bg-[#F8FAFC] p-3 text-xs space-y-2">
        <button
          type="button"
          onClick={handleViewAll}
          className="text-xs font-bold text-[#2563EB] hover:underline text-left"
        >
          + 58 more sub-partners
        </button>
        <div className="grid grid-cols-4 text-center divide-x divide-[#E2E8F0] pt-1">
          <div>
            <p className="font-extrabold text-[#0F172A]">63</p>
            <p className="text-[10px] text-[#64748B]">Total</p>
          </div>
          <div>
            <p className="font-extrabold text-[#2563EB]">41</p>
            <p className="text-[10px] text-[#64748B]">On Target</p>
          </div>
          <div>
            <p className="font-extrabold text-[#D97706]">15</p>
            <p className="text-[10px] text-[#64748B]">At Risk</p>
          </div>
          <div>
            <p className="font-extrabold text-[#64748B]">7</p>
            <p className="text-[10px] text-[#64748B]">Inactive</p>
          </div>
        </div>
      </div>
    </div>
  );
}
