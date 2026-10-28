import { useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreditCard, MapPin, Pencil, Video, Wifi } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { APP_COLORS } from "@/constants/colors";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type { ApiResponse } from "@/features/auth/types/api";
import { CaQueryState } from "../components/CaQueryState";

interface CaSimPrice {
  id: number; agent_id: number; sim_type: string; type_label: string;
  price: number; price_formatted: string; partner_commission: number; partner_commission_formatted: string;
  corporate_profit: number; corporate_profit_formatted: string; max_price: number; is_configured: boolean;
}
interface CaSimPricePayload { sim_type: string; price: number; partner_commission: number }

const PATH = "/corporate-sales-agent/sim-prices";
const naira = (value: number) => `₦${value.toLocaleString()}`;
const ICONS: Record<string, { icon: typeof CreditCard; tone: string }> = {
  POS_SIM: { icon: CreditCard, tone: "bg-blue-50 text-blue-600" }, CCTV_SIM: { icon: Video, tone: "bg-emerald-50 text-emerald-600" },
  GPS_SIM: { icon: MapPin, tone: "bg-purple-50 text-purple-600" }, ROUTER_SIM: { icon: Wifi, tone: "bg-amber-50 text-amber-600" },
};

/** GET /sim-prices */
function useGetCaSimPrices() {
  const userId = useAuthStore(s => s.user?.id);
  return useQuery({
    queryKey: ["ca-sim-prices", userId], enabled: Boolean(userId), placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => {
      const { data } = await authedHttpClient.get<ApiResponse<CaSimPrice[]>>(PATH, { signal });
      if (!data.success) throw new Error(data.message);
      return data.data;
    },
  });
}
/** POST /sim-prices { sim_type, price, partner_commission } */
function useSetCaSimPrice() {
  const client = useQueryClient();
  return useMutation({
    retry: false,
    mutationFn: async (payload: CaSimPricePayload) => {
      const { data } = await authedHttpClient.post<ApiResponse<unknown>>(PATH, payload);
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: async (response) => {
      await client.invalidateQueries({ queryKey: ["ca-sim-prices"] });
      openNotification({ state: "success", title: response.message });
    },
    onError: (error: Error) => openNotification({ state: "error", title: "Request failed", description: error.message }),
  });
}

/** Corporate Sales Agent SIM prices: selling price, partner commission and corporate profit per SIM type. */
export function CaSimPricingPage() {
  const query = useGetCaSimPrices();
  const [editing, setEditing] = useState<CaSimPrice>();
  const prices = query.data ?? [];
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="SIM Pricing" description="Set your selling price and Agency Partner commission for each SIM type" />
    <CaQueryState loading={query.isLoading} error={query.error} retry={() => void query.refetch()}>
      {!prices.length ? <AppEmptyState title="No SIM types to price" /> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {prices.map((item) => {
          const { icon: Icon, tone } = ICONS[item.sim_type] ?? ICONS.POS_SIM;
          const share = item.price > 0 ? Math.round((item.partner_commission / item.price) * 100) : 0;
          return <article key={item.sim_type} className="rounded-2xl border bg-white p-4 shadow-xs space-y-3" style={{ borderColor: APP_COLORS.greys.stroke }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5"><span className={`flex size-9 items-center justify-center rounded-xl ${tone}`}><Icon className="size-4" /></span><h3 className="text-sm font-bold text-slate-900">{item.type_label}</h3></div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.is_configured ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{item.is_configured ? "Configured" : "Not set"}</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">Selling price</p>
              <p className="text-2xl font-black text-slate-900">{item.price_formatted}</p>
              <p className="text-[10px] text-slate-400">Max allowed {naira(item.max_price)}</p>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-slate-500">Partner commission</span><strong className="text-blue-700">{item.partner_commission_formatted}</strong></div>
              <div className="flex justify-between"><span className="text-slate-500">Your profit</span><strong className="text-emerald-600">{item.corporate_profit_formatted}</strong></div>
              <div className="flex h-2 overflow-hidden rounded-full bg-emerald-100" title={`${share}% to partner`}><div className="h-full bg-blue-600" style={{ width: `${share}%` }} /></div>
              <p className="text-[10px] text-slate-400">{share}% to partner · {100 - share}% profit</p>
            </div>
            <button type="button" onClick={() => setEditing(item)} className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"><Pencil className="size-3.5" />Edit Price</button>
          </article>;
        })}
      </div>}
    </CaQueryState>
    {editing && <EditSimPriceModal item={editing} onClose={() => setEditing(undefined)} />}
  </main>;
}
export default CaSimPricingPage;

function EditSimPriceModal({ item, onClose }: { item: CaSimPrice; onClose: () => void }) {
  const mutation = useSetCaSimPrice();
  const [priceText, setPriceText] = useState(item.price ? String(item.price) : "");
  const [commissionText, setCommissionText] = useState(item.partner_commission ? String(item.partner_commission) : "");
  const price = Number(priceText) || 0;
  const commission = Number(commissionText) || 0;
  const error = price <= 0 ? "Enter a selling price." : price > item.max_price ? `Price cannot exceed ${naira(item.max_price)}.` : commission > price ? "Partner commission cannot exceed the price." : "";
  const submit = () => { if (!error) mutation.mutate({ sim_type: item.sim_type, price, partner_commission: commission }, { onSuccess: onClose }); };
  const field = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 font-mono";
  return <AppModal open onOpenChange={(open) => { if (!open && !mutation.isPending) onClose(); }} title={`Edit ${item.type_label} Price`} description={`Maximum price ${naira(item.max_price)}`} size="sm" showCloseButton={!mutation.isPending}
    actions={[
      { key: "cancel", label: "Cancel", variant: "secondary", disabled: mutation.isPending, onClick: onClose },
      { key: "save", label: mutation.isPending ? "Saving..." : "Save Price", variant: "primary", disabled: Boolean(error) || mutation.isPending, onClick: submit },
    ]}>
    <div className="space-y-4 text-xs">
      <label className="block space-y-1"><span className="font-bold text-slate-900">Selling price (₦)</span><input inputMode="numeric" value={priceText} onChange={(e) => setPriceText(e.target.value.replace(/\D/g, ""))} className={field} /></label>
      <label className="block space-y-1"><span className="font-bold text-slate-900">Partner commission (₦)</span><input inputMode="numeric" value={commissionText} onChange={(e) => setCommissionText(e.target.value.replace(/\D/g, ""))} className={field} /></label>
      <div className="rounded-xl bg-slate-50 p-3 space-y-1">
        <div className="flex justify-between"><span className="text-slate-500">Partner earns</span><strong className="text-blue-700">{naira(commission)}</strong></div>
        <div className="flex justify-between"><span className="text-slate-500">Your profit per SIM</span><strong className="text-emerald-600">{naira(Math.max(0, price - commission))}</strong></div>
      </div>
      {error && priceText && <p className="font-semibold text-rose-600">{error}</p>}
    </div>
  </AppModal>;
}
