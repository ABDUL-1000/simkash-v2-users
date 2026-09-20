import { AlertTriangle, Send } from "lucide-react";

interface RmBonusAtRiskCardProps {
  onRemindAtRisk: () => void;
}

export function RmBonusAtRiskCard({ onRemindAtRisk }: RmBonusAtRiskCardProps) {
  const atRiskScs = [
    { name: "Kwara State", sc: "Kayode Ajayi", progress: 48, gap: 520 },
    { name: "Osun State", sc: "Folake Adeleke", progress: 52, gap: 380 },
    { name: "Ondo State", sc: "Segun Akintola", progress: 54, gap: 320 },
  ];

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: "#FFFBEB",
        borderColor: "#FED7AA",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950">
              At Risk Alert (3 SCs)
            </h4>
            <p className="text-[11px] font-medium text-amber-800">
              Currently pacing &lt;60% of their individual target
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {atRiskScs.map((item) => (
          <div
            key={item.name}
            className="p-2 rounded-xl bg-white/90 border border-amber-200/80 flex items-center justify-between text-xs"
          >
            <div>
              <span className="font-bold text-amber-950 block">{item.name}</span>
              <span className="text-[10px] text-amber-800">{item.sc}</span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-amber-900 block">{item.progress}% achieved</span>
              <span className="text-[10px] text-red-600 font-semibold">{item.gap} sims gap</span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onRemindAtRisk}
        className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 flex items-center justify-center gap-1.5"
        style={{ backgroundColor: "#D97706" }}
      >
        <Send className="w-3.5 h-3.5" />
        <span>Send Reminder to All 3</span>
      </button>
    </div>
  );
}
