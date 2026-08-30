import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { agentDistributionData } from "../dashboard.data";

export function AgentDistribution() {
  return (
    <Card className="h-full rounded-2xl border-[#E2ECF8] bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-4 pt-5 sm:px-6">
        <CardTitle className="text-sm font-bold text-[#0F1F36]">Agent Distribution by Role</CardTitle>
        <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">Manage</button>
      </CardHeader>
      <CardContent className="space-y-5 px-5 pb-5 sm:px-6">
        <div className="space-y-5">
          {agentDistributionData.map((item) => (
            <div key={item.key}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-[#0F1F36]">{item.label}</span>
                <span className="font-bold text-[#0F1F36]">{item.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#E7EFFB]">
                <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="h-px bg-[#E2ECF8]" />
        <div className="grid grid-cols-3 gap-3">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">Suspended</p><p className="mt-2 text-2xl font-bold text-[#EF4444]">3</p></div>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">On PND</p><p className="mt-2 text-2xl font-bold text-[#F59E0B]">17</p></div>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#94A3B8]">Pending Approval</p><p className="mt-2 text-2xl font-bold text-[#2563EB]">34</p></div>
        </div>
      </CardContent>
    </Card>
  );
}
