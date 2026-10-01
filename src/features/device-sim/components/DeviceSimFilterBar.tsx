const networks = ["All", "MTN", "Airtel", "Glo", "T2"];
const statuses = ["All", "Active", "Pending", "Expiring", "Expired"];

function Pills({ values, selected, onChange, dark = false }: { values: string[]; selected: string; onChange: (value: string) => void; dark?: boolean }) {
  return <div className="flex flex-wrap gap-2">{values.map((value) => <button key={value} type="button" onClick={() => onChange(value)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${selected === value ? dark ? "border-[#0F152A] bg-[#0F152A] text-white" : "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-[#E2ECF6] bg-white text-[#8C909B] hover:bg-slate-50"}`}>{value}</button>)}</div>;
}

export function DeviceSimFilterBar({ network, status, onNetworkChange, onStatusChange }: { network: string; status: string; onNetworkChange: (value: string) => void; onStatusChange: (value: string) => void }) {
  return <div className="space-y-3"><Pills values={networks} selected={network} onChange={onNetworkChange} /><Pills values={statuses} selected={status} onChange={onStatusChange} dark /></div>;
}
