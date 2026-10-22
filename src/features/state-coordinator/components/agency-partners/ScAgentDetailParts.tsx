import type { ReactNode } from "react";
import { AlertTriangle, ArrowRight, BarChart3, CardSim, CheckCircle2, Package, Trophy, TrendingUp, UserPlus } from "lucide-react";
import { useGetAgentCustomers, useGetAgentStockHistory } from "../../api/agents";
import type { ScAgentDetailData } from "../../types/agents";

export function DetailCard({ title, action, children }: { title?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
      {title && <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-extrabold text-[#0F152A]">{title}</h3>
        {action}
      </div>}
      {children}
    </section>
  );
}

function LinkButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="flex items-center gap-1 text-xs font-bold text-[#1E2E4F] hover:underline">{label}<ArrowRight className="size-3" /></button>;
}

/** Top strip: role, stock, customers, activations, bonus, last active. */
export function AgentSummaryBar({ data }: { data: ScAgentDetailData }) {
  const bar = data.summary_bar;
  const cells = [
    { label: "ROLE", value: bar.role, dot: "bg-[#1E2E4F]" },
    { label: "STOCK", value: bar.stock.label, sub: bar.stock.sublabel },
    { label: "CUSTOMERS", value: bar.customers.count.toLocaleString(), sub: "All time" },
    { label: "ACTIVATIONS", value: bar.activations.count.toLocaleString(), sub: "This month" },
    { label: "BONUS", value: bar.bonus.status, dot: "bg-[#7C3AED]" },
    { label: "LAST ACTIVE", value: bar.last_active },
  ];
  return (
    <div className="grid grid-cols-2 rounded-2xl border border-[#E2ECF6] bg-white px-2 py-3 shadow-xs sm:grid-cols-3 lg:grid-cols-6">
      {cells.map((cell, index) => (
        <div key={cell.label} className={`px-4 py-1.5 ${index > 0 ? "lg:border-l lg:border-[#E2ECF6]" : ""}`}>
          <p className="text-[9px] font-extrabold tracking-wider text-[#8C909B]">{cell.label}</p>
          <p className="flex items-center gap-1.5 text-sm font-extrabold text-[#0F152A]">{cell.dot && <span className={`size-1.5 rounded-full ${cell.dot}`} />}{cell.value}</p>
          {cell.sub && <p className="text-[10px] text-[#8C909B]">{cell.sub}</p>}
        </div>
      ))}
    </div>
  );
}

export function ApDetailsCard({ data }: { data: ScAgentDetailData }) {
  const p = data.profile_details;
  const rows: [string, string, string?][] = [
    ["Full Name", p.fullname], ["Phone", p.phone], ["Email", p.email], ["State", p.state], ["LGA", p.lga], ["Address", p.address],
    ["Onboarded By", p.onboarded_by, "text-[#1E2E4F]"], ["Onboarded", p.onboarded_date],
    ["KYC Status", p.kyc_status, /verified/i.test(p.kyc_status) ? "text-[#10B981]" : "text-[#D9990D]"],
    ["Bank", p.bank_name ? `${p.bank_name} · ${p.account_number_masked}` : "—"],
  ];
  return (
    <DetailCard title="AP Details">
      <dl className="divide-y divide-[#E2ECF6] border-t border-[#E2ECF6] text-xs">
        {rows.map(([label, value, tone]) => (
          <div key={label} className="grid grid-cols-[110px_1fr] gap-2 py-2.5">
            <dt className="text-[#8C909B]">{label}</dt>
            <dd className={`break-words font-medium ${tone ?? "text-[#0F152A]"}`}>{value || "—"}</dd>
          </div>
        ))}
      </dl>
    </DetailCard>
  );
}

