import { Star } from "lucide-react";

type Performer = {
  rank: number;
  name: string;
  jobs: string;
  rating: string;
  badgeBg: string;
  badgeColor: string;
};

const PERFORMERS: Performer[] = [
  { rank: 1, name: "Chinedu Okafor", jobs: "112 jobs", rating: "4.9", badgeBg: "#F59E0B", badgeColor: "#FFFFFF" },
  { rank: 2, name: "Ibrahim Musa", jobs: "82 jobs", rating: "4.7", badgeBg: "#CBD5E1", badgeColor: "#0F172A" },
  { rank: 3, name: "Aisha Bello", jobs: "78 jobs", rating: "4.8", badgeBg: "#FEF3C7", badgeColor: "#D97706" },
];

export function InstallerTopPerformersCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Top Performers</h3>

      <div className="space-y-4 divide-y divide-[#F1F5F9] text-xs">
        {PERFORMERS.map((p, idx) => (
          <div key={p.rank} className={`flex items-center justify-between ${idx > 0 ? "pt-4" : ""}`}>
            <div className="flex items-center gap-3">
              <span
                className="flex size-8 items-center justify-center rounded-full font-extrabold text-sm"
                style={{ backgroundColor: p.badgeBg, color: p.badgeColor }}
              >
                {p.rank}
              </span>
              <div>
                <p className="font-bold text-[#0F172A] text-sm">{p.name}</p>
                <p className="text-xs text-[#94A3B8]">{p.jobs}</p>
              </div>
            </div>

            <span className="flex items-center gap-1 font-bold text-[#D97706] text-xs sm:text-sm">
              {p.rating}
              <Star className="size-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
