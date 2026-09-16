import { Trophy } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmBonusLeaderboardCard() {
  const leaders = [
    { rank: 1, name: "Aminat Okafor", state: "Lagos", progress: "124.8%", over: "+620 sims over" },
    { rank: 2, name: "Babajide Sanusi", state: "Oyo", progress: "109.0%", over: "+180 sims over" },
    { rank: 3, name: "Chioma Okonkwo", state: "Rivers", progress: "96.5%", over: "On pace for 105%" },
  ];

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Bonus Leaderboard
          </h4>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
          Top Overachievers
        </span>
      </div>

      <div className="space-y-2">
        {leaders.map((leader) => (
          <div
            key={leader.rank}
            className="p-2 rounded-xl border flex items-center justify-between text-xs"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  leader.rank === 1
                    ? "bg-amber-400 text-amber-950"
                    : leader.rank === 2
                    ? "bg-slate-300 text-slate-800"
                    : "bg-amber-700 text-amber-100"
                }`}
              >
                {leader.rank}
              </span>
              <div>
                <span className="font-bold text-slate-900 block">{leader.name}</span>
                <span className="text-[10px] text-slate-400">{leader.state} State</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-emerald-600 block">{leader.progress}</span>
              <span className="text-[10px] text-slate-400">{leader.over}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
