import { ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { weeklyReviewData } from "../dashboard.data";

export function WeeklyReview() {
  return (
    <Card className="h-full rounded-2xl border-[#E2ECF8] bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-4 pt-5 sm:px-6">
        <CardTitle className="text-sm font-bold text-[#0F1F36]">Weekly Review</CardTitle>
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">WK 25 · Mon – Sat</span>
      </CardHeader>
      <CardContent className="grid gap-3 px-5 pb-5 sm:px-6">
        {weeklyReviewData.map((item) => {
          const negative = item.tone === "negative";
          return (
            <article
              key={item.key}
              className="flex min-h-20 items-center justify-between gap-3 rounded-xl border p-4"
              style={{
                backgroundColor: negative ? "#FFF1F2" : "#F1F6FE",
                borderColor: negative ? "#FECDD3" : "#DCE8F8",
              }}
            >
              <div>
                <p className={negative ? "text-[11px] font-bold uppercase tracking-[0.06em] text-[#B91C1C]" : "text-[11px] font-bold uppercase tracking-[0.06em] text-[#64748B]"}>{item.label}</p>
                <p className={negative ? "mt-2 text-2xl font-bold text-[#EF4444]" : "mt-2 text-2xl font-bold text-[#0F1F36]"}>{item.value}</p>
              </div>
              <span className={negative ? "inline-flex items-center gap-1 rounded-xl bg-[#FEE2E2] px-3 py-2 text-xs font-bold text-[#B91C1C]" : "inline-flex items-center gap-1 rounded-xl bg-[#D1FAE5] px-3 py-2 text-xs font-bold text-[#047857]"}>
                <ArrowUp className="size-4" />
                {item.trend}
              </span>
            </article>
          );
        })}
      </CardContent>
    </Card>
  );
}