const STOCK_BARS = ["bg-[#1E2E4F]", "bg-[#10B981]", "bg-[#7C3AED]", "bg-[#F59E0B]"];
export function StockDetailsCard({ data, onDistribute }: { data: ScAgentDetailData; onDistribute: () => void }) {
  const stock = data.stock_details;
  return (
    <DetailCard title="Stock Details">
      <div className="space-y-2.5 border-y border-[#E2ECF6] py-3 text-xs">
        {stock.breakdown.length === 0 && <p className="text-[#8C909B]">No SIMs with this AP.</p>}
        {stock.breakdown.map((item, index) => (
          <div key={item.label} className="grid grid-cols-[80px_36px_1fr] items-center gap-2">
            <span className="text-[#8C909B]">{item.label}</span>
            <span className={`font-black ${item.count === 0 ? "text-[#EF4444]" : "text-[#0F152A]"}`}>{item.count === 0 ? "OUT" : item.count}</span>
            {item.count === 0 ? <span className="flex items-center gap-1 text-[10px] font-bold text-[#EF4444]"><AlertTriangle className="size-3" />Out of stock</span>
              : <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-[#F1F5F9]"><div className={`h-full rounded-full ${STOCK_BARS[index % STOCK_BARS.length]}`} style={{ width: `${Math.min(100, item.percentage)}%` }} /></div>
                <span className="w-8 text-right text-[10px] text-[#8C909B]">{item.percentage}%</span>
              </div>}
          </div>
        ))}
      </div>
      <p className="text-xs font-extrabold text-[#0F152A]">{stock.total_stock_label}</p>
      <div className="space-y-0.5 text-[10px] text-[#8C909B]">
        <p>{stock.received_all_time_text}</p>
        <p>{stock.last_distribution_text}</p>
      </div>
      <button type="button" onClick={onDistribute} className="w-full rounded-xl border border-[#10B981] py-2.5 text-xs font-bold text-[#10B981] hover:bg-[#EBFFF8]">Distribute More</button>
    </DetailCard>
  );
}

const CUSTOMER_DOT: Record<string, string> = { green: "bg-[#10B981]", amber: "bg-[#F59E0B]", orange: "bg-[#F59E0B]", yellow: "bg-[#F59E0B]", red: "bg-[#EF4444]" };
export function CustomersPreviewCard({ agentId, firstName, total, onViewAll }: { agentId: number; firstName: string; total: number; onViewAll: () => void }) {
  const { data, isLoading } = useGetAgentCustomers(agentId, { page: 1, limit: 5 });
  const customers = data?.items ?? [];
  return (
    <DetailCard title={`${firstName}'s Customers (${(data?.total ?? total).toLocaleString()})`} action={<LinkButton label="View All" onClick={onViewAll} />}>
      <div className="divide-y divide-[#E2ECF6] border-t border-[#E2ECF6]">
        {isLoading && <p className="py-4 text-xs text-[#8C909B]">Loading customers…</p>}
        {!isLoading && customers.length === 0 && <p className="py-4 text-xs text-[#8C909B]">No customers yet.</p>}
        {customers.map((customer) => (
          <div key={customer.id} className="flex items-center gap-3 py-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-[#F8FAFC] text-[11px] font-black text-[#0F152A]">{customer.initials}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-extrabold text-[#0F152A]">{customer.name}</p>
              <p className="text-[10px] text-[#8C909B]">{customer.sim_type}</p>
            </div>
            <span title={customer.status} className={`size-2 rounded-full ${CUSTOMER_DOT[customer.status_color] ?? "bg-[#8C909B]"}`} />
          </div>
        ))}
      </div>
      {(data?.total ?? 0) > customers.length && <LinkButton label={`View all ${data?.total.toLocaleString()}`} onClick={onViewAll} />}
    </DetailCard>
  );
}

export function PerformanceCard({ data }: { data: ScAgentDetailData }) {
  const perf = data.performance_this_month;
  const max = Math.max(1, ...perf.daily_activations.map((day) => day.count));
  const tiles = [[perf.activations.toLocaleString(), "Activations"], [perf.customers.toLocaleString(), "Customers"], [String(perf.avg_per_day), "Avg/day"], [perf.commission_formatted, "Commission"]];
  return (
    <DetailCard title="Performance This Month">
      <div className="grid grid-cols-4 gap-2">
        {tiles.map(([value, label]) => (
          <div key={label} className="rounded-xl bg-[#F1F5F9] p-2 text-center">
            <p className="truncate text-lg font-black text-[#0F152A]">{value}</p>
            <p className="text-[9px] text-[#8C909B]">{label}</p>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-[#8C909B]">Daily Activations</p>
      {perf.daily_activations.length === 0 ? <p className="rounded-xl bg-[#F8FAFC] p-4 text-center text-xs text-[#8C909B]">No activations yet this month.</p>
        : <div className="flex h-20 items-end gap-1 rounded-xl bg-[#F8FAFC] p-2">
          {perf.daily_activations.map((day) => (
            <div key={day.day} title={`Day ${day.day}: ${day.count}`} className="flex-1 rounded-sm bg-[#1E2E4F]" style={{ height: `${Math.max(4, (day.count / max) * 100)}%` }} />
          ))}
        </div>}
    </DetailCard>
  );
}

export function BonusTrackerCard({ data, firstName }: { data: ScAgentDetailData; firstName: string }) {
  const bonus = data.bonus_tracker;
  return (
    <DetailCard title={`${firstName}'s Bonus Tracker`}>
      <p className="flex items-center gap-2 rounded-xl bg-[#EBFFF8] px-3 py-2 text-xs font-bold text-[#10B981]"><Trophy className="size-3.5" />{bonus.headline}</p>
      <div className="h-1.5 rounded-full bg-[#F1F5F9]"><div className="h-full rounded-full bg-[#7C3AED]" style={{ width: `${Math.min(100, Math.max(0, bonus.percentage))}%` }} /></div>
      {bonus.bonus_reward && <p className="rounded-xl bg-[#EBFFF8] px-3 py-2 text-[11px] font-bold text-[#10B981]">{bonus.bonus_reward}</p>}
    </DetailCard>
  );
}

export function StockSentCard({ agentId, firstName, onViewAll }: { agentId: number; firstName: string; onViewAll: () => void }) {
  const { data, isLoading } = useGetAgentStockHistory(agentId);
  const items = data?.items ?? [];
  return (
    <DetailCard title={`Stock You Sent to ${firstName}`} action={items.length > 5 ? <LinkButton label="View all" onClick={onViewAll} /> : undefined}>
      <div className="divide-y divide-[#E2ECF6] border-t border-[#E2ECF6]">
        {isLoading && <p className="py-4 text-xs text-[#8C909B]">Loading…</p>}
        {!isLoading && items.length === 0 && <p className="py-4 text-xs text-[#8C909B]">You haven't sent stock to this AP yet.</p>}
        {items.slice(0, 5).map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-2 py-3" title={new Date(item.created_at).toLocaleString()}>
            <div>
              <p className="text-xs font-extrabold text-[#0F152A]">{item.time_ago}</p>
              <p className="text-[10px] text-[#8C909B]">{item.breakdown_text}</p>
            </div>
            <span className="text-xs font-black text-[#10B981]">{item.total_sims} SIMs</span>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}

export function CommissionCard({ data }: { data: ScAgentDetailData }) {
  const c = data.commission;
  const positive = !c.vs_last_month_formatted.trim().startsWith("-");
  return (
    <DetailCard title="Commission from AP">
      <div>
        <p className="text-2xl font-black text-[#0F152A]">{c.current_month_formatted}</p>
        <p className="text-[10px] text-[#8C909B]">{c.subtitle}</p>
      </div>
      <div className="divide-y divide-[#E2ECF6] text-xs">
        <div className="flex justify-between py-2"><span className="flex items-center gap-1.5 text-[#66738C]"><BarChart3 className="size-3.5" />Activation Rate</span><strong className="text-[#10B981]">{c.activation_rate}</strong></div>
        <div className="flex justify-between py-2"><span className="flex items-center gap-1.5 text-[#66738C]"><Trophy className="size-3.5 text-[#7C3AED]" />Bonus Status</span><strong className="text-[#10B981]">{c.bonus_status}</strong></div>
        <div className="flex justify-between py-2"><span className="flex items-center gap-1.5 text-[#66738C]"><TrendingUp className="size-3.5 text-[#10B981]" />vs Last Month</span><strong className={positive ? "text-[#10B981]" : "text-[#EF4444]"}>{c.vs_last_month_formatted}</strong></div>
      </div>
      <div className="space-y-1 rounded-xl bg-[#F8FAFC] p-3 text-xs">
        <div className="flex justify-between"><span className="text-[#8C909B]">Last Month</span><strong className="text-[#0F152A]">{c.last_month_formatted}</strong></div>
        <div className="flex justify-between"><span className="text-[#8C909B]">2 Months Ago</span><strong className="text-[#0F152A]">{c.two_months_ago_formatted}</strong></div>
      </div>
    </DetailCard>
  );
}

const TIMELINE_ICON: Record<string, { icon: typeof CardSim; tone: string }> = {
  sim: { icon: CardSim, tone: "text-[#10B981]" },
  customer: { icon: UserPlus, tone: "text-[#1E2E4F]" },
  stock: { icon: Package, tone: "text-[#F59E0B]" },
  verification: { icon: CheckCircle2, tone: "text-[#10B981]" },
  warning: { icon: AlertTriangle, tone: "text-[#F59E0B]" },
};
export function AccountTimelineCard({ data }: { data: ScAgentDetailData }) {
  return (
    <DetailCard title="Account Timeline">
      {data.account_timeline.length === 0 ? <p className="text-xs text-[#8C909B]">No account activity yet.</p>
        : <ol className="space-y-3">
          {data.account_timeline.map((event, index) => {
            const { icon: Icon, tone } = TIMELINE_ICON[event.icon] ?? TIMELINE_ICON.sim;
            return (
              <li key={`${event.title}-${index}`} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <Icon className={`size-3.5 ${tone}`} />
                  {index < data.account_timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-[#E2ECF6]" />}
                </div>
                <div className="pb-1">
                  <p className="text-xs font-medium text-[#0F152A]">{event.title}</p>
                  <p className="text-[10px] text-[#8C909B]">{event.subtitle}</p>
                </div>
              </li>
            );
          })}
        </ol>}
    </DetailCard>
  );
}
