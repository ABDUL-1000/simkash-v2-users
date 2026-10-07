import { useState } from "react";
import { Alert, Button, Input, Pagination, Radio, Select } from "antd";
import { colors } from "@/constants/colors";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetRmStateCoordinators } from "../../api/dashboard";
import { useGetRmSimInventoryOverview, useRmDistributeSimStock } from "../../api/inventory";
import type { RmSimType, RmTarget } from "../../types/dashboard";
import { RmQueryState } from "../../components/dashboard/RmDashboardPrimitives";
import { RmInfoRows, RmStockSummary } from "../../components/dashboard/RmDesign";
import { RmConfirmed, RmDesignModal, RmQuantityRow } from "./RmDesignModal";
export function RmDesignedDistribute({ target, onClose }: { target?: RmTarget; onClose: () => void }) {
  const [step, setStep] = useState(target ? 1 : 0);
  const [selected, setSelected] = useState(target);
  const [search, setSearch] = useState("");
  const pagination = useTablePagination({ initialPageSize: 6 });
  const partners = useGetRmStateCoordinators({ page: pagination.page, limit: pagination.pageSize, search, status: "all" });
  const inventory = useGetRmSimInventoryOverview();
  const mutation = useRmDistributeSimStock();
  const [type, setType] = useState<RmSimType>("pos");
  const [quantity, setQuantity] = useState(0);
  const [notes, setNotes] = useState("");
  const [network, setNetwork] = useState<string>();
  const available = inventory.data?.current_inventory.find(stock => stock.type.toLowerCase() === type)?.available;
  const valid = Boolean(selected) && Number.isSafeInteger(quantity) && quantity > 0 && available !== undefined && quantity <= available;
  if (mutation.isSuccess) return <RmConfirmed title="Stock Distributed!" result={mutation.data} rows={[{ label: "Recipient", value: selected?.name }, { label: `${type.toUpperCase()} SIM`, value: `${quantity} SIMs` }]} onClose={onClose} />;
  return <RmDesignModal title={step === 2 ? "Confirm Distribution" : "Distribute SIM Stock"} subtitle={step === 0 ? "Select a State Coordinator" : `To: ${selected?.name}`} onClose={onClose} onBack={step ? () => setStep(step - 1) : undefined} pending={mutation.isPending} error={mutation.error}
    submitColor={step === 2 ? colors.success : colors.primary} disabled={step === 0 ? !selected : !valid} submitLabel={step === 0 ? "Continue →" : step === 1 ? "Preview Distribution →" : `Distribute ${quantity} SIMs`}
    onSubmit={() => { if (step < 2) setStep(step + 1); else if (selected && valid) mutation.mutate({ coordinator_id: selected.id, sim_type: type, quantity, network, notes }); }}>
    <RmQueryState loading={inventory.isLoading} error={inventory.error} retry={() => void inventory.refetch()}>{inventory.data && <RmStockSummary total={inventory.data.summary_cards.total_available.count}>{inventory.data.current_inventory.map(stock => `${stock.label}: ${stock.available}`).join(" · ")}</RmStockSummary>}</RmQueryState>
    {step === 0 ? <>
      <Input.Search placeholder="Search SC by name or phone…" allowClear onSearch={value => { setSearch(value); pagination.resetPage(); }} />
      <RmQueryState loading={partners.isLoading} error={partners.error} retry={() => void partners.refetch()}>
        {partners.data?.coordinators.length ? partners.data.coordinators.map(row => <button type="button" key={row.id} className="flex w-full items-center gap-3 rounded-lg border p-3 text-left" style={{ borderColor: selected?.id === row.id ? colors.primary : colors.border, background: selected?.id === row.id ? colors.blues.surfaceLight : colors.backgrounds.background }} onClick={() => setSelected(row)}><span className="rounded-full p-2 text-xs" style={{ background: colors.blues.surfaceLight }}>{row.initials}</span><span className="flex-1 text-xs"><strong>{row.name}</strong><span className="block">{row.state}</span></span><strong className="text-xs">{row.stock} SIMs</strong></button>) : <AppEmptyState title="No coordinators found" />}
        <Pagination {...pagination.paginationConfig} total={partners.data?.total ?? 0} size="small" responsive />
      </RmQueryState>
    </> : step === 1 ? <>
      <div className="flex items-center justify-between rounded-lg p-3 text-xs" style={{ background: colors.blues.surfaceLight }}><strong>{selected?.name}</strong><Button type="link" size="small" onClick={() => setStep(0)}>Change</Button></div>
      <p className="text-xs font-semibold">SIM TYPE & QUANTITY</p><Radio.Group value={type} onChange={event => { setType(event.target.value); setQuantity(0); }} options={["pos", "cctv", "gps", "router"].map(value => ({ value, label: value.toUpperCase() }))} />
      <RmQuantityRow label={`${type.toUpperCase()} SIM`} available={available} max={available} value={quantity} onChange={setQuantity} />
      {/* Four simultaneous SIM-type counters are not mounted: distribute accepts one sim_type per request. PIN confirmation is not mounted because the distribution contract has no PIN field. */}
      <Select className="w-full" placeholder="Any network" aria-label="Network" allowClear value={network} onChange={setNetwork} options={["MTN", "AIRTEL", "GLO", "9MOBILE"].map(value => ({ value, label: value }))} />
      <p className="text-sm font-semibold">Distributing: {quantity} SIMs total</p><label className="block text-xs">NOTE (OPTIONAL)<Input.TextArea className="mt-2" value={notes} onChange={event => setNotes(event.target.value)} /></label>
    </> : <><div className="rounded-lg border p-4" style={{ borderColor: colors.blues.primary }}><p className="mb-3 text-xs font-semibold">DISTRIBUTION SUMMARY</p><RmInfoRows rows={[["Recipient", selected?.name], ["SIM type", type.toUpperCase()], ["Quantity", `${quantity} SIMs`], ["Network", network ?? "Any network"], ["Note", notes || "—"], ["Your stock after", inventory.data ? `${inventory.data.summary_cards.total_available.count - quantity} SIMs` : "—"]]} /></div><Alert type="info" showIcon title="Review the recipient and quantity before sending." /></>}
  </RmDesignModal>;
}
