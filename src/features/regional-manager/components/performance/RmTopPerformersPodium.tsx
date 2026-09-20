import { Trophy, Medal } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmTopPerformersPodium() {
  return (
    <div className="space-y-3">
      <h2
        className="text-sm font-bold tracking-tight sm:text-base"
        style={{ color: APP_COLORS.texts.primary }}
      >
        Top Performers
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-end">
        {/* Rank 2: Fatima Abdullahi (Kaduna) */}
        <div
          className="flex flex-col items-center rounded-2xl border p-5 text-center shadow-xs transition hover:shadow-md order-2 md:order-1"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          {/* Medal */}
          <div
            className="flex size-9 items-center justify-center rounded-full mb-2"
            style={{
              backgroundColor: APP_COLORS.blues.surfaceLight,
              color: APP_COLORS.texts.slate,
            }}
          >
            <Medal className="size-5" />
          </div>

          {/* Avatar */}
          <div
            className="flex size-11 items-center justify-center rounded-full text-xs font-black mb-1.5"
            style={{
              backgroundColor: APP_COLORS.blues.surfaceLight,
              color: APP_COLORS.blues.interactiveCta,
            }}
          >
            FA
          </div>

          <h3 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Fatima Abdullahi
          </h3>
          <p className="text-xs" style={{ color: APP_COLORS.texts.slate }}>
            Kaduna
          </p>

          <div className="my-2.5">
            <span className="text-2xl font-black block tracking-tight" style={{ color: APP_COLORS.texts.primary }}>
              1,204
            </span>
            <span className="text-[11px]" style={{ color: APP_COLORS.texts.slate }}>
              activations
            </span>
          </div>

          <div className="space-y-1">
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{
                backgroundColor: APP_COLORS.greens.light,
                color: APP_COLORS.greens.green,
              }}
            >
              On Track
            </span>
            <p className="text-xs font-bold" style={{ color: APP_COLORS.greens.green }}>
              +₦23,052
            </p>
          </div>
        </div>

        {/* Rank 1 (Center): Aminat Okafor (Lagos) - Premium Hero Card */}
        <div
          className="flex flex-col items-center rounded-3xl p-6 text-center shadow-lg transition hover:scale-[1.01] order-1 md:order-2 border"
          style={{
            backgroundColor: APP_COLORS.blues.primary,
            borderColor: "#334155",
            minHeight: "260px",
          }}
        >
          {/* Gold Trophy */}
          <div className="flex size-10 items-center justify-center rounded-full bg-amber-400/20 text-amber-400 mb-2">
            <Trophy className="size-5 stroke-[2.5]" />
          </div>

          {/* Avatar */}
          <div
            className="flex size-12 items-center justify-center rounded-full text-sm font-black mb-1.5 ring-2 ring-amber-400"
            style={{
              backgroundColor: APP_COLORS.blues.secondary,
              color: APP_COLORS.texts.whiteFixed,
            }}
          >
            AO
          </div>

          <h3 className="text-base font-bold text-white">
            Aminat Okafor
          </h3>
          <p className="text-xs text-slate-300">
            Lagos
          </p>

          <div className="my-3">
            <span className="text-3xl font-black block tracking-tight text-white">
              1,847
            </span>
            <span className="text-xs text-slate-400">
              activations
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-cyan-400">
              +₦35,395 commission
            </p>
            <div className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
              <span>Bonus: Achieved 🏆</span>
            </div>
          </div>
        </div>

        {/* Rank 3: Kola Ibrahim (Oyo) */}
        <div
          className="flex flex-col items-center rounded-2xl border p-5 text-center shadow-xs transition hover:shadow-md order-3"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          {/* Medal */}
          <div
            className="flex size-9 items-center justify-center rounded-full mb-2"
            style={{
              backgroundColor: APP_COLORS.ambers.light,
              color: APP_COLORS.ambers.secondary,
            }}
          >
            <Medal className="size-5" />
          </div>

          {/* Avatar */}
          <div
            className="flex size-11 items-center justify-center rounded-full text-xs font-black mb-1.5"
            style={{
              backgroundColor: APP_COLORS.blues.surfaceLight,
              color: APP_COLORS.blues.interactiveCta,
            }}
          >
            KI
          </div>

          <h3 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Kola Ibrahim
          </h3>
          <p className="text-xs" style={{ color: APP_COLORS.texts.slate }}>
            Oyo
          </p>

          <div className="my-2.5">
            <span className="text-2xl font-black block tracking-tight" style={{ color: APP_COLORS.texts.primary }}>
              1,123
            </span>
            <span className="text-[11px]" style={{ color: APP_COLORS.texts.slate }}>
              activations
            </span>
          </div>

          <div className="space-y-1">
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold"
              style={{
                backgroundColor: APP_COLORS.greens.light,
                color: APP_COLORS.greens.green,
              }}
            >
              On Track
            </span>
            <p className="text-xs font-bold" style={{ color: APP_COLORS.greens.green }}>
              +₦21,501
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RmTopPerformersPodium;
