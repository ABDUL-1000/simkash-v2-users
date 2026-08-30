import { Check } from "lucide-react";

type Certification = {
  id: string;
  title: string;
  badgeLabel: string;
  badgeBg: string;
  badgeColor: string;
  badgeBorder: string;
  level: string;
  issuer: string;
};

const CERTS: Certification[] = [
  { id: "1", title: "CCTV Installation", badgeLabel: "Verified", badgeBg: "#EFF6FF", badgeColor: "#2563EB", badgeBorder: "#BFDBFE", level: "CCTV Professional Level 3", issuer: "NTC Nigeria" },
  { id: "2", title: "Solar Installation", badgeLabel: "Verified", badgeBg: "#FFFBEB", badgeColor: "#D97706", badgeBorder: "#FDE68A", level: "Solar PV Systems Installer", issuer: "NASENI" },
  { id: "3", title: "Electrical Works", badgeLabel: "Verified", badgeBg: "#F3E8FF", badgeColor: "#9333EA", badgeBorder: "#E9D5FF", level: "NCEE Electrical Certification", issuer: "COREN" },
  { id: "4", title: "First Aid", badgeLabel: "Verified", badgeBg: "#ECFDF5", badgeColor: "#059669", badgeBorder: "#A7F3D0", level: "Basic First Aid & Emergency", issuer: "Red Cross Nigeria" },
];

export function InstallerSkillsCertificationsCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Skills & Certifications</h3>

      <div className="space-y-4 divide-y divide-[#F1F5F9] text-xs">
        {CERTS.map((c, idx) => (
          <div key={c.id} className={`flex items-start gap-3 ${idx > 0 ? "pt-4" : ""}`}>
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ECFDF5] text-[#059669]">
              <Check className="size-4 stroke-[3]" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0F172A] text-sm">{c.title}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                  style={{
                    backgroundColor: c.badgeBg,
                    color: c.badgeColor,
                    border: `1px solid ${c.badgeBorder}`,
                  }}
                >
                  {c.badgeLabel}
                </span>
              </div>

              <p className="mt-0.5 text-xs text-[#64748B]">{c.level}</p>
              <p className="text-[11px] text-[#94A3B8]">Issued by: {c.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
