import { useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { appPaths } from "@/app/router/paths";

type JobItem = {
  id: string;
  jobCode: string;
  badgeLabel: string;
  badgeBg: string;
  badgeColor: string;
  badgeBorder: string;
  location: string;
  date: string;
  rating: string;
  amount: string;
};

const JOBS: JobItem[] = [
  { id: "1", jobCode: "JOB-2026-00847", badgeLabel: "CCTV Installation", badgeBg: "#EFF6FF", badgeColor: "#2563EB", badgeBorder: "#BFDBFE", location: "Lagos Island, Lagos", date: "Jun 28", rating: "5.0", amount: "₦40,000" },
  { id: "2", jobCode: "JOB-2026-00791", badgeLabel: "Solar Installation", badgeBg: "#FFFBEB", badgeColor: "#D97706", badgeBorder: "#FDE68A", location: "Lekki, Lagos", date: "Jun 22", rating: "5.0", amount: "₦40,000" },
  { id: "3", jobCode: "JOB-2026-00745", badgeLabel: "CCTV Maintenance", badgeBg: "#EFF6FF", badgeColor: "#2563EB", badgeBorder: "#BFDBFE", location: "Garki, Abuja", date: "Jun 15", rating: "4.0", amount: "₦40,000" },
  { id: "4", jobCode: "JOB-2026-00688", badgeLabel: "Solar Installation", badgeBg: "#FFFBEB", badgeColor: "#D97706", badgeBorder: "#FDE68A", location: "Nassarawa, Kano", date: "Jun 8", rating: "5.0", amount: "₦40,000" },
  { id: "5", jobCode: "JOB-2026-00621", badgeLabel: "CCTV Installation", badgeBg: "#EFF6FF", badgeColor: "#2563EB", badgeBorder: "#BFDBFE", location: "Yaba, Lagos", date: "May 30", rating: "4.0", amount: "₦40,000" },
];

export function InstallerJobHistoryCard() {
  const navigate = useNavigate();

  const handleNavigateToJobPool = () => {
    navigate(appPaths.jobPool);
  };

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Job History</h3>
        <button
          type="button"
          onClick={handleNavigateToJobPool}
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          <span>View all</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="space-y-3.5 divide-y divide-[#F1F5F9] text-xs">
        {JOBS.map((j, idx) => (
          <div key={j.id} className={`${idx > 0 ? "pt-3.5" : ""}`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span
                  onClick={handleNavigateToJobPool}
                  className="font-bold text-[#2563EB] text-xs sm:text-sm hover:underline cursor-pointer"
                >
                  {j.jobCode}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                  style={{
                    backgroundColor: j.badgeBg,
                    color: j.badgeColor,
                    border: `1px solid ${j.badgeBorder}`,
                  }}
                >
                  {j.badgeLabel}
                </span>
              </div>

              <span className="text-[11px] font-medium text-[#64748B]">{j.date}</span>
            </div>

            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-[#64748B]">{j.location}</span>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-0.5 font-bold text-[#D97706]">
                  <Star className="size-3 fill-[#F59E0B] text-[#F59E0B]" />
                  {j.rating}
                </span>
                <strong className="font-bold text-[#059669]">{j.amount}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Summary Box */}
      <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] p-3 text-xs">
        <button
          type="button"
          onClick={handleNavigateToJobPool}
          className="font-bold text-[#2563EB] hover:underline"
        >
          + 62 more jobs
        </button>
        <button
          type="button"
          onClick={handleNavigateToJobPool}
          className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
        >
          <span>View full history</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
