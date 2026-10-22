import { useState } from "react";
import { Select } from "antd";
import { AlertTriangle, Package, Smartphone } from "lucide-react";
import { useScPartners } from "../../api/queries";
import { useGetScUndistributedSims } from "../../api/inventory";
import { useGetAgentStockHistory, useGetScAgentDetail } from "../../api/agents";
import { ConfirmDistributionModal } from "../../modals/ConfirmDistributionModal";
import type { InventoryDistributionResult, SimType } from "../../types/operations";
import { SC_SIM_TYPES, SIM_TYPE_LABELS, emptySimSelection } from "../../utils/simTypes";

const TYPE_ICON_BG: Record<SimType, string> = { pos: "bg-[#EFF4F8] text-[#2563EB]", cctv: "bg-[#EBFFF8] text-[#10B981]", gps: "bg-purple-50 text-purple-600", router: "bg-amber-50 text-amber-600" };

interface ScDistributeTabProps {
  initialPartnerId?: number;
  onDistributed: (result: InventoryDistributionResult) => void;
}

/** Distribute to AP: pick an AP (dashboard/agency-partners) and exact SIM numbers (sim-inventory/undistributed). */
export function ScDistributeTab({ initialPartnerId, onDistributed }: ScDistributeTabProps) {
  const [partnerId, setPartnerId] = useState<number | undefined>(initialPartnerId);
  const [partnerSearch, setPartnerSearch] = useState("");
  const [selected, setSelected] = useState(emptySimSelection);
  const [distributeNote, setDistributeNote] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const partners = useScPartners({ page: 1, limit: 20, search: partnerSearch || undefined });
  const detail = useGetScAgentDetail(partnerId);
  const stockHistory = useGetAgentStockHistory(partnerId ?? 0);
  const stockSummary = useGetScUndistributedSims({ page: 1, limit: 1 }).data?.summary;
  const listed = partners.data?.partners.find((partner) => partner.id === partnerId);
  const agent = detail.data;

  const partner = partnerId && (agent || listed) ? {
    id: partnerId,
    name: agent?.hero.name ?? listed!.name,
    phone: agent?.hero.phone ?? listed!.phone,
    initials: agent?.hero.initials ?? listed!.initials,
    stock: agent?.summary_bar.stock.count ?? listed!.stock,
  } : null;
  const optionMap = new Map((partners.data?.partners ?? []).map((item) => [item.id, `${item.name} · ${item.phone} · ${item.stock_label}`]));
  if (partner && !optionMap.has(partner.id)) optionMap.set(partner.id, `${partner.name} · ${partner.phone}`);
  const partnerOptions = [...optionMap].map(([value, label]) => ({ value, label }));

  const totalDistributing = SC_SIM_TYPES.reduce((sum, type) => sum + selected[type].length, 0);
  const yourStock = stockSummary?.total_undistributed ?? 0;
  const firstName = partner?.name.split(" ")[0] ?? "AP";
  const lastSent = stockHistory.data?.items[0];

  const choosePartner = (id?: number) => { setPartnerId(id); setPartnerSearch(""); };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Main Distribution Column (2 cols wide) */}
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-black text-[#0F152A]">
              Distribute SIM Stock
            </h3>
            <p className="text-xs text-[#66738C] font-medium">
              Select an AP and pick the SIMs to send
            </p>
          </div>

          {/* Available Stock Banner */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs flex flex-wrap items-center justify-between gap-2">
            <span className="font-bold text-[#0F152A]">
              Your stock: <strong>{yourStock} SIMs</strong>
            </span>
            {stockSummary && <span className="text-[11px] font-medium text-[#66738C]">
              POS {stockSummary.pos} · CCTV {stockSummary.cctv} · GPS {stockSummary.gps} · Router {stockSummary.router}
            </span>}
          </div>

          {/* Select AP */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              SELECT AGENCY PARTNER
            </label>
            <Select
              size="large"
              showSearch
              allowClear
              filterOption={false}
              className="w-full"
              placeholder="Search AP by name or phone"
              value={partnerId}
              onSearch={setPartnerSearch}
              onChange={(value?: number) => choosePartner(value)}
              loading={partners.isFetching}
              options={partnerOptions}
              notFoundContent={partners.isFetching ? "Loading partners…" : "No agency partners found"}
            />
            {partner && <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-xl bg-[#10B981]/20 font-black text-[#10B981]">
                  {partner.initials}
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#0F152A]">
                    {partner.name}
                  </h4>
                  <p className="text-[11px] text-[#66738C] font-medium">
                    {partner.phone}{agent ? ` · ${agent.profile_details.state} · ${agent.summary_bar.customers.count} customers` : ""}
                  </p>
                  <p className={`text-[10px] font-bold ${partner.stock < 5 ? "text-[#EF4444]" : "text-[#10B981]"}`}>
                    Current stock: {partner.stock} SIMs
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => choosePartner(undefined)}
                className="text-xs font-extrabold text-[#2563EB] hover:underline"
              >
                Change
              </button>
            </div>}
          </div>

          {/* SIMs per type */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              SIMS TO DISTRIBUTE
            </label>

            <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6]">
              {SC_SIM_TYPES.map((type) => (
                <SimTypeRow
                  key={type}
                  type={type}
                  available={stockSummary?.[type] ?? 0}
                  value={selected[type]}
                  partnerName={partner ? firstName : undefined}
                  onChange={(sims) => setSelected((prev) => ({ ...prev, [type]: sims }))}
                />
              ))}
            </div>
          </div>

          {totalDistributing > 0 && yourStock - totalDistributing < 10 && <div className="space-y-1.5 text-xs font-medium text-[#EF4444]">
            <div className="rounded-2xl border border-[#FFF7F8] bg-[#FFF7F8] p-3 flex items-center gap-2">
              <AlertTriangle className="size-4 shrink-0 text-[#EF4444]" />
              <span>Critical stock — use sparingly</span>
            </div>
          </div>}

          {/* Total Distributing Pill Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black text-[#0F152A]">
                Distributing: {totalDistributing} SIMs total
              </h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                Your stock after: {Math.max(0, yourStock - totalDistributing)} SIMs
              </p>
            </div>
          </div>

          {/* Note Optional */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              NOTE (OPTIONAL)
            </label>
            <textarea
              rows={2}
              value={distributeNote}
              placeholder="e.g. Stock allocation for Lagos zone"
              onChange={(e) => setDistributeNote(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            disabled={totalDistributing <= 0 || !partner}
            className="w-full rounded-2xl bg-[#10B981] py-3.5 text-sm font-black text-white shadow-md transition hover:bg-emerald-600 disabled:opacity-50"
          >
            Review Distribution →
          </button>
        </div>
      </div>

      {/* Right Sidebar - Preview & Stats */}
      <div className="space-y-4">
        {/* Distribution Preview Card */}
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold text-[#0F152A]">
            Distribution Preview
          </h3>

          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-2 text-xs">
            <p className="text-[10px] font-extrabold uppercase text-[#8C909B]">
              TO: {partner ? `${partner.name} (AP)` : "No AP selected"}
            </p>
            {agent && <p className="text-[10px] text-[#66738C]">{agent.profile_details.state} · {agent.summary_bar.customers.count} customers</p>}

            <div className="pt-2 border-t border-[#E2ECF6] space-y-1">
              {SC_SIM_TYPES.filter((type) => selected[type].length).map((type) => (
                <div key={type} className="flex justify-between font-bold text-[#0F152A]">
                  <span>{SIM_TYPE_LABELS[type]}</span>
                  <span>{selected[type].length} units</span>
                </div>
              ))}
              {totalDistributing === 0 && <p className="text-[#8C909B]">No SIMs selected yet.</p>}
            </div>

            <div className="flex justify-between font-black text-sm pt-2 border-t border-[#E2ECF6] text-[#0F152A]">
              <span>Total</span>
              <span>{totalDistributing} SIMs</span>
            </div>

            <div className="pt-2 border-t border-[#E2ECF6] space-y-1 text-[11px] font-bold">
              <div className="flex justify-between text-[#8C909B]">
                <span>Your stock</span>
                <span className="text-[#0F152A]">
                  {yourStock} → {Math.max(0, yourStock - totalDistributing)} SIMs
                </span>
              </div>
              {partner && <div className="flex justify-between text-[#8C909B]">
                <span>{firstName}</span>
                <span className="text-[#10B981]">
                  {partner.stock} → {partner.stock + totalDistributing} SIMs
                </span>
              </div>}
            </div>
          </div>
        </div>

        {/* Selected AP stats (GET /my-agent/{id}) */}
        {agent && <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold text-[#0F152A]">
            {agent.hero.name}
          </h3>

          <div className="space-y-2 text-xs divide-y divide-[#E2ECF6]">
            {[
              ["Current Stock", agent.summary_bar.stock.label],
              ["Customers", agent.summary_bar.customers.count.toLocaleString()],
              ["Activations", agent.summary_bar.activations.count.toLocaleString()],
              ["Bonus Status", agent.summary_bar.bonus.status],
              ["Last Active", agent.summary_bar.last_active],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-1.5">
                <span className="text-[#66738C]">{label}</span>
                <span className="font-extrabold text-[#0F152A]">{value}</span>
              </div>
            ))}
          </div>
        </div>}

        {/* Stock Safety Notice */}
        {totalDistributing > 0 && yourStock - totalDistributing < 10 && <div className="rounded-3xl border border-[#FCEEC1] bg-[#FFFBEB] p-4 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-[#D9990D] font-extrabold">
            <AlertTriangle className="size-4 shrink-0 text-[#D9990D]" />
            <span>Stock Safety Notice</span>
          </div>
          <p className="text-[11px] text-[#D9990D] font-medium">
            After this distribution you'll have {Math.max(0, yourStock - totalDistributing)} SIMs. Consider asking your RM for more soon.
          </p>
        </div>}

        {/* Last Sent (GET /my-agent/{id}/stock-history) */}
        {partner && <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2">
          <h3 className="text-xs font-extrabold text-[#0F152A]">
            Last Sent to {firstName}
          </h3>
          {lastSent ? <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs space-y-1">
            <p className="font-extrabold text-[#0F152A]">
              {lastSent.time_ago} - {lastSent.total_sims_label}
            </p>
            <p className="text-[11px] text-[#66738C]">{lastSent.breakdown_text}</p>
          </div> : <p className="text-[11px] text-[#8C909B]">{stockHistory.isLoading ? "Loading…" : "Nothing sent to this AP yet."}</p>}
        </div>}
      </div>

      <ConfirmDistributionModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        partner={partner}
        sims={selected}
        yourStockBefore={yourStock}
        note={distributeNote}
        onSuccess={(result) => {
          setSelected(emptySimSelection());
          setDistributeNote("");
          onDistributed(result);
        }}
      />
    </div>
  );
}

/** One SIM type: stepper adds/removes the next available SIM; the select allows picking exact numbers. */
function SimTypeRow({ type, available, value, partnerName, onChange }: {
  type: SimType; available: number; value: string[]; partnerName?: string; onChange: (sims: string[]) => void;
}) {
  const [search, setSearch] = useState("");
  const { data, isFetching } = useGetScUndistributedSims({ type, search: search || undefined, page: 1, limit: 100 }, available > 0);
  const options = (data?.sims ?? []).map((sim) => ({ value: sim.sim_number, label: `${sim.sim_number} · ${sim.network}` }));
  const nextFree = options.find((option) => !value.includes(option.value))?.value;
  const Icon = type === "pos" ? Smartphone : Package;
  const tone = available === 0 ? "text-[#EF4444]" : available < 5 ? "text-[#F59E0B]" : "text-[#66738C]";

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className={`flex size-6 items-center justify-center rounded-lg ${TYPE_ICON_BG[type]}`}>
              <Icon className="size-3.5" />
            </div>
            <h4 className="text-xs font-extrabold text-[#0F152A]">
              {SIM_TYPE_LABELS[type]}
            </h4>
          </div>
          <p className={`text-[11px] font-medium pt-0.5 ${tone}`}>
            {available} available{available > 0 && available < 5 ? " (Low)" : ""}
          </p>
          {partnerName && value.length > 0 && <p className="text-[10px] font-bold text-[#10B981]">
            → {partnerName}: +{value.length} SIMs
          </p>}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={value.length === 0}
            onClick={() => onChange(value.slice(0, -1))}
            className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8] disabled:opacity-40"
          >
            -
          </button>
          <span className="w-8 text-center text-base font-black text-[#0F152A]">
            {value.length}
          </span>
          <button
            type="button"
            disabled={!nextFree}
            onClick={() => nextFree && onChange([...value, nextFree])}
            className="flex size-8 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] font-bold text-[#0F152A] hover:bg-[#EFF4F8] disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>
      {available > 0 && <Select
        mode="multiple"
        className="w-full"
        placeholder={`Pick ${SIM_TYPE_LABELS[type]} numbers`}
        value={value}
        onChange={onChange}
        filterOption={false}
        onSearch={setSearch}
        onBlur={() => setSearch("")}
        loading={isFetching}
        options={options}
        maxTagCount="responsive"
        notFoundContent={isFetching ? "Loading SIMs…" : "No matching SIMs"}
      />}
    </div>
  );
}
