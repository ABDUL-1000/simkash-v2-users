import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { appPaths } from "@/app/router/paths";
import { colors } from "@/constants/colors";
import { useGetPartnerCustomerDetail } from "../../api";

export function CustomerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const query = useGetPartnerCustomerDetail(id && /^\d+$/.test(id) ? id : undefined);
  const customer = query.customer;
  if (query.isLoading) return <div className="p-6"><CardGridSkeleton count={2} /></div>;
  if (!customer) return <div className="p-6"><AppEmptyState title="Customer not found" description="This customer may no longer be available." actionText="Back to Customers" onAction={() => navigate(appPaths.apCustomers)} /></div>;
  return <main className="mx-auto max-w-6xl space-y-5 p-4 sm:p-6"><Link to={appPaths.apCustomers} className="inline-flex items-center gap-2 text-sm" style={{ color: colors.primary }}><ArrowLeft className="size-4"/>Back to Customers</Link><PageHeader title={customer.fullname} description={`${customer.phone} · ${customer.email}`} /><div className="grid gap-5 lg:grid-cols-2"><section className="space-y-3 rounded-2xl border bg-white p-5" style={{ borderColor: colors.border }}><h2 className="font-bold">Active SIM</h2><p className="font-mono text-lg">{customer.active_sim.sim_number}</p><p>{customer.active_sim.type_label} · {customer.active_sim.network} · {customer.active_sim.plan}</p><p className="text-sm" style={{ color: colors.textSecondary }}>Activated {customer.active_sim.activated_at} · Expires {customer.active_sim.expires_at}</p><p>{customer.active_sim.data_usage.used} used of {customer.active_sim.data_usage.total} ({customer.active_sim.data_usage.percentage}%)</p></section><section className="rounded-2xl border bg-white p-5" style={{ borderColor: colors.border }}><h2 className="mb-3 font-bold">Renewal History</h2>{customer.renewal_history.length ? customer.renewal_history.map((item, index) => <div key={`${item.started_at}-${index}`} className="border-t py-3"><p className="font-semibold">{item.plan_name} · ₦{item.amount_charged.toLocaleString()}</p><p className="text-xs" style={{ color: colors.textSecondary }}>{item.started_at} – {item.expires_at}</p></div>) : <p className="text-sm" style={{ color: colors.textSecondary }}>No renewal history.</p>}</section></div></main>;
}
