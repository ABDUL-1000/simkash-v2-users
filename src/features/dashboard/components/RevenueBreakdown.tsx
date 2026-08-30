import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueBreakdownData } from "../dashboard.data";

export function RevenueBreakdown() {
  return (
    <Card className="h-full rounded-2xl border-[#E2ECF8] bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-4 pt-5 sm:px-6">
        <CardTitle className="text-sm font-bold text-[#0F1F36]">Revenue Breakdown</CardTitle>
        <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">Full report</button>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5 sm:px-6">
        <div className="space-y-4">
          {revenueBreakdownData.map((item) => (
            <div key={item.key} className="flex items-center gap-3">
              <span className="size-3 shrink-0 rounded-md" style={{ backgroundColor: item.color }} />
              <span className="min-w-0 flex-1 text-sm text-[#0F1F36]">{item.label}</span>
              <span className="text-sm font-bold text-[#0F1F36]">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="h-px bg-[#E2ECF8]" />
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-[#64748B]">Pending Payouts</span>
            <span className="font-bold text-[#F59E0B]">₦8.7M</span>
          </div>
          <div className="flex items-start justify-between gap-3 text-sm">
            <span className="text-[#64748B]">Referral Commissions Queued</span>
            <span className="shrink-0 font-bold text-[#0F1F36]">₦600K</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
