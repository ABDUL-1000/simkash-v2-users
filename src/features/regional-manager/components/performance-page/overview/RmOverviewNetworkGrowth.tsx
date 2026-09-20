import { Users2, ArrowUpRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { AP_GROWTH_TREND } from "../../../data/regional-manager-performance.data";

export function RmOverviewNetworkGrowth() {
  const points = AP_GROWTH_TREND;
  const minVal = 170;
  const maxVal = 260;
  const range = maxVal - minVal;

  // Compute SVG polyline points for 240x80 viewBox
  const width = 260;
  const height = 90;
  const paddingX = 15;
  const paddingY = 12;

  const svgPoints = points.map((p, index) => {
    const x = paddingX + (index / (points.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((p.aps - minVal) / range) * (height - paddingY * 2);
    return `${x},${y}`;
  });

  const polylineStr = svgPoints.join(" ");

  // Area under curve
  const areaPoints = [
    `${paddingX},${height - paddingY}`,
    ...svgPoints,
    `${width - paddingX},${height - paddingY}`,
  ].join(" ");

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            AP Network Growth
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Active Aggregation Points expansion
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.greens.light }}
        >
          <Users2 className="w-3.5 h-3.5" style={{ color: APP_COLORS.greens.secondary }} />
        </div>
      </div>

      {/* Main KPI */}
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-black" style={{ color: APP_COLORS.texts.primary }}>
            247 APs
          </span>
          <span className="text-xs text-slate-400 ml-1">/ 260 total</span>
        </div>
        <span
          className="px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-0.5"
          style={{
            backgroundColor: APP_COLORS.greens.light,
            color: APP_COLORS.greens.secondary,
          }}
        >
          <ArrowUpRight className="w-2.5 h-2.5" /> +37.2% H1
        </span>
      </div>

      {/* SVG Chart */}
      <div className="w-full bg-slate-50/60 rounded-xl p-2 border" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20 overflow-visible">
          <defs>
            <linearGradient id="apGrowthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Fill Area */}
          <polygon points={areaPoints} fill="url(#apGrowthGrad)" />

          {/* Line */}
          <polyline
            points={polylineStr}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dots */}
          {points.map((p, idx) => {
            const x = paddingX + (idx / (points.length - 1)) * (width - paddingX * 2);
            const y = height - paddingY - ((p.aps - minVal) / range) * (height - paddingY * 2);
            const isLast = idx === points.length - 1;

            return (
              <g key={idx}>
                <circle
                  cx={x}
                  cy={y}
                  r={isLast ? 4 : 3}
                  fill={isLast ? "#10B981" : "#FFFFFF"}
                  stroke="#10B981"
                  strokeWidth="2"
                />
                <text
                  x={x}
                  y={height - 2}
                  fontSize="8"
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontWeight="600"
                >
                  {p.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] pt-1" style={{ color: APP_COLORS.texts.slate }}>
        <span>Retention Rate: <strong className="text-slate-800">95.0%</strong></span>
        <span>Avg AP Output: <strong className="text-slate-800">60.1 sims</strong></span>
      </div>
    </div>
  );
}
